import React, { useMemo, useState } from 'react';
import {
  Alert,
  LayoutAnimation,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  UIManager,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing, Type } from '../../constants/design';
import { Card, ScreenHeader, SectionLabel } from '../../components/ui/Kit';
import { useApp } from '../../src/context/AppContext';
import { CITY_LIST } from '../../src/types/content';
import { CITY_KEY, ONBOARDING_KEY, PROFILE_KEY } from '../../src/types/profile';
import { RASHIS } from '../../src/constants/rashis';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

type Section = 'rashi' | 'city' | null;

export default function ProfileTab() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { city, profile, setCity, setProfile } = useApp();
  const [section, setSection] = useState<Section>(null);
  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState(profile?.name ?? '');

  const countries = useMemo(() => [...new Set(CITY_LIST.map(c => c.country))], []);
  const currentRashi = profile?.rashi ? RASHIS.find(r => r.slug === profile.rashi) : null;

  function toggle(s: Section) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSection(prev => (prev === s ? null : s));
  }

  async function saveProfile(update: Partial<{ name: string; rashi: string }>) {
    const next = { name: profile?.name ?? '', ...profile, ...update };
    setProfile(next);
    await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(next));
  }

  async function handleCitySelect(cityId: string) {
    const selected = CITY_LIST.find(c => c.id === cityId);
    if (!selected) return;
    setCity(selected);
    await AsyncStorage.setItem(CITY_KEY, JSON.stringify(selected));
    toggle(null);
  }

  function handleReset() {
    Alert.alert('Reset app', 'This clears your name, rashi, city and favorites. Continue?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Reset',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.multiRemove([PROFILE_KEY, CITY_KEY, ONBOARDING_KEY]);
          setProfile(null);
          setCity(null);
          router.replace('/onboarding');
        },
      },
    ]);
  }

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <ScreenHeader title="Profile" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + Spacing.xl }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── Account ─────────────────────────────────────────────── */}
        <Card>
          <View style={styles.accountRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {profile?.name ? profile.name[0].toUpperCase() : '·'}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              {editingName ? (
                <TextInput
                  style={styles.nameInput}
                  value={nameDraft}
                  onChangeText={setNameDraft}
                  autoFocus
                  returnKeyType="done"
                  onSubmitEditing={() => {
                    const trimmed = nameDraft.trim();
                    if (trimmed) saveProfile({ name: trimmed });
                    setEditingName(false);
                  }}
                />
              ) : (
                <Text style={styles.name}>{profile?.name || 'Namaste'}</Text>
              )}
              <Text style={styles.accountSub}>
                {city ? `${city.name}, ${city.country}` : 'No city set'}
              </Text>
            </View>
            <Pressable
              onPress={() => {
                if (editingName) {
                  const trimmed = nameDraft.trim();
                  if (trimmed) saveProfile({ name: trimmed });
                }
                setNameDraft(profile?.name ?? '');
                setEditingName(v => !v);
              }}
              accessibilityRole="button"
              style={styles.editBtn}
            >
              <Ionicons
                name={editingName ? 'checkmark' : 'pencil-outline'}
                size={18}
                color={Colors.ink}
              />
            </Pressable>
          </View>
        </Card>

        {/* ─── Rashi ───────────────────────────────────────────────── */}
        <SectionLabel text="Preferences" />
        <Card style={{ paddingVertical: 14 }}>
          <Pressable onPress={() => toggle('rashi')} accessibilityRole="button" style={styles.expandRow}>
            <View style={[styles.rowIcon, { backgroundColor: Colors.washIndigo }]}>
              <Text style={{ fontSize: 18 }}>{currentRashi?.symbol ?? '☽'}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowTitle}>Your rashi (moon sign)</Text>
              <Text style={styles.rowSub}>
                {currentRashi
                  ? `${currentRashi.name} · ${currentRashi.english}`
                  : 'Not set — used for the Chandrashtama alert'}
              </Text>
            </View>
            <Ionicons name={section === 'rashi' ? 'chevron-up' : 'chevron-down'} size={16} color={Colors.inkFaint} />
          </Pressable>

          {section === 'rashi' && (
            <View style={styles.expandBody}>
              <Text style={styles.hint}>
                Your rashi is the sign the Moon occupied at your birth — different from your Western
                sun sign. The Today tab uses it to flag Chandrashtama days.
              </Text>
              <View style={styles.rashiGrid}>
                {RASHIS.map(r => {
                  const active = profile?.rashi === r.slug;
                  return (
                    <Pressable
                      key={r.slug}
                      onPress={() => {
                        saveProfile({ rashi: r.slug });
                        toggle(null);
                      }}
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
            </View>
          )}
        </Card>

        {/* ─── City ────────────────────────────────────────────────── */}
        <Card style={{ paddingVertical: 14 }}>
          <Pressable onPress={() => toggle('city')} accessibilityRole="button" style={styles.expandRow}>
            <View style={[styles.rowIcon, { backgroundColor: Colors.washSky }]}>
              <Ionicons name="location-outline" size={18} color={Colors.ink} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowTitle}>City</Text>
              <Text style={styles.rowSub}>
                {city ? `${city.name}, ${city.country}` : 'Not set'}
              </Text>
            </View>
            <Ionicons name={section === 'city' ? 'chevron-up' : 'chevron-down'} size={16} color={Colors.inkFaint} />
          </Pressable>

          {section === 'city' && (
            <View style={styles.expandBody}>
              <Text style={styles.hint}>
                Sunrise, tithi timings and Rahu Kalam are computed for this city and its timezone.
              </Text>
              {countries.map(country => (
                <View key={country} style={{ marginBottom: Spacing.sm }}>
                  <Text style={styles.countryLabel}>{country}</Text>
                  {CITY_LIST.filter(c => c.country === country).map(c => (
                    <Pressable
                      key={c.id}
                      onPress={() => handleCitySelect(c.id)}
                      accessibilityRole="button"
                      style={styles.cityRow}
                    >
                      <Text style={[styles.cityName, city?.id === c.id && styles.cityNameActive]}>
                        {c.name}
                      </Text>
                      {city?.id === c.id && <Ionicons name="checkmark" size={16} color={Colors.accent} />}
                    </Pressable>
                  ))}
                </View>
              ))}
            </View>
          )}
        </Card>

        {/* ─── About ───────────────────────────────────────────────── */}
        <SectionLabel text="About" />
        <Card style={{ paddingVertical: 14 }}>
          <View style={styles.expandRow}>
            <View style={[styles.rowIcon, { backgroundColor: Colors.washAmber }]}>
              <Ionicons name="calculator-outline" size={18} color={Colors.ink} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowTitle}>How timings are computed</Text>
              <Text style={styles.rowSub}>
                All panchang data is calculated on-device with astronomical formulas (panchang-ts) —
                tithi, nakshatra, yoga, sunrise and Rahu Kalam for your city. Nothing is fetched or
                guessed.
              </Text>
            </View>
          </View>
        </Card>

        {/* ─── Reset ───────────────────────────────────────────────── */}
        <Card style={{ paddingVertical: 14 }} onPress={handleReset}>
          <View style={styles.expandRow}>
            <View style={[styles.rowIcon, { backgroundColor: Colors.washCoral }]}>
              <Ionicons name="refresh-outline" size={18} color={Colors.error} />
            </View>
            <Text style={[styles.rowTitle, { color: Colors.error, flex: 1 }]}>Reset app</Text>
            <Ionicons name="chevron-forward" size={16} color={Colors.inkFaint} />
          </View>
        </Card>

        <Text style={styles.footer}>Panchang · v2.0.0 · made with devotion</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.canvas },
  content: { paddingHorizontal: Spacing.md, gap: Spacing.sm, paddingTop: Spacing.xs },

  accountRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { ...Type.heading, color: Colors.inverseInk },
  name: { ...Type.heading, color: Colors.ink },
  nameInput: {
    ...Type.heading,
    color: Colors.ink,
    borderBottomWidth: 1,
    borderBottomColor: Colors.accent,
    paddingVertical: 0,
  },
  accountSub: { ...Type.bodySm, color: Colors.inkMute, marginTop: 2 },
  editBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  expandRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  rowIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowTitle: { ...Type.label, color: Colors.ink },
  rowSub: { ...Type.bodySm, color: Colors.inkMute, marginTop: 1 },
  expandBody: { marginTop: Spacing.md },
  hint: { ...Type.bodySm, color: Colors.inkMute, marginBottom: Spacing.sm },

  rashiGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  rashiCell: {
    width: '22%',
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceSoft,
  },
  rashiCellActive: { backgroundColor: Colors.pill },
  rashiSymbol: { fontSize: 18, marginBottom: 2 },
  rashiName: { ...Type.caption, color: Colors.ink },
  rashiEnglish: { ...Type.captionSm, color: Colors.inkMute },
  rashiTextActive: { color: Colors.inverseInk },

  countryLabel: { ...Type.caption, color: Colors.inkMute, marginBottom: 4 },
  cityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.hairline,
  },
  cityName: { ...Type.body, color: Colors.ink },
  cityNameActive: { ...Type.label, color: Colors.ink },

  footer: {
    ...Type.captionSm,
    color: Colors.inkFaint,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
});
