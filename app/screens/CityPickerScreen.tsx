import React from 'react';
import {
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Radius, Spacing, Type } from '../constants/design';
import { CITY_LIST, City } from '../src/types/content';
import { CITY_KEY } from '../src/types/profile';

const STORAGE_KEY = CITY_KEY;

interface Section {
  title: string;
  data: City[];
}

function buildSections(): Section[] {
  const byCountry = new Map<string, City[]>();
  for (const city of CITY_LIST) {
    const existing = byCountry.get(city.country) ?? [];
    byCountry.set(city.country, [...existing, city]);
  }
  return Array.from(byCountry.entries()).map(([title, data]) => ({ title, data }));
}

const SECTIONS = buildSections();

interface Props {
  onCityPicked: (city: City) => void;
}

async function saveCity(city: City) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(city));
}

export function CityPickerScreen({ onCityPicked }: Props) {
  const insets = useSafeAreaInsets();

  async function handleSelect(city: City) {
    await saveCity(city);
    onCityPicked(city);
  }

  function renderItem({ item }: { item: City }) {
    return (
      <Pressable
        style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
        onPress={() => handleSelect(item)}
        accessibilityRole="button"
        accessibilityLabel={`${item.name}, ${item.country}`}
      >
        <Text style={styles.cityName}>{item.name}</Text>
        <View style={styles.rowRight}>
          <Text style={styles.countryName}>{item.country}</Text>
          <Text style={styles.chevron}>›</Text>
        </View>
      </Pressable>
    );
  }

  function renderSectionHeader({ section }: { section: Section }) {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{section.title}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* ─── Header ──────────────────────────────────────── */}
      <View style={styles.header}>
        <Text style={styles.headerBrand}>पंचांग</Text>
      </View>

      {/* ─── Prompt ──────────────────────────────────────── */}
      <View style={styles.prompt}>
        <Text style={styles.promptTitle}>Where are you?</Text>
        <Text style={styles.promptSubtitle}>
          Sunrise, sunset, and Rahu Kalam are calculated for your location.
        </Text>
      </View>

      {/* ─── City list (grouped by country) ─────────────── */}
      <SectionList
        sections={SECTIONS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={{ paddingBottom: insets.bottom + Spacing.xl }}
        SectionSeparatorComponent={() => <View style={styles.sectionSeparator} />}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.canvas,
  },

  // ─── Header ────────────────────────────────────────────
  header: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.hairline,
  },
  headerBrand: {
    ...Type.headline,
    color: Colors.ink,
  },

  // ─── Prompt ────────────────────────────────────────────
  prompt: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  promptTitle: {
    ...Type.displayLg,
    color: Colors.ink,
    marginBottom: Spacing.xs,
  },
  promptSubtitle: {
    ...Type.bodyLg,
    color: Colors.inkSoft,
  },

  // ─── Section headers ───────────────────────────────────
  sectionHeader: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xs,
    backgroundColor: Colors.canvas,
  },
  sectionTitle: {
    ...Type.eyebrow,
    color: Colors.inkSoft,
  },

  // ─── City rows ─────────────────────────────────────────
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: 14,
    backgroundColor: Colors.canvas,
    minHeight: 44,
  },
  rowPressed: {
    backgroundColor: Colors.surfaceDim,
  },
  cityName: {
    ...Type.bodyLg,
    color: Colors.ink,
    flex: 1,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  countryName: {
    ...Type.bodySm,
    color: Colors.inkSoft,
  },
  chevron: {
    ...Type.bodyLg,
    color: Colors.inkSoft,
  },

  // ─── Separators ────────────────────────────────────────
  itemSeparator: {
    height: 1,
    marginHorizontal: Spacing.lg,
    // hairlineSoft invisible on canvasWarm rows — use hairline (#e7e7e7)
    backgroundColor: Colors.hairline,
  },
  sectionSeparator: {
    height: 1,
    backgroundColor: Colors.hairline,
    marginTop: Spacing.xs,
  },
});
