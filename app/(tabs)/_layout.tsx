import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'WebView',
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Video',
        }}
      />
    </Tabs>
  );
}
