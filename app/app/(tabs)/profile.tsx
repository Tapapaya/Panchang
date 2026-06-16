import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Switch,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Type, Radius } from '../../constants/design';
import { useApp } from '../../src/context/AppContext';
import { CITY_LIST } from '../../src/types/content';
import { PROFILE_KEY, CITY_KEY, ONBOARDING_KEY } from '../../src/types/profile';

const RASHIS = [
  { slug: 'mesha', name: 'Mesha', symbol: '♈', english: 'Aries' },
  { slug: 'vrishabha', name: 'Vrishabha', symbol: '♉', english: 'Taurus' },
  { slug: 'mithuna', name: 'Mithuna', symbol: '♊', english: 'Gemini' },
  { slug: 'karka', name: 'Karka', symbol: '♋', english: 'Cancer' },
  { slug: 'simha', name: 'Simha', symbol: '♌', english: 'Leo' },
  { slug: 'kanya', name: 'Kanya', symbol: '♍', english: 'Virgo' },
  { slug: 'tula', name: 'Tula', symbol: '♎', english: 'Libra' },
  { slug: 'vrishchika', name: 'Vrishchika', symbol: '♏', english: 'Scorpio' },
  { slug: 'dhanu', name: 'Dhanu', symbol: '♐', english: 'Sagittarius' },
  { slug: 'makara', name: 'Makara', symbol: '♑', english: 'Capricorn' },
  { slug: 'kumbha', name: 'Kumbha', symbol: '♒', english: 'Aquarius' },
  { slug: 'meena', name: 'Meena', symbol: '♓', english: 'Pisces' },
];

function SectionHeader({ title }: { title: string }) {
  return <Text style={styles.sectionHeader}>{title}</Text>;
}

function RowItem({
  icon,
  label,
  value,
  onPress,
  destructive,
}: {
  icon: string;
  label: string;
  value?: string;
  onPress?: () => void;
  destructive?: boolean;
}) {
  return (
    <TouchableOpacity
      style={styles.rowItem}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.6 : 1}
    >
      <Text style={styles.rowIcon}>{icon}</Text>
      <Text style={[styles.rowLabel, destructive && styles.destructiveText]}>{label}</Text>
      {value && <Text style={styles.rowValue}>{value}</Text>}
      {onPress && (
        <Ionicons
          name="chevron-forward"
          size={16}
          color={destructive ? Colors.semanticError : Colors.ink}
          style={{ opacity: destructive ? 0.8 : 0.3 }}
        />
      )}
    </TouchableOpacity>
  );
}

function RashiPicker({
  selected,
  onSelect,
}: {
  selected: string | undefined;
  onSelect: (slug: string) => void;
}) {
  return (
    <View style={styles.rashiGrid}>
      {RASHIS.map(r => (
        <TouchableOpacity
          key={r.slug}
          style={[styles.rashiItem, selected === r.slug && styles.rashiItemActive]}
          onPress={() => onSelect(r.slug)}
          activeOpacity={0.7}
        >
          <Text style={styles.rashiSymbol}>{r.symbol}</Text>
          <Text style={[styles.rashiName, selected === r.slug && styles.rashiNameActive]}>
            {r.name}
          </Text>
          <Text style={[styles.rashiEnglish, selected === r.slug && styles.rashiEnglishActive]}>
            {r.english}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function CityPicker({
  currentCityId,
  onSelect,
}: {
  currentCityId: string | undefined;
  onSelect: (cityId: string) => void;
}) {
  const countries = [...new Set(CITY_LIST.map(c => c.country))];
  return (
    <View>
      {countries.map(country => (
        <View key={country} style={styles.cityGroup}>
          <Text style={styles.cityCountry}>{country}</Text>
          {CITY_LIST.filter(c => c.country === country).map(city => (
            <TouchableOpacity
              key={city.id}
              style={[styles.cityRow, currentCityId === city.id && styles.cityRowActive]}
              onPress={() => onSelect(city.id)}
              activeOpacity={0.7}
            >
              <Text style={[styles.cityName, currentCityId === city.id && styles.cityNameActive]}>
                {city.name}
              </Text>
              {currentCityId === city.id && (
                <Ionicons name="checkmark" size={16} color={Colors.ink} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}

type ActiveSection = 'rashi' | 'city' | null;

export default function ProfileTab() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { city, profile, setCity, setProfile } = useApp();
  const [activeSection, setActiveSection] = useState<ActiveSection>(null);

  function toggleSection(s: ActiveSection) {
    setActiveSection(prev => (prev === s ? null : s));
  }

  async function handleRashiSelect(slug: string) {
    const updated = { ...(profile ?? { name: '', email: '' }), rashi: slug };
    setProfile(updated);
    await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
  }

  async function handleCitySelect(cityId: string) {
    const selected = CITY_LIST.find(c => c.id === cityId);
    if (!selected) return;
    setCity(selected);
    await AsyncStorage.setItem(CITY_KEY, JSON.stringify(selected));
    setActiveSection(null);
  }

  async function handleSignOut() {
    Alert.alert(
      'Sign out',
      'This will clear all your saved preferences. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign out',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.multiRemove([PROFILE_KEY, CITY_KEY, ONBOARDING_KEY]);
            router.replace('/onboarding');
          },
        },
      ]
    );
  }

  const currentRashi = profile?.rashi
    ? RASHIS.find(r => r.slug === profile.rashi)
    : null;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Profile</Text>
        <Text style={styles.pageSubtitle}>Your preferences & settings</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + Spacing.xl }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── Account ─────────────────────────────────────── */}
        <SectionHeader title="ACCOUNT" />
        <View style={styles.card}>
          <View style={styles.profileRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {profile?.name ? profile.name[0].toUpperCase() : '?'}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>
                {profile?.name || 'Guest'}
              </Text>
              <Text style={styles.profileEmail}>
                {profile?.email || 'No email set'}
              </Text>
            </View>
          </View>
        </View>

        {/* ─── Rashifal ────────────────────────────────────── */}
        <SectionHeader title="RASHIFAL" />
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.expandRow}
            onPress={() => toggleSection('rashi')}
            activeOpacity={0.7}
          >
            <View style={styles.expandRowLeft}>
              <Text style={styles.rowIcon}>
                {currentRashi ? currentRashi.symbol : '☿'}
              </Text>
              <View>
                <Text style={styles.rowLabel}>Your Rashi (Moon Sign)</Text>
                <Text style={styles.rowValue}>
                  {currentRashi
                    ? `${currentRashi.name} · ${currentRashi.english}`
                    : 'Not set — tap to choose'}
                </Text>
              </View>
            </View>
            <Ionicons
              name={activeSection === 'rashi' ? 'chevron-up' : 'chevron-down'}
              size={16}
              color={Colors.ink}
              style={{ opacity: 0.35 }}
            />
          </TouchableOpacity>

          {activeSection === 'rashi' && (
            <View style={styles.pickerContainer}>
              <View style={styles.pickerDivider} />
              <Text style={styles.pickerHint}>
                Your Moon Sign (Rashi) is different from your Sun Sign. It is calculated from the Moon's position at the time of your birth.
              </Text>
              <RashiPicker
                selected={profile?.rashi}
                onSelect={slug => {
                  handleRashiSelect(slug);
                  setActiveSection(null);
                }}
              />
            </View>
          )}
        </View>

        {/* ─── Location ────────────────────────────────────── */}
        <SectionHeader title="LOCATION" />
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.expandRow}
            onPress={() => toggleSection('city')}
            activeOpacity={0.7}
          >
            <View style={styles.expandRowLeft}>
              <Text style={styles.rowIcon}>🌍</Text>
              <View>
                <Text style={styles.rowLabel}>City</Text>
                <Text style={styles.rowValue}>
                  {city ? `${city.name}, ${city.country}` : 'Not set'}
                </Text>
              </View>
            </View>
            <Ionicons
              name={activeSection === 'city' ? 'chevron-up' : 'chevron-down'}
              size={16}
              color={Colors.ink}
              style={{ opacity: 0.35 }}
            />
          </TouchableOpacity>

          {activeSection === 'city' && (
            <View style={styles.pickerContainer}>
              <View style={styles.pickerDivider} />
              <CityPicker
                currentCityId={city?.id}
                onSelect={handleCitySelect}
              />
            </View>
          )}
        </View>

        {/* ─── Birth details ───────────────────────────────── */}
        {profile && (
          <>
            <SectionHeader title="BIRTH DETAILS" />
            <View style={styles.card}>
              <RowItem icon="🎂" label="Date of birth" value={profile.birthDate || 'Not set'} />
              <View style={styles.divider} />
              <RowItem icon="⏰" label="Time of birth" value={profile.birthTime || 'Not set'} />
              <View style={styles.divider} />
              <RowItem icon="📍" label="Place of birth" value={profile.birthPlace || 'Not set'} />
            </View>
            <Text style={styles.hintText}>
              Birth details enable more accurate Rashifal. You can update these by signing out and going through onboarding again.
            </Text>
          </>
        )}

        {/* ─── Sign out ────────────────────────────────────── */}
        <SectionHeader title="DANGER ZONE" />
        <View style={styles.card}>
          <RowItem
            icon="🚪"
            label="Sign out & reset"
            onPress={handleSignOut}
            destructive
          />
        </View>

        {/* ─── App info ────────────────────────────────────── */}
        <Text style={styles.appInfo}>Panchang · v1.0.0 · Made with devotion</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.canvasWarm,
  },
  pageHeader: {
    backgroundColor: Colors.canvas,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.hairlineSoft,
  },
  pageTitle: {
    ...Type.headline,
    color: Colors.ink,
  },
  pageSubtitle: {
    ...Type.bodySm,
    color: Colors.ink,
    opacity: 0.45,
    marginTop: 2,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingTop: Spacing.md,
    paddingHorizontal: Spacing.md,
    gap: Spacing.xs,
  },
  sectionHeader: {
    ...Type.eyebrow,
    color: Colors.ink,
    opacity: 0.45,
    marginTop: Spacing.md,
    marginBottom: Spacing.xxs,
    marginLeft: Spacing.xs,
  },
  card: {
    backgroundColor: Colors.canvas,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.hairline,
  },

  // Profile row
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    gap: Spacing.md,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.blockLilac,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    ...Type.headline,
    color: Colors.ink,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    ...Type.cardTitle,
    color: Colors.ink,
  },
  profileEmail: {
    ...Type.bodySm,
    color: Colors.ink,
    opacity: 0.5,
    marginTop: 2,
  },

  // Standard row
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  rowIcon: {
    fontSize: 18,
    width: 26,
    textAlign: 'center',
  },
  rowLabel: {
    ...Type.body,
    color: Colors.ink,
    flex: 1,
  },
  rowValue: {
    ...Type.bodySm,
    color: Colors.ink,
    opacity: 0.5,
  },
  destructiveText: {
    color: Colors.semanticError,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.hairlineSoft,
    marginLeft: 54,
  },

  // Expand row (rashi + city pickers)
  expandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  expandRowLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  pickerContainer: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
  },
  pickerDivider: {
    height: 1,
    backgroundColor: Colors.hairlineSoft,
    marginBottom: Spacing.md,
  },
  pickerHint: {
    ...Type.bodySm,
    color: Colors.ink,
    opacity: 0.55,
    marginBottom: Spacing.md,
  },

  // Rashi grid
  rashiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  rashiItem: {
    width: '22%',
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.hairline,
    backgroundColor: Colors.surfaceSoft,
  },
  rashiItemActive: {
    backgroundColor: Colors.ink,
    borderColor: Colors.ink,
  },
  rashiSymbol: {
    fontSize: 20,
    marginBottom: 2,
  },
  rashiName: {
    ...Type.label,
    color: Colors.ink,
    textAlign: 'center',
  },
  rashiNameActive: {
    color: Colors.inverseInk,
  },
  rashiEnglish: {
    ...Type.caption,
    color: Colors.ink,
    opacity: 0.5,
    textAlign: 'center',
  },
  rashiEnglishActive: {
    color: Colors.inverseInk,
    opacity: 0.65,
  },

  // City picker
  cityGroup: {
    marginBottom: Spacing.md,
  },
  cityCountry: {
    ...Type.eyebrow,
    color: Colors.ink,
    opacity: 0.45,
    marginBottom: Spacing.xs,
  },
  cityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.hairlineSoft,
  },
  cityRowActive: {
    // no special bg — checkmark is enough
  },
  cityName: {
    ...Type.body,
    color: Colors.ink,
  },
  cityNameActive: {
    fontFamily: 'Inter_600SemiBold',
  },

  hintText: {
    ...Type.bodySm,
    color: Colors.ink,
    opacity: 0.45,
    paddingHorizontal: Spacing.xs,
  },
  appInfo: {
    ...Type.caption,
    color: Colors.ink,
    opacity: 0.3,
    textAlign: 'center',
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
});
