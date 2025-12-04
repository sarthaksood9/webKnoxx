import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import NotificationButtons from "../components/notification-buttons";
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

        {/* Buttons component */}
        <NotificationButtons />
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
  
});
