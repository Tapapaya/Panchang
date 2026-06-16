import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { TodayScreen } from '../../screens/TodayScreen';
import { useApp } from '../../src/context/AppContext';
import { Colors, Spacing, Type, Radius } from '../../constants/design';
import { BentoCard } from '../../components/BentoCard';

const RASHIS = [
  { slug: 'mesha', name: 'Mesha', symbol: '♈' },
  { slug: 'vrishabha', name: 'Vrishabha', symbol: '♉' },
  { slug: 'mithuna', name: 'Mithuna', symbol: '♊' },
  { slug: 'karka', name: 'Karka', symbol: '♋' },
  { slug: 'simha', name: 'Simha', symbol: '♌' },
  { slug: 'kanya', name: 'Kanya', symbol: '♍' },
  { slug: 'tula', name: 'Tula', symbol: '♎' },
  { slug: 'vrishchika', name: 'Vrishchika', symbol: '♏' },
  { slug: 'dhanu', name: 'Dhanu', symbol: '♐' },
  { slug: 'makara', name: 'Makara', symbol: '♑' },
  { slug: 'kumbha', name: 'Kumbha', symbol: '♒' },
  { slug: 'meena', name: 'Meena', symbol: '♓' },
];

function getWeekNumber(): number {
  const d = new Date();
  const start = new Date(d.getFullYear(), 0, 1);
  return Math.ceil((((d.getTime() - start.getTime()) / 86400000) + start.getDay() + 1) / 7);
}

function getRashiData(rashi: string): { headline: string; body: string } | null {
  // Static placeholder rashifal — replace with real JSON content once written
  const week = getWeekNumber();
  const seed = (RASHIS.findIndex(r => r.slug === rashi) + 1) * week;
  const headlines = [
    'A week of clarity and forward motion',
    'Focus on relationships and creative pursuits',
    'Financial opportunities are on the horizon',
    'Rest and reflection will serve you well',
    'Strong connections deepen this week',
    'Your efforts at work begin to bear fruit',
  ];
  const bodies = [
    'Mercury favours planning. Begin tasks you have been postponing, especially those requiring clear communication.',
    'Venus strengthens bonds. Spend time with those who matter. Avoid impulsive decisions by mid-week.',
    'Jupiter brings abundance. Review your finances carefully — a modest investment could pay off.',
    'The Moon invites stillness. Prioritise self-care and spiritual practice over new commitments.',
    'Mars energises your social sphere. Collaborative work will produce better results than solo efforts.',
    'Saturn rewards discipline. Your consistent efforts are noticed. Keep going.',
  ];
  return {
    headline: headlines[seed % headlines.length],
    body: bodies[seed % bodies.length],
  };
}

export default function DashboardTab() {
  const { city, profile } = useApp();
  const router = useRouter();
  const rashi = profile?.rashi;

  if (!city) return null;

  const rashiMeta = rashi ? RASHIS.find(r => r.slug === rashi) : null;
  const rashiContent = rashi ? getRashiData(rashi) : null;

  return (
    <View style={styles.root}>
      {/* Rashifal card injected above TodayScreen scroll via composition */}
      <TodayScreen
        city={city}
        headerSlot={
          rashi && rashiContent && rashiMeta ? (
            <BentoCard color="lilac" style={styles.rashiCard}>
              <View style={styles.rashiHeader}>
                <Text style={styles.rashiEyebrow}>YOUR RASHIFAL · WEEK {getWeekNumber()}</Text>
                <Text style={styles.rashiSymbol}>{rashiMeta.symbol}</Text>
              </View>
              <Text style={styles.rashiRashi}>{rashiMeta.name}</Text>
              <Text style={styles.rashiHeadline}>{rashiContent.headline}</Text>
              <Text style={styles.rashiBody}>{rashiContent.body}</Text>
            </BentoCard>
          ) : (
            <TouchableOpacity
              style={styles.rashiPrompt}
              onPress={() => router.push('/(tabs)/profile')}
              activeOpacity={0.7}
            >
              <Text style={styles.rashiPromptText}>
                Set your Rashi in Profile to see your weekly Rashifal
              </Text>
              <Text style={styles.rashiPromptCta}>Set Rashi →</Text>
            </TouchableOpacity>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.canvas,
  },
  rashiCard: {
    marginBottom: Spacing.sm,
  },
  rashiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  rashiEyebrow: {
    ...Type.eyebrow,
    color: Colors.ink,
    opacity: 0.55,
  },
  rashiSymbol: {
    fontSize: 22,
  },
  rashiRashi: {
    ...Type.caption,
    color: Colors.ink,
    opacity: 0.55,
    marginBottom: Spacing.xxs,
  },
  rashiHeadline: {
    ...Type.cardTitle,
    color: Colors.ink,
    marginBottom: Spacing.xs,
  },
  rashiBody: {
    ...Type.body,
    color: Colors.ink,
    opacity: 0.8,
  },
  rashiPrompt: {
    backgroundColor: Colors.surfaceSoft,
    borderRadius: Radius.md,
    padding: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.hairline,
  },
  rashiPromptText: {
    ...Type.bodySm,
    color: Colors.ink,
    opacity: 0.65,
    flex: 1,
    paddingRight: Spacing.sm,
  },
  rashiPromptCta: {
    ...Type.label,
    color: Colors.ink,
  },
});
