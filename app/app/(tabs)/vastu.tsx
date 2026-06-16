import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Type, Radius } from '../../constants/design';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

// ─── Content data ─────────────────────────────────────────────────────────────

interface VastuTip {
  id: string;
  title: string;
  summary: string;
  sanskritTerm: string;
  iast: string;
  why: string;
  tradition: string;
}

interface VastuRoom {
  id: string;
  icon: string;
  name: string;
  tagline: string;
  color: string;
  tips: VastuTip[];
}

const VASTU_ROOMS: VastuRoom[] = [
  {
    id: 'entrance',
    icon: '🚪',
    name: 'Entrance',
    tagline: 'The mouth of the home',
    color: Colors.blockCream,
    tips: [
      {
        id: 'entrance-1',
        title: 'Main door faces North, East, or North-East',
        summary: 'The primary entrance should ideally open to the North, East, or North-East for positive energy flow.',
        sanskritTerm: 'द्वार वास्तु',
        iast: 'dvāra vāstu',
        why: 'The North-East (Eshanya kona) is the zone of knowledge and divine energy. East brings morning sunlight — associated with Surya and health. South-facing entrances are generally avoided as they face Yama (the direction of endings).',
        tradition: 'Manasara Vastu Shastra',
      },
      {
        id: 'entrance-2',
        title: 'Keep the entrance well-lit and clutter-free',
        summary: 'Light and clear space at the entrance invites prosperity and positive chi.',
        sanskritTerm: 'तेजस्',
        iast: 'tejas',
        why: 'Tejas (radiance) represents fire and vitality. A dark or cluttered entrance blocks the natural flow of prana into the home, stagnating energy that should circulate freely through the space.',
        tradition: 'Vastu Vidya (classical)',
      },
      {
        id: 'entrance-3',
        title: 'Place a Ganesha idol or toran on the door',
        summary: 'A mango-leaf toran or Ganesha figure wards off negative energy at the threshold.',
        sanskritTerm: 'द्वारपाल',
        iast: 'dvārapāla',
        why: 'Dvārapāla literally means "guardian of the door." Ganesha as Vighnaharta (remover of obstacles) blesses all who enter. Mango leaves are considered auspicious and purifying by Agama tradition.',
        tradition: 'Agama Shastra / Temple Vastu',
      },
      {
        id: 'entrance-4',
        title: 'Threshold (doorstep) should be solid, not hollow',
        summary: 'A firm, well-maintained threshold prevents energy from seeping out of the home.',
        sanskritTerm: 'देहली',
        iast: 'dehalī',
        why: 'The dehalī is considered a sacred boundary between the outer world and inner sanctum. Cracked or hollow thresholds symbolise — and are believed to cause — instability in the household.',
        tradition: 'Vishwakarma Vastu Prakash',
      },
      {
        id: 'entrance-5',
        title: 'Avoid mirrors directly facing the front door',
        summary: 'A mirror facing the entrance reflects energy back outward before it enters.',
        sanskritTerm: 'दर्पण दोष',
        iast: 'darpaṇa doṣa',
        why: 'In both Vastu and Feng Shui-influenced modern practice, mirrors amplify and redirect energy. Placed directly opposite the door, they are said to repel the incoming positive flow, creating a constant sense of resistance for the household.',
        tradition: 'Contemporary Vastu (composite tradition)',
      },
    ],
  },
  {
    id: 'kitchen',
    icon: '🍳',
    name: 'Kitchen',
    tagline: 'Where Agni is honoured',
    color: Colors.blockCoral,
    tips: [
      {
        id: 'kitchen-1',
        title: 'Cook facing East — avoid cooking facing South',
        summary: 'The cook should stand facing East while cooking to align with the fire element.',
        sanskritTerm: 'अग्निकोण',
        iast: 'agnikona',
        why: 'East is the direction of the rising sun and Surya. The kitchen fire (agni) is considered a manifestation of the household deity Vaishwanara. Cooking while facing East channels solar energy into food, while South (Yama\'s direction) is avoided for active work.',
        tradition: 'Brihat Samhita (Varahamihira)',
      },
      {
        id: 'kitchen-2',
        title: 'Kitchen in the South-East corner',
        summary: 'The South-East (Agni kona) is the ideal zone for the kitchen and stove.',
        sanskritTerm: 'अग्नि कोण',
        iast: 'agni koṇa',
        why: 'In the Vastu Purusha Mandala, the South-East corner is governed by Agni, the fire deity. Placing the stove here aligns the fire element of cooking with the directional fire energy, preventing imbalances that may cause health issues or constant quarrels.',
        tradition: 'Vastu Purusha Mandala',
      },
      {
        id: 'kitchen-3',
        title: 'Keep the stove clean and in good repair',
        summary: 'A malfunctioning or dirty stove creates disturbance in the household agni.',
        sanskritTerm: 'अग्नि शुद्धि',
        iast: 'agni śuddhi',
        why: 'Agni Shuddhi (purity of fire) is essential in Hindu ritual and daily life. The household stove is a domestic altar. A broken burner or accumulated grease is considered a symbolic interruption of the family\'s prosperity and health.',
        tradition: 'Grihyasutra tradition',
      },
      {
        id: 'kitchen-4',
        title: 'Store grains in the South or West of the kitchen',
        summary: 'Heavy storage — grains, pulses, pots — belongs in the South or West.',
        sanskritTerm: 'धान्य निधान',
        iast: 'dhānya nidhāna',
        why: 'South and West carry the weight of Saturn and the earth element in the Vastu framework. Storing heavy items here grounds the kitchen, while keeping the North and East clear allows prosperity and light to flow freely.',
        tradition: 'Manasara',
      },
      {
        id: 'kitchen-5',
        title: 'Refrigerator should not be placed directly beside the stove',
        summary: 'The fire and water elements in direct contact create energetic conflict.',
        sanskritTerm: 'अग्नि-जल विरोध',
        iast: 'agni-jala virodha',
        why: 'Agni and Jala are opposing elements (pancha bhuta). Placing a refrigerator immediately next to a stove creates a constant clash of hot and cold — symbolically representing disputes and poor digestion in the home.',
        tradition: 'Contemporary Vastu',
      },
    ],
  },
  {
    id: 'bedroom',
    icon: '🛏️',
    name: 'Bedroom',
    tagline: 'Rest, health, and relationships',
    color: Colors.blockLilac,
    tips: [
      {
        id: 'bedroom-1',
        title: 'Sleep with your head pointing South',
        summary: 'Aligning with Earth\'s magnetic field supports deep, restful sleep.',
        sanskritTerm: 'दक्षिण शिरोनिद्रा',
        iast: 'dakṣiṇa śironidra',
        why: 'Earth\'s magnetic north pole is at the top of the globe; sleeping with head pointing South aligns your body\'s magnetic field with the Earth\'s. Pointing North creates an opposing force said to disturb sleep, blood pressure, and cognitive function — consistent with modern magnetism studies.',
        tradition: 'Charaka Samhita (Ayurveda) + Vastu Shastra',
      },
      {
        id: 'bedroom-2',
        title: 'Master bedroom in the South-West',
        summary: 'The South-West is the zone of stability, weight, and the Earth element — ideal for the head of household.',
        sanskritTerm: 'नैऋत्य कोण',
        iast: 'nairṛtya koṇa',
        why: 'The South-West (Nirriti/Nairriti corner) carries the heaviest energy in the Vastu Purusha Mandala, governed by the Earth element. Placing the master bedroom here grounds the household and reinforces the authority and stability of the primary resident.',
        tradition: 'Vastu Purusha Mandala',
      },
      {
        id: 'bedroom-3',
        title: 'Avoid a mirror reflecting the bed',
        summary: 'Mirrors facing the bed during sleep are inauspicious and disrupt rest.',
        sanskritTerm: 'दर्पण दोष',
        iast: 'darpaṇa doṣa',
        why: 'Classical Vastu considers mirrors energy amplifiers. A mirror reflecting a sleeping person is said to double the negative energies accumulated during dreaming, disrupting sleep quality and creating restlessness.',
        tradition: 'Vastu Shastra (composite classical)',
      },
      {
        id: 'bedroom-4',
        title: 'No electronic devices or screens directly facing the bed',
        summary: 'Screens emit EMF and light that disrupts melatonin and prana balance.',
        sanskritTerm: 'निद्रा दोष',
        iast: 'nidrā doṣa',
        why: 'Modern Vastu integrates electromagnetic considerations. The bedroom is a space of yin (passive) energy — screens represent active, stimulating energy. Placing them directly opposite the sleeping space creates chronic restlessness and poor sleep hygiene.',
        tradition: 'Contemporary Vastu',
      },
      {
        id: 'bedroom-5',
        title: 'Keep the bedroom door positioned so the bed is fully visible from it',
        summary: 'Seeing the door from the bed gives a subconscious sense of safety and command.',
        sanskritTerm: 'आधिपत्य स्थान',
        iast: 'ādhipatya sthāna',
        why: 'The "command position" — seeing the entrance without being directly in line with it — is recognised in both Vastu and classical Feng Shui. It minimises subconscious threat response, enabling deeper rest and reducing nighttime anxiety.',
        tradition: 'Vastu Shastra / Sthapatya Veda',
      },
    ],
  },
  {
    id: 'puja',
    icon: '🪔',
    name: 'Puja Room',
    tagline: 'The spiritual heart of the home',
    color: Colors.blockMint,
    tips: [
      {
        id: 'puja-1',
        title: 'Puja room in the North-East (Eshanya kona)',
        summary: 'The North-East corner holds the highest spiritual charge in Vastu and is ideal for the altar.',
        sanskritTerm: 'ईशान कोण',
        iast: 'īśāna koṇa',
        why: 'Eshanya (Ishana) — a form of Shiva — governs the North-East. This corner receives the maximum positive solar and cosmic energy in the morning. A puja room here ensures that spiritual practice is aligned with the most auspicious directional energy in the home.',
        tradition: 'Vastu Purusha Mandala / Agama Shastra',
      },
      {
        id: 'puja-2',
        title: 'Idols should face West, worshipper faces East',
        summary: 'Orient deities to face West so that the devotee faces East while praying.',
        sanskritTerm: 'देव मूर्ति दिशा',
        iast: 'deva mūrti diśā',
        why: 'Facing East during puja aligns the devotee with the rising sun and the direction of Indra (prosperity). The deity facing West ensures they "receive" the worshipper\'s eastward-facing energy. North-facing deities are also acceptable; South-facing is avoided.',
        tradition: 'Agama Shastra / Temple Vastu',
      },
      {
        id: 'puja-3',
        title: 'Keep idols at eye level or slightly above — never on the floor',
        summary: 'Deities placed at or above eye level command natural reverence.',
        sanskritTerm: 'देव प्रतिष्ठा',
        iast: 'deva pratiṣṭhā',
        why: 'Pratiṣṭhā (installation of the deity) requires that the image be elevated as a mark of honour. Idols placed on the floor create a posture of dominance over the divine — an inauspicious inversion of the devotional relationship.',
        tradition: 'Agama Shastra',
      },
      {
        id: 'puja-4',
        title: 'No bedroom puja room unless space is unavailable',
        summary: 'Mixing sleeping and prayer space creates energetic conflict.',
        sanskritTerm: 'देव गृह',
        iast: 'deva gṛha',
        why: 'The bedroom is associated with tamas (inertia, rest) while the puja room requires sattva (purity, luminosity). Combining them creates vibrational conflict, diluting the sanctity of the altar and disturbing the restful nature of the bedroom.',
        tradition: 'Manasara / Vastu Shastra',
      },
      {
        id: 'puja-5',
        title: 'Light a ghee lamp (diya) in the North-East direction',
        summary: 'Ghee lamps facing North-East amplify positive energy in the home.',
        sanskritTerm: 'ज्योति',
        iast: 'jyoti',
        why: 'Jyoti (sacred flame) is an active manifestation of Agni and consciousness. A ghee lamp in the North-East draws divine energy inward; the burning ghee also purifies air through natural antibacterial properties (butyric acid compound).',
        tradition: 'Tantra / Agama tradition',
      },
    ],
  },
  {
    id: 'directions',
    icon: '🧭',
    name: 'Directions',
    tagline: 'Cosmic grid of the home',
    color: Colors.blockLime,
    tips: [
      {
        id: 'dir-1',
        title: 'North: Zone of wealth and career (Kubera)',
        summary: 'Keep the North of the home open, uncluttered, and ideally with water features.',
        sanskritTerm: 'कुबेर दिशा',
        iast: 'kubera diśā',
        why: 'Kubera, the lord of wealth, governs the North. An open, light North sector allows wealth energy to enter freely. Heavy furniture, walls, or storage in the North is considered to block financial flow.',
        tradition: 'Vastu Purusha Mandala',
      },
      {
        id: 'dir-2',
        title: 'East: Sunrise, health, and social success (Indra)',
        summary: 'Keep the East open for morning light — ideal for living rooms and windows.',
        sanskritTerm: 'इन्द्र दिशा',
        iast: 'indra diśā',
        why: 'Indra governs the East and is associated with vitality, fame, and prosperity. Morning sun from the East provides Vitamin D and natural wake cycles. Blocking the East with heavy structures reduces both physical and symbolic vitality.',
        tradition: 'Brihat Samhita',
      },
      {
        id: 'dir-3',
        title: 'South: Rest, endings, and ancestors (Yama)',
        summary: 'The South is the domain of Yama; suitable for storage, guest rooms, or toilets.',
        sanskritTerm: 'यम दिशा',
        iast: 'yama diśā',
        why: 'Yama, the lord of death and dharma, governs the South. This direction is associated with completions and ancestral energy — not inherently negative, but unsuitable for main activities. Heavy walls on the South are actually recommended to contain Yama\'s energy.',
        tradition: 'Vastu Shastra (classical)',
      },
      {
        id: 'dir-4',
        title: 'West: Stability and rewards (Varuna)',
        summary: 'The West (Varuna\'s zone) suits dining rooms, study spaces, and children\'s rooms.',
        sanskritTerm: 'वरुण दिशा',
        iast: 'varuṇa diśā',
        why: 'Varuna, lord of water and cosmic order, governs the West. This direction carries the energy of rewards and completion — the setting sun. Study and dining here align effort with fruition. Water features in the West are also considered beneficial.',
        tradition: 'Vastu Purusha Mandala',
      },
    ],
  },
  {
    id: 'colours',
    icon: '🎨',
    name: 'Colours',
    tagline: 'Vibrational qualities of colour',
    color: Colors.blockPink,
    tips: [
      {
        id: 'col-1',
        title: 'White or cream for puja room and North-East',
        summary: 'Sattvic colours (white, light yellow) amplify purity and spiritual energy.',
        sanskritTerm: 'सात्त्विक वर्ण',
        iast: 'sāttvika varṇa',
        why: 'Sattva (purity and luminosity) is represented by white and light colours. In Tantra, each deity has an associated colour — white (Shiva, knowledge), yellow (Vishnu, sustenance). These colours in sacred spaces support meditative states.',
        tradition: 'Tantra / Agama Shastra',
      },
      {
        id: 'col-2',
        title: 'Blue or green for bedrooms',
        summary: 'Cool, calm colours in the bedroom promote restful sleep and emotional balance.',
        sanskritTerm: 'नील वर्ण',
        iast: 'nīla varṇa',
        why: 'Blue (nila) is associated with Vishnu, water, and the ether element — qualities of depth, calm, and infinite space. Green connects to Mercury and healing. Both colours have demonstrated physiological calming effects, reducing cortisol and heart rate.',
        tradition: 'Jyotish colour theory + Contemporary Vastu',
      },
      {
        id: 'col-3',
        title: 'Yellow or orange for living rooms and the East',
        summary: 'Warm, energising colours stimulate social energy and well-being.',
        sanskritTerm: 'पीत वर्ण',
        iast: 'pīta varṇa',
        why: 'Yellow (pita) is sacred to Jupiter (Brihaspati) — the planet of wisdom, expansion, and prosperity. East-facing rooms painted yellow or turmeric receive morning sunlight that activates the colour\'s warmth, creating an energising atmosphere for social activity.',
        tradition: 'Jyotish colour correspondences',
      },
      {
        id: 'col-4',
        title: 'Avoid black or dark grey in the North-East',
        summary: 'Dark colours in the Eshanya corner suppress the zone\'s spiritual energy.',
        sanskritTerm: 'कृष्ण वर्ण दोष',
        iast: 'kṛṣṇa varṇa doṣa',
        why: 'Black (krishna) is associated with Saturn and tamas — inertia and heaviness. In the North-East zone (highest sattvic energy), dark colours create a tamasic suppressant, dulling the spiritual charge of the corner and making the space feel oppressive.',
        tradition: 'Vastu Shastra (composite)',
      },
    ],
  },
  {
    id: 'dosdonts',
    icon: '✅',
    name: "Do's & Don'ts",
    tagline: 'Quick-reference principles',
    color: Colors.surfaceSoft,
    tips: [
      {
        id: 'dd-1',
        title: 'Keep the centre of the home (Brahmasthana) open',
        summary: 'The central zone should be free of heavy pillars, walls, or structural loads.',
        sanskritTerm: 'ब्रह्मस्थान',
        iast: 'brahmasthāna',
        why: 'The Brahmasthana is the navel of the Vastu Purusha Mandala — the zone through which prana circulates to all other sectors. Blocking it with structural weight is considered the most serious of all Vastu defects, creating stagnation in all aspects of life.',
        tradition: 'Vastu Purusha Mandala (classical)',
      },
      {
        id: 'dd-2',
        title: 'Avoid toilets and bathrooms in the North-East',
        summary: 'The most auspicious corner should not be used for waste disposal.',
        sanskritTerm: 'ईशान दोष',
        iast: 'īśāna doṣa',
        why: 'Placing a toilet in the North-East (Eshanya) is considered one of the most inauspicious placements. It directs the highest spiritual energy of the home into a space associated with elimination, creating constant drain on prosperity, health, and spiritual well-being.',
        tradition: 'Vastu Shastra (classical)',
      },
      {
        id: 'dd-3',
        title: 'Water bodies (tanks, wells) in North or North-East',
        summary: 'Underground water storage and sump tanks belong in the North or North-East.',
        sanskritTerm: 'जल स्थान',
        iast: 'jala sthāna',
        why: 'Water represents the North (Kubera\'s zone) and North-East (divine energy). Placing water storage underground in these zones creates a natural alignment of the water element with its directional correspondences, promoting flow of abundance.',
        tradition: 'Manasara',
      },
      {
        id: 'dd-4',
        title: 'No dried or artificial flowers inside the home',
        summary: 'Dried flowers represent stagnant, completed energy — not living prana.',
        sanskritTerm: 'पुष्प दोष',
        iast: 'puṣpa doṣa',
        why: 'Fresh flowers carry living prana (life force). Dried flowers have completed their life cycle and carry the energy of endings. In Vastu, artificial flowers lack prana entirely. Keeping them indoors introduces stagnant, lifeless energy into the home\'s energetic field.',
        tradition: 'Contemporary Vastu (composite)',
      },
      {
        id: 'dd-5',
        title: 'Clocks should always be running — never stop a clock',
        summary: 'A stopped clock represents frozen time and stagnation in the household.',
        sanskritTerm: 'काल शक्ति',
        iast: 'kāla śakti',
        why: 'Kala (time) is a manifestation of Shiva\'s cosmic dance. A stopped clock is considered highly inauspicious — it symbolises time standing still, blocking progress. In Vastu, keeping all clocks running maintains the dynamic flow of time and forward momentum.',
        tradition: 'Contemporary Vastu',
      },
      {
        id: 'dd-6',
        title: 'Avoid placing a bed or sofa directly below a beam',
        summary: 'Structural beams create downward pressure and oppressive energy on those below.',
        sanskritTerm: 'काष्ठ दण्ड दोष',
        iast: 'kāṣṭha daṇḍa doṣa',
        why: 'Heavy structural beams create concentrated downward force — physically and symbolically. Sitting or sleeping directly below a beam long-term is believed to cause chronic headaches, pressure, and relationship conflicts. This has a modern ergonomic parallel in "oppressive ceiling" psychology.',
        tradition: 'Vastu Shastra / Sthapatya Veda',
      },
    ],
  },
];

// ─── Tip card component ────────────────────────────────────────────────────────

function TipCard({ tip }: { tip: VastuTip }) {
  const [expanded, setExpanded] = useState(false);

  function toggle() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(e => !e);
  }

  return (
    <TouchableOpacity
      style={styles.tipCard}
      onPress={toggle}
      activeOpacity={0.85}
    >
      <View style={styles.tipHeader}>
        <Text style={styles.tipTitle}>{tip.title}</Text>
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={16}
          color={Colors.ink}
          style={{ opacity: 0.4, marginLeft: Spacing.xs }}
        />
      </View>
      <Text style={styles.tipSummary}>{tip.summary}</Text>

      {expanded && (
        <View style={styles.tipExpanded}>
          <View style={styles.divider} />
          <View style={styles.sanskritBlock}>
            <Text style={styles.sanskritText}>{tip.sanskritTerm}</Text>
            <Text style={styles.iastText}>{tip.iast}</Text>
          </View>
          <Text style={styles.whyLabel}>WHY THIS MATTERS</Text>
          <Text style={styles.whyText}>{tip.why}</Text>
          <Text style={styles.traditionText}>Source: {tip.tradition}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

// ─── Room card component ───────────────────────────────────────────────────────

function RoomCard({ room, onPress }: { room: VastuRoom; onPress: () => void }) {
  return (
    <TouchableOpacity
      style={[styles.roomCard, { backgroundColor: room.color }]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <Text style={styles.roomIcon}>{room.icon}</Text>
      <Text style={styles.roomName}>{room.name}</Text>
      <Text style={styles.roomTagline}>{room.tagline}</Text>
      <Text style={styles.roomCount}>{room.tips.length} tips</Text>
    </TouchableOpacity>
  );
}

// ─── Room detail view ─────────────────────────────────────────────────────────

function RoomDetail({ room, onBack }: { room: VastuRoom; onBack: () => void }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.detailRoot, { paddingTop: insets.top }]}>
      <View style={[styles.detailHeader, { backgroundColor: room.color }]}>
        <TouchableOpacity
          onPress={onBack}
          style={styles.backButton}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="arrow-back" size={20} color={Colors.ink} />
        </TouchableOpacity>
        <View style={styles.detailMeta}>
          <Text style={styles.detailIcon}>{room.icon}</Text>
          <Text style={styles.detailRoomName}>{room.name}</Text>
          <Text style={styles.detailTagline}>{room.tagline}</Text>
        </View>
      </View>

      <ScrollView
        style={styles.detailScroll}
        contentContainerStyle={[
          styles.detailContent,
          { paddingBottom: insets.bottom + Spacing.xl },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.tipsCountLabel}>{room.tips.length} tips · tap to expand</Text>
        {room.tips.map(tip => (
          <TipCard key={tip.id} tip={tip} />
        ))}
      </ScrollView>
    </View>
  );
}

// ─── Main tab ─────────────────────────────────────────────────────────────────

export default function VastuTab() {
  const insets = useSafeAreaInsets();
  const [activeRoom, setActiveRoom] = useState<VastuRoom | null>(null);

  if (activeRoom) {
    return <RoomDetail room={activeRoom} onBack={() => setActiveRoom(null)} />;
  }

  const half = Math.ceil(VASTU_ROOMS.length / 2);
  const leftColumn = VASTU_ROOMS.slice(0, half);
  const rightColumn = VASTU_ROOMS.slice(half);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Vastu Shastra</Text>
        <Text style={styles.pageSubtitle}>Ancient science of harmonious living</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + Spacing.xl }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.introCard}>
          <Text style={styles.introTitle}>वास्तु शास्त्र</Text>
          <Text style={styles.introBody}>
            Vastu Shastra is the traditional Hindu system of architecture and spatial arrangement. It aligns living spaces with cosmic forces — directions, elements, and planetary energy — to promote health, prosperity, and harmony. Choose a room below to explore its principles.
          </Text>
        </View>

        <View style={styles.grid}>
          <View style={styles.col}>
            {leftColumn.map(room => (
              <RoomCard key={room.id} room={room} onPress={() => setActiveRoom(room)} />
            ))}
          </View>
          <View style={styles.col}>
            {rightColumn.map(room => (
              <RoomCard key={room.id} room={room} onPress={() => setActiveRoom(room)} />
            ))}
          </View>
        </View>

        <View style={styles.disclaimerBox}>
          <Text style={styles.disclaimerText}>
            These tips represent traditional Vastu Shastra guidelines from classical texts (Manasara, Brihat Samhita, Vastu Purusha Mandala) and contemporary synthesis. Apply with intention; not all principles translate to every home layout.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.canvas,
  },
  pageHeader: {
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
  scrollContent: {
    padding: Spacing.md,
    gap: Spacing.md,
  },
  introCard: {
    backgroundColor: Colors.blockCream,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
  },
  introTitle: {
    fontSize: 28,
    lineHeight: 36,
    color: Colors.ink,
    marginBottom: Spacing.sm,
  },
  introBody: {
    ...Type.body,
    color: Colors.ink,
    opacity: 0.8,
  },
  grid: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  col: {
    flex: 1,
    gap: Spacing.sm,
  },
  roomCard: {
    borderRadius: Radius.lg,
    padding: Spacing.md,
    minHeight: 120,
  },
  roomIcon: {
    fontSize: 28,
    marginBottom: Spacing.xs,
  },
  roomName: {
    ...Type.cardTitle,
    color: Colors.ink,
    marginBottom: 2,
  },
  roomTagline: {
    ...Type.bodySm,
    color: Colors.ink,
    opacity: 0.6,
    marginBottom: Spacing.sm,
  },
  roomCount: {
    ...Type.caption,
    color: Colors.ink,
    opacity: 0.5,
  },
  disclaimerBox: {
    backgroundColor: Colors.surfaceSoft,
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.hairline,
  },
  disclaimerText: {
    ...Type.bodySm,
    color: Colors.ink,
    opacity: 0.5,
  },

  // ─── Room detail ───────────────────────────────────────────
  detailRoot: {
    flex: 1,
    backgroundColor: Colors.canvas,
  },
  detailHeader: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.lg,
  },
  backButton: {
    marginBottom: Spacing.md,
  },
  detailMeta: {
    gap: 2,
  },
  detailIcon: {
    fontSize: 32,
    marginBottom: Spacing.xs,
  },
  detailRoomName: {
    ...Type.headline,
    color: Colors.ink,
  },
  detailTagline: {
    ...Type.body,
    color: Colors.ink,
    opacity: 0.6,
  },
  detailScroll: {
    flex: 1,
  },
  detailContent: {
    padding: Spacing.md,
    gap: Spacing.xs,
  },
  tipsCountLabel: {
    ...Type.caption,
    color: Colors.ink,
    opacity: 0.4,
    marginBottom: Spacing.xs,
  },

  // ─── Tip card ──────────────────────────────────────────────
  tipCard: {
    backgroundColor: Colors.surfaceSoft,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.hairline,
  },
  tipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  tipTitle: {
    ...Type.cardTitle,
    color: Colors.ink,
    flex: 1,
    marginBottom: Spacing.xxs,
  },
  tipSummary: {
    ...Type.body,
    color: Colors.ink,
    opacity: 0.65,
    marginTop: Spacing.xxs,
  },
  tipExpanded: {
    marginTop: Spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.hairline,
    marginBottom: Spacing.md,
  },
  sanskritBlock: {
    backgroundColor: Colors.blockCream,
    borderRadius: Radius.md,
    padding: Spacing.sm,
    marginBottom: Spacing.md,
  },
  sanskritText: {
    fontSize: 20,
    lineHeight: 30,
    color: Colors.ink,
    marginBottom: 2,
  },
  iastText: {
    ...Type.body,
    color: Colors.ink,
    opacity: 0.6,
    fontStyle: 'italic',
  },
  whyLabel: {
    ...Type.eyebrow,
    color: Colors.ink,
    opacity: 0.5,
    marginBottom: Spacing.xs,
  },
  whyText: {
    ...Type.body,
    color: Colors.ink,
    marginBottom: Spacing.sm,
  },
  traditionText: {
    ...Type.bodySm,
    color: Colors.ink,
    opacity: 0.4,
    fontStyle: 'italic',
  },
});
