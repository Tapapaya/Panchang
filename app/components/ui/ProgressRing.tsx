import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Colors } from '../../constants/design';

export interface RingSegment {
  fraction: number; // 0..1, all segments should sum to <= 1
  color: string;
}

interface Props {
  size: number;
  strokeWidth?: number;
  /** Multi-segment donut (reference-style, gaps between segments). */
  segments?: RingSegment[];
  /** Single-value progress 0..1 — renders track + one arc. */
  progress?: number;
  progressColor?: string;
  trackColor?: string;
  /** Degrees of gap between segments. */
  gapDeg?: number;
  children?: React.ReactNode;
}

export function ProgressRing({
  size,
  strokeWidth = 12,
  segments,
  progress,
  progressColor = Colors.accent,
  trackColor = Colors.surfaceSoft,
  gapDeg = 14,
  children,
}: Props) {
  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  const center = size / 2;

  let arcs: { startDeg: number; sweepDeg: number; color: string }[] = [];

  if (segments && segments.length > 0) {
    const totalGap = gapDeg * segments.length;
    const available = 360 - totalGap;
    let cursor = -90;
    arcs = segments.map(s => {
      const sweep = Math.max(available * s.fraction, 4);
      const arc = { startDeg: cursor, sweepDeg: sweep, color: s.color };
      cursor += sweep + gapDeg;
      return arc;
    });
  } else if (progress !== undefined) {
    arcs = [{ startDeg: -90, sweepDeg: Math.max(Math.min(progress, 1), 0.01) * 360, color: progressColor }];
  }

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        {progress !== undefined && (
          <Circle
            cx={center}
            cy={center}
            r={r}
            stroke={trackColor}
            strokeWidth={strokeWidth}
            fill="none"
          />
        )}
        {arcs.map((a, i) => {
          const len = (a.sweepDeg / 360) * c;
          return (
            <Circle
              key={i}
              cx={center}
              cy={center}
              r={r}
              stroke={a.color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              fill="none"
              strokeDasharray={`${len} ${c - len}`}
              transform={`rotate(${a.startDeg} ${center} ${center})`}
            />
          );
        })}
      </Svg>
      {children && <View style={styles.center}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
