import React, { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing, Type } from '../constants/design';
import { useApp } from '../src/context/AppContext';
import { CITY_LIST, type City } from '../src/types/content';
import { CITY_KEY, ONBOARDING_KEY, PROFILE_KEY } from '../src/types/profile';
import { RASHIS } from '../src/constants/rashis';

type Step = 'name' | 'city' | 'rashi';

export default function OnboardingRoute() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { setOnboardingDone, setCity, setProfile } = useApp();

  const [step, setStep] = useState<Step>('name');
  const [name, setName] = useState('');
  const [cityQuery, setCityQuery] = useState('');
  const [pickedCity, setPickedCity] = useState<City | null>(null);
  const [rashi, setRashi] = useState<string | null>(null);

  const filteredCities = useMemo(() => {
    const q = cityQuery.trim().toLowerCase();
    if (!q) return CITY_LIST;
    return CITY_LIST.filter(
      c => c.name.toLowerCase().includes(q) || c.country.toLowerCase().includes(q),
    );
  }, [cityQuery]);

  async function finish(selectedRashi: string | null) {
    if (!pickedCity) return;
    const profile = { name: name.trim(), ...(selectedRashi ? { rashi: selectedRashi } : {}) };
    await Promise.all([
      AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile)),
      AsyncStorage.setItem(CITY_KEY, JSON.stringify(pickedCity)),
      AsyncStorage.setItem(ONBOARDING_KEY, '1'),
    ]);
    setProfile(profile);
    setCity(pickedCity);
    setOnboardingDone(true);
    router.replace('/(tabs)');
  }

  const stepIndex = step === 'name' ? 0 : step === 'city' ? 1 : 2;

  return (
    <View style={[styles.root, { paddingTop: insets.top + Spacing.md }]}>
      {/* Progress dots */}
      <View style={styles.dots}>
        {[0, 1, 2].map(i => (
          <View key={i} style={[styles.dot, i === stepIndex && styles.dotActive]} />
        ))}
      </View>

      {step === 'name' && (
        <View style={styles.step}>
          <Text style={styles.brand}>पंचांग</Text>
          <Text style={styles.title}>Your daily Hindu calendar</Text>
          <Text style={styles.sub}>
            Tithi, festivals, stotras and auspicious timings — computed for your city, wherever you
            live.
          </Text>
          <Text style={styles.fieldLabel}>What should we call you?</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            placeholderTextColor={Colors.inkFaint}
            returnKeyType="next"
            onSubmitEditing={() => name.trim() && setStep('city')}
          />
          <Pressable
            onPress={() => name.trim() && setStep('city')}
            accessibilityRole="button"
            style={({ pressed }) => [
              styles.cta,
              !name.trim() && styles.ctaDisabled,
              pressed && { opacity: 0.85 },
            ]}
          >
            <Text style={styles.ctaText}>Continue</Text>
            <Ionicons name="arrow-forward" size={18} color={Colors.inverseInk} />
          </Pressable>
        </View>
      )}

      {step === 'city' && (
        <View style={[styles.step, { flex: 1 }]}>
          <Text style={styles.title}>Where are you?</Text>
          <Text style={styles.sub}>
            Sunrise, tithi changes and Rahu Kalam depend on your city and timezone.
          </Text>
          <View style={styles.searchWrap}>
            <Ionicons name="search-outline" size={17} color={Colors.inkFaint} />
            <TextInput
              style={styles.searchInput}
              value={cityQuery}
              onChangeText={setCityQuery}
              placeholder="Search city or country"
              placeholderTextColor={Colors.inkFaint}
            />
          </View>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            {filteredCities.map(c => (
              <Pressable
                key={c.id}
                onPress={() => {
                  setPickedCity(c);
                  setStep('rashi');
                }}
                accessibilityRole="button"
                style={({ pressed }) => [styles.cityRow, pressed && { opacity: 0.7 }]}
              >
                <View>
                  <Text style={styles.cityName}>{c.name}</Text>
                  <Text style={styles.cityCountry}>{c.country}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={Colors.inkFaint} />
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}

      {step === 'rashi' && (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[styles.step, { paddingBottom: insets.bottom + Spacing.xl }]}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Your rashi (optional)</Text>
          <Text style={styles.sub}>
            Your moon sign lets the app flag Chandrashtama days for you. You can set or change it any
            time in Profile.
          </Text>
          <View style={styles.rashiGrid}>
            {RASHIS.map(r => {
              const active = rashi === r.slug;
              return (
                <Pressable
                  key={r.slug}
                  onPress={() => setRashi(prev => (prev === r.slug ? null : r.slug))}
                  accessibilityRole="button"
                  style={[styles.rashiCell, active && styles.rashiCellActive]}
                >
                  <Text style={styles.rashiSymbol}>{r.symbol}</Text>
                  <Text style={[styles.rashiName, active && styles.rashiTextActive]}>{r.name}</Text>
                  <Text style={[styles.rashiEnglish, active && styles.rashiTextActive]}>
                    {r.english}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          <Pressable
            onPress={() => finish(rashi)}
            accessibilityRole="button"
            style={({ pressed }) => [styles.cta, pressed && { opacity: 0.85 }]}
          >
            <Text style={styles.ctaText}>{rashi ? 'Finish' : 'Skip for now'}</Text>
            <Ionicons name="checkmark" size={18} color={Colors.inverseInk} />
          </Pressable>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.canvas },

  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginBottom: Spacing.lg,
  },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.surfaceDim },
  dotActive: { backgroundColor: Colors.ink, width: 20 },

  step: { paddingHorizontal: Spacing.lg, gap: Spacing.sm },

  brand: { fontSize: 34, color: Colors.ink, marginBottom: Spacing.xs },
  title: { ...Type.display, color: Colors.ink },
  sub: { ...Type.body, color: Colors.inkMute, marginBottom: Spacing.md },

  fieldLabel: { ...Type.label, color: Colors.ink },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    height: 52,
    ...Type.body,
    color: Colors.ink,
    borderWidth: 1,
    borderColor: Colors.hairline,
  },

  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.pill,
    borderRadius: Radius.pill,
    height: 54,
    marginTop: Spacing.md,
  },
  ctaDisabled: { opacity: 0.35 },
  ctaText: { ...Type.label, color: Colors.inverseInk, fontSize: 16 },

  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.surface,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.md,
    height: 44,
    marginBottom: Spacing.sm,
  },
  searchInput: { flex: 1, ...Type.body, color: Colors.ink, paddingVertical: 0 },
  cityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    marginBottom: 8,
  },
  cityName: { ...Type.label, color: Colors.ink },
  cityCountry: { ...Type.bodySm, color: Colors.inkMute },

  rashiGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  rashiCell: {
    width: '22%',
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: Radius.md,
    backgroundColor: Colors.surface,
  },
  rashiCellActive: { backgroundColor: Colors.pill },
  rashiSymbol: { fontSize: 20, marginBottom: 2 },
  rashiName: { ...Type.caption, color: Colors.ink },
  rashiEnglish: { ...Type.captionSm, color: Colors.inkMute },
  rashiTextActive: { color: Colors.inverseInk },
});
