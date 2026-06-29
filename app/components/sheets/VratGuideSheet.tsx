import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BottomSheet } from '../BottomSheet';
import { Colors, Radius, Spacing, Type } from '../../constants/design';

interface VratData {
  name: string;
  significance?: string;
  guidelines?: string[];
  breakFastWindow?: string;
}

interface VratGuideSheetProps {
  visible: boolean;
  onClose: () => void;
  vrat: VratData;
}

export function VratGuideSheet({ visible, onClose, vrat }: VratGuideSheetProps) {
  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <View style={styles.inner}>
        <Text style={styles.eyebrow}>Vrat Guide</Text>
        <Text style={styles.title}>{vrat.name}</Text>
        <Text style={styles.significance}>{vrat.significance}</Text>

        {vrat.guidelines && vrat.guidelines.length > 0 && (
          <>
            <Text style={styles.sectionLabel}>How to observe</Text>
            {(vrat.guidelines ?? []).map((step, i) => (
              <View key={i} style={styles.stepRow}>
                <View style={styles.stepBadge}>
                  <Text style={styles.stepNum}>{i + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </>
        )}

        {vrat.breakFastWindow && (
          <View style={styles.breakFastCard}>
            <View>
              <Text style={styles.breakFastLabel}>Break fast tomorrow</Text>
              <Text style={styles.breakFastTime}>{vrat.breakFastWindow}</Text>
            </View>
            <Text style={styles.breakFastNote}>Dwadashi window · sattvic food only</Text>
          </View>
        )}
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  inner: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xl,
    gap: Spacing.sm,
  },
  eyebrow: {
    ...Type.eyebrow,
    color: Colors.inkSoft,
  },
  title: {
    ...Type.displayLg,
    color: Colors.ink,
  },
  significance: {
    ...Type.bodyLg,
    color: Colors.ink,
    marginBottom: Spacing.xs,
  },
  sectionLabel: {
    ...Type.eyebrow,
    color: Colors.inkSoft,
    marginTop: Spacing.md,
    marginBottom: Spacing.xxs,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  stepBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 2,
  },
  stepNum: {
    ...Type.caption,
    color: Colors.inverseInk,
  },
  stepText: {
    ...Type.body,
    color: Colors.ink,
    flex: 1,
  },
  breakFastCard: {
    backgroundColor: Colors.bandDark,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginTop: Spacing.md,
    gap: Spacing.xxs,
  },
  breakFastLabel: {
    ...Type.eyebrow,
    color: Colors.inverseInkSoft,
  },
  breakFastTime: {
    ...Type.headline,
    color: Colors.inverseInk,
  },
  breakFastNote: {
    ...Type.bodySm,
    color: Colors.inverseInkSoft,
    marginTop: Spacing.xxs,
  },
});
