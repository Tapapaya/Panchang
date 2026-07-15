import type { Stotra } from './types';

export const VISHNU_STOTRAS: Stotra[] = [
  {
    id: 'satyanarayan-narayana',
    title: 'Om Namo Narayanaya',
    deity: 'Vishnu',
    category: 'Mantra',
    occasion: 'Daily; Ekadashi; Purnima; Satyanarayan Puja',
    about:
      'The Ashtakshara — eight-syllable — mantra of Vishnu, the root mantra of the Sri Vaishnava tradition, paired here with the Vishnu Gayatri. It is chanted for refuge, steadiness and remembrance of Narayana in daily life.',
    complete: true,
    verses: [
      {
        sanskrit: 'ॐ नमो नारायणाय।',
        iast: 'Oṃ namo nārāyaṇāya',
        meaning: 'Om — salutations to Narayana, the refuge of all beings.',
        label: 'Ashtakshara',
      },
      {
        sanskrit: 'ॐ नारायणाय विद्महे वासुदेवाय धीमहि।\nतन्नो विष्णुः प्रचोदयात्॥',
        iast: 'Oṃ nārāyaṇāya vidmahe vāsudevāya dhīmahi\ntanno viṣṇuḥ pracodayāt',
        meaning:
          'We know Narayana; we meditate on Vasudeva. May that Vishnu inspire and illuminate us.',
        label: 'Vishnu Gayatri',
      },
    ],
  },
  {
    id: 'vishnu-sahasranamam-dhyana',
    title: 'Vishnu Sahasranamam — Dhyana',
    deity: 'Vishnu',
    category: 'Stotra',
    occasion: 'Daily; Ekadashi; before Sahasranama recitation',
    about:
      'The meditation verse recited before the Thousand Names of Vishnu from the Mahabharata. It paints the image held in the mind\'s eye throughout the recitation: Vishnu at rest on the serpent Shesha, serene sustainer of the cosmos.',
    complete: true,
    verses: [
      {
        sanskrit: 'शान्ताकारं भुजगशयनं पद्मनाभं सुरेशं\nविश्वाधारं गगनसदृशं मेघवर्णं शुभाङ्गम्।\nलक्ष्मीकान्तं कमलनयनं योगिभिर्ध्यानगम्यं\nवन्दे विष्णुं भवभयहरं सर्वलोकैकनाथम्॥',
        iast: 'Śāntākāraṃ bhujagaśayanaṃ padmanābhaṃ sureśaṃ\nviśvādhāraṃ gaganasadṛśaṃ meghavarṇaṃ śubhāṅgam\nlakṣmīkāntaṃ kamalanayanaṃ yogibhirdhyānagamyaṃ\nvande viṣṇuṃ bhavabhayaharaṃ sarvalokaikanātham',
        meaning:
          'Of peaceful form, reclining on the serpent, lotus-naveled, lord of the gods; support of the universe, vast as the sky, cloud-dark, auspicious-limbed; beloved of Lakshmi, lotus-eyed, reached by yogis in meditation — I bow to Vishnu, remover of the fear of existence, sole lord of all worlds.',
      },
    ],
  },
  {
    id: 'achyutam-keshavam',
    title: 'Achyutam Keshavam',
    deity: 'Krishna',
    category: 'Stotra',
    occasion: 'Daily devotional singing; Ekadashi; evenings',
    about:
      'A simple, beloved verse of names — Achyuta, Keshava, Rama, Narayana, Krishna, Damodara — sung as a bhajan across India. Repeating the names with affection is itself the practice; no ritual is required.',
    complete: true,
    verses: [
      {
        sanskrit: 'अच्युतं केशवं रामनारायणं\nकृष्णदामोदरं वासुदेवं हरिम्।\nश्रीधरं माधवं गोपिकावल्लभं\nजानकीनायकं रामचन्द्रं भजे॥',
        iast: 'Acyutaṃ keśavaṃ rāmanārāyaṇaṃ\nkṛṣṇadāmodaraṃ vāsudevaṃ harim\nśrīdharaṃ mādhavaṃ gopikāvallabhaṃ\njānakīnāyakaṃ rāmacandraṃ bhaje',
        meaning:
          'I worship Achyuta the unfallen, Keshava, Rama, Narayana; Krishna, Damodara, Vasudeva, Hari; Shridhara, Madhava, beloved of the gopis; the lord of Janaki — Ramachandra.',
      },
    ],
  },
  {
    id: 'madhura-ashtakam',
    title: 'Madhurashtakam',
    deity: 'Krishna',
    category: 'Stotra',
    occasion: 'Janmashtami; daily Krishna bhakti; mornings',
    composer: 'Vallabhacharya',
    about:
      'Eight verses by Vallabhacharya (1479–1531) with a single refrain: everything about the Lord of Sweetness is sweet — his lips, his walk, his flute, even his dust. The hymn does not argue or ask; it simply savours. Sung in the Pushtimarga tradition every morning.',
    complete: true,
    verses: [
      {
        sanskrit: 'अधरं मधुरं वदनं मधुरं नयनं मधुरं हसितं मधुरम्।\nहृदयं मधुरं गमनं मधुरं मधुराधिपतेरखिलं मधुरम्॥',
        iast: 'Adharaṃ madhuraṃ vadanaṃ madhuraṃ nayanaṃ madhuraṃ hasitaṃ madhuram\nhṛdayaṃ madhuraṃ gamanaṃ madhuraṃ madhurādhipaterakhilaṃ madhuram',
        meaning:
          'Sweet are his lips, sweet his face, sweet his eyes, sweet his smile; sweet his heart, sweet his gait — everything about the Lord of Sweetness is sweet.',
      },
      {
        sanskrit: 'वचनं मधुरं चरितं मधुरं वसनं मधुरं वलितं मधुरम्।\nचलितं मधुरं भ्रमितं मधुरं मधुराधिपतेरखिलं मधुरम्॥',
        iast: 'Vacanaṃ madhuraṃ caritaṃ madhuraṃ vasanaṃ madhuraṃ valitaṃ madhuram\ncalitaṃ madhuraṃ bhramitaṃ madhuraṃ madhurādhipaterakhilaṃ madhuram',
        meaning:
          'Sweet his speech, sweet his deeds, sweet his garments, sweet his posture; sweet his movements, sweet even his wandering — everything about the Lord of Sweetness is sweet.',
      },
      {
        sanskrit: 'वेणुर्मधुरो रेणुर्मधुरः पाणिर्मधुरः पादौ मधुरौ।\nनृत्यं मधुरं सख्यं मधुरं मधुराधिपतेरखिलं मधुरम्॥',
        iast: 'Veṇurmadhuro reṇurmadhuraḥ pāṇirmadhuraḥ pādau madhurau\nnṛtyaṃ madhuraṃ sakhyaṃ madhuraṃ madhurādhipaterakhilaṃ madhuram',
        meaning:
          'Sweet is his flute, sweet the dust of his feet, sweet his hands, sweet his feet; sweet his dance, sweet his friendship — everything about the Lord of Sweetness is sweet.',
      },
      {
        sanskrit: 'गीतं मधुरं पीतं मधुरं भुक्तं मधुरं सुप्तं मधुरम्।\nरूपं मधुरं तिलकं मधुरं मधुराधिपतेरखिलं मधुरम्॥',
        iast: 'Gītaṃ madhuraṃ pītaṃ madhuraṃ bhuktaṃ madhuraṃ suptaṃ madhuram\nrūpaṃ madhuraṃ tilakaṃ madhuraṃ madhurādhipaterakhilaṃ madhuram',
        meaning:
          'Sweet his song, sweet his drinking, sweet his eating, sweet his sleep; sweet his form, sweet his tilaka — everything about the Lord of Sweetness is sweet.',
      },
      {
        sanskrit: 'करणं मधुरं तरणं मधुरं हरणं मधुरं रमणं मधुरम्।\nवमितं मधुरं शमितं मधुरं मधुराधिपतेरखिलं मधुरम्॥',
        iast: 'Karaṇaṃ madhuraṃ taraṇaṃ madhuraṃ haraṇaṃ madhuraṃ ramaṇaṃ madhuram\nvamitaṃ madhuraṃ śamitaṃ madhuraṃ madhurādhipaterakhilaṃ madhuram',
        meaning:
          'Sweet his doing, sweet his crossing the river, sweet his stealing, sweet his love-play; sweet his utterance, sweet his stillness — everything about the Lord of Sweetness is sweet.',
      },
      {
        sanskrit: 'गुञ्जा मधुरा माला मधुरा यमुना मधुरा वीची मधुरा।\nसलिलं मधुरं कमलं मधुरं मधुराधिपतेरखिलं मधुरम्॥',
        iast: 'Guñjā madhurā mālā madhurā yamunā madhurā vīcī madhurā\nsalilaṃ madhuraṃ kamalaṃ madhuraṃ madhurādhipaterakhilaṃ madhuram',
        meaning:
          'Sweet his gunja-berry necklace, sweet his garland, sweet the Yamuna, sweet her ripples; sweet her water, sweet the lotuses — everything about the Lord of Sweetness is sweet.',
      },
      {
        sanskrit: 'गोपी मधुरा लीला मधुरा युक्तं मधुरं मुक्तं मधुरम्।\nदृष्टं मधुरं शिष्टं मधुरं मधुराधिपतेरखिलं मधुरम्॥',
        iast: 'Gopī madhurā līlā madhurā yuktaṃ madhuraṃ muktaṃ madhuram\ndṛṣṭaṃ madhuraṃ śiṣṭaṃ madhuraṃ madhurādhipaterakhilaṃ madhuram',
        meaning:
          'Sweet are the gopis, sweet his lila, sweet his union, sweet his letting-go; sweet his glance, sweet his courtesy — everything about the Lord of Sweetness is sweet.',
      },
      {
        sanskrit: 'गोपा मधुरा गावो मधुरा यष्टिर्मधुरा सृष्टिर्मधुरा।\nदलितं मधुरं फलितं मधुरं मधुराधिपतेरखिलं मधुरम्॥',
        iast: 'Gopā madhurā gāvo madhurā yaṣṭirmadhurā sṛṣṭirmadhurā\ndalitaṃ madhuraṃ phalitaṃ madhuraṃ madhurādhipaterakhilaṃ madhuram',
        meaning:
          'Sweet the cowherds, sweet the cows, sweet his staff, sweet his creation; sweet his trampling, sweet his bearing fruit — everything about the Lord of Sweetness is sweet.',
      },
    ],
  },
  {
    id: 'vasudeva-sutam',
    title: 'Vasudeva Sutam (Krishna Vandana)',
    deity: 'Krishna',
    category: 'Mantra',
    occasion: 'Before Krishna puja; Janmashtami; Gita reading',
    about:
      'The invocation verse recited before reading the Bhagavad Gita and at the start of Krishna worship. In two lines it holds Krishna\'s whole story: son of Vasudeva, destroyer of Kamsa and Chanura, joy of Devaki — the guru of the world.',
    complete: true,
    verses: [
      {
        sanskrit: 'वसुदेवसुतं देवं कंसचाणूरमर्दनम्।\nदेवकीपरमानन्दं कृष्णं वन्दे जगद्गुरुम्॥',
        iast: 'Vasudevasutaṃ devaṃ kaṃsacāṇūramardanam\ndevakīparamānandaṃ kṛṣṇaṃ vande jagadgurum',
        meaning:
          'To the divine son of Vasudeva, crusher of Kamsa and Chanura, supreme joy of Devaki — I bow to Krishna, the guru of the world.',
      },
    ],
  },
  {
    id: 'govinda-ashtakam',
    title: 'Govindashtakam',
    deity: 'Krishna',
    category: 'Stotra',
    occasion: 'Janmashtami; Ekadashi; daily Krishna puja',
    composer: 'Adi Shankaracharya',
    about:
      'Eight verses by Shankaracharya that hold Krishna\'s paradox in every line: the absolute Brahman who is also the butter-thief of Gokula, the infinite who showed the universe inside a child\'s mouth. Each verse ends "worship Govinda, the supreme bliss."',
    complete: true,
    verses: [
      {
        sanskrit: 'सत्यं ज्ञानमनन्तं नित्यमनाकाशं परमाकाशं\nगोष्ठप्राङ्गणरिङ्खणलोलमनायासं परमायासम्।\nमायाकल्पितनानाकारमनाकारं भुवनाकारं\nक्ष्मामानाथमनाथं प्रणमत गोविन्दं परमानन्दम्॥',
        iast: 'Satyaṃ jñānamanantaṃ nityamanākāśaṃ paramākāśaṃ\ngoṣṭhaprāṅgaṇariṅkhaṇalolamanāyāsaṃ paramāyāsam\nmāyākalpitanānākāramanākāraṃ bhuvanākāraṃ\nkṣmāmānāthamanāthaṃ praṇamata govindaṃ paramānandam',
        meaning:
          'Truth, knowledge, infinite and eternal, beyond space yet the supreme space; toddling playfully in the cowshed courtyard, effortless yet the ground of every effort; formless, yet through maya wearing countless forms, the very shape of the worlds; lord of the earth, himself without a master — bow to Govinda, the supreme bliss.',
      },
      {
        sanskrit: 'मृत्स्नामत्सीहेति यशोदाताडनशैशव सन्त्रासं\nव्यादितवक्त्रालोकितलोकालोकचतुर्दशलोकालिम्।\nलोकत्रयपुरमूलस्तम्भं लोकालोकमनालोकं\nलोकेशं परमेशं प्रणमत गोविन्दं परमानन्दम्॥',
        iast: 'Mṛtsnāmatsīheti yaśodātāḍanaśaiśava santrāsaṃ\nvyāditavaktrālokitalokālokacaturdaśalokālim\nlokatrayapuramūlastambhaṃ lokālokamanālokaṃ\nlokeśaṃ parameśaṃ praṇamata govindaṃ paramānandam',
        meaning:
          '"Have you eaten mud?" — scolded by Yashoda, the child feigned fear, then opened his mouth and showed her all fourteen worlds ringed by the Lokaloka mountains. Pillar of the three worlds, light beyond the visible and invisible, lord of the worlds, supreme lord — bow to Govinda, the supreme bliss.',
      },
      {
        sanskrit: 'त्रैविष्टपरिपुवीरघ्नं क्षितिभारघ्नं भवरोगघ्नं\nकैवल्यं नवनीताहारमनाहारं भुवनाहारम्।\nवैमल्यस्फुटचेतोवृत्तिविशेषाभासमनाभासं\nशैवं केवलशान्तं प्रणमत गोविन्दं परमानन्दम्॥',
        iast: 'Traiviṣṭaparipuvīraghnaṃ kṣitibhāraghnaṃ bhavarogaghnaṃ\nkaivalyaṃ navanītāhāramanāhāraṃ bhuvanāhāram\nvaimalyasphuṭacetovṛttiviśeṣābhāsamanābhāsaṃ\nśaivaṃ kevalaśāntaṃ praṇamata govindaṃ paramānandam',
        meaning:
          'Slayer of the heroes who opposed the gods, remover of the earth\'s burden, healer of the disease of existence; liberation itself, the butter-eater who needs no food yet consumes the worlds; shining in pure minds yet beyond all appearance, auspicious, utterly at peace — bow to Govinda, the supreme bliss.',
      },
      {
        sanskrit: 'गोपालं भूलीलाविग्रहगोपालं कुलगोपालं\nगोपीखेलनगोवर्धनधृतिलीलालालितगोपालम्।\nगोभिर्निगदितगोविन्दस्फुटनामानं बहुनामानं\nगोधीगोचरदूरं प्रणमत गोविन्दं परमानन्दम्॥',
        iast: 'Gopālaṃ bhūlīlāvigrahagopālaṃ kulagopālaṃ\ngopīkhelanagovardhanadhṛtilīlālālitagopālam\ngobhirnigaditagovindasphuṭanāmānaṃ bahunāmānaṃ\ngodhīgocaradūraṃ praṇamata govindaṃ paramānandam',
        meaning:
          'The cowherd who took form to play on earth, protector of his clan; caressed in the play of the gopis and in lifting Govardhana; the one whose clear name "Govinda" the very cows proclaim, he of many names, beyond the reach of speech and mind — bow to Govinda, the supreme bliss.',
      },
      {
        sanskrit: 'गोपीमण्डलगोष्ठीभेदं भेदावस्थमभेदाभं\nशश्वद्गोखुरनिर्धूतोद्धतधूलीधूसरसौभाग्यम्।\nश्रद्धाभक्तिगृहीतानन्दमचिन्त्यं चिन्तितसद्भावं\nचिन्तामणिमहिमानं प्रणमत गोविन्दं परमानन्दम्॥',
        iast: 'Gopīmaṇḍalagoṣṭhībhedaṃ bhedāvasthamabhedābhaṃ\nśaśvadgokhuranirdhūtoddhatadhūlīdhūsarasaubhāgyam\nśraddhābhaktigṛhītānandamacintyaṃ cintitasadbhāvaṃ\ncintāmaṇimahimānaṃ praṇamata govindaṃ paramānandam',
        meaning:
          'Dancing separately in every circle of gopis yet undivided; his beauty greyed by the dust forever kicked up by the cows\' hooves; bliss grasped only through faith and devotion, unthinkable, yet real to all who think of him — his glory a wish-fulfilling gem — bow to Govinda, the supreme bliss.',
      },
      {
        sanskrit: 'स्नानव्यासक्तशिखिनीचैलमुपादायागमुपारूढं\nव्यादित्सन्तीरथ दिग्वस्त्रा दातुमुपाकर्षन्तं ताः।\nनिर्धूतद्वयशोकविमोहं बुद्धं बुद्धेरन्तःस्थं\nसत्तामात्रशरीरं प्रणमत गोविन्दं परमानन्दम्॥',
        iast: 'Snānavyāsaktaśikhinīcailamupādāyāgamupārūḍhaṃ\nvyāditsantīratha digvastrā dātumupākarṣantaṃ tāḥ\nnirdhūtadvayaśokavimohaṃ buddhaṃ buddherantaḥsthaṃ\nsattāmātraśarīraṃ praṇamata govindaṃ paramānandam',
        meaning:
          'He who took the garments of the bathing gopis into the tree and, as they pleaded, drew them beyond all shame of duality — shaker-off of grief and delusion, the awakened one dwelling within the intellect, whose body is pure being — bow to Govinda, the supreme bliss.',
      },
      {
        sanskrit: 'कान्तं कारणकारणमादिमनादिं कालघनाभासं\nकालिन्दीगतकालियशिरसि सुनृत्यन्तं मुहुरत्यन्तम्।\nकालं कालकलातीतं कलितारोषं कलिदोषघ्नं\nकालत्रयगतिहेतुं प्रणमत गोविन्दं परमानन्दम्॥',
        iast: 'Kāntaṃ kāraṇakāraṇamādimanādiṃ kālaghanābhāsaṃ\nkālindīgatakāliyaśirasi sunṛtyantaṃ muhuratyantam\nkālaṃ kālakalātītaṃ kalitāroṣaṃ kalidoṣaghnaṃ\nkālatrayagatihetuṃ praṇamata govindaṃ paramānandam',
        meaning:
          'The beloved, cause of all causes, the first yet beginningless, dark-lustred as a rain cloud; dancing again and again on the hoods of Kaliya in the Yamuna; time itself yet beyond time\'s divisions, destroyer of the faults of the Kali age, mover of past, present and future — bow to Govinda, the supreme bliss.',
      },
      {
        sanskrit: 'वृन्दावनभुवि वृन्दारकगणवृन्दाराधितवन्द्यायां\nकुन्दाभामलमन्दस्मेरसुधानन्दं सुहृदानन्दम्।\nवन्द्याशेषमहामुनिमानसवन्द्यानन्दपदद्वन्द्वं\nवन्द्याशेषगुणाब्धिं प्रणमत गोविन्दं परमानन्दम्॥',
        iast: 'Vṛndāvanabhuvi vṛndārakagaṇavṛndārādhitavandyāyāṃ\nkundābhāmalamandasmerasudhānandaṃ suhṛdānandam\nvandyāśeṣamahāmunimānasavandyānandapadadvandvaṃ\nvandyāśeṣaguṇābdhiṃ praṇamata govindaṃ paramānandam',
        meaning:
          'In the land of Vrindavana, worshipped by the assembled hosts of gods; his gentle jasmine-white smile raining nectar, the joy of his friends; his blissful feet honoured in the hearts of all great sages, an ocean of adorable virtues — bow to Govinda, the supreme bliss.',
      },
    ],
  },
  {
    id: 'vishnu-aarti',
    title: 'Om Jai Jagdish Hare (Aarti)',
    deity: 'Vishnu',
    category: 'Aarti',
    occasion: 'Evening aarti; puja completion; Ekadashi; Satyanarayan Puja',
    composer: 'Shardha Ram Phillauri',
    about:
      'The most widely sung Hindi aarti, composed in the 1870s by Shardha Ram Phillauri. Sung with the lamp at the close of worship in homes and temples across the world, it asks the Lord of the Universe to remove suffering in a moment.',
    complete: true,
    verses: [
      {
        sanskrit: 'ॐ जय जगदीश हरे, स्वामी जय जगदीश हरे।\nभक्त जनों के संकट, क्षण में दूर करे॥',
        iast: 'Oṃ jaya jagadīśa hare, svāmī jaya jagadīśa hare\nbhakta janoṃ ke saṃkaṭa, kṣaṇa meṃ dūra kare',
        meaning:
          'Om, victory to the Lord of the Universe, Hari — who removes the troubles of his devotees in an instant.',
        label: 'Refrain',
      },
      {
        sanskrit: 'जो ध्यावे फल पावे, दुःख बिनसे मन का।\nसुख सम्पत्ति घर आवे, कष्ट मिटे तन का॥',
        iast: 'Jo dhyāve phala pāve, duḥkha binase mana kā\nsukha sampatti ghara āve, kaṣṭa miṭe tana kā',
        meaning:
          'Whoever meditates on you receives the fruit; the mind\'s sorrow is destroyed, happiness and prosperity enter the home, and the body\'s pain is erased.',
      },
      {
        sanskrit: 'मात पिता तुम मेरे, शरण गहूँ मैं किसकी।\nतुम बिन और न दूजा, आस करूँ मैं जिसकी॥',
        iast: 'Māta pitā tuma mere, śaraṇa gahūṃ maiṃ kisakī\ntuma bina aura na dūjā, āsa karūṃ maiṃ jisakī',
        meaning:
          'You are my mother and my father — whose shelter could I take? Without you there is no other in whom I place hope.',
      },
      {
        sanskrit: 'तुम पूरण परमात्मा, तुम अन्तर्यामी।\nपारब्रह्म परमेश्वर, तुम सबके स्वामी॥',
        iast: 'Tuma pūraṇa paramātmā, tuma antaryāmī\npārabrahma parameśvara, tuma sabake svāmī',
        meaning:
          'You are the complete Supreme Soul, the inner witness of all; the transcendent Brahman, the highest lord, master of everyone.',
      },
      {
        sanskrit: 'तुम करुणा के सागर, तुम पालनकर्ता।\nमैं मूरख खल कामी, कृपा करो भर्ता॥',
        iast: 'Tuma karuṇā ke sāgara, tuma pālanakartā\nmaiṃ mūrakha khala kāmī, kṛpā karo bhartā',
        meaning:
          'You are the ocean of compassion, the sustainer. I am foolish, wicked and full of craving — have mercy on me, O protector.',
      },
      {
        sanskrit: 'तुम हो एक अगोचर, सबके प्राणपति।\nकिस विधि मिलूँ दयामय, तुमको मैं कुमति॥',
        iast: 'Tuma ho eka agocara, sabake prāṇapati\nkisa vidhi milūṃ dayāmaya, tumako maiṃ kumati',
        meaning:
          'You are the one unseen, lord of every breath of life. By what means shall I, dull-witted, reach you, O merciful one?',
      },
      {
        sanskrit: 'दीनबन्धु दुखहर्ता, ठाकुर तुम मेरे।\nअपने हाथ उठाओ, द्वार पड़ा तेरे॥',
        iast: 'Dīnabandhu dukhahartā, ṭhākura tuma mere\napane hātha uṭhāo, dvāra paṛā tere',
        meaning:
          'Friend of the lowly, remover of sorrow — you are my master. Raise your hand in blessing; I lie at your door.',
      },
      {
        sanskrit: 'विषय विकार मिटाओ, पाप हरो देवा।\nश्रद्धा भक्ति बढ़ाओ, सन्तन की सेवा॥',
        iast: 'Viṣaya vikāra miṭāo, pāpa haro devā\nśraddhā bhakti baṛhāo, santana kī sevā',
        meaning:
          'Erase craving and vice, take away sin, O Lord; increase my faith and devotion, and my service of the saints.',
      },
    ],
  },
  {
    id: 'purusha-suktam',
    title: 'Purusha Suktam',
    deity: 'Vishnu',
    category: 'Vedic',
    occasion: 'Major pujas; homam; Vedic ritual',
    about:
      'Rigveda 10.90 — the hymn of the Cosmic Person from whom the universe unfolds. The gods perform the primal sacrifice with the Purusha himself as offering, and from him come the moon and sun, sky and earth, and the whole of society. Key mantras of the sixteen are given here.',
    complete: false,
    note: '8 of 16 riks',
    verses: [
      {
        sanskrit: 'ॐ सहस्रशीर्षा पुरुषः सहस्राक्षः सहस्रपात्।\nस भूमिं विश्वतो वृत्वाऽत्यतिष्ठद्दशाङ्गुलम्॥',
        iast: 'Oṃ sahasraśīrṣā puruṣaḥ sahasrākṣaḥ sahasrapāt\nsa bhūmiṃ viśvato vṛtvā\'tyatiṣṭhaddaśāṅgulam',
        meaning:
          'The Purusha has a thousand heads, a thousand eyes, a thousand feet. Enveloping the earth on every side, he extends ten fingers beyond it.',
      },
      {
        sanskrit: 'पुरुष एवेदं सर्वं यद्भूतं यच्च भव्यम्।\nउतामृतत्वस्येशानो यदन्नेनातिरोहति॥',
        iast: 'Puruṣa evedaṃ sarvaṃ yadbhūtaṃ yacca bhavyam\nutāmṛtatvasyeśāno yadannenātirohati',
        meaning:
          'The Purusha alone is all this — what has been and what will be. He is the lord of immortality, and of all that grows by food.',
      },
      {
        sanskrit: 'एतावानस्य महिमातो ज्यायाँश्च पूरुषः।\nपादोऽस्य विश्वा भूतानि त्रिपादस्यामृतं दिवि॥',
        iast: 'Etāvānasya mahimāto jyāyāṃśca pūruṣaḥ\npādo\'sya viśvā bhūtāni tripādasyāmṛtaṃ divi',
        meaning:
          'Such is his greatness — and the Purusha is greater still. All beings are a quarter of him; three immortal quarters rest in heaven.',
      },
      {
        sanskrit: 'यत्पुरुषेण हविषा देवा यज्ञमतन्वत।\nवसन्तो अस्यासीदाज्यं ग्रीष्म इध्मः शरद्धविः॥',
        iast: 'Yatpuruṣeṇa haviṣā devā yajñamatanvata\nvasanto asyāsīdājyaṃ grīṣma idhmaḥ śaraddhaviḥ',
        meaning:
          'When the gods spread the sacrifice with the Purusha as the offering, spring was its ghee, summer the fuel, autumn the oblation.',
      },
      {
        sanskrit: 'तं यज्ञं बर्हिषि प्रौक्षन् पुरुषं जातमग्रतः।\nतेन देवा अयजन्त साध्या ऋषयश्च ये॥',
        iast: 'Taṃ yajñaṃ barhiṣi praukṣan puruṣaṃ jātamagrataḥ\ntena devā ayajanta sādhyā ṛṣayaśca ye',
        meaning:
          'On the sacred grass they consecrated the Purusha, born at the beginning, as the sacrifice; with him the gods, the Sadhyas and the rishis performed the rite.',
      },
      {
        sanskrit: 'चन्द्रमा मनसो जातश्चक्षोः सूर्यो अजायत।\nमुखादिन्द्रश्चाग्निश्च प्राणाद्वायुरजायत॥',
        iast: 'Candramā manaso jātaścakṣoḥ sūryo ajāyata\nmukhādindraścāgniśca prāṇādvāyurajāyata',
        meaning:
          'From his mind the moon was born; from his eye, the sun; from his mouth, Indra and Agni; from his breath, the wind.',
      },
      {
        sanskrit: 'नाभ्या आसीदन्तरिक्षं शीर्ष्णो द्यौः समवर्तत।\nपद्भ्यां भूमिर्दिशः श्रोत्रात्तथा लोकाँ अकल्पयन्॥',
        iast: 'Nābhyā āsīdantarikṣaṃ śīrṣṇo dyauḥ samavartata\npadbhyāṃ bhūmirdiśaḥ śrotrāttathā lokāṃ akalpayan',
        meaning:
          'From his navel came the mid-air; from his head the sky took shape; from his feet the earth, from his ear the directions — thus the worlds were fashioned.',
      },
      {
        sanskrit: 'वेदाहमेतं पुरुषं महान्तम्। आदित्यवर्णं तमसस्तु पारे।\nसर्वाणि रूपाणि विचित्य धीरः। नामानि कृत्वाऽभिवदन् यदास्ते॥',
        iast: 'Vedāhametaṃ puruṣaṃ mahāntam ādityavarṇaṃ tamasastu pāre\nsarvāṇi rūpāṇi vicitya dhīraḥ nāmāni kṛtvā\'bhivadan yadāste',
        meaning:
          'I know this great Purusha, sun-coloured, beyond darkness. The wise one who fashioned all forms and gave them names abides, calling them forth.',
      },
    ],
  },
  {
    id: 'ram-raksha-stotra',
    title: 'Ram Raksha Stotra',
    deity: 'Rama',
    category: 'Stotra',
    occasion: 'Daily morning; before travel; Rama Navami',
    composer: 'Budha Kaushika',
    about:
      'The "armour of Rama," revealed to the sage Budha Kaushika by Shiva in a dream. Its kavacha section places Rama\'s protection limb by limb over the body; households recite it every morning, and especially through the Chaitra Navratri leading to Rama Navami. Key verses given here.',
    complete: false,
    note: '5 of 38 verses',
    verses: [
      {
        sanskrit: 'चरितं रघुनाथस्य शतकोटिप्रविस्तरम्।\nएकैकमक्षरं पुंसां महापातकनाशनम्॥',
        iast: 'Caritaṃ raghunāthasya śatakoṭipravistaram\nekaikamakṣaraṃ puṃsāṃ mahāpātakanāśanam',
        meaning:
          'The story of the Lord of the Raghus extends over a billion verses — and every single syllable of it destroys the greatest of sins.',
      },
      {
        sanskrit: 'ध्यात्वा नीलोत्पलश्यामं रामं राजीवलोचनम्।\nजानकीलक्ष्मणोपेतं जटामुकुटमण्डितम्॥',
        iast: 'Dhyātvā nīlotpalaśyāmaṃ rāmaṃ rājīvalocanam\njānakīlakṣmaṇopetaṃ jaṭāmukuṭamaṇḍitam',
        meaning:
          'Meditate on Rama, dark as the blue lotus, lotus-eyed, accompanied by Janaki and Lakshmana, adorned with matted locks for a crown.',
      },
      {
        sanskrit: 'शिरो मे राघवः पातु भालं दशरथात्मजः।\nकौसल्येयो दृशौ पातु विश्वामित्रप्रियः श्रुती॥',
        iast: 'Śiro me rāghavaḥ pātu bhālaṃ daśarathātmajaḥ\nkausalyeyo dṛśau pātu viśvāmitrapriyaḥ śrutī',
        meaning:
          'May Raghava guard my head; the son of Dasharatha, my brow; Kausalya\'s son, my eyes; the beloved of Vishvamitra, my ears.',
        label: 'Kavacha',
      },
      {
        sanskrit: 'रामो राजमणिः सदा विजयते रामं रमेशं भजे\nरामेणाभिहता निशाचरचमू रामाय तस्मै नमः।\nरामान्नास्ति परायणं परतरं रामस्य दासोऽस्म्यहं\nरामे चित्तलयः सदा भवतु मे भो राम मामुद्धर॥',
        iast: 'Rāmo rājamaṇiḥ sadā vijayate rāmaṃ rameśaṃ bhaje\nrāmeṇābhihatā niśācaracamū rāmāya tasmai namaḥ\nrāmānnāsti parāyaṇaṃ parataraṃ rāmasya dāso\'smyahaṃ\nrāme cittalayaḥ sadā bhavatu me bho rāma māmuddhara',
        meaning:
          'Rama, jewel of kings, is ever victorious; I worship Rama, Lakshmi\'s lord; by Rama the armies of night-wanderers were destroyed; to that Rama, salutations. There is no refuge higher than Rama; I am Rama\'s servant; may my mind ever rest in Rama — O Rama, lift me up. (One verse holding all eight grammatical cases of the name.)',
      },
      {
        sanskrit: 'राम रामेति रामेति रमे रामे मनोरमे।\nसहस्रनाम तत्तुल्यं रामनाम वरानने॥',
        iast: 'Rāma rāmeti rāmeti rame rāme manorame\nsahasranāma tattulyaṃ rāmanāma varānane',
        meaning:
          '"Rama, Rama, Rama" — thus I delight in the beautiful name of Rama. O fair-faced one (says Shiva to Parvati), the single name of Rama equals the thousand names of Vishnu.',
      },
    ],
  },
  {
    id: 'aditya-hridayam',
    title: 'Aditya Hridayam',
    deity: 'Surya',
    category: 'Stotra',
    occasion: 'Sunday mornings; before difficult undertakings',
    composer: 'Sage Agastya (Valmiki Ramayana)',
    about:
      'From the Yuddha Kanda of the Ramayana: with Rama weary on the battlefield before Ravana, the sage Agastya teaches him this "heart of the Sun" — the hymn that dispels all enemies and anxieties. It is recited on Sundays and before any daunting task. Key verses given here.',
    complete: false,
    note: '6 of 31 verses',
    verses: [
      {
        sanskrit: 'ततो युद्धपरिश्रान्तं समरे चिन्तया स्थितम्।\nरावणं चाग्रतो दृष्ट्वा युद्धाय समुपस्थितम्॥',
        iast: 'Tato yuddhapariśrāntaṃ samare cintayā sthitam\nrāvaṇaṃ cāgrato dṛṣṭvā yuddhāya samupasthitam',
        meaning:
          'Then, seeing Rama exhausted by battle and standing in anxious thought, with Ravana arrayed before him ready for war —',
      },
      {
        sanskrit: 'दैवतैश्च समागम्य द्रष्टुमभ्यागतो रणम्।\nउपागम्याब्रवीद्राममगस्त्यो भगवान् ऋषिः॥',
        iast: 'Daivataiśca samāgamya draṣṭumabhyāgato raṇam\nupāgamyābravīdrāmamagastyo bhagavān ṛṣiḥ',
        meaning:
          '— the blessed sage Agastya, who had come with the gods to witness the battle, approached Rama and spoke.',
      },
      {
        sanskrit: 'राम राम महाबाहो शृणु गुह्यं सनातनम्।\nयेन सर्वानरीन् वत्स समरे विजयिष्यसि॥',
        iast: 'Rāma rāma mahābāho śṛṇu guhyaṃ sanātanam\nyena sarvānarīn vatsa samare vijayiṣyasi',
        meaning:
          '"Rama, Rama, mighty-armed — hear this eternal secret, my child, by which you will conquer every enemy in battle.',
      },
      {
        sanskrit: 'आदित्यहृदयं पुण्यं सर्वशत्रुविनाशनम्।\nजयावहं जपेन्नित्यम् अक्षय्यं परमं शिवम्॥',
        iast: 'Ādityahṛdayaṃ puṇyaṃ sarvaśatruvināśanam\njayāvahaṃ japennityam akṣayyaṃ paramaṃ śivam',
        meaning:
          'It is the holy Heart of the Sun, destroyer of all enemies, bringer of victory — recite it always; it is inexhaustible, supremely auspicious.',
      },
      {
        sanskrit: 'सर्वमङ्गलमाङ्गल्यं सर्वपापप्रणाशनम्।\nचिन्ताशोकप्रशमनम् आयुर्वर्धनमुत्तमम्॥',
        iast: 'Sarvamaṅgalamāṅgalyaṃ sarvapāpapraṇāśanam\ncintāśokapraśamanam āyurvardhanamuttamam',
        meaning:
          'It is the blessing of all blessings, the destroyer of all sin, the queller of anxiety and grief, and the best increaser of life.',
      },
      {
        sanskrit: 'जयदेव जगन्नाथ जयत्रैलोक्यभास्कर।\nएतत् त्रिगुणितं जप्त्वा युद्धेषु विजयिष्यसि॥',
        iast: 'Jayadeva jagannātha jayatrailokyabhāskara\netat triguṇitaṃ japtvā yuddheṣu vijayiṣyasi',
        meaning:
          'Salute the Sun — lord of the universe, illuminator of the three worlds. Reciting this three times, you will be victorious in battle." Rama did so, and slew Ravana.',
      },
    ],
  },
  {
    id: 'narayana-kavacham',
    title: 'Narayana Kavacham (Essence)',
    deity: 'Vishnu',
    category: 'Stotra',
    occasion: 'Protection; travel; times of danger',
    about:
      'The essence-verse of the great protective armour from the Bhagavata Purana (6.8), taught by Vishvarupa to Indra. The full kavacha invokes each avatar to guard a direction and hour; this core verse places the Lord\'s protection everywhere at once.',
    complete: true,
    verses: [
      {
        sanskrit: 'ॐ हरिर्विदध्यान्मम सर्वरक्षां न्यस्ताङ्घ्रिपद्मः पतगेन्द्रपृष्ठे।\nदरारिचर्मासिगदेषुचापपाशान् दधानोऽष्टगुणोऽष्टबाहुः॥',
        iast: 'Oṃ harirvidadhyānmama sarvarakṣāṃ nyastāṅghripadmaḥ patagendrapṛṣṭhe\ndarāricarmāsigadeṣucāpapāśān dadhāno\'ṣṭaguṇo\'ṣṭabāhuḥ',
        meaning:
          'May Hari, his lotus feet resting on the back of Garuda king of birds, grant me complete protection — eight-armed, endowed with the eight powers, bearing conch, discus, shield, sword, mace, arrows, bow and noose.',
      },
    ],
  },
];
