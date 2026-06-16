// Mock TODAY data — replace with live panchang-ts call in usePanchang hook
// panchang-ts API: getDailyPanchang(date, { latitude, longitude }, { timezone: offsetMinutes })

export interface TodayData {
  gregorian: {
    dayName: string;
    dayNameHindi: string;
    date: string;
  };
  vikramSamvat: {
    year: number;
    masaAmanta: string;
    paksha: 'Shukla' | 'Krishna';
  };
  tithi: {
    name: string;
    number: number;
    paksha: 'Shukla' | 'Krishna';
    endTime?: string;
  };
  nakshatra: {
    name: string;
    meaning: string;
    pada: number;
    endTime?: string;
    explanation?: string;
  };
  yoga: {
    name: string;
    meaning: string;
    endTime?: string;
    explanation?: string;
  };
  vara: {
    name: string;
    englishName: string;
    deity: string;
  };
  sunrise: string;
  sunset: string;
  rahuKalam?: { start: string; end: string; explanation?: string };
  vrat?: {
    name: string;
    significance?: string;
    guidelines?: string[];
    breakFastWindow?: string;
  };
  shloka: {
    name: string;
    context: string;
    sanskrit: string;
    iast: string;
    meaning: string;
  };
  doToday: string[];
  avoidToday: string[];
}

export const MOCK_TODAY: TodayData = {
  gregorian: {
    dayName: 'Monday',
    dayNameHindi: 'Somvaar',
    date: '15 June 2026',
  },
  vikramSamvat: {
    year: 2083,
    masaAmanta: 'Jyeshtha',
    paksha: 'Shukla',
  },
  tithi: {
    name: 'Ekadashi',
    number: 11,
    paksha: 'Shukla',
    endTime: '23:58',
  },
  nakshatra: {
    name: 'Mrigashira',
    meaning: "Deer's Head",
    pada: 3,
    endTime: '21:18',
    explanation:
      "Mrigashira is the 5th nakshatra, ruled by Mars. Its symbol is the deer's head — always searching, alert, curious. Days under Mrigashira suit travel, research, and beginning new searches. Pada 3 places it in Gemini's portion, adding intellectual restlessness to the day's energy.",
  },
  yoga: {
    name: 'Shiva',
    meaning: 'Auspicious',
    endTime: '14:32',
    explanation:
      'Yoga in the panchang measures the combined angular speed of the Sun and Moon — there are 27 yogas in each cycle. Shiva Yoga, though connected to fierce Rahu, is considered auspicious: Lord Shiva transforms obstacles into blessings. It is especially powerful for intense spiritual practice and removing past karmas.',
  },
  vara: {
    name: 'Somvaar',
    englishName: 'Monday',
    deity: 'Shiva',
  },
  sunrise: '06:14',
  sunset: '19:47',
  rahuKalam: {
    start: '07:30',
    end: '09:00',
    explanation:
      'Rahu is the north node of the Moon — a shadow entity in Vedic astrology, not a physical planet. Each day holds a 90-minute window governed by Rahu, considered inauspicious for starting new ventures, signing contracts, or making major decisions. Activities already in progress are unaffected. The effect is strongest at the very start of the window.',
  },
  vrat: {
    name: 'Nirjala Ekadashi',
    significance:
      'The most powerful of all Ekadashis. Fasting without water today carries the merit of all 24 Ekadashis in a single year.',
    guidelines: [
      'Begin the fast at sunrise — even water is excluded (nirjala means "waterless")',
      'Bathe before dawn and wear clean white or yellow cloth',
      'Chant Vishnu Sahasranama or recite the Ekadashi Mahatmya',
      'Stay awake for all or part of the night in prayer or kirtan',
    ],
    breakFastWindow: '06:14 – 09:00 AM, 16 June',
  },
  shloka: {
    name: 'Vishnu Ashtottara',
    context: 'Ekadashi Puja',
    sanskrit:
      'ओं नमो भगवते\nवासुदेवाय ।\nओं विष्णवे नमः ।\nओं नारायणाय नमः ॥',
    iast:
      'Oṃ namo bhagavate vāsudevāya |\nOṃ viṣṇave namaḥ |\nOṃ nārāyaṇāya namaḥ ||',
    meaning:
      'Salutations to Lord Vasudeva. Salutations to Vishnu, the all-pervading. Salutations to Narayana, the refuge of all beings.',
  },
  doToday: [
    'Observe the Ekadashi fast',
    'Visit a Vishnu temple',
    'Chant Vishnu Sahasranama',
    'Light a diya at dusk',
  ],
  avoidToday: [
    'Rice, wheat, and grains',
    'Non-vegetarian food',
    'Alcohol or intoxicants',
    'Daytime sleep',
  ],
};
