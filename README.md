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




## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
