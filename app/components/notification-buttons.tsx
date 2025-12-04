import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { sendNotification } from '../utils/notifications';

export default function NotificationButtons() {
  return (
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
        }}
      >
        <View style={styles.buttonContent}>
          <MaterialIcons name="info-outline" size={20} color="#111" />
          <Text style={styles.secondaryButtonText}>Notify B</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonsRow: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 14,
    paddingLeft: 12,
    paddingRight: 18,
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
    paddingLeft: 12,
    paddingRight: 18,
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
