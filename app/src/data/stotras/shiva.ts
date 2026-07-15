import type { Stotra } from './types';

export const SHIVA_STOTRAS: Stotra[] = [
  {
    id: 'shiva-mahamrityunjaya',
    title: 'Mahamrityunjaya Mantra',
    deity: 'Shiva',
    category: 'Mantra',
    occasion: 'Daily; during illness or fear; Pradosh; Monday mornings',
    about:
      'The "great death-conquering" mantra from the Rigveda (7.59.12), addressed to Rudra as Tryambaka, the three-eyed one. It is chanted for healing, protection and fearlessness — traditionally 108 times during illness or before surgery, and daily for longevity.',
    complete: true,
    verses: [
      {
        sanskrit: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्।\nउर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय माऽमृतात्॥',
        iast: 'Oṃ tryambakaṃ yajāmahe sugandhiṃ puṣṭivardhanam\nurvārukamiva bandhanān mṛtyormukṣīya māmṛtāt',
        meaning:
          'We worship the three-eyed one, fragrant, who nourishes all beings. As the ripe cucumber slips free of its vine, may he release us from death — but not from immortality.',
      },
    ],
  },
  {
    id: 'shiva-panchakshara',
    title: 'Shiva Panchakshara Stotra',
    deity: 'Shiva',
    category: 'Stotra',
    occasion: 'Daily; Mahashivaratri; Mondays; Pradosh',
    composer: 'Adi Shankaracharya',
    about:
      'Five verses, each built on one syllable of the five-syllable mantra Na-Ma-Shi-Va-Ya. Chanting it is held equal to repeating "Namah Shivaya" itself; the phala-shruti promises the company of Shiva to whoever recites it near a Shivalinga.',
    complete: true,
    verses: [
      {
        sanskrit: 'नागेन्द्रहाराय त्रिलोचनाय भस्माङ्गरागाय महेश्वराय।\nनित्याय शुद्धाय दिगम्बराय तस्मै नकाराय नमः शिवाय॥',
        iast: 'Nāgendrahārāya trilocanāya bhasmāṅgarāgāya maheśvarāya\nnityāya śuddhāya digambarāya tasmai nakārāya namaḥ śivāya',
        meaning:
          'To him who wears the king of serpents as a garland, three-eyed, his body anointed with sacred ash, the great lord — eternal, pure, clothed in the directions themselves — to that Shiva embodied in the syllable "Na", salutations.',
        label: 'न — Na',
      },
      {
        sanskrit: 'मन्दाकिनीसलिलचन्दनचर्चिताय नन्दीश्वरप्रमथनाथमहेश्वराय।\nमन्दारपुष्पबहुपुष्पसुपूजिताय तस्मै मकाराय नमः शिवाय॥',
        iast: 'Mandākinīsalilacandanacarcitāya nandīśvarapramathanāthamaheśvarāya\nmandārapuṣpabahupuṣpasupūjitāya tasmai makārāya namaḥ śivāya',
        meaning:
          'To him anointed with Ganga water and sandal paste, lord of Nandi and of the pramatha hosts, worshipped with mandara and countless other flowers — to that Shiva embodied in "Ma", salutations.',
        label: 'म — Ma',
      },
      {
        sanskrit: 'शिवाय गौरीवदनाब्जवृन्दसूर्याय दक्षाध्वरनाशकाय।\nश्रीनीलकण्ठाय वृषभध्वजाय तस्मै शिकाराय नमः शिवाय॥',
        iast: 'Śivāya gaurīvadanābjavṛndasūryāya dakṣādhvaranāśakāya\nśrīnīlakaṇṭhāya vṛṣabhadhvajāya tasmai śikārāya namaḥ śivāya',
        meaning:
          'To the auspicious one, the sun that opens the lotus of Gauri\'s face, destroyer of Daksha\'s sacrifice, the blue-throated, whose banner bears the bull — to that Shiva embodied in "Shi", salutations.',
        label: 'शि — Shi',
      },
      {
        sanskrit: 'वसिष्ठकुम्भोद्भवगौतमार्यमुनीन्द्रदेवार्चितशेखराय।\nचन्द्रार्कवैश्वानरलोचनाय तस्मै वकाराय नमः शिवाय॥',
        iast: 'Vasiṣṭhakumbhodbhavagautamāryamunīndradevārcitaśekharāya\ncandrārkavaiśvānaralocanāya tasmai vakārāya namaḥ śivāya',
        meaning:
          'To him whose crown is honoured by Vasishtha, Agastya, Gautama and the best of sages and gods; whose three eyes are the moon, the sun and fire — to that Shiva embodied in "Va", salutations.',
        label: 'व — Va',
      },
      {
        sanskrit: 'यज्ञस्वरूपाय जटाधराय पिनाकहस्ताय सनातनाय।\nदिव्याय देवाय दिगम्बराय तस्मै यकाराय नमः शिवाय॥',
        iast: 'Yajñasvarūpāya jaṭādharāya pinākahastāya sanātanāya\ndivyāya devāya digambarāya tasmai yakārāya namaḥ śivāya',
        meaning:
          'To him who is the very form of sacrifice, bearer of matted locks, the Pinaka bow in hand, eternal, divine, sky-clad — to that Shiva embodied in "Ya", salutations.',
        label: 'य — Ya',
      },
      {
        sanskrit: 'पञ्चाक्षरमिदं पुण्यं यः पठेच्छिवसन्निधौ।\nशिवलोकमवाप्नोति शिवेन सह मोदते॥',
        iast: 'Pañcākṣaramidaṃ puṇyaṃ yaḥ paṭhecchivasannidhau\nśivalokamavāpnoti śivena saha modate',
        meaning:
          'Whoever recites this holy five-syllable hymn in Shiva\'s presence attains Shiva\'s realm and rejoices there with him.',
        label: 'Phala Shruti',
      },
    ],
  },
  {
    id: 'karpur-gauram',
    title: 'Karpur Gauram',
    deity: 'Shiva',
    category: 'Mantra',
    occasion: 'Aarti closing; every Shiva puja; Mahashivaratri',
    about:
      'The verse sung across India at the end of aarti while the flame is offered. It comes from the tradition of dhyana verses of Shiva and asks that he — compassion incarnate — dwell always in the lotus of the heart, together with Bhavani.',
    complete: true,
    verses: [
      {
        sanskrit: 'कर्पूरगौरं करुणावतारं संसारसारं भुजगेन्द्रहारम्।\nसदावसन्तं हृदयारविन्दे भवं भवानीसहितं नमामि॥',
        iast: 'Karpūragauraṃ karuṇāvatāraṃ saṃsārasāraṃ bhujagendrahāram\nsadāvasantaṃ hṛdayāravinde bhavaṃ bhavānīsahitaṃ namāmi',
        meaning:
          'White as camphor, compassion incarnate, the essence of worldly existence, garlanded with the serpent king — I bow to Bhava, together with Bhavani, who dwells forever in the lotus of the heart.',
      },
    ],
  },
  {
    id: 'shiva-tandav-stotra',
    title: 'Shiva Tandav Stotra',
    deity: 'Shiva',
    category: 'Stotra',
    occasion: 'Mahashivaratri; Mondays; Pradosh; Shravan',
    composer: 'Ravana',
    about:
      'Attributed to Ravana, who is said to have sung it while trapped beneath Mount Kailasha, winning Shiva\'s grace by its sheer rhythmic force. The galloping panchachamara metre imitates the damaru drum of the cosmic Tandava dance. Key verses of the seventeen are given here.',
    complete: false,
    note: '5 of 17 verses',
    verses: [
      {
        sanskrit: 'जटाटवीगलज्जलप्रवाहपावितस्थले\nगलेऽवलम्ब्य लम्बितां भुजङ्गतुङ्गमालिकाम्।\nडमड्डमड्डमड्डमन्निनादवड्डमर्वयं\nचकार चण्डताण्डवं तनोतु नः शिवः शिवम्॥',
        iast: 'Jaṭāṭavīgalajjalapravāhapāvitasthale\ngale\'valambya lambitāṃ bhujaṅgatuṅgamālikām\nḍamaḍḍamaḍḍamaḍḍamanninādavaḍḍamarvayaṃ\ncakāra caṇḍatāṇḍavaṃ tanotu naḥ śivaḥ śivam',
        meaning:
          'On ground hallowed by the Ganga streaming from the forest of his matted locks, the lofty serpent garland swaying at his throat, his damaru resounding damad-damad-damad — Shiva danced the fierce Tandava. May that Shiva extend auspiciousness to us.',
      },
      {
        sanskrit: 'जटाकटाहसम्भ्रमभ्रमन्निलिम्पनिर्झरी-\nविलोलवीचिवल्लरीविराजमानमूर्धनि।\nधगद्धगद्धगज्ज्वलल्ललाटपट्टपावके\nकिशोरचन्द्रशेखरे रतिः प्रतिक्षणं मम॥',
        iast: 'Jaṭākaṭāhasambhramabhramannilimpanirjharī-\nvilolavīcivallarīvirājamānamūrdhani\ndhagaddhagaddhagajjvalallalāṭapaṭṭapāvake\nkiśoracandraśekhare ratiḥ pratikṣaṇaṃ mama',
        meaning:
          'In him whose head is glorified by the tossing waves of the celestial river swirling in the deep vessel of his locks; on whose forehead fire blazes dhagad-dhagad; who wears the young crescent moon as his crest — may my delight rest, moment upon moment.',
      },
      {
        sanskrit: 'सहस्रलोचनप्रभृत्यशेषलेखशेखर-\nप्रसूनधूलिधोरणी विधूसराङ्घ्रिपीठभूः।\nभुजङ्गराजमालया निबद्धजाटजूटकः\nश्रियै चिराय जायतां चकोरबन्धुशेखरः॥',
        iast: 'Sahasralocanaprabhṛtyaśeṣalekhaśekhara-\nprasūnadhūlidhoraṇī vidhūsarāṅghripīṭhabhūḥ\nbhujaṅgarājamālayā nibaddhajāṭajūṭakaḥ\nśriyai cirāya jāyatāṃ cakorabandhuśekharaḥ',
        meaning:
          'His footstool is greyed with pollen dust from the flower-crowned heads of Indra and all the gods who bow there; his matted hair is bound by the garland of the serpent king; the moon — friend of the chakora bird — crowns him. May he grant lasting prosperity.',
      },
      {
        sanskrit: 'जटाभुजङ्गपिङ्गलस्फुरत्फणामणिप्रभा-\nकदम्बकुङ्कुमद्रवप्रलिप्तदिग्वधूमुखे।\nमदान्धसिन्धुरस्फुरत्त्वगुत्तरीयमेदुरे\nमनो विनोदमद्भुतं बिभर्तु भूतभर्तरि॥',
        iast: 'Jaṭābhujaṅgapiṅgalasphuratphaṇāmaṇiprabhā-\nkadambakuṅkumadravapraliptadigvadhūmukhe\nmadāndhasindhurasphurattvaguttarīyamedure\nmano vinodamadbhutaṃ bibhartu bhūtabhartari',
        meaning:
          'The gem-light flashing from the hoods of the serpents in his locks smears the faces of the direction-maidens like liquid kumkum; wrapped in the hide of the intoxicated elephant, he is lord of all beings — in him may my mind find wondrous delight.',
      },
      {
        sanskrit: 'इमं हि नित्यमेवमुक्तमुत्तमोत्तमं स्तवं\nपठन्स्मरन्ब्रुवन्नरो विशुद्धिमेतिसन्ततम्।\nहरे गुरौ सुभक्तिमाशु याति नान्यथा गतिं\nविमोहनं हि देहिनां सुशङ्करस्य चिन्तनम्॥',
        iast: 'Imaṃ hi nityamevamuktamuttamottamaṃ stavaṃ\npaṭhansmaranbruvannaro viśuddhimetisantatam\nhare gurau subhaktimāśu yāti nānyathā gatiṃ\nvimohanaṃ hi dehināṃ suśaṅkarasya cintanam',
        meaning:
          'Whoever reads, remembers or recites this highest of hymns is purified forever and swiftly gains deep devotion to Shiva, the supreme guru — there is no other way; for embodied beings, contemplation of Shankara dissolves all delusion.',
        label: 'Phala Shruti',
      },
    ],
  },
  {
    id: 'lingashtakam',
    title: 'Lingashtakam',
    deity: 'Shiva',
    category: 'Stotra',
    occasion: 'Pradosh; Mahashivaratri; Monday abhishek',
    about:
      'Eight verses in praise of the Shivalinga, each ending in the refrain "tat praṇamāmi sadāśiva liṅgam" — I bow to that Linga of the ever-auspicious. It is sung during abhisheka while water, milk and bel leaves are offered.',
    complete: true,
    verses: [
      {
        sanskrit: 'ब्रह्ममुरारिसुरार्चितलिङ्गं निर्मलभासितशोभितलिङ्गम्।\nजन्मजदुःखविनाशकलिङ्गं तत्प्रणमामि सदाशिवलिङ्गम्॥',
        iast: 'Brahmamurārisurārcitaliṅgaṃ nirmalabhāsitaśobhitaliṅgam\njanmajaduḥkhavināśakaliṅgaṃ tatpraṇamāmi sadāśivaliṅgam',
        meaning:
          'The Linga worshipped by Brahma, Vishnu and the gods, resplendent with stainless light, destroyer of the sorrow born of birth — I bow to that Linga of the ever-auspicious Shiva.',
      },
      {
        sanskrit: 'देवमुनिप्रवरार्चितलिङ्गं कामदहं करुणाकरलिङ्गम्।\nरावणदर्पविनाशनलिङ्गं तत्प्रणमामि सदाशिवलिङ्गम्॥',
        iast: 'Devamunipravarārcitaliṅgaṃ kāmadahaṃ karuṇākaraliṅgam\nrāvaṇadarpavināśanaliṅgaṃ tatpraṇamāmi sadāśivaliṅgam',
        meaning:
          'Worshipped by gods and the best of sages, the burner of Kama, the mine of compassion, the humbler of Ravana\'s pride — I bow to that Linga of Sadashiva.',
      },
      {
        sanskrit: 'सर्वसुगन्धसुलेपितलिङ्गं बुद्धिविवर्धनकारणलिङ्गम्।\nसिद्धसुरासुरवन्दितलिङ्गं तत्प्रणमामि सदाशिवलिङ्गम्॥',
        iast: 'Sarvasugandhasulepitaliṅgaṃ buddhivivardhanakāraṇaliṅgam\nsiddhasurāsuravanditaliṅgaṃ tatpraṇamāmi sadāśivaliṅgam',
        meaning:
          'Anointed with every fragrance, the cause of the growth of wisdom, saluted by siddhas, gods and asuras alike — I bow to that Linga of Sadashiva.',
      },
      {
        sanskrit: 'कनकमहामणिभूषितलिङ्गं फणिपतिवेष्टितशोभितलिङ्गम्।\nदक्षसुयज्ञविनाशनलिङ्गं तत्प्रणमामि सदाशिवलिङ्गम्॥',
        iast: 'Kanakamahāmaṇibhūṣitaliṅgaṃ phaṇipativeṣṭitaśobhitaliṅgam\ndakṣasuyajñavināśanaliṅgaṃ tatpraṇamāmi sadāśivaliṅgam',
        meaning:
          'Adorned with gold and great gems, beautiful with the lord of serpents coiled around it, destroyer of Daksha\'s arrogant sacrifice — I bow to that Linga of Sadashiva.',
      },
      {
        sanskrit: 'कुङ्कुमचन्दनलेपितलिङ्गं पङ्कजहारसुशोभितलिङ्गम्।\nसञ्चितपापविनाशनलिङ्गं तत्प्रणमामि सदाशिवलिङ्गम्॥',
        iast: 'Kuṅkumacandanalepitaliṅgaṃ paṅkajahārasuśobhitaliṅgam\nsañcitapāpavināśanaliṅgaṃ tatpraṇamāmi sadāśivaliṅgam',
        meaning:
          'Smeared with kumkum and sandal, lovely with garlands of lotus, destroyer of accumulated sin — I bow to that Linga of Sadashiva.',
      },
      {
        sanskrit: 'देवगणार्चितसेवितलिङ्गं भावैर्भक्तिभिरेव च लिङ्गम्।\nदिनकरकोटिप्रभाकरलिङ्गं तत्प्रणमामि सदाशिवलिङ्गम्॥',
        iast: 'Devagaṇārcitasevitaliṅgaṃ bhāvairbhaktibhireva ca liṅgam\ndinakarakoṭiprabhākaraliṅgaṃ tatpraṇamāmi sadāśivaliṅgam',
        meaning:
          'Worshipped and served by the hosts of gods with true feeling and devotion, radiant as ten million suns — I bow to that Linga of Sadashiva.',
      },
      {
        sanskrit: 'अष्टदलोपरिवेष्टितलिङ्गं सर्वसमुद्भवकारणलिङ्गम्।\nअष्टदरिद्रविनाशितलिङ्गं तत्प्रणमामि सदाशिवलिङ्गम्॥',
        iast: 'Aṣṭadalopariveṣṭitaliṅgaṃ sarvasamudbhavakāraṇaliṅgam\naṣṭadaridravināśitaliṅgaṃ tatpraṇamāmi sadāśivaliṅgam',
        meaning:
          'Enthroned upon the eight-petalled lotus, the cause of all creation, destroyer of the eight forms of poverty — I bow to that Linga of Sadashiva.',
      },
      {
        sanskrit: 'सुरगुरुसुरवरपूजितलिङ्गं सुरवनपुष्पसदार्चितलिङ्गम्।\nपरात्परं परमात्मकलिङ्गं तत्प्रणमामि सदाशिवलिङ्गम्॥',
        iast: 'Suragurusuravarapūjitaliṅgaṃ suravanapuṣpasadārcitaliṅgam\nparātparaṃ paramātmakaliṅgaṃ tatpraṇamāmi sadāśivaliṅgam',
        meaning:
          'Worshipped by Brihaspati and the foremost gods, forever offered flowers of the celestial gardens, higher than the highest, the Linga of the supreme Self — I bow to that Linga of Sadashiva.',
      },
    ],
  },
  {
    id: 'bilvashtakam',
    title: 'Bilvashtakam',
    deity: 'Shiva',
    category: 'Stotra',
    occasion: 'Offering bilva leaves; Shravan Mondays; Mahashivaratri',
    about:
      'Eight verses on the bilva (bel) leaf, Shiva\'s dearest offering. Its three leaflets are read as the three gunas, the three eyes and the trident; the hymn declares one whole bilva leaf equal to the greatest gifts and sacrifices.',
    complete: true,
    verses: [
      {
        sanskrit: 'त्रिदलं त्रिगुणाकारं त्रिनेत्रं च त्रियायुधम्।\nत्रिजन्मपापसंहारमेकबिल्वं शिवार्पणम्॥',
        iast: 'Tridalaṃ triguṇākāraṃ trinetraṃ ca triyāyudham\ntrijanmapāpasaṃhāramekabilvaṃ śivārpaṇam',
        meaning:
          'Three-leafed like the three gunas, the three eyes and the three weapons, destroying the sins of three births — one bilva leaf I offer to Shiva.',
      },
      {
        sanskrit: 'त्रिशाखैर्बिल्वपत्रैश्च ह्यच्छिद्रैः कोमलैः शुभैः।\nशिवपूजां करिष्यामि ह्येकबिल्वं शिवार्पणम्॥',
        iast: 'Triśākhairbilvapatraiśca hyacchidraiḥ komalaiḥ śubhaiḥ\nśivapūjāṃ kariṣyāmi hyekabilvaṃ śivārpaṇam',
        meaning:
          'With three-branched bilva leaves — unbroken, tender and auspicious — I shall worship Shiva; one bilva leaf I offer to him.',
      },
      {
        sanskrit: 'अखण्डबिल्वपत्रेण पूजिते नन्दिकेश्वरे।\nशुद्ध्यन्ति सर्वपापेभ्यो ह्येकबिल्वं शिवार्पणम्॥',
        iast: 'Akhaṇḍabilvapatreṇa pūjite nandikeśvare\nśuddhyanti sarvapāpebhyo hyekabilvaṃ śivārpaṇam',
        meaning:
          'When the lord of Nandi is worshipped with an unbroken bilva leaf, one is cleansed of every sin — one bilva leaf I offer to Shiva.',
      },
      {
        sanskrit: 'शालिग्रामशिलामेकां विप्राणां जातु चार्पयेत्।\nसोमयज्ञमहापुण्यमेकबिल्वं शिवार्पणम्॥',
        iast: 'Śāligrāmaśilāmekāṃ viprāṇāṃ jātu cārpayet\nsomayajñamahāpuṇyamekabilvaṃ śivārpaṇam',
        meaning:
          'The merit of gifting a shaligrama stone to brahmins, or of the great Soma sacrifice — one bilva leaf offered to Shiva equals it.',
      },
      {
        sanskrit: 'दन्तिकोटिसहस्राणि वाजपेयशतानि च।\nकोटिकन्यामहादानमेकबिल्वं शिवार्पणम्॥',
        iast: 'Dantikoṭisahasrāṇi vājapeyaśatāni ca\nkoṭikanyāmahādānamekabilvaṃ śivārpaṇam',
        meaning:
          'Thousands of crores of elephants given away, a hundred Vajapeya sacrifices, the great gift of a crore of maidens in marriage — one bilva leaf offered to Shiva outweighs them.',
      },
      {
        sanskrit: 'लक्ष्म्याः स्तनत उत्पन्नं महादेवस्य च प्रियम्।\nबिल्ववृक्षं प्रयच्छामि ह्येकबिल्वं शिवार्पणम्॥',
        iast: 'Lakṣmyāḥ stanata utpannaṃ mahādevasya ca priyam\nbilvavṛkṣaṃ prayacchāmi hyekabilvaṃ śivārpaṇam',
        meaning:
          'Born of Lakshmi\'s breast and beloved of Mahadeva — I offer the bilva tree itself; one bilva leaf I offer to Shiva.',
      },
      {
        sanskrit: 'दर्शनं बिल्ववृक्षस्य स्पर्शनं पापनाशनम्।\nअघोरपापसंहारमेकबिल्वं शिवार्पणम्॥',
        iast: 'Darśanaṃ bilvavṛkṣasya sparśanaṃ pāpanāśanam\naghorapāpasaṃhāramekabilvaṃ śivārpaṇam',
        meaning:
          'Merely seeing or touching the bilva tree destroys sin, even the most dreadful sin — one bilva leaf I offer to Shiva.',
      },
      {
        sanskrit: 'मूलतो ब्रह्मरूपाय मध्यतो विष्णुरूपिणे।\nअग्रतः शिवरूपाय वृक्षराजाय ते नमः॥',
        iast: 'Mūlato brahmarūpāya madhyato viṣṇurūpiṇe\nagrataḥ śivarūpāya vṛkṣarājāya te namaḥ',
        meaning:
          'Brahma at the root, Vishnu in the middle, Shiva at the tip — salutations to you, king of trees.',
      },
    ],
  },
  {
    id: 'rudrashtakam',
    title: 'Rudrashtakam',
    deity: 'Shiva',
    category: 'Stotra',
    occasion: 'Shravan; Mahashivaratri; daily Shiva puja',
    composer: 'Goswami Tulsidas',
    about:
      'Eight verses from the Ramcharitmanas (Uttarakanda), sung by Tulsidas in flowing Sanskrit. It moves from Shiva\'s formless absolute to his snow-white beauty and ends in the humblest surrender: "I know no yoga, no japa, no puja — save me, Shambhu."',
    complete: true,
    verses: [
      {
        sanskrit: 'नमामीशमीशान निर्वाणरूपं विभुं व्यापकं ब्रह्मवेदस्वरूपम्।\nनिजं निर्गुणं निर्विकल्पं निरीहं चिदाकाशमाकाशवासं भजेऽहम्॥',
        iast: 'Namāmīśamīśāna nirvāṇarūpaṃ vibhuṃ vyāpakaṃ brahmavedasvarūpam\nnijaṃ nirguṇaṃ nirvikalpaṃ nirīhaṃ cidākāśamākāśavāsaṃ bhaje\'ham',
        meaning:
          'I bow to Ishana, whose form is liberation itself — all-pervading lord, the essence of Brahman and the Vedas; self-existent, beyond qualities, beyond change, desireless — I worship the sky of consciousness, who dwells in space.',
      },
      {
        sanskrit: 'निराकारमोंकारमूलं तुरीयं गिरा ज्ञान गोतीतमीशं गिरीशम्।\nकरालं महाकाल कालं कृपालं गुणागार संसारपारं नतोऽहम्॥',
        iast: 'Nirākāramoṃkāramūlaṃ turīyaṃ girā jñāna gotītamīśaṃ girīśam\nkarālaṃ mahākāla kālaṃ kṛpālaṃ guṇāgāra saṃsārapāraṃ nato\'ham',
        meaning:
          'Formless, the root of Omkara, the fourth state beyond speech, knowledge and the senses; lord of the mountain; terrible, the death of great Death itself, yet full of grace; treasure-house of virtues, beyond the ocean of worldly existence — I bow.',
      },
      {
        sanskrit: 'तुषाराद्रिसंकाशगौरं गभीरं मनोभूतकोटिप्रभाश्रीशरीरम्।\nस्फुरन्मौलिकल्लोलिनीचारुगङ्गा लसद्भालबालेन्दु कण्ठे भुजङ्गा॥',
        iast: 'Tuṣārādrisaṃkāśagauraṃ gabhīraṃ manobhūtakoṭiprabhāśrīśarīram\nsphuranmaulikallolinīcārugaṅgā lasadbhālabālendu kaṇṭhe bhujaṅgā',
        meaning:
          'White as the snow mountain, profound, his glorious body outshining ten million Kamadevas; the lovely Ganga ripples in his shimmering crown, the young moon gleams on his brow, serpents coil at his throat.',
      },
      {
        sanskrit: 'चलत्कुण्डलं भ्रूसुनेत्रं विशालं प्रसन्नाननं नीलकण्ठं दयालम्।\nमृगाधीशचर्माम्बरं मुण्डमालं प्रियं शंकरं सर्वनाथं भजामि॥',
        iast: 'Calatkuṇḍalaṃ bhrūsunetraṃ viśālaṃ prasannānanaṃ nīlakaṇṭhaṃ dayālam\nmṛgādhīśacarmāmbaraṃ muṇḍamālaṃ priyaṃ śaṃkaraṃ sarvanāthaṃ bhajāmi',
        meaning:
          'Earrings swaying, with beautiful brows and large eyes, serene of face, blue-throated, merciful; clad in lion skin, wearing a garland of skulls — I worship the beloved Shankara, lord of all.',
      },
      {
        sanskrit: 'प्रचण्डं प्रकृष्टं प्रगल्भं परेशं अखण्डं अजं भानुकोटिप्रकाशम्।\nत्रयःशूलनिर्मूलनं शूलपाणिं भजेऽहं भवानीपतिं भावगम्यम्॥',
        iast: 'Pracaṇḍaṃ prakṛṣṭaṃ pragalbhaṃ pareśaṃ akhaṇḍaṃ ajaṃ bhānukoṭiprakāśam\ntrayaḥśūlanirmūlanaṃ śūlapāṇiṃ bhaje\'haṃ bhavānīpatiṃ bhāvagamyam',
        meaning:
          'Fierce, supreme, fearless, lord beyond all; undivided, unborn, bright as ten million suns; uprooter of the threefold suffering, trident in hand — I worship Bhavani\'s lord, reached only through love.',
      },
      {
        sanskrit: 'कलातीतकल्याण कल्पान्तकारी सदा सज्जनानन्ददाता पुरारी।\nचिदानन्दसंदोह मोहापहारी प्रसीद प्रसीद प्रभो मन्मथारी॥',
        iast: 'Kalātītakalyāṇa kalpāntakārī sadā sajjanānandadātā purārī\ncidānandasaṃdoha mohāpahārī prasīda prasīda prabho manmathārī',
        meaning:
          'Beyond time\'s divisions, all-auspicious, bringer of the aeon\'s end; ever the giver of joy to the good, destroyer of the triple cities; mass of consciousness and bliss, remover of delusion — be gracious, be gracious, O lord, enemy of Kamadeva.',
      },
      {
        sanskrit: 'न यावद् उमानाथपादारविन्दं भजन्तीह लोके परे वा नराणाम्।\nन तावत्सुखं शान्ति सन्तापनाशं प्रसीद प्रभो सर्वभूताधिवासम्॥',
        iast: 'Na yāvad umānāthapādāravindaṃ bhajantīha loke pare vā narāṇām\nna tāvatsukhaṃ śānti santāpanāśaṃ prasīda prabho sarvabhūtādhivāsam',
        meaning:
          'Until people worship the lotus feet of Uma\'s lord, there is no happiness, no peace, no end of suffering — in this world or the next. Be gracious, O lord who dwells in all beings.',
      },
      {
        sanskrit: 'न जानामि योगं जपं नैव पूजां नतोऽहं सदा सर्वदा शम्भु तुभ्यम्।\nजराजन्मदुःखौघ तातप्यमानं प्रभो पाहि आपन्नमामीश शम्भो॥',
        iast: 'Na jānāmi yogaṃ japaṃ naiva pūjāṃ nato\'haṃ sadā sarvadā śambhu tubhyam\njarājanmaduḥkhaugha tātapyamānaṃ prabho pāhi āpannamāmīśa śambho',
        meaning:
          'I know no yoga, no japa, no puja — I simply bow to you, Shambhu, always and forever. Scorched by the flood of sorrows of age and rebirth, O lord, protect me in my distress, O Ishana, O Shambhu.',
      },
    ],
  },
  {
    id: 'nirvana-shatakam',
    title: 'Nirvana Shatakam',
    deity: 'Shiva',
    category: 'Vedic',
    occasion: 'Meditation; Vedanta study; quiet mornings',
    composer: 'Adi Shankaracharya',
    about:
      'Six verses of pure Advaita, said to be the young Shankara\'s answer when asked "Who are you?" Each verse strips away another identity — mind, body, emotion, ritual, even liberation itself — resolving into the refrain: I am consciousness and bliss; I am Shiva.',
    complete: true,
    verses: [
      {
        sanskrit: 'मनोबुद्ध्यहंकारचित्तानि नाहं न च श्रोत्रजिह्वे न च घ्राणनेत्रे।\nन च व्योमभूमिर्न तेजो न वायुश्चिदानन्दरूपः शिवोऽहं शिवोऽहम्॥',
        iast: 'Manobuddhyahaṃkāracittāni nāhaṃ na ca śrotrajihve na ca ghrāṇanetre\nna ca vyomabhūmirna tejo na vāyuścidānandarūpaḥ śivo\'haṃ śivo\'ham',
        meaning:
          'I am not mind, intellect, ego or memory; not ear or tongue, not nose or eye; not sky, earth, fire or air — I am the form of consciousness and bliss: I am Shiva, I am Shiva.',
      },
      {
        sanskrit: 'न च प्राणसंज्ञो न वै पञ्चवायुर्न वा सप्तधातुर्न वा पञ्चकोशः।\nन वाक्पाणिपादं न चोपस्थपायुश्चिदानन्दरूपः शिवोऽहं शिवोऽहम्॥',
        iast: 'Na ca prāṇasaṃjño na vai pañcavāyurna vā saptadhāturna vā pañcakośaḥ\nna vākpāṇipādaṃ na copasthapāyuścidānandarūpaḥ śivo\'haṃ śivo\'ham',
        meaning:
          'I am not the breath of life, nor the five vital airs, nor the seven tissues, nor the five sheaths; not speech, hands or feet, nor the organs of generation and excretion — I am consciousness and bliss: I am Shiva.',
      },
      {
        sanskrit: 'न मे द्वेषरागौ न मे लोभमोहौ मदो नैव मे नैव मात्सर्यभावः।\nन धर्मो न चार्थो न कामो न मोक्षश्चिदानन्दरूपः शिवोऽहं शिवोऽहम्॥',
        iast: 'Na me dveṣarāgau na me lobhamohau mado naiva me naiva mātsaryabhāvaḥ\nna dharmo na cārtho na kāmo na mokṣaścidānandarūpaḥ śivo\'haṃ śivo\'ham',
        meaning:
          'I have no hatred or attachment, no greed or delusion, no pride, no envy; I am not dharma, wealth, desire, nor even liberation — I am consciousness and bliss: I am Shiva.',
      },
      {
        sanskrit: 'न पुण्यं न पापं न सौख्यं न दुःखं न मन्त्रो न तीर्थं न वेदा न यज्ञाः।\nअहं भोजनं नैव भोज्यं न भोक्ता चिदानन्दरूपः शिवोऽहं शिवोऽहम्॥',
        iast: 'Na puṇyaṃ na pāpaṃ na saukhyaṃ na duḥkhaṃ na mantro na tīrthaṃ na vedā na yajñāḥ\nahaṃ bhojanaṃ naiva bhojyaṃ na bhoktā cidānandarūpaḥ śivo\'haṃ śivo\'ham',
        meaning:
          'I am neither merit nor sin, neither pleasure nor pain; not mantra, not pilgrimage, not the Vedas, not sacrifice; I am neither the food, the eating, nor the eater — I am consciousness and bliss: I am Shiva.',
      },
      {
        sanskrit: 'न मे मृत्युशङ्का न मे जातिभेदः पिता नैव मे नैव माता न जन्म।\nन बन्धुर्न मित्रं गुरुर्नैव शिष्यश्चिदानन्दरूपः शिवोऽहं शिवोऽहम्॥',
        iast: 'Na me mṛtyuśaṅkā na me jātibhedaḥ pitā naiva me naiva mātā na janma\nna bandhurna mitraṃ gururnaiva śiṣyaścidānandarūpaḥ śivo\'haṃ śivo\'ham',
        meaning:
          'I have no fear of death, no distinction of caste; no father, no mother, no birth at all; no kinsman, no friend, no guru, no disciple — I am consciousness and bliss: I am Shiva.',
      },
      {
        sanskrit: 'अहं निर्विकल्पो निराकाररूपो विभुत्वाच्च सर्वत्र सर्वेन्द्रियाणाम्।\nन चासङ्गतं नैव मुक्तिर्न मेयश्चिदानन्दरूपः शिवोऽहं शिवोऽहम्॥',
        iast: 'Ahaṃ nirvikalpo nirākārarūpo vibhutvācca sarvatra sarvendriyāṇām\nna cāsaṅgataṃ naiva muktirna meyaścidānandarūpaḥ śivo\'haṃ śivo\'ham',
        meaning:
          'I am without thought-constructs, formless; being all-pervading I am behind every sense everywhere; I am neither attached nor freed, nor anything measurable — I am consciousness and bliss: I am Shiva, I am Shiva.',
      },
    ],
  },
  {
    id: 'shiv-mahimna-stotra',
    title: 'Shiv Mahimna Stotra',
    deity: 'Shiva',
    category: 'Stotra',
    occasion: 'Shravan; Mahashivaratri',
    composer: 'Pushpadanta',
    about:
      'The gandharva Pushpadanta, cursed after unknowingly stepping on bilva leaves, composed this hymn on the limits of praising the limitless — and regained his powers. Its opening argument, that sincere praise within one\'s own capacity is always worthy, has made it beloved for twelve centuries. Key verses of the forty-one are given here.',
    complete: false,
    note: '4 of 41 verses',
    verses: [
      {
        sanskrit: 'महिम्नः पारं ते परमविदुषो यद्यसदृशी\nस्तुतिर्ब्रह्मादीनामपि तदवसन्नास्त्वयि गिरः।\nअथाऽवाच्यः सर्वः स्वमतिपरिणामावधि गृणन्\nममाप्येष स्तोत्रे हर निरपवादः परिकरः॥',
        iast: 'Mahimnaḥ pāraṃ te paramaviduṣo yadyasadṛśī\nstutirbrahmādīnāmapi tadavasannāstvayi giraḥ\nathā\'vācyaḥ sarvaḥ svamatipariṇāmāvadhi gṛṇan\nmamāpyeṣa stotre hara nirapavādaḥ parikaraḥ',
        meaning:
          'If even the hymns of Brahma and the greatest knowers fall short of the far shore of your glory, O Hara, then no one who praises you to the limit of their own understanding can be blamed — and so this attempt of mine, too, stands beyond reproach.',
      },
      {
        sanskrit: 'अतीतः पन्थानं तव च महिमा वाङ्मनसयो-\nरतद्व्यावृत्त्या यं चकितमभिधत्ते श्रुतिरपि।\nस कस्य स्तोतव्यः कतिविधगुणः कस्य विषयः\nपदे त्वर्वाचीने पतति न मनः कस्य न वचः॥',
        iast: 'Atītaḥ panthānaṃ tava ca mahimā vāṅmanasayo-\nratadvyāvṛttyā yaṃ cakitamabhidhatte śrutirapi\nsa kasya stotavyaḥ katividhaguṇaḥ kasya viṣayaḥ\npade tvarvācīne patati na manaḥ kasya na vacaḥ',
        meaning:
          'Your glory lies beyond the paths of speech and mind; even the Veda, awestruck, can only describe it as "not this, not this." Who then can truly praise it, count its qualities, or grasp it? And yet — toward your manifest form, whose mind and speech do not turn?',
      },
      {
        sanskrit: 'मधुस्फीता वाचः परमममृतं निर्मितवत-\nस्तव ब्रह्मन् किं वागपि सुरगुरोर्विस्मयपदम्।\nमम त्वेतां वाणीं गुणकथनपुण्येन भवतः\nपुनामीत्यर्थेऽस्मिन् पुरमथन बुद्धिर्व्यवसिता॥',
        iast: 'Madhusphītā vācaḥ paramamamṛtaṃ nirmitavata-\nstava brahman kiṃ vāgapi suragurorvismayapadam\nmama tvetāṃ vāṇīṃ guṇakathanapuṇyena bhavataḥ\npunāmītyarthe\'smin puramathana buddhirvyavasitā',
        meaning:
          'For you who created speech itself, honey-sweet and immortal, could even the words of Brihaspati cause wonder? My intent, O destroyer of the cities, is only this: to purify my own speech through the merit of telling your virtues.',
      },
      {
        sanskrit: 'असितगिरिसमं स्यात् कज्जलं सिन्धुपात्रे\nसुरतरुवरशाखा लेखनी पत्रमुर्वी।\nलिखति यदि गृहीत्वा शारदा सर्वकालं\nतदपि तव गुणानामीश पारं न याति॥',
        iast: 'Asitagirisamaṃ syāt kajjalaṃ sindhupātre\nsurataruvaraśākhā lekhanī patramurvī\nlikhati yadi gṛhītvā śāradā sarvakālaṃ\ntadapi tava guṇānāmīśa pāraṃ na yāti',
        meaning:
          'Were the black mountain the ink, the ocean the inkpot, a branch of the wish-fulfilling tree the pen, the earth itself the page — and were Sharada herself to write for all eternity — even then, O Lord, she would not reach the end of your virtues.',
      },
    ],
  },
  {
    id: 'dwadasha-jyotirlinga-stotra',
    title: 'Dwadasha Jyotirlinga Stotra',
    deity: 'Shiva',
    category: 'Stotra',
    occasion: 'Mahashivaratri; Shravan; Jyotirlinga pilgrimage; Mondays',
    about:
      'A four-verse remembrance of the twelve Jyotirlingas — the "lingas of light" spread across India from Somnath on the Gujarat coast to Kedarnath in the Himalayas. Reciting the twelve names morning and evening is said to dissolve the sins of seven births.',
    complete: true,
    verses: [
      {
        sanskrit: 'सौराष्ट्रे सोमनाथं च श्रीशैले मल्लिकार्जुनम्।\nउज्जयिन्यां महाकालमोङ्कारममलेश्वरम्॥',
        iast: 'Saurāṣṭre somanāthaṃ ca śrīśaile mallikārjunam\nujjayinyāṃ mahākālamoṅkāramamaleśvaram',
        meaning:
          'Somnath in Saurashtra, Mallikarjuna on Srishaila, Mahakala at Ujjain, and Omkareshwar at Amaleshwara.',
      },
      {
        sanskrit: 'परल्यां वैद्यनाथं च डाकिन्यां भीमशङ्करम्।\nसेतुबन्धे तु रामेशं नागेशं दारुकावने॥',
        iast: 'Paralyāṃ vaidyanāthaṃ ca ḍākinyāṃ bhīmaśaṅkaram\nsetubandhe tu rāmeśaṃ nāgeśaṃ dārukāvane',
        meaning:
          'Vaidyanath at Parali, Bhimashankar in the Dakini forest, Rameshwara at the ocean bridge, and Nageshwara in Darukavana.',
      },
      {
        sanskrit: 'वाराणस्यां तु विश्वेशं त्र्यम्बकं गौतमीतटे।\nहिमालये तु केदारं घुश्मेशं च शिवालये॥',
        iast: 'Vārāṇasyāṃ tu viśveśaṃ tryambakaṃ gautamītaṭe\nhimālaye tu kedāraṃ ghuśmeśaṃ ca śivālaye',
        meaning:
          'Vishwanath at Varanasi, Tryambakeshwar on the banks of the Godavari, Kedarnath in the Himalayas, and Ghrishneshwar at Shivalaya.',
      },
      {
        sanskrit: 'एतानि ज्योतिर्लिङ्गानि सायं प्रातः पठेन्नरः।\nसप्तजन्मकृतं पापं स्मरणेन विनश्यति॥',
        iast: 'Etāni jyotirliṅgāni sāyaṃ prātaḥ paṭhennaraḥ\nsaptajanmakṛtaṃ pāpaṃ smaraṇena vinaśyati',
        meaning:
          'Whoever recites these Jyotirlingas at dusk and dawn — by that remembrance the sins of seven births are destroyed.',
        label: 'Phala Shruti',
      },
    ],
  },
  {
    id: 'kaal-bhairav-ashtakam',
    title: 'Kaal Bhairav Ashtakam',
    deity: 'Shiva',
    category: 'Stotra',
    occasion: 'Bhairav Ashtami; Sundays; protection from fear; Kashi pilgrimage',
    composer: 'Adi Shankaracharya',
    about:
      'Eight verses to Kaal Bhairav, the fierce guardian of Kashi who is time itself. Composed by Shankaracharya, it is chanted for fearlessness and for release from entanglements; Bhairav is honoured as the kotwal (city guardian) whom pilgrims to Varanasi greet first.',
    complete: true,
    verses: [
      {
        sanskrit: 'देवराजसेव्यमानपावनाङ्घ्रिपङ्कजं\nव्यालयज्ञसूत्रमिन्दुशेखरं कृपाकरम्।\nनारदादियोगिवृन्दवन्दितं दिगम्बरं\nकाशिकापुराधिनाथ कालभैरवं भजे॥',
        iast: 'Devarājasevyamānapāvanāṅghripaṅkajaṃ\nvyālayajñasūtraminduśekharaṃ kṛpākaram\nnāradādiyogivṛndavanditaṃ digambaraṃ\nkāśikāpurādhinātha kālabhairavaṃ bhaje',
        meaning:
          'His holy lotus feet are served by Indra, king of gods; a serpent is his sacred thread, the moon his crest; mine of compassion, praised by Narada and the hosts of yogis, sky-clad — I worship Kaal Bhairav, lord of the city of Kashi.',
      },
      {
        sanskrit: 'भानुकोटिभास्वरं भवाब्धितारकं परं\nनीलकण्ठमीप्सितार्थदायकं त्रिलोचनम्।\nकालकालमम्बुजाक्षमक्षशूलमक्षरं\nकाशिकापुराधिनाथ कालभैरवं भजे॥',
        iast: 'Bhānukoṭibhāsvaraṃ bhavābdhitārakaṃ paraṃ\nnīlakaṇṭhamīpsitārthadāyakaṃ trilocanam\nkālakālamambujākṣamakṣaśūlamakṣaraṃ\nkāśikāpurādhinātha kālabhairavaṃ bhaje',
        meaning:
          'Radiant as ten million suns, the supreme ferryman across the ocean of existence; blue-throated, granter of desired ends, three-eyed; death of Death itself, lotus-eyed, bearing the imperishable trident — I worship Kaal Bhairav, lord of Kashi.',
      },
      {
        sanskrit: 'शूलटङ्कपाशदण्डपाणिमादिकारणं\nश्यामकायमादिदेवमक्षरं निरामयम्।\nभीमविक्रमं प्रभुं विचित्रताण्डवप्रियं\nकाशिकापुराधिनाथ कालभैरवं भजे॥',
        iast: 'Śūlaṭaṅkapāśadaṇḍapāṇimādikāraṇaṃ\nśyāmakāyamādidevamakṣaraṃ nirāmayam\nbhīmavikramaṃ prabhuṃ vicitratāṇḍavapriyaṃ\nkāśikāpurādhinātha kālabhairavaṃ bhaje',
        meaning:
          'Trident, chisel, noose and staff in his hands; the first cause, dark-bodied, the primal god, imperishable, beyond disease; of terrifying valour, the lord who loves the wondrous Tandava — I worship Kaal Bhairav, lord of Kashi.',
      },
      {
        sanskrit: 'भुक्तिमुक्तिदायकं प्रशस्तचारुविग्रहं\nभक्तवत्सलं स्थितं समस्तलोकविग्रहम्।\nविनिक्वणन्मनोज्ञहेमकिङ्किणीलसत्कटिं\nकाशिकापुराधिनाथ कालभैरवं भजे॥',
        iast: 'Bhuktimuktidāyakaṃ praśastacāruvigrahaṃ\nbhaktavatsalaṃ sthitaṃ samastalokavigraham\nvinikvaṇanmanojñahemakiṅkiṇīlasatkaṭiṃ\nkāśikāpurādhinātha kālabhairavaṃ bhaje',
        meaning:
          'Giver of enjoyment and liberation, of celebrated and beautiful form; tender to his devotees, standing as the embodiment of all worlds; golden bells chiming sweetly at his waist — I worship Kaal Bhairav, lord of Kashi.',
      },
      {
        sanskrit: 'धर्मसेतुपालकं त्वधर्ममार्गनाशकं\nकर्मपाशमोचकं सुशर्मदायकं विभुम्।\nस्वर्णवर्णशेषपाशशोभिताङ्गमण्डलं\nकाशिकापुराधिनाथ कालभैरवं भजे॥',
        iast: 'Dharmasetupālakaṃ tvadharmamārganāśakaṃ\nkarmapāśamocakaṃ suśarmadāyakaṃ vibhum\nsvarṇavarṇaśeṣapāśaśobhitāṅgamaṇḍalaṃ\nkāśikāpurādhinātha kālabhairavaṃ bhaje',
        meaning:
          'Guardian of the bridge of dharma, destroyer of the path of unrighteousness; loosener of the noose of karma, giver of true refuge, all-pervading; his body garlanded by the golden serpent Shesha — I worship Kaal Bhairav, lord of Kashi.',
      },
      {
        sanskrit: 'रत्नपादुकाप्रभाभिरामपादयुग्मकं\nनित्यमद्वितीयमिष्टदैवतं निरञ्जनम्।\nमृत्युदर्पनाशनं करालदंष्ट्रमोक्षणं\nकाशिकापुराधिनाथ कालभैरवं भजे॥',
        iast: 'Ratnapādukāprabhābhirāmapādayugmakaṃ\nnityamadvitīyamiṣṭadaivataṃ nirañjanam\nmṛtyudarpanāśanaṃ karāladaṃṣṭramokṣaṇaṃ\nkāśikāpurādhinātha kālabhairavaṃ bhaje',
        meaning:
          'His feet lovely in the glow of jewelled sandals; eternal, without a second, the chosen deity, stainless; crusher of Death\'s arrogance, whose terrible fangs themselves liberate — I worship Kaal Bhairav, lord of Kashi.',
      },
      {
        sanskrit: 'अट्टहासभिन्नपद्मजाण्डकोशसन्ततिं\nदृष्टिपातनष्टपापजालमुग्रशासनम्।\nअष्टसिद्धिदायकं कपालमालिकाधरं\nकाशिकापुराधिनाथ कालभैरवं भजे॥',
        iast: 'Aṭṭahāsabhinnapadmajāṇḍakośasantatiṃ\ndṛṣṭipātanaṣṭapāpajālamugraśāsanam\naṣṭasiddhidāyakaṃ kapālamālikādharaṃ\nkāśikāpurādhinātha kālabhairavaṃ bhaje',
        meaning:
          'His thunderous laughter splits open the cosmic eggs of Brahma\'s creation; a single glance destroys the web of sins; stern ruler, giver of the eight siddhis, wearing the garland of skulls — I worship Kaal Bhairav, lord of Kashi.',
      },
      {
        sanskrit: 'भूतसङ्घनायकं विशालकीर्तिदायकं\nकाशिवासलोकपुण्यपापशोधकं विभुम्।\nनीतिमार्गकोविदं पुरातनं जगत्पतिं\nकाशिकापुराधिनाथ कालभैरवं भजे॥',
        iast: 'Bhūtasaṅghanāyakaṃ viśālakīrtidāyakaṃ\nkāśivāsalokapuṇyapāpaśodhakaṃ vibhum\nnītimārgakovidaṃ purātanaṃ jagatpatiṃ\nkāśikāpurādhinātha kālabhairavaṃ bhaje',
        meaning:
          'Leader of the hosts of spirits, bestower of vast renown; the all-pervading one who weighs the merit and sin of all who dwell in Kashi; master of the path of right conduct, ancient, lord of the universe — I worship Kaal Bhairav, lord of Kashi.',
      },
    ],
  },
];
