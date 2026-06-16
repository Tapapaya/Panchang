import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Type, Radius } from '../../constants/design';

// Static shloka catalogue — sourced from content/shlokas/ files
const SHLOKAS = [
  {
    id: 'ganesh-vakratunda',
    name: 'Vakratunda Mahakaya',
    deity: 'Ganesha',
    category: 'Invocation',
    when: 'Before any new beginning, puja, exam, journey',
    sanskrit: 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥',
    iast: 'Vakratuṇḍa mahākāya sūryakoṭi samaprabha\nnirvighnaṃ kuru me deva sarvakāryeṣu sarvadā',
    meaning: 'O large-bodied one with curved trunk, as brilliant as a million suns — make all my endeavours free from obstacles, always.',
  },
  {
    id: 'ganesh-suklam',
    name: 'Shuklambaradharam',
    deity: 'Ganesha',
    category: 'Invocation',
    when: 'Opening prayer at the start of any puja',
    sanskrit: 'शुक्लाम्बरधरं विष्णुं शशिवर्णं चतुर्भुजम्।\nप्रसन्नवदनं ध्यायेत् सर्वविघ्नोपशान्तये॥',
    iast: 'Śuklāmbaradharaṃ viṣṇuṃ śaśivarṇaṃ caturbhujam\nprasannavadanaṃ dhyāyet sarvavighnopaśāntaye',
    meaning: 'Meditate on the four-armed, moon-complexioned one who wears white garments — to remove all obstacles.',
  },
  {
    id: 'shiva-mahamrityunjaya',
    name: 'Mahamrityunjaya Mantra',
    deity: 'Shiva',
    category: 'Protection',
    when: 'Daily, illness, fear, or Pradosha; Monday morning',
    sanskrit: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्।\nउर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय माऽमृतात्॥',
    iast: 'Oṃ tryambakaṃ yajāmahe sugandhiṃ puṣṭivardhanam\nurvārukamiva bandhanān mṛtyormukṣīya māmṛtāt',
    meaning: 'We worship the three-eyed one who is fragrant and nourishes all beings. As the cucumber is freed from its vine, may he free us from death and grant immortality.',
  },
  {
    id: 'shiva-panchakshara',
    name: 'Shiva Panchakshara',
    deity: 'Shiva',
    category: 'Daily Mantra',
    when: 'Daily chanting, Shivaratri, Mondays',
    sanskrit: 'नागेन्द्रहाराय त्रिलोचनाय भस्माङ्गरागाय महेश्वराय।\nनित्याय शुद्धाय दिगम्बराय तस्मै नकाराय नमः शिवाय॥',
    iast: 'Nāgendrahārāya trilocanāya bhasmāṅgarāgāya maheśvarāya\nnityāya śuddhāya digambarāya tasmai nakārāya namaḥ śivāya',
    meaning: 'To the one adorned with snakes, three-eyed, smeared with ash, great lord, eternal, pure, sky-clad — I bow to that Shiva represented by "Na".',
  },
  {
    id: 'lakshmi-shri',
    name: 'Shri Suktam (Opening)',
    deity: 'Lakshmi',
    category: 'Prosperity',
    when: 'Fridays, Diwali, Lakshmi Puja, new home',
    sanskrit: 'ॐ हिरण्यवर्णां हरिणीं सुवर्णरजतस्रजाम्।\nचन्द्रां हिरण्मयीं लक्ष्मीं जातवेदो म आवह॥',
    iast: 'Oṃ hiraṇyavarṇāṃ hariṇīṃ suvarṇarajatasrajām\ncandrāṃ hiraṇmayīṃ lakṣmīṃ jātavedo ma āvaha',
    meaning: 'O Jataveda (Agni), bring to me Lakshmi — golden-hued, fleet as a deer, garlanded in gold and silver, shining like the moon, radiant.',
  },
  {
    id: 'lakshmi-mahalakshmi',
    name: 'Mahalakshmi Ashtakam',
    deity: 'Lakshmi',
    category: 'Devotional',
    when: 'Fridays, Navratri, Purnima',
    sanskrit: 'नमस्तेऽस्तु महामाये श्रीपीठे सुरपूजिते।\nशंखचक्रगदाहस्ते महालक्ष्मि नमोऽस्तु ते॥',
    iast: 'Namaste\'stu mahāmāye śrīpīṭhe surapūjite\nśaṃkhacakragadāhaste mahālakṣmi namo\'stu te',
    meaning: 'Salutations to the great illusion, worshipped by gods, seated in glory, bearing conch, discus, and mace — salutations, Mahalakshmi.',
  },
  {
    id: 'navratri-durgashtami',
    name: 'Devi Stuti (Ya Devi)',
    deity: 'Durga / Devi',
    category: 'Navratri',
    when: 'Navratri, Durgashtami, Tuesdays',
    sanskrit: 'या देवी सर्वभूतेषु शक्तिरूपेण संस्थिता।\nनमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः॥',
    iast: 'Yā devī sarvabhūteṣu śaktirūpeṇa saṃsthitā\nnamastasyai namastasyai namastasyai namo namaḥ',
    meaning: 'To the goddess who abides in all beings in the form of energy — salutations to her, salutations, salutations, again salutations.',
  },
  {
    id: 'satyanarayan-narayana',
    name: 'Om Namo Narayanaya',
    deity: 'Vishnu',
    category: 'Daily Mantra',
    when: 'Daily, Ekadashi, Purnima, Satyanarayan Puja',
    sanskrit: 'ॐ नमो नारायणाय।\nशान्ताकारं भुजगशयनं पद्मनाभं सुरेशम्।',
    iast: 'Oṃ namo nārāyaṇāya\nśāntākāraṃ bhujaagaśayanaṃ padmanābhaṃ sureśam',
    meaning: 'Salutations to Narayana. (He is) of peaceful form, reclining on the serpent, lotus-naveled, lord of the gods.',
  },
  {
    id: 'kshama-prarthana',
    name: 'Kshama Prarthana',
    deity: 'Universal',
    category: 'Closing Prayer',
    when: 'End of every puja; before sleeping',
    sanskrit: 'करचरण कृतं वाक्‌ कायजं कर्मजं वा।\nश्रवण नयनजं वा मानसं वापराधम्।\nविहितमविहितं वा सर्वमेतत्‌ क्षमस्व।\nजय जय करुणाब्धे श्री महादेव शम्भो॥',
    iast: 'Karacaraṇa kṛtaṃ vāk kāyajaṃ karmajaṃ vā\nśravaṇa nayanjaṃ vā mānasaṃ vāparādham\nvihitamavihitaṃ vā sarvametat kṣamasva\njaya jaya karuṇābdhe śrī mahādeva śambho',
    meaning: 'Whatever wrong I committed by hands, feet, speech, body, or action — by ears, eyes, or mind — whether prescribed or forbidden — forgive it all. Victory to you, O ocean of compassion, great Shiva, Shambho.',
  },
  {
    id: 'purnima-chandranamaskara',
    name: 'Chandra Namaskara',
    deity: 'Chandra (Moon)',
    category: 'Purnima',
    when: 'Purnima evening, Ekadashi night, Karva Chauth',
    sanskrit: 'ॐ क्षीरपुत्राय विद्महे अमृततत्त्वाय धीमहि।\nतन्नो चन्द्रः प्रचोदयात्॥',
    iast: 'Oṃ kṣīraputrāya vidmahe amṛtatattvāya dhīmahi\ntanno candraḥ pracodayāt',
    meaning: 'We know the son of the milk-ocean; we meditate on the essence of nectar. May that Moon inspire and illuminate us.',
  },

  // ─── Gayatri ──────────────────────────────────────────────
  {
    id: 'gayatri-mantra',
    name: 'Gayatri Mantra',
    deity: 'Surya / Savitri',
    category: 'Vedic',
    when: 'Sandhyavandanam — sunrise, noon, sunset; daily; Guru Purnima',
    sanskrit: 'ॐ भूर्भुवः स्वः।\nतत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि।\nधियो यो नः प्रचोदयात्॥',
    iast: 'Oṃ bhūrbhuvaḥ svaḥ\ntatsaviturvareṇyaṃ bhargo devasya dhīmahi\ndhiyo yo naḥ pracodayāt',
    meaning: 'Om — earth, atmosphere, sky. We meditate on the glory of the divine Sun (Savitri), who illumines all realms. May that radiance inspire and guide our intellect.',
  },

  // ─── Vishnu Sahasranamam ──────────────────────────────────
  {
    id: 'vishnu-sahasranamam-dhyana',
    name: 'Vishnu Sahasranamam — Dhyana Shloka',
    deity: 'Vishnu',
    category: 'Devotional',
    when: 'Daily; Ekadashi; Saturdays for Vishnu Sahasranamam parayana',
    sanskrit: 'शान्ताकारं भुजगशयनं पद्मनाभं सुरेशं\nविश्वाधारं गगनसदृशं मेघवर्णं शुभाङ्गम्।\nलक्ष्मीकान्तं कमलनयनं योगिभिर्ध्यानगम्यं\nवन्दे विष्णुं भवभयहरं सर्वलोकैकनाथम्॥',
    iast: 'Śāntākāraṃ bhujagaśayanaṃ padmanābhaṃ sureśaṃ\nviśvādhāraṃ gaganasadṛśaṃ meghavarṇaṃ śubhāṅgam\nlakṣmīkāntaṃ kamalanayanaṃ yogibhirdhyānagamyaṃ\nvande viṣṇuṃ bhavabhayaharaṃ sarvalokaikanātham',
    meaning: 'I bow to Vishnu — of peaceful form, reclining on the serpent, lotus-naveled, lord of gods; sustainer of the cosmos, vast as sky, cloud-hued, auspicious-limbed; beloved of Lakshmi, lotus-eyed, known to yogis in meditation; remover of worldly fear, the one lord of all worlds.',
  },

  // ─── Shiva Tandav Stotra ──────────────────────────────────
  {
    id: 'shiva-tandav-stotra',
    name: 'Shiva Tandav Stotra',
    deity: 'Shiva',
    category: 'Devotional',
    when: 'Mahashivaratri; Mondays; Pradosha; Shravan month',
    sanskrit: 'जटाटवीगलज्जलप्रवाहपावितस्थले\nगलेऽवलम्ब्य लम्बितां भुजङ्गतुङ्गमालिकाम्।\nडमड्डमड्डमड्डमन्निनादवड्डमर्वयं\nचकार चण्डताण्डवं तनोतु नः शिवः शिवम्॥',
    iast: 'Jaṭāṭavīgalajjalapravāhapāvitasthale\ngale\'valambya lambitāṃ bhujaṅgatuṅgamālikām\nḍamaḍḍamaḍḍamaḍḍaman-ninādavaḍḍamarvayaṃ\ncakāra caṇḍatāṇḍavaṃ tanotu naḥ śivaḥ śivam',
    meaning: 'On the ground purified by the flow of water from the forest of matted locks, with the high garland of snakes hanging at his throat — Shiva, whose great drum resounds damaḍ-damaḍ-damaḍ, performed the fierce Tandava dance. May that Shiva, the auspicious, grant us well-being.',
  },

  // ─── Kaal Bhairav Ashtakam ───────────────────────────────
  {
    id: 'kaal-bhairav-ashtakam',
    name: 'Kaal Bhairav Ashtakam',
    deity: 'Kaal Bhairav',
    category: 'Protection',
    when: 'Bhairav Ashtami; Sundays; Kashi yatra; for protection from fear',
    sanskrit: 'देवराजसेव्यमानपावनाङ्घ्रिपङ्कजं\nव्यालयज्ञसूत्रमिन्दुशेखरं कृपाकरम्।\nनारदादियोगिवृन्दवन्दितं दिगम्बरं\nकाशिकापुराधिनाथ कालभैरवं भजे॥',
    iast: 'Devarājasevyamānapāvanāṅghripaṅkajaṃ\nvyālayajñasūtramindūśekharaṃ kṛpākaram\nnāradādiyogivṛndavanditaṃ digambaraṃ\nkāśikāpurādhinātha kālabhairavaṃ bhaje',
    meaning: 'I worship Kaal Bhairav, lord of Kashi — whose lotus feet are served by Indra himself; who wears a sacred thread of serpents and a crescent moon, and is merciful; worshipped by Narada and hosts of yogis; the sky-clad one, ruler of the city of Varanasi.',
  },

  // ─── Hanuman Chalisa ─────────────────────────────────────
  {
    id: 'hanuman-chalisa-doha',
    name: 'Hanuman Chalisa — Doha',
    deity: 'Hanuman',
    category: 'Protection',
    when: 'Tuesdays; Saturdays; Hanuman Jayanti; before any difficult task',
    sanskrit: 'श्रीगुरु चरन सरोज रज, निज मनु मुकुरु सुधारि।\nबरनउँ रघुबर बिमल जसु, जो दायकु फल चारि॥\nबुद्धिहीन तनु जानिके, सुमिरौं पवन कुमार।\nबल बुधि बिद्या देहु मोहिं, हरहु कलेस बिकार॥',
    iast: 'Śrīguru carana saroja raja, nija manu mukuru sudhāri\nbaranaũ raghubara bimala jasu, jo dāyaku phala cāri\nbuddhihīna tanu jānike, sumiraũ pavana kumāra\nbala budhi bidyā dehu mohi, harahu kalesa bikāra',
    meaning: 'Cleansing the mirror of my mind with the dust of the guru\'s lotus feet, I recount the pure glory of Rama, giver of the four fruits of life. Knowing my body to be bereft of intellect, I call upon you, O son of the wind. Grant me strength, wisdom, and knowledge; remove my suffering and impurities.',
  },

  // ─── Hanuman Mantra ──────────────────────────────────────
  {
    id: 'hanuman-bajrang-baan',
    name: 'Anjaneya Ashtottaram',
    deity: 'Hanuman',
    category: 'Daily Mantra',
    when: 'Tuesdays; Saturdays; daily for strength and protection',
    sanskrit: 'मनोजवं मारुततुल्यवेगं\nजितेन्द्रियं बुद्धिमतां वरिष्ठम्।\nवातात्मजं वानरयूथमुख्यं\nश्रीरामदूतं शरणं प्रपद्ये॥',
    iast: 'Manojaṃ mārutatulyavegaṃ\njitendriyaṃ buddhimatāṃ variṣṭham\nvātātmajaṃ vānarayūthamukhyaṃ\nśrīrāmadūtaṃ śaraṇaṃ prapadye',
    meaning: 'Swift as thought, as fast as the wind, who has conquered the senses, supreme among the wise — I take refuge in the son of the wind, chief of the monkey armies, the messenger of Rama.',
  },

  // ─── Guru Stotram ────────────────────────────────────────
  {
    id: 'guru-stotram',
    name: 'Guru Stotram (Gurur Brahma)',
    deity: 'Guru (Universal)',
    category: 'Guru',
    when: 'Guru Purnima; Thursdays; before beginning any learning',
    sanskrit: 'गुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः।\nगुरुः साक्षात् परब्रह्म तस्मै श्री गुरवे नमः॥\nअज्ञानतिमिरान्धस्य ज्ञानाञ्जनशलाकया।\nचक्षुरुन्मीलितं येन तस्मै श्री गुरवे नमः॥',
    iast: 'Gururbrahma gururviṣṇuḥ gururdev mahēśvaraḥ\nguruḥ sākṣāt parabrahma tasmai śrī gurave namaḥ\najñānatimirāndhasya jñānāñjanśalākayā\ncakṣurunmīlitaṃ yena tasmai śrī gurave namaḥ',
    meaning: 'The Guru is Brahma, the Guru is Vishnu, the Guru is Maheshvara himself. The Guru is the supreme Brahman in person — salutations to that holy Guru. The one who has opened the eye of one blinded by the darkness of ignorance, with the collyrium-stick of knowledge — salutations to that holy Guru.',
  },

  // ─── Swami Samarth ───────────────────────────────────────
  {
    id: 'swami-samarth-mantra',
    name: 'Swami Samarth Mantra',
    deity: 'Swami Samarth',
    category: 'Guru',
    when: 'Thursdays; Guru Purnima; daily for courage and fearlessness',
    sanskrit: 'ॐ श्री स्वामी समर्थ जय जय स्वामी समर्थ।\nअक्कलकोटवासिने स्वामी समर्थाय नमः॥\nभय नको — स्वामी समर्थ आहे।',
    iast: 'Oṃ śrī svāmī samartha jaya jaya svāmī samartha\nakkalakoṭavāsine svāmī samarthāya namaḥ\nbhaya nako — svāmī samartha āhe',
    meaning: 'Om — glory to Swami Samarth, victory, victory to Swami Samarth. Salutations to Swami Samarth, dweller of Akkalkot. "Fear nothing — Swami Samarth is here." (The famous assurance of Swami Samarth of Akkalkot, 19th-century Dattatreya saint of Maharashtra.)',
  },

  // ─── Aditya Hridayam ─────────────────────────────────────
  {
    id: 'aditya-hridayam',
    name: 'Aditya Hridayam',
    deity: 'Surya / Savitri',
    category: 'Protection',
    when: 'Sunday mornings; before battles or difficult tasks; illness',
    sanskrit: 'आदित्यहृदयं पुण्यं सर्वशत्रुविनाशनम्।\nजयावहं जपेन्नित्यमक्षयं परमं शिवम्॥\nसर्वमङ्गलमाङ्गल्यं सर्वपापप्रणाशनम्।\nचिन्ताशोकप्रशमनमायुर्वर्धनमुत्तमम्॥',
    iast: 'Ādityahṛdayaṃ puṇyaṃ sarvaśatruvināśanam\njayāvahaṃ japennityamakṣayaṃ paramaṃ śivam\nsarvamaṅgalamāṅgalyaṃ sarvapāpapraṇāśanam\ncintāśokapraśamanamāyurvardhanamuttamam',
    meaning: 'The sacred Aditya Hridayam destroys all enemies and brings victory — chant it daily, it is imperishable, supremely auspicious. It is the most auspicious of all auspicious things, the destroyer of all sin, the pacifier of grief and anxiety, the best prolonger of life.',
  },

  // ─── Saraswati Vandana ───────────────────────────────────
  {
    id: 'saraswati-vandana',
    name: 'Saraswati Vandana (Ya Kundendum)',
    deity: 'Saraswati',
    category: 'Invocation',
    when: 'Vasant Panchami; before exams, learning, writing, music; Navratri',
    sanskrit: 'या कुन्देन्दुतुषारहारधवला या शुभ्रवस्त्रावृता\nया वीणावरदण्डमण्डितकरा या श्वेतपद्मासना।\nया ब्रह्माच्युतशंकरप्रभृतिभिर्देवैः सदा वन्दिता\nसा मां पातु सरस्वती भगवती निःशेषजाड्यापहा॥',
    iast: 'Yā kundendutuṣārahāradhavalā yā śubhravstrāvṛtā\nyā vīṇāvaradaṇḍamaṇḍitakarā yā śvetapadmāsanā\nyā brahmācyutaśaṃkaraprabṛtibhirdevaiḥ sadā vanditā\nsā māṃ pātu sarasvatī bhagavatī niḥśeṣajāḍyāpahā',
    meaning: 'White as the jasmine flower, moon, and snowflake-garland; dressed in pure white; whose hands are adorned with the veena and the boon-giving staff; seated on a white lotus; ever worshipped by Brahma, Vishnu, Shankara, and all the gods — may that Saraswati, the blessed, protect me and dispel all my inertia.',
  },

  // ─── Ram Raksha Stotra ───────────────────────────────────
  {
    id: 'ram-raksha-stotra',
    name: 'Ram Raksha Stotra',
    deity: 'Rama',
    category: 'Protection',
    when: 'Daily morning; before travel; Rama Navami; Wednesday',
    sanskrit: 'रामो राजमणिः सदा विजयते रामं रमेशं भजे\nरामेणाभिहता निशाचरचमू रामाय तस्मै नमः।\nरामान्नास्ति परायणं परतरं रामस्य दासोऽस्म्यहम्\nरामे चित्तलयः सदा भवतु मे भो राम मामुद्धर॥',
    iast: 'Rāmo rājamaṇiḥ sadā vijayate rāmaṃ rameśaṃ bhaje\nrāmeṇābhihatā niśācaracamū rāmāya tasmai namaḥ\nrāmānnāsti parāyaṇaṃ parataraṃ rāmasya dāso\'smyaham\nrāme cittalayaḥ sadā bhavatu me bho rāma māmuddhara',
    meaning: 'Rama, jewel among kings, is ever victorious — I worship Rama, lord of Lakshmi. The armies of night-wanderers were destroyed by Rama — salutations to that Rama. There is no refuge higher than Rama; I am his servant. May my mind ever rest in Rama — O Rama, uplift me.',
  },

  // ─── Dattatreya Stotram ───────────────────────────────────
  {
    id: 'dattatreya-stotram',
    name: 'Dattatreya Stotram',
    deity: 'Dattatreya',
    category: 'Devotional',
    when: 'Thursdays; Margashirsha Purnima; Datta Jayanti; for avadhuta wisdom',
    sanskrit: 'जय अवधूत दत्त भगवान। त्रिगुणात्मक त्रिदेव स्वरूप।\nब्रह्मा विष्णु महेश एकरूप। जय जय दत्तात्रेय प्रभो॥\nॐ द्रां दत्तात्रेयाय नमः।',
    iast: 'Jaya avadhūta datta bhagavān\ntriguṇātmaka trideva svarūpa\nbrahmā viṣṇu maheśa ekarūpa\njaya jaya dattātreya prabho\nOṃ drāṃ dattātreyāya namaḥ',
    meaning: 'Victory to Dattatreya, the avadhuta (liberated wanderer) and Lord — embodying the three gunas, the three divine forms of Brahma, Vishnu, and Maheshvara in one. Victory, victory to Lord Dattatreya. Om salutations to Dattatreya.',
  },

  // ─── Kanakadhara Stotram ──────────────────────────────────
  {
    id: 'kanakadhara-stotram',
    name: 'Kanakadhara Stotram',
    deity: 'Lakshmi',
    category: 'Prosperity',
    when: 'Fridays; Diwali; for relief from poverty; composed by Adi Shankaracharya',
    sanskrit: 'अङ्गं हरेः पुलकभूषणमाश्रयन्ती\nभृङ्गाङ्गनेव मुकुलाभरणं तमालम्।\nअङ्गीकृताखिलविभूतिरपाङ्गलीला\nमाङ्गल्यदास्तु मम मङ्गलदेवतायाः॥',
    iast: 'Aṅgaṃ hareḥ pulakabhūṣaṇamāśrayantī\nbhṛṅgāṅganeva mukulābharaṇaṃ tamālam\naṅgīkṛtākhilavibhūtirapāṅgalīlā\nmāṅgalyadāstu mama maṅgaladevtāyāḥ',
    meaning: 'Clinging to the chest of Vishnu — which is ornamented by the goose-bumps of bliss — like a bee clinging to a dark tamāla tree adorned with blossoms; her sidelong glance having taken possession of all prosperity — may that goddess of auspiciousness grant auspiciousness to me.',
  },

  // ─── Purusha Suktam ───────────────────────────────────────
  {
    id: 'purusha-suktam-opening',
    name: 'Purusha Suktam — Opening',
    deity: 'Vishnu / Universal',
    category: 'Vedic',
    when: 'Major pujas; homam; Vishnu puja; Vedic rituals',
    sanskrit: 'सहस्रशीर्षा पुरुषः सहस्राक्षः सहस्रपात्।\nस भूमिं विश्वतो वृत्वाऽत्यतिष्ठद्दशाङ्गुलम्॥\nपुरुष एवेदं सर्वं यद्भूतं यच्च भव्यम्।\nउतामृतत्वस्येशानो यदन्नेनातिरोहति॥',
    iast: 'Sahasraśīrṣā puruṣaḥ sahasrākṣaḥ sahasrapāt\nsa bhūmiṃ viśvato vṛtvā\'tyatiṣṭhaddaśāṅgulam\npuruṣa evedaṃ sarvaṃ yadbhūtaṃ yacca bhavyam\nutāmṛtatvasyeśāno yadannenātirohati',
    meaning: 'The cosmic Person has a thousand heads, a thousand eyes, a thousand feet. He pervades the earth on all sides and extends beyond it by ten fingers. This Purusha is all that exists — past and future. He is the lord of immortality, and whatever grows by food.',
  },

  // ─── Navagraha ───────────────────────────────────────────
  {
    id: 'surya-navagraha',
    name: 'Surya Navagraha Mantra',
    deity: 'Surya / Savitri',
    category: 'Daily Mantra',
    when: 'Sundays; sunrise prayer; Chhath Puja; beginning of any important day',
    sanskrit: 'जपाकुसुमसङ्काशं काश्यपेयं महाद्युतिम्।\nतमोऽरिं सर्वपापघ्नं प्रणतोऽस्मि दिवाकरम्॥\nॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः।',
    iast: 'Japākusumasaṅkāśaṃ kāśyapeyaṃ mahādyutim\ntamo\'riṃ sarvapāpāghnaṃ praṇato\'smi divākaram\nOṃ hrāṃ hrīṃ hrauṃ saḥ sūryāya namaḥ',
    meaning: 'Brilliant as the hibiscus flower, son of Kashyapa, of great radiance — enemy of darkness, destroyer of all sin — I bow to Surya, the day-maker. Om — salutations to the Sun (Bija mantra for Surya).',
  },

  // ─── Achyutam Keshavam ────────────────────────────────────
  {
    id: 'achyutam-keshavam',
    name: 'Achyutam Keshavam',
    deity: 'Vishnu',
    category: 'Devotional',
    when: 'Daily devotional chanting; Ekadashi; informal puja',
    sanskrit: 'अच्युतम् केशवम् रामनारायणम्\nकृष्णदामोदरम् वासुदेवम् हरिम्।\nश्रीधरम् माधवम् गोपिकावल्लभम्\nजानकीनायकम् रामचन्द्रम् भजे॥',
    iast: 'Acyutam keśavam rāmanārāyaṇam\nkṛṣṇadāmodaram vāsudevaṃ harim\nśrīdharaṃ mādhavaṃ gopikāvallabham\njānakīnāyakaṃ rāmacandraṃ bhaje',
    meaning: 'I worship Achyuta, Keshava, Rama, Narayana — Krishna, Damodara, Vasudeva, Hari — Shridhara, Madhava, the beloved of the Gopis — the lord of Janaki (Sita), Ramachandra.',
  },

  // ══════════════════════════════════════════════════════════
  // SHIVA
  // ══════════════════════════════════════════════════════════

  {
    id: 'lingashtakam',
    name: 'Lingashtakam',
    deity: 'Shiva',
    category: 'Devotional',
    when: 'Pradosha; Mahashivaratri; Monday puja; before offering Shivalinga abhishek',
    sanskrit: 'ब्रह्ममुरारिसुरार्चितलिङ्गं निर्मलभासितशोभितलिङ्गम्।\nजन्मजदुःखविनाशकलिङ्गं तत्प्रणमामि सदाशिवलिङ्गम्॥\nदेवमुनिप्रवरार्चितलिङ्गं कामदहं करुणाकरलिङ्गम्।\nरावणदर्पविनाशनलिङ्गं तत्प्रणमामि सदाशिवलिङ्गम्॥',
    iast: 'Brahma murāri surārcita liṅgaṃ nirmala bhāsita śobhita liṅgam\njanmaja duḥkha vināśaka liṅgaṃ tat praṇamāmi sadāśiva liṅgam\ndeva munipravara ārcita liṅgaṃ kāmadahaṃ karuṇākara liṅgam\nrāvaṇa darpa vināśana liṅgaṃ tat praṇamāmi sadāśiva liṅgam',
    meaning: 'I bow to the Linga of Sadashiva — worshipped by Brahma, Vishnu, and all gods; shining with unstained radiance; the destroyer of the sorrow of rebirth. I bow to the Linga worshipped by the best of gods and sages; which burned Kama and is the abode of compassion; which destroyed the pride of Ravana.',
  },

  {
    id: 'bilvashtakam',
    name: 'Bilvashtakam',
    deity: 'Shiva',
    category: 'Devotional',
    when: 'Offering bel/bilva leaves to Shiva; Shravan Mondays; Mahashivaratri',
    sanskrit: 'त्रिदलं त्रिगुणाकारं त्रिनेत्रं च त्रियायुधम्।\nत्रिजन्मपापसंहारमेकबिल्वं शिवार्पणम्॥\nत्रिशाखैर्बिल्वपत्रैश्च ह्यच्छिद्रैः कोमलैः शुभैः।\nतव पूजां करिष्यामि शिवार्पणमस्तु॥',
    iast: 'Tridalaṃ triguṇākāraṃ trinetram ca triyāyudham\ntrijanmapāpasaṃhāramekabilvaṃ śivārpaṇam\ntriśākhairbilvapātraiśca hyacchidraṃ komalaiḥ śubhaiḥ\ntava pūjāṃ kariṣyāmi śivārpaṇamastu',
    meaning: 'Three-petalled, representing the three gunas, three-eyed, bearing three weapons — one bel leaf destroys sins of three births; I offer it to Shiva. With three-branched bel leaves, unblemished, tender, and auspicious, I perform your worship — may this be offered to Shiva.',
  },

  {
    id: 'dwadasha-jyotirlinga-stotra',
    name: 'Dwadasha Jyotirlinga Stotra',
    deity: 'Shiva',
    category: 'Devotional',
    when: 'Mahashivaratri; Shravan month; visiting a Jyotirlinga temple; Mondays',
    sanskrit: 'सौराष्ट्रे सोमनाथं च श्रीशैले मल्लिकार्जुनम्।\nउज्जयिन्यां महाकालमोङ्कारममलेश्वरम्॥\nपरल्यां वैद्यनाथं च डाकिन्यां भीमशङ्करम्।\nसेतुबन्धे तु रामेशं नागेशं दारुकावने॥\nवाराणस्यां तु विश्वेशं त्र्यम्बकं गौतमीतटे।\nहिमालये तु केदारं घुश्मेशं च शिवालये॥\nएतानि ज्योतिर्लिङ्गानि सायं प्रातः पठेन्नरः।\nसप्तजन्मकृतं पापं स्मरणेन विनश्यति॥',
    iast: 'Saurāṣṭre somanāthaṃ ca śrīśaile mallikārjunam\nujjayinyāṃ mahākālamomkāramamaleśvaram\nparalyāṃ vaidyanāthaṃ ca ḍākinyāṃ bhīmaśaṅkaram\nsetubandhe tu rāmeśaṃ nāgeśaṃ dārukāvane\nvārāṇasyāṃ tu viśveśaṃ tryambakaṃ gautamītaṭe\nhimālaye tu kedāraṃ ghuśmeśaṃ ca śivālaye\netāni jyotirliṅgāni sāyaṃ prātaḥ paṭhennaraḥ\nsaptajanmakṛtaṃ pāpaṃ smaraṇena vinaśyati',
    meaning: 'Somnath in Saurashtra; Mallikarjuna at Srisaila; Mahakala at Ujjain; Omkareshvara at Amaleshvara; Vaidyanath at Parali; Bhimashankar in the Dakini region; Rameshvara at the ocean bridge; Nageshvara at Darukavana; Vishveshvara at Varanasi; Tryambaka on the banks of the Gautami (Godavari); Kedara in the Himalayas; Ghushmesha at Shivalaya. The person who recites these twelve Jyotirlingas morning and evening — sins of seven births are destroyed by remembrance alone.',
  },

  {
    id: 'karpur-gauram',
    name: 'Karpur Gauram',
    deity: 'Shiva',
    category: 'Invocation',
    when: 'Opening of every Shiva puja; Aarti; Mahashivaratri; mangalacharana',
    sanskrit: 'कर्पूरगौरं करुणावतारं संसारसारं भुजगेन्द्रहारम्।\nसदावसन्तं हृदयारविन्दे भवं भवानीसहितं नमामि॥',
    iast: 'Karpūragauraṃ karuṇāvatāraṃ saṃsārasāraṃ bhujagendrahāram\nsadāvasantaṃ hṛdayāravinde bhavaṃ bhavānīsahitaṃ namāmi',
    meaning: 'White as camphor, the very incarnation of compassion, the essence of all worldly existence, garlanded with the king of serpents — I bow to Bhava (Shiva) who ever dwells in the lotus of the heart, together with Bhavani.',
  },

  {
    id: 'rudrashtakam',
    name: 'Rudrashtakam',
    deity: 'Shiva',
    category: 'Devotional',
    when: 'Shravan month; Mahashivaratri; daily Shiva puja; composed by Tulsidas',
    sanskrit: 'नमामीशमीशान निर्वाणरूपं विभुं व्यापकं ब्रह्मवेदस्वरूपम्।\nनिजं निर्गुणं निर्विकल्पं निरीहं चिदाकाशमाकाशवासं भजेऽहम्॥\nनिराकारमोंकारमूलं तुरीयं गिरा ज्ञान गोतीतमीशं गिरीशम्।\nकरालं महाकाल कालं कृपालं गुणागार संसारपारं नतोऽहम्॥',
    iast: 'Namāmīśamīśāna nirvāṇarūpaṃ vibhuṃ vyāpakaṃ brahmavedasvarūpam\nnijaṃ nirguṇaṃ nirvikalpaṃ nirīhaṃ cidākāśamākāśavāsaṃ bhaje\'ham\nnirākāramoṃkāramūlaṃ turīyaṃ girā jñāna gotītamīśaṃ girīśam\nkarālaṃ mahākāla kālaṃ kṛpālaṃ guṇāgāra saṃsārapāraṃ nato\'ham',
    meaning: 'I bow to Isha, the lord, whose nature is liberation — omnipresent, all-pervading, the embodiment of Brahman and the Vedas; self-luminous, attribute-less, beyond all thought, desireless — dwelling in the ether of consciousness, I worship him. Formless, the root of Om, the fourth state of consciousness, transcending speech, knowledge, and the senses — the terrible Mahakala, yet compassionate, the abode of virtues, beyond the cycle of existence — I bow to him.',
  },

  {
    id: 'shiv-mahimna-stotra',
    name: 'Shiv Mahimna Stotra — Opening',
    deity: 'Shiva',
    category: 'Devotional',
    when: 'Shravan; Mahashivaratri; composed by Pushpadanta Gandharva',
    sanskrit: 'महिम्नः पारं ते परमविदुषो यद्यसदृशी\nस्तुतिर्ब्रह्मादीनामपि तदवसन्नास्त्वयि गिरः।\nअथाऽवाच्यः सर्वः स्वमतिपरिणामावधि गृणन्\nममाप्येष स्तोत्रे हर निरपवादः परिकरः॥',
    iast: 'Mahimnaḥ pāraṃ te paramaviduṣo yadyasadṛśī\nstutirbrahMādīnāmapi tadavasannāstvai giraḥ\nathā\'vācyaḥ sarvaḥ svamatiparīṇāmāvadhi gṛṇan\nmamāpyeṣa stotre hara nirapavādaḥ parikaraḥ',
    meaning: 'O Shiva, if even Brahma and the great knowers of your highest glory find speech inadequate to praise you — then every person who sings your praises to the limit of their own understanding is nonetheless beyond reproach. On this basis, my attempt at this hymn is also without fault.',
  },

  {
    id: 'nirvana-shatakam',
    name: 'Nirvana Shatakam (Chidananda Roopam)',
    deity: 'Shiva',
    category: 'Vedic',
    when: 'Deep meditation; Vedanta contemplation; composed by Adi Shankaracharya',
    sanskrit: 'मनोबुद्ध्यहंकारचित्तानि नाहं न च श्रोत्रजिह्वे न च घ्राणनेत्रे।\nन च व्योमभूमिर्न तेजो न वायुश्चिदानन्दरूपः शिवोऽहं शिवोऽहम्॥\nन च प्राणसंज्ञो न वै पञ्चवायुर्न वा सप्तधातुर्न वा पञ्चकोशः।\nन वाक्पाणिपादं न चोपस्थपायुश्चिदानन्दरूपः शिवोऽहं शिवोऽहम्॥',
    iast: 'Manobuddhyahaṃkāracittāni nāhaṃ na ca śrotrajihve na ca ghrāṇanetre\nna ca vyomabhūmir na tejo na vāyuścidānandarūpaḥ śivo\'haṃ śivo\'ham\nna ca prāṇasaṃjño na vai pañcavāyurna vā saptadhāturna vā pañcakośaḥ\nna vākpāṇipādaṃ na copasthapāyuścidānandarūpaḥ śivo\'haṃ śivo\'ham',
    meaning: 'I am not the mind, intellect, ego, or memory; I am not the ear, tongue, nose, or eye; I am not ether, earth, fire, or wind — I am pure consciousness and bliss: I am Shiva! I am Shiva! I am not the life force, nor the five vital airs, nor the seven elements, nor the five sheaths; I am not speech, hands, feet, or the organs of generation and excretion — I am pure consciousness and bliss: I am Shiva! I am Shiva!',
  },

  // ══════════════════════════════════════════════════════════
  // KRISHNA
  // ══════════════════════════════════════════════════════════

  {
    id: 'madhura-ashtakam',
    name: 'Madhura Ashtakam',
    deity: 'Krishna',
    category: 'Devotional',
    when: 'Krishna Janmashtami; Radhashtami; daily Krishna bhajan; composed by Vallabhacharya',
    sanskrit: 'अधरं मधुरं वदनं मधुरं नयनं मधुरं हसितं मधुरम्।\nहृदयं मधुरं गमनं मधुरं मधुराधिपतेरखिलं मधुरम्॥\nवचनं मधुरं चरितं मधुरं वसनं मधुरं वलितं मधुरम्।\nचलितं मधुरं भ्रमितं मधुरं मधुराधिपतेरखिलं मधुरम्॥',
    iast: 'Adharaṃ madhuraṃ vadanaṃ madhuraṃ nayanaṃ madhuraṃ hasitaṃ madhuram\nhṛdayaṃ madhuraṃ gamanaṃ madhuraṃ madhurādhipaterakhilaṃ madhuram\nvacanaṃ madhuraṃ caritaṃ madhuraṃ vasanaṃ madhuraṃ valitaṃ madhuram\ncalitaṃ madhuraṃ bhramitaṃ madhuraṃ madhurādhipaterakhilaṃ madhuram',
    meaning: 'Sweet are his lips, sweet his face, sweet his eyes, sweet his smile. Sweet his heart, sweet his gait — everything about the Lord of Sweetness is sweet. Sweet his words, sweet his deeds, sweet his garments, sweet his embrace. Sweet his movements, sweet his wandering — everything about the Lord of Sweetness is sweet.',
  },

  {
    id: 'vasudeva-sutam',
    name: 'Vasudeva Sutam (Krishna Vandana)',
    deity: 'Krishna',
    category: 'Invocation',
    when: 'Before Krishna puja; Janmashtami; Govardhan Puja; Gita Jayanti',
    sanskrit: 'वसुदेवसुतं देवं कंसचाणूरमर्दनम्।\nदेवकीपरमानन्दं कृष्णं वन्दे जगद्गुरुम्॥',
    iast: 'Vasudevasutaṃ devaṃ kaṃsacāṇūramardanam\ndevakīparamānandaṃ kṛṣṇaṃ vande jagadgurum',
    meaning: 'I worship Krishna, son of Vasudeva, who destroyed Kamsa and Chanura, the supreme joy of Devaki — the guru of the entire world.',
  },

  {
    id: 'govinda-ashtakam',
    name: 'Govinda Ashtakam',
    deity: 'Krishna',
    category: 'Devotional',
    when: 'Daily Krishna puja; Janmashtami; Ekadashi; composed by Adi Shankaracharya',
    sanskrit: 'सत्यं ज्ञानमनन्तं नित्यमनाकाशं परमाकाशम्।\nगोष्ठप्रांगणरिङ्खणलोलमनायासं परमायासम्।\nमायाकल्पितनानाकारमनाकारं भुवनाकारं।\nक्षमयामि सखे गोविन्दं परमानन्दं सततं॥',
    iast: 'Satyaṃ jñānamanantaṃ nityamanākāśaṃ paramākāśam\ngoṣṭhaprāṃgaṇariṅkhaṇalolam anāyāsaṃ paramāyāsam\nmāyākalpitanānākāramanākāraṃ bhuvanākāram\nkṣamayāmi sakhe govindaṃ paramānandaṃ satataṃ',
    meaning: 'Truth, knowledge, infinite, eternal — beyond space yet the highest ether; playfully crawling in the cowherd courtyard, effortless yet the highest effort; of many forms imagined by maya yet formless yet the form of all worlds — I constantly worship Govinda, my friend, the supreme bliss.',
  },

  {
    id: 'vishnu-aarti',
    name: 'Om Jai Jagdish Hare (Vishnu Aarti)',
    deity: 'Vishnu',
    category: 'Aarti',
    when: 'Evening Aarti; Puja completion; Ekadashi; Satyanarayan Puja',
    sanskrit: 'ॐ जय जगदीश हरे, स्वामी जय जगदीश हरे।\nभक्त जनों के संकट, दास जनों के संकट,\nक्षण में दूर करे॥\nजो ध्यावे फल पावे, दुःख बिनसे मन का।\nसुख सम्पत्ति घर आवे, कष्ट मिटे तन का॥',
    iast: 'Oṃ jaya jagadīśa hare, svāmī jaya jagadīśa hare\nbhakta janōṃ kē saṃkaṭa, dāsa janōṃ kē saṃkaṭa\nkṣaṇa mēṃ dūra karē\njo dhyāve phala pāve, duḥkha binase mana kā\nsukha sampatti ghara āve, kaṣṭa miṭe tana kā',
    meaning: 'Victory to the Lord of the Universe! O Master, you remove the afflictions of devotees and servants in an instant. Whoever meditates on you receives fruit; the mind\'s sorrow vanishes. Happiness and wealth come home; the body\'s suffering is erased.',
  },

  // ══════════════════════════════════════════════════════════
  // DEVI
  // ══════════════════════════════════════════════════════════

  {
    id: 'aigiri-nandini',
    name: 'Aigiri Nandini (Mahishasura Mardini)',
    deity: 'Durga / Devi',
    category: 'Navratri',
    when: 'Navratri; Durgashtami; Vijaya Dashami; composed by Adi Shankaracharya',
    sanskrit: 'अयि गिरिनन्दिनि नन्दितमेदिनि विश्वविनोदिनि नन्दनुते।\nगिरिवरविन्ध्यशिरोऽधिनिवासिनि विष्णुविलासिनि जिष्णुनुते।\nभगवति हे शितिकण्ठकुटुम्बिनि भूरिकुटुम्बिनि भूरिकृते।\nजय जय हे महिषासुरमर्दिनि रम्यकपर्दिनि शैलसुते॥',
    iast: 'Ayi girinandini nanditamedini viśvavinodini nandanute\ngirivara vindhyaśiro\'dhinivāsini viṣṇuvilāsini jiṣṇunute\nbhagavati he śitakaṇṭhakuṭumbini bhūrikuṭumbini bhūrikṛte\njaya jaya he mahiṣāsuramardini ramyakapardini śailasute',
    meaning: 'O daughter of the mountain — who delights the earth, who rejoices the universe, praised by Nanda! Who dwells on the great Vindhya summit, the delight of Vishnu, praised by Jishnu (Indra)! O blessed one, wife of the blue-throated Shiva, mother of multitudes, bestower of abundance! Victory, victory to you — slayer of Mahishasura, with beautiful matted locks, daughter of the mountain!',
  },

  {
    id: 'devi-mangala-shloka',
    name: 'Devi Mangala Shloka (Jayanti Mangala)',
    deity: 'Durga / Devi',
    category: 'Invocation',
    when: 'Opening of Durga puja; Navratri; Saptashati parayana; Tuesdays',
    sanskrit: 'जयन्ती मङ्गला काली भद्रकाली कपालिनी।\nदुर्गा शिवा क्षमा धात्री स्वाहा स्वधा नमोऽस्तु ते॥',
    iast: 'Jayantī maṅgalā kālī bhadrakālī kapālinī\ndurgā śivā kṣamā dhātrī svāhā svadhā namo\'stu te',
    meaning: 'Salutations to you — Jayanti (victorious), Mangala (auspicious), Kali (dark destroyer of time), Bhadrakali (the benevolent Kali), Kapalini (skull-bearer), Durga, Shiva, Kshama (forgiveness), Dhatri (nurturer), Svaha (oblation), Svadha (ancestral offering).',
  },

  {
    id: 'jai-ambe-gauri',
    name: 'Jai Ambe Gauri (Durga Aarti)',
    deity: 'Durga / Devi',
    category: 'Aarti',
    when: 'Navratri daily Aarti; every Tuesday; Durga puja completion',
    sanskrit: 'जय अम्बे गौरी, मैया जय श्यामा गौरी।\nतुमको निशदिन ध्यावत, हरि ब्रह्मा शिवरी॥\nमाँग सिन्दूर विराजत, टीको मृगमद को।\nउज्ज्वल से दोउ नैना, चन्द्रवदन नीको॥',
    iast: 'Jaya ambe gaurī, maiyā jaya śyāmā gaurī\ntumako niśadina dhyāvata, hari brahmā śivarī\nmāṃga sindūra virājata, ṭīko mṛgamada ko\nujjvala se dou nainā, candravadana nīko',
    meaning: 'Victory to Ambe Gauri — O mother, victory to Shyama Gauri! Hari, Brahma, and Shiva meditate on you night and day. Vermilion adorns your parting; the musk mark on your forehead. Your two eyes are radiant, your moon-face is beautiful.',
  },

  {
    id: 'kali-ashtakam',
    name: 'Kali Ashtakam',
    deity: 'Kali',
    category: 'Protection',
    when: 'Kali Puja; Amavasya; Diwali night; Tuesdays for removal of fear and enemies',
    sanskrit: 'कर्पूरस्तवकासिता त्रिजगतामाधारभूता शिवा\nसर्वस्यार्तिहरी सदापरिमला सौम्या सुरेशी शुभा।\nक्षिप्रप्रीतिकरी महेशमहिषी माया च संसारिणी\nनित्यानन्दमयी निरामयपदा काली कलिध्वंसिनी॥',
    iast: 'Karpūrastavakāsitā trijagatāmādhārabhūtā śivā\nsarvasyārtiharī sadāparimalā saumyā sureśī śubhā\nkṣiprapītikārī maheśamahiṣī māyā ca saṃsāriṇī\nnityānandamayī nirāmayapadā kālī kalidhvaṃsinī',
    meaning: 'Bright as a cluster of camphor, the foundation of all three worlds, the auspicious one; the remover of everyone\'s suffering, ever fragrant, gentle, queen of the gods, auspicious; quick to bestow grace, consort of Maheshvara, the great maya of worldly existence; ever filled with bliss, in the state beyond disease, Kali — destroyer of the dark age (Kali Yuga).',
  },

  {
    id: 'argala-stotram',
    name: 'Argala Stotram (Durga Saptashati)',
    deity: 'Durga / Devi',
    category: 'Protection',
    when: 'Before Durga Saptashati parayana; Navratri; Durgashtami',
    sanskrit: 'ॐ नमश्चण्डिकायै।\nमार्कण्डेय उवाच॥\nजय त्वं देवि चामुण्डे जय भूतापहारिणि।\nजय सर्वगते देवि कालरात्रि नमोऽस्तु ते॥\nमधुकैटभविध्वंसि विधातृवरदे नमः।\nरूपं देहि जयं देहि यशो देहि द्विषो जहि॥',
    iast: 'Oṃ namaścaṇḍikāyai\nmārkaṇḍeya uvāca\njaya tvaṃ devi cāmuṇḍe jaya bhūtāpahāriṇī\njaya sarvagata devi kālarātri namo\'stu te\nmadhukaiṭabhavīdhvaṃsi vidhātṛvarade namaḥ\nrūpaṃ dehi jayaṃ dehi yaśo dehi dviṣo jahi',
    meaning: 'Om, salutations to Chandika. Markandeya said: Victory to you, O Chamunda! Victory, remover of all afflictions! Victory, O goddess who pervades all! Salutations, O Night of Time. Salutations to you who destroyed Madhu and Kaitabha, bestower of boons to the creator. Grant me beauty, grant me victory, grant me fame — destroy my enemies.',
  },

  {
    id: 'saundarya-lahari',
    name: 'Saundarya Lahari — Opening',
    deity: 'Devi (Shakti)',
    category: 'Devotional',
    when: 'Devi puja; tantric worship; Navratri; composed by Adi Shankaracharya',
    sanskrit: 'शिवः शक्त्या युक्तो यदि भवति शक्तः प्रभवितुं\nन चेदेवं देवो न खलु कुशलः स्पन्दितुमपि।\nअतस्त्वामाराध्यां हरिहरविरिञ्च्यादिभिरपि\nप्रणन्तुं स्तोतुं वा कथमकृतपुण्यः प्रभवति॥',
    iast: 'Śivaḥ śaktyā yukto yadi bhavati śaktaḥ prabhavituṃ\nna cedevaṃ devo na khalu kuśalaḥ spanditumapi\natastvaāmārādhyāṃ hariharavirīñcyādibhirapi\npraṇantuṃ stotuṃ vā kathamakṛtapuṇyaḥ prabhavati',
    meaning: 'Shiva, only when united with you (Shakti), is able to manifest. Without you, the god cannot even stir. Therefore, you who are worshipped even by Vishnu, Shiva, and Brahma — how can one without merit bow to you or praise you? (The answer: only by your grace.)',
  },

  // ══════════════════════════════════════════════════════════
  // HANUMAN
  // ══════════════════════════════════════════════════════════

  {
    id: 'sankat-mochan-hanumanashtak',
    name: 'Sankat Mochan Hanumanashtak',
    deity: 'Hanuman',
    category: 'Protection',
    when: 'Tuesdays; Saturdays; Hanuman Jayanti; for deliverance from crisis',
    sanskrit: 'बाल समय रवि भक्षि लियो तब, तीनहुँ लोक भयो अँधियारो।\nताहि सों त्रास भयो जग को, यह संकट काहु सों जात न टारो॥\nदेवन आनि करी विनती तब, छाँड़ि दियो रवि कष्ट निवारो।\nको नहिं जानत है जग में, कपि संकटमोचन नाम तिहारो॥',
    iast: 'Bāla samaya ravi bhakṣi liyo taba, tīnahũ loka bhayo aṃdhiyāro\ntāhi soṃ trāsa bhayo jaga ko, yaha saṃkaṭa kāhu soṃ jāta na ṭāro\ndevana āni karī vinatī taba, chāṃṛi diyo ravi kaṣṭa nivāro\nko nahiṃ jānata hai jaga meṃ, kapi saṃkaṭamocana nāma tihāro',
    meaning: 'In childhood you swallowed the Sun, and all three worlds fell into darkness. Such was the crisis that none could resolve. The gods came and pleaded, and you released the Sun, removing the calamity. Who in all the world does not know your name, O Kapi — the Remover of Afflictions (Sankat Mochan)?',
  },

  {
    id: 'bajrang-baan',
    name: 'Bajrang Baan — Opening',
    deity: 'Hanuman',
    category: 'Protection',
    when: 'Tuesdays; Saturdays; for strong protection, overcoming fear and black magic',
    sanskrit: 'निश्चय प्रेम प्रतीति ते, विनय करें सनमान।\nतेहि के कारज सकल शुभ, सिद्ध करैं हनुमान॥\nजय हनुमन्त सन्त हितकारी। सुन लीजै प्रभु अरज हमारी॥\nजन के काज बिलम्ब न कीजै। आतुर दौरि महा सुख दीजै॥',
    iast: 'Niścaya prema pratīti te, vinaya kareṃ sanamāna\ntehi ke kāraja sakala śubha, siddha karaī hanumāna\njaya hanumanta santa hitakārī, suna lījai prabhu araja hamārī\njana ke kāja bilaṃba na kījai, ātura dauri mahā sukha dījai',
    meaning: 'Those who with genuine love, faith, and humility offer reverence — Hanuman fulfils all their auspicious works. Victory to Hanuman, the benefactor of the righteous — please hear our prayer, O Lord. Do not delay in the devotee\'s affairs. Come running swiftly and grant the greatest happiness.',
  },

  // ══════════════════════════════════════════════════════════
  // SARASWATI
  // ══════════════════════════════════════════════════════════

  {
    id: 'saraswati-ashtakam',
    name: 'Saraswati Ashtakam',
    deity: 'Saraswati',
    category: 'Invocation',
    when: 'Vasant Panchami; before exams, writing, music, or any creative work',
    sanskrit: 'सरस्वति नमस्तुभ्यं वरदे कामरूपिणि।\nविद्यारम्भं करिष्यामि सिद्धिर्भवतु मे सदा॥\nसरस्वति नमस्तुभ्यं सर्वदेविनमस्कृते।\nशान्तरूपे शशिधरे सर्वयोगे नमोस्तुते॥',
    iast: 'Sarasvati namastubhyaṃ varade kāmarūpiṇī\nvidyārambhaṃ kariṣyāmi siddhirbhavatu me sadā\nsarasvati namastubhyaṃ sarvadevinamaskṛte\nśāntarūpe śaśidhare sarvayoge namostute',
    meaning: 'Salutations to you, Saraswati — bestower of boons, you who take any form desired. I am beginning my studies; may I always attain perfection. Salutations to you, Saraswati, worshipped by all gods; of peaceful form, who holds the moon — salutations to you who is present in all yoga.',
  },

  // ══════════════════════════════════════════════════════════
  // GANESH
  // ══════════════════════════════════════════════════════════

  {
    id: 'ganesh-aarti',
    name: 'Jai Ganesh Jai Ganesh (Ganesh Aarti)',
    deity: 'Ganesha',
    category: 'Aarti',
    when: 'Ganesh Chaturthi; start of every puja; Wednesdays; completion of any work',
    sanskrit: 'जय गणेश जय गणेश, जय गणेश देवा।\nमाता जाकी पार्वती, पिता महादेवा॥\nएकदन्त दयावन्त, चार भुजाधारी।\nमाथे सिन्दूर सोहे, मूसे की सवारी॥',
    iast: 'Jaya gaṇeśa jaya gaṇeśa, jaya gaṇeśa devā\nmātā jāki pārvatī, pitā mahādevā\nekadanta dayāvanta, cāra bhujādhārī\nmāthe sindūra sohe, mūse kī savārī',
    meaning: 'Victory to Ganesha, victory to Ganesha — victory to the divine Ganesha! Whose mother is Parvati, whose father is Mahadeva. Single-tusked, compassionate, bearing four arms. Vermilion adorns his forehead; his mount is the mouse.',
  },

  {
    id: 'ganesh-pancharatnam',
    name: 'Ganesh Pancharatnam',
    deity: 'Ganesha',
    category: 'Devotional',
    when: 'Ganesh Chaturthi; Wednesdays; Sankashti Chaturthi; composed by Adi Shankaracharya',
    sanskrit: 'मुदाकरात्तमोदकं सदा विमुक्तिसाधकं\nकलाधरावतंसकं विलासिलोकरक्षकम्।\nअनायकैकनायकं विनाशितेभदैत्यकं\nनताशुभाशुनाशकं नमामि तं विनायकम्॥',
    iast: 'Mudākarāttamōdakaṃ sadā vimuktisādhakaṃ\nkalādharāvataṃsakaṃ vilāsilokarakṣakam\nanāyakaikānāyakaṃ vināśitebhadaityakaṃ\nnatāśubhāśunāśakaṃ namāmi taṃ vināyakam',
    meaning: 'Who holds the modaka (sweet) with a joyful hand; who is ever the means of liberation; who wears the crescent moon as an ornament; who protects the playful worlds; the one leader of the leaderless; the destroyer of the elephant-demon (Gajasura); who swiftly destroys the inauspiciousness of those who bow — I bow to that Vinayaka.',
  },

  // ══════════════════════════════════════════════════════════
  // SURYA / NAVAGRAHA
  // ══════════════════════════════════════════════════════════

  {
    id: 'navagraha-stotra',
    name: 'Navagraha Stotra (All Nine Planets)',
    deity: 'Navagraha',
    category: 'Daily Mantra',
    when: 'Sunday through Saturday; Navagraha puja; Jyotish remedies; before travel',
    sanskrit: 'जपाकुसुमसंकाशं काश्यपेयं महाद्युतिम् — सूर्याय नमः।\nदधिशंखतुषाराभं क्षीरोदार्णवसंभवम् — चन्द्राय नमः।\nधरणीगर्भसंभूतं विद्युत्कान्तिसमप्रभम् — मंगलाय नमः।\nप्रियंगुकलिकाश्यामं रूपेणाप्रतिमं बुधम् — बुधाय नमः।\nदेवानां च ऋषीणां च गुरुं काञ्चनसन्निभम् — गुरवे नमः।\nहिमकुन्दमृणालाभं दैत्यानां परमं गुरुम् — शुक्राय नमः।\nनीलाञ्जनसमाभासं रविपुत्रं यमाग्रजम् — शनैश्चराय नमः।\nअर्धकायं महावीर्यं चन्द्रादित्यविमर्दनम् — राहवे नमः।\nपलाशपुष्पसंकाशं तारकाग्रहमस्तकम् — केतवे नमः।',
    iast: 'Japākusumasaṃkāśaṃ kāśyapeyaṃ mahādyutim — sūryāya namaḥ\ndadhiśaṃkhatuṣārābhaṃ kṣīrodārṇavasaṃbhavam — candrāya namaḥ\ndharaṇīgarbhasaṃbhūtaṃ vidyutkāntīsamaprabham — maṃgalāya namaḥ\npriyaṃgukālikāśyāmaṃ rūpeṇāpratimaṃ budham — budhāya namaḥ\ndevānāṃ ca ṛṣīṇāṃ ca guruṃ kāñcanasannibham — gurave namaḥ\nhimakuṃdamṛṇālābhaṃ daityānāṃ paramaṃ gurum — śukrāya namaḥ\nnīlāñjansamābhāsaṃ ravīputraṃ yamāgrajam — śanaiścarāya namaḥ\nardhakāyaṃ mahāvīryaṃ candrādityavimardanam — rāhave namaḥ\npalāśapuṣpasaṃkāśaṃ tārakāgrahamastakam — ketave namaḥ',
    meaning: 'Brilliant as the hibiscus flower, son of Kashyapa — Salutations to Surya. White as curds, conch, and snow, born from the milk-ocean — Salutations to Chandra. Born from the womb of the earth, radiant as lightning — Salutations to Mangala (Mars). Dark as the priyangu bud, of incomparable form — Salutations to Budha (Mercury). Guru of gods and sages, golden in hue — Salutations to Brihaspati (Jupiter). White as snow, jasmine, and lotus stalk, supreme guru of the demons — Salutations to Shukra (Venus). Like blue collyrium, son of the Sun, elder of Yama — Salutations to Shani (Saturn). Half-bodied, of great power, afflicting Moon and Sun — Salutations to Rahu. Bright as a palasha flower, head of the asterism-planets — Salutations to Ketu.',
  },

  // ══════════════════════════════════════════════════════════
  // SKANDA / MURUGAN
  // ══════════════════════════════════════════════════════════

  {
    id: 'subramanya-stotra',
    name: 'Subramanya / Skanda Stotra',
    deity: 'Skanda / Murugan',
    category: 'Invocation',
    when: 'Skanda Sashti; Tuesdays; Karthigai Deepam; south Indian festivals',
    sanskrit: 'षडाननं कुंकुमरक्तवर्णं महामतिं दिव्यमयूरवाहनम्।\nरुद्रस्य सूनुं सुरलोकनाथं ब्रह्मण्यदेवं शरणं प्रपद्ये॥\nसरवणभव नाम षण्मुखन ध्यानम्। ॐ शरवण भव॥',
    iast: 'Ṣaḍānanaṃ kuṃkumaraktavarṇaṃ mahāmatiṃ divyamayūravāhanam\nrudrasya sūnaṃ suralokanāthaṃ brahmaṇyadevaṃ śaraṇaṃ prapadye\nsaravaṇabhava nāma ṣaṇmukhan dhyānam — oṃ śaravaṇa bhava',
    meaning: 'Six-faced, red as vermilion, of supreme wisdom, riding the divine peacock; son of Rudra, lord of the celestial world, deity of Brahman — I take refuge in him. The six-faced one whose name is "born among the reeds" — Om, born of the reeds (the bija mantra of Murugan/Skanda).',
  },

  // ══════════════════════════════════════════════════════════
  // GANGA / NATURE
  // ══════════════════════════════════════════════════════════

  {
    id: 'ganga-stotram',
    name: 'Ganga Stotram',
    deity: 'Ganga',
    category: 'Devotional',
    when: 'Ganga Saptami; Ganga Dussehra; before bathing in any river; pilgrimage; composed by Adi Shankaracharya',
    sanskrit: 'देवि सुरेश्वरि भगवति गङ्गे त्रिभुवनतारिणि तरललङ्गे।\nशंकरमौलिविहारिणि विमले मम मतिरास्तां तव पदकमले॥\nभागीरथिसुखदायिनि मातस्तव जलमहिमा निगमे ख्यातः।\nनाहं जाने तव महिमानं पाहि कृपामयि मामज्ञानम्॥',
    iast: 'Devi sureśvari bhagavati gaṅge tribhuvanatāriṇī taralaṃge\nśaṃkaramaulivihāriṇī vimale mama matirāstāṃ tava padakamale\nbhāgīrathisukhadāyini mātas tava jalamaḥimā nigame khyātaḥ\nnāhaṃ jāne tava mahimānaṃ pāhi kṛpāmayi māmajñānam',
    meaning: 'O Devi Ganga, blessed queen of the gods, redeemer of the three worlds, with playful waves; who roams in Shankara\'s matted locks, O pure one — may my mind rest at your lotus feet. O mother Bhagirathi, bringer of joy — your water\'s glory is proclaimed in the Vedas. I do not know your full greatness, O compassionate one — protect me, I who am ignorant.',
  },

  {
    id: 'tulasi-ashtakam',
    name: 'Tulasi Ashtakam',
    deity: 'Tulasi',
    category: 'Devotional',
    when: 'Tulasi Vivah; Kartik month; daily morning worship of Tulasi plant',
    sanskrit: 'महाप्रसाद जननी सर्वसौभाग्यवर्धिनी।\nआधि व्याधि हरा नित्यं तुलसी त्वां नमाम्यहम्॥\nनमस्तुलसि कल्याणि नमो विष्णुप्रिये शुभे।\nनमो मोक्षप्रदे देवि नमः सम्पत्प्रदायिके॥',
    iast: 'Mahāprasāda jananī sarvasaubhāgyavardhinī\nādhi vyādhi harā nityaṃ tulasī tvāṃ namāmyaham\nnamastulasi kalyāṇi namo viṣṇupriye śubhe\nnamo mokṣaprade devi namaḥ sampatpradāyike',
    meaning: 'O Tulasi — mother of great prasada, increaser of all auspiciousness, remover of mental and physical ailments always — I bow to you. Salutations O Tulasi, the auspicious, the beloved of Vishnu, the pure one; salutations O goddess who grants liberation; salutations who bestows wealth and abundance.',
  },

  // ══════════════════════════════════════════════════════════
  // VEDIC / UNIVERSAL
  // ══════════════════════════════════════════════════════════

  {
    id: 'gurvashtakam',
    name: 'Gurvashtakam',
    deity: 'Guru (Universal)',
    category: 'Guru',
    when: 'Guru Purnima; before beginning any study; composed by Adi Shankaracharya',
    sanskrit: 'शरीरं सुरूपं तथा वा कलत्रं यशश्चारु चित्रं धनं मेरुतुल्यम्।\nमनश्चेन्न लग्नं गुरोरङ्घ्रिपद्मे ततः किं ततः किं ततः किं ततः किम्॥\nकलत्रं धनं पुत्रपौत्रादि सर्वं गृहं बान्धवाः सर्वमेतद्धि जातम्।\nमनश्चेन्न लग्नं गुरोरङ्घ्रिपद्मे ततः किं ततः किं ततः किं ततः किम्॥',
    iast: 'Śarīraṃ surūpaṃ tathā vā kalatraṃ yaśaścāru citraṃ dhanaṃ merutulyam\nmanaścenna lagnaṃ guroraṅghripadme tataḥ kiṃ tataḥ kiṃ tataḥ kiṃ tataḥ kim\nkalatraṃ dhanaṃ putrapaútrādi sarvaṃ gṛhaṃ bāndhavāḥ sarvametadhi jātam\nmanaścenna lagnaṃ guroraṅghripadme tataḥ kiṃ tataḥ kiṃ tataḥ kiṃ tataḥ kim',
    meaning: 'A beautiful body, a splendid spouse, fame of many kinds, wealth equal to Mount Meru — but if the mind is not fixed at the guru\'s lotus feet, what of it? What of it? What of it? What of it? Spouse, wealth, sons and grandsons, home, relatives — all these have come and gone — but if the mind is not fixed at the guru\'s lotus feet, what of it? What of it? What of it? What of it?',
  },

  {
    id: 'shanti-mantra-taittiriya',
    name: 'Shanti Mantra (Saha Nau Avatu)',
    deity: 'Universal',
    category: 'Closing Prayer',
    when: 'Opening and closing of Vedic study; end of puja; yoga session; Upanishad recitation',
    sanskrit: 'ॐ सह नाववतु। सह नौ भुनक्तु। सह वीर्यं करवावहै।\nतेजस्विनावधीतमस्तु मा विद्विषावहै।\nॐ शान्तिः शान्तिः शान्तिः॥',
    iast: 'Oṃ saha nāvavatu / saha nau bhunaktu / saha vīryaṃ karavāvahai\ntejasvināvadhītamastu mā vidviṣāvahai\nOṃ śāntiḥ śāntiḥ śāntiḥ',
    meaning: 'May we be protected together. May we be nourished together. May we work with great energy together. May our study be vigorous and effective. May we not dispute with each other. Om — peace, peace, peace.',
  },

  {
    id: 'mantrapushpam',
    name: 'Mantrapushpam',
    deity: 'Universal',
    category: 'Vedic',
    when: 'Offered as the final ritual flower at the end of any puja; Satyanarayan Puja',
    sanskrit: 'ॐ यज्ञेन यज्ञमयजन्त देवास्तानि धर्माणि प्रथमान्यासन्।\nते ह नाकं महिमानः सचन्त यत्र पूर्वे साध्याः सन्ति देवाः॥\nॐ राजाधिराजाय प्रसह्यसाहिने नमो वयं वैश्रवणाय कुर्महे।\nस मे कामान्कामकामाय मह्यं कामेश्वरो वैश्रवणो ददातु।\nकुबेराय वैश्रवणाय महाराजाय नमः॥',
    iast: 'Oṃ yajñena yajñamayajanta devāstāni dharmāṇi prathamānyāsan\nte ha nākaṃ mahimānaḥ sacanta yatra pūrve sādhyāḥ santi devāḥ\nOṃ rājādhirājāya prasahyasāhine namo vayaṃ vaiśravaṇāya kurmahe\nsa me kāmānkāmakāmāya mahyaṃ kāmeśvaro vaiśravaṇo dadātu\nkuberāya vaiśravaṇāya mahārājāya namaḥ',
    meaning: 'The gods worshipped the yajna with yajna; those were the first dharmas. The great ones reached heaven, where the earlier Sadhya gods dwell. We offer salutations to Kubera Vaishravana, the king of kings, the irresistible. May Vaishravana, lord of desires, grant me my desires. Salutations to Kubera Vaishravana, the great king.',
  },

  {
    id: 'om-tryambakam-extended',
    name: 'Pavamana Mantra (Asato Ma)',
    deity: 'Universal',
    category: 'Closing Prayer',
    when: 'Beginning or closing any spiritual practice; Vedanta study; Upanishad sessions',
    sanskrit: 'ॐ असतो मा सद्गमय। तमसो मा ज्योतिर्गमय।\nमृत्योर्मामृतं गमय।\nॐ शान्तिः शान्तिः शान्तिः॥',
    iast: 'Oṃ asato mā sadgamaya / tamaso mā jyotirgamaya\nmṛtyormāmṛtaṃ gamaya\nOṃ śāntiḥ śāntiḥ śāntiḥ',
    meaning: 'Lead me from the unreal to the real. Lead me from darkness to light. Lead me from death to immortality. Om — peace, peace, peace.',
  },

  {
    id: 'narayana-kavacham',
    name: 'Narayana Kavacham',
    deity: 'Vishnu',
    category: 'Protection',
    when: 'Daily; for protection from all danger; Ekadashi; Vishnu puja; from Srimad Bhagavatam',
    sanskrit: 'ॐ हरिर्विदध्यान्मम सर्वरक्षां न्यस्ताङ्घ्रिपद्मः पतगेन्द्रपृष्ठे।\nदरारिचर्मासिगदेषुचापाशान् दधानोऽष्टगुणोऽष्टबाहुः॥\nजलेषु मां रक्षतु मत्स्यमूर्तिर्यादोगणेभ्यो वरुणस्य पाशात्।\nस्थलेषु मायावटुवामनोऽव्यात् त्रिविक्रमः खे\'वतु विश्वरूपः॥',
    iast: 'Oṃ harirvidadhyānmama sarvarakṣāṃ nyastāṅghripadmaḥ patagendrapṛṣṭhe\ndarāricarmāsigadeṣucāpāśān dadhāno\'ṣṭaguṇo\'ṣṭabāhuḥ\njaleṣu māṃ rakṣatu matsyamūrtir yādogaṇebhyo varuṇasya pāśāt\nsthaleṣu māyāvaṭuvāmano\'vyāt trivikramaḥ khe\'vatu viśvarūpaḥ',
    meaning: 'May Hari protect me on all sides — he whose lotus feet rest on Garuda\'s back, who holds conch, discus, shield, sword, mace, arrows, bow, and noose in eight hands of eight qualities. In water may the Fish-form protect me from sea-creatures and Varuna\'s noose. On land, may the boy Vamana protect me; in the sky may Trivikrama in his cosmic form protect me.',
  },
];

const CATEGORIES = ['All', 'Invocation', 'Daily Mantra', 'Vedic', 'Protection', 'Prosperity', 'Devotional', 'Guru', 'Aarti', 'Navratri', 'Purnima', 'Closing Prayer'];
const DEITIES = ['All', 'Ganesha', 'Shiva', 'Kaal Bhairav', 'Vishnu', 'Krishna', 'Rama', 'Hanuman', 'Lakshmi', 'Saraswati', 'Durga / Devi', 'Devi (Shakti)', 'Kali', 'Surya / Savitri', 'Navagraha', 'Dattatreya', 'Skanda / Murugan', 'Swami Samarth', 'Guru (Universal)', 'Ganga', 'Tulasi', 'Chandra (Moon)', 'Universal'];

interface Shloka {
  id: string;
  name: string;
  deity: string;
  category: string;
  when: string;
  sanskrit: string;
  iast: string;
  meaning: string;
}

function ShlokaCard({ item, onPress }: { item: Shloka; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.shlokaCard} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.shlokaCardHeader}>
        <View style={styles.metaRow}>
          <View style={styles.chip}>
            <Text style={styles.chipText}>{item.deity}</Text>
          </View>
          <View style={[styles.chip, styles.chipSecondary]}>
            <Text style={styles.chipText}>{item.category}</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={16} color={Colors.ink} style={{ opacity: 0.35 }} />
      </View>
      <Text style={styles.shlokaName}>{item.name}</Text>
      <Text style={styles.shlokaWhen} numberOfLines={1}>{item.when}</Text>
      <Text style={styles.shlokaPreview} numberOfLines={2}>{item.sanskrit}</Text>
    </TouchableOpacity>
  );
}

function ShlokaDetailModal({ item, onClose }: { item: Shloka; onClose: () => void }) {
  return (
    <Modal visible animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={styles.modalRoot}>
        <View style={styles.modalHandle} />
        <View style={styles.modalHeader}>
          <Text style={styles.modalDeity}>{item.deity} · {item.category}</Text>
          <TouchableOpacity onPress={onClose} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
            <Ionicons name="close" size={22} color={Colors.ink} />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.modalScroll}
          contentContainerStyle={styles.modalContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.modalName}>{item.name}</Text>
          <View style={styles.whenBox}>
            <Text style={styles.whenLabel}>WHEN TO CHANT</Text>
            <Text style={styles.whenText}>{item.when}</Text>
          </View>
          <Text style={styles.modalSanskrit}>{item.sanskrit}</Text>
          <View style={styles.iastBar}>
            <Text style={styles.modalIast}>{item.iast}</Text>
          </View>
          <Text style={styles.meaningLabel}>MEANING</Text>
          <Text style={styles.modalMeaning}>{item.meaning}</Text>
        </ScrollView>
      </View>
    </Modal>
  );
}

export default function StotrasTab() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeDeity, setActiveDeity] = useState('All');
  const [selected, setSelected] = useState<Shloka | null>(null);

  const filtered = useMemo(() => {
    return SHLOKAS.filter(s => {
      const matchesQuery = query.length === 0 ||
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.deity.toLowerCase().includes(query.toLowerCase()) ||
        s.meaning.toLowerCase().includes(query.toLowerCase());
      const matchesCat = activeCategory === 'All' || s.category === activeCategory;
      const matchesDeity = activeDeity === 'All' || s.deity === activeDeity;
      return matchesQuery && matchesCat && matchesDeity;
    });
  }, [query, activeCategory, activeDeity]);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Stotras & Mantras</Text>
        <Text style={styles.pageSubtitle}>Sanskrit prayers with meaning</Text>
      </View>

      {/* Search */}
      <View style={styles.searchRow}>
        <Ionicons name="search" size={16} color={Colors.ink} style={[styles.searchIcon, { opacity: 0.4 }]} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name, deity, or meaning…"
          placeholderTextColor={`${Colors.ink}66`}
          value={query}
          onChangeText={setQuery}
          clearButtonMode="while-editing"
          returnKeyType="search"
        />
      </View>

      {/* Category filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterContent}
      >
        {CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.filterChip, activeCategory === cat && styles.filterChipActive]}
            onPress={() => setActiveCategory(cat)}
            activeOpacity={0.7}
          >
            <Text style={[styles.filterChipText, activeCategory === cat && styles.filterChipTextActive]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Deity filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterContent}
      >
        {DEITIES.map(d => (
          <TouchableOpacity
            key={d}
            style={[styles.filterChip, activeDeity === d && styles.filterChipActive]}
            onPress={() => setActiveDeity(d)}
            activeOpacity={0.7}
          >
            <Text style={[styles.filterChipText, activeDeity === d && styles.filterChipTextActive]}>
              {d}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results count */}
      <Text style={styles.resultsCount}>
        {filtered.length} {filtered.length === 1 ? 'shloka' : 'shlokas'}
      </Text>

      {/* List */}
      <ScrollView
        style={styles.list}
        contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + Spacing.xl }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {filtered.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No shlokas found</Text>
            <Text style={styles.emptyBody}>Try a different search or clear the filters.</Text>
          </View>
        ) : (
          filtered.map(item => (
            <ShlokaCard key={item.id} item={item} onPress={() => setSelected(item)} />
          ))
        )}
      </ScrollView>

      {selected && (
        <ShlokaDetailModal item={selected} onClose={() => setSelected(null)} />
      )}
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
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Spacing.md,
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
    backgroundColor: Colors.surfaceSoft,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.hairline,
  },
  searchIcon: {
    marginRight: Spacing.xs,
  },
  searchInput: {
    flex: 1,
    ...Type.body,
    color: Colors.ink,
    paddingVertical: Spacing.sm,
  },
  filterScroll: {
    flexGrow: 0,
  },
  filterContent: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    gap: Spacing.xs,
  },
  filterChip: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: Colors.hairline,
    backgroundColor: Colors.canvas,
  },
  filterChipActive: {
    backgroundColor: Colors.ink,
    borderColor: Colors.ink,
  },
  filterChipText: {
    ...Type.label,
    color: Colors.ink,
  },
  filterChipTextActive: {
    color: Colors.inverseInk,
  },
  resultsCount: {
    ...Type.caption,
    color: Colors.ink,
    opacity: 0.4,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.xs,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.xs,
  },
  shlokaCard: {
    backgroundColor: Colors.surfaceSoft,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.hairline,
  },
  shlokaCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.xs,
  },
  metaRow: {
    flexDirection: 'row',
    gap: Spacing.xxs,
    flexWrap: 'wrap',
    flex: 1,
  },
  chip: {
    backgroundColor: Colors.blockLilac,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.pill,
  },
  chipSecondary: {
    backgroundColor: Colors.blockMint,
  },
  chipText: {
    ...Type.caption,
    color: Colors.ink,
  },
  shlokaName: {
    ...Type.cardTitle,
    color: Colors.ink,
    marginBottom: Spacing.xxs,
  },
  shlokaWhen: {
    ...Type.bodySm,
    color: Colors.ink,
    opacity: 0.5,
    marginBottom: Spacing.xs,
  },
  shlokaPreview: {
    ...Type.body,
    color: Colors.ink,
    opacity: 0.65,
    lineHeight: 22,
  },

  // Modal
  modalRoot: {
    flex: 1,
    backgroundColor: Colors.canvas,
  },
  modalHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.hairline,
    alignSelf: 'center',
    marginTop: Spacing.sm,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.hairlineSoft,
  },
  modalDeity: {
    ...Type.eyebrow,
    color: Colors.ink,
    opacity: 0.55,
  },
  modalScroll: {
    flex: 1,
  },
  modalContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  modalName: {
    ...Type.headline,
    color: Colors.ink,
    marginBottom: Spacing.md,
  },
  whenBox: {
    backgroundColor: Colors.surfaceSoft,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.hairline,
  },
  whenLabel: {
    ...Type.eyebrow,
    color: Colors.ink,
    opacity: 0.5,
    marginBottom: Spacing.xxs,
  },
  whenText: {
    ...Type.body,
    color: Colors.ink,
  },
  modalSanskrit: {
    fontSize: 22,
    lineHeight: 38,
    color: Colors.ink,
    marginBottom: Spacing.md,
  },
  iastBar: {
    borderLeftWidth: 2,
    borderLeftColor: Colors.ink,
    paddingLeft: Spacing.sm,
    marginBottom: Spacing.lg,
    opacity: 0.55,
  },
  modalIast: {
    ...Type.body,
    color: Colors.ink,
    fontStyle: 'italic',
  },
  meaningLabel: {
    ...Type.eyebrow,
    color: Colors.ink,
    opacity: 0.5,
    marginBottom: Spacing.xs,
  },
  modalMeaning: {
    ...Type.bodyLg,
    color: Colors.ink,
  },

  // Empty state
  emptyState: {
    paddingVertical: Spacing.xxl,
    alignItems: 'center',
  },
  emptyTitle: {
    ...Type.cardTitle,
    color: Colors.ink,
    marginBottom: Spacing.xs,
  },
  emptyBody: {
    ...Type.body,
    color: Colors.ink,
    opacity: 0.5,
  },
});
