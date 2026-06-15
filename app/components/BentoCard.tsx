import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Colors, Radius, Spacing, Type } from '../constants/design';

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
  soft: Colors.surfaceSoft,
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
      style={({ pressed }) => [styles.card, bg, { opacity: pressed ? 0.88 : 1 }, style]}
    >
      {children}
      <Text style={[styles.arrow, isInverse ? styles.arrowInv : null]}>→</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    overflow: 'hidden',
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
