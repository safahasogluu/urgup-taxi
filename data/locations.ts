import { Locale } from '@/i18n';

export interface Location {
  id: string;
  slug: string;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  faqs: Array<{
    question: Record<Locale, string>;
    answer: Record<Locale, string>;
  }>;
}

export const locations: Location[] = [
  {
    id: 'urgup',
    slug: 'urgup-taksi',
    name: {
      tr: 'Ürgüp Taksi',
      en: 'Ürgüp Taxi',
      ko: '우르귀프 택시',
      ja: 'ウルギュップタクシー',
      'zh-hans': '于尔居普出租车',
    },
    description: {
      tr: 'Ürgüp bölgesinde güvenilir ve profesyonel taksi hizmeti. 7/24 hizmet.',
      en: 'Reliable and professional taxi service in Ürgüp area. 24/7 service.',
      ko: '우르귀프 지역의 신뢰할 수 있고 전문적인 택시 서비스. 24/7 서비스.',
      ja: 'ウルギュップ地域の信頼できるプロフェッショナルなタクシーサービス。24時間営業。',
      'zh-hans': '于尔居普地区可靠且专业的出租车服务。24/7服务。',
    },
    faqs: [
      {
        question: {
          tr: 'Ürgüp içinde taksi ücreti ne kadar?',
          en: 'How much is the taxi fare within Ürgüp?',
          ko: '우르귀프 내부 택시 요금은 얼마입니까?',
          ja: 'ウルギュップ市内のタクシー料金はいくらですか？',
          'zh-hans': '于尔居普市内出租车费用是多少？',
        },
        answer: {
          tr: 'Ürgüp içi kısa mesafeler için başlangıç ücreti uygulanır. Detaylı fiyat bilgisi için bizi arayın.',
          en: 'Starting fare applies for short distances within Ürgüp. Call us for detailed pricing.',
          ko: '우르귀프 내부의 짧은 거리는 기본 요금이 적용됩니다. 자세한 가격 정보는 전화 주세요.',
          ja: 'ウルギュップ市内の短距離は初乗り料金が適用されます。詳細な料金についてはお電話ください。',
          'zh-hans': '于尔居普市内短途按起步价收费。详情请致电。',
        },
      },
    ],
  },
  {
    id: 'goreme',
    slug: 'goreme-taksi',
    name: {
      tr: 'Göreme Taksi',
      en: 'Göreme Taxi',
      ko: '괴레메 택시',
      ja: 'ギョレメタクシー',
      'zh-hans': '格雷梅出租车',
    },
    description: {
      tr: 'Göreme ve çevresinde hızlı ve güvenli taksi hizmeti.',
      en: 'Fast and safe taxi service in Göreme and surrounding areas.',
      ko: '괴레메 및 주변 지역의 빠르고 안전한 택시 서비스.',
      ja: 'ギョレメと周辺地域の迅速で安全なタクシーサービス。',
      'zh-hans': '格雷梅及周边地区快速安全的出租车服务。',
    },
    faqs: [
      {
        question: {
          tr: 'Göreme\'den havalimanına ne kadar sürer?',
          en: 'How long does it take from Göreme to the airport?',
          ko: '괴레메에서 공항까지 얼마나 걸립니까?',
          ja: 'ギョレメから空港までどのくらいかかりますか？',
          'zh-hans': '从格雷梅到机场需要多长时间？',
        },
        answer: {
          tr: 'Göreme\'den Nevşehir Kapadokya Havalimanı\'na yaklaşık 45-50 dakika sürer.',
          en: 'It takes approximately 45-50 minutes from Göreme to Nevşehir Kapadokya Airport.',
          ko: '괴레메에서 네브세히르 카파도키아 공항까지 약 45-50분 소요됩니다.',
          ja: 'ギョレメからネヴシェヒル・カッパドキア空港まで約45-50分かかります。',
          'zh-hans': '从格雷梅到内夫谢希尔卡帕多西亚机场大约需要45-50分钟。',
        },
      },
    ],
  },
  {
    id: 'uchisar',
    slug: 'uchisar-taksi',
    name: {
      tr: 'Uçhisar Taksi',
      en: 'Uçhisar Taxi',
      ko: '우치히사르 택시',
      ja: 'ウチヒサルタクシー',
      'zh-hans': '乌奇希萨尔出租车',
    },
    description: {
      tr: 'Uçhisar kalesi ve çevresinde profesyonel taksi hizmeti.',
      en: 'Professional taxi service around Uçhisar Castle and surrounding areas.',
      ko: '우치히사르 성과 주변 지역의 전문 택시 서비스.',
      ja: 'ウチヒサル城と周辺地域のプロフェッショナルなタクシーサービス。',
      'zh-hans': '乌奇希萨尔城堡及周边地区的专业出租车服务。',
    },
    faqs: [
      {
        question: {
          tr: 'Uçhisar\'dan Ürgüp\'e ne kadar?',
          en: 'How much from Uçhisar to Ürgüp?',
          ko: '우치히사르에서 우르귀프까지 얼마입니까?',
          ja: 'ウチヒサルからウルギュップまでいくらですか？',
          'zh-hans': '从乌奇希萨尔到于尔居普多少钱？',
        },
        answer: {
          tr: 'Uçhisar-Ürgüp arası mesafe yaklaşık 5 km. Fiyat için bizi arayın.',
          en: 'The distance between Uçhisar and Ürgüp is approximately 5 km. Call us for pricing.',
          ko: '우치히사르-우르귀프 사이 거리는 약 5km입니다. 가격은 전화 주세요.',
          ja: 'ウチヒサル-ウルギュップ間の距離は約5kmです。料金についてはお電話ください。',
          'zh-hans': '乌奇希萨尔到于尔居普的距离约5公里。价格请致电。',
        },
      },
    ],
  },
  {
    id: 'mustafapasa',
    slug: 'mustafapasa-taksi',
    name: {
      tr: 'Mustafapaşa Taksi',
      en: 'Mustafapaşa Taxi',
      ko: '무스타파파샤 택시',
      ja: 'ムスタファパシャタクシー',
      'zh-hans': '穆斯塔法帕夏出租车',
    },
    description: {
      tr: 'Mustafapaşa ve Sinasos bölgesinde güvenilir taksi hizmeti.',
      en: 'Reliable taxi service in Mustafapaşa and Sinasos area.',
      ko: '무스타파파샤 및 시나소스 지역의 신뢰할 수 있는 택시 서비스.',
      ja: 'ムスタファパシャとシナソス地域の信頼できるタクシーサービス。',
      'zh-hans': '穆斯塔法帕夏和西纳索斯地区的可靠出租车服务。',
    },
    faqs: [
      {
        question: {
          tr: 'Mustafapaşa\'dan havalimanı transferi var mı?',
          en: 'Is there airport transfer from Mustafapaşa?',
          ko: '무스타파파샤에서 공항 터미널이 있습니까?',
          ja: 'ムスタファパシャから空港送迎はありますか？',
          'zh-hans': '从穆斯塔法帕夏有机场接送吗？',
        },
        answer: {
          tr: 'Evet, Mustafapaşa\'dan havalimanı transfer hizmetimiz mevcuttur. Rezervasyon için arayın.',
          en: 'Yes, we provide airport transfer service from Mustafapaşa. Call to book.',
          ko: '네, 무스타파파샤에서 공항 터미널 서비스를 제공합니다. 예약은 전화 주세요.',
          ja: 'はい、ムスタファパシャから空港送迎サービスを提供しています。予約はお電話ください。',
          'zh-hans': '是的，我们提供从穆斯塔法帕夏的机场接送服务。请致电预订。',
        },
      },
    ],
  },
  {
    id: 'ortahisar',
    slug: 'ortahisar-taksi',
    name: {
      tr: 'Ortahisar Taksi',
      en: 'Ortahisar Taxi',
      ko: '오르타히사르 택시',
      ja: 'オルタヒサルタクシー',
      'zh-hans': '奥尔塔希萨尔出租车',
    },
    description: {
      tr: 'Ortahisar kalesi bölgesinde 7/24 taksi hizmeti.',
      en: '24/7 taxi service in Ortahisar Castle area.',
      ko: '오르타히사르 성 지역의 24/7 택시 서비스.',
      ja: 'オルタヒサル城地域の24時間タクシーサービス。',
      'zh-hans': '奥尔塔希萨尔城堡地区24/7出租车服务。',
    },
    faqs: [
      {
        question: {
          tr: 'Ortahisar\'dan Göreme\'ye ne kadar sürer?',
          en: 'How long does it take from Ortahisar to Göreme?',
          ko: '오르타히사르에서 괴레메까지 얼마나 걸립니까?',
          ja: 'オルタヒサルからギョレメまでどのくらいかかりますか？',
          'zh-hans': '从奥尔塔希萨尔到格雷梅需要多长时间？',
        },
        answer: {
          tr: 'Ortahisar-Göreme arası yaklaşık 10-15 dakika sürer.',
          en: 'It takes approximately 10-15 minutes from Ortahisar to Göreme.',
          ko: '오르타히사르-괴레메 사이는 약 10-15분 소요됩니다.',
          ja: 'オルタヒサル-ギョレメ間は約10-15分かかります。',
          'zh-hans': '从奥尔塔希萨尔到格雷梅大约需要10-15分钟。',
        },
      },
    ],
  },
  {
    id: 'avanos',
    slug: 'avanos-taksi',
    name: {
      tr: 'Avanos Taksi',
      en: 'Avanos Taxi',
      ko: '아바노스 택시',
      ja: 'アヴァノスタクシー',
      'zh-hans': '阿瓦诺斯出租车',
    },
    description: {
      tr: 'Avanos çömlekçilik merkezi ve çevresinde taksi hizmeti.',
      en: 'Taxi service in Avanos pottery center and surrounding areas.',
      ko: '아바노스 도예 센터 및 주변 지역의 택시 서비스.',
      ja: 'アヴァノス陶器センターと周辺地域のタクシーサービス。',
      'zh-hans': '阿瓦诺斯陶器中心及周边地区的出租车服务。',
    },
    faqs: [
      {
        question: {
          tr: 'Avanos\'tan Ürgüp\'e taksi ücreti ne kadar?',
          en: 'How much is the taxi fare from Avanos to Ürgüp?',
          ko: '아바노스에서 우르귀프까지 택시 요금은 얼마입니까?',
          ja: 'アヴァノスからウルギュップまでのタクシー料金はいくらですか？',
          'zh-hans': '从阿瓦诺斯到于尔居普的出租车费用是多少？',
        },
        answer: {
          tr: 'Avanos-Ürgüp arası yaklaşık 15-20 km. Detaylı fiyat için arayın.',
          en: 'The distance between Avanos and Ürgüp is approximately 15-20 km. Call for detailed pricing.',
          ko: '아바노스-우르귀프 사이 거리는 약 15-20km입니다. 자세한 가격은 전화 주세요.',
          ja: 'アヴァノス-ウルギュップ間の距離は約15-20kmです。詳細な料金についてはお電話ください。',
          'zh-hans': '阿瓦诺斯到于尔居普的距离约15-20公里。详情请致电。',
        },
      },
    ],
  },
];

