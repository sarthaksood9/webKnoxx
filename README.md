# webKnoxx

A small Expo app with two simple tabs and local notification + video playback examples.

## Features

- Two tabs (file-based routing):
  - `WebView` (app/(tabs)/index.tsx): full-screen WebView plus a small UI area with two notification buttons.
  - `Video` (app/(tabs)/video.tsx): dark-themed HLS player with playback controls, progress bar, and stream details.
- Local notifications using `expo-notifications` with a 5 second JS-controlled delay.
- Centralized notification logic in `app/utils/notifications.ts` (permission, Android channel, response listener, `sendNotification`).
- Notification buttons component: `app/components/notification-buttons.tsx`.
- Notification tap handling supports a `target` payload which routes to a path like `/video`.
- Video playback powered by `expo-av`. Includes play/pause, 10s seek back/forward, mute, progress bar and fullscreen.

## Important Files

- `app/(tabs)/index.tsx` — WebView tab and initialization logic (imports `sendNotification` and `initNotifications`).
- `app/components/notification-buttons.tsx` — two buttons that trigger local notifications.
- `app/utils/notifications.ts` — centralized notification helper (request permissions, create Android channel, sendNotification).
- `app/(tabs)/video.tsx` — HLS player UI implemented with `expo-av` and custom controls.

## Dependencies

This project uses Expo and these notable libraries:

- `expo` / `expo-router`
- `expo-notifications`
- `expo-av`
- `expo-device` (required by `expo-notifications` in some setups)
- `react-native-webview`

Install dependencies (if needed):

```bash
# install JS deps
npm install

# Expo-specific native helpers (if prompted)
npx expo install expo-notifications expo-av expo-device react-native-webview
```

## Run

Start the dev server and open on device/emulator:

```bash
npx expo start -c
```

## How Notifications Work

- `sendNotification(title, body, delaySeconds, target)` lives in `app/utils/notifications.ts`.
- The helper uses a JS `setTimeout` (delaySeconds) then calls `Notifications.scheduleNotificationAsync` to show the notification.
- The notification payload includes `data.target` (e.g. `'video'` or `'/video'`). The app routes to that path when the notification is tapped.
- The code includes safeguards for Android notification channels and permission requests.

## Video Player Notes

- The HLS test stream is set in `app/(tabs)/video.tsx` via the `STREAM_URI` constant. Replace this with your HLS URL.
- Playback controls use `expo-av` methods: `playAsync`, `pauseAsync`, `setPositionAsync`, `presentFullscreenPlayer`, and `setStatusAsync`.
- The code includes a seek-lock to avoid overlapping seeks and handles the `"Seeking interrupted"` error.




