import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Default notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function initNotifications(onResponse?: (data: any) => void) {
  try {
    await Notifications.requestPermissionsAsync();
  } catch (e) {
    console.warn('Permission request failed', e);
  }

  if (Platform.OS === 'android') {
    try {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        sound: 'default',
      });
    } catch (e) {
      console.log(e)
    }
  }

  const sub = Notifications.addNotificationResponseReceivedListener((response) => {
    try {
      const data = response.notification.request.content.data;
      if (onResponse) onResponse(data);
    } catch (e) {
      console.warn('Notification response handler error', e);
    }
  });

  return () => sub.remove();
}

/**
 * Schedule a local notification after `delaySeconds` (JS timer). The notification payload contains an optional `target`.
 */
export const sendNotification = (
  title: string,
  body: string,
  delaySeconds = 0,
  target?: string,
  sound: boolean = true
) => {
  setTimeout(async () => {
    try {
      const data = target ? { target } : {};
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          sound: true,
          data,
        },
        trigger: null, // show immediately; delay controlled by setTimeout
      });
    } catch (error) {
      console.error('Failed to send notification:', error);
    }
  }, delaySeconds * 1000);
};

export default {
  initNotifications,
  sendNotification,
};
