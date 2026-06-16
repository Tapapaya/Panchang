import React, { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Radius, Spacing, Type } from '../constants/design';
import { ONBOARDING_KEY, PROFILE_KEY, type UserProfile } from '../src/types/profile';

interface Props {
  onComplete: () => void;
}

type Gender = 'male' | 'female' | 'other';

const GENDERS: { key: Gender; label: string }[] = [
  { key: 'male', label: 'Male' },
  { key: 'female', label: 'Female' },
  { key: 'other', label: 'Other' },
];

export function OnboardingScreen({ onComplete }: Props) {
  const insets = useSafeAreaInsets();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState<Gender | null>(null);
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthPlace, setBirthPlace] = useState('');

  const emailRef = useRef<TextInput>(null);
  const birthDateRef = useRef<TextInput>(null);
  const birthTimeRef = useRef<TextInput>(null);
  const birthPlaceRef = useRef<TextInput>(null);

  async function saveAndContinue() {
    const profile: UserProfile = {
      name: name.trim(),
      email: email.trim(),
      ...(gender ? { gender } : {}),
      ...(birthDate.trim() ? { birthDate: birthDate.trim() } : {}),
      ...(birthTime.trim() ? { birthTime: birthTime.trim() } : {}),
      ...(birthPlace.trim() ? { birthPlace: birthPlace.trim() } : {}),
    };
    await AsyncStorage.multiSet([
      [PROFILE_KEY, JSON.stringify(profile)],
      [ONBOARDING_KEY, '1'],
    ]);
    onComplete();
  }

  async function skip() {
    await AsyncStorage.setItem(ONBOARDING_KEY, '1');
    onComplete();
  }

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* ─── Header ──────────────────────────────────────── */}
      <View style={[styles.header, { paddingTop: insets.top + Spacing.sm }]}>
        <Text style={styles.brand}>पंचांग</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + Spacing.xxl },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ─── Welcome ─────────────────────────────────── */}
        <View style={styles.welcome}>
          <Text style={styles.welcomeTitle}>Welcome</Text>
          <Text style={styles.welcomeSubtitle}>
            Your daily companion for Hindu calendar, rituals, and guidance.
          </Text>
        </View>

        {/* ─── Name + Email ────────────────────────────── */}
        <View style={styles.section}>
          <Field
            label="Your name"
            placeholder="Priya"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current?.focus()}
          />
          <Field
            ref={emailRef}
            label="Email"
            placeholder="priya@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => birthDateRef.current?.focus()}
          />
        </View>

        {/* ─── Birth details ───────────────────────────── */}
        <View style={styles.section}>
          <View style={styles.sectionHeadingRow}>
            <Text style={styles.sectionLabel}>Birth details</Text>
            <Text style={styles.optionalTag}>Optional</Text>
          </View>
          <Text style={styles.note}>
            Your birth date, time, and place let us calculate a personalised
            Rashifal for you. Otherwise your name and email are enough to get
            started — you can add these later in Profile.
          </Text>

          {/* Gender pills */}
          <Text style={styles.fieldLabel}>Gender</Text>
          <View style={styles.pillRow}>
            {GENDERS.map(g => (
              <Pressable
                key={g.key}
                style={[styles.pill, gender === g.key && styles.pillActive]}
                onPress={() => setGender(prev => (prev === g.key ? null : g.key))}
                accessibilityRole="radio"
                accessibilityState={{ selected: gender === g.key }}
              >
                <Text
                  style={[styles.pillText, gender === g.key && styles.pillTextActive]}
                >
                  {g.label}
                </Text>
              </Pressable>
            ))}
          </View>

          <Field
            ref={birthDateRef}
            label="Date of birth"
            placeholder="DD / MM / YYYY"
            value={birthDate}
            onChangeText={setBirthDate}
            keyboardType="numbers-and-punctuation"
            returnKeyType="next"
            onSubmitEditing={() => birthTimeRef.current?.focus()}
          />
          <Field
            ref={birthTimeRef}
            label="Time of birth"
            placeholder="HH:MM (e.g. 14:30)"
            value={birthTime}
            onChangeText={setBirthTime}
            keyboardType="numbers-and-punctuation"
            returnKeyType="next"
            onSubmitEditing={() => birthPlaceRef.current?.focus()}
          />
          <Field
            ref={birthPlaceRef}
            label="Place of birth"
            placeholder="City, Country (e.g. Mumbai, India)"
            value={birthPlace}
            onChangeText={setBirthPlace}
            autoCapitalize="words"
            returnKeyType="done"
            onSubmitEditing={saveAndContinue}
          />
        </View>

        {/* ─── CTA ─────────────────────────────────────── */}
        <Pressable
          style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
          onPress={saveAndContinue}
          accessibilityRole="button"
        >
          <Text style={styles.ctaText}>Continue</Text>
        </Pressable>

        <Pressable
          style={styles.skipBtn}
          onPress={skip}
          accessibilityRole="button"
        >
          <Text style={styles.skipText}>Skip for now</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ─── Reusable field component ─────────────────────────────────────────────────

interface FieldProps extends TextInputProps {
  label: string;
}

const Field = React.forwardRef<TextInput, FieldProps>(
  ({ label, ...inputProps }, ref) => (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        ref={ref}
        style={styles.input}
        placeholderTextColor={Colors.ink + '55'}
        {...inputProps}
      />
    </View>
  )
);

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.canvas,
  },

  // ─── Header ──────────────────────────────────────────────
  header: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.hairlineSoft,
  },
  brand: {
    ...Type.headline,
    color: Colors.ink,
  },

  // ─── Scroll ──────────────────────────────────────────────
  scroll: { flex: 1 },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    gap: Spacing.xl,
  },

  // ─── Welcome ─────────────────────────────────────────────
  welcome: { gap: Spacing.xs },
  welcomeTitle: {
    ...Type.displayLg,
    color: Colors.ink,
  },
  welcomeSubtitle: {
    ...Type.bodyLg,
    color: Colors.ink,
    opacity: 0.6,
  },

  // ─── Sections ────────────────────────────────────────────
  section: { gap: Spacing.md },
  sectionHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  sectionLabel: {
    ...Type.headline,
    color: Colors.ink,
  },
  optionalTag: {
    ...Type.eyebrow,
    color: Colors.ink,
    opacity: 0.4,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    backgroundColor: Colors.surfaceSoft,
    borderRadius: Radius.sm,
    overflow: 'hidden',
  },

  // ─── Note ────────────────────────────────────────────────
  note: {
    ...Type.body,
    color: Colors.ink,
    opacity: 0.55,
    backgroundColor: Colors.surfaceSoft,
    borderRadius: Radius.md,
    padding: Spacing.md,
    lineHeight: 20,
  },

  // ─── Gender pills ─────────────────────────────────────────
  pillRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  pill: {
    flex: 1,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.pill,
    backgroundColor: Colors.surfaceSoft,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.hairline,
  },
  pillActive: {
    backgroundColor: Colors.ink,
    borderColor: Colors.ink,
  },
  pillText: {
    ...Type.label,
    color: Colors.ink,
  },
  pillTextActive: {
    color: Colors.inverseInk,
  },

  // ─── Fields ──────────────────────────────────────────────
  fieldWrap: { gap: Spacing.xxs },
  fieldLabel: {
    ...Type.eyebrow,
    color: Colors.ink,
    opacity: 0.5,
  },
  input: {
    ...Type.bodyLg,
    color: Colors.ink,
    backgroundColor: Colors.surfaceSoft,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    borderWidth: 1,
    borderColor: Colors.hairline,
  },

  // ─── CTA ─────────────────────────────────────────────────
  cta: {
    backgroundColor: Colors.ink,
    borderRadius: Radius.pill,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  ctaPressed: {
    opacity: 0.75,
  },
  ctaText: {
    ...Type.label,
    color: Colors.inverseInk,
    fontSize: 15,
  },

  skipBtn: {
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    marginTop: -Spacing.sm,
  },
  skipText: {
    ...Type.body,
    color: Colors.ink,
    opacity: 0.35,
  },
});
