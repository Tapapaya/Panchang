import React, { useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing, Type, deityColor } from '../../constants/design';
import { Badge, Chip, ScreenHeader } from '../../components/ui/Kit';
import { STOTRA_LIBRARY, STOTRA_DEITIES, type Stotra } from '../../src/data/stotras';

const FAVORITES_KEY = 'panchang:stotra-favorites';

// ─── Library row ─────────────────────────────────────────────────────────────

function StotraRow({
  stotra,
  favorite,
  onPress,
}: {
  stotra: Stotra;
  favorite: boolean;
  onPress: () => void;
}) {
  const color = deityColor(stotra.deity);
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <View style={[styles.rowBadge, { backgroundColor: color.wash }]}>
        <View style={[styles.rowDot, { backgroundColor: color.dot }]} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.rowTitle} numberOfLines={1}>{stotra.title}</Text>
        <Text style={styles.rowSub} numberOfLines={1}>
          {stotra.deity} · {stotra.category} · {stotra.verses.length}{' '}
          {stotra.verses.length === 1 ? 'verse' : 'verses'}
        </Text>
      </View>
      {favorite && <Ionicons name="heart" size={16} color={Colors.dataCoral} />}
      <Ionicons name="chevron-forward" size={16} color={Colors.inkFaint} />
    </Pressable>
  );
}

// ─── Reader ──────────────────────────────────────────────────────────────────

function Reader({
  stotra,
  favorite,
  onToggleFavorite,
  onClose,
}: {
  stotra: Stotra;
  favorite: boolean;
  onToggleFavorite: () => void;
  onClose: () => void;
}) {
  const insets = useSafeAreaInsets();
  const color = deityColor(stotra.deity);
  return (
    <View style={[styles.readerRoot, { paddingTop: insets.top }]}>
      <View style={styles.readerHeader}>
        <Pressable onPress={onClose} accessibilityRole="button" style={styles.readerHeaderBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.ink} />
        </Pressable>
        <Text style={styles.readerHeaderTitle} numberOfLines={1}>{stotra.title}</Text>
        <Pressable onPress={onToggleFavorite} accessibilityRole="button" style={styles.readerHeaderBtn}>
          <Ionicons
            name={favorite ? 'heart' : 'heart-outline'}
            size={22}
            color={favorite ? Colors.dataCoral : Colors.ink}
          />
        </Pressable>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.readerContent, { paddingBottom: insets.bottom + Spacing.xl }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Meta */}
        <View style={styles.readerMeta}>
          <Chip label={stotra.deity} dot={color.dot} wash={color.wash} />
          <Chip label={stotra.category} />
          {stotra.composer && <Chip label={stotra.composer} />}
        </View>

        {/* About */}
        <View style={styles.aboutCard}>
          <Text style={styles.aboutTitle}>About</Text>
          <Text style={styles.aboutBody}>{stotra.about}</Text>
          <Text style={styles.aboutOccasion}>
            <Text style={{ color: Colors.inkMute }}>When: </Text>
            {stotra.occasion}
          </Text>
          {!stotra.complete && stotra.note && (
            <View style={{ marginTop: Spacing.sm, alignSelf: 'flex-start' }}>
              <Badge label={stotra.note} color={Colors.surfaceSoft} />
            </View>
          )}
        </View>

        {/* Verses */}
        {stotra.verses.map((v, i) => (
          <View key={i} style={styles.verseCard}>
            <Text style={styles.verseLabel}>
              {v.label ?? `Verse ${i + 1}`}
            </Text>
            <Text style={styles.verseSanskrit}>{v.sanskrit}</Text>
            <Text style={styles.verseIast}>{v.iast}</Text>
            <View style={styles.verseMeaningWrap}>
              <Text style={styles.verseMeaning}>{v.meaning}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// ─── Tab ─────────────────────────────────────────────────────────────────────

export default function StotrasTab() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [deityFilter, setDeityFilter] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(FAVORITES_KEY)
      .then(raw => {
        if (raw) setFavorites(new Set(JSON.parse(raw) as string[]));
      })
      .catch(() => {});
  }, []);

  function toggleFavorite(id: string) {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify([...next])).catch(() => {});
      return next;
    });
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return STOTRA_LIBRARY.filter(s => {
      if (showFavorites && !favorites.has(s.id)) return false;
      if (deityFilter && s.deity !== deityFilter) return false;
      if (!q) return true;
      return (
        s.title.toLowerCase().includes(q) ||
        s.deity.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.occasion.toLowerCase().includes(q)
      );
    });
  }, [query, deityFilter, showFavorites, favorites]);

  const open = openId ? STOTRA_LIBRARY.find(s => s.id === openId) : null;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <ScreenHeader
        title="Stotras"
        right={
          <Pressable onPress={() => setShowFavorites(v => !v)} accessibilityRole="button">
            <Ionicons
              name={showFavorites ? 'heart' : 'heart-outline'}
              size={20}
              color={showFavorites ? Colors.dataCoral : Colors.ink}
            />
          </Pressable>
        }
      />

      {/* Search */}
      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={17} color={Colors.inkFaint} />
        <TextInput
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
          placeholder="Search by name, deity, occasion"
          placeholderTextColor={Colors.inkFaint}
          returnKeyType="search"
        />
        {query.length > 0 && (
          <Pressable onPress={() => setQuery('')} accessibilityRole="button">
            <Ionicons name="close-circle" size={17} color={Colors.inkFaint} />
          </Pressable>
        )}
      </View>

      {/* Deity filter chips */}
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipRow}
        >
          <Chip label="All" active={deityFilter === null} onPress={() => setDeityFilter(null)} />
          {STOTRA_DEITIES.map(dy => {
            const c = deityColor(dy);
            return (
              <Chip
                key={dy}
                label={dy}
                dot={c.dot}
                wash={c.wash}
                active={deityFilter === dy}
                onPress={() => setDeityFilter(prev => (prev === dy ? null : dy))}
              />
            );
          })}
        </ScrollView>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={s => s.id}
        contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + Spacing.xl }]}
        renderItem={({ item }) => (
          <StotraRow
            stotra={item}
            favorite={favorites.has(item.id)}
            onPress={() => setOpenId(item.id)}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <Text style={styles.empty}>
            {showFavorites
              ? 'No favorites yet — tap the heart inside any stotra.'
              : 'Nothing matches your search.'}
          </Text>
        }
        showsVerticalScrollIndicator={false}
      />

      <Modal visible={open !== null} animationType="slide" onRequestClose={() => setOpenId(null)}>
        {open && (
          <Reader
            stotra={open}
            favorite={favorites.has(open.id)}
            onToggleFavorite={() => toggleFavorite(open.id)}
            onClose={() => setOpenId(null)}
          />
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.canvas },
  pressed: { opacity: 0.85 },

  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.md,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.md,
    height: 44,
  },
  searchInput: { flex: 1, ...Type.body, color: Colors.ink, paddingVertical: 0 },

  chipRow: {
    gap: 8,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },

  list: { paddingHorizontal: Spacing.md },
  separator: { height: 8 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: Radius.card - 6,
    paddingVertical: 12,
    paddingHorizontal: Spacing.md,
  },
  rowBadge: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowDot: { width: 12, height: 12, borderRadius: 6 },
  rowTitle: { ...Type.label, color: Colors.ink },
  rowSub: { ...Type.bodySm, color: Colors.inkMute, marginTop: 1 },
  empty: { ...Type.body, color: Colors.inkMute, textAlign: 'center', marginTop: Spacing.xl },

  // Reader
  readerRoot: { flex: 1, backgroundColor: Colors.canvas },
  readerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  readerHeaderBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  readerHeaderTitle: { ...Type.title, color: Colors.ink, flex: 1, textAlign: 'center' },
  readerContent: { paddingHorizontal: Spacing.md, gap: Spacing.sm },
  readerMeta: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },

  aboutCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.card,
    padding: 20,
  },
  aboutTitle: { ...Type.heading, color: Colors.ink, marginBottom: 6 },
  aboutBody: { ...Type.body, color: Colors.ink },
  aboutOccasion: { ...Type.bodySm, color: Colors.ink, marginTop: Spacing.sm },

  verseCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.card,
    padding: 20,
  },
  verseLabel: { ...Type.caption, color: Colors.accent, marginBottom: Spacing.sm },
  verseSanskrit: {
    // No fontFamily — system font renders Devanagari
    fontSize: 20,
    lineHeight: 33,
    color: Colors.ink,
  },
  verseIast: {
    ...Type.bodySm,
    color: Colors.inkMute,
    fontStyle: 'italic',
    marginTop: Spacing.sm,
  },
  verseMeaningWrap: {
    backgroundColor: Colors.surfaceSoft,
    borderRadius: Radius.md,
    padding: Spacing.sm,
    marginTop: Spacing.sm,
  },
  verseMeaning: { ...Type.bodySm, color: Colors.ink, lineHeight: 20 },
});
