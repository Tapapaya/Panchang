import type { Stotra } from './types';

export const HANUMAN_STOTRAS: Stotra[] = [
  {
    id: 'hanuman-chalisa',
    title: 'Hanuman Chalisa',
    deity: 'Hanuman',
    category: 'Chalisa',
    occasion: 'Tuesdays; Saturdays; Hanuman Jayanti; before any difficult task',
    composer: 'Goswami Tulsidas',
    about:
      'Forty chaupais in Awadhi by Tulsidas — the most recited devotional text in the Hindi-speaking world. It tells Hanuman\'s whole story, from swallowing the sun as a child to bringing the Sanjivani herb, and promises that whoever recites it a hundred times is freed from every bondage. Chanted for strength, protection and fearlessness.',
    complete: true,
    verses: [
      {
        sanskrit: 'श्रीगुरु चरन सरोज रज, निज मनु मुकुरु सुधारि।\nबरनउँ रघुबर बिमल जसु, जो दायकु फल चारि॥',
        iast: 'Śrīguru carana saroja raja, nija manu mukuru sudhāri\nbaranaũ raghubara bimala jasu, jo dāyaku phala cāri',
        meaning:
          'Polishing the mirror of my mind with the dust of my guru\'s lotus feet, I recount the pure glory of the best of Raghus, which bestows the four fruits of life.',
        label: 'Opening Doha 1',
      },
      {
        sanskrit: 'बुद्धिहीन तनु जानिके, सुमिरौं पवन कुमार।\nबल बुधि बिद्या देहु मोहिं, हरहु कलेस बिकार॥',
        iast: 'Buddhihīna tanu jānike, sumiraũ pavana kumāra\nbala budhi bidyā dehu mohi, harahu kalesa bikāra',
        meaning:
          'Knowing this body to be without intelligence, I remember the son of the Wind. Grant me strength, wisdom and knowledge; take away my afflictions and impurities.',
        label: 'Opening Doha 2',
      },
      {
        sanskrit: 'जय हनुमान ज्ञान गुन सागर। जय कपीस तिहुँ लोक उजागर॥\nरामदूत अतुलित बल धामा। अञ्जनि पुत्र पवनसुत नामा॥',
        iast: 'Jaya hanumāna jñāna guna sāgara, jaya kapīsa tihũ loka ujāgara\nrāmadūta atulita bala dhāmā, añjani putra pavanasuta nāmā',
        meaning:
          'Victory to Hanuman, ocean of wisdom and virtue; victory to the lord of monkeys who illumines the three worlds. Messenger of Rama, abode of matchless strength — Anjani\'s son, called Son of the Wind.',
        label: 'Chaupai 1–2',
      },
      {
        sanskrit: 'महाबीर बिक्रम बजरंगी। कुमति निवार सुमति के संगी॥\nकंचन बरन बिराज सुबेसा। कानन कुण्डल कुंचित केसा॥',
        iast: 'Mahābīra bikrama bajaraṅgī, kumati nivāra sumati ke saṅgī\nkañcana barana birāja subesā, kānana kuṇḍala kuñcita kesā',
        meaning:
          'Great hero, mighty as the thunderbolt; dispeller of evil thoughts, companion of good sense. Golden-hued and splendidly attired, with earrings and curly hair.',
        label: 'Chaupai 3–4',
      },
      {
        sanskrit: 'हाथ बज्र औ ध्वजा बिराजै। काँधे मूँज जनेऊ साजै॥\nसंकर सुवन केसरीनन्दन। तेज प्रताप महा जग बन्दन॥',
        iast: 'Hātha bajra au dhvajā birājai, kāṃdhe mūṃja janeū sājai\nsaṅkara suvana kesarīnandana, teja pratāpa mahā jaga bandana',
        meaning:
          'Mace and banner shine in his hands; the sacred thread of munja grass adorns his shoulder. Son of Shiva, joy of Kesari — his splendour and might are revered by all the world.',
        label: 'Chaupai 5–6',
      },
      {
        sanskrit: 'बिद्यावान गुनी अति चातुर। राम काज करिबे को आतुर॥\nप्रभु चरित्र सुनिबे को रसिया। राम लखन सीता मन बसिया॥',
        iast: 'Bidyāvāna gunī ati cātura, rāma kāja karibe ko ātura\nprabhu caritra sunibe ko rasiyā, rāma lakhana sītā mana basiyā',
        meaning:
          'Learned, virtuous and supremely clever, ever eager to do Rama\'s work; delighting in hearing the Lord\'s story — Rama, Lakshmana and Sita dwell in his heart.',
        label: 'Chaupai 7–8',
      },
      {
        sanskrit: 'सूक्ष्म रूप धरि सियहिं दिखावा। बिकट रूप धरि लंक जरावा॥\nभीम रूप धरि असुर सँहारे। रामचन्द्र के काज सँवारे॥',
        iast: 'Sūkṣma rūpa dhari siyahiṃ dikhāvā, bikaṭa rūpa dhari laṅka jarāvā\nbhīma rūpa dhari asura saṃhāre, rāmacandra ke kāja saṃvāre',
        meaning:
          'In a tiny form he appeared before Sita; in a terrible form he burned Lanka. In a colossal form he destroyed the demons and accomplished Ramachandra\'s purposes.',
        label: 'Chaupai 9–10',
      },
      {
        sanskrit: 'लाय सजीवन लखन जियाये। श्रीरघुबीर हरषि उर लाये॥\nरघुपति कीन्ही बहुत बड़ाई। तुम मम प्रिय भरतहि सम भाई॥',
        iast: 'Lāya sajīvana lakhana jiyāye, śrīraghubīra haraṣi ura lāye\nraghupati kīnhī bahuta baṛāī, tuma mama priya bharatahi sama bhāī',
        meaning:
          'Bringing the Sanjivani herb, he revived Lakshmana, and Rama joyfully embraced him. The lord of Raghus praised him greatly: "You are as dear to me as my brother Bharata."',
        label: 'Chaupai 11–12',
      },
      {
        sanskrit: 'सहस बदन तुम्हरो जस गावैं। अस कहि श्रीपति कण्ठ लगावैं॥\nसनकादिक ब्रह्मादि मुनीसा। नारद सारद सहित अहीसा॥',
        iast: 'Sahasa badana tumharo jasa gāvaiṃ, asa kahi śrīpati kaṇṭha lagāvaiṃ\nsanakādika brahmādi munīsā, nārada sārada sahita ahīsā',
        meaning:
          '"May the thousand-mouthed serpent sing your fame" — so saying, Lakshmi\'s lord drew him to his heart. Sanaka and the sages, Brahma and the great hermits, Narada, Saraswati and the king of serpents —',
        label: 'Chaupai 13–14',
      },
      {
        sanskrit: 'जम कुबेर दिगपाल जहाँ ते। कबि कोबिद कहि सके कहाँ ते॥\nतुम उपकार सुग्रीवहिं कीन्हा। राम मिलाय राज पद दीन्हा॥',
        iast: 'Jama kubera digapāla jahāṃ te, kabi kobida kahi sake kahāṃ te\ntuma upakāra sugrīvahiṃ kīnhā, rāma milāya rāja pada dīnhā',
        meaning:
          '— Yama, Kubera and the guardians of the quarters: how could poets and scholars fully tell your glory? You did Sugriva a great service — introducing him to Rama, you restored his kingship.',
        label: 'Chaupai 15–16',
      },
      {
        sanskrit: 'तुम्हरो मन्त्र बिभीषन माना। लंकेस्वर भए सब जग जाना॥\nजुग सहस्र जोजन पर भानू। लील्यो ताहि मधुर फल जानू॥',
        iast: 'Tumharo mantra bibhīṣana mānā, laṅkesvara bhae saba jaga jānā\njuga sahasra jojana para bhānū, līlyo tāhi madhura phala jānū',
        meaning:
          'Vibhishana heeded your counsel and became lord of Lanka, as all the world knows. The sun, thousands of yojanas away, you swallowed, taking it for a sweet fruit.',
        label: 'Chaupai 17–18',
      },
      {
        sanskrit: 'प्रभु मुद्रिका मेलि मुख माहीं। जलधि लाँघि गये अचरज नाहीं॥\nदुर्गम काज जगत के जेते। सुगम अनुग्रह तुम्हरे तेते॥',
        iast: 'Prabhu mudrikā meli mukha māhīṃ, jaladhi lāṃghi gaye acaraja nāhīṃ\ndurgama kāja jagata ke jete, sugama anugraha tumhare tete',
        meaning:
          'With the Lord\'s ring held in your mouth you leapt the ocean — no wonder in that. Every difficult task in the world becomes easy by your grace.',
        label: 'Chaupai 19–20',
      },
      {
        sanskrit: 'राम दुआरे तुम रखवारे। होत न आज्ञा बिनु पैसारे॥\nसब सुख लहै तुम्हारी सरना। तुम रच्छक काहू को डर ना॥',
        iast: 'Rāma duāre tuma rakhavāre, hota na ājñā binu paisāre\nsaba sukha lahai tumhārī saranā, tuma racchaka kāhū ko ḍara nā',
        meaning:
          'You are the keeper of Rama\'s door — none may enter without your leave. All who take your shelter find happiness; with you as protector there is nothing to fear.',
        label: 'Chaupai 21–22',
      },
      {
        sanskrit: 'आपन तेज सम्हारो आपै। तीनों लोक हाँक तें काँपै॥\nभूत पिसाच निकट नहिं आवै। महाबीर जब नाम सुनावै॥',
        iast: 'Āpana teja samhāro āpai, tīnoṃ loka hāṃka teṃ kāṃpai\nbhūta pisāca nikaṭa nahiṃ āvai, mahābīra jaba nāma sunāvai',
        meaning:
          'You alone can contain your own splendour; the three worlds tremble at your roar. No ghost or evil spirit dares approach when the Great Hero\'s name is uttered.',
        label: 'Chaupai 23–24',
      },
      {
        sanskrit: 'नासै रोग हरै सब पीरा। जपत निरन्तर हनुमत बीरा॥\nसंकट तें हनुमान छुड़ावै। मन क्रम बचन ध्यान जो लावै॥',
        iast: 'Nāsai roga harai saba pīrā, japata nirantara hanumata bīrā\nsaṅkaṭa teṃ hanumāna chuṛāvai, mana krama bacana dhyāna jo lāvai',
        meaning:
          'Disease is destroyed and all pain removed by the constant repetition of brave Hanuman\'s name. Hanuman frees from every crisis those who fix their attention on him in thought, deed and word.',
        label: 'Chaupai 25–26',
      },
      {
        sanskrit: 'सब पर राम तपस्वी राजा। तिन के काज सकल तुम साजा॥\nऔर मनोरथ जो कोई लावै। सोइ अमित जीवन फल पावै॥',
        iast: 'Saba para rāma tapasvī rājā, tina ke kāja sakala tuma sājā\naura manoratha jo koī lāvai, soi amita jīvana phala pāvai',
        meaning:
          'Rama the ascetic is king over all, and you carry out all his work. Whoever brings any heartfelt wish to you obtains the boundless fruit of life.',
        label: 'Chaupai 27–28',
      },
      {
        sanskrit: 'चारों जुग परताप तुम्हारा। है परसिद्ध जगत उजियारा॥\nसाधु सन्त के तुम रखवारे। असुर निकन्दन राम दुलारे॥',
        iast: 'Cāroṃ juga paratāpa tumhārā, hai parasiddha jagata ujiyārā\nsādhu santa ke tuma rakhavāre, asura nikandana rāma dulāre',
        meaning:
          'Your glory blazes through all four ages, its light renowned through the world. You are the guardian of sadhus and saints, destroyer of demons, darling of Rama.',
        label: 'Chaupai 29–30',
      },
      {
        sanskrit: 'अष्ट सिद्धि नौ निधि के दाता। अस बर दीन जानकी माता॥\nराम रसायन तुम्हरे पासा। सदा रहो रघुपति के दासा॥',
        iast: 'Aṣṭa siddhi nau nidhi ke dātā, asa bara dīna jānakī mātā\nrāma rasāyana tumhare pāsā, sadā raho raghupati ke dāsā',
        meaning:
          'Mother Janaki granted you the boon of bestowing the eight siddhis and nine treasures. You hold the elixir of Rama\'s name — remain forever the servant of the lord of Raghus.',
        label: 'Chaupai 31–32',
      },
      {
        sanskrit: 'तुम्हरे भजन राम को पावै। जनम जनम के दुख बिसरावै॥\nअन्त काल रघुबर पुर जाई। जहाँ जन्म हरिभक्त कहाई॥',
        iast: 'Tumhare bhajana rāma ko pāvai, janama janama ke dukha bisarāvai\nanta kāla raghubara pura jāī, jahāṃ janma haribhakta kahāī',
        meaning:
          'Through devotion to you one reaches Rama and forgets the sorrows of birth after birth. At the end one goes to Rama\'s own city, and wherever born thereafter is known as Hari\'s devotee.',
        label: 'Chaupai 33–34',
      },
      {
        sanskrit: 'और देवता चित्त न धरई। हनुमत सेइ सर्ब सुख करई॥\nसंकट कटै मिटै सब पीरा। जो सुमिरै हनुमत बलबीरा॥',
        iast: 'Aura devatā citta na dharaī, hanumata sei sarba sukha karaī\nsaṅkaṭa kaṭai miṭai saba pīrā, jo sumirai hanumata balabīrā',
        meaning:
          'Even without holding other gods in mind, serving Hanuman alone brings every happiness. Crises are cut away and all pain erased for whoever remembers the mighty hero Hanuman.',
        label: 'Chaupai 35–36',
      },
      {
        sanskrit: 'जै जै जै हनुमान गोसाईं। कृपा करहु गुरुदेव की नाईं॥\nजो सत बार पाठ कर कोई। छूटहि बन्दि महा सुख होई॥',
        iast: 'Jai jai jai hanumāna gosāīṃ, kṛpā karahu gurudeva kī nāīṃ\njo sata bāra pāṭha kara koī, chūṭahi bandi mahā sukha hoī',
        meaning:
          'Victory, victory, victory to Lord Hanuman! Be gracious as a divine guru is gracious. Whoever recites this a hundred times is released from every bondage and gains great joy.',
        label: 'Chaupai 37–38',
      },
      {
        sanskrit: 'जो यह पढ़ै हनुमान चालीसा। होय सिद्धि साखी गौरीसा॥\nतुलसीदास सदा हरि चेरा। कीजै नाथ हृदय महँ डेरा॥',
        iast: 'Jo yaha paṛhai hanumāna cālīsā, hoya siddhi sākhī gaurīsā\ntulasīdāsa sadā hari cerā, kījai nātha hṛdaya mahaṃ ḍerā',
        meaning:
          'Whoever reads this Hanuman Chalisa attains accomplishment — Gauri\'s lord Shiva is witness. Tulsidas, forever Hari\'s servant, prays: O Lord, make your dwelling in my heart.',
        label: 'Chaupai 39–40',
      },
      {
        sanskrit: 'पवन तनय संकट हरन, मंगल मूरति रूप।\nराम लखन सीता सहित, हृदय बसहु सुर भूप॥',
        iast: 'Pavana tanaya saṅkaṭa harana, maṅgala mūrati rūpa\nrāma lakhana sītā sahita, hṛdaya basahu sura bhūpa',
        meaning:
          'O son of the Wind, remover of crisis, embodiment of auspiciousness — together with Rama, Lakshmana and Sita, dwell in my heart, O king of gods.',
        label: 'Closing Doha',
      },
    ],
  },
  {
    id: 'sankat-mochan-hanumanashtak',
    title: 'Sankat Mochan Hanumanashtak',
    deity: 'Hanuman',
    category: 'Stotra',
    occasion: 'Tuesdays; Saturdays; deliverance from crisis',
    composer: 'Goswami Tulsidas',
    about:
      'Eight verses by Tulsidas, each recalling a crisis Hanuman resolved — the darkened worlds when he swallowed the sun, Sita\'s despair in Lanka, Lakshmana lying lifeless — with the refrain: "who in the world does not know you, monkey, as Sankat Mochan, the remover of afflictions?"',
    complete: true,
    verses: [
      {
        sanskrit: 'बाल समय रबि भक्षि लियो तब, तीनहुँ लोक भयो अँधियारो।\nताहि सों त्रास भयो जग को, यह संकट काहु सों जात न टारो।\nदेवन आनि करी बिनती तब, छाँड़ि दियो रबि कष्ट निवारो।\nको नहिं जानत है जग में कपि, संकटमोचन नाम तिहारो॥',
        iast: 'Bāla samaya rabi bhakṣi liyo taba, tīnahũ loka bhayo aṃdhiyāro\ntāhi soṃ trāsa bhayo jaga ko, yaha saṅkaṭa kāhu soṃ jāta na ṭāro\ndevana āni karī binatī taba, chāṃṛi diyo rabi kaṣṭa nivāro\nko nahiṃ jānata hai jaga meṃ kapi, saṅkaṭamocana nāma tihāro',
        meaning:
          'As a child you swallowed the sun, and the three worlds went dark; the world was terrified, and no one could resolve the crisis — until the gods came pleading and you released the sun, ending the distress. Who in the world does not know you, monkey, by the name Sankat Mochan?',
      },
      {
        sanskrit: 'बालि की त्रास कपीस बसै गिरि, जात महाप्रभु पंथ निहारो।\nचौंकि महामुनि साप दियो तब, चाहिय कौन बिचार बिचारो।\nकै द्विज रूप लिवाय महाप्रभु, सो तुम दास के सोक निवारो।\nको नहिं जानत है जग में कपि, संकटमोचन नाम तिहारो॥',
        iast: 'Bāli kī trāsa kapīsa basai giri, jāta mahāprabhu paṃtha nihāro\ncauṃki mahāmuni sāpa diyo taba, cāhiya kauna bicāra bicāro\nkai dvija rūpa livāya mahāprabhu, so tuma dāsa ke soka nivāro\nko nahiṃ jānata hai jaga meṃ kapi, saṅkaṭamocana nāma tihāro',
        meaning:
          'When Sugriva, in terror of Vali, lived on the mountain watching the path for the great Lord, it was you who, taking the form of a brahmin, brought him to Rama and removed your fellow-servant\'s grief. Who does not know you, monkey, as Sankat Mochan?',
      },
      {
        sanskrit: 'अंगद के सँग लेन गये सिय, खोजि कपीस यह बैन उचारो।\nजीवत ना बचिहौ हम सों जु, बिना सुधि लाये इहाँ पगु धारो।\nहेरि थके तट सिन्धु सबै तब, लाय सिया-सुधि प्रान उबारो।\nको नहिं जानत है जग में कपि, संकटमोचन नाम तिहारो॥',
        iast: 'Aṃgada ke saṃga lena gaye siya, khoji kapīsa yaha baina ucāro\njīvata nā bacihau hama soṃ ju, binā sudhi lāye ihāṃ pagu dhāro\nheri thake taṭa sindhu sabai taba, lāya siyā-sudhi prāna ubāro\nko nahiṃ jānata hai jaga meṃ kapi, saṅkaṭamocana nāma tihāro',
        meaning:
          'Sent with Angada to find Sita, under the king\'s decree that none should return alive without news of her — when all stood exhausted on the ocean shore, it was you who brought word of Sita and saved every life. Who does not know you, monkey, as Sankat Mochan?',
      },
      {
        sanskrit: 'रावन त्रास दई सिय को सब, राक्षसि सों कहि सोक निवारो।\nताहि समय हनुमान महाप्रभु, जाय महा रजनीचर मारो।\nचाहत सीय असोक सों आगि सु, दै प्रभु मुद्रिका सोक निवारो।\nको नहिं जानत है जग में कपि, संकटमोचन नाम तिहारो॥',
        iast: 'Rāvana trāsa daī siya ko saba, rākṣasi soṃ kahi soka nivāro\ntāhi samaya hanumāna mahāprabhu, jāya mahā rajanīcara māro\ncāhata sīya asoka soṃ āgi su, dai prabhu mudrikā soka nivāro\nko nahiṃ jānata hai jaga meṃ kapi, saṅkaṭamocana nāma tihāro',
        meaning:
          'When Ravana\'s threats had driven Sita to despair beneath the Ashoka tree and she asked its branches for fire, at that very moment you dropped the Lord\'s ring into her lap and dissolved her grief, slaying the great demons around her. Who does not know you, monkey, as Sankat Mochan?',
      },
      {
        sanskrit: 'बान लग्यो उर लछिमन के तब, प्रान तजे सुत रावन मारो।\nलै गृह बैद्य सुषेन समेत, तबै गिरि द्रोन सु बीर उपारो।\nआनि सजीवन हाथ दई तब, लछिमन के तुम प्रान उबारो।\nको नहिं जानत है जग में कपि, संकटमोचन नाम तिहारो॥',
        iast: 'Bāna lagyo ura lachimana ke taba, prāna taje suta rāvana māro\nlai gṛha baidya suṣena sameta, tabai giri drona su bīra upāro\nāni sajīvana hātha daī taba, lachimana ke tuma prāna ubāro\nko nahiṃ jānata hai jaga meṃ kapi, saṅkaṭamocana nāma tihāro',
        meaning:
          'When Ravana\'s son\'s arrow struck Lakshmana\'s chest and his life ebbed, you carried the physician Sushena house and all, uprooted the Drona mountain itself, and placing the Sanjivani in hand, saved Lakshmana\'s life. Who does not know you, monkey, as Sankat Mochan?',
      },
      {
        sanskrit: 'रावन जुद्ध अजान कियो तब, नाग कि फाँस सबै सिर डारो।\nश्रीरघुनाथ समेत सबै दल, मोह भयो यह संकट भारो।\nआनि खगेस तबै हनुमान जु, बन्धन काटि सुत्रास निवारो।\nको नहिं जानत है जग में कपि, संकटमोचन नाम तिहारो॥',
        iast: 'Rāvana juddha ajāna kiyo taba, nāga ki phāṃsa sabai sira ḍāro\nśrīraghunātha sameta sabai dala, moha bhayo yaha saṅkaṭa bhāro\nāni khagesa tabai hanumāna ju, bandhana kāṭi sutrāsa nivāro\nko nahiṃ jānata hai jaga meṃ kapi, saṅkaṭamocana nāma tihāro',
        meaning:
          'When in battle the serpent-noose was cast over every head and even Rama and his whole army lay bound in stupor — a fearsome crisis — it was you who brought Garuda, king of birds, cut the bonds and ended the terror. Who does not know you, monkey, as Sankat Mochan?',
      },
      {
        sanskrit: 'बन्धु समेत जबै अहिरावन, लै रघुनाथ पताल सिधारो।\nदेबिहिं पूजि भलि विधि सों बलि, देउ सबै मिलि मन्त्र विचारो।\nजाय सहाय भयो तब ही, अहिरावन सैन्य समेत सँहारो।\nको नहिं जानत है जग में कपि, संकटमोचन नाम तिहारो॥',
        iast: 'Bandhu sameta jabai ahirāvana, lai raghunātha patāla sidhāro\ndebihiṃ pūji bhali vidhi soṃ bali, deu sabai mili mantra vicāro\njāya sahāya bhayo taba hī, ahirāvana sainya sameta saṃhāro\nko nahiṃ jānata hai jaga meṃ kapi, saṅkaṭamocana nāma tihāro',
        meaning:
          'When Ahiravana carried Rama and Lakshmana down to the netherworld to offer them in sacrifice to his goddess, you went to their aid at once and destroyed Ahiravana together with his whole army. Who does not know you, monkey, as Sankat Mochan?',
      },
      {
        sanskrit: 'काज किये बड़ देवन के तुम, बीर महाप्रभु देखि बिचारो।\nकौन सो संकट मोर गरीब को, जो तुमसों नहिं जात है टारो।\nबेगि हरो हनुमान महाप्रभु, जो कछु संकट होय हमारो।\nको नहिं जानत है जग में कपि, संकटमोचन नाम तिहारो॥',
        iast: 'Kāja kiye baṛa devana ke tuma, bīra mahāprabhu dekhi bicāro\nkauna so saṅkaṭa mora garība ko, jo tumasoṃ nahiṃ jāta hai ṭāro\nbegi haro hanumāna mahāprabhu, jo kachu saṅkaṭa hoya hamāro\nko nahiṃ jānata hai jaga meṃ kapi, saṅkaṭamocana nāma tihāro',
        meaning:
          'You have accomplished great deeds even for the gods, O heroic lord — consider then: what trouble of this poor devotee could you not remove? Swiftly take away, great Hanuman, whatever crisis is mine. Who in the world does not know you, monkey, by the name Sankat Mochan?',
        label: 'Closing prayer',
      },
    ],
  },
  {
    id: 'bajrang-baan',
    title: 'Bajrang Baan (Opening)',
    deity: 'Hanuman',
    category: 'Stotra',
    occasion: 'Tuesdays; Saturdays; strong protection',
    about:
      'The "arrow of Bajrang" — an urgent, commanding prayer to Hanuman traditionally used when protection is needed most. Unlike the Chalisa\'s narrative praise, the Baan adjures Hanuman by his love for Rama to come at once. The opening doha and first chaupais are given here.',
    complete: false,
    note: 'Opening verses',
    verses: [
      {
        sanskrit: 'निश्चय प्रेम प्रतीति ते, बिनय करैं सनमान।\nतेहि के कारज सकल सुभ, सिद्ध करैं हनुमान॥',
        iast: 'Niścaya prema pratīti te, binaya karaiṃ sanamāna\ntehi ke kāraja sakala subha, siddha karaiṃ hanumāna',
        meaning:
          'For those who entreat him with certainty, love, faith and reverence, Hanuman brings all auspicious works to fulfilment.',
        label: 'Doha',
      },
      {
        sanskrit: 'जय हनुमन्त सन्त हितकारी। सुनि लीजै प्रभु अरज हमारी॥\nजन के काज बिलम्ब न कीजै। आतुर दौरि महा सुख दीजै॥',
        iast: 'Jaya hanumanta santa hitakārī, suni lījai prabhu araja hamārī\njana ke kāja bilamba na kījai, ātura dauri mahā sukha dījai',
        meaning:
          'Victory, Hanuman, benefactor of the saints — hear our petition, Lord. Do not delay in your servant\'s cause; come running swiftly and grant great joy.',
      },
      {
        sanskrit: 'जैसे कूदि सिन्धु महिपारा। सुरसा बदन पैठि बिस्तारा॥\nआगे जाय लंकिनी रोका। मारेहु लात गई सुरलोका॥',
        iast: 'Jaise kūdi sindhu mahipārā, surasā badana paiṭhi bistārā\nāge jāya laṅkinī rokā, mārehu lāta gaī suralokā',
        meaning:
          'As you leapt the ocean to the far shore, entered and outgrew Surasa\'s mouth; as Lankini barred your way ahead and one blow of your foot sent her to the realm of the gods —',
      },
      {
        sanskrit: 'जाय बिभीषन को सुख दीन्हा। सीता निरखि परम पद लीन्हा॥\nबाग उजारि सिन्धु महँ बोरा। अति आतुर जमकातर तोरा॥',
        iast: 'Jāya bibhīṣana ko sukha dīnhā, sītā nirakhi parama pada līnhā\nbāga ujāri sindhu mahaṃ borā, ati ātura jamakātara torā',
        meaning:
          '— as you gladdened Vibhishana, found Sita and attained the highest state; as you wrecked the grove and hurled it into the sea, swift and terrible — so act now for us.',
      },
    ],
  },
  {
    id: 'hanuman-mantra',
    title: 'Manojavam (Hanuman Vandana)',
    deity: 'Hanuman',
    category: 'Mantra',
    occasion: 'Daily; Tuesdays; before travel and effort',
    about:
      'The classic single-verse salutation to Hanuman, recited before study of the Ramayana and at the start of any effort requiring speed, strength and self-mastery. It names him swift as thought, fast as the wind, and foremost among the intelligent.',
    complete: true,
    verses: [
      {
        sanskrit: 'मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम्।\nवातात्मजं वानरयूथमुख्यं श्रीरामदूतं शरणं प्रपद्ये॥',
        iast: 'Manojavaṃ mārutatulyavegaṃ jitendriyaṃ buddhimatāṃ variṣṭham\nvātātmajaṃ vānarayūthamukhyaṃ śrīrāmadūtaṃ śaraṇaṃ prapadye',
        meaning:
          'Swift as thought, fast as the wind, master of the senses, foremost among the wise; son of the Wind, chief of the monkey hosts, messenger of Shri Rama — in him I take refuge.',
      },
    ],
  },
];
