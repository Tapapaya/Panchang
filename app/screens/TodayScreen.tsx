import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BentoCard } from '../components/BentoCard';
import { NotificationPromptCard } from '../components/NotificationPromptCard';
import { ExplainerSheet } from '../components/sheets/ExplainerSheet';
import { VratGuideSheet } from '../components/sheets/VratGuideSheet';
import { Colors, Spacing, Type } from '../constants/design';
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

export function TodayScreen({ city, headerSlot }: Props) {
  const insets = useSafeAreaInsets();
  const liveData = useTodayData(city);
  const d = liveData ?? MOCK_TODAY;

  const [nakshatraOpen, setNakshatraOpen] = useState(false);
  const [yogaOpen, setYogaOpen] = useState(false);
  const [vratOpen, setVratOpen] = useState(false);
  const [rahuOpen, setRahuOpen] = useState(false);
  const [showNotifPrompt, setShowNotifPrompt] = useState(false);

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
          <Text style={styles.headerGreeting}>{getGreeting()} 🙏</Text>
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

        {/* ─── 1. Date Hero (dark feature band) ────────────────────── */}
        <BentoCard color="navy" style={styles.heroCard}>
          <Text style={styles.heroEyebrow}>
            {d.vikramSamvat.masaAmanta} · {d.vikramSamvat.paksha}
          </Text>
          <Text style={styles.heroTitle}>{d.tithi.name}</Text>
          <Text style={styles.heroSubtitle}>
            Vikram Samvat {d.vikramSamvat.year}
          </Text>
          <View style={styles.heroFooter}>
            <Text style={styles.heroCaption}>
              {d.vara.name.toUpperCase()} · {' '}
              <Text style={styles.heroDiety}>{d.vara.deity.toUpperCase()}</Text>
            </Text>
            {d.tithi.endTime && (
              <Text style={styles.heroCaption}>
                Tithi ends {d.tithi.endTime}
              </Text>
            )}
          </View>
        </BentoCard>

        {/* ─── 2. Nakshatra + Yoga ──────────────────────────────────── */}
        <View style={styles.row}>
          <BentoCard
            color="lilac"
            style={styles.half}
            onPress={() => setNakshatraOpen(true)}
          >
            <Text style={styles.eyebrow}>Nakshatra</Text>
            <Text style={styles.bigTitle}>{d.nakshatra.name}</Text>
            <Text style={styles.cardBody}>{d.nakshatra.meaning}</Text>
            <Text style={styles.cardCaption}>
              pada {d.nakshatra.pada}
              {d.nakshatra.endTime ? ` · ends ${d.nakshatra.endTime}` : ''}
            </Text>
          </BentoCard>

          <BentoCard
            color="mint"
            style={styles.half}
            onPress={() => setYogaOpen(true)}
          >
            <Text style={styles.eyebrow}>Yoga</Text>
            <Text style={styles.bigTitle}>{d.yoga.name}</Text>
            <Text style={styles.cardBody}>{d.yoga.meaning}</Text>
            {d.yoga.endTime && (
              <Text style={styles.cardCaption}>ends {d.yoga.endTime}</Text>
            )}
          </BentoCard>
        </View>

        {/* ─── 3. Vrat (conditional) ────────────────────────────────── */}
        {d.vrat && (
          <BentoCard color="coral" onPress={() => setVratOpen(true)}>
            <Text style={styles.eyebrow}>Vrat · Fast</Text>
            <Text style={styles.bigTitle}>{d.vrat.name}</Text>
            <Text style={[styles.cardBody, styles.vratBody]}>
              {d.vrat.significance}
            </Text>
          </BentoCard>
        )}

        {/* ─── 4. Sunrise + Sunset ──────────────────────────────────── */}
        <View style={styles.row}>
          <BentoCard color="navy" style={styles.half}>
            <Text style={[styles.eyebrow, styles.inv]}>Sunrise ☀</Text>
            <Text style={[styles.sunTime, styles.inv]}>{d.sunrise}</Text>
            <Text style={[styles.cardCaption, styles.invSoft]}>AM</Text>
          </BentoCard>

          <BentoCard color="navy" style={styles.half}>
            <Text style={[styles.eyebrow, styles.inv]}>Sunset ☽</Text>
            <Text style={[styles.sunTime, styles.inv]}>{d.sunset}</Text>
            <Text style={[styles.cardCaption, styles.invSoft]}>PM</Text>
          </BentoCard>
        </View>

        {/* ─── 5. Shloka ────────────────────────────────────────────── */}
        <BentoCard color="lime">
          <Text style={styles.eyebrow}>
            Shloka · {d.shloka.context}
          </Text>
          <Text style={styles.shlokaTitle}>{d.shloka.name}</Text>
          <Text style={styles.shlokaSanskrit}>{d.shloka.sanskrit}</Text>
          <View style={styles.iastBar}>
            <Text style={styles.shlokaIast}>{d.shloka.iast}</Text>
          </View>
          <Text style={styles.shlokaMeaning}>{d.shloka.meaning}</Text>
        </BentoCard>

        {/* ─── 6. Do + Avoid ────────────────────────────────────────── */}
        <View style={styles.row}>
          <BentoCard color="soft" style={styles.half}>
            <Text style={styles.eyebrow}>Do Today</Text>
            {d.doToday.map((item, i) => (
              <View key={i} style={styles.listRow}>
                <Text style={styles.checkMark}>✓</Text>
                <Text style={[styles.cardBody, styles.listItem]}>{item}</Text>
              </View>
            ))}
          </BentoCard>

          <BentoCard color="soft" style={styles.half}>
            <Text style={styles.eyebrow}>Avoid</Text>
            {d.avoidToday.map((item, i) => (
              <View key={i} style={styles.listRow}>
                <Text style={styles.crossMark}>×</Text>
                <Text style={[styles.cardBody, styles.listItem]}>{item}</Text>
              </View>
            ))}
          </BentoCard>
        </View>

        {/* ─── 7. Rahu Kalam ────────────────────────────────────────── */}
        {d.rahuKalam && (
          <BentoCard color="pink" onPress={() => setRahuOpen(true)}>
            <Text style={styles.eyebrow}>Rahu Kalam</Text>
            <Text style={styles.rahuTime}>
              {d.rahuKalam.start} – {d.rahuKalam.end}
            </Text>
            <Text style={styles.cardBody}>
              Avoid important decisions and new starts during this window.
            </Text>
          </BentoCard>
        )}

        {/* ─── 8. Notification prompt ───────────────────────────────── */}
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
        backgroundColor={Colors.blockLilac}
      />

      <ExplainerSheet
        visible={yogaOpen}
        onClose={() => setYogaOpen(false)}
        eyebrow="Yoga"
        title={d.yoga.name}
        subtitle={d.yoga.meaning}
        detail={d.yoga.endTime ? `ends ${d.yoga.endTime}` : undefined}
        explanation={d.yoga.explanation ?? ''}
        backgroundColor={Colors.blockMint}
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
          backgroundColor={Colors.blockPink}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.canvasWarm,
  },

  // ─── Header ──────────────────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.sm,
    backgroundColor: Colors.canvasWarm,
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
    color: Colors.inkSoft,
  },

  // ─── Scroll container ────────────────────────────────────────────────────
  scroll: {
    flex: 1,
  },
  content: {
    padding: Spacing.md,
    gap: Spacing.sm,
  },

  // ─── Layout helpers ──────────────────────────────────────────────────────
  row: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  half: {
    flex: 1,
  },

  // ─── Hero card (dark feature band) ──────────────────────────────────────
  heroCard: {
    justifyContent: 'flex-end',
    minHeight: 220,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    paddingTop: Spacing.xxl,
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
    marginBottom: Spacing.md,
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
  heroDiety: {
    color: Colors.accentGold,
  },

  // ─── Generic card parts ──────────────────────────────────────────────────
  eyebrow: {
    ...Type.eyebrow,
    color: Colors.ink,
    marginBottom: Spacing.xs,
  },
  bigTitle: {
    ...Type.headline,
    color: Colors.ink,
    marginBottom: Spacing.xs,
  },
  cardBody: {
    ...Type.body,
    color: Colors.ink,
  },
  cardCaption: {
    ...Type.caption,
    color: Colors.inkSoft,
    marginTop: Spacing.xs,
  },

  // ─── Inverse text (navy cards) ───────────────────────────────────────────
  inv: {
    color: Colors.inverseInk,
  },
  invSoft: {
    color: Colors.inverseInkSoft,
  },

  // ─── Sun times ───────────────────────────────────────────────────────────
  sunTime: {
    ...Type.displayXl,
    color: Colors.inverseInk,
    marginVertical: Spacing.xs,
  },

  // ─── Vrat card ───────────────────────────────────────────────────────────
  vratBody: {
    marginTop: Spacing.xs,
  },

  // ─── Shloka card ─────────────────────────────────────────────────────────
  shlokaTitle: {
    ...Type.cardTitle,
    color: Colors.ink,
    marginBottom: Spacing.md,
  },
  shlokaSanskrit: {
    // No fontFamily — system font handles Devanagari on both iOS and Android
    fontSize: 22,
    lineHeight: 36,
    color: Colors.ink,
    marginBottom: Spacing.sm,
  },
  iastBar: {
    borderLeftWidth: 2,
    borderLeftColor: Colors.ink,
    paddingLeft: Spacing.sm,
    marginTop: Spacing.xs,
    marginBottom: Spacing.sm,
    opacity: 0.5,
  },
  shlokaIast: {
    ...Type.body,
    color: Colors.ink,
    fontStyle: 'italic',
  },
  shlokaMeaning: {
    ...Type.bodyLg,
    color: Colors.ink,
    marginTop: Spacing.xs,
  },

  // ─── Do / Avoid lists ────────────────────────────────────────────────────
  listRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: Spacing.xs,
    gap: Spacing.xs,
  },
  listItem: {
    flex: 1,
  },
  checkMark: {
    ...Type.bodySm,
    color: Colors.semanticSuccess,
    fontFamily: 'Inter_700Bold',
    width: 14,
  },
  crossMark: {
    ...Type.bodySm,
    color: Colors.semanticError,
    fontFamily: 'Inter_700Bold',
    width: 14,
  },

  // ─── Rahu Kalam card ─────────────────────────────────────────────────────
  rahuTime: {
    ...Type.displayLg,
    color: Colors.ink,
    marginVertical: Spacing.xs,
  },
});
