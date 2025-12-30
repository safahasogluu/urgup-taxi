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
