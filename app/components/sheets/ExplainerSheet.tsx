import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BottomSheet } from '../BottomSheet';
import { Colors, Spacing, Type } from '../../constants/design';

interface ExplainerSheetProps {
  visible: boolean;
  onClose: () => void;
  eyebrow: string;
  title: string;
  subtitle?: string;
  detail?: string;
  explanation: string;
  backgroundColor?: string;
}

export function ExplainerSheet({
  visible,
  onClose,
  eyebrow,
  title,
  subtitle,
  detail,
  explanation,
  backgroundColor = Colors.surface,
}: ExplainerSheetProps) {
  return (
    <BottomSheet visible={visible} onClose={onClose} backgroundColor={backgroundColor}>
      <View style={styles.inner}>
        <Text style={styles.eyebrow}>{eyebrow}</Text>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        {detail ? <Text style={styles.detail}>{detail}</Text> : null}
        {explanation ? (
          <>
            <View style={styles.divider} />
            <Text style={styles.explanation}>{explanation}</Text>
          </>
        ) : null}
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  inner: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xl,
  },
  eyebrow: {
    ...Type.eyebrow,
    color: Colors.inkSoft,
    marginBottom: Spacing.xs,
  },
  title: {
    ...Type.displayLg,
    color: Colors.ink,
    marginBottom: Spacing.xxs,
  },
  subtitle: {
    ...Type.subhead,
    color: Colors.inkSoft,
    marginBottom: Spacing.xxs,
  },
  detail: {
    ...Type.caption,
    color: Colors.inkSoft,
    marginTop: Spacing.xxs,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.hairline,
    marginVertical: Spacing.md,
  },
  explanation: {
    ...Type.bodyLg,
    color: Colors.ink,
    lineHeight: 26,
  },
});
