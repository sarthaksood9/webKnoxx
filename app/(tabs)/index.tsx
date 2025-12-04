import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { WebView } from "react-native-webview";
import { initNotifications, sendNotification } from '../utils/notifications';


export default function HomeScreen() {
  const [loaded, setLoaded] = useState(false);


  useEffect(() => {
    // Initialize centralized notification handlers and get cleanup
    let cleanup: (() => void) | undefined;
    (async () => {
      cleanup = await initNotifications((data) => {
        try {
          const target = data?.target || data?.open;
          if (target) {
            const path = typeof target === 'string' && target.startsWith('/') ? target : `/${target}`;
            router.push(path);
          }
        } catch (e) {
          console.warn('Notification response handling error', e);
        }
      });
    })();

    return () => cleanup?.();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <WebView
          source={{ uri: "https://google.com" }}
          onLoadEnd={() => {
            if (!loaded) {
              setLoaded(true);
              sendNotification("Page Loaded", "WebView content finished loading!");
            }
          }}
        />
      </View>

      <View style={styles.controlsWrap}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Local Notifications</Text>
          <Text style={styles.headerSubtitle}>Tap a button to trigger a notification with a random 2-5s delay.</Text>
        </View>

        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.85}
            onPress={() => {
              sendNotification('Notification A', 'Hello from the WebView tab!', 5);
            }}
          >
            <View style={styles.buttonContent}>
              <Ionicons name="notifications-outline" size={20} color="#fff" />
              <Text style={styles.primaryButtonText}>Notify A</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            activeOpacity={0.85}
       
            onPress={() => {
              sendNotification('Notification B', 'Your video is ready to play.', 5, 'video');
            }}>
            <View style={styles.buttonContent}>
              <MaterialIcons name="info-outline" size={20} color="#111" />
              <Text style={styles.secondaryButtonText}>Notify B</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  controlsWrap: {
    backgroundColor: '#fff',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#e6e6e6',
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  headerSubtitle: {
    color: '#666',
    fontSize: 13,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  primaryButton: {
    flex: 1,
    // marginRight: 8,
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 14,
    paddingLeft:12,
    paddingRight:18,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
    alignItems: 'center',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 14,
     paddingLeft:12,
    paddingRight:18,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    alignItems: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  secondaryButtonText: {
    color: '#111',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
