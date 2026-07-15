// Shared UI kit — Soft Data design system primitives.
// Card, SegmentedPill, Chip, Badge, LegendRow, ListRow, ScreenHeader, IconSquircle.

import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Shadows, Spacing, Type } from '../../constants/design';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

// ─── Card ────────────────────────────────────────────────────────────────────

export function Card({
  children,
  style,
  onPress,
  wash,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  /** Optional tinted background (accentWash / wash* tokens). */
  wash?: string;
}) {
  const base = [kit.card, wash ? { backgroundColor: wash } : null, style];
  if (!onPress) return <View style={base}>{children}</View>;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [base, pressed && kit.pressed]}
    >
      {children}
    </Pressable>
  );
}

// ─── SegmentedPill (Month | Year control from the reference) ─────────────────

export function SegmentedPill<T extends string>({
  options,
  value,
  onChange,
  style,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[kit.segTrack, style]}>
      {options.map(o => {
        const active = o.value === value;
        return (
          <Pressable
            key={o.value}
            onPress={() => onChange(o.value)}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            style={[kit.segOption, active && kit.segActive]}
          >
            <Text style={[kit.segLabel, active && kit.segLabelActive]}>{o.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

// ─── Chip (dot + text on wash) ───────────────────────────────────────────────

export function Chip({
  label,
  dot,
  wash,
  active,
  onPress,
}: {
  label: string;
  dot?: string;
  wash?: string;
  active?: boolean;
  onPress?: () => void;
}) {
  const inner = (
    <View
      style={[
        kit.chip,
        { backgroundColor: active ? Colors.pill : (wash ?? Colors.surfaceSoft) },
      ]}
    >
      {dot && <View style={[kit.dot, { backgroundColor: dot }]} />}
      <Text style={[kit.chipText, active && { color: Colors.inverseInk }]}>{label}</Text>
    </View>
  );
  if (!onPress) return inner;
  return (
    <Pressable onPress={onPress} accessibilityRole="button" style={({ pressed }) => pressed && kit.pressed}>
      {inner}
    </Pressable>
  );
}

// ─── Badge (the lime "$5,867" pill) ──────────────────────────────────────────

export function Badge({ label, color = Colors.dataLime }: { label: string; color?: string }) {
  return (
    <View style={[kit.badge, { backgroundColor: color }]}>
      <Text style={kit.badgeText}>{label}</Text>
    </View>
  );
}

// ─── LegendRow ("● Home  36%") ───────────────────────────────────────────────

export function LegendRow({
  dot,
  label,
  value,
  onPress,
}: {
  dot: string;
  label: string;
  value?: string;
  onPress?: () => void;
}) {
  const inner = (
    <View style={kit.legendRow}>
      <View style={[kit.dot, { backgroundColor: dot }]} />
      <Text style={kit.legendLabel} numberOfLines={1}>{label}</Text>
      {value !== undefined && <Text style={kit.legendValue}>{value}</Text>}
      {onPress && (
        <Ionicons name="chevron-forward" size={14} color={Colors.inkFaint} style={{ marginLeft: 2 }} />
      )}
    </View>
  );
  if (!onPress) return inner;
  return (
    <Pressable onPress={onPress} accessibilityRole="button" style={({ pressed }) => pressed && kit.pressed}>
      {inner}
    </Pressable>
  );
}

// ─── IconSquircle + ListRow ──────────────────────────────────────────────────

export function IconSquircle({
  name,
  bg = Colors.surfaceSoft,
  color = Colors.ink,
  size = 40,
}: {
  name: IoniconName;
  bg?: string;
  color?: string;
  size?: number;
}) {
  return (
    <View style={[kit.squircle, { backgroundColor: bg, width: size, height: size }]}>
      <Ionicons name={name} size={size * 0.5} color={color} />
    </View>
  );
}

export function ListRow({
  icon,
  iconBg,
  iconColor,
  dot,
  title,
  sub,
  right,
  onPress,
  chevron = true,
}: {
  icon?: IoniconName;
  iconBg?: string;
  iconColor?: string;
  /** Alternative to icon: a colored legend dot. */
  dot?: string;
  title: string;
  sub?: string;
  right?: React.ReactNode;
  onPress?: () => void;
  chevron?: boolean;
}) {
  const inner = (
    <View style={kit.listRow}>
      {icon && <IconSquircle name={icon} bg={iconBg} color={iconColor} />}
      {dot && !icon && <View style={[kit.dot, { backgroundColor: dot, marginRight: 2 }]} />}
      <View style={kit.listRowBody}>
        <Text style={kit.listRowTitle} numberOfLines={1}>{title}</Text>
        {sub ? <Text style={kit.listRowSub} numberOfLines={2}>{sub}</Text> : null}
      </View>
      {right}
      {onPress && chevron && (
        <Ionicons name="chevron-forward" size={16} color={Colors.inkFaint} />
      )}
    </View>
  );
  if (!onPress) return inner;
  return (
    <Pressable onPress={onPress} accessibilityRole="button" style={({ pressed }) => pressed && kit.pressed}>
      {inner}
    </Pressable>
  );
}

// ─── ScreenHeader (centered title, reference layout) ─────────────────────────

export function ScreenHeader({
  title,
  left,
  right,
}: {
  title: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <View style={kit.header}>
      <View style={kit.headerSide}>{left}</View>
      <Text style={kit.headerTitle}>{title}</Text>
      <View style={[kit.headerSide, { alignItems: 'flex-end' }]}>{right}</View>
    </View>
  );
}

// ─── Section label ───────────────────────────────────────────────────────────

export function SectionLabel({ text, right }: { text: string; right?: React.ReactNode }) {
  return (
    <View style={kit.sectionRow}>
      <Text style={kit.sectionText}>{text}</Text>
      {right}
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const kit = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.card,
    padding: 20,
    ...Shadows.card,
  },
  pressed: { opacity: 0.85, transform: [{ scale: 0.985 }] },

  segTrack: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceSoft,
    borderRadius: Radius.pill,
    padding: 4,
    alignSelf: 'flex-start',
  },
  segOption: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: Radius.pill,
  },
  segActive: { backgroundColor: Colors.pill },
  segLabel: { ...Type.label, color: Colors.inkMute },
  segLabelActive: { color: Colors.inverseInk },

  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: Radius.pill,
  },
  chipText: { ...Type.caption, color: Colors.ink },

  badge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: Radius.pill,
    alignSelf: 'flex-start',
  },
  badgeText: { ...Type.label, color: Colors.ink },

  dot: { width: 10, height: 10, borderRadius: 5 },

  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 7,
  },
  legendLabel: { ...Type.label, color: Colors.ink, flexShrink: 1 },
  legendValue: { ...Type.label, color: Colors.inkMute, marginLeft: 'auto' },

  squircle: {
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: 10,
  },
  listRowBody: { flex: 1 },
  listRowTitle: { ...Type.label, color: Colors.ink },
  listRowSub: { ...Type.bodySm, color: Colors.inkMute, marginTop: 1 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  headerSide: { width: 44, justifyContent: 'center' },
  headerTitle: { ...Type.title, color: Colors.ink, flex: 1, textAlign: 'center' },

  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
    marginTop: Spacing.xs,
    paddingHorizontal: 4,
  },
  sectionText: { ...Type.heading, color: Colors.ink },
});
