import React, { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Colors, Radius, Shadows, Spacing, Type } from '../constants/design';

type CardColor =
  | 'cream'
  | 'lilac'
  | 'mint'
  | 'coral'
  | 'lime'
  | 'navy'
  | 'soft'
  | 'pink'
  | 'white';

const BG: Record<CardColor, string> = {
  cream: Colors.blockCream,
  lilac: Colors.blockLilac,
  mint: Colors.blockMint,
  coral: Colors.blockCoral,
  lime: Colors.blockLime,
  navy: Colors.blockNavy,
  // White pops off canvasWarm clearly; surfaceSoft (#f5f4f1) merged into warm bg
  soft: Colors.canvas,
  pink: Colors.blockPink,
  white: Colors.canvas,
};

interface BentoCardProps {
  children: React.ReactNode;
  color?: CardColor;
  style?: ViewStyle;
  onPress?: () => void;
}

export function BentoCard({ children, color = 'white', style, onPress }: BentoCardProps) {
  const bg = { backgroundColor: BG[color] };
  const isInverse = color === 'navy';
  const scale = useRef(new Animated.Value(1)).current;

  if (!onPress) {
    return (
      <View style={[styles.card, bg, style]}>
        {children}
      </View>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() =>
        Animated.spring(scale, {
          toValue: 0.95,
          useNativeDriver: true,
          speed: 80,
          bounciness: 0,
        }).start()
      }
      onPressOut={() =>
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
          speed: 50,
          bounciness: 4,
        }).start()
      }
      accessibilityRole="button"
      style={style}
    >
      <Animated.View style={[styles.card, bg, { transform: [{ scale }] }]}>
        {children}
        <Text style={[styles.arrow, isInverse && styles.arrowInv]}>→</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    // overflow omitted intentionally — required for Shadows.card to be visible
    ...Shadows.card,
  },
  arrow: {
    ...Type.subhead,
    color: Colors.ink,
    opacity: 0.35,
    position: 'absolute',
    bottom: Spacing.md,
    right: Spacing.md,
  },
  arrowInv: {
    color: Colors.inverseInk,
  },
});
