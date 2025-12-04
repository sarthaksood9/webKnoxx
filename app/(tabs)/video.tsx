import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { AVPlaybackStatus, Video } from 'expo-av';
import React, { useRef, useState } from 'react';
import {
  Dimensions, Pressable, StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const STREAM_URI = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

export default function VideoScreen() {
  const videoRef = useRef<Video | null>(null);
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);

  const onPlayPause = async () => {
    if (!videoRef.current) return;
    const s = await videoRef.current.getStatusAsync();
    if (s.isPlaying) {
      await videoRef.current.pauseAsync();
    } else {
      await videoRef.current.playAsync();
    }
  };

  const seekToPercent = async (percent: number) => {
    if (!videoRef.current || !status) return;
    const duration = status.durationMillis || 0;
    const position = Math.max(0, Math.min(duration, Math.round(percent * duration)));
    try {
      await videoRef.current.setPositionAsync(position);
    } catch (e) {
      console.log(e)
    }
  };

  const rewind10 = async () => {
    if (!videoRef.current || !status) return;
    const current = status.positionMillis || 0;
    await videoRef.current.setPositionAsync(Math.max(0, current - 10000));
  };

  const forward10 = async () => {
    if (!videoRef.current || !status) return;
    const current = status.positionMillis || 0;
    const duration = status.durationMillis || 0;
    await videoRef.current.setPositionAsync(Math.min(duration, current + 10000));
  };

  const toggleMute = async () => {
    if (!videoRef.current) return;
    setIsMuted((v) => !v);
    try {
      await videoRef.current.setStatusAsync({ isMuted: !isMuted });
    } catch (e) {}
  };

  const enterFullscreen = async () => {
    try {
      await videoRef.current?.presentFullscreenPlayer();
    } catch (e) {
      console.log(e)
    }
  };

  const formatMillis = (ms?: number | null) => {
    if (!ms || ms <= 0) return '0:00';
    const total = Math.floor(ms / 1000);
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.page}>
      <View style={styles.playerWrap}>
        <Video
          ref={videoRef}
          source={{ uri: STREAM_URI }}
          style={styles.video}
          resizeMode="cover"
          onPlaybackStatusUpdate={(s) => setStatus(s)}
          useNativeControls={false}
        />

      </View>

      {/* Controls */}
      <View style={styles.controlsWrap}>
        <View style={styles.timeRow}>
          <Text style={styles.timeText}>{formatMillis(status?.positionMillis)}</Text>
          <Text style={styles.timeTextRight}>{formatMillis(status?.durationMillis)}</Text>
        </View>

        <Pressable
          style={styles.progressContainer}
          onLayout={(e) => setProgressWidth(e.nativeEvent.layout.width)}
          onPress={(e: any) => {
            const x = e.nativeEvent.locationX;
            const percent = progressWidth ? x / progressWidth : 0;
            seekToPercent(percent);
          }}
        >
          <View style={styles.progressBarBackground} />
          <View style={[styles.progressBarFill, { width: `${(status && status.durationMillis) ? ((status.positionMillis || 0) / (status.durationMillis || 1)) * 100 : 0}%` }]} />
        </Pressable>

        <View style={styles.controlButtonsRow}>
          <TouchableOpacity onPress={toggleMute} style={styles.smallControl}>
            <Ionicons name={isMuted ? 'volume-mute' : 'volume-high'} size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={rewind10} style={styles.smallControl}>
            <Ionicons name="play-back" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPlayPause} style={styles.playPauseControl}>
            <Ionicons name={status?.isPlaying ? 'pause' : 'play'} size={20} color="#111" />
          </TouchableOpacity>
          <TouchableOpacity onPress={forward10} style={styles.smallControl}>
            <Ionicons name="play-forward" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={enterFullscreen} style={styles.smallControl}>
            <MaterialIcons name="fullscreen" size={20} color="#fff" />
          </TouchableOpacity>
          
        </View>
      </View>

      <View style={styles.metaWrap}>
        <View style={styles.badge}><Text style={styles.badgeText}>HLS STREAM</Text></View>
        <Text style={styles.title}>Big Buck Bunny</Text>
        <Text style={styles.subtitle}>An open source animated movie. This example demonstrates HLS streaming playback using React Native Expo (simulated).</Text>

        <Text style={styles.sectionTitle}>STREAM DETAILS</Text>
        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailKey}>Format</Text>
            <Text style={styles.detailValue}>HLS (.m3u8)</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailKey}>Resolution</Text>
            <Text style={styles.detailValue}>Auto (Adaptive)</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailKey}>Status</Text>
            <View style={styles.statusWrap}><View style={styles.liveDot} /><Text style={styles.liveText}>Live</Text></View>
          </View>
        </View>
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');
const VIDEO_HEIGHT = Math.round((width / 16) * 9);

const styles = StyleSheet.create({
  page: {
  flex: 1,
  backgroundColor: '#0f0f0f',
},

playerWrap: {
  backgroundColor: '#000',
  width: '100%',
  height: VIDEO_HEIGHT,
  position: 'relative',
},

video: {
  width: '100%',
  height: '100%',
  backgroundColor: '#000',
},

fullscreenButton: {
  position: 'absolute',
  right: 12,
  top: 12,
  padding: 8,
},

controlsWrap: {
  paddingHorizontal: 20,
  paddingTop: 12,
  paddingBottom: 6,
},

timeRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 6,
},

timeText: {
  color: '#9aa0a6',
  fontSize: 12,
},

timeTextRight: {
  color: '#9aa0a6',
  fontSize: 12,
},

progressContainer: {
  height: 22,
  justifyContent: 'center',
},

progressBarBackground: {
  position: 'absolute',
  left: 0,
  right: 0,
  height: 6,
  backgroundColor: '#1b1b1b',
  borderRadius: 6,
},

progressBarFill: {
  position: 'absolute',
  left: 0,
  height: 6,
  backgroundColor: '#3ea0ff',
  borderRadius: 6,
},

controlButtonsRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  marginTop: 12,
},

smallControl: {
  padding: 10,
},

playPauseControl: {
  width: 56,
  height: 56,
  borderRadius: 28,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
},

metaWrap: {
  flex: 1,
  paddingHorizontal: 20,
  paddingTop: 18,
},

badge: {
  alignSelf: 'flex-start',
  backgroundColor: '#19202a',
  paddingHorizontal: 12,
  paddingVertical: 8,
  borderRadius: 8,
  marginBottom: 12,
},

badgeText: {
  color: '#3ea0ff',
  fontWeight: '700',
  letterSpacing: 0.6,
},

title: {
  color: '#fff',
  fontSize: 28,
  fontWeight: '800',
  marginBottom: 8,
},

subtitle: {
  color: '#9aa0a6',
  fontSize: 14,
  lineHeight: 20,
  marginBottom: 18,
},

sectionTitle: {
  color: '#9aa0a6',
  fontSize: 12,
  fontWeight: '700',
  marginTop: 6,
  marginBottom: 10,
},

detailsCard: {
  backgroundColor: '#141414',
  borderRadius: 12,
  padding: 16,
},

detailRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingVertical: 8,
},

detailKey: {
  color: '#9aa0a6',
  fontSize: 13,
},

detailValue: {
  color: '#e6e6e6',
  fontSize: 13,
  fontWeight: '700',
},

statusWrap: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
},

liveDot: {
  width: 10,
  height: 10,
  borderRadius: 5,
  backgroundColor: '#00d28a',
},

liveText: {
  color: '#00d28a',
  fontWeight: '700',
},
});
