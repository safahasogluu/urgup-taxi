import { Locale } from '@/i18n';

export interface TransferRoute {
  id: string;
  slug: string;
  from: Record<Locale, string>;
  to: Record<Locale, string>;
  description: Record<Locale, string>;
  duration: string;
  distance: string;
  airport?: 'ASR' | 'NAV';
}

// Nevşehir Kapadokya Airport (NAV) routes
export const navRoutes: TransferRoute[] = [
  {
    id: 'nav-urgup',
    slug: 'nav-urgup',
    airport: 'NAV',
    from: {
      tr: 'Nevşehir Kapadokya Havalimanı',
      en: 'Nevşehir Kapadokya Airport',
      ko: '네브세히르 카파도키아 공항',
      ja: 'ネヴシェヒル・カッパドキア空港',
      'zh-hans': '内夫谢希尔卡帕多西亚机场',
    },
    to: {
      tr: 'Ürgüp',
      en: 'Ürgüp',
      ko: '우르귀프',
      ja: 'ウルギュップ',
      'zh-hans': '于尔居普',
    },
    description: {
      tr: 'Nevşehir Kapadokya Havalimanı\'ndan Ürgüp\'e konforlu ve güvenli transfer hizmeti.',
      en: 'Comfortable and safe transfer service from Nevşehir Kapadokya Airport to Ürgüp.',
      ko: '네브세히르 카파도키아 공항에서 우르귀프까지 편안하고 안전한 공항 픽업 서비스.',
      ja: 'ネヴシェヒル・カッパドキア空港からウルギュップへの快適で安全な送迎サービス。',
      'zh-hans': '从内夫谢希尔卡帕多西亚机场到于尔居普的舒适安全接送服务。',
    },
    duration: '40-45 dk',
    distance: '35 km',
  },
  {
    id: 'nav-goreme',
    slug: 'nav-goreme',
    airport: 'NAV',
    from: {
      tr: 'Nevşehir Kapadokya Havalimanı',
      en: 'Nevşehir Kapadokya Airport',
      ko: '네브세히르 카파도키아 공항',
      ja: 'ネヴシェヒル・カッパドキア空港',
      'zh-hans': '内夫谢希尔卡帕多西亚机场',
    },
    to: {
      tr: 'Göreme',
      en: 'Göreme',
      ko: '괴레메',
      ja: 'ギョレメ',
      'zh-hans': '格雷梅',
    },
    description: {
      tr: 'Havalimanından Göreme\'ye hızlı ve güvenli transfer.',
      en: 'Fast and safe transfer from airport to Göreme.',
      ko: '공항에서 괴레메까지 빠르고 안전한 공항 픽업.',
      ja: '空港からギョレメへの迅速で安全な送迎。',
      'zh-hans': '从机场到格雷梅的快速安全接送。',
    },
    duration: '45-50 dk',
    distance: '40 km',
  },
  {
    id: 'nav-avanos',
    slug: 'nav-avanos',
    airport: 'NAV',
    from: {
      tr: 'Nevşehir Kapadokya Havalimanı',
      en: 'Nevşehir Kapadokya Airport',
      ko: '네브세히르 카파도키아 공항',
      ja: 'ネヴシェヒル・カッパドキア空港',
      'zh-hans': '内夫谢希尔卡帕多西亚机场',
    },
    to: {
      tr: 'Avanos',
      en: 'Avanos',
      ko: '아바노스',
      ja: 'アヴァノス',
      'zh-hans': '阿瓦诺斯',
    },
    description: {
      tr: 'Nevşehir Havalimanı\'ndan Avanos\'a direkt transfer.',
      en: 'Direct transfer from Nevşehir Airport to Avanos.',
      ko: '네브세히르 공항에서 아바노스까지 직행 공항 픽업.',
      ja: 'ネヴシェヒル空港からアヴァノスへの直行送迎。',
      'zh-hans': '从内夫谢希尔机场到阿瓦诺斯的直达接送。',
    },
    duration: '50-55 dk',
    distance: '45 km',
  },
  {
    id: 'nav-mustafapasa',
    slug: 'nav-mustafapasa',
    airport: 'NAV',
    from: {
      tr: 'Nevşehir Kapadokya Havalimanı',
      en: 'Nevşehir Kapadokya Airport',
      ko: '네브세히르 카파도키아 공항',
      ja: 'ネヴシェヒル・カッパドキア空港',
      'zh-hans': '内夫谢希尔卡帕多西亚机场',
    },
    to: {
      tr: 'Mustafapaşa',
      en: 'Mustafapaşa',
      ko: '무스타파파샤',
      ja: 'ムスタファパシャ',
      'zh-hans': '穆斯塔法帕夏',
    },
    description: {
      tr: 'Havalimanından Mustafapaşa (Sinasos) köyüne transfer.',
      en: 'Transfer from airport to Mustafapaşa (Sinasos) village.',
      ko: '공항에서 무스타파파샤 (시나소스) 마을까지 공항 픽업.',
      ja: '空港からムスタファパシャ（シナソス）村への送迎。',
      'zh-hans': '从机场到穆斯塔法帕夏（西纳索斯）村的接送。',
    },
    duration: '45-50 dk',
    distance: '40 km',
  },
];

// Kayseri Erkilet Airport (ASR) routes
export const asrRoutes: TransferRoute[] = [
  {
    id: 'asr-urgup',
    slug: 'asr-urgup',
    airport: 'ASR',
    from: {
      tr: 'Kayseri Erkilet Havalimanı',
      en: 'Kayseri Erkilet Airport',
      ko: '카이세리 에르킬레트 공항',
      ja: 'カイセリ・エルキレト空港',
      'zh-hans': '开塞利埃尔基莱特机场',
    },
    to: {
      tr: 'Ürgüp',
      en: 'Ürgüp',
      ko: '우르귀프',
      ja: 'ウルギュップ',
      'zh-hans': '于尔居普',
    },
    description: {
      tr: 'Kayseri Erkilet Havalimanı\'ndan Ürgüp\'e VIP transfer hizmeti.',
      en: 'VIP transfer service from Kayseri Erkilet Airport to Ürgüp.',
      ko: '카이세리 에르킬레트 공항에서 우르귀프까지 VIP 공항 픽업 서비스.',
      ja: 'カイセリ・エルキレト空港からウルギュップへのVIP送迎サービス。',
      'zh-hans': '从开塞利埃尔基莱特机场到于尔居普的VIP接送服务。',
    },
    duration: '60-70 dk',
    distance: '75 km',
  },
  {
    id: 'asr-goreme',
    slug: 'asr-goreme',
    airport: 'ASR',
    from: {
      tr: 'Kayseri Erkilet Havalimanı',
      en: 'Kayseri Erkilet Airport',
      ko: '카이세리 에르킬레트 공항',
      ja: 'カイセリ・エルキレト空港',
      'zh-hans': '开塞利埃尔基莱特机场',
    },
    to: {
      tr: 'Göreme',
      en: 'Göreme',
      ko: '괴레메',
      ja: 'ギョレメ',
      'zh-hans': '格雷梅',
    },
    description: {
      tr: 'Kayseri Erkilet\'ten Göreme\'ye konforlu transfer.',
      en: 'Comfortable transfer from Kayseri Erkilet to Göreme.',
      ko: '카이세리 에르킬레트에서 괴레메까지 편안한 공항 픽업.',
      ja: 'カイセリ・エルキレトからギョレメへの快適な送迎。',
      'zh-hans': '从开塞利埃尔基莱特到格雷梅的舒适接送。',
    },
    duration: '70-80 dk',
    distance: '80 km',
  },
  {
    id: 'asr-avanos',
    slug: 'asr-avanos',
    airport: 'ASR',
    from: {
      tr: 'Kayseri Erkilet Havalimanı',
      en: 'Kayseri Erkilet Airport',
      ko: '카이세리 에르킬레트 공항',
      ja: 'カイセリ・エルキレト空港',
      'zh-hans': '开塞利埃尔基莱特机场',
    },
    to: {
      tr: 'Avanos',
      en: 'Avanos',
      ko: '아바노스',
      ja: 'アヴァノス',
      'zh-hans': '阿瓦诺斯',
    },
    description: {
      tr: 'Kayseri Havalimanı\'ndan Avanos\'a güvenli transfer.',
      en: 'Safe transfer from Kayseri Airport to Avanos.',
      ko: '카이세리 공항에서 아바노스까지 안전한 공항 픽업.',
      ja: 'カイセリ空港からアヴァノスへの安全な送迎。',
      'zh-hans': '从开塞利机场到阿瓦诺斯的安全接送。',
    },
    duration: '65-75 dk',
    distance: '70 km',
  },
  {
    id: 'asr-mustafapasa',
    slug: 'asr-mustafapasa',
    airport: 'ASR',
    from: {
      tr: 'Kayseri Erkilet Havalimanı',
      en: 'Kayseri Erkilet Airport',
      ko: '카이세리 에르킬레트 공항',
      ja: 'カイセリ・エルキレト空港',
      'zh-hans': '开塞利埃尔基莱特机场',
    },
    to: {
      tr: 'Mustafapaşa',
      en: 'Mustafapaşa',
      ko: '무스타파파샤',
      ja: 'ムスタファパシャ',
      'zh-hans': '穆斯塔法帕夏',
    },
    description: {
      tr: 'Kayseri\'den Mustafapaşa\'ya özel transfer hizmeti.',
      en: 'Private transfer service from Kayseri to Mustafapaşa.',
      ko: '카이세리에서 무스타파파샤까지 프라이빗 공항 픽업 서비스.',
      ja: 'カイセリからムスタファパシャへのプライベート送迎サービス。',
      'zh-hans': '从开塞利到穆斯塔法帕夏的私人接送服务。',
    },
    duration: '65-75 dk',
    distance: '80 km',
  },
];

// Combined transfer routes for compatibility
export const transferRoutes: TransferRoute[] = [...navRoutes, ...asrRoutes];

// Get routes by airport
export function getRoutesByAirport(airport: 'ASR' | 'NAV'): TransferRoute[] {
  return transferRoutes.filter(r => r.airport === airport);
}
