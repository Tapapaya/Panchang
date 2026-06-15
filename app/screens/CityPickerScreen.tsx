import React from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Radius, Spacing, Type } from '../constants/design';
import { CITY_LIST, City } from '../src/types/content';

const STORAGE_KEY = 'panchang:city';

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
        <Text style={styles.countryName}>{item.country}</Text>
      </Pressable>
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

      {/* ─── City list ───────────────────────────────────── */}
      <FlatList
        data={CITY_LIST}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: insets.bottom + Spacing.xl }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
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
    borderBottomWidth: 1,
    borderBottomColor: Colors.hairlineSoft,
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
    color: Colors.ink,
    opacity: 0.55,
  },

  // ─── City rows ─────────────────────────────────────────
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.canvas,
  },
  rowPressed: {
    backgroundColor: Colors.surfaceSoft,
  },
  cityName: {
    ...Type.bodyLg,
    color: Colors.ink,
  },
  countryName: {
    ...Type.bodySm,
    color: Colors.ink,
    opacity: 0.4,
  },

  separator: {
    height: 1,
    marginHorizontal: Spacing.lg,
    backgroundColor: Colors.hairlineSoft,
  },
});
