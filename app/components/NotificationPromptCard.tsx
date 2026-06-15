import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors, Radius, Spacing, Type } from '../constants/design';

interface NotificationPromptCardProps {
  onAllow: () => void;
  onDismiss: () => void;
}

export function NotificationPromptCard({ onAllow, onDismiss }: NotificationPromptCardProps) {
  const [confirmed, setConfirmed] = useState(false);

  if (confirmed) {
    return (
      <View style={[styles.card, { backgroundColor: Colors.blockLime }]}>
        <Text style={styles.check}>✓</Text>
        <Text style={styles.confirmTitle}>Reminder set for 7 AM</Text>
        <Text style={styles.confirmBody}>
          You'll hear from us only when there's something worth knowing. See you tomorrow.
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.card, { backgroundColor: Colors.blockLime }]}>
      <Text style={styles.prompt}>Want a morning nudge?</Text>
      <Text style={styles.body}>
        A gentle reminder on sacred days. No spam — just your panchang, once a day at sunrise.
      </Text>
      <View style={styles.btnRow}>
        <Pressable
          style={({ pressed }) => [styles.primaryBtn, { opacity: pressed ? 0.82 : 1 }]}
          onPress={() => {
            setConfirmed(true);
            onAllow();
          }}
        >
          <Text style={styles.primaryBtnText}>Yes, at 7 AM</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.ghostBtn, { opacity: pressed ? 0.6 : 1 }]}
          onPress={onDismiss}
        >
          <Text style={styles.ghostBtnText}>Not now</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.lg,
    padding: Spacing.lg,
  },
  // confirmed state
  check: {
    ...Type.displayLg,
    color: Colors.ink,
    marginBottom: Spacing.xs,
  },
  confirmTitle: {
    ...Type.headline,
    color: Colors.ink,
    marginBottom: Spacing.xxs,
  },
  confirmBody: {
    ...Type.body,
    color: Colors.ink,
    opacity: 0.65,
  },
  // prompt state
  prompt: {
    ...Type.headline,
    color: Colors.ink,
    marginBottom: Spacing.xs,
  },
  body: {
    ...Type.body,
    color: Colors.ink,
    opacity: 0.7,
    marginBottom: Spacing.md,
    lineHeight: 22,
  },
  btnRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    alignItems: 'center',
  },
  primaryBtn: {
    backgroundColor: Colors.ink,
    borderRadius: Radius.pill,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
  },
  primaryBtnText: {
    ...Type.body,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.inverseInk,
  },
  ghostBtn: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xs,
  },
  ghostBtnText: {
    ...Type.body,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.ink,
    opacity: 0.5,
  },
});
