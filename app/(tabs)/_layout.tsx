import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

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
          tabBarIcon: ({ color, size }) => <Ionicons name="globe-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="video"
        options={{
          title: 'Video',
          tabBarIcon: ({ color, size }) => <Ionicons name="videocam-outline" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
