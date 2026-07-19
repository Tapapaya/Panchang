import React, { useState } from 'react';
import {
  LayoutAnimation,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  UIManager,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing, Type } from '../../constants/design';
import { Card, Chip, ScreenHeader, SectionLabel } from '../../components/ui/Kit';
import { Sheet } from '../../components/ui/Sheet';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

// ─── Vastu Purusha Mandala (3×3 direction grid) ──────────────────────────────

interface Direction {
  id: string;
  short: string;
  name: string;
  deity: string;
  element: string;
  use: string;
  color: string;
  wash: string;
  detail: string;
}

// Grid order: NW N NE / W C E / SW S SE (map-style, north at top)
const DIRECTIONS: Direction[] = [
  {
    id: 'nw', short: 'NW', name: 'North-West', deity: 'Vayu', element: 'Air',
    use: 'Guest room · stores', color: Colors.dataGray, wash: Colors.surfaceSoft,
    detail:
      'Vayavya kona, ruled by Vayu, the wind. The zone of movement and change — well suited to guest rooms, finished-goods storage, and anything meant to move on rather than stay. Restless energy here is natural; heavy permanence is not.',
  },
  {
    id: 'n', short: 'N', name: 'North', deity: 'Kubera', element: 'Water',
    use: 'Wealth · open space', color: Colors.dataGreen, wash: Colors.washGreen,
    detail:
      'Ruled by Kubera, lord of wealth. Keep the North light, open and uncluttered so prosperity can flow in — an ideal place for the entrance, windows, or a water feature. Heavy storage and tall walls here are said to block financial flow.',
  },
  {
    id: 'ne', short: 'NE', name: 'North-East', deity: 'Ishana', element: 'Ether',
    use: 'Puja · meditation', color: Colors.dataIndigo, wash: Colors.washIndigo,
    detail:
      'Ishana kona — the most sacred corner, ruled by Shiva as Ishana. It receives the first morning light and holds the highest spiritual charge: the ideal spot for the puja room, meditation, or study. Never place a toilet or heavy storage here.',
  },
  {
    id: 'w', short: 'W', name: 'West', deity: 'Varuna', element: 'Water',
    use: 'Dining · study · children', color: Colors.dataSky, wash: Colors.washSky,
    detail:
      'Ruled by Varuna, lord of waters and cosmic order. The direction of the setting sun carries the energy of rewards and completion — good for dining rooms, study spaces and children\'s rooms, where effort meets its fruit.',
  },
  {
    id: 'c', short: '·', name: 'Brahmasthan', deity: 'Brahma', element: 'Space',
    use: 'Keep open', color: Colors.dataAmber, wash: Colors.washAmber,
    detail:
      'The Brahmasthan is the navel of the Vastu Purusha Mandala — the open centre through which prana circulates to every other zone. Keep it free of pillars, heavy furniture and walls; blocking the centre is considered the most serious Vastu defect.',
  },
  {
    id: 'e', short: 'E', name: 'East', deity: 'Indra', element: 'Fire',
    use: 'Living room · windows', color: Colors.dataAmber, wash: Colors.washAmber,
    detail:
      'Ruled by Indra — vitality, fame and social success. Morning sun from the East brings light and health: keep it open with windows and living spaces. An East-facing entrance is among the most auspicious.',
  },
  {
    id: 'sw', short: 'SW', name: 'South-West', deity: 'Nirriti', element: 'Earth',
    use: 'Master bedroom', color: Colors.dataIndigo, wash: Colors.washIndigo,
    detail:
      'Nairritya kona, the heaviest corner, governed by the Earth element. Stability lives here — the right zone for the master bedroom and for the tallest, heaviest parts of the house. It anchors the authority of the household.',
  },
  {
    id: 's', short: 'S', name: 'South', deity: 'Yama', element: 'Earth',
    use: 'Storage · rest', color: Colors.dataGray, wash: Colors.surfaceSoft,
    detail:
      'Ruled by Yama, lord of dharma and endings. Not a negative zone, but one of completion and ancestral energy — suited to storage, guest rooms, and heavy southern walls that contain its weight. Avoid main entrances facing due South.',
  },
  {
    id: 'se', short: 'SE', name: 'South-East', deity: 'Agni', element: 'Fire',
    use: 'Kitchen', color: Colors.dataCoral, wash: Colors.washCoral,
    detail:
      'Agni kona — the fire corner. The kitchen and stove belong here, aligning cooking fire with the directional fire deity. Cook facing East; keep water elements (sink, fridge) a little apart from the flame.',
  },
];

// ─── Room guides ─────────────────────────────────────────────────────────────

interface VastuTip {
  id: string;
  title: string;
  summary: string;
  term: string;
  iast: string;
  why: string;
  tradition: string;
}

interface VastuRoom {
  id: string;
  icon: IoniconName;
  name: string;
  tagline: string;
  dot: string;
  wash: string;
  tips: VastuTip[];
}

const ROOMS: VastuRoom[] = [
  {
    id: 'entrance',
    icon: 'enter-outline',
    name: 'Entrance',
    tagline: 'The mouth of the home',
    dot: Colors.dataAmber,
    wash: Colors.washAmber,
    tips: [
      {
        id: 'entrance-1',
        title: 'Main door faces North, East, or North-East',
        summary: 'The primary entrance should ideally open North, East or North-East for positive flow.',
        term: 'द्वार वास्तु', iast: 'dvāra vāstu',
        why: 'The North-East (Ishana kona) is the zone of knowledge and divine energy; East brings morning sunlight, associated with Surya and health. South-facing entrances are generally avoided as they face Yama\'s direction.',
        tradition: 'Manasara Vastu Shastra',
      },
      {
        id: 'entrance-2',
        title: 'Keep the entrance well-lit and clutter-free',
        summary: 'Light and clear space at the threshold invite prosperity.',
        term: 'तेजस्', iast: 'tejas',
        why: 'Tejas (radiance) represents fire and vitality. A dark or cluttered entrance blocks the natural flow of prana into the home, stagnating energy that should circulate freely.',
        tradition: 'Vastu Vidya (classical)',
      },
      {
        id: 'entrance-3',
        title: 'Place a Ganesha image or toran at the door',
        summary: 'A mango-leaf toran or Ganesha figure guards the threshold.',
        term: 'द्वारपाल', iast: 'dvārapāla',
        why: 'Dvarapala means "guardian of the door". Ganesha as Vighnaharta blesses all who enter; mango leaves are held auspicious and purifying in the Agama tradition.',
        tradition: 'Agama Shastra / Temple Vastu',
      },
      {
        id: 'entrance-4',
        title: 'The threshold should be solid, not cracked',
        summary: 'A firm, well-kept doorstep keeps energy from seeping out.',
        term: 'देहली', iast: 'dehalī',
        why: 'The dehali is a sacred boundary between the outer world and the inner sanctum. Cracked or hollow thresholds symbolise — and are believed to invite — instability in the household.',
        tradition: 'Vishwakarma Vastu Prakash',
      },
      {
        id: 'entrance-5',
        title: 'Avoid mirrors directly facing the front door',
        summary: 'A mirror opposite the entrance reflects energy back out.',
        term: 'दर्पण दोष', iast: 'darpaṇa doṣa',
        why: 'Mirrors amplify and redirect energy. Placed opposite the door they are said to repel the incoming positive flow, creating a constant sense of resistance.',
        tradition: 'Contemporary Vastu',
      },
    ],
  },
  {
    id: 'kitchen',
    icon: 'flame-outline',
    name: 'Kitchen',
    tagline: 'Where Agni is honoured',
    dot: Colors.dataCoral,
    wash: Colors.washCoral,
    tips: [
      {
        id: 'kitchen-1',
        title: 'Cook facing East',
        summary: 'The cook should face East to align with the fire element; avoid facing South.',
        term: 'अग्निकोण', iast: 'agnikoṇa',
        why: 'East is the direction of the rising sun. The kitchen fire is a manifestation of Vaishvanara; cooking facing East channels solar energy into food, while South — Yama\'s direction — is avoided for active work.',
        tradition: 'Brihat Samhita (Varahamihira)',
      },
      {
        id: 'kitchen-2',
        title: 'Kitchen in the South-East corner',
        summary: 'The Agni kona is the ideal zone for the stove.',
        term: 'अग्नि कोण', iast: 'agni koṇa',
        why: 'In the Vastu Purusha Mandala the South-East is governed by Agni. Placing the stove here aligns the fire of cooking with the directional fire energy.',
        tradition: 'Vastu Purusha Mandala',
      },
      {
        id: 'kitchen-3',
        title: 'Keep the stove clean and working',
        summary: 'A dirty or broken stove disturbs the household agni.',
        term: 'अग्नि शुद्धि', iast: 'agni śuddhi',
        why: 'The household stove is a domestic altar. A broken burner or accumulated grease is a symbolic interruption of the family\'s prosperity and health.',
        tradition: 'Grihyasutra tradition',
      },
      {
        id: 'kitchen-4',
        title: 'Store grains in the South or West',
        summary: 'Heavy storage belongs in the South or West of the kitchen.',
        term: 'धान्य निधान', iast: 'dhānya nidhāna',
        why: 'South and West carry the weight of the earth element. Storing heavy items there grounds the kitchen, keeping the North and East clear for light and flow.',
        tradition: 'Manasara',
      },
      {
        id: 'kitchen-5',
        title: 'Keep the fridge a little away from the stove',
        summary: 'Fire and water in direct contact create elemental conflict.',
        term: 'अग्नि-जल विरोध', iast: 'agni-jala virodha',
        why: 'Agni and Jala are opposing elements among the pancha bhutas. A refrigerator immediately beside a stove sets hot against cold — symbolically, disputes and poor digestion.',
        tradition: 'Contemporary Vastu',
      },
    ],
  },
  {
    id: 'bedroom',
    icon: 'bed-outline',
    name: 'Bedroom',
    tagline: 'Rest, health and relationships',
    dot: Colors.dataIndigo,
    wash: Colors.washIndigo,
    tips: [
      {
        id: 'bedroom-1',
        title: 'Sleep with your head pointing South',
        summary: 'Head South (or East) supports deep, restful sleep.',
        term: 'दक्षिण शिरोनिद्रा', iast: 'dakṣiṇa śironidra',
        why: 'Sleeping with the head South aligns the body with the Earth\'s magnetic field; pointing North is said to oppose it, disturbing sleep and blood pressure in both Ayurvedic and Vastu accounts.',
        tradition: 'Charaka Samhita + Vastu Shastra',
      },
      {
        id: 'bedroom-2',
        title: 'Master bedroom in the South-West',
        summary: 'The heaviest corner suits the head of the household.',
        term: 'नैऋत्य कोण', iast: 'nairṛtya koṇa',
        why: 'The South-West carries the heaviest, most stable energy in the mandala. A master bedroom here grounds the household and reinforces the stability of its primary residents.',
        tradition: 'Vastu Purusha Mandala',
      },
      {
        id: 'bedroom-3',
        title: 'No mirror reflecting the bed',
        summary: 'Mirrors facing a sleeper disrupt rest.',
        term: 'दर्पण दोष', iast: 'darpaṇa doṣa',
        why: 'Classical Vastu treats mirrors as energy amplifiers; one reflecting a sleeping person is said to double the disturbances of the night and create restlessness.',
        tradition: 'Vastu Shastra (classical)',
      },
      {
        id: 'bedroom-4',
        title: 'Keep screens out of the line of the bed',
        summary: 'The bedroom is passive space; screens are active energy.',
        term: 'निद्रा दोष', iast: 'nidrā doṣa',
        why: 'The bedroom belongs to restful (tamasic-passive) energy; screens represent stimulation. Directly facing the bed they work against melatonin and calm — a modern reading Vastu practitioners share with sleep science.',
        tradition: 'Contemporary Vastu',
      },
      {
        id: 'bedroom-5',
        title: 'See the door from the bed',
        summary: 'The bed should command a view of the door without being in line with it.',
        term: 'आधिपत्य स्थान', iast: 'ādhipatya sthāna',
        why: 'The command position minimises the subconscious threat response — deeper rest, less night-time anxiety — a principle Vastu shares with Sthapatya Veda.',
        tradition: 'Vastu / Sthapatya Veda',
      },
    ],
  },
  {
    id: 'puja',
    icon: 'sparkles-outline',
    name: 'Puja room',
    tagline: 'The spiritual heart of the home',
    dot: Colors.dataGreen,
    wash: Colors.washGreen,
    tips: [
      {
        id: 'puja-1',
        title: 'Puja room in the North-East',
        summary: 'The Ishana corner holds the highest spiritual charge.',
        term: 'ईशान कोण', iast: 'īśāna koṇa',
        why: 'Ishana — a form of Shiva — governs the North-East, which receives maximum positive solar energy in the morning. An altar here aligns practice with the most auspicious zone of the home.',
        tradition: 'Vastu Purusha Mandala / Agama',
      },
      {
        id: 'puja-2',
        title: 'Deities face West; you face East',
        summary: 'Orient images so the worshipper faces East while praying.',
        term: 'देव मूर्ति दिशा', iast: 'deva mūrti diśā',
        why: 'Facing East during puja aligns the devotee with the rising sun. North-facing deities are also acceptable; South-facing is avoided.',
        tradition: 'Agama Shastra / Temple Vastu',
      },
      {
        id: 'puja-3',
        title: 'Idols at eye level, never on the floor',
        summary: 'Deities placed at or above eye level command natural reverence.',
        term: 'देव प्रतिष्ठा', iast: 'deva pratiṣṭhā',
        why: 'Pratishtha — installation of the deity — requires the image be elevated as a mark of honour; placing it on the floor inverts the devotional relationship.',
        tradition: 'Agama Shastra',
      },
      {
        id: 'puja-4',
        title: 'Avoid an altar in the bedroom if possible',
        summary: 'Sleeping and prayer space carry conflicting energies.',
        term: 'देव गृह', iast: 'deva gṛha',
        why: 'The bedroom leans tamasic (rest); the altar requires sattva (luminosity). If space forces the combination, screen the altar with a curtain when not in use.',
        tradition: 'Manasara / Vastu Shastra',
      },
      {
        id: 'puja-5',
        title: 'Light a ghee lamp toward the North-East',
        summary: 'A diya in the North-East amplifies the zone\'s positive energy.',
        term: 'ज्योति', iast: 'jyoti',
        why: 'Jyoti, the sacred flame, is an active form of Agni and consciousness; in the North-East it draws the corner\'s energy inward — and burning ghee purifies the air.',
        tradition: 'Tantra / Agama tradition',
      },
    ],
  },
  {
    id: 'colours',
    icon: 'color-palette-outline',
    name: 'Colours',
    tagline: 'Vibrational qualities of colour',
    dot: Colors.dataSky,
    wash: Colors.washSky,
    tips: [
      {
        id: 'col-1',
        title: 'White or cream for the puja room and North-East',
        summary: 'Sattvic colours amplify purity and spiritual energy.',
        term: 'सात्त्विक वर्ण', iast: 'sāttvika varṇa',
        why: 'Sattva — purity and luminosity — is represented by white and light hues. White belongs to knowledge (Shiva), light yellow to sustenance (Vishnu); both support meditative states in sacred spaces.',
        tradition: 'Tantra / Agama Shastra',
      },
      {
        id: 'col-2',
        title: 'Blue or green for bedrooms',
        summary: 'Cool, calm colours promote rest and emotional balance.',
        term: 'नील वर्ण', iast: 'nīla varṇa',
        why: 'Blue is associated with Vishnu, water and ether — depth and calm; green with Mercury and healing. Both measurably lower arousal, matching their traditional assignments.',
        tradition: 'Jyotish colour theory',
      },
      {
        id: 'col-3',
        title: 'Yellow or orange for living rooms and the East',
        summary: 'Warm colours stimulate social energy and well-being.',
        term: 'पीत वर्ण', iast: 'pīta varṇa',
        why: 'Yellow is sacred to Brihaspati (Jupiter) — wisdom and expansion. East-facing rooms in yellow catch the morning sun, activating warmth for social spaces.',
        tradition: 'Jyotish correspondences',
      },
      {
        id: 'col-4',
        title: 'Avoid black or dark grey in the North-East',
        summary: 'Dark colours suppress the corner\'s spiritual energy.',
        term: 'कृष्ण वर्ण दोष', iast: 'kṛṣṇa varṇa doṣa',
        why: 'Black belongs to Saturn and tamas — inertia and heaviness. In the most sattvic corner of the home it acts as a suppressant, dulling the zone\'s charge.',
        tradition: 'Vastu Shastra (composite)',
      },
    ],
  },
  {
    id: 'dosdonts',
    icon: 'checkmark-circle-outline',
    name: 'Essentials',
    tagline: 'Quick-reference principles',
    dot: Colors.dataLime,
    wash: Colors.washLime,
    tips: [
      {
        id: 'dd-1',
        title: 'Keep the centre of the home open',
        summary: 'The Brahmasthan should be free of pillars, walls and heavy loads.',
        term: 'ब्रह्मस्थान', iast: 'brahmasthāna',
        why: 'The Brahmasthan is the navel of the mandala, through which prana circulates to every sector. Blocking it is considered the most serious of all Vastu defects.',
        tradition: 'Vastu Purusha Mandala',
      },
      {
        id: 'dd-2',
        title: 'No toilets in the North-East',
        summary: 'The most auspicious corner must not carry waste.',
        term: 'ईशान दोष', iast: 'īśāna doṣa',
        why: 'A toilet in the Ishana corner directs the home\'s highest spiritual energy into elimination — a constant drain on health and prosperity in the classical account.',
        tradition: 'Vastu Shastra (classical)',
      },
      {
        id: 'dd-3',
        title: 'Water storage in the North or North-East',
        summary: 'Tanks, wells and sumps belong in Kubera\'s and Ishana\'s zones.',
        term: 'जल स्थान', iast: 'jala sthāna',
        why: 'Water corresponds to the North and North-East; placing water storage there aligns the element with its directions, promoting flow of abundance.',
        tradition: 'Manasara',
      },
      {
        id: 'dd-4',
        title: 'Prefer fresh flowers to dried or artificial ones',
        summary: 'Fresh flowers carry living prana; dried ones carry endings.',
        term: 'पुष्प दोष', iast: 'puṣpa doṣa',
        why: 'Fresh flowers carry life force; dried flowers have completed their cycle and artificial ones never had prana. Vastu keeps living energy in the home\'s field.',
        tradition: 'Contemporary Vastu',
      },
      {
        id: 'dd-5',
        title: 'Keep every clock running',
        summary: 'A stopped clock represents frozen time and stagnation.',
        term: 'काल शक्ति', iast: 'kāla śakti',
        why: 'Kala — time — is Shiva\'s cosmic dance. A stopped clock symbolises stalled progress; running clocks maintain the forward flow of the household.',
        tradition: 'Contemporary Vastu',
      },
      {
        id: 'dd-6',
        title: 'Avoid beds and sofas directly under beams',
        summary: 'Exposed beams press down on the space beneath them.',
        term: 'काष्ठ दण्ड दोष', iast: 'kāṣṭha daṇḍa doṣa',
        why: 'A beam concentrates structural weight overhead; long-term sitting or sleeping beneath one is linked in Vastu to pressure, headaches and friction — with a modern parallel in "oppressive ceiling" psychology.',
        tradition: 'Vastu / Sthapatya Veda',
      },
    ],
  },
];

// ─── Screen ──────────────────────────────────────────────────────────────────

export default function VastuTab() {
  const insets = useSafeAreaInsets();
  const [openRoom, setOpenRoom] = useState<string | null>(null);
  const [openTip, setOpenTip] = useState<string | null>(null);
  const [direction, setDirection] = useState<Direction | null>(null);

  function toggleRoom(id: string) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenRoom(prev => (prev === id ? null : id));
    setOpenTip(null);
  }

  function toggleTip(id: string) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenTip(prev => (prev === id ? null : id));
  }

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <ScreenHeader title="Vastu" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + Spacing.xl }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── Direction grid ──────────────────────────────────────── */}
        <SectionLabel text="Direction map" />
        <Card>
          <Text style={styles.gridHint}>
            The Vastu Purusha Mandala — tap any zone. North is at the top.
          </Text>
          <View style={styles.grid}>
            {DIRECTIONS.map(dir => (
              <Pressable
                key={dir.id}
                onPress={() => setDirection(dir)}
                accessibilityRole="button"
                style={({ pressed }) => [
                  styles.cell,
                  { backgroundColor: dir.wash },
                  pressed && { opacity: 0.8 },
                ]}
              >
                <View style={[styles.cellDot, { backgroundColor: dir.color }]} />
                <Text style={styles.cellShort}>{dir.short}</Text>
                <Text style={styles.cellDeity}>{dir.deity}</Text>
              </Pressable>
            ))}
          </View>
        </Card>

        {/* ─── Rooms ───────────────────────────────────────────────── */}
        <SectionLabel text="Room guides" />
        {ROOMS.map(room => {
          const expanded = openRoom === room.id;
          return (
            <Card key={room.id} style={{ paddingVertical: 14 }}>
              <Pressable
                onPress={() => toggleRoom(room.id)}
                accessibilityRole="button"
                style={styles.roomHeader}
              >
                <View style={[styles.roomIcon, { backgroundColor: room.wash }]}>
                  <Ionicons name={room.icon} size={20} color={Colors.ink} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.roomName}>{room.name}</Text>
                  <Text style={styles.roomTagline}>{room.tagline}</Text>
                </View>
                <Text style={styles.roomCount}>{room.tips.length}</Text>
                <Ionicons
                  name={expanded ? 'chevron-up' : 'chevron-down'}
                  size={16}
                  color={Colors.inkFaint}
                />
              </Pressable>

              {expanded && (
                <View style={styles.tipList}>
                  {room.tips.map(tip => {
                    const tipOpen = openTip === tip.id;
                    return (
                      <Pressable
                        key={tip.id}
                        onPress={() => toggleTip(tip.id)}
                        accessibilityRole="button"
                        style={styles.tip}
                      >
                        <View style={styles.tipHeader}>
                          <View style={[styles.tipDot, { backgroundColor: room.dot }]} />
                          <Text style={styles.tipTitle}>{tip.title}</Text>
                        </View>
                        <Text style={styles.tipSummary}>{tip.summary}</Text>
                        {tipOpen && (
                          <View style={styles.tipDetail}>
                            <View style={styles.tipTermRow}>
                              <Text style={styles.tipTerm}>{tip.term}</Text>
                              <Text style={styles.tipIast}>{tip.iast}</Text>
                            </View>
                            <Text style={styles.tipWhy}>{tip.why}</Text>
                            <Chip label={tip.tradition} />
                          </View>
                        )}
                      </Pressable>
                    );
                  })}
                </View>
              )}
            </Card>
          );
        })}
      </ScrollView>

      {/* ─── Direction sheet ─────────────────────────────────────── */}
      <Sheet visible={direction !== null} onClose={() => setDirection(null)}>
        {direction && (
          <View style={{ paddingBottom: Spacing.sm }}>
            <View style={styles.sheetHeader}>
              <View style={[styles.cellDot, { backgroundColor: direction.color }]} />
              <Text style={styles.sheetTitle}>{direction.name}</Text>
            </View>
            <View style={styles.sheetChips}>
              <Chip label={`Deity · ${direction.deity}`} wash={direction.wash} dot={direction.color} />
              <Chip label={`Element · ${direction.element}`} />
              <Chip label={direction.use} />
            </View>
            <Text style={styles.sheetBody}>{direction.detail}</Text>
          </View>
        )}
      </Sheet>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.canvas },
  content: { paddingHorizontal: Spacing.md, gap: Spacing.sm, paddingTop: Spacing.xs },

  gridHint: { ...Type.bodySm, color: Colors.inkMute, marginBottom: Spacing.sm },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  cell: {
    width: '31%',
    flexGrow: 1,
    aspectRatio: 1.15,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  cellDot: { width: 8, height: 8, borderRadius: 4 },
  cellShort: { ...Type.heading, color: Colors.ink },
  cellDeity: { ...Type.captionSm, color: Colors.inkMute },

  roomHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  roomIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roomName: { ...Type.label, color: Colors.ink },
  roomTagline: { ...Type.bodySm, color: Colors.inkMute, marginTop: 1 },
  roomCount: { ...Type.caption, color: Colors.inkFaint },

  tipList: { marginTop: Spacing.sm, gap: Spacing.xs },
  tip: {
    backgroundColor: Colors.surfaceSoft,
    borderRadius: Radius.md,
    padding: Spacing.sm,
  },
  tipHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  tipDot: { width: 8, height: 8, borderRadius: 4, marginTop: 6 },
  tipTitle: { ...Type.label, color: Colors.ink, flex: 1 },
  tipSummary: { ...Type.bodySm, color: Colors.inkMute, marginTop: 4, marginLeft: 16 },
  tipDetail: { marginTop: Spacing.sm, marginLeft: 16, gap: Spacing.xs },
  tipTermRow: { flexDirection: 'row', alignItems: 'baseline', gap: 8 },
  tipTerm: { fontSize: 15, color: Colors.ink },
  tipIast: { ...Type.bodySm, color: Colors.inkMute, fontStyle: 'italic' },
  tipWhy: { ...Type.bodySm, color: Colors.ink },

  sheetHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: Spacing.sm },
  sheetTitle: { ...Type.title, color: Colors.ink },
  sheetChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: Spacing.sm },
  sheetBody: { ...Type.body, color: Colors.ink },
});
