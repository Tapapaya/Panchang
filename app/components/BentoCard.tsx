import React, { useRef } from 'react';
import { Animated, Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { Colors, Radius, Shadows, Spacing } from '../constants/design';

type CardColor = 'white' | 'dark' | 'featured' | 'soft';

const BG: Record<CardColor, string> = {
  white:    Colors.surface,       // default — white card on gray canvas
  dark:     Colors.bandDark,      // hero/feature band — near-black
  featured: Colors.accentWash,    // vrat / sacred day — light orange tint
  soft:     Colors.canvas,        // flush with canvas — do/avoid sections
};

interface BentoCardProps {
  children: React.ReactNode;
  color?: CardColor;
  style?: ViewStyle;
  onPress?: () => void;
}

export function BentoCard({ children, color = 'white', style, onPress }: BentoCardProps) {
  const bg = { backgroundColor: BG[color] };
  const scale = useRef(new Animated.Value(1)).current;

  if (!onPress) {
    return (
      <View style={[styles.card, bg, color !== 'soft' && styles.shadow, style]}>
        {children}
      </View>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() =>
        Animated.spring(scale, {
          toValue: 0.96,
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
      <Animated.View style={[styles.card, bg, color !== 'soft' && styles.shadow, { transform: [{ scale }] }]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.lg,
    padding: Spacing.lg,
  },
  shadow: {
    ...Shadows.card,
  },
});
