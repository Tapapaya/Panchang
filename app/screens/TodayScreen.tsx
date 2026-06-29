import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NotificationPromptCard } from '../components/NotificationPromptCard';
import { ExplainerSheet } from '../components/sheets/ExplainerSheet';
import { VratGuideSheet } from '../components/sheets/VratGuideSheet';
import { Colors, Radius, Shadows, Spacing, Type } from '../constants/design';
import { MOCK_TODAY } from '../constants/mockData';
import { useTodayData } from '../src/hooks/useTodayData';
import type { City } from '../src/types/content';

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

interface Props {
  city: City;
  headerSlot?: React.ReactNode;
}

// ─── Small section header ─────────────────────────────────────────────────────
function SectionLabel({ label }: { label: string }) {
  return <Text style={sectionStyles.label}>{label}</Text>;
}
const sectionStyles = StyleSheet.create({
  label: { ...Type.eyebrow, color: Colors.ink, marginBottom: Spacing.sm },
});

// ─── Glance card (horizontal scroll) ─────────────────────────────────────────
interface GlanceCardProps {
  eyebrow: string;
  value: string;
  sub?: string;
  detail?: string;
  dark?: boolean;
  onPress?: () => void;
}
function GlanceCard({ eyebrow, value, sub, detail, dark, onPress }: GlanceCardProps) {
  const bg = dark ? Colors.bandDark : Colors.surface;
  const clr = dark ? Colors.inverseInk : Colors.ink;
  const clrSoft = dark ? Colors.inverseInkSoft : Colors.inkSoft;

  const inner = (
    <View style={[glanceStyles.card, { backgroundColor: bg }]}>
      <Text style={[glanceStyles.eyebrow, { color: clrSoft }]}>{eyebrow}</Text>
      <Text style={[glanceStyles.value, { color: clr }]}>{value}</Text>
      {sub ? <Text style={[glanceStyles.sub, { color: clrSoft }]}>{sub}</Text> : null}
      {detail ? <Text style={[glanceStyles.detail, { color: clrSoft }]}>{detail}</Text> : null}
    </View>
  );

  if (!onPress) return inner;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [{ opacity: pressed ? 0.82 : 1 }]}
      accessibilityRole="button"
    >
      {inner}
    </Pressable>
  );
}
const glanceStyles = StyleSheet.create({
  card: {
    width: 128,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginRight: Spacing.sm,
    ...Shadows.card,
  },
  eyebrow: { ...Type.eyebrow, marginBottom: Spacing.xs },
  value:   { ...Type.headline, fontSize: 18, lineHeight: 24 },
  sub:     { ...Type.bodySm, marginTop: 2 },
  detail:  { ...Type.caption, marginTop: Spacing.xs },
});

// ─── Main screen ─────────────────────────────────────────────────────────────
export function TodayScreen({ city, headerSlot }: Props) {
  const insets = useSafeAreaInsets();
  const liveData = useTodayData(city);
  const d = liveData ?? MOCK_TODAY;

  const [nakshatraOpen, setNakshatraOpen] = useState(false);
  const [yogaOpen, setYogaOpen] = useState(false);
  const [vratOpen, setVratOpen] = useState(false);
  const [rahuOpen, setRahuOpen] = useState(false);
  const [showNotifPrompt, setShowNotifPrompt] = useState(false);

  const heroPulse = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (liveData !== null) {
      heroPulse.setValue(1);
      return;
    }
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(heroPulse, { toValue: 0.55, duration: 700, useNativeDriver: true }),
        Animated.timing(heroPulse, { toValue: 1, duration: 700, useNativeDriver: true }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [liveData, heroPulse]);

  useEffect(() => {
    AsyncStorage.getItem('notif_prompted').then(val => {
      if (!val) setShowNotifPrompt(true);
    });
  }, []);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>

      {/* ─── Header ───────────────────────────────────────────────── */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerBrand}>पंचांग</Text>
          <Text style={styles.headerGreeting}>{getGreeting()}</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.headerDate}>{d.gregorian.date}</Text>
          <Text style={styles.headerDeity}>{d.vara.deity}</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + Spacing.xl },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {headerSlot}

        {/* ─── 1. Tithi hero (full-width dark card) ──────────────── */}
        <Animated.View style={[styles.heroCard, { opacity: heroPulse }]}>
          <Text style={styles.heroEyebrow}>
            {d.vikramSamvat.masaAmanta} · {d.vikramSamvat.paksha}
          </Text>
          <Text style={styles.heroTitle}>{d.tithi.name}</Text>
          <Text style={styles.heroSubtitle}>
            Vikram Samvat {d.vikramSamvat.year}
          </Text>
          <View style={styles.heroFooter}>
            <Text style={styles.heroCaption}>
              {d.vara.name.toUpperCase()} ·{' '}
              <Text style={styles.heroAccent}>{d.vara.deity.toUpperCase()}</Text>
            </Text>
            {d.tithi.endTime && (
              <Text style={styles.heroCaption}>ends {d.tithi.endTime}</Text>
            )}
          </View>
        </Animated.View>

        {/* ─── 2. At a Glance — horizontal scroll ────────────────── */}
        <SectionLabel label="At a Glance" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.glanceRow}
        >
          <GlanceCard
            eyebrow="Nakshatra"
            value={d.nakshatra.name}
            sub={d.nakshatra.meaning}
            detail={`Pada ${d.nakshatra.pada}${d.nakshatra.endTime ? ` · ${d.nakshatra.endTime}` : ''}`}
            onPress={() => setNakshatraOpen(true)}
          />
          <GlanceCard
            eyebrow="Yoga"
            value={d.yoga.name}
            sub={d.yoga.meaning}
            detail={d.yoga.endTime ? `ends ${d.yoga.endTime}` : undefined}
            onPress={() => setYogaOpen(true)}
          />
          <GlanceCard
            eyebrow="Sunrise"
            value={d.sunrise}
            sub="AM"
            dark
          />
          <GlanceCard
            eyebrow="Sunset"
            value={d.sunset}
            sub="PM"
            dark
          />
          {d.rahuKalam && (
            <GlanceCard
              eyebrow="Rahu Kalam"
              value={d.rahuKalam.start}
              sub={`– ${d.rahuKalam.end}`}
              onPress={() => setRahuOpen(true)}
            />
          )}
        </ScrollView>

        {/* ─── 3. Vrat (conditional, full-width) ────────────────── */}
        {d.vrat && (
          <Pressable
            style={({ pressed }) => [styles.vratCard, { opacity: pressed ? 0.9 : 1 }]}
            onPress={() => setVratOpen(true)}
            accessibilityRole="button"
          >
            <Text style={styles.vratEyebrow}>Vrat · Fast</Text>
            <Text style={styles.vratName}>{d.vrat.name}</Text>
            <Text style={styles.vratSig}>{d.vrat.significance}</Text>
            <Text style={styles.vratCta}>View guide →</Text>
          </Pressable>
        )}

        {/* ─── 4. Shloka (full-width) ───────────────────────────── */}
        <SectionLabel label="Daily Shloka" />
        <View style={styles.shlokaCard}>
          <Text style={styles.shlokaContext}>{d.shloka.context}</Text>
          <Text style={styles.shlokaName}>{d.shloka.name}</Text>
          <Text style={styles.shlokaSanskrit}>{d.shloka.sanskrit}</Text>
          <View style={styles.iastBar}>
            <Text style={styles.shlokaIast}>{d.shloka.iast}</Text>
          </View>
          <Text style={styles.shlokaMeaning}>{d.shloka.meaning}</Text>
        </View>

        {/* ─── 5. Today's Guide — do/avoid ──────────────────────── */}
        <SectionLabel label="Today's Guide" />
        <View style={styles.guideCard}>
          <View style={styles.guideCol}>
            <Text style={styles.guideColLabel}>Do Today</Text>
            {d.doToday.map((item, i) => (
              <View key={i} style={styles.guideRow}>
                <Text style={styles.checkMark}>✓</Text>
                <Text style={styles.guideText}>{item}</Text>
              </View>
            ))}
          </View>
          <View style={styles.guideDivider} />
          <View style={styles.guideCol}>
            <Text style={styles.guideColLabel}>Avoid</Text>
            {d.avoidToday.map((item, i) => (
              <View key={i} style={styles.guideRow}>
                <Text style={styles.crossMark}>×</Text>
                <Text style={styles.guideText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ─── 6. Notification prompt ───────────────────────────── */}
        {showNotifPrompt && (
          <NotificationPromptCard
            onAllow={() => {
              AsyncStorage.setItem('notif_prompted', '1');
              setShowNotifPrompt(false);
            }}
            onDismiss={() => {
              AsyncStorage.setItem('notif_prompted', '1');
              setShowNotifPrompt(false);
            }}
          />
        )}
      </ScrollView>

      {/* ─── Bottom sheets ────────────────────────────────────────────── */}
      <ExplainerSheet
        visible={nakshatraOpen}
        onClose={() => setNakshatraOpen(false)}
        eyebrow="Nakshatra"
        title={d.nakshatra.name}
        subtitle={d.nakshatra.meaning}
        detail={`pada ${d.nakshatra.pada}${d.nakshatra.endTime ? ` · ends ${d.nakshatra.endTime}` : ''}`}
        explanation={d.nakshatra.explanation ?? ''}
      />

      <ExplainerSheet
        visible={yogaOpen}
        onClose={() => setYogaOpen(false)}
        eyebrow="Yoga"
        title={d.yoga.name}
        subtitle={d.yoga.meaning}
        detail={d.yoga.endTime ? `ends ${d.yoga.endTime}` : undefined}
        explanation={d.yoga.explanation ?? ''}
      />

      {d.vrat && (
        <VratGuideSheet
          visible={vratOpen}
          onClose={() => setVratOpen(false)}
          vrat={d.vrat}
        />
      )}

      {d.rahuKalam && (
        <ExplainerSheet
          visible={rahuOpen}
          onClose={() => setRahuOpen(false)}
          eyebrow="Rahu Kalam"
          title={`${d.rahuKalam.start} – ${d.rahuKalam.end}`}
          explanation={d.rahuKalam.explanation ?? ''}
        />
      )}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.canvas,
  },

  // ─── Header ──────────────────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.sm,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.hairline,
  },
  headerBrand: {
    ...Type.headline,
    color: Colors.ink,
  },
  headerGreeting: {
    ...Type.bodySm,
    color: Colors.inkSoft,
    marginTop: 2,
  },
  headerRight: {
    alignItems: 'flex-end',
    gap: 2,
  },
  headerDate: {
    ...Type.bodySm,
    color: Colors.inkSoft,
  },
  headerDeity: {
    ...Type.caption,
    color: Colors.accent,
  },

  // ─── Scroll ──────────────────────────────────────────────────────────────
  scroll: { flex: 1 },
  content: {
    padding: Spacing.md,
    gap: Spacing.lg,
  },

  // ─── Hero card ───────────────────────────────────────────────────────────
  heroCard: {
    backgroundColor: Colors.bandDark,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
    ...Shadows.card,
  },
  heroEyebrow: {
    ...Type.eyebrow,
    color: Colors.inverseInkSoft,
    marginBottom: Spacing.xs,
  },
  heroTitle: {
    ...Type.displayHero,
    color: Colors.inverseInk,
  },
  heroSubtitle: {
    ...Type.bodySm,
    color: Colors.inverseInkSoft,
    marginTop: Spacing.xs,
    marginBottom: Spacing.lg,
  },
  heroFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroCaption: {
    ...Type.caption,
    color: Colors.inverseInkSoft,
  },
  heroAccent: {
    color: Colors.accent,
  },

  // ─── At a Glance horizontal scroll ───────────────────────────────────────
  glanceRow: {
    paddingBottom: Spacing.xs,
  },

  // ─── Vrat card ───────────────────────────────────────────────────────────
  vratCard: {
    backgroundColor: Colors.accentWash,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: Colors.accent,
    ...Shadows.card,
  },
  vratEyebrow: {
    ...Type.eyebrow,
    color: Colors.accent,
    marginBottom: Spacing.xs,
  },
  vratName: {
    ...Type.headline,
    color: Colors.ink,
    marginBottom: Spacing.xs,
  },
  vratSig: {
    ...Type.body,
    color: Colors.inkSoft,
    marginBottom: Spacing.md,
  },
  vratCta: {
    ...Type.label,
    color: Colors.accent,
  },

  // ─── Shloka card ─────────────────────────────────────────────────────────
  shlokaCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    ...Shadows.card,
  },
  shlokaContext: {
    ...Type.eyebrow,
    color: Colors.accent,
    marginBottom: Spacing.xs,
  },
  shlokaName: {
    ...Type.cardTitle,
    color: Colors.ink,
    marginBottom: Spacing.md,
  },
  shlokaSanskrit: {
    // No fontFamily — system font handles Devanagari
    fontSize: 21,
    lineHeight: 34,
    color: Colors.ink,
    marginBottom: Spacing.sm,
  },
  iastBar: {
    borderLeftWidth: 2,
    borderLeftColor: Colors.accent,
    paddingLeft: Spacing.sm,
    marginVertical: Spacing.sm,
  },
  shlokaIast: {
    ...Type.body,
    color: Colors.inkSoft,
    fontStyle: 'italic',
  },
  shlokaMeaning: {
    ...Type.bodyLg,
    color: Colors.ink,
    marginTop: Spacing.xs,
  },

  // ─── Today's Guide (do/avoid) ────────────────────────────────────────────
  guideCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    flexDirection: 'row',
    gap: Spacing.md,
    ...Shadows.card,
  },
  guideCol: {
    flex: 1,
    gap: Spacing.xs,
  },
  guideDivider: {
    width: 1,
    backgroundColor: Colors.hairline,
    marginVertical: Spacing.xxs,
  },
  guideColLabel: {
    ...Type.eyebrow,
    color: Colors.inkSoft,
    marginBottom: Spacing.sm,
  },
  guideRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.xs,
  },
  guideText: {
    ...Type.bodySm,
    color: Colors.ink,
    flex: 1,
  },
  checkMark: {
    ...Type.bodySm,
    color: Colors.semanticSuccess,
    fontFamily: 'Urbanist_700Bold',
    width: 14,
  },
  crossMark: {
    ...Type.bodySm,
    color: Colors.semanticError,
    fontFamily: 'Urbanist_700Bold',
    width: 14,
  },
});
