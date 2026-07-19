import type { Stotra } from './types';

export const UNIVERSAL_STOTRAS: Stotra[] = [
  {
    id: 'gayatri-mantra',
    title: 'Gayatri Mantra',
    deity: 'Surya',
    category: 'Vedic',
    occasion: 'Sunrise, noon and sunset (sandhya); daily practice',
    about:
      'Rigveda 3.62.10, the most sacred mantra of the Vedas, addressed to Savitri — the solar power that illumines all realms. Traditionally received at the sacred-thread ceremony and repeated at the three junctions of the day, it is a prayer for the awakening of the intellect itself.',
    complete: true,
    verses: [
      {
        sanskrit: 'ॐ भूर्भुवः स्वः।\nतत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि।\nधियो यो नः प्रचोदयात्॥',
        iast: 'Oṃ bhūrbhuvaḥ svaḥ\ntatsaviturvareṇyaṃ bhargo devasya dhīmahi\ndhiyo yo naḥ pracodayāt',
        meaning:
          'Om — earth, mid-air, heaven. We meditate on the adorable radiance of the divine Savitri (the Sun). May he inspire our intellects.',
      },
    ],
  },
  {
    id: 'surya-navagraha',
    title: 'Surya Dhyana Mantra',
    deity: 'Surya',
    category: 'Mantra',
    occasion: 'Sundays; sunrise; Chhath Puja',
    about:
      'The meditation verse of the Sun from the Navagraha hymns, with Surya\'s bija mantra. Recited at sunrise — often with the water-offering (arghya) — for vitality, clarity and the dispelling of inner darkness.',
    complete: true,
    verses: [
      {
        sanskrit: 'जपाकुसुमसङ्काशं काश्यपेयं महाद्युतिम्।\nतमोऽरिं सर्वपापघ्नं प्रणतोऽस्मि दिवाकरम्॥',
        iast: 'Japākusumasaṅkāśaṃ kāśyapeyaṃ mahādyutim\ntamo\'riṃ sarvapāpaghnaṃ praṇato\'smi divākaram',
        meaning:
          'Radiant as the hibiscus flower, son of Kashyapa, of great splendour, enemy of darkness, destroyer of every sin — I bow to the maker of the day.',
      },
      {
        sanskrit: 'ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः।',
        iast: 'Oṃ hrāṃ hrīṃ hrauṃ saḥ sūryāya namaḥ',
        meaning: 'The seed-syllable invocation of Surya: Om, salutations to the Sun.',
        label: 'Bija mantra',
      },
    ],
  },
  {
    id: 'navagraha-stotra',
    title: 'Navagraha Stotra',
    deity: 'Navagraha',
    category: 'Stotra',
    occasion: 'Daily or on each planet\'s weekday; Navagraha puja',
    composer: 'Vyasa (traditional)',
    about:
      'Nine verses, one for each graha — Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu and Ketu. Reciting the set (or the day\'s verse — Sun on Sunday, Moon on Monday, and so on) is the simplest of all planetary remedies in the Jyotish tradition.',
    complete: true,
    verses: [
      {
        sanskrit: 'जपाकुसुमसङ्काशं काश्यपेयं महाद्युतिम्।\nतमोऽरिं सर्वपापघ्नं प्रणतोऽस्मि दिवाकरम्॥',
        iast: 'Japākusumasaṅkāśaṃ kāśyapeyaṃ mahādyutim\ntamo\'riṃ sarvapāpaghnaṃ praṇato\'smi divākaram',
        meaning: 'Radiant as the hibiscus, son of Kashyapa, great in splendour, foe of darkness, destroyer of sin — I bow to Surya, maker of the day.',
        label: 'Surya — Sunday',
      },
      {
        sanskrit: 'दधिशङ्खतुषाराभं क्षीरोदार्णवसम्भवम्।\nनमामि शशिनं सोमं शम्भोर्मुकुटभूषणम्॥',
        iast: 'Dadhiśaṅkhatuṣārābhaṃ kṣīrodārṇavasambhavam\nnamāmi śaśinaṃ somaṃ śambhormukuṭabhūṣaṇam',
        meaning: 'White as curd, conch and snow, born of the milk ocean — I bow to the Moon, Soma, the jewel on Shiva\'s crown.',
        label: 'Chandra — Monday',
      },
      {
        sanskrit: 'धरणीगर्भसम्भूतं विद्युत्कान्तिसमप्रभम्।\nकुमारं शक्तिहस्तं तं मङ्गलं प्रणमाम्यहम्॥',
        iast: 'Dharaṇīgarbhasambhūtaṃ vidyutkāntisamaprabham\nkumāraṃ śaktihastaṃ taṃ maṅgalaṃ praṇamāmyaham',
        meaning: 'Born from the womb of the Earth, bright as lightning, the youth with the spear in hand — I bow to Mangala (Mars).',
        label: 'Mangala — Tuesday',
      },
      {
        sanskrit: 'प्रियङ्गुकलिकाश्यामं रूपेणाप्रतिमं बुधम्।\nसौम्यं सौम्यगुणोपेतं तं बुधं प्रणमाम्यहम्॥',
        iast: 'Priyaṅgukalikāśyāmaṃ rūpeṇāpratimaṃ budham\nsaumyaṃ saumyaguṇopetaṃ taṃ budhaṃ praṇamāmyaham',
        meaning: 'Dark as the priyangu bud, matchless in form, gentle son of the Moon endowed with gentle qualities — I bow to Budha (Mercury).',
        label: 'Budha — Wednesday',
      },
      {
        sanskrit: 'देवानां च ऋषीणां च गुरुं काञ्चनसन्निभम्।\nबुद्धिभूतं त्रिलोकेशं तं नमामि बृहस्पतिम्॥',
        iast: 'Devānāṃ ca ṛṣīṇāṃ ca guruṃ kāñcanasannibham\nbuddhibhūtaṃ trilokeśaṃ taṃ namāmi bṛhaspatim',
        meaning: 'Teacher of gods and sages, lustrous as gold, wisdom embodied, lord of the three worlds — I bow to Brihaspati (Jupiter).',
        label: 'Guru — Thursday',
      },
      {
        sanskrit: 'हिमकुन्दमृणालाभं दैत्यानां परमं गुरुम्।\nसर्वशास्त्रप्रवक्तारं भार्गवं प्रणमाम्यहम्॥',
        iast: 'Himakundamṛṇālābhaṃ daityānāṃ paramaṃ gurum\nsarvaśāstrapravaktāraṃ bhārgavaṃ praṇamāmyaham',
        meaning: 'White as snow, jasmine and lotus-fibre, supreme teacher of the daityas, expounder of all the shastras — I bow to Shukra (Venus), scion of Bhrigu.',
        label: 'Shukra — Friday',
      },
      {
        sanskrit: 'नीलाञ्जनसमाभासं रविपुत्रं यमाग्रजम्।\nछायामार्तण्डसम्भूतं तं नमामि शनैश्चरम्॥',
        iast: 'Nīlāñjanasamābhāsaṃ raviputraṃ yamāgrajam\nchāyāmārtaṇḍasambhūtaṃ taṃ namāmi śanaiścaram',
        meaning: 'Dark as blue collyrium, son of the Sun and elder brother of Yama, born of Chhaya and Martanda — I bow to slow-moving Shani (Saturn).',
        label: 'Shani — Saturday',
      },
      {
        sanskrit: 'अर्धकायं महावीर्यं चन्द्रादित्यविमर्दनम्।\nसिंहिकागर्भसम्भूतं तं राहुं प्रणमाम्यहम्॥',
        iast: 'Ardhakāyaṃ mahāvīryaṃ candrādityavimardanam\nsiṃhikāgarbhasambhūtaṃ taṃ rāhuṃ praṇamāmyaham',
        meaning: 'Half-bodied, of great power, oppressor of Moon and Sun, born of Simhika\'s womb — I bow to Rahu.',
        label: 'Rahu',
      },
      {
        sanskrit: 'पलाशपुष्पसङ्काशं तारकाग्रहमस्तकम्।\nरौद्रं रौद्रात्मकं घोरं तं केतुं प्रणमाम्यहम्॥',
        iast: 'Palāśapuṣpasaṅkāśaṃ tārakāgrahamastakam\nraudraṃ raudrātmakaṃ ghoraṃ taṃ ketuṃ praṇamāmyaham',
        meaning: 'Red as the palasha flower, crest among stars and planets, fierce and formidable — I bow to Ketu.',
        label: 'Ketu',
      },
    ],
  },
  {
    id: 'purnima-chandranamaskara',
    title: 'Chandra Gayatri',
    deity: 'Chandra',
    category: 'Mantra',
    occasion: 'Purnima evening; Karva Chauth; moonrise',
    about:
      'The Gayatri of the Moon, recited on full-moon evenings and at moonrise on fasting days such as Karva Chauth and Sankashti Chaturthi, when sighting the moon completes the vrat.',
    complete: true,
    verses: [
      {
        sanskrit: 'ॐ क्षीरपुत्राय विद्महे अमृततत्त्वाय धीमहि।\nतन्नो चन्द्रः प्रचोदयात्॥',
        iast: 'Oṃ kṣīraputrāya vidmahe amṛtatattvāya dhīmahi\ntanno candraḥ pracodayāt',
        meaning:
          'We know the son of the milk ocean; we meditate on the essence of nectar. May the Moon inspire and illumine us.',
      },
    ],
  },
  {
    id: 'guru-stotram',
    title: 'Guru Stotram (Gurur Brahma)',
    deity: 'Guru',
    category: 'Mantra',
    occasion: 'Guru Purnima; Thursdays; before learning',
    about:
      'The essential verses of the Guru Gita honouring the teacher as Brahma, Vishnu and Shiva in one — and beyond them, the supreme Brahman itself made visible. Recited on Guru Purnima and before any study.',
    complete: true,
    verses: [
      {
        sanskrit: 'गुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः।\nगुरुरेव परं ब्रह्म तस्मै श्रीगुरवे नमः॥',
        iast: 'Gururbrahmā gururviṣṇuḥ gururdevo maheśvaraḥ\ngurureva paraṃ brahma tasmai śrīgurave namaḥ',
        meaning:
          'The guru is Brahma, the guru is Vishnu, the guru is the god Maheshvara; the guru is verily the supreme Brahman — to that revered guru, salutations.',
      },
      {
        sanskrit: 'अज्ञानतिमिरान्धस्य ज्ञानाञ्जनशलाकया।\nचक्षुरुन्मीलितं येन तस्मै श्रीगुरवे नमः॥',
        iast: 'Ajñānatimirāndhasya jñānāñjanaśalākayā\ncakṣurunmīlitaṃ yena tasmai śrīgurave namaḥ',
        meaning:
          'To him who opened my eyes — blinded by the darkness of ignorance — with the collyrium-stick of knowledge: to that revered guru, salutations.',
      },
    ],
  },
  {
    id: 'gurvashtakam',
    title: 'Gurvashtakam',
    deity: 'Guru',
    category: 'Stotra',
    occasion: 'Guru Purnima; before beginning study',
    composer: 'Adi Shankaracharya',
    about:
      'Eight verses by Shankaracharya, each listing a worldly attainment — beauty, wealth, fame, learning, power — and asking the same piercing question: if the mind is not fixed at the guru\'s lotus feet, "tataḥ kim?" — then what of it? What use is any of it?',
    complete: true,
    verses: [
      {
        sanskrit: 'शरीरं सुरूपं तथा वा कलत्रं यशश्चारु चित्रं धनं मेरुतुल्यम्।\nमनश्चेन्न लग्नं गुरोरङ्घ्रिपद्मे ततः किं ततः किं ततः किं ततः किम्॥',
        iast: 'Śarīraṃ surūpaṃ tathā vā kalatraṃ yaśaścāru citraṃ dhanaṃ merutulyam\nmanaścenna lagnaṃ guroraṅghripadme tataḥ kiṃ tataḥ kiṃ tataḥ kiṃ tataḥ kim',
        meaning:
          'A beautiful body, a splendid spouse, dazzling and varied fame, wealth vast as Mount Meru — but if the mind is not fixed at the guru\'s lotus feet, what of it? What of it? What of it? What of it?',
      },
      {
        sanskrit: 'कलत्रं धनं पुत्रपौत्रादि सर्वं गृहं बान्धवाः सर्वमेतद्धि जातम्।\nमनश्चेन्न लग्नं गुरोरङ्घ्रिपद्मे ततः किं ततः किं ततः किं ततः किम्॥',
        iast: 'Kalatraṃ dhanaṃ putrapautrādi sarvaṃ gṛhaṃ bāndhavāḥ sarvametaddhi jātam\nmanaścenna lagnaṃ guroraṅghripadme tataḥ kiṃ tataḥ kiṃ tataḥ kiṃ tataḥ kim',
        meaning:
          'Spouse, wealth, sons and grandsons, home and kin — all of it duly gained — but if the mind is not fixed at the guru\'s lotus feet, what of it?',
      },
      {
        sanskrit: 'षडङ्गादिवेदो मुखे शास्त्रविद्या कवित्वादि गद्यं सुपद्यं करोति।\nमनश्चेन्न लग्नं गुरोरङ्घ्रिपद्मे ततः किं ततः किं ततः किं ततः किम्॥',
        iast: 'Ṣaḍaṅgādivedo mukhe śāstravidyā kavitvādi gadyaṃ supadyaṃ karoti\nmanaścenna lagnaṃ guroraṅghripadme tataḥ kiṃ tataḥ kiṃ tataḥ kiṃ tataḥ kim',
        meaning:
          'The Vedas with their six limbs on one\'s lips, mastery of the shastras, the gift of fine poetry and prose — but if the mind is not fixed at the guru\'s lotus feet, what of it?',
      },
      {
        sanskrit: 'विदेशेषु मान्यः स्वदेशेषु धन्यः सदाचारवृत्तेषु मत्तो न चान्यः।\nमनश्चेन्न लग्नं गुरोरङ्घ्रिपद्मे ततः किं ततः किं ततः किं ततः किम्॥',
        iast: 'Videśeṣu mānyaḥ svadeśeṣu dhanyaḥ sadācāravṛtteṣu matto na cānyaḥ\nmanaścenna lagnaṃ guroraṅghripadme tataḥ kiṃ tataḥ kiṃ tataḥ kiṃ tataḥ kim',
        meaning:
          'Honoured abroad, celebrated at home, unmatched in righteous conduct — but if the mind is not fixed at the guru\'s lotus feet, what of it?',
      },
      {
        sanskrit: 'क्षमामण्डले भूपभूपालबृन्दैः सदा सेवितं यस्य पादारविन्दम्।\nमनश्चेन्न लग्नं गुरोरङ्घ्रिपद्मे ततः किं ततः किं ततः किं ततः किम्॥',
        iast: 'Kṣamāmaṇḍale bhūpabhūpālabṛndaiḥ sadā sevitaṃ yasya pādāravindam\nmanaścenna lagnaṃ guroraṅghripadme tataḥ kiṃ tataḥ kiṃ tataḥ kiṃ tataḥ kim',
        meaning:
          'One whose feet are ever attended by throngs of kings and emperors across the whole circle of the earth — but if the mind is not fixed at the guru\'s lotus feet, what of it?',
      },
      {
        sanskrit: 'यशो मे गतं दिक्षु दानप्रतापाज्जगद्वस्तु सर्वं करे यत्प्रसादात्।\nमनश्चेन्न लग्नं गुरोरङ्घ्रिपद्मे ततः किं ततः किं ततः किं ततः किम्॥',
        iast: 'Yaśo me gataṃ dikṣu dānapratāpājjagadvastu sarvaṃ kare yatprasādāt\nmanaścenna lagnaṃ guroraṅghripadme tataḥ kiṃ tataḥ kiṃ tataḥ kiṃ tataḥ kim',
        meaning:
          '"My fame has spread in every direction through the power of my giving; every object in the world lies in my hand by grace" — but if the mind is not fixed at the guru\'s lotus feet, what of it?',
      },
      {
        sanskrit: 'न भोगे न योगे न वा वाजिराजौ न कान्तामुखे नैव वित्तेषु चित्तम्।\nमनश्चेन्न लग्नं गुरोरङ्घ्रिपद्मे ततः किं ततः किं ततः किं ततः किम्॥',
        iast: 'Na bhoge na yoge na vā vājirājau na kāntāmukhe naiva vitteṣu cittam\nmanaścenna lagnaṃ guroraṅghripadme tataḥ kiṃ tataḥ kiṃ tataḥ kiṃ tataḥ kim',
        meaning:
          'Even a mind detached — drawn neither to pleasure nor yoga, nor horses and kingdoms, nor the beloved\'s face, nor riches — if it is not fixed at the guru\'s lotus feet, what of it?',
      },
      {
        sanskrit: 'अरण्ये न वा स्वस्य गेहे न कार्ये न देहे मनो वर्तते मे त्वनर्घे।\nमनश्चेन्न लग्नं गुरोरङ्घ्रिपद्मे ततः किं ततः किं ततः किं ततः किम्॥',
        iast: 'Araṇye na vā svasya gehe na kārye na dehe mano vartate me tvanarghe\nmanaścenna lagnaṃ guroraṅghripadme tataḥ kiṃ tataḥ kiṃ tataḥ kiṃ tataḥ kim',
        meaning:
          'Whether the mind rests in the forest or at home, in duty or in the priceless body itself — if it is not fixed at the guru\'s lotus feet, what of it? What of it? What of it? What of it?',
      },
    ],
  },
  {
    id: 'swami-samarth-mantra',
    title: 'Swami Samarth Mantra',
    deity: 'Guru',
    category: 'Mantra',
    occasion: 'Thursdays; daily; for courage',
    about:
      'The taraka mantra of Shri Swami Samarth of Akkalkot, the 19th-century Maharashtrian saint revered as an incarnation of Dattatreya. His assurance to devotees — "Fear not, I am with you" — accompanies the mantra.',
    complete: true,
    verses: [
      {
        sanskrit: 'ॐ श्री स्वामी समर्थाय नमः।\nभिऊ नकोस, मी तुझ्या पाठीशी आहे॥',
        iast: 'Oṃ śrī svāmī samarthāya namaḥ\nbhiū nakosa, mī tujhyā pāṭhīśī āhe',
        meaning:
          'Om, salutations to Shri Swami Samarth. "Do not fear — I stand behind you." (the Swami\'s assurance, in Marathi)',
      },
    ],
  },
  {
    id: 'dattatreya-stotram',
    title: 'Dattatreya Mantra',
    deity: 'Dattatreya',
    category: 'Mantra',
    occasion: 'Thursdays; Datta Jayanti (Margashirsha Purnima)',
    about:
      'The salutation of Dattatreya — the combined incarnation of Brahma, Vishnu and Shiva born to the sage Atri and Anasuya. He is the primordial guru of the avadhuta tradition, worshipped especially in Maharashtra and Karnataka.',
    complete: true,
    verses: [
      {
        sanskrit: 'दिगम्बरा दिगम्बरा श्रीपादवल्लभ दिगम्बरा।\nॐ श्री गुरुदेव दत्त॥',
        iast: 'Digambarā digambarā śrīpādavallabha digambarā\noṃ śrī gurudeva datta',
        meaning:
          'O sky-clad one, sky-clad one, beloved Shripada, sky-clad one! Om, salutations to the divine guru Datta.',
      },
      {
        sanskrit: 'ब्रह्मानन्दं परमसुखदं केवलं ज्ञानमूर्तिं\nद्वन्द्वातीतं गगनसदृशं तत्त्वमस्यादिलक्ष्यम्।\nएकं नित्यं विमलमचलं सर्वधीसाक्षिभूतं\nभावातीतं त्रिगुणरहितं सद्गुरुं तं नमामि॥',
        iast: 'Brahmānandaṃ paramasukhadaṃ kevalaṃ jñānamūrtiṃ\ndvandvātītaṃ gaganasadṛśaṃ tattvamasyādilakṣyam\nekaṃ nityaṃ vimalamacalaṃ sarvadhīsākṣibhūtaṃ\nbhāvātītaṃ triguṇarahitaṃ sadguruṃ taṃ namāmi',
        meaning:
          'Bliss of Brahman, giver of supreme joy, knowledge itself embodied; beyond all pairs of opposites, vast as the sky, the goal pointed to by "Thou art That"; one, eternal, stainless, unmoving, the witness in every mind; beyond feeling, beyond the three gunas — to that true guru I bow.',
      },
    ],
  },
  {
    id: 'subramanya-stotra',
    title: 'Subramanya Vandana',
    deity: 'Skanda',
    category: 'Mantra',
    occasion: 'Skanda Sashti; Tuesdays; Karthigai',
    about:
      'The salutation of Skanda — Murugan, Kartikeya — six-faced commander of the divine armies and son of Shiva, with his root mantra "Om Sharavanabhava," born of the reed-forest where he took birth.',
    complete: true,
    verses: [
      {
        sanskrit: 'षडाननं कुङ्कुमरक्तवर्णं महामतिं दिव्यमयूरवाहनम्।\nरुद्रस्य सूनुं सुरसैन्यनाथं गुहं सदाहं शरणं प्रपद्ये॥',
        iast: 'Ṣaḍānanaṃ kuṅkumaraktavarṇaṃ mahāmatiṃ divyamayūravāhanam\nrudrasya sūnuṃ surasainyanāthaṃ guhaṃ sadāhaṃ śaraṇaṃ prapadye',
        meaning:
          'Six-faced, red as kumkum, of great intelligence, riding the divine peacock; son of Rudra, commander of the celestial armies — in Guha I take refuge, always.',
      },
      {
        sanskrit: 'ॐ शरवणभव।',
        iast: 'Oṃ śaravaṇabhava',
        meaning: 'Om — you who were born in the forest of reeds. The six-syllable root mantra of Murugan.',
        label: 'Mula mantra',
      },
    ],
  },
  {
    id: 'ganga-stotram',
    title: 'Ganga Stotram (Opening)',
    deity: 'Ganga',
    category: 'Stotra',
    occasion: 'Ganga Dussehra; river bathing; pilgrimage',
    composer: 'Adi Shankaracharya',
    about:
      'Shankaracharya\'s hymn to the river goddess, sung on her banks and remembered wherever water is sprinkled for purification. The devotee — "ignorant of your greatness" — simply asks the compassionate river for protection. The opening verses are given here.',
    complete: false,
    note: '2 of 14 verses',
    verses: [
      {
        sanskrit: 'देवि सुरेश्वरि भगवति गङ्गे त्रिभुवनतारिणि तरलतरङ्गे।\nशङ्करमौलिविहारिणि विमले मम मतिरास्तां तव पदकमले॥',
        iast: 'Devi sureśvari bhagavati gaṅge tribhuvanatāriṇi taralataraṅge\nśaṅkaramaulivihāriṇi vimale mama matirāstāṃ tava padakamale',
        meaning:
          'O goddess Ganga, queen of the gods, blessed one, saviour of the three worlds with your dancing waves; you who play in Shankara\'s crown, stainless one — may my mind rest at your lotus feet.',
      },
      {
        sanskrit: 'भागीरथि सुखदायिनि मातस्तव जलमहिमा निगमे ख्यातः।\nनाहं जाने तव महिमानं पाहि कृपामयि मामज्ञानम्॥',
        iast: 'Bhāgīrathi sukhadāyini mātastava jalamahimā nigame khyātaḥ\nnāhaṃ jāne tava mahimānaṃ pāhi kṛpāmayi māmajñānam',
        meaning:
          'O Bhagirathi, giver of joy, mother — the glory of your waters is proclaimed in the Vedas. I do not know your greatness; protect me, O compassionate one, ignorant as I am.',
      },
    ],
  },
  {
    id: 'tulasi-ashtakam',
    title: 'Tulasi Stuti',
    deity: 'Tulasi',
    category: 'Stotra',
    occasion: 'Kartik month; Tulasi Vivah; daily tulasi puja',
    about:
      'Verses honouring Tulasi, the sacred basil worshipped daily in Hindu courtyards as a goddess and beloved of Vishnu. Watering the plant and circling it while reciting these verses is one of the oldest household observances.',
    complete: true,
    verses: [
      {
        sanskrit: 'महाप्रसादजननी सर्वसौभाग्यवर्धिनी।\nआधिव्याधिहरा नित्यं तुलसि त्वं नमोऽस्तु ते॥',
        iast: 'Mahāprasādajananī sarvasaubhāgyavardhinī\nādhivyādhiharā nityaṃ tulasi tvaṃ namo\'stu te',
        meaning:
          'Mother of great grace, increaser of all good fortune, ever the remover of ailments of mind and body — O Tulasi, salutations to you.',
      },
      {
        sanskrit: 'नमस्तुलसि कल्याणि नमो विष्णुप्रिये शुभे।\nनमो मोक्षप्रदे देवि नमः सम्पत्प्रदायिके॥',
        iast: 'Namastulasi kalyāṇi namo viṣṇupriye śubhe\nnamo mokṣaprade devi namaḥ sampatpradāyike',
        meaning:
          'Salutations, auspicious Tulasi; salutations, beloved of Vishnu, radiant one; salutations, goddess who grants liberation; salutations, bestower of prosperity.',
      },
      {
        sanskrit: 'या दृष्टा निखिलाघसङ्घशमनी स्पृष्टा वपुष्पावनी\nरोगाणामभिवन्दिता निरसनी सिक्तान्तकत्रासिनी।\nप्रत्यासत्तिविधायिनी भगवतः कृष्णस्य संरोपिता\nन्यस्ता तच्चरणे विमुक्तिफलदा तस्यै तुलस्यै नमः॥',
        iast: 'Yā dṛṣṭā nikhilāghasaṅghaśamanī spṛṣṭā vapuṣpāvanī\nrogāṇāmabhivanditā nirasanī siktāntakatrāsinī\npratyāsattividhāyinī bhagavataḥ kṛṣṇasya saṃropitā\nnyastā taccaraṇe vimuktiphaladā tasyai tulasyai namaḥ',
        meaning:
          'Seen, she stills every host of sins; touched, she purifies the body; honoured, she drives out disease; watered, she frightens Death himself; planted, she draws one near to Lord Krishna; laid at his feet, she yields the fruit of liberation — to that Tulasi, salutations.',
      },
    ],
  },
  {
    id: 'kshama-prarthana',
    title: 'Kshama Prarthana',
    deity: 'Universal',
    category: 'Mantra',
    occasion: 'End of every puja; before sleeping',
    about:
      'The prayer for forgiveness that closes worship, acknowledging that no puja is ever complete or flawless — errors of hand, speech, ear, eye and mind are all laid before the Lord, whose compassion completes what effort cannot.',
    complete: true,
    verses: [
      {
        sanskrit: 'करचरणकृतं वाक्कायजं कर्मजं वा\nश्रवणनयनजं वा मानसं वापराधम्।\nविहितमविहितं वा सर्वमेतत्क्षमस्व\nजय जय करुणाब्धे श्रीमहादेव शम्भो॥',
        iast: 'Karacaraṇakṛtaṃ vākkāyajaṃ karmajaṃ vā\nśravaṇanayanajaṃ vā mānasaṃ vāparādham\nvihitamavihitaṃ vā sarvametatkṣamasva\njaya jaya karuṇābdhe śrīmahādeva śambho',
        meaning:
          'Whatever wrong I have done — with hands or feet, speech or body or deed, with ears or eyes or mind, whether prescribed or forbidden — forgive it all. Victory, victory, O ocean of compassion, great God, Shambhu.',
      },
    ],
  },
  {
    id: 'shanti-mantra-taittiriya',
    title: 'Shanti Mantra (Saha Navavatu)',
    deity: 'Universal',
    category: 'Vedic',
    occasion: 'Opening and closing study; yoga; shared learning',
    about:
      'The peace invocation of the Taittiriya and Katha Upanishads, chanted together by teacher and student before study. It asks that learning be shared, vigorous and free of resentment — ending in the threefold peace that stills disturbance from self, others and nature.',
    complete: true,
    verses: [
      {
        sanskrit: 'ॐ सह नाववतु। सह नौ भुनक्तु। सह वीर्यं करवावहै।\nतेजस्वि नावधीतमस्तु मा विद्विषावहै।\nॐ शान्तिः शान्तिः शान्तिः॥',
        iast: 'Oṃ saha nāvavatu, saha nau bhunaktu, saha vīryaṃ karavāvahai\ntejasvi nāvadhītamastu mā vidviṣāvahai\noṃ śāntiḥ śāntiḥ śāntiḥ',
        meaning:
          'May we both be protected; may we both be nourished; may we work together with vigour. May our study be luminous; may we never resent each other. Om — peace, peace, peace.',
      },
    ],
  },
  {
    id: 'asato-ma',
    title: 'Pavamana Mantra (Asato Ma)',
    deity: 'Universal',
    category: 'Vedic',
    occasion: 'Daily; meditation; closing prayer',
    about:
      'From the Brihadaranyaka Upanishad (1.3.28) — the threefold prayer of passage chanted at gatherings, weddings and memorials alike: from the unreal to the real, from darkness to light, from death to immortality.',
    complete: true,
    verses: [
      {
        sanskrit: 'ॐ असतो मा सद्गमय।\nतमसो मा ज्योतिर्गमय।\nमृत्योर्मा अमृतं गमय।\nॐ शान्तिः शान्तिः शान्तिः॥',
        iast: 'Oṃ asato mā sadgamaya\ntamaso mā jyotirgamaya\nmṛtyormā amṛtaṃ gamaya\noṃ śāntiḥ śāntiḥ śāntiḥ',
        meaning:
          'Lead me from the unreal to the real; lead me from darkness to light; lead me from death to immortality. Om — peace, peace, peace.',
      },
    ],
  },
  {
    id: 'mantrapushpam',
    title: 'Mantrapushpam (Essence)',
    deity: 'Universal',
    category: 'Vedic',
    occasion: 'Final flower offering of puja; Satyanarayan Puja',
    about:
      'The "flower of mantras" from the Taittiriya Aranyaka, offered as the final flower at the close of worship. Its riddling refrain — whoever knows the source of water knows the very support of all — points every offering back to its ground.',
    complete: false,
    note: 'Essence verses',
    verses: [
      {
        sanskrit: 'यो॑ऽपां पुष्पं॒ वेद॑। पुष्प॑वान् प्र॒जावा॑न् पशु॒मान् भ॑वति।\nच॒न्द्रमा॒ वा अ॒पां पुष्पम्॑। पुष्प॑वान् प्र॒जावा॑न् पशु॒मान् भ॑वति॥',
        iast: 'Yo\'pāṃ puṣpaṃ veda, puṣpavān prajāvān paśumān bhavati\ncandramā vā apāṃ puṣpam, puṣpavān prajāvān paśumān bhavati',
        meaning:
          'One who knows the flower of the waters becomes possessed of flowers, offspring and cattle. The moon indeed is the flower of the waters — knowing this, one flourishes.',
      },
      {
        sanskrit: 'ॐ राजाधिराजाय प्रसह्यसाहिने नमो वयं वैश्रवणाय कुर्महे।\nस मे कामान्कामकामाय मह्यं कामेश्वरो वैश्रवणो ददातु।\nकुबेराय वैश्रवणाय महाराजाय नमः॥',
        iast: 'Oṃ rājādhirājāya prasahyasāhine namo vayaṃ vaiśravaṇāya kurmahe\nsa me kāmānkāmakāmāya mahyaṃ kāmeśvaro vaiśravaṇo dadātu\nkuberāya vaiśravaṇāya mahārājāya namaḥ',
        meaning:
          'Om — to the king of kings, the irresistible, we offer salutations, to Vaishravana. May that lord of desires grant my wishes, me who desires rightly. To Kubera Vaishravana, the great king, salutations.',
        label: 'Rajadhirajaya',
      },
    ],
  },
];
