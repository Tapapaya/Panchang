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
    name: 'Shri Suktam',
    deity: 'Lakshmi',
    category: 'Prosperity',
    when: 'Fridays, Diwali, Lakshmi Puja, new home',
    sanskrit: 'ॐ हिरण्यवर्णां हरिणीं सुवर्णरजतस्रजाम्।\nचन्द्रां हिरण्मयीं लक्ष्मीं जातवेदो म आवह॥\nतां म आवह जातवेदो लक्ष्मीमनपगामिनीम्।\nयस्यां हिरण्यं विन्देयं गामश्वं पुरुषानहम्॥\nअश्वपूर्वां रथमध्यां हस्तिनादप्रबोधिनीम्।\nश्रियं देवीमुपह्वये श्रीर्मा देवी जुषताम्॥\nकां सोस्मितां हिरण्यप्राकारामार्द्रां ज्वलन्तीं तृप्तां तर्पयन्तीम्।\nपद्मे स्थितां पद्मवर्णां तामिहोपह्वये श्रियम्॥\nचन्द्रां प्रभासां यशसा ज्वलन्तीं श्रियं लोके देवजुष्टामुदाराम्।\nतां पद्मिनीमीं शरणं प्रपद्ये ऽलक्ष्मीर्मे नश्यतां त्वां वृणे॥\nआदित्यवर्णे तपसोऽधिजातो वनस्पतिस्तव वृक्षोऽथ बिल्वः।\nतस्य फलानि तपसा नुदन्तु मायान्तरायाश्च बाह्या अलक्ष्मीः॥\nउपैतु मां देवसखः कीर्तिश्च मणिना सह।\nप्रादुर्भूतोऽस्मि राष्ट्रेऽस्मिन् कीर्तिमृद्धिं ददातु मे॥\nक्षुत्पिपासामलां ज्येष्ठाम् अलक्ष्मीं नाशयाम्यहम्।\nअभूतिमसमृद्धिं च सर्वां निर्णुद मे गृहात्॥\nगन्धद्वारां दुराधर्षां नित्यपुष्टां करीषिणीम्।\nईश्वरीं सर्वभूतानां तामिहोपह्वये श्रियम्॥\nमनसः काममाकूतिं वाचः सत्यमशीमहि।\nपशूनां रूपमन्नस्य मयि श्रीः श्रयतां यशः॥\nकर्दमेन प्रजाभूता मयि सम्भव कर्दम।\nश्रियं वासय मे कुले मातरं पद्ममालिनीम्॥\nआपः सृजन्तु स्निग्धानि चिक्लीत वस मे गृहे।\nनि च देवीं मातरं श्रियं वासय मे कुले॥\nआर्द्रां पुष्करिणीं पुष्टिं पिङ्गलां पद्ममालिनीम्।\nचन्द्रां हिरण्मयीं लक्ष्मीं जातवेदो म आवह॥\nआर्द्रां यः करिणीं यष्टिं सुवर्णां हेममालिनीम्।\nसूर्यां हिरण्मयीं लक्ष्मीं जातवेदो म आवह॥\nतां म आवह जातवेदो लक्ष्मीमनपगामिनीम्।\nयस्यां हिरण्यं प्रभूतं गावो दास्योऽश्वान् विन्देयं पुरुषानहम्॥',
    iast: 'Oṃ hiraṇyavarṇāṃ hariṇīṃ suvarṇarajatasrajām\ncandrāṃ hiraṇmayīṃ lakṣmīṃ jātavedo ma āvaha\ntāṃ ma āvaha jātavedo lakṣmīmanapagāminīm\nyasyāṃ hiraṇyaṃ vindeyaṃ gāmaśvaṃ puruṣānaham\naśvapūrvāṃ rathamadhyāṃ hastinādaprabodhinīm\nśriyaṃ devīmupahvaye śrīrmā devī juṣatām\nkāṃ sosmitāṃ hiraṇyaprākārāmārdrrāṃ jvalantīṃ tṛptāṃ tarpayantīm\npadme sthitāṃ padmavarṇāṃ tāmihopahvaye śriyam\ncandrāṃ prabhāsāṃ yaśasā jvalantīṃ śriyaṃ loke devajuṣṭāmudārām\ntāṃ padminīmīṃ śaraṇaṃ prapadye\'lakṣmīrme naśyatāṃ tvāṃ vṛṇe\nādityavarṇe tapaso\'dhijāto vanaspatistava vṛkṣo\'tha bilvaḥ\ntasya phalāni tapasā nudantu māyāntarāyāśca bāhyā alakṣmīḥ\nupaiutu māṃ devasakhaḥ kīrtiśca maṇinā saha\nprādurbhūto\'smi rāṣṭre\'smin kīrtimṛddhiṃ dadātu me\nkṣutpipāsāmalāṃ jyeṣṭhām alakṣmīṃ nāśayāmyaham\nabhūtimasamṛddhiṃ ca sarvāṃ nirṇuda me gṛhāt\ngandhadvarāṃ durādharṣāṃ nityapuṣṭāṃ karīṣiṇīm\nīśvarīṃ sarvabhūtānāṃ tāmihopahvaye śriyam\nmanasaḥ kāmamākūtiṃ vācaḥ satyamaśīmahi\npaśūnāṃ rūpamannasya mayi śrīḥ śrayatāṃ yaśaḥ\nkardamena prajābhūtā mayi sambhava kardama\nśriyaṃ vāsaya me kule mātaraṃ padmamālinīm\nāpaḥ sṛjantu snigdhāni ciklīta vasa me gṛhe\nni ca devīṃ mātaraṃ śriyaṃ vāsaya me kule\nārdrāṃ puṣkariṇīṃ puṣṭiṃ piṅgalāṃ padmamālinīm\ncandrāṃ hiraṇmayīṃ lakṣmīṃ jātavedo ma āvaha\nārdrāṃ yaḥ kariṇīṃ yaṣṭiṃ suvarṇāṃ hemamālinīm\nsūryāṃ hiraṇmayīṃ lakṣmīṃ jātavedo ma āvaha\ntāṃ ma āvaha jātavedo lakṣmīmanapagāminīm\nyasyāṃ hiraṇyaṃ prabhūtaṃ gāvo dāsyo\'śvān vindeyaṃ puruṣānaham',
    meaning: 'O Jataveda (Agni), bring to me Lakshmi — golden-hued, fleet as a deer, garlanded in gold and silver, shining like the moon, radiant. Bring her to me — that Lakshmi who does not depart — through whom I may find gold, cattle, horses, and servants. I invoke the Goddess Shri — heralded by horses, whose chariot is in the middle, who is awakened by the trumpeting of elephants. May the Goddess Shri delight me. I invoke here that Shri who is smiling, golden-walled, moist, blazing, satiated, satisfying — seated on a lotus, lotus-coloured. I take refuge in Padmini, the radiant, glorious, generous Shri worshipped by gods — may all ill-fortune flee from me. O Sun-coloured one, born of austerity — the bel tree is your tree; may its fruits through their power drive away all inner and outer ill-fortune. May the friend of Indra, fame, and jewels come to me. Let wealth and glory be bestowed on me in this land. I destroy the elder sister of Shri — Jyeshtha, stained by hunger and thirst. Drive all poverty and lack from my house. I invoke here the Shri who is the door of fragrance, the irresistible, ever-full, the cow-goddess, the sovereign of all beings. May we obtain the desire of the mind, the intention, the truth of speech; may the form of cattle and food, and Shri herself, and glory abide in me. O Kardama — you who are born from Shri's offspring — come live in me; make the lotus-garlanded mother Shri dwell in my lineage. May the waters bring moisture; may Chiklita dwell in my home. Make the divine mother Shri dwell in my lineage. O Jataveda, bring me Shri — moist, lotus-limbed, nourishing, golden, lotus-garlanded. Bring me Lakshmi — radiant as the sun, golden — through whom I may find gold, cattle, servants, horses, and all people. (All 16 riks of the Shri Suktam, Rigveda supplement)',
  },
  {
    id: 'lakshmi-mahalakshmi',
    name: 'Mahalakshmi Ashtakam',
    deity: 'Lakshmi',
    category: 'Devotional',
    when: 'Fridays, Navratri, Purnima',
    sanskrit: 'नमस्तेऽस्तु महामाये श्रीपीठे सुरपूजिते।\nशंखचक्रगदाहस्ते महालक्ष्मि नमोऽस्तु ते॥\nनमस्ते गरुडारूढे कोलासुरभयंकरि।\nसर्वपापहरे देवि महालक्ष्मि नमोऽस्तु ते॥\nसर्वज्ञे सर्ववरदे सर्वदुष्टभयंकरि।\nसर्वदुःखहरे देवि महालक्ष्मि नमोऽस्तु ते॥\nसिद्धिबुद्धिप्रदे देवि भुक्तिमुक्तिप्रदायिनि।\nमन्त्रमूर्ते सदा देवि महालक्ष्मि नमोऽस्तु ते॥\nआद्यन्तरहिते देवि आद्यशक्तिमहेश्वरि।\nयोगजे योगसम्भूते महालक्ष्मि नमोऽस्तु ते॥\nस्थूलसूक्ष्ममहारौद्रे महाशक्तिमहोदरे।\nमहापापहरे देवि महालक्ष्मि नमोऽस्तु ते॥\nपद्मासनस्थिते देवि परब्रह्मस्वरूपिणि।\nपरमेशि जगन्मातर्महालक्ष्मि नमोऽस्तु ते॥\nश्वेताम्बरधरे देवि नानालंकारभूषिते।\nजगत्स्थिते जगन्मातर्महालक्ष्मि नमोऽस्तु ते॥',
    iast: 'Namaste\'stu mahāmāye śrīpīṭhe surapūjite\nśaṃkhacakragadāhaste mahālakṣmi namo\'stu te\nnamaste garuḍārūḍhe kolāsurabhayaṃkari\nsarvapāpahare devi mahālakṣmi namo\'stu te\nsarvajñe sarvaravarde sarvadusṭabhayaṃkari\nsarvaduḥkhahare devi mahālakṣmi namo\'stu te\nsiddhibuddhiprade devi bhuktimuktipradāyini\nmantramūrte sadā devi mahālakṣmi namo\'stu te\nādyantarahite devi ādyaśaktīmaheśvari\nyogaje yogasambhūte mahālakṣmi namo\'stu te\nsthūlasūkṣmamahāraudre mahāśaktimhodare\nmahāpāpahare devi mahālakṣmi namo\'stu te\npadmāsanasthite devi parabrahmāsvarūpiṇi\nparameśi jaganmātar mahālakṣmi namo\'stu te\nśvetāmbaradhare devi nānālaṃkārabhūṣite\njagatsthite jaganmātar mahālakṣmi namo\'stu te',
    meaning: 'Salutations to the great illusion, worshipped by gods at her sacred seat, bearing conch, discus, and mace — salutations, Mahalakshmi. Salutations to you who rides Garuda, the fearsome destroyer of the demon Kola, remover of all sin. Salutations to the all-knowing, granter of all boons, terrifying to all wicked — remover of all suffering. Bestower of siddhis and wisdom, giver of enjoyment and liberation, ever the embodied mantra — salutations. Without beginning or end, the primordial Shakti, great goddess — born of yoga, arising from yoga — salutations. Gross and subtle, the great terrifying one, the great power, the great womb — remover of the greatest sins — salutations. Seated on the lotus, the very form of the supreme Brahman, the ultimate sovereign, mother of the universe — salutations. Clad in white, adorned with all ornaments, ever abiding in the universe, O mother of the universe — salutations, Mahalakshmi. (8 of 8 verses)',
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
    sanskrit: 'ॐ नमो नारायणाय।\nॐ नारायणाय विद्महे वासुदेवाय धीमहि।\nतन्नो विष्णुः प्रचोदयात्॥',
    iast: 'Oṃ namo nārāyaṇāya\nOṃ nārāyaṇāya vidmahe vāsudevāya dhīmahi\ntanno viṣṇuḥ pracodayāt',
    meaning: 'Salutations to Narayana — the eight-syllable Ashtakshara, the root mantra of Vishnu. We know Narayana; we meditate on Vasudeva. May that Vishnu inspire and illuminate us. (Vishnu Gayatri)',
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
    when: 'Bhairav Ashtami; Sundays; Kashi yatra; for protection from fear; composed by Adi Shankaracharya',
    sanskrit: 'देवराजसेव्यमानपावनाङ्घ्रिपङ्कजं\nव्यालयज्ञसूत्रमिन्दुशेखरं कृपाकरम्।\nनारदादियोगिवृन्दवन्दितं दिगम्बरं\nकाशिकापुराधिनाथ कालभैरवं भजे॥\nभानुकोटिभास्वरं भवाब्धितारकं परं\nनीलकण्ठमीप्सितार्थदायकं त्रिलोचनम्।\nकालकालमम्बुजाक्षमक्षशूलमक्षरं\nकाशिकापुराधिनाथ कालभैरवं भजे॥\nशूलटङ्कपाशदण्डपाणिमादिकारणं\nश्यामकायमादिदेवमक्षरं निरामयम्।\nभीमविक्रमं प्रभुं विचित्रताण्डवप्रियं\nकाशिकापुराधिनाथ कालभैरवं भजे॥\nभुक्तिमुक्तिदायकं प्रशस्तचारुविग्रहं\nभक्तवत्सलं स्थितं समस्तलोकविग्रहम्।\nनिक्वणन्मनोज्ञहेमकिङ्किणीलसत्कटिं\nकाशिकापुराधिनाथ कालभैरवं भजे॥\nधर्मसेतुपालकं त्वधर्ममार्गनाशकं\nकर्मपाशमोचकं सुशर्मदायकं विभुम्।\nस्वर्णवर्णशेषपाशशोभिताङ्गमण्डलं\nकाशिकापुराधिनाथ कालभैरवं भजे॥\nरत्नपादुकाप्रभाभिरामपादयुग्मकं\nनित्यमद्वितीयमिष्टदैवतं निरञ्जनम्।\nमृत्युदर्पनाशनं करालदंष्ट्रमोक्षणं\nकाशिकापुराधिनाथ कालभैरवं भजे॥\nअट्टहासभिन्नपद्मजाण्डकोशसंततिं\nदृष्टिपातनष्टपापजालमुग्रशासनम्।\nअष्टसिद्धिदायकं कपालमालिकाधरं\nकाशिकापुराधिनाथ कालभैरवं भजे॥\nभूतसङ्घनायकं विशालकीर्तिदायकं\nकाशिवासिलोकपुण्यपापशोधकं विभुम्।\nनीतिमार्गकोविदं पुरातनं जगत्पतिं\nकाशिकापुराधिनाथ कालभैरवं भजे॥',
    iast: 'Devarājasevyamānapāvanāṅghripaṅkajaṃ\nvyālayajñasūtramindūśekharaṃ kṛpākaram\nnāradādiyogivṛndavanditaṃ digambaraṃ\nkāśikāpurādhinātha kālabhairavaṃ bhaje\nbhānukoṭibhāsvaraṃ bhavābdhitārakaṃ paraṃ\nnīlakaṇṭhamīpsitārthadāyakaṃ trilocanam\nkālakālamambujākṣamakṣaśūlamakṣaraṃ\nkāśikāpurādhinātha kālabhairavaṃ bhaje\nśūlaṭaṃkapāśadaṇḍapāṇimādikāraṇaṃ\nśyāmakāyamādideva makṣaraṃ nirāmayam\nbhīmavikramaṃ prabhuṃ vicitratāṇḍavapriyaṃ\nkāśikāpurādhinātha kālabhairavaṃ bhaje\nbhuktimuktidāyakaṃ praśastacāruvigrahaṃ\nbhaktavatsalaṃ sthitaṃ samastalokavigṛham\nnikvaṇanmanojñahemakiṃkiṇīlasatkaṭiṃ\nkāśikāpurādhinātha kālabhairavaṃ bhaje\ndharmasetupālakaṃ tvadharmanāśakaṃ\nkarmapāśamocakaṃ suśarmadāyakaṃ vibhum\nsvarṇavarṇaśeṣapāśaśobhitāṃgamaṇḍalaṃ\nkāśikāpurādhinātha kālabhairavaṃ bhaje\nratnapādukāprabhābhirāmapādayugmakaṃ\nnityamadvitīyamiṣṭadaivataṃ nirañjanam\nmṛtyudarpanāśanaṃ karāladaṃṣṭramokṣaṇaṃ\nkāśikāpurādhinātha kālabhairavaṃ bhaje\naṭṭahāsabhinnaspadmajāṇḍakośasaṃtatiṃ\ndṛṣṭipātanaṣṭapāpajālamugraśāsanam\naṣṭasiddhidāyakaṃ kapālamālikādharaṃ\nkāśikāpurādhinātha kālabhairavaṃ bhaje\nbhūtasaṃghanāyakaṃ viśālakīrtidāyakaṃ\nkāśivāsilōkapuṇyapāpaśōdhakaṃ vibhum\nnītimārgakovidaṃ purātanaṃ jagatpatiṃ\nkāśikāpurādhinātha kālabhairavaṃ bhaje',
    meaning: 'I worship Kaal Bhairav, lord of Kashi: whose purifying lotus feet are served by Indra; wearing a thread of serpents, with the crescent moon, merciful; worshipped by Narada and hosts of yogis; the sky-clad one. Radiant as a crore of suns, the liberator from the ocean of existence; the blue-throated bestower of all desires, three-eyed; the destroyer of Kama, lotus-eyed, bearing the trident, imperishable. Holding trident, noose and staff, the primordial cause; dark-bodied, the primordial deity, imperishable, disease-free; of terrible prowess, the lord who loves the wondrous Tandava. Bestower of worldly enjoyment and liberation, of beautiful form; compassionate to devotees, form of all the worlds; with sweet golden bells jingling at his waist. Protector of the dam of dharma, destroyer of adharmic paths; liberator from the noose of karma, bestower of happiness; whose body glows with the golden serpent. Whose two feet shine with the radiance of jeweled sandals; eternal, second to none, the cherished deity, beyond taint; destroyer of the pride of death, with terrifying fangs granting liberation. Whose laughter shatters the cosmic egg; whose mere glance destroys networks of sin; bestower of the eight siddhis, wearing a garland of skulls. Lord of the hosts of spirits, grantor of great glory; the purifier of the merit and sin of Kashi\'s inhabitants; the wise one of the righteous path, the ancient lord of the universe. (8 of 8 verses, Adi Shankaracharya)',
  },

  // ─── Hanuman Chalisa ─────────────────────────────────────
  {
    id: 'hanuman-chalisa-doha',
    name: 'Hanuman Chalisa',
    deity: 'Hanuman',
    category: 'Protection',
    when: 'Tuesdays; Saturdays; Hanuman Jayanti; before any difficult task; composed by Tulsidas',
    sanskrit: 'श्रीगुरु चरन सरोज रज, निज मनु मुकुरु सुधारि।\nबरनउँ रघुबर बिमल जसु, जो दायकु फल चारि॥\nबुद्धिहीन तनु जानिके, सुमिरौं पवन कुमार।\nबल बुधि बिद्या देहु मोहिं, हरहु कलेस बिकार॥\n\nजय हनुमान ज्ञान गुन सागर। जय कपीस तिहुँ लोक उजागर॥\nरामदूत अतुलित बल धामा। अञ्जनि पुत्र पवनसुत नामा॥\nमहाबीर बिक्रम बजरंगी। कुमति निवार सुमति के संगी॥\nकञ्चन बरन बिराज सुबेसा। कानन कुण्डल कुञ्चित केसा॥\nहाथ बज्र औ ध्वजा बिराजै। काँधे मूँज जनेऊ साजै॥\nशंकर सुवन केसरीनन्दन। तेज प्रताप महाजग बन्दन॥\nबिद्यावान गुनी अति चातुर। राम काज करिबे को आतुर॥\nप्रभु चरित्र सुनिबे को रसिया। राम लखन सीता मन बसिया॥\nसूक्ष्म रूप धरि सियहिँ दिखावा। बिकट रूप धरि लंक जरावा॥\nभीम रूप धरि असुर सँहारे। रामचन्द्र के काज सँवारे॥\nलाय सजीवन लखन जियाये। श्री रघुबीर हरषि उर लाये॥\nरघुपति कीन्हीं बहुत बड़ाई। तुम मम प्रिय भरतहिँ सम भाई॥\nसहस बदन तुम्हरो जस गावैं। अस कहि श्रीपति कण्ठ लगावैं॥\nसनकादिक ब्रह्मादि मुनीसा। नारद सारद सहित अहीसा॥\nजम कुबेर दिगपाल जहाँ ते। कबि कोबिद कहि सकैं कहाँ ते॥\nतुम उपकार सुग्रीवहिँ कीन्हा। राम मिलाय राजपद दीन्हा॥\nतुम्हरो मन्त्र बिभीषण माना। लंकेश्वर भए सब जग जाना॥\nजुग सहस्र जोजन पर भानू। लील्यो ताहि मधुर फल जानू॥\nप्रभु मुद्रिका मेलि मुख माहीं। जलधि लाँघि गये अचरज नाहीं॥\nदुर्गम काज जगत के जेते। सुगम अनुग्रह तुम्हरे तेते॥\nराम दुआरे तुम रखवारे। होत न आज्ञा बिनु पैसारे॥\nसब सुख लहैं तुम्हारी सरना। तुम रक्षक काहू को डरना॥\nआपन तेज सम्हारो आपै। तीनों लोक हाँक तें काँपै॥\nभूत पिसाच निकट नहिं आवै। महाबीर जब नाम सुनावै॥\nनासै रोग हरै सब पीरा। जपत निरन्तर हनुमत बीरा॥\nसंकट सें हनुमान छुड़ावै। मन क्रम बचन ध्यान जो लावै॥\nसब पर राम तपस्वी राजा। तिन के काज सकल तुम साजा॥\nऔर मनोरथ जो कोई लावै। तासु अमित जीवन फल पावै॥\nचारों जुग परताप तुम्हारा। है परसिद्ध जगत उजियारा॥\nसाधु सन्त के तुम रखवारे। असुर निकन्दन राम दुलारे॥\nअष्ट सिद्धि नव निधि के दाता। अस बर दीन जानकी माता॥\nराम रसायन तुम्हरे पासा। सदा रहो रघुपति के दासा॥\nतुम्हरे भजन राम को पावै। जनम जनम के दुख बिसरावै॥\nअन्त काल रघुबर पुर जाई। जहाँ जन्म हरि भक्त कहाई॥\nऔर देवता चित्त न धरई। हनुमत सेई सर्ब सुख करई॥\nसंकट कटै मिटै सब पीरा। जो सुमिरै हनुमत बलबीरा॥\nजय जय जय हनुमान गोसाईं। कृपा करहु गुरुदेव की नाईं॥\nजो सत बार पाठ कर कोई। छूटहि बन्दि महा सुख होई॥\nजो यह पढ़ै हनुमान चलीसा। होय सिद्धि साखी गौरीसा॥\nतुलसीदास सदा हरि चेरा। कीजै नाथ हृदय महँ डेरा॥\n\nपवन तनय संकट हरन मंगल मूरति रूप।\nराम लखन सीता सहित हृदय बसहु सुर भूप॥',
    iast: 'Śrīguru carana saroja raja, nija manu mukuru sudhāri\nbaranaũ raghubara bimala jasu, jo dāyaku phala cāri\nbuddhihīna tanu jānike, sumiraũ pavana kumāra\nbala budhi bidyā dehu mohi, harahu kalesa bikāra\n\njaya hanumāna jñāna guna sāgara, jaya kapīsa tihũ loka ujāgara\nrāmadūta atulita bala dhāmā, añjani putra pavanasuta nāmā\nmahābīra bikrama bajaraṃgī, kumati nivāra sumati ke saṃgī\nkañcana barana birāja subesā, kānana kuṇḍala kuñcita kesā\nhātha bajra au dhvajā birājai, kāṃdhe mūṃja janeū sājai\nśaṃkara suvana kesarīnandana, teja pratāpa mahājaga bandana\nbidyāvāna gunī ati cātura, rāma kāja karibe ko ātura\nprabhu caritra sunibe ko rasiyā, rāma lakhana sītā mana basiyā\nsūkṣma rūpa dhari siyahiṃ dikhāvā, bikaṭa rūpa dhari laṃka jarāvā\nbhīma rūpa dhari asura saṃhāre, rāmacandra ke kāja saṃvāre\nlāya sajīvana lakhana jiyāye, śrī raghubīra haraṣi ura lāye\nraghupati kīnhīṃ bahuta baṛāī, tuma mama priya bharatahiṃ sama bhāī\nsahasa badana tumharo jasa gāvaiṃ, asa kahi śrīpati kaṇṭha lagāvaiṃ\nśanakādika brahmādi munīsā, nārada sārada sahita ahīsā\njama kubera digapāla jahāṃ te, kabi kobida kahi sakaiṃ kahāṃ te\ntuma upakāra sugrīvahiṃ kīnhā, rāma milāya rājapada dīnhā\ntumharo mantra bibhīṣaṇa mānā, laṃkeśvara bhae saba jaga jānā\njuga sahasra jojana para bhānū, līlyo tāhi madhura phala jānū\nprabhu mudrikā meli mukha māhīṃ, jaladhi lāṃghi gaye acaraja nāhīṃ\ndurgama kāja jagata ke jete, sugama anugraha tumhare tete\nrāma duāre tuma rakhavāre, hota na ājñā binu paisāre\nsaba sukha lahaiṃ tumhārī saranā, tuma rakṣaka kāhū ko ḍaranā\nāpana teja samhāro āpai, tīnoṃ loka hāṃka teṃ kāṃpai\nbhūta pisāca nikaṭa nahiṃ āvai, mahābīra jaba nāma sunāvai\nnāsai roga harai saba pīrā, japata nirantara hanumat bīrā\nsaṃkaṭa seṃ hanumāna churāvai, mana krama bacana dhyāna jo lāvai\nsaba para rāma tapasvi rājā, tina ke kāja sakala tuma sājā\naura manoratha jo koī lāvai, tāsu amita jīvana phala pāvai\ncāroṃ juga paratāpa tumhārā, hai parasiddha jagata ujiyārā\nsādhu santa ke tuma rakhavāre, asura nikandana rāma dulāre\naṣṭa siddhi nava nidhi ke dātā, asa bara dīna jānakī mātā\nrāma rasāyana tumhare pāsā, sadā raho raghupati ke dāsā\ntumhare bhajana rāma ko pāvai, janama janama ke dukha bisarāvai\nanta kāla raghubara pura jāī, jahāṃ janma hari bhakta kahāī\naura devatā citta na dharaī, hanumat seī sarba sukha karaī\nsaṃkaṭa kaṭai miṭai saba pīrā, jo sumirau hanumat balabīrā\njaya jaya jaya hanumāna gosāīṃ, kṛpā karahu gurudeva kī nāīṃ\njo sata bāra pāṭha kara koī, chūṭahi bandi mahā sukha hoī\njo yaha paṛhai hanumāna calīsā, hoya siddhi sākhī gaurīsā\ntulasīdāsa sadā hari cerā, kījai nātha hṛdaya mahaṃ ḍerā\n\npavana tanaya saṃkaṭa harana maṃgala mūrati rūpa\nrāma lakhana sītā sahita hṛdaya basahu sura bhūpa',
    meaning: 'Opening Doha: Cleansing the mirror of my mind with the dust of the guru\'s lotus feet, I recount the pure glory of Rama. Knowing my body to be bereft of intellect, I call upon you, O son of the wind — grant me strength, wisdom, and knowledge; remove my suffering and impurities.\n\n40 Chaupais: Victory to Hanuman — ocean of wisdom and virtue! Victory to the Lord of the monkeys, who illuminates all three worlds! Messenger of Rama, abode of incomparable strength — named Anjani-putra and son of the wind. The great hero, mighty Bajrangabali, who removes evil thoughts and bestows good counsel. Golden-hued, beautifully attired, with earrings and curly locks. Bearing a thunderbolt and flag, with a sacred thread of munja grass. Son of Shankara, joy of Kesari — your glory is revered throughout the world. Learned, virtuous, supremely clever, eager to serve Rama\'s cause. A rasika who loves to hear Rama\'s story — Rama, Lakshmana, Sita dwell in your heart. In subtle form you appeared to Sita; in fearsome form you burned Lanka. In a huge form you slew the demons and accomplished Rama\'s work. You brought the Sanjivani herb and revived Lakshmana; Rama joyfully pressed you to his heart. Rama praised you greatly: \'You are as dear to me as my brother Bharata.\' A thousand-headed Shesha sings your glory; Vishnu himself embraces you saying so. Sages like Sanaka, Brahma, and other sages; Narada, Sharada, and the king of serpents — Yama, Kubera, and the guardians of the quarters — what poet or wise man can fully describe you? You helped Sugriva — reunited him with Rama and gave him his kingdom. Vibhishana heeded your counsel and became lord of Lanka — the whole world knows this. Thousands of yojanas away was the Sun — you swallowed it thinking it a sweet fruit. With the Lord\'s signet ring in your mouth you leaped the ocean — no wonder in this! All the difficult tasks in the world become easy through your grace. You are the gatekeeper at Rama\'s door — no one may enter without your leave. All who seek shelter with you gain happiness — you the protector; there is nothing to fear. You yourself contain your radiance — all three worlds tremble at your roar. No ghost or demon comes near — when the great hero\'s name is uttered. By continuous repetition of Hanuman\'s name all disease is cured and all pain removed. Hanuman liberates from crisis those who meditate on him in mind, deed, and word. King Rama himself is the greatest tapasvi — you fulfil all his purposes. Whoever comes with any wish attains infinite fruit in life. Your glory shines across all four ages — it is famous and lights up the world. You protect saints and sages, destroyer of demons, Rama\'s beloved. Janaki\'s mother bestowed on you the boon of giving the eight siddhis and nine nidhis. You hold the nectar of Rama — remain ever the servant of Raghupati. Through your worship one attains Rama and forgets the sorrows of birth after birth. At the final moment one goes to Rama\'s abode and is always called a devotee of Hari. One need not attend to other deities — serving Hanuman grants all happiness. All crises are cut off and all pain erased for one who remembers the mighty Hanuman. Victory, victory, victory to Hanuman — be gracious to me as a guru. Whoever recites this a hundred times is freed from all bonds and attains great happiness. Whoever reads this Hanuman Chalisa, Shiva himself is witness — they attain all accomplishments. Tulsidas is ever Hari\'s servant — O Lord, make your dwelling in my heart.\n\nClosing Doha: O son of the wind, remover of afflictions, embodiment of auspiciousness — dwell in my heart together with Rama, Lakshmana, and Sita, O king of the gods. (Complete — 2 opening dohas + 40 chaupais + 1 closing doha, by Tulsidas)',
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
    name: 'Purusha Suktam (Selected Verses)',
    deity: 'Vishnu / Universal',
    category: 'Vedic',
    when: 'Major pujas; homam; Vishnu puja; Vedic rituals',
    sanskrit: 'ॐ सहस्रशीर्षा पुरुषः सहस्राक्षः सहस्रपात्।\nस भूमिं विश्वतो वृत्वाऽत्यतिष्ठद्दशाङ्गुलम्॥\nपुरुष एवेदं सर्वं यद्भूतं यच्च भव्यम्।\nउतामृतत्वस्येशानो यदन्नेनातिरोहति॥\nएतावानस्य महिमा अतो ज्यायांश्च पूरुषः।\nपादोऽस्य विश्वा भूतानि त्रिपादस्यामृतं दिवि॥\nत्रिपादूर्ध्व उदैत् पुरुषः पादोऽस्येहाभवत् पुनः।\nततो विष्वङ्व्यक्रामत् साशनानशने अभि॥\nतस्माद् विराट् अजायत विराजो अधि पूरुषः।\nस जातो अत्यरिच्यत पश्चाद् भूमिमथो पुरः॥\nयत्पुरुषेण हविषा देवा यज्ञमतन्वत।\nवसन्तो अस्यासीदाज्यं ग्रीष्म इध्मः शरद्धविः॥\nतं यज्ञं बर्हिषि प्रौक्षन् पुरुषं जातमग्रतः।\nतेन देवा अयजन्त साध्या ऋषयश्च ये॥\nब्राह्मणोऽस्य मुखमासीद् बाहू राजन्यः कृतः।\nऊरू तदस्य यद् वैश्यः पद्भ्यां शूद्रो अजायत॥\nचन्द्रमा मनसो जातश्चक्षोः सूर्यो अजायत।\nमुखादिन्द्रश्चाग्निश्च प्राणाद् वायुरजायत॥\nनाभ्या आसीदन्तरिक्षं शीर्ष्णो द्यौः समवर्तत।\nपद्भ्यां भूमिर्दिशः श्रोत्रात् तथा लोकाँ अकल्पयन्॥',
    iast: 'Oṃ sahasraśīrṣā puruṣaḥ sahasrākṣaḥ sahasrapāt\nsa bhūmiṃ viśvato vṛtvā\'tyatiṣṭhaddaśāṅgulam\npuruṣa evedaṃ sarvaṃ yadbhūtaṃ yacca bhavyam\nutāmṛtatvasyeśāno yadannenātirohati\netāvānasya mahimā ato jyāyāṃśca pūruṣaḥ\npādo\'sya viśvā bhūtāni tripādasyāmṛtaṃ divi\ntripādhūrdhva udait puruṣaḥ pādo\'syehābhavat punaḥ\ntato viṣvaṅvyakrāmat sāśanānaśane abhi\ntasmād virāṭ ajāyata virājo adhi pūruṣaḥ\nsa jāto atyaricyata paścād bhūmimato puraḥ\nyatpuruṣeṇa haviṣā devā yajñamatanvata\nvasanto asyāsīdājyaṃ grīṣma idhmaḥ śaraddhāviḥ\ntaṃ yajñaṃ barhiṣi praukṣan puruṣaṃ jātamaghrataḥ\ntena devā ayajanta sādhyā ṛṣayaśca ye\nbrāhmaṇo\'sya mukhamāsīd bāhū rājanyaḥ kṛtaḥ\nūrū tadasya yad vaiśyaḥ padbhyāṃ śūdro ajāyata\ncandramā manaso jātaścakṣoḥ sūryo ajāyata\nmukhādindraścāgniśca prāṇād vāyurajāyata\nnābhyā āsīdantarikṣaṃ śīrṣṇo dyauḥ samavartata\npadbhyāṃ bhūmirdiśaḥ śrotrāt tathā lokāṃ akalpayan',
    meaning: 'The cosmic Person has a thousand heads, a thousand eyes, a thousand feet. He pervades the earth on all sides and extends beyond it by ten fingers. This Purusha is all that exists — past and future. He is lord of immortality, and of whatever grows by food. Such is his greatness — and the Purusha is greater still. All beings are but a quarter of him; the immortal three quarters dwell in heaven. With three quarters he rose above, and one quarter came here again — from that he spread in all directions over what eats and what does not eat. From that arose Virat (the manifested world); from Virat arose the Purusha again. He, born, extended beyond the earth on both sides before and behind. When the gods performed the yajna with Purusha as the offering — spring was the clarified butter, summer the fuel, autumn the oblation. They sprinkled the Purusha, born first, on the sacred grass. The gods, Sadhyas, and Rishis worshipped with that yajna. From his mouth came the Brahmin; from his arms the Kshatriya; from his thighs the Vaishya; from his feet the Shudra was born. The Moon was born from his mind; the Sun from his eyes; Indra and Agni from his mouth; Vayu from his breath. The atmosphere arose from his navel; the sky from his head; the earth from his feet; the directions from his ears — thus were the worlds fashioned. (Selected from 16 verses, Rigveda 10.90)',
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
    sanskrit: 'ब्रह्ममुरारिसुरार्चितलिङ्गं निर्मलभासितशोभितलिङ्गम्।\nजन्मजदुःखविनाशकलिङ्गं तत्प्रणमामि सदाशिवलिङ्गम्॥\nदेवमुनिप्रवरार्चितलिङ्गं कामदहं करुणाकरलिङ्गम्।\nरावणदर्पविनाशनलिङ्गं तत्प्रणमामि सदाशिवलिङ्गम्॥\nसर्वसुगन्धसुलेपितलिङ्गं बुद्धिविवर्धनकारणलिङ्गम्।\nसिद्धसुरासुरवन्दितलिङ्गं तत्प्रणमामि सदाशिवलिङ्गम्॥\nकनकमहामणिभूषितलिङ्गं फणिपतिवेष्टितशोभितलिङ्गम्।\nदक्षसुयज्ञविनाशकलिङ्गं तत्प्रणमामि सदाशिवलिङ्गम्॥\nकुङ्कुमचन्दनलेपितलिङ्गं पङ्कजहारसुशोभितलिङ्गम्।\nसञ्चितपापविनाशकलिङ्गं तत्प्रणमामि सदाशिवलिङ्गम्॥\nदेवगणार्चितसेवितलिङ्गं भावैर्भक्तिभिरेव च लिङ्गम्।\nदिनकरकोटिप्रभाकरलिङ्गं तत्प्रणमामि सदाशिवलिङ्गम्॥\nअष्टदलपद्मविभूषितलिङ्गं सर्वसमुद्भवकारणलिङ्गम्।\nअष्टदरिद्रविनाशितलिङ्गं तत्प्रणमामि सदाशिवलिङ्गम्॥\nसुरगुरुसुरवरपूजितलिङ्गं सुरवनपुष्पसदार्चितलिङ्गम्।\nपरात्परं परमात्मकलिङ्गं तत्प्रणमामि सदाशिवलिङ्गम्॥',
    iast: 'Brahma murāri surārcita liṅgaṃ nirmala bhāsita śobhita liṅgam\njanmaja duḥkha vināśaka liṅgaṃ tat praṇamāmi sadāśiva liṅgam\ndeva munipravara ārcita liṅgaṃ kāmadahaṃ karuṇākara liṅgam\nrāvaṇa darpa vināśana liṅgaṃ tat praṇamāmi sadāśiva liṅgam\nsarva sugandha sulepita liṅgaṃ buddhi vivardhana kāraṇa liṅgam\nsiddha surāsura vandita liṅgaṃ tat praṇamāmi sadāśiva liṅgam\nkanaka mahāmaṇi bhūṣita liṅgaṃ phaṇipati veṣṭita śobhita liṅgam\ndakṣa suyajña vināśaka liṅgaṃ tat praṇamāmi sadāśiva liṅgam\nkuṃkuma candana lepita liṅgaṃ paṅkaja hāra suśobhita liṅgam\nsañcita pāpa vināśaka liṅgaṃ tat praṇamāmi sadāśiva liṅgam\ndeva gaṇārcita sevita liṅgaṃ bhāvair bhaktibhir eva ca liṅgam\ndinakara koṭi prabhākara liṅgaṃ tat praṇamāmi sadāśiva liṅgam\naṣṭadala padma vibhūṣita liṅgaṃ sarva samudbhava kāraṇa liṅgam\naṣṭa daridra vināśita liṅgaṃ tat praṇamāmi sadāśiva liṅgam\nsuraguru suravara pūjita liṅgaṃ suravana puṣpa sadārcita liṅgam\nparātparaṃ paramātmaka liṅgaṃ tat praṇamāmi sadāśiva liṅgam',
    meaning: 'I bow to the Linga of Sadashiva — worshipped by Brahma, Vishnu, and all gods; shining with unstained radiance; destroyer of the sorrow of rebirth. Worshipped by gods and sages; that burned Kama; abode of compassion; that destroyed Ravana\'s pride. Anointed with all fragrances; cause of all wisdom; worshipped by siddhas, gods, and asuras. Adorned with gold and gems; encircled by the lord of serpents; destroyer of Daksha\'s arrogant yajna. Anointed with kumkum and sandalwood; adorned with lotus garlands; destroyer of accumulated sin. Served and worshipped by gods; approached through devotion and feeling; radiant as a crore of suns. Adorned with the eight-petalled lotus; the cause of all creation; destroyer of the eight forms of poverty. Worshipped by Brihaspati and the foremost gods; ever offered flowers from the divine gardens; the supreme beyond the supreme, the very Self — I bow always to that Shivalinga. (8 of 8 verses)',
  },

  {
    id: 'bilvashtakam',
    name: 'Bilvashtakam',
    deity: 'Shiva',
    category: 'Devotional',
    when: 'Offering bel/bilva leaves to Shiva; Shravan Mondays; Mahashivaratri',
    sanskrit: 'त्रिदलं त्रिगुणाकारं त्रिनेत्रं च त्रियायुधम्।\nत्रिजन्मपापसंहारमेकबिल्वं शिवार्पणम्॥\nत्रिशाखैर्बिल्वपत्रैश्च ह्यच्छिद्रैः कोमलैः शुभैः।\nशिवपूजां करिष्यामि ह्येकबिल्वं शिवार्पणम्॥\nअखण्डबिल्वपत्रेण पूजिते नन्दिकेश्वरे।\nशुद्ध्यन्ति सर्वपापेभ्यो ह्येकबिल्वं शिवार्पणम्॥\nशालिग्रामशिलामेव्यं बिल्वपत्रं शिवार्पणम्।\nकोटिकन्यामहादानं एकबिल्वं शिवार्पणम्॥\nदन्तिकोटिसहस्राणि वाजपेयशतानि च।\nकोटिकन्यामहादानम् एकबिल्वं शिवार्पणम्॥\nलक्ष्म्याः स्तनत उत्पन्नं महादेवस्य च प्रियम्।\nबिल्ववृक्षं प्रयच्छामि ह्येकबिल्वं शिवार्पणम्॥\nदर्शनं बिल्ववृक्षस्य स्पर्शनं पापनाशनम्।\nअघोरपापसंहारम् एकबिल्वं शिवार्पणम्॥\nमूलतो ब्रह्मरूपाय मध्यतो विष्णुरूपिणे।\nअग्रतः शिवरूपाय वृक्षराजाय ते नमः।\nएकबिल्वं शिवार्पणम्॥',
    iast: 'Tridalaṃ triguṇākāraṃ trinetram ca triyāyudham\ntrijanmapāpasaṃhāramekabilvaṃ śivārpaṇam\ntriśākhairbilvapātraiśca hyacchidraṃ komalaiḥ śubhaiḥ\nśivapūjāṃ kariṣyāmi hyekabilvaṃ śivārpaṇam\nakhaṇḍabilvapatreṇa pūjite nandikeśvare\nśuddhyanti sarvapāpebhyo hyekabilvaṃ śivārpaṇam\nśāligrāmaśilāmevyaṃ bilvapatraṃ śivārpaṇam\nkoṭikanyāmahādānaṃ ekabilvaṃ śivārpaṇam\ndantīkoṭisahasrāṇi vājapeyaśatāni ca\nkoṭikanyāmahādānam ekabilvaṃ śivārpaṇam\nlakṣmyāḥ stanata utpannaṃ mahādevasya ca priyam\nbilvavṛkṣaṃ prayacchāmi hyekabilvaṃ śivārpaṇam\ndarśanaṃ bilvavṛkṣasya sparśanaṃ pāpanāśanam\naghorapāpasaṃhāram ekabilvaṃ śivārpaṇam\nmūlato brahmarūpāya madhyato viṣṇurūpiṇe\nagrataḥ śivarūpāya vṛkṣarājāya te namaḥ\nekabilvaṃ śivārpaṇam',
    meaning: 'Three-petalled, of three-guna form, three-eyed, bearing three weapons — one bel leaf destroys sins of three births; I offer it to Shiva. With three-branched bel leaves, unblemished, tender, auspicious — I worship Shiva; may this one bel leaf be an offering to Shiva. When Nandikesvara is worshipped with a whole bel leaf, one is purified of all sins — one bel leaf offered to Shiva. Offering a bel leaf beside a shaligram stone to Shiva — this equals the great gift of a crore of maidens. A thousand elephant gifts, a hundred Vajapeya sacrifices, a crore of maiden-gifts — all equal one bel leaf offered to Shiva. Born from the breast of Lakshmi and beloved of Mahadeva — I offer this bel tree; one bel leaf for Shiva. Merely seeing a bel tree or touching it destroys the gravest sin — one bel leaf for Shiva. At its root dwells Brahma, at its middle Vishnu, at its tip Shiva — salutations to you, king of trees; one bel leaf for Shiva. (8 of 8 verses)',
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
    sanskrit: 'नमामीशमीशान निर्वाणरूपं विभुं व्यापकं ब्रह्मवेदस्वरूपम्।\nनिजं निर्गुणं निर्विकल्पं निरीहं चिदाकाशमाकाशवासं भजेऽहम्॥\nनिराकारमोंकारमूलं तुरीयं गिरा ज्ञान गोतीतमीशं गिरीशम्।\nकरालं महाकाल कालं कृपालं गुणागार संसारपारं नतोऽहम्॥\nतुषाराद्रिसंकाशगौरं गभीरं मनोभूतकोटिप्रभाश्रीशरीरम्।\nस्फुरन्मौलिकल्लोलिनीचारुगंगा लसद्भालबालेन्दु कण्ठे भुजंगा॥\nचलत्कुण्डलं भ्रूसुनेत्रं विशालं प्रसन्नाननं नीलकण्ठं दयालम्।\nमृगाधीशचर्माम्बरं मुण्डमालं प्रियं शंकरं सर्वनाथं भजामि॥\nप्रचण्डं प्रकृष्टं प्रगल्भं परेशं अखण्डं अजं भानुकोटिप्रकाशम्।\nत्रयःशूलनिर्मूलनं शूलपाणिं भजे भवानीपतिं भावगम्यम्॥\nकलातीतकल्याणकल्पान्तकारी सदा सज्जनानन्ददाता पुरारी।\nचिदानन्दसन्दोहमोहापहारी प्रसीद प्रसीद प्रभो मन्मथारी॥\nन यावद् उमानाथपादारविन्दं भजन्तीह लोके परे वा नराणाम्।\nन तावत् सुखं शान्ति सन्तापनाशं प्रसीद प्रभो सर्वभूताधिवासम्॥\nन जानामि योगं जपं नैव पूजां नतोऽहं सदा सर्वदा शम्भुतुभ्यम्।\nजराजन्मदुःखौघ तातप्यमानं प्रभो पाहि आपन्नमामीश शम्भो॥',
    iast: 'Namāmīśamīśāna nirvāṇarūpaṃ vibhuṃ vyāpakaṃ brahmavedasvarūpam\nnijaṃ nirguṇaṃ nirvikalpaṃ nirīhaṃ cidākāśamākāśavāsaṃ bhaje\'ham\nnirākāramoṃkāramūlaṃ turīyaṃ girā jñāna gotītamīśaṃ girīśam\nkarālaṃ mahākāla kālaṃ kṛpālaṃ guṇāgāra saṃsārapāraṃ nato\'ham\ntuṣārādrisaṃkāśagauraṃ gabhīraṃ manobhūtakoṭiprabhāśrīśarīram\nsphuranmaulikallolīnīcārugaṃgā lasadbhālabālendu kaṇṭhe bhujaṃgā\ncalatkuṇḍalaṃ bhrūsunetraṃ viśālaṃ prasannānanaṃ nīlakaṇṭhaṃ dayālam\nmṛgādhīśacarmāmbaraṃ muṇḍamālaṃ priyaṃ śaṃkaraṃ sarvanāthaṃ bhajāmi\npracaṇḍaṃ prakṛṣṭaṃ pragalbhaṃ pareśaṃ akhaṇḍaṃ ajaṃ bhānukoṭiprakāśam\ntrayaḥśūlanirmūlanaṃ śūlapāṇiṃ bhaje bhavānīpatiṃ bhāvagamyam\nkalātītakalyāṇakalpāntakārī sadā sajjanānandadātā purārī\ncidānandasandohamohāpahārī prasīda prasīda prabho manmathārī\nna yāvad umānāthapādāravindaṃ bhajantīha loke pare vā narāṇām\nna tāvat sukhaṃ śānti santāpanāśaṃ prasīda prabho sarvabhūtādhivāsam\nna jānāmi yogaṃ japaṃ naiva pūjāṃ nato\'haṃ sadā sarvadā śambhutubhyam\njarājanmaduḥkhaugha tātapyamānaṃ prabho pāhi āpannamāmīśa śambho',
    meaning: 'I bow to Ishana, whose nature is liberation — omnipresent, the embodiment of Brahman and the Vedas; self-luminous, attribute-less, beyond thought, dwelling in the ether of consciousness. Formless, root of Om, the fourth state, transcending speech — the terrible yet compassionate Mahakala, abode of virtues, beyond existence — I bow. White as snow-peaks, profound, his body glowing with the radiance of a crore of minds; the Ganga flowing gracefully in his matted locks, the crescent moon on his forehead, serpents at his throat. With swinging earrings, beautiful brows, large eyes, a serene face — blue-throated, compassionate; robed in tiger-skin, wearing garlands of skulls — I worship that Shankara, lord of all. Fierce, supreme, bold, the ultimate lord; undivided, unborn, brilliant as a crore of suns; who uproots the triple sorrow — the trident-bearer, lord of Bhavani, accessible through devotion. Beyond all arts, the auspicious one, the destroyer at the end of time; ever the giver of joy to the righteous, the slayer of the cities of demons; that removes all delusion — be gracious, O lord, slayer of Manmatha! As long as men do not worship the lotus feet of Uma\'s lord, they find no happiness, peace, or relief from suffering — be gracious, O lord who dwells in all beings! I know no yoga, japa, or puja — yet I bow to you always, O Shambhu. Save me who am tormented by the sorrows of old age and birth, O lord Shambhu! (8 of 8 verses, Tulsidas)',
  },

  {
    id: 'shiv-mahimna-stotra',
    name: 'Shiv Mahimna Stotra (Selected Verses)',
    deity: 'Shiva',
    category: 'Devotional',
    when: 'Shravan; Mahashivaratri; composed by Pushpadanta Gandharva',
    sanskrit: 'महिम्नः पारं ते परमविदुषो यद्यसदृशी\nस्तुतिर्ब्रह्मादीनामपि तदवसन्नास्त्वयि गिरः।\nअथाऽवाच्यः सर्वः स्वमतिपरिणामावधि गृणन्\nममाप्येष स्तोत्रे हर निरपवादः परिकरः॥\nअतीतः पन्थानं तव च महिमा वाङ्मनसयो-\nरतद्व्यावृत्त्या यं चकितमभिधत्ते श्रुतिरपि।\nस कस्य स्तोतव्यः कतिविधगुणः कस्य विषयः\nपदे त्वर्वाचीने पतति न मनः कस्य न वचः॥\nमधुस्फीता वाचः परमममृतं निर्मितवतस्\ntव ब्रह्मन् किं वागपि सुरगुरोर्विस्मयपदम्।\nमम त्वेतां वाणीं गुणकथनपुण्येन भवतः\nपुनामीत्यर्थेऽस्मिन् परम मतिर्मोहितेव॥\nतवैश्वर्यं यत्तज्जगदुदयरक्षाप्रलयकृत्\nत्रयीवस्तु व्यस्तं तिसृषु गुणभिन्नासु तनुषु।\nअभव्यानामस्मिन् वरद रमणीयामरमणीं\nविहन्तुं व्याक्रोशीं विदधत इह ते कः परिहरेत्॥\nकिमीहः किंकायः स खलु किमुपायस्त्रिभुवनं\nकिमाधारो धाता सृजति किमुपादान इति च।\nअतर्क्यैश्वर्ये त्वय्यनवसर दुःस्थो हतधियो\nवितर्कः सम्भाव्यः कतिचिदिह चान्धेषु पथिकः॥\nअयत्नाद् आप्नोति त्रिभुवनमवैर्व्यसनिनः\nसकृत् त्वा चित्स्त्वत्सङ्गसुखगहने ये हृदिकृतः।\nभजन्ते ये सन्तः क्षिति विनयवन्तः तनुभृतः\nसदाशिव नमस्तुभ्यं हर सर्वं नमोऽस्तु ते॥\nजयत्वदभ्रविभ्रमभ्रमद्भुजङ्गमश्वस-\nद्विनिर्गमत्क्रमस्फुरत्करालभालहव्यवाट्।\nधिमिद्धिमिद्धिमिध्वनन्मृदङ्गतुंगमङ्गल-\nध्वनिक्रमप्रवर्तित प्रचण्डताण्डवः शिवः॥',
    iast: 'Mahimnaḥ pāraṃ te paramaviduṣo yadyasadṛśī\nstutirbrahMādīnāmapi tadavasannāstvai giraḥ\nathā\'vācyaḥ sarvaḥ svamatiparīṇāmāvadhi gṛṇan\nmamāpyeṣa stotre hara nirapavādaḥ parikaraḥ\natītaḥ panthānaṃ tava ca mahimā vāṅmanasayo\nratadvyāvṛttyā yaṃ cakitamabhidhatte śrutirapi\nsa kasya stotavyaḥ kativida guṇaḥ kasya viṣayaḥ\npade tvarvaciāne patati na manaḥ kasya na vacaḥ\nmadhusphītā vācaḥ paramamṛtaṃ nirmitavatas\ntava brahman kiṃ vāgapi suragurorvismayapadam\nmama tvetāṃ vāṇīṃ guṇakathana puṇyena bhavataḥ\npunāmītyarthe\'smin parama matirmohateva\ntavaivaiśvaryaṃ yattaj jagadudayarakṣāpralayakṛt\ntrayīvastu vyastaṃ tiṣṛṣu guṇabhinanāsu tanuṣu\nabhavyānāmasmin varada ramaṇīyāmaramaṇīṃ\nvihantum vyākrośīṃ vidadhata iha te kaḥ pariharet\nkimīhaḥ kimkāyaḥ sa khalu kimupāyastribhuvanaṃ\nkimādhāro dhātā sṛjati kimupādana iti ca\natarkyaiśvarye tvayyanavasara duḥstho hathadhiyo\nvitarkaḥ sambhāvyaḥ katicidiha cāndhes phaṭikaḥ\nayatnādāpnoti tribhuvanamavarīvya saninah\nsakṛt tvā citstvat sangasukhagahane ye hṛdikṛtaḥ\nbhajante ye santaḥ kṣiti vinayavantaḥ tanubhṛtaḥ\nsadāśiva namastubhyaṃ hara sarvaṃ namo\'stu te',
    meaning: 'O Shiva, if even Brahma and the great knowers of your highest glory find speech inadequate to praise you — then every person who sings your praises to the limit of their own understanding is beyond reproach. Even the Vedas, struck with wonder, describe you only by the formula "not this, not this" — your glory surpasses the reach of speech and mind. Who then is really capable of praising you? Of how many qualities? For whom are you an object of knowledge? Yet whose mind and speech do not alight on your approachable form? O Lord, if even Brihaspati — author of all sweet, nectar-rich speech — is struck with wonder at your praises, then my purpose in reciting them is simply to purify my speech by the merit of speaking of your virtues. Your lordship which creates, protects, and destroys the universe — is distributed across the three forms distinguished by the three gunas; yet who can describe you without fault, O giver of boons, who are simultaneously beautiful and not-beautiful? How does the Creator create? With what desire, what body, what means, what foundation, what material? These speculations arise only in confused minds unsuited to contemplate your fathomless sovereignty. Those who even once fix you truly in their hearts and dwell in the bliss of your companionship — they effortlessly obtain all three worlds, being without enemies. Salutations to you, Sadashiva — O Hara, remove all — salutations! (Selected from 41 verses, Pushpadanta\'s Shiv Mahimna Stotra)',
  },

  {
    id: 'nirvana-shatakam',
    name: 'Nirvana Shatakam (Chidananda Roopam)',
    deity: 'Shiva',
    category: 'Vedic',
    when: 'Deep meditation; Vedanta contemplation; composed by Adi Shankaracharya',
    sanskrit: 'मनोबुद्ध्यहंकारचित्तानि नाहं न च श्रोत्रजिह्वे न च घ्राणनेत्रे।\nन च व्योमभूमिर्न तेजो न वायुश्चिदानन्दरूपः शिवोऽहं शिवोऽहम्॥\nन च प्राणसंज्ञो न वै पञ्चवायुर्न वा सप्तधातुर्न वा पञ्चकोशः।\nन वाक्पाणिपादं न चोपस्थपायुश्चिदानन्दरूपः शिवोऽहं शिवोऽहम्॥\nन मे द्वेषरागौ न मे लोभमोहौ मदो नैव मे नैव मात्सर्यभावः।\nन धर्मो न चार्थो न कामो न मोक्षश्चिदानन्दरूपः शिवोऽहं शिवोऽहम्॥\nन पुण्यं न पापं न सौख्यं न दुःखं न मन्त्रो न तीर्थं न वेदो न यज्ञः।\nअहं भोजनं नैव भोज्यं न भोक्ता चिदानन्दरूपः शिवोऽहं शिवोऽहम्॥\nन मृत्युर्न शङ्का न मे जातिभेदः पिता नैव मे नैव माता न जन्मः।\nन बन्धुर्न मित्रं गुरुर्नैव शिष्यश्चिदानन्दरूपः शिवोऽहं शिवोऽहम्॥\nअहं निर्विकल्पो निराकाररूपो विभुत्वाच्च सर्वत्र सर्वेन्द्रियाणाम्।\nन चासङ्गतं नैव मुक्तिर्न मेयश्चिदानन्दरूपः शिवोऽहं शिवोऽहम्॥',
    iast: 'Manobuddhyahaṃkāracittāni nāhaṃ na ca śrotrajihve na ca ghrāṇanetre\nna ca vyomabhūmir na tejo na vāyuścidānandarūpaḥ śivo\'haṃ śivo\'ham\nna ca prāṇasaṃjño na vai pañcavāyurna vā saptadhāturna vā pañcakośaḥ\nna vākpāṇipādaṃ na copasthapāyuścidānandarūpaḥ śivo\'haṃ śivo\'ham\nna me dveṣarāgau na me lobhamohau mado naiva me naiva mātsaryabhāvaḥ\nna dharmo na cārtho na kāmo na mokṣaścidānandarūpaḥ śivo\'haṃ śivo\'ham\nna puṇyaṃ na pāpaṃ na saukhyaṃ na duḥkhaṃ na mantro na tīrthaṃ na vedo na yajñaḥ\nahaṃ bhojanaṃ naiva bhojyaṃ na bhoktā cidānandarūpaḥ śivo\'haṃ śivo\'ham\nna mṛtyurna śaṅkā na me jātibhedaḥ pitā naiva me naiva mātā na janmaḥ\nna bandhu na mitraṃ gurur naiva śiṣyaś cidānandarūpaḥ śivo\'haṃ śivo\'ham\nahaṃ nirvikalpo nirākārarūpo vibhutvācca sarvatra sarvendriyāṇām\nna cāsaṅgataṃ naiva muktir na meyaś cidānandarūpaḥ śivo\'haṃ śivo\'ham',
    meaning: 'I am not the mind, intellect, ego, or consciousness; I am not ear, tongue, nose, or eye; not ether, earth, fire, or wind — I am pure consciousness-bliss: I am Shiva! I am not the life force, five vital airs, seven elements, or five sheaths; not speech, hands, feet, or organs of generation and excretion — I am Shiva! I have no hatred or desire, no greed or delusion, no pride or envy; neither dharma, wealth, desire, nor liberation — I am Shiva! I am not merit or sin, pleasure or pain; not mantra, pilgrimage, Veda, or sacrifice; I am neither the enjoyer, the food, nor the act of eating — I am Shiva! I have no death or doubt, no distinctions of caste; neither father, mother, nor birth; no relative, friend, guru, or disciple — I am Shiva! I am without thought-constructs, formless; all-pervading, present in all senses yet unattached; I am neither liberation nor the one to be liberated — I am pure consciousness-bliss: I am Shiva! (6 of 6 verses, Adi Shankaracharya)',
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
    sanskrit: 'अधरं मधुरं वदनं मधुरं नयनं मधुरं हसितं मधुरम्।\nहृदयं मधुरं गमनं मधुरं मधुराधिपतेरखिलं मधुरम्॥\nवचनं मधुरं चरितं मधुरं वसनं मधुरं वलितं मधुरम्।\nचलितं मधुरं भ्रमितं मधुरं मधुराधिपतेरखिलं मधुरम्॥\nवेणुर्मधुरो रेणुर्मधुरः पाणिर्मधुरः पादौ मधुरौ।\nनृत्यं मधुरं सख्यं मधुरं मधुराधिपतेरखिलं मधुरम्॥\nगीतं मधुरं पीतं मधुरं भुक्तं मधुरं सुप्तं मधुरम्।\nरूपं मधुरं तिलकं मधुरं मधुराधिपतेरखिलं मधुरम्॥\nकरणं मधुरं तरणं मधुरं हरणं मधुरं स्मरणं मधुरम्।\nवमितं मधुरं शमितं मधुरं मधुराधिपतेरखिलं मधुरम्॥\nगुञ्जा मधुरा माला मधुरा यमुना मधुरा वीची मधुरा।\nसलिलं मधुरं कमलं मधुरं मधुराधिपतेरखिलं मधुरम्॥\nगोपी मधुरा लीला मधुरा युक्तं मधुरं मुक्तं मधुरम्।\nदृष्टं मधुरं शिष्टं मधुरं मधुराधिपतेरखिलं मधुरम्॥\nगोपा मधुरा गावो मधुरा यष्टिर्मधुरा सृष्टिर्मधुरा।\nदलितं मधुरं फलितं मधुरं मधुराधिपतेरखिलं मधुरम्॥',
    iast: 'Adharaṃ madhuraṃ vadanaṃ madhuraṃ nayanaṃ madhuraṃ hasitaṃ madhuram\nhṛdayaṃ madhuraṃ gamanaṃ madhuraṃ madhurādhipaterakhilaṃ madhuram\nvacanaṃ madhuraṃ caritaṃ madhuraṃ vasanaṃ madhuraṃ valitaṃ madhuram\ncalitaṃ madhuraṃ bhramitaṃ madhuraṃ madhurādhipaterakhilaṃ madhuram\nveṇur madhuro reṇur madhuraḥ pāṇir madhuraḥ pādau madhurau\nnṛtyaṃ madhuraṃ sakhyaṃ madhuraṃ madhurādhipaterakhilaṃ madhuram\ngītaṃ madhuraṃ pītaṃ madhuraṃ bhuktaṃ madhuraṃ suptaṃ madhuram\nrūpaṃ madhuraṃ tilakaṃ madhuraṃ madhurādhipaterakhilaṃ madhuram\nkaraṇaṃ madhuraṃ taraṇaṃ madhuraṃ haraṇaṃ madhuraṃ smaraṇaṃ madhuram\nvamitaṃ madhuraṃ śamitaṃ madhuraṃ madhurādhipaterakhilaṃ madhuram\nguñjā madhurā mālā madhurā yamunā madhurā vīcī madhurā\nsalilaṃ madhuraṃ kamalaṃ madhuraṃ madhurādhipaterakhilaṃ madhuram\ngopī madhurā līlā madhurā yuktaṃ madhuraṃ muktaṃ madhuram\ndṛṣṭaṃ madhuraṃ śiṣṭaṃ madhuraṃ madhurādhipaterakhilaṃ madhuram\ngopā madhurā gāvo madhurā yaṣṭir madhurā sṛṣṭir madhurā\ndalitaṃ madhuraṃ phalitaṃ madhuraṃ madhurādhipaterakhilaṃ madhuram',
    meaning: 'Sweet his lips, face, eyes, smile; sweet his heart, sweet his gait — everything about the Lord of Sweetness is sweet. Sweet his words, deeds, garments, embrace; sweet his movements, his wandering — everything sweet. Sweet his flute, the dust of his feet, his hands, his feet; sweet his dance, sweet his friendship — everything sweet. Sweet his singing, what he drinks, what he eats, how he sleeps; sweet his form, sweet his tilak — everything sweet. Sweet his actions, his crossing of the river, his thieving of hearts, his remembrance; sweet his vomiting of nectar — everything sweet. Sweet the gunja berries, the garland, the Yamuna, her waves; sweet the water, sweet the lotus — everything sweet. Sweet the Gopis, sweet the lila, sweet union, sweet liberation; sweet what is seen, sweet the conduct — everything sweet. Sweet the cowherd boys, the cows, the staff he carries, all creation; sweet what is crushed (butter from curds), sweet what ripens (fruit) — everything about the Lord of Sweetness is sweet! (8 of 8 verses, Vallabhacharya)',
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
    sanskrit: 'सत्यं ज्ञानमनन्तं नित्यमनाकाशं परमाकाशम्।\nगोष्ठप्रांगणरिङ्खणलोलमनायासं परमायासम्।\nमायाकल्पितनानाकारमनाकारं भुवनाकारम्।\nक्षमयामि सखे गोविन्दं परमानन्दम्॥\nमृत्स्नामत्सीह मातर्यशोदे तन्मुखालोकितब्रह्माण्डम्।\nव्यक्तावेधि न जानासि मायाविनं मदनाशनम्।\nकंसप्रेषितचाणूरमल्लसुमल्लमर्दनम्।\nक्षमयामि सखे गोविन्दं परमानन्दम्॥\nकालियविषधरगञ्जनजनितसुरवरमण्डलपूजितपादम्।\nबृन्दावनवनचारणकेलिलसन्मुरलीमधुरस्वरनादम्।\nगोवर्धनधरणोद्धृतगोकुलरक्षणकेलिसमर्थम्।\nक्षमयामि सखे गोविन्दं परमानन्दम्॥\nगोपाललवणभोजनतोषितगोपिकारास विलासम्।\nगोपीपरिवृतमानसचेतनमाधुर्यसुधा निलयासम्।\nकेशवादिनामसहस्रसंस्तवसंस्तुतमूर्तिसहायम्।\nक्षमयामि सखे गोविन्दं परमानन्दम्॥\nस्नानं कारितगोपिकावस्त्रमपहृत्य नग्नस्वरूपाम्।\nवस्त्रप्रदानसमये वरदायिनमभयं सुरूपाम्।\nसुश्रोणीजघनस्थलनिवसितपीताम्बरसुन्दरम्।\nक्षमयामि सखे गोविन्दं परमानन्दम्॥\nहृत्वातुलितमहालक्ष्मीरतिजनकसौन्दर्यहरतपनाभम्।\nयदुकुलनिलयमखिलजगदभिलषितचरित्रमनादिम्।\nसम्मोहितसकलकुलविलासिनिमणिकान्तिसुरूपम्।\nक्षमयामि सखे गोविन्दं परमानन्दम्॥\nसुन्दरवदनकमलनयनासितकुन्तलकान्तिसुखप्रदम्।\nतप्तकाञ्चनसमवर्णनिर्मलशरीरमनुपमम्।\nमधुकैटभाद्यसुरवरसंहारपटुशक्तिसुकाम्यम्।\nक्षमयामि सखे गोविन्दं परमानन्दम्॥\nगोकुलनायकनन्दकुमारकनन्दितगोपसुरुचिरम्।\nवयसि ललितकिशोरसुचन्द्रविलसितमुखाम्बुजमनिशम्।\nकरुणामृतनिधिमतिसुन्दरमनघं परमानन्दम्।\nक्षमयामि सखे गोविन्दं परमानन्दम्॥',
    iast: 'Satyaṃ jñānam anantaṃ nityam anākāśaṃ paramākāśam\ngoṣṭhaprāṃgaṇariṅkhaṇalolam anāyāsaṃ paramāyāsam\nmāyākalpitanānākāram anākāraṃ bhuvanākāram\nkṣamayāmi sakhe govindaṃ paramānandam\nmṛtsnāmatsīha mātar yaśode tanmukhāloktabrahmāṇḍam\nvyaktāvedhi na jānāsi māyāvinaṃ madanāśanam\nkaṃsapreṣitacāṇūramallasumallmardanam\nkṣamayāmi sakhe govindaṃ paramānandam\nkāliyaviṣadhaaragañjanajani tasuravaramaṇḍalapūjitapādam\nbṛndāvanavana cāraṇakelilas anmurālīmadhurasvaranādam\ngovardhanādharaṇodhṛtagokulārakṣaṇakelisamartham\nkṣamayāmi sakhe govindaṃ paramānandam\ngopālalaavaṇabhojanatoṣitagopikārāsavilāsam\ngopīparivṛtamānasacetanamādhurya sudhanilayāsam\nkeśavādinānasahasrasaṃstavasaṃstutamūrtisahāyam\nkṣamayāmi sakhe govindaṃ paramānandam\nsnānaṃ kāritagopikāvastramapahṛtya nagnasvārupām\nvastrapadānayasamaye varadāyinam abhayaṃ surūpam\nsuśroṇī jag hansthalanivāsitapītāmbarasundaram\nkṣamayāmi sakhe govindaṃ paramānandam\nhṛtvātulasvamahālakṣmīratijanakasaundaryahartanābham\nyadukulanilayamakhilajagadabhilaṣitacaritram anādim\nsammohitasakalakulavilāsinīmaṇikāntisurūpam\nkṣamayāmi sakhe govindaṃ paramānandam\nsundaravadanakamala nayanāsitakuntala kāntisukha pradam\ntaptakāñcanasamavarṇanirmalaśarīram anupamam\nmadhukaiṭabhādyasuravarrasaṃhārapaṭuśaktisuḥkāmyam\nkṣamayāmi sakhe govindaṃ paramānandam\ngokulānāyakanandakumārakanandita gopasurūciram\nvayasi lalitakiśorasucandravilasitamukhāmbujam aniśam\nkaruṇāmṛtanidhim ati sundaram anaghaṃ paramānandam\nkṣamayāmi sakhe govindaṃ paramānandam',
    meaning: 'Truth, knowledge, infinite, eternal — beyond space yet the highest space; playfully crawling in the cowherd courtyard, effortless yet the highest effort; of many forms created by maya yet formless, the form of all worlds — I worship Govinda, my friend, the supreme bliss. "You ate mud, O mother Yashoda" — and she saw in that mouth the entire universe; she did not know the magician, the slayer of Madana; the wrestler who crushed Chanura and Mustika, sent by Kamsa — Govinda the supreme bliss. Whose feet are worshipped by the gods grateful for the subjugation of Kaliya the serpent; who sports in Vrindavana\'s forests playing the sweet-sounding flute; who lifted Govardhana to protect Gokula — Govinda. Delighting in Raas Leela enjoyed with the Gopis who relished his cowherd-butter meal; whose lotus mind is encircled by Gopis, the very abode of the sweetness of consciousness; aided by those who worship through the thousand names beginning with Keshava — Govinda. Who bathed the Gopis by taking their clothes and revealing his naked form; and at the moment of returning the garments, bestowed blessing and fearlessness with his beautiful form; wearing the yellow garment on his beautiful hips — Govinda. His navel glowing with the beauty that surpasses even the great Lakshmi\'s joy; dwelling in the Yadu clan, with deeds desired by all worlds, beginningless; whose beauty enchants all the women of all lineages — Govinda. Of beautiful lotus face and dark curly locks, provider of happiness; with a body pure as molten gold, incomparable; whose power expertly slays demons like Madhu and Kaitabha — Govinda. Chief of Gokula, Nanda\'s son, who delights the cowherd folk; whose moon-like youthful face forever shines as a lotus; the ocean of compassion, supremely beautiful, sinless, the supreme bliss — I constantly worship Govinda, my friend! (8 of 8 verses, Adi Shankaracharya)',
  },

  {
    id: 'vishnu-aarti',
    name: 'Om Jai Jagdish Hare (Vishnu Aarti)',
    deity: 'Vishnu',
    category: 'Aarti',
    when: 'Evening Aarti; Puja completion; Ekadashi; Satyanarayan Puja',
    sanskrit: 'ॐ जय जगदीश हरे, स्वामी जय जगदीश हरे।\nभक्त जनों के संकट, दास जनों के संकट,\nक्षण में दूर करे॥\nजो ध्यावे फल पावे, दुःख बिनसे मन का।\nसुख सम्पत्ति घर आवे, कष्ट मिटे तन का॥\nमात पिता तुम मेरे, शरण गहूँ मैं किसकी।\nतुम बिन और न दूजा, आस करूँ मैं जिसकी॥\nतुम पूरण परमात्मा, तुम अन्तर्यामी।\nपारब्रह्म परमेश्वर, तुम सबके स्वामी॥\nतुम करुणा के सागर, तुम पालनकर्ता।\nमैं सेवक तुम स्वामी, कृपा करो भर्ता॥\nतुम हो एक अगोचर, सबके प्राणपति।\nकिस विधि मिलूँ दयामय, तुमको मैं कुमति॥\nदीनबन्धु दुखहर्ता, ठाकुर तुम मेरे।\nअपने हाथ उठाओ, द्वार पड़ा तेरे॥\nविषय विकार मिटाओ, पाप हरो देवा।\nश्रद्धा भक्ति बढ़ाओ, सन्तन की सेवा॥',
    iast: 'Oṃ jaya jagadīśa hare, svāmī jaya jagadīśa hare\nbhakta janoṃ ke saṃkaṭa, dāsa janoṃ ke saṃkaṭa\nkṣaṇa meṃ dūra kare\njo dhyāve phala pāve, duḥkha binase mana kā\nsukha sampatti ghara āve, kaṣṭa miṭe tana kā\nmāta pitā tuma mere, śaraṇa gahūṃ maiṃ kisakī\ntuma bina aura na dūjā, āsa karūṃ maiṃ jisakī\ntuma pūraṇa paramātmā, tuma antaryāmī\npārabrahma parameśvara, tuma sabake svāmī\ntuma karuṇā ke sāgara, tuma pālanakartā\nmaiṃ sevaka tuma svāmī, kṛpā karo bhartā\ntuma ho eka agocara, sabake prāṇapati\nkisa vidhi milūṃ dayāmaya, tumako maiṃ kumati\ndīnabandhu dukhaḥhartā, ṭhākura tuma mere\napane hātha uṭhāo, dvāra paṛā tere\nviṣaya vikāra miṭāo, pāpa haro devā\nśraddhā bhakti baṛhāo, santana kī sevā',
    meaning: 'Victory to the Lord of the Universe — you remove the afflictions of devotees and servants in an instant. Whoever meditates on you receives fruit; sorrow of the mind vanishes; happiness and wealth come home, bodily suffering is erased. You are my mother and father — in whose shelter can I go? Besides you there is no other on whom I place my hope. You are the complete Supreme Soul, the inner-knower; the beyond-Brahman, the supreme Lord, master of all. You are the ocean of compassion, you are the sustainer; I am the servant, you the master — be gracious, O protector. You are the one unseen, the life-force of all; how, O compassionate one, shall I of poor mind attain you? O friend of the poor and remover of suffering, O my master — raise your hand; I stand at your door. Remove worldly attachments and vices; take away sin, O God. Deepen my faith and devotion; and grant me the service of the saints. (7 verses, complete Vishnu Aarti)',
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
    sanskrit: 'अयि गिरिनन्दिनि नन्दितमेदिनि विश्वविनोदिनि नन्दनुते।\nगिरिवरविन्ध्यशिरोऽधिनिवासिनि विष्णुविलासिनि जिष्णुनुते।\nभगवति हे शितिकण्ठकुटुम्बिनि भूरिकुटुम्बिनि भूरिकृते।\nजय जय हे महिषासुरमर्दिनि रम्यकपर्दिनि शैलसुते॥\nअयि जगदम्ब मदम्ब कदम्बवनप्रियवासिनि हासरते।\nशिखरिशिरोमणि तुङ्गहिमालयशृङ्गनिजालयमध्यगते।\nमधुमधुरे मधुकैटभगञ्जिनि कैटभभञ्जिनि रासरते।\nजय जय हे महिषासुरमर्दिनि रम्यकपर्दिनि शैलसुते॥\nअयि शतखण्डविखण्डितरुण्ड वितुण्डितशुण्डगजाधिपते।\nरिपुगजगण्डविदारणचण्डपराक्रमशुण्डमृगाधिपते।\nनिजभुजदण्डनिपातितखण्डविपातितमुण्डभटाधिपते।\nजय जय हे महिषासुरमर्दिनि रम्यकपर्दिनि शैलसुते॥\nअयि रणदुर्मदशत्रुवधोदितदुर्धरनिर्जरशक्तिभृते।\nचतुरविचारधुरीणमहाशिवदूतकृतप्रमथाधिपते।\nदुरितदुरीहदुराशयदुर्मतिदानवदूतकृतान्तमते।\nजय जय हे महिषासुरमर्दिनि रम्यकपर्दिनि शैलसुते॥\nअयि शरणागतवैरिवधूवरवीरवराभयदायकरे।\nत्रिभुवनमस्तकशूलविरोधिशिरोऽधिकृतामलशूलकरे।\nदुमिदुमितामरधुन्दुभिनादमहोमुखरीकृततिग्मकरे।\nजय जय हे महिषासुरमर्दिनि रम्यकपर्दिनि शैलसुते॥\nसुरललनातति पालितपालिकदेशिकमौलिमणिस्फुरते।\nविजितवनेऽपि हिताय सुरान्वितभूपतिपालितदेशभृते।\nजयजयमाये जयजय जय महिषासुरमर्दिनि ते।\nजय जय हे महिषासुरमर्दिनि रम्यकपर्दिनि शैलसुते॥',
    iast: 'Ayi girinandini nanditamedini viśvavinodini nandanute\ngirivara vindhyaśiro\'dhinivāsini viṣṇuvilāsini jiṣṇunute\nbhagavati he śitakaṇṭhakuṭumbini bhūrikuṭumbini bhūrikṛte\njaya jaya he mahiṣāsuramardini ramyakapardini śailasute\nayi jagadamba madamba kadambavanapriyanivāsini hāsarate\nśikhariśiromaṇi tuṃgahimālayaśṛṃganijālayamadhyagate\nmadumadhure madhukaiṭabhagañjini kaiṭabhabhañjini rāsarate\njaya jaya he mahiṣāsuramardini ramyakapardini śailasute\nayi śatakhaṇḍavikhhaṇḍitaruṇḍa vituṇḍitaśuṇḍagajādhipate\nripugajagaṇḍavidāraṇacaṇḍaparākramaśuṇḍamṛgādhipate\nnijabhujadaṇḍanipātitakhaṇḍavipātitamuṇḍabhaṭādhipate\njaya jaya he mahiṣāsuramardini ramyakapardini śailasute\nayi raṇadurmadaśatruvadhōditadhurdharanirjaraśaktibhṛte\ncaturavicaradhurīṇamahāśivadūtakṛtapramathādhipate\nduritadurīhadrāśayadurmatidānavadūtakṛtāntamate\njaya jaya he mahiṣāsuramardini ramyakapardini śailasute\nayi śaraṇāgatavairivahūvara vīravorabhayakadāyakare\ntribhuvanamastakāśūlavirōdhiśiro\'dhikṛtāmalaśūlakare\ndumidumitāmaradhundubhinādamahomukharīkṛtatigmakare\njaya jaya he mahiṣāsuramardini ramyakapardini śailasute\nsuralalanatati pālitapālikadeśikamauli maṇisphūrate\nvijitavane\'pi hitāya surānvitabhūpatipālitadeśabhṛte\njayajayamāye jayajaya jaya mahiṣāsuramardini te\njaya jaya he mahiṣāsuramardini ramyakapardini śailasute',
    meaning: 'O daughter of the mountain, delighting the earth, the joy of the universe, praised by Nanda! Dwelling on Vindhya\'s peak, delighting Vishnu, praised by Indra! Wife of Shiva the blue-throated, O bountiful one — Victory, victory, O Mahishasura Mardini, beautiful-locked daughter of the mountain! O mother of the world, who loves the kadamba forest, abiding with laughter; on the crest of the great Himalayas in your high abode — sweet as honey, destroyer of Madhu and Kaitabha — victory! Whose army of trumpeting elephants was shattered into a hundred fragments; whose lion-strength tore through the demon elephant\'s cheeks; whose arm-staff slew the demon chiefs — victory! Bearing the divine power that rose from the slaughter of battle-maddened enemies; sovereign of the attendants of Mahashiva who directed the battle wisely; the very death of the emissaries of wicked, sinful, evil-minded demons — victory! Your hands grant refuge and fearlessness to the wives of fallen enemy heroes; you hold a pure trident that pierces even the heads of those who oppose the cosmic order; while divine drums resound dumidumi — victory! Whose gem-diadem is worn reverently by the celestial women; who protects the land even when the forest is conquered, accompanied by divine kings — victory, O great Illusion, O Mahishasura Mardini! (6 of 21 verses, Adi Shankaracharya)',
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
    sanskrit: 'जय अम्बे गौरी, मैया जय श्यामा गौरी।\nतुमको निशदिन ध्यावत, हरि ब्रह्मा शिवरी॥\nमाँग सिन्दूर विराजत, टीको मृगमद को।\nउज्ज्वल से दोउ नैना, चन्द्रवदन नीको॥\nकनक समान कलेवर, रक्ताम्बर राजै।\nरक्त पुष्प गल माला, कण्ठन पर साजै॥\nकेहरि वाहन राजत, खड्ग खप्परधारी।\nसुर-नर-मुनि जन सेवत, तिनके दुखहारी॥\nकानन कुण्डल शोभित, नासाग्रे मोती।\nकोटिक चन्द्र दिवाकर, राजत समज्योती॥\nशम्भु निशुम्भ बिदारे, महिषासुर घाती।\nधूम्र विलोचन नैना, निशदिन मदमाती॥\nचण्ड-मुण्ड संहारे, शोणितबीज हरे।\nमधु-कैटभ दोउ मारे, सुर भयहीन करे॥\nब्रह्माणी रुद्राणी, तुम कमला रानी।\nआगम निगम बखानी, तुम शिव पटरानी॥\nचौसठ योगिनि गावत, नृत्य करत भैरूँ।\nबाजत ताल मृदंगा, अरु बाजत डमरू॥\nतुम ही जग की माता, तुम ही हो भर्ता।\nभक्तन की दुख हर्ता, सुख सम्पत्ति कर्ता॥\nभुजा चार अति शोभित, वर-मुद्रा धारी।\nमनवाञ्छित फल पावत, सेवत नर-नारी॥\nकञ्चन थाल विराजत, अगर कपूर बाती।\nश्री मालकेतु तमाल, माँ की आरती॥',
    iast: 'Jaya ambe gaurī, maiyā jaya śyāmā gaurī\ntumako niśadina dhyāvata, hari brahmā śivarī\nmāṃga sindūra virājata, ṭīko mṛgamada ko\nujjvala se dou nainā, candravadana nīko\nkanaka samāna kalevara, raktāmbara rājai\nrakta puṣpa gala mālā, kaṇṭhana para sājai\nkehali vāhana rājata, khaḍaga khapparadhārī\nsura-nara-muni jana sevata, tinake dukha hārī\nkānana kuṇḍala śobhita, nāsāgre motī\nkoṭika candra divākara, rājata samajyotī\nśambhu niśumbha bidāre, mahiṣāsura ghātī\ndhūmra vilocana nainā, niśadina madamātī\ncaṇḍa-muṇḍa saṃhāre, śoṇitabīja hare\nmadhu-kaiṭabha dou māre, sura bhayahīna kare\nbrahmāṇī rudrāṇī, tuma kamalā rānī\nāgama nigama bakhānī, tuma śiva paṭarānī\ncauṣaṭha yogini gāvata, nṛtya karata bhairuṃ\nbājata tāla mṛdaṃgā, aru bājata ḍamarū\ntuma hī jaga kī mātā, tuma hī ho bhartā\nbhaktana kī dukha hartā, sukha sampatti kartā\nbhujā cāra ati śobhita, vara-mudrā dhārī\nmanavāñchita phala pāvata, sevata nara-nārī\nkañcana thāla virājata, agara kapūra bātī\nśrī mālaketū tamāla, māṃ kī āratī',
    meaning: 'Victory to Ambe Gauri — O mother, victory to Shyama Gauri! Hari, Brahma, and Shiva meditate on you night and day. Vermilion adorns your parting; a musk-mark on your brow; your two radiant eyes, your moon-like face so beautiful. Your body golden as gold, robed in red; a garland of red flowers adorns your throat. Riding a lion, bearing a sword and skull-cup; gods, humans, and sages serve you — the remover of their suffering. Earrings shine in your ears, a pearl at your nose-tip; the radiance of a crore of moons and suns shines from you. You destroyed Shumbha and Nishumbha, slayer of Mahishasura; with smoke-coloured eyes, ever intoxicated with power. You destroyed Chanda and Munda, vanquished Raktabija; slaying both Madhu and Kaitabha, you made the gods fearless. You are Brahmaani, Rudraani, you are Kamala the queen; praised in all Agamas and Nigamas, you are Shiva\'s royal consort. The sixty-four Yoginis sing, Bhairav dances; the tabla and mridanga play, and the damru sounds. You are the mother of the world, you are also its sustainer; remover of devotees\' suffering, creator of happiness and prosperity. Four arms beautifully adorned, bearing the boon-giving mudra; those who serve you — men and women — attain their heart\'s desire. A golden plate shines bright with incense-sticks and camphor lamps — this is mother\'s aarti! (Complete Durga Aarti, 12 verses)',
  },

  {
    id: 'kali-ashtakam',
    name: 'Kali Ashtakam',
    deity: 'Kali',
    category: 'Protection',
    when: 'Kali Puja; Amavasya; Diwali night; Tuesdays for removal of fear and enemies',
    sanskrit: 'कर्पूरस्तवकासिता त्रिजगतामाधारभूता शिवा\nसर्वस्यार्तिहरी सदापरिमला सौम्या सुरेशी शुभा।\nक्षिप्रप्रीतिकरी महेशमहिषी माया च संसारिणी\nनित्यानन्दमयी निरामयपदा काली कलिध्वंसिनी॥\nकरालवदनां घोरां मुक्तकेशीं चतुर्भुजाम्।\nकालिकां दक्षिणां दिव्यां मुण्डमालाविभूषिताम्॥\nसदानन्दकरीं शान्तां सर्वशत्रुविनाशिनीम्।\nसर्वसिद्धिप्रदात्रीं च सर्वरोगनिवारिणीम्॥\nमहाभयहरीं देवीं महाकायां महाबलाम्।\nसर्वसंपत्करीं देवीं सर्वमंगलमंगलाम्॥\nसर्वज्ञां सर्वशक्तिं च सर्वसिद्धिप्रदायिनीम्।\nसर्वदुःखहरीं देवीं प्रणमामि महेश्वरीम्॥\nत्वं माता सर्वलोकानां त्वं पिता मुक्तिदायिनी।\nत्वं भर्ता पालिनी देवि प्रणतोऽस्मि सदा तव॥\nभयेभ्यस्त्राहि नो देवि दुर्गे देवि नमोऽस्तुते।\nसर्वापत्तिं हरस्व त्वं काली कालि नमोऽस्तुते॥\nस्तुवन्ति ये महाकालीं त्रिसन्ध्यं भक्तिपूर्वकम्।\nते चान्ते नरकं त्यक्त्वा प्राप्नुवन्ति परं पदम्॥',
    iast: 'Karpūrastavakāsitā trijagatāmādhārabhūtā śivā\nsarvasyārtiharī sadāparimalā saumyā sureśī śubhā\nkṣiprapītikārī maheśamahiṣī māyā ca saṃsāriṇī\nnityānandamayī nirāmayapadā kālī kalidhvaṃsinī\nkarālavadanāṃ ghorāṃ muktakeśīṃ caturbhujām\nkālikāṃ dakṣiṇāṃ divyāṃ muṇḍamālavibhūṣitām\nsadānandakarīṃ śāntāṃ sarvaśatruvināśinīm\nsarvasiddhipradātrīṃ ca sarvaroganivāriṇīm\nmahābhayaharīṃ devīṃ mahākāyāṃ mahābalām\nsarvasaṃpatkarīṃ devīṃ sarvamaṃgalamaṃgalām\nsarvajñāṃ sarvaśaktiṃ ca sarvasiddhipradāyinīm\nsarvaduḥkhaharīṃ devīṃ praṇamāmi maheśvarīm\ntvaṃ mātā sarvalokānāṃ tvaṃ pitā muktidāyinī\ntvaṃ bhartā pālinī devi praṇato\'smi sadā tava\nbhayebhyastrāhi no devi durge devi namo\'stute\nsarvāpattiṃ harasva tvaṃ kālī kāli namo\'stute\nstuvanri ye mahākālīṃ trisandhyaṃ bhaktipūrvakam\nte cānte narakaṃ tyaktvā prāpnuvanti paraṃ padam',
    meaning: 'Bright as camphor clusters, foundation of the three worlds, auspicious; remover of all suffering, ever fragrant, gentle, queen of gods, auspicious; quick to bestow grace, consort of Maheshvara, the cosmic maya; ever bliss-filled, in the diseaseless state — Kali, destroyer of the Kali age. Of terrible face, fearsome, with loose hair, four-armed; the divine Dakshina Kali adorned with a garland of skulls. Ever bestowing joy, peaceful, destroyer of all enemies; giver of all powers, remover of all disease. Remover of great fear, great-bodied, of immense power; bestower of all wealth, the auspicious of all auspicious things. All-knowing, all-powerful, bestower of all siddhis; remover of all suffering — I bow to the great goddess. You are mother of all worlds, you are father and giver of liberation; you are husband and protector, O Devi — I always bow to you. Protect us from all fears, O Durga — salutations to you! Remove all calamities — O Kali, Kali, salutations! Those who praise Mahakali at the three sandhyas with devotion — at the end they abandon hell and attain the highest state. (8 of 8 verses)',
  },

  {
    id: 'argala-stotram',
    name: 'Argala Stotram (Durga Saptashati)',
    deity: 'Durga / Devi',
    category: 'Protection',
    when: 'Before Durga Saptashati parayana; Navratri; Durgashtami',
    sanskrit: 'ॐ नमश्चण्डिकायै।\nमार्कण्डेय उवाच॥\nजय त्वं देवि चामुण्डे जय भूतापहारिणि।\nजय सर्वगते देवि कालरात्रि नमोऽस्तु ते॥\nमधुकैटभविध्वंसि विधातृवरदे नमः।\nरूपं देहि जयं देहि यशो देहि द्विषो जहि॥\nचण्डमुण्डवधे देवि महिषासुरमर्दिनि।\nरूपं देहि जयं देहि यशो देहि द्विषो जहि॥\nरक्तबीजवधे देवि चण्डिके मधुमर्दिनि।\nरूपं देहि जयं देहि यशो देहि द्विषो जहि॥\nशुम्भस्यैव निशुम्भस्य धूम्राक्षस्य च मर्दिनि।\nरूपं देहि जयं देहि यशो देहि द्विषो जहि॥\nवन्दिता सुरगण्डेन वरेण्येन च विष्णुना।\nरूपं देहि जयं देहि यशो देहि द्विषो जहि॥\nत्रिभुवनमेतदखिलं रिपुनाशनेन किम्।\nशरणागतदीनार्तपरित्राणपरायणे॥\nसर्वस्वरूपे सर्वेशे सर्वशक्तिसमन्विते।\nभयेभ्यस्त्राहि नो देवि दुर्गे देवि नमोऽस्तु ते॥\nरोगानशेषानपहंसि तुष्टा रुष्टा तु कामान् सकलानभीष्टान्।\nत्वामाश्रितानां न विपन्नराणां त्वामाश्रिता ह्याश्रयतां प्रयान्ति॥',
    iast: 'Oṃ namaścaṇḍikāyai\nmārkaṇḍeya uvāca\njaya tvaṃ devi cāmuṇḍe jaya bhūtāpahāriṇī\njaya sarvagata devi kālarātri namo\'stu te\nmadhukaiṭabhavīdhvaṃsi vidhātṛvarade namaḥ\nrūpaṃ dehi jayaṃ dehi yaśo dehi dviṣo jahi\ncaṇḍamuṇḍavadhe devi mahiṣāsuramardinī\nrūpaṃ dehi jayaṃ dehi yaśo dehi dviṣo jahi\nraktabījavadhe devi caṇḍike madhumardinī\nrūpaṃ dehi jayaṃ dehi yaśo dehi dviṣo jahi\nśumbhasyaiva niśumbhasya dhūmrākṣasya ca mardinī\nrūpaṃ dehi jayaṃ dehi yaśo dehi dviṣo jahi\nvandita surataṇḍena vareṇyena ca viṣṇunā\nrūpaṃ dehi jayaṃ dehi yaśo dehi dviṣo jahi\ntribhuvanametadakhilaṃ ripunāśanena kim\nśaraṇāgatadīnārtaparitrāṇaparāyaṇe\nsarvasvarūpe sarveśe sarvaśaktisamanvite\nbhayebhyastrāhi no devi durge devi namo\'stu te\nrogānaśeṣānapahaṃsi tuṣṭā ruṣṭā tu kāmān sakalānabhīṣṭān\ntvāmāśritānāṃ na vipannarāṇāṃ tvāmāśritā hyāśrayatāṃ prayānti',
    meaning: 'Om, salutations to Chandika. Markandeya said: Victory to you, O Chamunda! Victory, remover of all afflictions! Victory, O goddess who pervades all! Salutations, O Night of Time. Salutations to you who destroyed Madhu and Kaitabha, bestower of boons to the creator — grant me beauty, grant me victory, grant me fame; destroy my enemies. O slayer of Chanda and Munda, crusher of Mahishasura — grant me beauty, victory, fame; destroy my enemies. O Chandika who slew Raktabija and destroyed Madhu — grant me beauty, victory, fame; destroy my enemies. O slayer of Shumbha, Nishumbha, and Dhumraksha — grant me beauty, victory, fame; destroy my enemies. Worshipped by the hosts of gods, and by the noble Vishnu — grant me beauty, victory, fame; destroy my enemies. You who are devoted to protecting the refuge-seeking, the destitute and the afflicted — what can enemies do against all the three worlds? O you who are all forms, the ruler of all, endowed with all powers — save us from all fears, O Durga, salutations! When pleased you remove all diseases; when displeased you destroy all desires. Those who take refuge in you never face ruin — indeed, those who take your shelter become a shelter for others. (Core verses of the Argala Stotram, Durga Saptashati)',
  },

  {
    id: 'saundarya-lahari',
    name: 'Saundarya Lahari (Selected Verses)',
    deity: 'Devi (Shakti)',
    category: 'Devotional',
    when: 'Devi puja; tantric worship; Navratri; composed by Adi Shankaracharya',
    sanskrit: 'शिवः शक्त्या युक्तो यदि भवति शक्तः प्रभवितुं\nन चेदेवं देवो न खलु कुशलः स्पन्दितुमपि।\nअतस्त्वामाराध्यां हरिहरविरिञ्च्यादिभिरपि\nप्रणन्तुं स्तोतुं वा कथमकृतपुण्यः प्रभवति॥\nतनीयांसं पांसुं तव चरणपंकेरुहभवं\nविरिञ्चिः सञ्चिन्वन् विरचयति लोकानविकलम्।\nवहत्येनं शौरिः कथमपि सहस्रेण शिरसां\nहरः संक्षुद्यैनं भजति भसितोद्धूलनविधिम्॥\nअवितुं नो देव्याः प्रणयिभयभावा विरचितो\nहसन्तीव क्षुब्धा निजरसपरिस्यन्दनकलाः।\nगलद्गण्डाभोगात् करिकलभकुम्भस्य विकचैः\nसमासक्तो मुक्तो गणितशतकोटीर्मणिनिभैः॥\nसुधामप्यास्वाद्य प्रतिभयजरामृत्युहरिणीं\nविपद्यन्ते विश्वे विधिशतमखाद्याः दिवि सदाम्।\nकरालं यत्क्ष्वेलं कबलितवतः कालकलना\nन शम्भोस्तन्मूलं तव जनयितुर्योगनिद्रा॥\nमनस्त्वं व्योम त्वं मरुदसि मरुत्सारथिरसि\nत्वमापस्त्वं भूमिस्त्वयि परिणतायां न हि परम्।\nत्वमेव स्वात्मानं परिणमयितुं विश्ववपुषा\nचिदानन्दाकारं शिवयुवतिभावेन बिभृषे॥\nत्वदन्यः पाणिभ्यामभयवरदो दैवतगणो\nस्त्वमेका नैवासि प्रकटितवरा भीतिहरणा।\nभयात्त्रातुं दातुं फलमपि च वाञ्छासमधिकं\nशरण्ये लोकानां तव हि चरणावेव निपुणौ॥\nहरिस्त्वामाराध्य प्रणतजनसौभाग्यजननीं\nपुरा नारीभूत्वा पुररिपुमपि क्षोभमनयत्।\nस्मरोऽपि त्वां नत्वा रतिनयनलेह्येन वपुषा\nमुनीनामप्यन्तः प्रभवति हि मोहाय महताम्॥',
    iast: 'Śivaḥ śaktyā yukto yadi bhavati śaktaḥ prabhavituṃ\nna cedevaṃ devo na khalu kuśalaḥ spanditumapi\natastvāmārādhyāṃ hariharavirīñcyādibhirapi\npraṇantuṃ stotuṃ vā kathamakṛtapuṇyaḥ prabhavati\ntanīyāṃsaṃ pāṃsuṃ tava caraṇapaṃkeruhabhavaṃ\nviriñciḥ sañcinvan viracayati lokānvikalam\nvāhatyenaṃ śauriḥ kathamapi sahasreṇa śirasāṃ\nharaḥ saṃkṣudyainaṃ bhajati bhasitoddhūlanavidhim\navituṃ no devyāḥ praṇayibhayabhāvā viracito\nhasantīva kṣubdhā nijarasaparistandakalāḥ\ngaladgaṇḍābhogāt karikabhakumbhasya vikacaiḥ\nsamāsakto mukto gaṇitaśatakoṭīrmaṇinibhaiḥ\nsudhāmapyāsvādya pratibhayajarāmṛtyuhariṇīm\nvīpadyante viśve vidhiśatamakhādyāḥ divi sadām\nkarālaṃ yatkṣvelaṃ kabalitavataḥ kālakālanā\nna śambhostan-mūlaṃ tava janayituryoganidrā\nmanastvaṃ vyoma tvaṃ marudasī marutsārathirasī\ntvamāpastvam bhūmistvāyi pariṇatāyāṃ na hi param\ntvameva svātmānaṃ pariṇamayituṃ viśvavapuṣā\ncidānandākāraṃ śivayuvatibhāvena bibhṛṣe\ntvadanyaḥ pāṇibhyāmabhayavarado daivatagaṇo\nstvamekā naivāsi prakāṭitavarā bhītiharaṇā\nbhayāttrātuṃ dātuṃ phalamapi ca vāñchāsamadhikaṃ\nśaraṇye lokānāṃ tava hi caraṇāveva nipuṇau',
    meaning: 'Shiva, only when united with you (Shakti), is able to manifest. Without you, the god cannot even stir. You are worshipped even by Vishnu, Shiva, and Brahma — how can one without merit bow to or praise you? The finest dust from the pollen of your lotus feet — Brahma collects it and creates the worlds perfectly; Vishnu bears it somehow on his thousand heads; Shiva grinds it and uses it as the sacred ash he smears on himself. The pearls from the temples of young elephants, glistening and strung into garlands, slide down to decorate your cheeks — as if the Goddess herself laughs, her shaking revealing the flow of her innate grace, to protect her devotees who fear. Even the gods in heaven who have drunk the nectar that defeats terrible old age and death are subject to misfortune — but Shiva swallowed the deadly poison and was unaffected because your Yoga-sleep is his ultimate foundation. You are the mind, the sky, the wind, the charioteer of wind; you are water and earth — when you evolve, nothing higher remains. You yourself take the form of the universe to transform your own being; assuming the form of Shiva's youthful consort, you take on the shape of consciousness-bliss. Other gods show only one hand of granting boons or the other of removing fear — but you alone, O refuge of all the worlds, show neither gesture; your two lotus feet are uniquely skilled to both remove all fear and grant fruits beyond all desires. (Selected from 100 verses, Saundarya Lahari of Adi Shankaracharya)',
  },

  // ══════════════════════════════════════════════════════════
  // HANUMAN
  // ══════════════════════════════════════════════════════════

  {
    id: 'sankat-mochan-hanumanashtak',
    name: 'Sankat Mochan Hanumanashtak',
    deity: 'Hanuman',
    category: 'Protection',
    when: 'Tuesdays; Saturdays; Hanuman Jayanti; for deliverance from crisis; composed by Tulsidas',
    sanskrit: 'बाल समय रवि भक्षि लियो तब, तीनहुँ लोक भयो अँधियारो।\nताहि सों त्रास भयो जग को, यह संकट काहु सों जात न टारो॥\nदेवन आनि करी विनती तब, छाँड़ि दियो रवि कष्ट निवारो।\nको नहिं जानत है जग में, कपि संकटमोचन नाम तिहारो॥\nबालि की त्रास कपीस बसें गिरि, जात महाप्रभु पन्थ निहारो।\nचाहत सीय असोक सों राम, कहा हनुमान सो दुःख निवारो॥\nराम दूत अतुलित बल सागर, अञ्जनि पुत्र पवन बल धारो।\nको नहिं जानत है जग में, कपि संकटमोचन नाम तिहारो॥\nसंकट सें हनुमान छुड़ावत, लंक विदारत लाज बचावत।\nसीता को सन्देश दे आये, राम प्रताप जगत महँ गावत॥\nलंका जाय के आग लगाई, माता को राम-मुद्रिका दे आई।\nको नहिं जानत है जग में, कपि संकटमोचन नाम तिहारो॥\nलखन मूर्च्छित भयो जब देखा, अकुलाए रघुवर मन रेखा।\nलाय सजीवन औषध कीन्हीं, लखन प्राण फिर उठाय दीन्हीं॥\nयाकि करनी नहिं पावत पारा, राम हियो अति हरख उबारो।\nको नहिं जानत है जग में, कपि संकटमोचन नाम तिहारो॥\nपाताल माहिँ जाय बलि बाँधो, महिरावण दुस्ट को काँधो।\nराम लखन दोऊ प्राण बचाये, बड़े संकट सें निकारि ले आये॥\nविभीषण को राज दिलायो, सब जग हनुमत यश गायो।\nको नहिं जानत है जग में, कपि संकटमोचन नाम तिहारो॥\nभूत पिशाच निकट नहिं आवे, महाबीर जब नाम सुनावे।\nनासे रोग हरे सब पीरा, जपत निरन्तर हनुमत बीरा॥\nसंकट सें हनुमान छुड़ावे, मन क्रम बचन ध्यान जो लावे।\nको नहिं जानत है जग में, कपि संकटमोचन नाम तिहारो॥\nजय जय जय हनुमान गोसाईं, कृपा करहु गुरुदेव की नाईं।\nसाधु सन्त तुम रखवारे, असुर निकन्दन राम दुलारे॥\nजो यह गावे हनुमानाष्टक, होय सिद्ध सब काज अनुपम।\nको नहिं जानत है जग में, कपि संकटमोचन नाम तिहारो॥',
    iast: 'Bāla samaya ravi bhakṣi liyo taba, tīnahũ loka bhayo aṃdhiyāro\ntāhi soṃ trāsa bhayo jaga ko, yaha saṃkaṭa kāhu soṃ jāta na ṭāro\ndevana āni karī vinatī taba, chāṃṛi diyo ravi kaṣṭa nivāro\nko nahiṃ jānata hai jaga meṃ, kapi saṃkaṭamocana nāma tihāro\nbāli kī trāsa kapīsa base giri, jāta mahāprabhu pantha nihāro\ncāhata sīya aśoka soṃ rāma, kahā hanumāna so duḥkha nivāro\nrāma dūta atulita bala sāgara, añjani putra pavana bala dhāro\nko nahiṃ jānata hai jaga meṃ, kapi saṃkaṭamocana nāma tihāro\nsaṃkaṭa seṃ hanumāna chuwāvata, laṃka vidārata lāja bacāvata\nsītā ko sandeśa de āye, rāma pratāpa jagata mahṃ gāvata\nlaṃkā jāya ke āga lagāī, mātā ko rāma mudrikā de āī\nko nahiṃ jānata hai jaga meṃ, kapi saṃkaṭamocana nāma tihāro\nlakhana mūrchita bhayo jaba dekhā, akulāe raghuvara mana rekhā\nlāya sajīvana auṣadha kīnhī, lakhana prāṇa phira uṭhāya dīnhī\nyāki karanī nahiṃ pāvata pārā, rāma hiyo ati harakha ubāro\nko nahiṃ jānata hai jaga meṃ, kapi saṃkaṭamocana nāma tihāro\npātāla māhiṃ jāya bali bāṃdho, mahirāvaṇa duṣṭa ko kāṃdho\nrāma lakhana doū prāṇa bacāye, baṛe saṃkaṭa seṃ nikāri le āye\nvibhīṣaṇa ko rāja dilāyo, saba jaga hanumat yaśa gāyo\nko nahiṃ jānata hai jaga meṃ, kapi saṃkaṭamocana nāma tihāro\nbhūta piśāca nikaṭa nahiṃ āve, mahābīra jaba nāma sunāve\nnāse roga hare saba pīrā, japata nirantara hanumat bīrā\nsaṃkaṭa seṃ hanumāna chuwāve, mana krama bacana dhyāna jo lāve\nko nahiṃ jānata hai jaga meṃ, kapi saṃkaṭamocana nāma tihāro\njaya jaya jaya hanumāna gosāīṃ, kṛpā karahu gurudeva kī nāīṃ\nsādhu santa tuma rakhavāre, asura nikandana rāma dulāre\njo yaha gāve hanumānāṣṭaka, hoya siddha saba kāja anupama\nko nahiṃ jānata hai jaga meṃ, kapi saṃkaṭamocana nāma tihāro',
    meaning: 'In childhood you swallowed the Sun and all three worlds fell dark — none could resolve this crisis. The gods pleaded and you released the Sun — who does not know your name, O Hanuman, Remover of Afflictions! When the monkeys hid in the mountains fearing Bali, and Rama sought the path — Hanuman went as Rama\'s messenger to Sita, removing her sorrow — who does not know your name! Delivering a message to Sita in Lanka, tearing apart Lanka, protecting Rama\'s honour — you burned Lanka and gave Sita the ring from Rama — who does not know your name! When Lakshmana lay unconscious and Rama\'s heart broke — you brought the Sanjivani herb and restored Lakshmana\'s life; Rama\'s heart overflowed with gratitude — who does not know your name! You descended into the underworld and bound the demon Mahiravana who had seized Rama and Lakshmana — you rescued them from that great crisis and gave Vibhishana his kingdom — who does not know your name! No ghost or demon comes near when the great hero\'s name is spoken — disease is destroyed and all pain removed by continuously repeating heroic Hanuman\'s name — who does not know your name! Victory, victory, victory to Hanuman — be gracious like a guru! Protector of saints, destroyer of demons, Rama\'s beloved — whoever sings this Hanumanashtak accomplishes all purposes perfectly — who in all the world does not know your name, O Kapi, Sankat Mochan! (8 of 8 verses, Tulsidas)',
  },

  {
    id: 'bajrang-baan',
    name: 'Bajrang Baan',
    deity: 'Hanuman',
    category: 'Protection',
    when: 'Tuesdays; Saturdays; for strong protection, overcoming fear and black magic',
    sanskrit: 'निश्चय प्रेम प्रतीति ते, विनय करें सनमान।\nतेहि के कारज सकल शुभ, सिद्ध करैं हनुमान॥\nजय हनुमन्त सन्त हितकारी। सुन लीजै प्रभु अरज हमारी॥\nजन के काज बिलम्ब न कीजै। आतुर दौरि महा सुख दीजै॥\nजैसे कूदि सिन्धु महि पारा। सुरसा बदन पैठि बिस्तारा॥\nआगे जाय लंकिनी रोका। मारेहु लात गई सुरलोका॥\nजाय विभीषण को सुख दीन्हा। सीताजी की सुधि प्रभु लीन्हा॥\nयह सब तुम्हरो प्रताप अगाधा। पापी कोउ न होय दुखी कोउ न साधा॥\nबज्र देह दानव दलन रन खल-बल बिनासन हार।\nजय जय जय हनुमान गोसाईं कृपा करहु गुरुदेव की नाईं॥\nबज्रांग बाण पाठ जो कोई। ताहि न संकट राखत मोई॥\nराम दुआरे तुम रखवारे। होत न आज्ञा बिनु पैसारे॥\nसब सुख लहे तुम्हारी सरना। तुम रच्छक काहू को डर ना॥\nआपन तेज सम्हारहु आपे। तीनों लोक हाँक तें काँपे॥\nभूत पिशाच निकट नहिं आवे। महाबीर जब नाम सुनावे॥\nनासे रोग हरे सब पीरा। जपत निरंतर हनुमत बीरा॥\nसंकट ते हनुमान छुड़ावे। मन क्रम बचन ध्यान जो लावे॥',
    iast: 'Niścaya prema pratīti te, vinaya kareṃ sanamāna\ntehi ke kāraja sakala śubha, siddha karaī hanumāna\njaya hanumanta santa hitakārī, suna lījai prabhu araja hamārī\njana ke kāja bilaṃba na kījai, ātura dauri mahā sukha dījai\njaise kūdi sindhu mahi pārā, surasā badana paiṭhi bistārā\nāge jāya laṃkinī rokā, mārehu lāta gaī suralokā\njāya vibhīṣaṇa ko sukha dīnhā, sītājī kī sudhi prabhu līnhā\nyaha saba tumharo pratāpa agādhā, pāpī kou na hoya dukhī kou na sādhā\nvajra deha dānava dala rana khala bala vināsana hāra\njaya jaya jaya hanumāna gosāīṃ kṛpā karahu gurudeva kī nāīṃ\nvajrāṃga bāṇa pāṭha jo koī, tāhi na saṃkaṭa rākhata moī\nrāma duāre tuma rakhavāre, hota na ājñā binu paisāre\nsaba sukha lahe tumhārī saranā, tuma racchaka kāhū ko ḍara nā\nāpana teja samhārahu āpe, tīnoṃ loka hāṃka teṃ kāṃpe\nbhūta piśāca nikaṭa nahiṃ āve, mahābīra jaba nāma sunāve\nnāse roga hare saba pīrā, japata nirantara hanumat bīrā\nsaṃkaṭa te hanumāna chuḍāve, mana krama bacana dhyāna jo lāve',
    meaning: 'Those who with genuine love, faith, and humility offer reverence — Hanuman fulfils all their auspicious works. Victory to Hanuman, benefactor of the righteous — hear our prayer, O Lord; do not delay in the devotee\'s affairs, come running and grant the greatest happiness. Just as you leapt across the ocean, entered and expanded within Surasa\'s mouth; as you encountered Lankini who barred your way and kicked her to heaven; as you found Vibhishana and consoled him, and brought news of Sitaji to the Lord — all this is your boundless glory, so that sinners come to no harm and the suffering find relief. O thunderbolt-bodied one, destroyer of demon armies, annihilator of the wicked — victory, victory, victory to Hanuman! Be gracious like a guru. Whoever reads this Bajrang Baan — I (Hanuman) will remove all their afflictions. You are the guardian at Rama\'s gate — none may enter without your command. All happiness comes under your protection; with you as protector, no one need fear. Even your own brilliance you must restrain yourself — all three worlds tremble at your roar. No ghost or spirit comes near when the great hero\'s name is uttered. Disease is destroyed and all pain removed by endlessly chanting heroic Hanuman\'s name. Hanuman delivers from every crisis those who focus on him in mind, deed, and word. (Key verses of the Bajrang Baan)',
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
    sanskrit: 'सरस्वति नमस्तुभ्यं वरदे कामरूपिणि।\nविद्यारम्भं करिष्यामि सिद्धिर्भवतु मे सदा॥\nसरस्वति नमस्तुभ्यं सर्वदेविनमस्कृते।\nशान्तरूपे शशिधरे सर्वयोगे नमोस्तुते॥\nविद्यार्थिनां वदान्याय वरार्थं वरदाय च।\nसर्वार्थिनां परं ब्रह्म त्वां भजे वाग्देवते॥\nनदी सरस्वती पुण्या वेदमाता सरस्वती।\nविद्याप्रदाय नित्याय नमस्ते वीणापाणये॥\nवाक्पालिनि नमस्तुभ्यं नमोऽस्त्वम्बे सुरार्चिते।\nविद्याप्रदायिनि देवि नमस्ते सरस्वति॥\nश्वेताम्बरे श्वेतकमलासने श्वेतपद्मधरे।\nश्वेताभरणशोभिन्यै नमस्ते सरस्वति॥\nविद्याधरे विद्यामयि सर्वविद्याप्रकाशिनि।\nजगन्मङ्गलदायिन्यै नमस्ते सरस्वति॥\nसरस्वत्यष्टकं नित्यं सर्वसिद्धिप्रदायकम्।\nपठेद्विद्याप्रदं देव्यै नमस्ते सरस्वति॥',
    iast: 'Sarasvati namastubhyaṃ varade kāmarūpiṇī\nvidyārambhaṃ kariṣyāmi siddhirbhavatu me sadā\nsarasvati namastubhyaṃ sarvadevinamaskṛte\nśāntarūpe śaśidhare sarvayoge namostute\nvidyārthinām vadānyāya varārthaṃ varadāya ca\nsarvārthinām paraṃ brahma tvāṃ bhaje vāgdevate\nnadī sarasvatī puṇyā vedamātā sarasvatī\nvidyāpradāya nityāya namaste vīṇāpāṇaye\nvākpālini namastubhyaṃ namo\'stvaṃbe surārcite\nvidyāpradāyini devi namaste sarasvati\nśvetāmbare śvetakamalāsane śvetapadmadhare\nśvetābharaṇaśobhinyai namaste sarasvati\nvidyādhare vidyāmayi sarvavidyāprakāśini\njaganmaṃgaladāyinyai namaste sarasvati\nsarasvatyaṣṭakaṃ nityaṃ sarvasiddhipradāyakam\npaṭhedvidyāpradaṃ devyai namaste sarasvati',
    meaning: 'Salutations to you, Saraswati — bestower of boons, you who take any form desired. I am beginning my studies; may I always attain perfection. Salutations to you, Saraswati, worshipped by all gods; of peaceful form, who holds the moon — salutations to you who is present in all yoga. O goddess of speech, generous to students, granter of boons to seekers, the supreme Brahman for all who ask — I worship you, O goddess of speech. The holy river Saraswati, mother of the Vedas — salutations always to the lute-bearer who bestows learning. O protector of speech, salutations to you, O mother worshipped by gods — salutations to you, Saraswati, bestower of wisdom. Clad in white, seated on the white lotus, holding the white lotus, adorned with white ornaments — salutations, Saraswati. Bearer and embodiment of all learning, illuminator of every branch of knowledge, bestower of auspiciousness upon the world — salutations, Saraswati. This Saraswati Ashtakam when recited daily bestows every perfection — it grants learning; salutations, O Devi Saraswati. (8 of 8 verses)',
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
    sanskrit: 'जय गणेश जय गणेश, जय गणेश देवा।\nमाता जाकी पार्वती, पिता महादेवा॥\nएकदन्त दयावन्त, चार भुजाधारी।\nमाथे सिन्दूर सोहे, मूसे की सवारी॥\nपान चढ़े, फूल चढ़े, और चढ़े मेवा।\nलड्डुअन का भोग लगे, सन्त करें सेवा॥\nजय गणेश जय गणेश, जय गणेश देवा...\nअँधे को आँखें मिलें, कोढ़िन को काया।\nबाँझन को पुत्र मिले, निर्धन को माया॥\nजय गणेश जय गणेश, जय गणेश देवा...\n\'सूर\' श्याम शरण आए, सफल कीजे सेवा।\nमाता जाकी पार्वती, पिता महादेवा॥\nजय गणेश जय गणेश, जय गणेश देवा॥',
    iast: 'Jaya gaṇeśa jaya gaṇeśa, jaya gaṇeśa devā\nmātā jāki pārvatī, pitā mahādevā\nekadanta dayāvanta, cāra bhujādhārī\nmāthe sindūra sohe, mūse kī savārī\npāna caṛhe, phūla caṛhe, aura caṛhe mevā\nlaḍḍuana kā bhoga lage, santa kareṃ sevā\naṃdhe ko āṃkheṃ mileṃ, koṛhin ko kāyā\nbāṃjhana ko putra mile, nirdhana ko māyā\n\'sūra\' śyāma śaraṇa āe, saphala kīje sevā\nmātā jāki pārvatī, pitā mahādevā\njaya gaṇeśa jaya gaṇeśa, jaya gaṇeśa devā',
    meaning: 'Victory to Ganesha, the divine Ganesha — whose mother is Parvati and father is Mahadeva! Single-tusked, compassionate, bearing four arms; vermilion adorns his forehead, his mount is the mouse. Betel leaves are offered, flowers are offered, and sweets also. Laddoos are offered as bhog; the saints serve him in devotion. The blind receive sight, the diseased receive a healthy body; the childless receive a son, the poor receive wealth. "Sura" (the poet) has come seeking shelter — make this service fruitful. Victory to Ganesha! (Complete Ganesh Aarti, 4 verses)',
  },

  {
    id: 'ganesh-pancharatnam',
    name: 'Ganesh Pancharatnam',
    deity: 'Ganesha',
    category: 'Devotional',
    when: 'Ganesh Chaturthi; Wednesdays; Sankashti Chaturthi; composed by Adi Shankaracharya',
    sanskrit: 'मुदाकरात्तमोदकं सदा विमुक्तिसाधकं\nकलाधरावतंसकं विलासिलोकरक्षकम्।\nअनायकैकनायकं विनाशितेभदैत्यकं\nनताशुभाशुनाशकं नमामि तं विनायकम्॥\nनतेतरातिभीकरं नवोदितार्कभास्वरं\nनमत्सुरारिनिर्जरं नताधिकापदुद्धरम्।\nसुरेश्वरं निधीश्वरं गजेश्वरं गणेश्वरं\nमहेश्वरं तमाश्रये परात्परं निरन्तरम्॥\nसमस्तलोकशङ्करं निरस्तदैत्यकुञ्जरं\nदरेतरोदरं वरं वरेभवक्त्रमक्षरम्।\nकृपाकरं क्षमाकरं मुदाकरं यशस्करं\nमनस्करं नमस्कृतां नमामि तं विनायकम्॥\nअकिञ्चनार्तिमार्जनं चिरन्तनोक्तिभाजनं\nपुरारिपूर्वनन्दनं सुरारिगर्वखण्डनम्।\nप्रपञ्चनाशभीषणं धनञ्जयादिभूषणं\nकपोलदानवारणं भजेऽहं भावशोधनम्॥\nनितान्तकान्तदन्तकान्तिमन्तकान्तकात्मजं\nचराचरेष्वनन्तचित्रभूतभेदभञ्जनम्।\nप्रकाशकल्पनिर्मलं प्रमोदशान्तिदायकं\nप्रणम्य तं विनायकं सहस्रनामभाजनम्॥',
    iast: 'Mudākarāttamōdakaṃ sadā vimuktisādhakaṃ\nkalādharāvataṃsakaṃ vilāsilokarakṣakam\nanāyakaikānāyakaṃ vināśitebhadaityakaṃ\nnatāśubhāśunāśakaṃ namāmi taṃ vināyakam\nnatetarātibhīkaraṃ navoditārkabhāsvaraṃ\nnamatsurārinirjaraṃ natādhikāpaduddharam\nsureśvaraṃ nidhīśvaraṃ gajeśvaraṃ gaṇeśvaraṃ\nmaheśvaraṃ tamāśraye parātparaṃ nirantaram\nsamastalokaśaṃkaraṃ nirastadaityakuñjaraṃ\ndaretarodaraṃ varaṃ varebhavaktramos kṣaram\nkṛpākaraṃ kṣamākaraṃ mudākaraṃ yaśaskaraṃ\nmanaskaraṃ namaskṛtāṃ namāmi taṃ vināyakam\nakiñcanārtimārjanaṃ cirantanōktibhājanaṃ\npurāripūrvanandanaṃ surārigarvakhaṇḍanam\nprapañcanāśabhīṣaṇaṃ dhanañjayādibhūṣaṇaṃ\nkapolādānavāraṇaṃ bhajehaṃ bhāvaśodhanam\nnitāntakāntadantakāntimantas kāntakātmajaṃ\ncarācareṣvanantacitrabhhūtabhedabhañjanam\nprakāśakalpanirmalaṃ pramodaśāntidāyakaṃ\npraṇamya taṃ vināyakaṃ sahasranāmabhājanam',
    meaning: 'Who holds the modaka with a joyful hand, ever the means of liberation; who wears the crescent moon as an ornament, who protects the worlds; the one leader of the leaderless, destroyer of the elephant-demon; who swiftly destroys the inauspiciousness of those who bow — I bow to that Vinayaka. Terrible to those who do not bow, radiant as the newly risen sun; worshipped by gods and enemies of gods, who uplifts all who bow; lord of the gods, lord of treasures, lord of elephants, lord of the Ganas — I take constant refuge in that supreme Maheshvara who is beyond all. Auspicious to all worlds, destroyer of the elephant-demon; of large belly, the best of boons, with the elephant face, imperishable; the source of compassion, forgiveness, joy, and fame — I bow to that Vinayaka who receives salutations. Remover of the suffering of the destitute, dwelling in ancient teachings; the son of Shiva who precedes him, the one who shattered the pride of demons; terrible as the destroyer of all illusion, adorned with the serpent Dhananjaya; like Ganesha riding an elephant, I worship the one who purifies the heart. Of eternally beautiful, bright tusk-radiance, the son of the destroyer of Kama; in all moving and unmoving, beyond all mental differentiation; pure as the illumination at the end of the cosmic cycle, bestower of joy and peace — I bow to that Vinayaka who is the repository of a thousand names. (5 of 5 verses, Adi Shankaracharya)',
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
    sanskrit: 'महाप्रसाद जननी सर्वसौभाग्यवर्धिनी।\nआधि व्याधि हरा नित्यं तुलसी त्वां नमाम्यहम्॥\nनमस्तुलसि कल्याणि नमो विष्णुप्रिये शुभे।\nनमो मोक्षप्रदे देवि नमः सम्पत्प्रदायिके॥\nतुलसी भूर्भुवःस्वर्गे वाञ्छितार्थप्रदायिनि।\nविष्णुभक्तिप्रदे नित्ये सर्वपापप्रणाशिनि॥\nविष्णुप्रियां हरिप्रियां वैष्णव्यां मोक्षदायिनीम्।\nतुलसीं शरणं यामि सर्वकामप्रदायिनीम्॥\nयस्यां दर्शनमात्रेण पापशतं नशेद्ध्रुवम्।\nतां तुलसीं नमस्यामि सर्वसौभाग्यदायिनीम्॥\nपुत्रपौत्रप्रदे देवि धनधान्यसमृद्धिदे।\nसर्वसिद्धिप्रदे नित्ये तुलसी नमोऽस्तु ते॥\nआयुष्प्रदे तनुत्राणे सर्वरोगनिवारिणि।\nसर्वसंकटहर्त्री च तुलसी नमोऽस्तु ते॥\nतुलस्यष्टकमिदं पुण्यं यो नित्यं पठते नरः।\nऐश्वर्यं प्राप्यते सर्वं लभते सुखमुत्तमम्॥',
    iast: 'Mahāprasāda jananī sarvasaubhāgyavardhinī\nādhi vyādhi harā nityaṃ tulasī tvāṃ namāmyaham\nnamastulasi kalyāṇi namo viṣṇupriye śubhe\nnamo mokṣaprade devi namaḥ sampatpradāyike\ntulasī bhūrbhuvaḥsvarge vāñchitārthapradāyini\nviṣṇubhaktiprade nitye sarvapāpapraṇāśini\nviṣṇupriyāṃ haripriyāṃ vaiṣṇavyāṃ mokṣadāyinīm\ntulasīṃ śaraṇaṃ yāmi sarvakāmapradāyinīm\nyasyāṃ darśanamātreṇa pāpaśataṃ naśeddhruvam\ntāṃ tulasīṃ namasyāmi sarvasaubhāgyadāyinīm\nputrapaútraprade devi dhanadānyasamṛddhide\nsarvasiddhiprade nitye tulasī namo\'stu te\nāyuṣprade tanutṛāṇe sarvaroganivāriṇi\nsarvasaṃkaṭahartrī ca tulasī namo\'stu te\ntulasyaṣṭakamidaṃ puṇyaṃ yo nityaṃ paṭhate naraḥ\naiśvaryaṃ prāpyate sarvaṃ labhate sukhamuttamam',
    meaning: 'O Tulasi — mother of great prasada, increaser of all auspiciousness, remover of mental and physical ailments always — I bow to you. Salutations O Tulasi, the auspicious, the beloved of Vishnu, the pure one; salutations O goddess who grants liberation and who bestows wealth. O Tulasi who grants all desired objects in all three worlds — ever bestowing Vishnu-devotion and destroying all sin. I take refuge in Tulasi who is dear to Vishnu and to Hari, who grants liberation and all desires. Even by merely seeing her, a hundred sins are surely destroyed — I bow to that Tulasi, bestower of all auspiciousness. O goddess who gives sons and grandsons, who bestows abundance of wealth and grain — you who ever grant all perfections — salutations, Tulasi. O bestower of long life, protector of the body, remover of all disease, destroyer of all calamities — salutations, Tulasi. The person who recites this holy Tulasi Ashtakam daily obtains all prosperity and attains the highest happiness. (8 of 8 verses)',
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
    sanskrit: 'शरीरं सुरूपं तथा वा कलत्रं यशश्चारु चित्रं धनं मेरुतुल्यम्।\nमनश्चेन्न लग्नं गुरोरङ्घ्रिपद्मे ततः किं ततः किं ततः किं ततः किम्॥\nकलत्रं धनं पुत्रपौत्रादिसर्वं गृहं बान्धवाः सर्वमेतद्धि जातम्।\nमनश्चेन्न लग्नं गुरोरङ्घ्रिपद्मे ततः किं ततः किं ततः किं ततः किम्॥\nषडङ्गादिवेदो मुखे शास्त्रविद्या कवित्वादि गद्यं सुपद्यं करोति।\nमनश्चेन्न लग्नं गुरोरङ्घ्रिपद्मे ततः किं ततः किं ततः किं ततः किम्॥\nविदेशेषु मान्यः स्वदेशेषु धन्यः सदाचारवृत्तेषु मत्तो न चान्यः।\nमनश्चेन्न लग्नं गुरोरङ्घ्रिपद्मे ततः किं ततः किं ततः किं ततः किम्॥\nक्षमामण्डले भूपभूपालबृन्दैः सदा सेव्यमानं न तद्विक्रमः स्यात्।\nमनश्चेन्न लग्नं गुरोरङ्घ्रिपद्मे ततः किं ततः किं ततः किं ततः किम्॥\nयशो मे गतं दिक्षु दानप्रतापात् जगद्वस्तु सर्वं करे यत्प्रसादात्।\nमनश्चेन्न लग्नं गुरोरङ्घ्रिपद्मे ततः किं ततः किं ततः किं ततः किम्॥\nन भोगे न योगे न वा वाजिराजौ न कान्तामुखे नैव वित्तेषु चित्तम्।\nमनश्चेन्न लग्नं गुरोरङ्घ्रिपद्मे ततः किं ततः किं ततः किं ततः किम्॥\nअरण्ये न वा स्वस्य गेहे न कार्ये न देहे मनो वर्तते मे त्वनर्घे।\nमनश्चेन्न लग्नं गुरोरङ्घ्रिपद्मे ततः किं ततः किं ततः किं ततः किम्॥',
    iast: 'Śarīraṃ surūpaṃ tathā vā kalatraṃ yaśaścāru citraṃ dhanaṃ merutulyam\nmanaścenna lagnaṃ guroraṅghripadme tataḥ kiṃ tataḥ kiṃ tataḥ kiṃ tataḥ kim\nkalatraṃ dhanaṃ putrapaútrādisarvaṃ gṛhaṃ bāndhavāḥ sarvametadhi jātam\nmanaścenna lagnaṃ guroraṅghripadme tataḥ kiṃ tataḥ kiṃ tataḥ kiṃ tataḥ kim\nṣaḍaṅgādivedo mukhe śāstravidyā kavitādī gadyaṃ supādyaṃ karoti\nmanaścenna lagnaṃ guroraṅghripadme tataḥ kiṃ tataḥ kiṃ tataḥ kiṃ tataḥ kim\nvideśeṣu mānyaḥ svadeśeṣu dhanyaḥ sadācāravṛtteṣu matto na cānyaḥ\nmanaścenna lagnaṃ guroraṅghripadme tataḥ kiṃ tataḥ kiṃ tataḥ kiṃ tataḥ kim\nkṣamāmaṇḍale bhūpabhūpālabṛndaiḥ sadā sevyamānaṃ na tadvikramaḥ syāt\nmanaścenna lagnaṃ guroraṅghripadme tataḥ kiṃ tataḥ kiṃ tataḥ kiṃ tataḥ kim\nyaśo me gataṃ dikṣu dānapratāpāt jagadvāstu sarvaṃ kare yatprasādāt\nmanaścenna lagnaṃ guroraṅghripadme tataḥ kiṃ tataḥ kiṃ tataḥ kiṃ tataḥ kim\nna bhoge na yoge na vā vājirājau na kāntāmukhe naiva vitteṣu cittam\nmanaścenna lagnaṃ guroraṅghripadme tataḥ kiṃ tataḥ kiṃ tataḥ kiṃ tataḥ kim\naraṇye na vā svasya gehe na kārye na dehe mano vartate me tvanarghe\nmanaścenna lagnaṃ guroraṅghripadme tataḥ kiṃ tataḥ kiṃ tataḥ kiṃ tataḥ kim',
    meaning: 'A beautiful body, a splendid spouse, many-coloured fame, wealth like Mount Meru — but if the mind is not fixed at the guru\'s lotus feet, what of it? What of it? What of it? What of it? Spouse, wealth, sons, grandsons, and all — home, relatives, all of these have come — but if the mind is not fixed at the guru\'s lotus feet, what of it? The six limbs of the Vedas in the mouth, knowledge of all scriptures, poetry, fine prose and verse — but if the mind is not fixed at the guru\'s lotus feet, what of it? Honored in foreign lands, celebrated in one\'s own country, unmatched in righteous conduct — but if the mind is not fixed at the guru\'s lotus feet, what of it? Attended upon by hosts of kings and princes throughout all the earth with its circle of nations — but if the mind is not fixed at the guru\'s lotus feet, what of it? My fame has spread in all directions through the power of my generosity; all objects of the world are in my hands by his grace — but if the mind is not fixed at the guru\'s lotus feet, what of it? The mind is not in sensual pleasures, not in yoga, not in horses and kingdoms, not in the face of the beloved, not even in wealth — but if it is not fixed at the guru\'s lotus feet, what of it? In the forest or at home, in duty or in the body — the mind does not rest in any of these precious things — but if it is not fixed at the guru\'s lotus feet, what of it? (8 of 8 verses, Adi Shankaracharya)',
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
      <Text style={styles.shlokaPreview} numberOfLines={3}>{item.sanskrit}</Text>
      <Text style={styles.shlokaReadMore}>Tap to read full shloka →</Text>
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
            <Text style={styles.emptyOm}>ॐ</Text>
            <Text style={styles.emptyTitle}>No shlokas found</Text>
            <Text style={styles.emptyBody}>Try a different search or clear the filters.</Text>
            <TouchableOpacity
              style={styles.emptyClearBtn}
              onPress={() => { setQuery(''); setActiveCategory('All'); setActiveDeity('All'); }}
              activeOpacity={0.7}
            >
              <Text style={styles.emptyClearText}>Clear all filters</Text>
            </TouchableOpacity>
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
    paddingVertical: 10,
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: Colors.hairline,
    backgroundColor: Colors.canvas,
  },
  filterChipActive: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
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
    backgroundColor: Colors.surface,
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
    backgroundColor: Colors.accentWash,
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
  shlokaReadMore: {
    ...Type.caption,
    color: Colors.accent,
    marginTop: Spacing.xs,
    letterSpacing: 0,
    textTransform: 'none',
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
    borderLeftWidth: 3,
    borderLeftColor: Colors.accent,
    paddingLeft: Spacing.sm,
    marginBottom: Spacing.lg,
    opacity: 0.8,
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
    paddingHorizontal: Spacing.xl,
  },
  emptyOm: {
    fontSize: 48,
    color: Colors.ink,
    opacity: 0.12,
    marginBottom: Spacing.md,
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
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  emptyClearBtn: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: Colors.accent,
  },
  emptyClearText: {
    ...Type.label,
    color: Colors.accent,
  },
});
