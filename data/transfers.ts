import { Locale } from '@/i18n';

export interface TransferRoute {
  id: string;
  slug: string;
  from: Record<Locale, string>;
  to: Record<Locale, string>;
  description: Record<Locale, string>;
  duration: string;
  distance: string;
  airport: 'ASR' | 'NAV';
  fromLocation: string; // For internal use (urgup, goreme, etc.)
  faqs?: Array<{
    question: Record<Locale, string>;
    answer: Record<Locale, string>;
  }>;
}

export interface TaxiRoute {
  id: string;
  slug: string;
  from: Record<Locale, string>;
  to: Record<Locale, string>;
  description: Record<Locale, string>;
  duration: string;
  distance: string;
  fromLocation: string;
  toLocation: string;
  faqs?: Array<{
    question: Record<Locale, string>;
    answer: Record<Locale, string>;
  }>;
}

// Routes TO Nevşehir Kapadokya Airport (NAV)
export const toNavRoutes: TransferRoute[] = [
  {
    id: 'urgup-nav',
    slug: 'urgup-nav-transfer',
    airport: 'NAV',
    fromLocation: 'urgup',
    from: {
      tr: 'Ürgüp',
      en: 'Ürgüp',
      ko: '우르귀프',
      ja: 'ウルギュップ',
      'zh-hans': '于尔居普',
    },
    to: {
      tr: 'Nevşehir Havalimanı (NAV)',
      en: 'Nevşehir Airport (NAV)',
      ko: '네브세히르 공항 (NAV)',
      ja: 'ネヴシェヒル空港 (NAV)',
      'zh-hans': '内夫谢希尔机场 (NAV)',
    },
    description: {
      tr: 'Ürgüp otellerinden Nevşehir Kapadokya Havalimanı\'na güvenli transfer. Uçuşunuza yetişmeniz için zamanında alınırsınız.',
      en: 'Safe transfer from Ürgüp hotels to Nevşehir Cappadocia Airport. We pick you up on time for your flight.',
      ko: '우르귀프 호텔에서 네브세히르 카파도키아 공항까지 안전한 픽업. 비행기에 맞춰 정시 출발.',
      ja: 'ウルギュップのホテルからネヴシェヒル・カッパドキア空港への安全な送迎。フライトに間に合うよう時間通りにお迎え。',
      'zh-hans': '从于尔居普酒店到内夫谢希尔卡帕多西亚机场的安全接送。准时出发，不误航班。',
    },
    duration: '~40 dk',
    distance: '~35 km',
  },
  {
    id: 'goreme-nav',
    slug: 'goreme-nav-transfer',
    airport: 'NAV',
    fromLocation: 'goreme',
    from: {
      tr: 'Göreme',
      en: 'Göreme',
      ko: '괴레메',
      ja: 'ギョレメ',
      'zh-hans': '格雷梅',
    },
    to: {
      tr: 'Nevşehir Havalimanı (NAV)',
      en: 'Nevşehir Airport (NAV)',
      ko: '네브세히르 공항 (NAV)',
      ja: 'ネヴシェヒル空港 (NAV)',
      'zh-hans': '内夫谢希尔机场 (NAV)',
    },
    description: {
      tr: 'Göreme\'den Nevşehir Havalimanı\'na transfer. Balon turu sonrası veya otel çıkışı için ideal.',
      en: 'Transfer from Göreme to Nevşehir Airport. Perfect after balloon tour or hotel checkout.',
      ko: '괴레메에서 네브세히르 공항까지 픽업. 열기구 투어 후 또는 호텔 체크아웃 후 이상적.',
      ja: 'ギョレメからネヴシェヒル空港への送迎。バルーンツアー後やホテルチェックアウト後に最適。',
      'zh-hans': '从格雷梅到内夫谢希尔机场的接送。热气球之旅后或酒店退房后理想选择。',
    },
    duration: '~45 dk',
    distance: '~40 km',
  },
  {
    id: 'avanos-nav',
    slug: 'avanos-nav-transfer',
    airport: 'NAV',
    fromLocation: 'avanos',
    from: {
      tr: 'Avanos',
      en: 'Avanos',
      ko: '아바노스',
      ja: 'アヴァノス',
      'zh-hans': '阿瓦诺斯',
    },
    to: {
      tr: 'Nevşehir Havalimanı (NAV)',
      en: 'Nevşehir Airport (NAV)',
      ko: '네브세히르 공항 (NAV)',
      ja: 'ネヴシェヒル空港 (NAV)',
      'zh-hans': '内夫谢希尔机场 (NAV)',
    },
    description: {
      tr: 'Avanos\'tan Nevşehir Havalimanı\'na direkt transfer hizmeti.',
      en: 'Direct transfer service from Avanos to Nevşehir Airport.',
      ko: '아바노스에서 네브세히르 공항까지 직행 픽업 서비스.',
      ja: 'アヴァノスからネヴシェヒル空港への直行送迎サービス。',
      'zh-hans': '从阿瓦诺斯到内夫谢希尔机场的直达接送服务。',
    },
    duration: '~50 dk',
    distance: '~45 km',
  },
  {
    id: 'mustafapasa-nav',
    slug: 'mustafapasa-nav-transfer',
    airport: 'NAV',
    fromLocation: 'mustafapasa',
    from: {
      tr: 'Mustafapaşa',
      en: 'Mustafapaşa',
      ko: '무스타파파샤',
      ja: 'ムスタファパシャ',
      'zh-hans': '穆斯塔法帕夏',
    },
    to: {
      tr: 'Nevşehir Havalimanı (NAV)',
      en: 'Nevşehir Airport (NAV)',
      ko: '네브세히르 공항 (NAV)',
      ja: 'ネヴシェヒル空港 (NAV)',
      'zh-hans': '内夫谢希尔机场 (NAV)',
    },
    description: {
      tr: 'Mustafapaşa (Sinasos) köyünden havalimanına transfer.',
      en: 'Transfer from Mustafapaşa (Sinasos) village to airport.',
      ko: '무스타파파샤 (시나소스) 마을에서 공항까지 픽업.',
      ja: 'ムスタファパシャ（シナソス）村から空港への送迎。',
      'zh-hans': '从穆斯塔法帕夏（西纳索斯）村到机场的接送。',
    },
    duration: '~45 dk',
    distance: '~40 km',
  },
];

// Routes TO Kayseri Erkilet Airport (ASR)
export const toAsrRoutes: TransferRoute[] = [
  {
    id: 'urgup-asr',
    slug: 'urgup-asr-transfer',
    airport: 'ASR',
    fromLocation: 'urgup',
    from: {
      tr: 'Ürgüp',
      en: 'Ürgüp',
      ko: '우르귀프',
      ja: 'ウルギュップ',
      'zh-hans': '于尔居普',
    },
    to: {
      tr: 'Kayseri Havalimanı (ASR)',
      en: 'Kayseri Airport (ASR)',
      ko: '카이세리 공항 (ASR)',
      ja: 'カイセリ空港 (ASR)',
      'zh-hans': '开塞利机场 (ASR)',
    },
    description: {
      tr: 'Ürgüp\'ten Kayseri Erkilet Havalimanı\'na konforlu transfer. Geniş bagaj kapasiteli araçlar.',
      en: 'Comfortable transfer from Ürgüp to Kayseri Erkilet Airport. Vehicles with ample luggage space.',
      ko: '우르귀프에서 카이세리 에르킬레트 공항까지 편안한 픽업. 넉넉한 수하물 공간.',
      ja: 'ウルギュップからカイセリ・エルキレト空港への快適な送迎。荷物スペース十分。',
      'zh-hans': '从于尔居普到开塞利埃尔基莱特机场的舒适接送。行李空间充足。',
    },
    duration: '~65 dk',
    distance: '~75 km',
  },
  {
    id: 'goreme-asr',
    slug: 'goreme-asr-transfer',
    airport: 'ASR',
    fromLocation: 'goreme',
    from: {
      tr: 'Göreme',
      en: 'Göreme',
      ko: '괴레메',
      ja: 'ギョレメ',
      'zh-hans': '格雷梅',
    },
    to: {
      tr: 'Kayseri Havalimanı (ASR)',
      en: 'Kayseri Airport (ASR)',
      ko: '카이세리 공항 (ASR)',
      ja: 'カイセリ空港 (ASR)',
      'zh-hans': '开塞利机场 (ASR)',
    },
    description: {
      tr: 'Göreme\'den Kayseri Havalimanı\'na transfer. Uçuş saatinize göre esnek alım.',
      en: 'Transfer from Göreme to Kayseri Airport. Flexible pickup based on your flight time.',
      ko: '괴레메에서 카이세리 공항까지 픽업. 비행 시간에 맞춘 유연한 픽업.',
      ja: 'ギョレメからカイセリ空港への送迎。フライト時間に合わせた柔軟なお迎え。',
      'zh-hans': '从格雷梅到开塞利机场的接送。根据航班时间灵活接送。',
    },
    duration: '~75 dk',
    distance: '~80 km',
  },
  {
    id: 'avanos-asr',
    slug: 'avanos-asr-transfer',
    airport: 'ASR',
    fromLocation: 'avanos',
    from: {
      tr: 'Avanos',
      en: 'Avanos',
      ko: '아바노스',
      ja: 'アヴァノス',
      'zh-hans': '阿瓦诺斯',
    },
    to: {
      tr: 'Kayseri Havalimanı (ASR)',
      en: 'Kayseri Airport (ASR)',
      ko: '카이세리 공항 (ASR)',
      ja: 'カイセリ空港 (ASR)',
      'zh-hans': '开塞利机场 (ASR)',
    },
    description: {
      tr: 'Avanos\'tan Kayseri Havalimanı\'na güvenli transfer.',
      en: 'Safe transfer from Avanos to Kayseri Airport.',
      ko: '아바노스에서 카이세리 공항까지 안전한 픽업.',
      ja: 'アヴァノスからカイセリ空港への安全な送迎。',
      'zh-hans': '从阿瓦诺斯到开塞利机场的安全接送。',
    },
    duration: '~70 dk',
    distance: '~70 km',
  },
  {
    id: 'mustafapasa-asr',
    slug: 'mustafapasa-asr-transfer',
    airport: 'ASR',
    fromLocation: 'mustafapasa',
    from: {
      tr: 'Mustafapaşa',
      en: 'Mustafapaşa',
      ko: '무스타파파샤',
      ja: 'ムスタファパシャ',
      'zh-hans': '穆斯塔法帕夏',
    },
    to: {
      tr: 'Kayseri Havalimanı (ASR)',
      en: 'Kayseri Airport (ASR)',
      ko: '카이세리 공항 (ASR)',
      ja: 'カイセリ空港 (ASR)',
      'zh-hans': '开塞利机场 (ASR)',
    },
    description: {
      tr: 'Mustafapaşa\'dan Kayseri Havalimanı\'na özel transfer.',
      en: 'Private transfer from Mustafapaşa to Kayseri Airport.',
      ko: '무스타파파샤에서 카이세리 공항까지 프라이빗 픽업.',
      ja: 'ムスタファパシャからカイセリ空港へのプライベート送迎。',
      'zh-hans': '从穆斯塔法帕夏到开塞利机场的私人接送。',
    },
    duration: '~70 dk',
    distance: '~80 km',
  },
];

// Combined transfer routes (destination is airport)
export const transferRoutes: TransferRoute[] = [...toNavRoutes, ...toAsrRoutes];

// Get routes by destination airport
export function getRoutesByAirport(airport: 'ASR' | 'NAV'): TransferRoute[] {
  return transferRoutes.filter(r => r.airport === airport);
}

// Get routes from a specific location
export function getRoutesFromLocation(location: string): TransferRoute[] {
  return transferRoutes.filter(r => r.fromLocation === location);
}

// Taxi routes (town to town)
export const taxiRoutes: TaxiRoute[] = [
  {
    id: 'urgup-goreme',
    slug: 'urgup-goreme',
    fromLocation: 'urgup',
    toLocation: 'goreme',
    from: {
      tr: 'Ürgüp',
      en: 'Ürgüp',
      ko: '우르귀프',
      ja: 'ウルギュップ',
      'zh-hans': '于尔居普',
    },
    to: {
      tr: 'Göreme',
      en: 'Göreme',
      ko: '괴레메',
      ja: 'ギョレメ',
      'zh-hans': '格雷梅',
    },
    description: {
      tr: 'Ürgüp\'ten Göreme\'ye konforlu taksi hizmeti. Peri bacalarını, Açık Hava Müzesi\'ni keşfedin. Balon turu dönüşü için ideal.',
      en: 'Comfortable taxi service from Ürgüp to Göreme. Explore fairy chimneys and the Open Air Museum. Perfect for balloon tour return.',
      ko: '우르귀프에서 괴레메까지 편안한 택시 서비스. 요정 굴뚝과 야외 박물관을 탐험하세요. 열기구 투어 복귀에 적합.',
      ja: 'ウルギュップからギョレメへの快適なタクシーサービス。妖精の煙突と野外博物館を探索。バルーンツアー帰りに最適。',
      'zh-hans': '从于尔居普到格雷梅的舒适出租车服务。探索仙人烟囱和露天博物馆。热气球之旅返回的理想选择。',
    },
    duration: '~10 dk',
    distance: '~8 km',
    faqs: [
      {
        question: {
          tr: 'Ürgüp\'ten Göreme\'ye ne kadar sürer?',
          en: 'How long is the journey from Ürgüp to Göreme?',
          ko: '우르귀프에서 괴레메까지 얼마나 걸리나요?',
          ja: 'ウルギュップからギョレメまでどのくらいかかりますか？',
          'zh-hans': '从于尔居普到格雷梅需要多长时间？',
        },
        answer: {
          tr: 'Ürgüp\'ten Göreme\'ye yaklaşık 10 dakika sürer. Mesafe yaklaşık 8 km\'dir.',
          en: 'The journey from Ürgüp to Göreme takes approximately 10 minutes. The distance is about 8 km.',
          ko: '우르귀프에서 괴레메까지 약 10분 소요됩니다. 거리는 약 8km입니다.',
          ja: 'ウルギュップからギョレメまで約10分かかります。距離は約8kmです。',
          'zh-hans': '从于尔居普到格雷梅大约需要10分钟。距离约8公里。',
        },
      },
      {
        question: {
          tr: 'Balon turu için sabah erken alım yapıyor musunuz?',
          en: 'Do you provide early morning pickups for balloon tours?',
          ko: '열기구 투어를 위해 이른 아침 픽업이 가능한가요?',
          ja: 'バルーンツアーのための早朝ピックアップはありますか？',
          'zh-hans': '提供热气球之旅的清晨接送吗？',
        },
        answer: {
          tr: 'Evet, balon turları için sabah 04:00-05:00 arası alım yapıyoruz. Bir gün önceden rezervasyon yapmanızı öneririz.',
          en: 'Yes, we provide pickups between 04:00-05:00 AM for balloon tours. We recommend booking a day in advance.',
          ko: '네, 열기구 투어를 위해 오전 4:00-5:00 사이에 픽업합니다. 하루 전 예약을 권장합니다.',
          ja: 'はい、バルーンツアーのために午前4:00-5:00の間にピックアップします。前日の予約をお勧めします。',
          'zh-hans': '是的，我们提供凌晨4:00-5:00之间的热气球之旅接送。建议提前一天预订。',
        },
      },
      {
        question: {
          tr: 'Göreme\'de hangi yerleri gezebilirim?',
          en: 'What places can I visit in Göreme?',
          ko: '괴레메에서 어떤 곳을 방문할 수 있나요?',
          ja: 'ギョレメではどこを訪れることができますか？',
          'zh-hans': '在格雷梅可以参观哪些地方？',
        },
        answer: {
          tr: 'Göreme Açık Hava Müzesi, Aşk Vadisi, Güvercinlik Vadisi ve eşsiz peri bacaları. Balon turları da Göreme\'den kalkar.',
          en: 'Göreme Open Air Museum, Love Valley, Pigeon Valley and unique fairy chimneys. Balloon tours also depart from Göreme.',
          ko: '괴레메 야외 박물관, 사랑의 계곡, 비둘기 계곡과 독특한 요정 굴뚝. 열기구 투어도 괴레메에서 출발합니다.',
          ja: 'ギョレメ野外博物館、愛の谷、鳩の谷、ユニークな妖精の煙突。バルーンツアーもギョレメから出発します。',
          'zh-hans': '格雷梅露天博物馆、爱情谷、鸽子谷和独特的仙人烟囱。热气球之旅也从格雷梅出发。',
        },
      },
    ],
  },
  {
    id: 'urgup-avanos',
    slug: 'urgup-avanos',
    fromLocation: 'urgup',
    toLocation: 'avanos',
    from: {
      tr: 'Ürgüp',
      en: 'Ürgüp',
      ko: '우르귀프',
      ja: 'ウルギュップ',
      'zh-hans': '于尔居普',
    },
    to: {
      tr: 'Avanos',
      en: 'Avanos',
      ko: '아바노스',
      ja: 'アヴァノス',
      'zh-hans': '阿瓦诺斯',
    },
    description: {
      tr: 'Ürgüp\'ten Avanos\'a taksi hizmeti. Çömlekçilik atölyeleri ve Kızılırmak manzarası için ideal güzergah.',
      en: 'Taxi service from Ürgüp to Avanos. Perfect route for pottery workshops and Red River views.',
      ko: '우르귀프에서 아바노스까지 택시 서비스. 도자기 공방과 크즐르막 강 전망에 적합한 노선.',
      ja: 'ウルギュップからアヴァノスへのタクシーサービス。陶芸工房とクズルウルマク川の景色に最適なルート。',
      'zh-hans': '从于尔居普到阿瓦诺斯的出租车服务。陶艺作坊和红河景观的理想路线。',
    },
    duration: '~15 dk',
    distance: '~12 km',
    faqs: [
      {
        question: {
          tr: 'Avanos\'ta ne yapabilirim?',
          en: 'What can I do in Avanos?',
          ko: '아바노스에서 무엇을 할 수 있나요?',
          ja: 'アヴァノスでは何ができますか？',
          'zh-hans': '在阿瓦诺斯可以做什么？',
        },
        answer: {
          tr: 'Avanos, Kapadokya\'nın çömlekçilik merkezidir. Atölye ziyareti, çömlek yapımı deneyimi, Kızılırmak kenarında yürüyüş yapabilirsiniz.',
          en: 'Avanos is Cappadocia\'s pottery center. You can visit workshops, try pottery making, and walk along the Red River.',
          ko: '아바노스는 카파도키아의 도자기 중심지입니다. 공방 방문, 도자기 만들기 체험, 크즐르막 강변 산책을 할 수 있습니다.',
          ja: 'アヴァノスはカッパドキアの陶芸の中心地です。工房訪問、陶芸体験、クズルウルマク川沿いの散歩ができます。',
          'zh-hans': '阿瓦诺斯是卡帕多西亚的陶艺中心。您可以参观作坊、体验制陶、沿红河散步。',
        },
      },
      {
        question: {
          tr: 'Avanos\'a gidiş-dönüş için bekler misiniz?',
          en: 'Do you wait for round trips to Avanos?',
          ko: '아바노스 왕복 시 대기해 주시나요?',
          ja: 'アヴァノスへの往復で待っていただけますか？',
          'zh-hans': '去阿瓦诺斯往返时会等待吗？',
        },
        answer: {
          tr: 'Evet, günlük tur veya bekleme seçenekleri sunuyoruz. Detaylar için WhatsApp\'tan ulaşın.',
          en: 'Yes, we offer day tour or waiting options. Contact us via WhatsApp for details.',
          ko: '네, 일일 투어 또는 대기 옵션을 제공합니다. 자세한 내용은 WhatsApp으로 문의하세요.',
          ja: 'はい、日帰りツアーまたは待機オプションを提供しています。詳細はWhatsAppでお問い合わせください。',
          'zh-hans': '是的，我们提供一日游或等待选项。详情请通过WhatsApp联系。',
        },
      },
    ],
  },
];

// Get all taxi routes
export function getAllTaxiRoutes(): TaxiRoute[] {
  return taxiRoutes;
}

// Get taxi route by slug
export function getTaxiRouteBySlug(slug: string): TaxiRoute | undefined {
  return taxiRoutes.find(r => r.slug === slug);
}
