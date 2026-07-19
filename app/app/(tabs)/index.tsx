import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing, Type } from '../../constants/design';
import { Badge, Card, Chip, LegendRow, ListRow, ScreenHeader, SectionLabel } from '../../components/ui/Kit';
import { ProgressRing } from '../../components/ui/ProgressRing';
import { Sheet } from '../../components/ui/Sheet';
import { useApp } from '../../src/context/AppContext';
import { useTodayData, ELEMENT_EXPLAINERS } from '../../src/hooks/useTodayData';
import { useUpcoming } from '../../src/hooks/useUpcoming';
import { getMoonTransit } from '../../src/lib/moonRashi';
import { brahmaMuhurta, daylightProgress, formatWindow, localNowFor } from '../../src/lib/sunWindows';
import { RASHIS } from '../../src/constants/rashis';
import type { UpcomingKind } from '../../src/lib/upcoming';

const KIND_COLORS: Record<UpcomingKind, string> = {
  festival: Colors.dataAmber,
  ekadashi: Colors.dataSky,
  purnima: Colors.dataIndigo,
  amavasya: Colors.dataGray,
  sankashti: Colors.dataCoral,
  pradosh: Colors.dataGreen,
};

type ExplainerKey = keyof typeof ELEMENT_EXPLAINERS;

function Skeleton() {
  return (
    <View style={{ gap: Spacing.sm }}>
      {[168, 150, 130].map((h, i) => (
        <View key={i} style={[styles.skeleton, { height: h }]} />
      ))}
    </View>
  );
}

export default function TodayTab() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { city, profile } = useApp();
  const d = useTodayData(city!);
  const { events } = useUpcoming(city);

  const [explainer, setExplainer] = useState<ExplainerKey | null>(null);
  const [vratOpen, setVratOpen] = useState(false);

  // Daylight ring — % of daylight elapsed at the city's local time
  const daylight = useMemo(() => {
    if (!d || !city) return null;
    const now = localNowFor(city.tzName);
    return daylightProgress(d.sun.sunrise, d.sun.sunset, now);
  }, [d, city?.tzName]);

  const bm = d ? brahmaMuhurta(d.sun.sunrise) : null;

  const moon = useMemo(() => {
    if (!d) return null;
    return getMoonTransit(d.nakshatra.name, d.nakshatra.pada, profile?.rashi);
  }, [d?.nakshatra.name, d?.nakshatra.pada, profile?.rashi]);

  if (!city) return null;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <ScreenHeader
        title="Today"
        right={
          <Pressable onPress={() => router.push('/(tabs)/profile')} accessibilityRole="button">
            <Ionicons name="location-outline" size={20} color={Colors.ink} />
          </Pressable>
        }
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + Spacing.xl }]}
        showsVerticalScrollIndicator={false}
      >
        {!d ? (
          <Skeleton />
        ) : (
          <>
            {/* ─── Tithi hero (reference: card panel) ──────────────── */}
            <Card>
              <View style={styles.heroTop}>
                <Text style={styles.heroCaption}>
                  {d.vikramSamvat.masa} · {d.vikramSamvat.paksha} Paksha
                </Text>
                <Text style={styles.heroCaption}>VS {d.vikramSamvat.year}</Text>
              </View>
              <Text style={styles.heroTitle}>{d.tithi.name}</Text>
              <View style={styles.heroBottom}>
                <Text style={styles.heroSub}>
                  {d.gregorian.date} · {city.name}
                </Text>
                {d.tithi.endTime && <Badge label={`ends ${d.tithi.endTime}`} color={Colors.surfaceSoft} />}
              </View>
              <Pressable onPress={() => setExplainer('tithi')} accessibilityRole="button" style={styles.whatIsThis}>
                <Text style={styles.whatIsThisText}>What is a tithi?</Text>
              </Pressable>
            </Card>

            {/* ─── Sun ring + windows ──────────────────────────────── */}
            <Card>
              <View style={styles.sunRow}>
                <ProgressRing
                  size={124}
                  strokeWidth={13}
                  progress={daylight ?? (localNowFor(city.tzName).getTime() < d.sun.sunrise.getTime() ? 0 : 1)}
                  progressColor={Colors.dataAmber}
                >
                  <Text style={styles.ringValue}>
                    {daylight !== null && daylight !== undefined ? `${Math.round(daylight * 100)}%` : '—'}
                  </Text>
                  <Text style={styles.ringCaption}>{daylight != null ? 'of daylight' : 'night'}</Text>
                </ProgressRing>
                <View style={styles.sunLegend}>
                  <LegendRow dot={Colors.dataAmber} label="Sunrise" value={d.sunrise} />
                  <LegendRow dot={Colors.dataCoral} label="Sunset" value={d.sunset} />
                  {d.moonrise && <LegendRow dot={Colors.dataIndigo} label="Moonrise" value={d.moonrise} />}
                  {bm && (
                    <LegendRow
                      dot={Colors.dataLime}
                      label="Brahma muhurta"
                      value={formatWindow(bm)}
                      onPress={() => setExplainer('brahmaMuhurta')}
                    />
                  )}
                </View>
              </View>
            </Card>

            {/* ─── Panchang elements ───────────────────────────────── */}
            <Card>
              <Text style={styles.cardTitle}>Panchang</Text>
              <LegendRow
                dot={Colors.dataSky}
                label={`Nakshatra · ${d.nakshatra.name}`}
                value={d.nakshatra.endTime ? `till ${d.nakshatra.endTime}` : `pada ${d.nakshatra.pada}`}
                onPress={() => setExplainer('nakshatra')}
              />
              <LegendRow
                dot={Colors.dataGreen}
                label={`Yoga · ${d.yoga.name}`}
                value={d.yoga.endTime ? `till ${d.yoga.endTime}` : d.yoga.meaning}
                onPress={() => setExplainer('yoga')}
              />
              <LegendRow
                dot={Colors.dataIndigo}
                label={`${d.gregorian.dayName} · day of ${d.vara.deity}`}
              />
              {d.rahuKalam && (
                <LegendRow
                  dot={Colors.dataCoral}
                  label="Rahu Kalam"
                  value={`${d.rahuKalam.start} – ${d.rahuKalam.end}`}
                  onPress={() => setExplainer('rahuKalam')}
                />
              )}
            </Card>

            {/* ─── Vrat / festival ─────────────────────────────────── */}
            {d.vrat && (
              <Card wash={Colors.accentWash} onPress={() => setVratOpen(true)}>
                <View style={styles.vratRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.vratEyebrow}>Vrat · Festival</Text>
                    <Text style={styles.vratName}>{d.vrat.name}</Text>
                  </View>
                  <Badge label="today" />
                </View>
                {d.vrat.significance ? (
                  <Text style={styles.vratSub} numberOfLines={2}>{d.vrat.significance}</Text>
                ) : null}
              </Card>
            )}

            {/* ─── Moon sign transit ───────────────────────────────── */}
            {moon && (
              <Card>
                <View style={styles.moonRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cardTitle}>Moon today</Text>
                    <Text style={styles.moonValue}>
                      {moon.moonRashi.symbol}  {moon.moonRashi.name} · {moon.moonRashi.english}
                    </Text>
                  </View>
                  {moon.isJanmaRashi && <Badge label="your rashi" />}
                </View>
                {moon.isChandrashtama && (
                  <View style={styles.chandrashtama}>
                    <Ionicons name="alert-circle-outline" size={16} color={Colors.dataCoral} />
                    <Text style={styles.chandrashtamaText}>
                      Chandrashtama for your rashi — the Moon transits the 8th sign from{' '}
                      {RASHIS.find(r => r.slug === profile?.rashi)?.name}. Traditionally a day to keep
                      plans light and avoid major decisions.
                    </Text>
                  </View>
                )}
                {!profile?.rashi && (
                  <Pressable onPress={() => router.push('/(tabs)/profile')} accessibilityRole="button">
                    <Text style={styles.setRashi}>Set your rashi in Profile to get transit alerts →</Text>
                  </Pressable>
                )}
              </Card>
            )}

            {/* ─── Upcoming ────────────────────────────────────────── */}
            {events.length > 0 && (
              <>
                <SectionLabel text="Upcoming" />
                <Card style={{ paddingVertical: 8 }}>
                  {events.map(e => (
                    <ListRow
                      key={`${e.iso}-${e.name}`}
                      dot={KIND_COLORS[e.kind]}
                      title={e.name}
                      sub={e.dateLabel}
                      right={
                        <Text style={styles.daysAway}>
                          {e.daysAway === 1 ? 'tomorrow' : `in ${e.daysAway} days`}
                        </Text>
                      }
                      chevron={false}
                    />
                  ))}
                </Card>
              </>
            )}

            {/* ─── Daily shloka ────────────────────────────────────── */}
            {d.shloka && (
              <>
                <SectionLabel
                  text="Daily shloka"
                  right={
                    <Pressable onPress={() => router.push('/(tabs)/stotras')} accessibilityRole="button">
                      <Text style={styles.sectionLink}>Library →</Text>
                    </Pressable>
                  }
                />
                <Card>
                  {d.shloka.context ? <Chip label={d.shloka.context} wash={Colors.washSky} dot={Colors.dataSky} /> : null}
                  <Text style={styles.shlokaSanskrit}>{d.shloka.sanskrit}</Text>
                  <Text style={styles.shlokaIast}>{d.shloka.iast}</Text>
                  <Text style={styles.shlokaMeaning}>{d.shloka.meaning}</Text>
                </Card>
              </>
            )}

            {/* ─── Do / avoid ──────────────────────────────────────── */}
            <Card>
              <View style={styles.guideRow}>
                <View style={styles.guideCol}>
                  <Text style={styles.guideLabel}>Do today</Text>
                  {d.doToday.map((item, i) => (
                    <View key={i} style={styles.guideItem}>
                      <View style={[styles.guideDot, { backgroundColor: Colors.dataGreen }]} />
                      <Text style={styles.guideText}>{item}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.guideDivider} />
                <View style={styles.guideCol}>
                  <Text style={styles.guideLabel}>Avoid</Text>
                  {d.avoidToday.map((item, i) => (
                    <View key={i} style={styles.guideItem}>
                      <View style={[styles.guideDot, { backgroundColor: Colors.dataCoral }]} />
                      <Text style={styles.guideText}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </Card>
          </>
        )}
      </ScrollView>

      {/* ─── Explainer sheet ─────────────────────────────────────── */}
      <Sheet visible={explainer !== null} onClose={() => setExplainer(null)}>
        {explainer && (
          <View style={{ paddingBottom: Spacing.sm }}>
            <Text style={styles.sheetTitle}>
              {{
                nakshatra: `Nakshatra · ${d?.nakshatra.name ?? ''}`,
                yoga: `Yoga · ${d?.yoga.name ?? ''}`,
                rahuKalam: 'Rahu Kalam',
                tithi: `Tithi · ${d?.tithi.name ?? ''}`,
                brahmaMuhurta: 'Brahma muhurta',
              }[explainer]}
            </Text>
            {explainer === 'nakshatra' && d?.nakshatra.meaning ? (
              <Text style={styles.sheetSub}>“{d.nakshatra.meaning}” · pada {d.nakshatra.pada}</Text>
            ) : null}
            {explainer === 'yoga' && d?.yoga.meaning ? (
              <Text style={styles.sheetSub}>“{d.yoga.meaning}”</Text>
            ) : null}
            <Text style={styles.sheetBody}>{ELEMENT_EXPLAINERS[explainer]}</Text>
          </View>
        )}
      </Sheet>

      {/* ─── Vrat sheet ──────────────────────────────────────────── */}
      <Sheet visible={vratOpen} onClose={() => setVratOpen(false)}>
        {d?.vrat && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.sheetTitle}>{d.vrat.name}</Text>
            {d.vrat.significance ? <Text style={styles.sheetBody}>{d.vrat.significance}</Text> : null}
            <Text style={styles.sheetBody}>
              Observance basics: bathe early, keep the fast as your tradition and health allow, offer
              prayer to the day's deity, and break the fast at the customary time. See the Stotras tab
              for the prayers of the day.
            </Text>
          </ScrollView>
        )}
      </Sheet>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.canvas },
  content: { paddingHorizontal: Spacing.md, gap: Spacing.sm, paddingTop: Spacing.xs },

  skeleton: {
    backgroundColor: Colors.surfaceDim,
    borderRadius: Radius.card,
  },

  // Hero
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.sm },
  heroCaption: { ...Type.caption, color: Colors.inkMute },
  heroTitle: { ...Type.displayXl, color: Colors.ink },
  heroBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  heroSub: { ...Type.bodySm, color: Colors.inkMute },
  whatIsThis: { marginTop: Spacing.sm },
  whatIsThisText: { ...Type.caption, color: Colors.accent },

  // Sun ring
  sunRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.lg },
  sunLegend: { flex: 1 },
  ringValue: { ...Type.display, fontSize: 26, lineHeight: 30, color: Colors.ink },
  ringCaption: { ...Type.captionSm, color: Colors.inkMute },

  cardTitle: { ...Type.heading, color: Colors.ink, marginBottom: 6 },

  // Vrat
  vratRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  vratEyebrow: { ...Type.caption, color: Colors.accent },
  vratName: { ...Type.heading, color: Colors.ink, marginTop: 2 },
  vratSub: { ...Type.bodySm, color: Colors.inkMute, marginTop: Spacing.xs },

  // Moon
  moonRow: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm },
  moonValue: { ...Type.label, color: Colors.ink, marginTop: 2 },
  chandrashtama: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: Colors.washCoral,
    borderRadius: Radius.md,
    padding: Spacing.sm,
    marginTop: Spacing.sm,
  },
  chandrashtamaText: { ...Type.bodySm, color: Colors.ink, flex: 1 },
  setRashi: { ...Type.caption, color: Colors.accent, marginTop: Spacing.xs },

  daysAway: { ...Type.caption, color: Colors.inkMute },
  sectionLink: { ...Type.caption, color: Colors.accent },

  // Shloka
  shlokaSanskrit: {
    // No fontFamily — system font renders Devanagari
    fontSize: 20,
    lineHeight: 32,
    color: Colors.ink,
    marginTop: Spacing.sm,
  },
  shlokaIast: { ...Type.bodySm, color: Colors.inkMute, fontStyle: 'italic', marginTop: Spacing.xs },
  shlokaMeaning: { ...Type.body, color: Colors.ink, marginTop: Spacing.sm },

  // Guide
  guideRow: { flexDirection: 'row', gap: Spacing.md },
  guideCol: { flex: 1, gap: 8 },
  guideDivider: { width: 1, backgroundColor: Colors.hairline },
  guideLabel: { ...Type.caption, color: Colors.inkMute, marginBottom: 2 },
  guideItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  guideDot: { width: 8, height: 8, borderRadius: 4, marginTop: 6 },
  guideText: { ...Type.bodySm, color: Colors.ink, flex: 1 },

  // Sheets
  sheetTitle: { ...Type.title, color: Colors.ink, marginBottom: 4 },
  sheetSub: { ...Type.bodySm, color: Colors.inkMute, marginBottom: Spacing.xs },
  sheetBody: { ...Type.body, color: Colors.ink, marginTop: Spacing.sm, marginBottom: Spacing.xs },
});
