import React, { useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors, Radius, Shadows, Spacing, Type } from '../constants/design';

interface NotificationPromptCardProps {
  onAllow: () => void;
  onDismiss: () => void;
}

export function NotificationPromptCard({ onAllow, onDismiss }: NotificationPromptCardProps) {
  const [confirmed, setConfirmed] = useState(false);
  const primaryScale = useRef(new Animated.Value(1)).current;

  if (confirmed) {
    return (
      <View style={styles.card}>
        <View style={styles.checkCircle}>
          <Text style={styles.checkMark}>✓</Text>
        </View>
        <Text style={styles.confirmTitle}>Reminder set for 7 AM</Text>
        <Text style={styles.confirmBody}>
          You'll hear from us only when there's something worth knowing. See you tomorrow.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.prompt}>Want a morning nudge?</Text>
      <Text style={styles.body}>
        A gentle reminder on sacred days. No spam — just your panchang, once a day at sunrise.
      </Text>
      <View style={styles.btnRow}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Set reminder for 7 AM"
          onPressIn={() =>
            Animated.spring(primaryScale, {
              toValue: 0.95,
              useNativeDriver: true,
              speed: 80,
              bounciness: 0,
            }).start()
          }
          onPressOut={() =>
            Animated.spring(primaryScale, {
              toValue: 1,
              useNativeDriver: true,
              speed: 50,
              bounciness: 4,
            }).start()
          }
          onPress={() => {
            setConfirmed(true);
            onAllow();
          }}
        >
          <Animated.View style={[styles.primaryBtn, { transform: [{ scale: primaryScale }] }]}>
            <Text style={styles.primaryBtnText}>Yes, at 7 AM</Text>
          </Animated.View>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Dismiss notification prompt"
          style={({ pressed }) => [styles.ghostBtn, { opacity: pressed ? 0.55 : 1 }]}
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
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    ...Shadows.card,
  },

  // ── confirmed state ──────────────────────────────────────
  checkCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  checkMark: {
    ...Type.label,
    color: Colors.inverseInk,
    lineHeight: 16,
  },
  confirmTitle: {
    ...Type.headline,
    color: Colors.ink,
    marginBottom: Spacing.xxs,
  },
  confirmBody: {
    ...Type.body,
    color: Colors.inkSoft,
    lineHeight: 22,
  },

  // ── prompt state ─────────────────────────────────────────
  prompt: {
    ...Type.headline,
    color: Colors.ink,
    marginBottom: Spacing.xs,
  },
  body: {
    ...Type.body,
    color: Colors.inkSoft,
    marginBottom: Spacing.md,
    lineHeight: 22,
  },
  btnRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    alignItems: 'center',
  },
  primaryBtn: {
    backgroundColor: Colors.accent,
    borderRadius: Radius.pill,
    paddingVertical: 11,
    paddingHorizontal: Spacing.lg,
  },
  primaryBtnText: {
    ...Type.label,
    color: Colors.inverseInk,
  },
  ghostBtn: {
    borderRadius: Radius.pill,
    borderWidth: 1.5,
    borderColor: Colors.hairline,
    paddingVertical: 10,
    paddingHorizontal: Spacing.md,
  },
  ghostBtnText: {
    ...Type.label,
    color: Colors.ink,
  },
});
