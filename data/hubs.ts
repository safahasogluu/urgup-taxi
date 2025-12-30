import { Locale } from '@/i18n';

export interface HubPage {
  id: string;
  slug: string;
  type: 'airport' | 'taxi' | 'hotel';
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  h1: Record<Locale, string>;
  intro: Record<Locale, string>;
  metaTitle: Record<Locale, string>;
  metaDescription: Record<Locale, string>;
  faqs: Array<{
    question: Record<Locale, string>;
    answer: Record<Locale, string>;
  }>;
}

export const hubPages: HubPage[] = [
  // Kayseri Airport Hub
  {
    id: 'kayseri-airport',
    slug: 'kayseri-havalimani-transfer',
    type: 'airport',
    title: {
      tr: 'Kayseri Havalimanı Transfer',
      en: 'Kayseri Airport Transfer',
      ko: '카이세리 공항 픽업',
      ja: 'カイセリ空港送迎',
      'zh-hans': '开塞利机场接送',
    },
    h1: {
      tr: 'Kayseri Erkilet Havalimanı Transfer Hizmeti',
      en: 'Kayseri Erkilet Airport Transfer Service',
      ko: '카이세리 에르킬레트 공항 픽업 서비스',
      ja: 'カイセリ・エルキレト空港送迎サービス',
      'zh-hans': '开塞利埃尔基莱特机场接送服务',
    },
    intro: {
      tr: 'Kayseri Erkilet Havalimanı\'ndan (ASR) Kapadokya\'nın tüm bölgelerine güvenli ve konforlu transfer. Ürgüp, Göreme, Avanos, Mustafapaşa ve tüm otellerinize kapıdan kapıya hizmet.',
      en: 'Safe and comfortable transfers from Kayseri Erkilet Airport (ASR) to all Cappadocia regions. Door-to-door service to Ürgüp, Göreme, Avanos, Mustafapaşa and all your hotels.',
      ko: '카이세리 에르킬레트 공항(ASR)에서 카파도키아 전 지역으로 안전하고 편안한 픽업. 우르귀프, 괴레메, 아바노스, 무스타파파샤 및 모든 호텔까지 도어 투 도어 서비스.',
      ja: 'カイセリ・エルキレト空港（ASR）からカッパドキア全域への安全で快適な送迎。ウルギュップ、ギョレメ、アヴァノス、ムスタファパシャ、すべてのホテルへのドアツードアサービス。',
      'zh-hans': '从开塞利埃尔基莱特机场（ASR）到卡帕多西亚所有地区的安全舒适接送。于尔居普、格雷梅、阿瓦诺斯、穆斯塔法帕夏及所有酒店的门到门服务。',
    },
    description: {
      tr: 'Kayseri Erkilet Havalimanı transfer hizmeti. Kapadokya\'ya güvenli ulaşım.',
      en: 'Kayseri Erkilet Airport transfer service. Safe transportation to Cappadocia.',
      ko: '카이세리 에르킬레트 공항 픽업 서비스. 카파도키아까지 안전한 이동.',
      ja: 'カイセリ・エルキレト空港送迎サービス。カッパドキアへの安全な移動。',
      'zh-hans': '开塞利埃尔基莱特机场接送服务。安全前往卡帕多西亚。',
    },
    metaTitle: {
      tr: 'Kayseri Havalimanı Transfer | Kapadokya Ulaşım | 7/24 Hizmet',
      en: 'Kayseri Airport Transfer | Cappadocia Transportation | 24/7 Service',
      ko: '카이세리 공항 픽업 | 카파도키아 교통 | 24시간 서비스',
      ja: 'カイセリ空港送迎 | カッパドキア交通 | 24時間サービス',
      'zh-hans': '开塞利机场接送 | 卡帕多西亚交通 | 24小时服务',
    },
    metaDescription: {
      tr: 'Kayseri Erkilet Havalimanı\'ndan Ürgüp, Göreme, Avanos\'a güvenli transfer. VIP araçlar, profesyonel şoförler. Online rezervasyon veya WhatsApp ile hemen iletişime geçin.',
      en: 'Safe transfers from Kayseri Erkilet Airport to Ürgüp, Göreme, Avanos. VIP vehicles, professional drivers. Book online or contact via WhatsApp.',
      ko: '카이세리 에르킬레트 공항에서 우르귀프, 괴레메, 아바노스까지 안전한 픽업. VIP 차량, 전문 운전사. 온라인 예약 또는 WhatsApp으로 연락하세요.',
      ja: 'カイセリ・エルキレト空港からウルギュップ、ギョレメ、アヴァノスへの安全な送迎。VIP車両、プロドライバー。オンライン予約またはWhatsAppでご連絡ください。',
      'zh-hans': '从开塞利埃尔基莱特机场到于尔居普、格雷梅、阿瓦诺斯的安全接送。VIP车辆，专业司机。在线预订或通过WhatsApp联系。',
    },
    faqs: [
      {
        question: {
          tr: 'Kayseri Havalimanı\'ndan Göreme\'ye ne kadar sürer?',
          en: 'How long does it take from Kayseri Airport to Göreme?',
          ko: '카이세리 공항에서 괴레메까지 얼마나 걸립니까?',
          ja: 'カイセリ空港からギョレメまでどのくらいかかりますか？',
          'zh-hans': '从开塞利机场到格雷梅需要多长时间？',
        },
        answer: {
          tr: 'Kayseri Erkilet Havalimanı\'ndan Göreme\'ye yaklaşık 70-80 dakika sürer. Yol durumuna göre değişebilir.',
          en: 'It takes approximately 70-80 minutes from Kayseri Erkilet Airport to Göreme. May vary depending on traffic.',
          ko: '카이세리 에르킬레트 공항에서 괴레메까지 약 70-80분 소요됩니다. 교통 상황에 따라 달라질 수 있습니다.',
          ja: 'カイセリ・エルキレト空港からギョレメまで約70-80分かかります。交通状況により異なる場合があります。',
          'zh-hans': '从开塞利埃尔基莱特机场到格雷梅大约需要70-80分钟。可能因交通状况而异。',
        },
      },
      {
        question: {
          tr: 'Gece uçuşları için transfer var mı?',
          en: 'Is there transfer service for night flights?',
          ko: '야간 항공편을 위한 픽업 서비스가 있습니까?',
          ja: '夜間フライトの送迎サービスはありますか？',
          'zh-hans': '有夜间航班的接送服务吗？',
        },
        answer: {
          tr: 'Evet, 7/24 hizmet veriyoruz. Gece veya sabah erken saatlerde de transfer hizmeti sunuyoruz.',
          en: 'Yes, we operate 24/7. We provide transfer service for night or early morning flights.',
          ko: '네, 24시간 운영합니다. 야간 또는 이른 아침 항공편에도 픽업 서비스를 제공합니다.',
          ja: 'はい、24時間営業しています。深夜や早朝のフライトにも送迎サービスを提供しています。',
          'zh-hans': '是的，我们24小时运营。我们提供夜间或清晨航班的接送服务。',
        },
      },
      {
        question: {
          tr: 'Uçuş gecikmelerinde ne olur?',
          en: 'What happens if my flight is delayed?',
          ko: '항공편이 지연되면 어떻게 됩니까?',
          ja: 'フライトが遅延した場合はどうなりますか？',
          'zh-hans': '如果我的航班延误怎么办？',
        },
        answer: {
          tr: 'Uçuşunuzu takip ediyoruz. Gecikme durumunda şoförümüz beklemeye devam eder, ek ücret talep etmeyiz.',
          en: 'We track your flight. In case of delay, our driver will wait, no extra charge.',
          ko: '항공편을 추적합니다. 지연 시 운전사가 대기하며 추가 요금이 없습니다.',
          ja: 'フライトを追跡しています。遅延の場合、ドライバーは待機し、追加料金はかかりません。',
          'zh-hans': '我们追踪您的航班。如果延误，我们的司机会等待，不收取额外费用。',
        },
      },
      {
        question: {
          tr: 'Havalimanında nasıl karşılanacağım?',
          en: 'How will I be met at the airport?',
          ko: '공항에서 어떻게 만날 수 있습니까?',
          ja: '空港でどのように迎えてもらえますか？',
          'zh-hans': '在机场如何接我？',
        },
        answer: {
          tr: 'Şoförümüz varış terminalinde isminizin yazılı olduğu tabelayla sizi bekler.',
          en: 'Our driver will wait at the arrivals terminal with a sign showing your name.',
          ko: '운전사가 도착 터미널에서 이름이 적힌 표지판을 들고 기다립니다.',
          ja: 'ドライバーが到着ターミナルでお名前を書いた看板を持ってお待ちしています。',
          'zh-hans': '我们的司机将在到达航站楼举着写有您姓名的牌子等候。',
        },
      },
      {
        question: {
          tr: 'Kayseri Havalimanı transfer fiyatı ne kadar?',
          en: 'How much is the Kayseri Airport transfer price?',
          ko: '카이세리 공항 픽업 가격은 얼마입니까?',
          ja: 'カイセリ空港送迎の料金はいくらですか？',
          'zh-hans': '开塞利机场接送价格是多少？',
        },
        answer: {
          tr: 'Fiyatlar varış noktasına göre değişir. Detaylı fiyat için bizi arayın veya WhatsApp\'tan yazın.',
          en: 'Prices vary by destination. Call us or WhatsApp for detailed pricing.',
          ko: '가격은 목적지에 따라 다릅니다. 자세한 가격은 전화 또는 WhatsApp으로 문의하세요.',
          ja: '料金は目的地によって異なります。詳細な料金についてはお電話またはWhatsAppでお問い合わせください。',
          'zh-hans': '价格因目的地而异。请致电或WhatsApp了解详细价格。',
        },
      },
    ],
  },
  // Nevşehir Airport Hub
  {
    id: 'nevsehir-airport',
    slug: 'nevsehir-havalimani-transfer',
    type: 'airport',
    title: {
      tr: 'Nevşehir Havalimanı Transfer',
      en: 'Nevşehir Airport Transfer',
      ko: '네브세히르 공항 픽업',
      ja: 'ネヴシェヒル空港送迎',
      'zh-hans': '内夫谢希尔机场接送',
    },
    h1: {
      tr: 'Nevşehir Kapadokya Havalimanı Transfer Hizmeti',
      en: 'Nevşehir Kapadokya Airport Transfer Service',
      ko: '네브세히르 카파도키아 공항 픽업 서비스',
      ja: 'ネヴシェヒル・カッパドキア空港送迎サービス',
      'zh-hans': '内夫谢希尔卡帕多西亚机场接送服务',
    },
    intro: {
      tr: 'Nevşehir Kapadokya Havalimanı\'ndan (NAV) Kapadokya\'nın merkezine en yakın ulaşım. Ürgüp\'e 35 km, Göreme\'ye 40 km mesafede. Hızlı ve konforlu transfer hizmeti.',
      en: 'The closest airport to central Cappadocia. Only 35 km to Ürgüp, 40 km to Göreme. Fast and comfortable transfer service from Nevşehir Kapadokya Airport (NAV).',
      ko: '카파도키아 중심부에서 가장 가까운 공항. 우르귀프까지 35km, 괴레메까지 40km. 네브세히르 카파도키아 공항(NAV)에서 빠르고 편안한 픽업 서비스.',
      ja: 'カッパドキア中心部に最も近い空港。ウルギュップまで35km、ギョレメまで40km。ネヴシェヒル・カッパドキア空港（NAV）からの迅速で快適な送迎サービス。',
      'zh-hans': '距离卡帕多西亚中心最近的机场。距于尔居普35公里，距格雷梅40公里。从内夫谢希尔卡帕多西亚机场（NAV）提供快速舒适的接送服务。',
    },
    description: {
      tr: 'Nevşehir Kapadokya Havalimanı transfer hizmeti. En yakın havalimanından Kapadokya\'ya.',
      en: 'Nevşehir Kapadokya Airport transfer. From the closest airport to Cappadocia.',
      ko: '네브세히르 카파도키아 공항 픽업 서비스. 카파도키아에서 가장 가까운 공항에서.',
      ja: 'ネヴシェヒル・カッパドキア空港送迎。カッパドキアに最も近い空港から。',
      'zh-hans': '内夫谢希尔卡帕多西亚机场接送。从最近的机场到卡帕多西亚。',
    },
    metaTitle: {
      tr: 'Nevşehir Havalimanı Transfer | NAV Kapadokya | 7/24 Hizmet',
      en: 'Nevşehir Airport Transfer | NAV Cappadocia | 24/7 Service',
      ko: '네브세히르 공항 픽업 | NAV 카파도키아 | 24시간 서비스',
      ja: 'ネヴシェヒル空港送迎 | NAVカッパドキア | 24時間サービス',
      'zh-hans': '内夫谢希尔机场接送 | NAV卡帕多西亚 | 24小时服务',
    },
    metaDescription: {
      tr: 'Nevşehir Kapadokya Havalimanı\'ndan Ürgüp, Göreme, Uçhisar\'a en hızlı transfer. VIP araçlar, 7/24 hizmet. Hemen rezervasyon yapın.',
      en: 'Fastest transfers from Nevşehir Kapadokya Airport to Ürgüp, Göreme, Uçhisar. VIP vehicles, 24/7 service. Book now.',
      ko: '네브세히르 카파도키아 공항에서 우르귀프, 괴레메, 우치히사르까지 가장 빠른 픽업. VIP 차량, 24시간 서비스. 지금 예약하세요.',
      ja: 'ネヴシェヒル・カッパドキア空港からウルギュップ、ギョレメ、ウチヒサルへの最速送迎。VIP車両、24時間サービス。今すぐ予約。',
      'zh-hans': '从内夫谢希尔卡帕多西亚机场到于尔居普、格雷梅、乌奇希萨尔的最快接送。VIP车辆，24小时服务。立即预订。',
    },
    faqs: [
      {
        question: {
          tr: 'Nevşehir Havalimanı Kapadokya\'ya ne kadar uzak?',
          en: 'How far is Nevşehir Airport from Cappadocia?',
          ko: '네브세히르 공항은 카파도키아에서 얼마나 멉니까?',
          ja: 'ネヴシェヒル空港はカッパドキアからどのくらい離れていますか？',
          'zh-hans': '内夫谢希尔机场距卡帕多西亚多远？',
        },
        answer: {
          tr: 'Nevşehir Kapadokya Havalimanı, Ürgüp\'e 35 km, Göreme\'ye 40 km uzaklıktadır. Kapadokya\'ya en yakın havalimanıdır.',
          en: 'Nevşehir Kapadokya Airport is 35 km from Ürgüp and 40 km from Göreme. It\'s the closest airport to Cappadocia.',
          ko: '네브세히르 카파도키아 공항은 우르귀프에서 35km, 괴레메에서 40km 떨어져 있습니다. 카파도키아에서 가장 가까운 공항입니다.',
          ja: 'ネヴシェヒル・カッパドキア空港はウルギュップから35km、ギョレメから40kmです。カッパドキアに最も近い空港です。',
          'zh-hans': '内夫谢希尔卡帕多西亚机场距于尔居普35公里，距格雷梅40公里。这是距卡帕多西亚最近的机场。',
        },
      },
      {
        question: {
          tr: 'NAV havalimanından Ürgüp\'e transfer ne kadar sürer?',
          en: 'How long is the transfer from NAV airport to Ürgüp?',
          ko: 'NAV 공항에서 우르귀프까지 픽업은 얼마나 걸립니까?',
          ja: 'NAV空港からウルギュップへの送迎はどのくらいかかりますか？',
          'zh-hans': '从NAV机场到于尔居普的接送需要多长时间？',
        },
        answer: {
          tr: 'Nevşehir Havalimanı\'ndan Ürgüp\'e transfer yaklaşık 40-45 dakika sürer.',
          en: 'Transfer from Nevşehir Airport to Ürgüp takes approximately 40-45 minutes.',
          ko: '네브세히르 공항에서 우르귀프까지 픽업은 약 40-45분 소요됩니다.',
          ja: 'ネヴシェヒル空港からウルギュップへの送迎は約40-45分かかります。',
          'zh-hans': '从内夫谢希尔机场到于尔居普的接送大约需要40-45分钟。',
        },
      },
      {
        question: {
          tr: 'Bebek koltuğu sağlıyor musunuz?',
          en: 'Do you provide child seats?',
          ko: '아기 시트를 제공합니까?',
          ja: 'チャイルドシートは提供していますか？',
          'zh-hans': '你们提供儿童座椅吗？',
        },
        answer: {
          tr: 'Evet, ücretsiz bebek koltuğu sağlıyoruz. Rezervasyon sırasında belirtmeniz yeterli.',
          en: 'Yes, we provide free child seats. Just mention it when booking.',
          ko: '네, 무료 아기 시트를 제공합니다. 예약 시 말씀해 주세요.',
          ja: 'はい、無料でチャイルドシートを提供しています。予約時にお申し付けください。',
          'zh-hans': '是的，我们提供免费儿童座椅。预订时请说明。',
        },
      },
      {
        question: {
          tr: 'Kaç yolcu taşıyabilirsiniz?',
          en: 'How many passengers can you carry?',
          ko: '몇 명의 승객을 태울 수 있습니까?',
          ja: '何人まで乗車できますか？',
          'zh-hans': '你们可以载多少乘客？',
        },
        answer: {
          tr: 'Sedan araçlarımız 1-3 yolcu, Mercedes Vito minibüslerimiz 4-8 yolcu taşıyabilir. Daha büyük gruplar için minibüs sağlayabiliriz.',
          en: 'Our sedans carry 1-3 passengers, Mercedes Vito minibuses carry 4-8 passengers. We can arrange minibuses for larger groups.',
          ko: '세단은 1-3명, Mercedes Vito 미니버스는 4-8명을 태울 수 있습니다. 더 큰 그룹은 미니버스를 준비할 수 있습니다.',
          ja: 'セダンは1-3名、Mercedes Vitoミニバスは4-8名乗車可能です。大人数の場合はミニバスを手配できます。',
          'zh-hans': '我们的轿车可载1-3名乘客，Mercedes Vito小巴可载4-8名乘客。大型团体可安排小巴。',
        },
      },
      {
        question: {
          tr: 'Ödemeyi nasıl yapabilirim?',
          en: 'How can I pay?',
          ko: '어떻게 결제할 수 있습니까?',
          ja: '支払いはどのようにすればよいですか？',
          'zh-hans': '如何付款？',
        },
        answer: {
          tr: 'Nakit (TL, EUR, USD) veya kredi kartı ile ödeme yapabilirsiniz. Ödeme yolculuk sonunda araçta alınır.',
          en: 'You can pay by cash (TRY, EUR, USD) or credit card. Payment is collected at the end of the journey.',
          ko: '현금(TRY, EUR, USD) 또는 신용 카드로 결제할 수 있습니다. 결제는 여행이 끝날 때 받습니다.',
          ja: '現金（TRY、EUR、USD）またはクレジットカードでお支払いいただけます。お支払いは乗車終了時に行います。',
          'zh-hans': '您可以用现金（TRY、EUR、USD）或信用卡支付。在行程结束时付款。',
        },
      },
    ],
  },
  // Kapadokya Taksi Hub
  {
    id: 'kapadokya-taksi',
    slug: 'kapadokya-taksi',
    type: 'taxi',
    title: {
      tr: 'Kapadokya Taksi',
      en: 'Cappadocia Taxi',
      ko: '카파도키아 택시',
      ja: 'カッパドキアタクシー',
      'zh-hans': '卡帕多西亚出租车',
    },
    h1: {
      tr: 'Kapadokya Taksi Hizmeti - 7/24 Güvenilir Ulaşım',
      en: 'Cappadocia Taxi Service - 24/7 Reliable Transportation',
      ko: '카파도키아 택시 서비스 - 24시간 신뢰할 수 있는 교통',
      ja: 'カッパドキアタクシーサービス - 24時間信頼できる交通',
      'zh-hans': '卡帕多西亚出租车服务 - 24小时可靠交通',
    },
    intro: {
      tr: 'Kapadokya bölgesinde 7/24 profesyonel taksi hizmeti. Ürgüp, Göreme, Uçhisar, Avanos, Mustafapaşa ve tüm turizm noktalarına güvenli ulaşım. Balon turları için sabah erken transferler, gün içi turlar ve havalimanı transferleri.',
      en: '24/7 professional taxi service in Cappadocia region. Safe transportation to Ürgüp, Göreme, Uçhisar, Avanos, Mustafapaşa and all tourist spots. Early morning transfers for balloon tours, day tours and airport transfers.',
      ko: '카파도키아 지역 24시간 전문 택시 서비스. 우르귀프, 괴레메, 우치히사르, 아바노스, 무스타파파샤 및 모든 관광지로 안전한 이동. 열기구 투어를 위한 이른 아침 픽업, 일일 투어 및 공항 픽업.',
      ja: 'カッパドキア地域の24時間プロフェッショナルタクシーサービス。ウルギュップ、ギョレメ、ウチヒサル、アヴァノス、ムスタファパシャ、すべての観光スポットへの安全な移動。バルーンツアーのための早朝送迎、デイツアー、空港送迎。',
      'zh-hans': '卡帕多西亚地区24小时专业出租车服务。安全前往于尔居普、格雷梅、乌奇希萨尔、阿瓦诺斯、穆斯塔法帕夏及所有旅游景点。热气球之旅的清晨接送、日间游览和机场接送。',
    },
    description: {
      tr: 'Kapadokya bölgesinde 7/24 taksi hizmeti.',
      en: '24/7 taxi service in Cappadocia region.',
      ko: '카파도키아 지역 24시간 택시 서비스.',
      ja: 'カッパドキア地域の24時間タクシーサービス。',
      'zh-hans': '卡帕多西亚地区24小时出租车服务。',
    },
    metaTitle: {
      tr: 'Kapadokya Taksi | Ürgüp Göreme Taksi | 7/24 Hizmet',
      en: 'Cappadocia Taxi | Ürgüp Göreme Taxi | 24/7 Service',
      ko: '카파도키아 택시 | 우르귀프 괴레메 택시 | 24시간 서비스',
      ja: 'カッパドキアタクシー | ウルギュップ・ギョレメタクシー | 24時間サービス',
      'zh-hans': '卡帕多西亚出租车 | 于尔居普格雷梅出租车 | 24小时服务',
    },
    metaDescription: {
      tr: 'Kapadokya\'da güvenilir taksi hizmeti. Ürgüp, Göreme, Uçhisar, Avanos bölgesinde 7/24 taksi. Balon turu transferi, havalimanı transferi. Hemen arayın!',
      en: 'Reliable taxi service in Cappadocia. 24/7 taxi in Ürgüp, Göreme, Uçhisar, Avanos area. Balloon tour transfers, airport transfers. Call now!',
      ko: '카파도키아의 신뢰할 수 있는 택시 서비스. 우르귀프, 괴레메, 우치히사르, 아바노스 지역 24시간 택시. 열기구 투어 픽업, 공항 픽업. 지금 전화하세요!',
      ja: 'カッパドキアの信頼できるタクシーサービス。ウルギュップ、ギョレメ、ウチヒサル、アヴァノス地域の24時間タクシー。バルーンツアー送迎、空港送迎。今すぐお電話ください！',
      'zh-hans': '卡帕多西亚可靠的出租车服务。于尔居普、格雷梅、乌奇希萨尔、阿瓦诺斯地区24小时出租车。热气球之旅接送，机场接送。立即致电！',
    },
    faqs: [
      {
        question: {
          tr: 'Balon turu için sabah erken transfer yapıyor musunuz?',
          en: 'Do you provide early morning transfers for balloon tours?',
          ko: '열기구 투어를 위한 이른 아침 픽업을 제공합니까?',
          ja: 'バルーンツアーのための早朝送迎はありますか？',
          'zh-hans': '你们提供热气球之旅的清晨接送吗？',
        },
        answer: {
          tr: 'Evet, balon turları için sabah 04:00-05:00 arası otel transferi yapıyoruz. Bir gün önceden rezervasyon yapmanızı öneririz.',
          en: 'Yes, we provide hotel transfers between 04:00-05:00 AM for balloon tours. We recommend booking a day in advance.',
          ko: '네, 열기구 투어를 위해 오전 4:00-5:00 사이에 호텔 픽업을 제공합니다. 하루 전에 예약하시는 것이 좋습니다.',
          ja: 'はい、バルーンツアーのために午前4:00-5:00の間にホテル送迎を行っています。前日に予約することをお勧めします。',
          'zh-hans': '是的，我们提供凌晨4:00-5:00之间的热气球之旅酒店接送。建议提前一天预订。',
        },
      },
      {
        question: {
          tr: 'Kapadokya\'da günlük tur için taksi kiralayabilir miyim?',
          en: 'Can I hire a taxi for a day tour in Cappadocia?',
          ko: '카파도키아에서 일일 투어를 위해 택시를 빌릴 수 있습니까?',
          ja: 'カッパドキアで日帰りツアーのためにタクシーをチャーターできますか？',
          'zh-hans': '我可以在卡帕多西亚租一辆出租车进行一日游吗？',
        },
        answer: {
          tr: 'Evet, günlük tur için araç kiralama hizmeti sunuyoruz. Şoförlü veya şoförsüz seçenekler mevcuttur. Detaylar için arayın.',
          en: 'Yes, we offer vehicle rental for day tours. Options with or without driver available. Call for details.',
          ko: '네, 일일 투어를 위한 차량 렌탈 서비스를 제공합니다. 운전사 포함 또는 미포함 옵션이 있습니다. 자세한 내용은 전화주세요.',
          ja: 'はい、日帰りツアー用の車両レンタルサービスを提供しています。ドライバー付きまたはドライバーなしのオプションがあります。詳細はお電話ください。',
          'zh-hans': '是的，我们提供日间游览的车辆租赁服务。有带司机或不带司机的选项。详情请致电。',
        },
      },
      {
        question: {
          tr: 'Hangi bölgelere hizmet veriyorsunuz?',
          en: 'Which areas do you serve?',
          ko: '어떤 지역에 서비스를 제공합니까?',
          ja: 'どの地域にサービスを提供していますか？',
          'zh-hans': '你们服务哪些地区？',
        },
        answer: {
          tr: 'Ürgüp, Göreme, Uçhisar, Avanos, Ortahisar, Mustafapaşa, Çavuşin, Paşabağ, Zelve ve tüm Kapadokya bölgesine hizmet veriyoruz.',
          en: 'We serve Ürgüp, Göreme, Uçhisar, Avanos, Ortahisar, Mustafapaşa, Çavuşin, Paşabağ, Zelve and all Cappadocia region.',
          ko: '우르귀프, 괴레메, 우치히사르, 아바노스, 오르타히사르, 무스타파파샤, 차우신, 파샤바, 젤베 및 모든 카파도키아 지역에 서비스를 제공합니다.',
          ja: 'ウルギュップ、ギョレメ、ウチヒサル、アヴァノス、オルタヒサル、ムスタファパシャ、チャウシン、パシャバー、ゼルヴェ、カッパドキア全域にサービスを提供しています。',
          'zh-hans': '我们服务于尔居普、格雷梅、乌奇希萨尔、阿瓦诺斯、奥尔塔希萨尔、穆斯塔法帕夏、恰武辛、帕夏巴、泽尔韦及整个卡帕多西亚地区。',
        },
      },
      {
        question: {
          tr: 'Kredi kartı kabul ediyor musunuz?',
          en: 'Do you accept credit cards?',
          ko: '신용 카드를 받습니까?',
          ja: 'クレジットカードは使えますか？',
          'zh-hans': '你们接受信用卡吗？',
        },
        answer: {
          tr: 'Evet, nakit ve kredi kartı ile ödeme kabul ediyoruz. TL, EUR ve USD nakit ödeme de yapabilirsiniz.',
          en: 'Yes, we accept cash and credit card payments. You can also pay in TRY, EUR or USD cash.',
          ko: '네, 현금 및 신용 카드 결제를 받습니다. TRY, EUR 또는 USD 현금으로도 결제할 수 있습니다.',
          ja: 'はい、現金とクレジットカードのお支払いを受け付けています。TRY、EUR、USDの現金でもお支払いいただけます。',
          'zh-hans': '是的，我们接受现金和信用卡付款。您也可以用TRY、EUR或USD现金支付。',
        },
      },
    ],
  },
  // Hotel Transfer Hub
  {
    id: 'otel-transfer',
    slug: 'otel-transfer',
    type: 'hotel',
    title: {
      tr: 'Otel Transfer',
      en: 'Hotel Transfer',
      ko: '호텔 픽업',
      ja: 'ホテル送迎',
      'zh-hans': '酒店接送',
    },
    h1: {
      tr: 'Kapadokya Otel Transfer Hizmeti',
      en: 'Cappadocia Hotel Transfer Service',
      ko: '카파도키아 호텔 픽업 서비스',
      ja: 'カッパドキア ホテル送迎サービス',
      'zh-hans': '卡帕多西亚酒店接送服务',
    },
    intro: {
      tr: 'Kapadokya\'daki tüm otellerden havalimanına ve havalimanından otelinize kapıdan kapıya transfer. Cave otel, butik otel, lüks resort - tüm konaklama noktalarına hizmet. Uçuş takibi dahil.',
      en: 'Door-to-door transfers from all Cappadocia hotels to airports and from airports to your hotel. Cave hotels, boutique hotels, luxury resorts - service to all accommodation types. Flight tracking included.',
      ko: '카파도키아 모든 호텔에서 공항까지, 공항에서 호텔까지 도어 투 도어 픽업. 동굴 호텔, 부티크 호텔, 럭셔리 리조트 - 모든 숙박 유형에 서비스. 항공편 추적 포함.',
      ja: 'カッパドキアのすべてのホテルから空港へ、空港からホテルへのドアツードア送迎。洞窟ホテル、ブティックホテル、ラグジュアリーリゾート - すべての宿泊施設タイプにサービス。フライト追跡付き。',
      'zh-hans': '从卡帕多西亚所有酒店到机场，从机场到酒店的门到门接送。洞穴酒店、精品酒店、豪华度假村 - 服务所有住宿类型。包含航班追踪。',
    },
    description: {
      tr: 'Kapadokya otellerinden havalimanı transferi.',
      en: 'Airport transfers from Cappadocia hotels.',
      ko: '카파도키아 호텔에서 공항 픽업.',
      ja: 'カッパドキアホテルからの空港送迎。',
      'zh-hans': '从卡帕多西亚酒店到机场的接送。',
    },
    metaTitle: {
      tr: 'Kapadokya Otel Transfer | Havalimanı - Otel | Kapıdan Kapıya',
      en: 'Cappadocia Hotel Transfer | Airport - Hotel | Door to Door',
      ko: '카파도키아 호텔 픽업 | 공항 - 호텔 | 도어 투 도어',
      ja: 'カッパドキアホテル送迎 | 空港 - ホテル | ドアツードア',
      'zh-hans': '卡帕多西亚酒店接送 | 机场 - 酒店 | 门到门',
    },
    metaDescription: {
      tr: 'Kapadokya otellerinden Kayseri ve Nevşehir havalimanlarına transfer. Cave otel, butik otel transferleri. 7/24 hizmet, uçuş takibi dahil.',
      en: 'Transfers from Cappadocia hotels to Kayseri and Nevşehir airports. Cave hotel, boutique hotel transfers. 24/7 service, flight tracking included.',
      ko: '카파도키아 호텔에서 카이세리 및 네브세히르 공항까지 픽업. 동굴 호텔, 부티크 호텔 픽업. 24시간 서비스, 항공편 추적 포함.',
      ja: 'カッパドキアホテルからカイセリ・ネヴシェヒル空港への送迎。洞窟ホテル、ブティックホテル送迎。24時間サービス、フライト追跡付き。',
      'zh-hans': '从卡帕多西亚酒店到开塞利和内夫谢希尔机场的接送。洞穴酒店、精品酒店接送。24小时服务，包含航班追踪。',
    },
    faqs: [
      {
        question: {
          tr: 'Cave otellerden de transfer yapıyor musunuz?',
          en: 'Do you provide transfers from cave hotels?',
          ko: '동굴 호텔에서도 픽업을 제공합니까?',
          ja: '洞窟ホテルからの送迎もありますか？',
          'zh-hans': '你们从洞穴酒店也提供接送吗？',
        },
        answer: {
          tr: 'Evet, Kapadokya\'daki tüm cave otellerden transfer hizmeti sunuyoruz. Dar sokaklara giren araçlarımız mevcuttur.',
          en: 'Yes, we provide transfer service from all cave hotels in Cappadocia. We have vehicles that can access narrow streets.',
          ko: '네, 카파도키아의 모든 동굴 호텔에서 픽업 서비스를 제공합니다. 좁은 골목에도 들어갈 수 있는 차량이 있습니다.',
          ja: 'はい、カッパドキアのすべての洞窟ホテルから送迎サービスを提供しています。狭い通りにも入れる車両があります。',
          'zh-hans': '是的，我们提供从卡帕多西亚所有洞穴酒店的接送服务。我们有可以进入狭窄街道的车辆。',
        },
      },
      {
        question: {
          tr: 'Otelimden havalimanına ne zaman çıkmalıyım?',
          en: 'When should I leave my hotel for the airport?',
          ko: '공항으로 호텔에서 언제 출발해야 합니까?',
          ja: '空港に向けてホテルをいつ出発すべきですか？',
          'zh-hans': '我应该什么时候从酒店出发去机场？',
        },
        answer: {
          tr: 'İç hat uçuşları için 2 saat, dış hat uçuşları için 3 saat önce otelden çıkmanızı öneririz. Yolculuk süresini de hesaba katın.',
          en: 'We recommend leaving your hotel 2 hours before domestic flights, 3 hours before international flights. Factor in travel time.',
          ko: '국내선 2시간 전, 국제선 3시간 전에 호텔에서 출발하시는 것이 좋습니다. 이동 시간도 고려하세요.',
          ja: '国内線は2時間前、国際線は3時間前にホテルを出発することをお勧めします。移動時間も考慮してください。',
          'zh-hans': '建议国内航班提前2小时、国际航班提前3小时离开酒店。请考虑路程时间。',
        },
      },
      {
        question: {
          tr: 'Bagaj sınırı var mı?',
          en: 'Is there a luggage limit?',
          ko: '수하물 제한이 있습니까?',
          ja: '荷物の制限はありますか？',
          'zh-hans': '有行李限制吗？',
        },
        answer: {
          tr: 'Kişi başı 1 büyük valiz + 1 el bagajı standarttır. Ekstra bagaj için önceden bilgi verin.',
          en: '1 large suitcase + 1 carry-on per person is standard. Let us know in advance for extra luggage.',
          ko: '1인당 대형 가방 1개 + 기내용 가방 1개가 표준입니다. 추가 수하물은 미리 알려주세요.',
          ja: '1人あたり大きなスーツケース1個+機内持ち込み1個が標準です。追加の荷物は事前にお知らせください。',
          'zh-hans': '标准为每人1个大行李箱+1个随身行李。如有额外行李请提前告知。',
        },
      },
    ],
  },
];

// Get hub by slug
export function getHubBySlug(slug: string): HubPage | undefined {
  return hubPages.find(h => h.slug === slug);
}

// Get hubs by type
export function getHubsByType(type: 'airport' | 'taxi' | 'hotel'): HubPage[] {
  return hubPages.filter(h => h.type === type);
}

