import { Locale } from '@/i18n';

export interface TransferRoute {
  id: string;
  slug: string;
  from: Record<Locale, string>;
  to: Record<Locale, string>;
  description: Record<Locale, string>;
  duration: string;
  distance: string;
}

export const transferRoutes: TransferRoute[] = [
  {
    id: 'nav-urgup',
    slug: 'nav-urgup',
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
      ko: '네브세히르 카파도키아 공항에서 우르귀프까지 편안하고 안전한 터미널 서비스.',
      ja: 'ネヴシェヒル・カッパドキア空港からウルギュップへの快適で安全な送迎サービス。',
      'zh-hans': '从内夫谢希尔卡帕多西亚机场到于尔居普的舒适安全接送服务。',
    },
    duration: '40-45 dakika',
    distance: '35 km',
  },
  {
    id: 'nav-goreme',
    slug: 'nav-goreme',
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
      ko: '공항에서 괴레메까지 빠르고 안전한 터미널.',
      ja: '空港からギョレメへの迅速で安全な送迎。',
      'zh-hans': '从机场到格雷梅的快速安全接送。',
    },
    duration: '45-50 dakika',
    distance: '40 km',
  },
  {
    id: 'asr-urgup',
    slug: 'asr-urgup',
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
      ko: '카이세리 에르킬레트 공항에서 우르귀프까지 VIP 터미널 서비스.',
      ja: 'カイセリ・エルキレト空港からウルギュップへのVIP送迎サービス。',
      'zh-hans': '从开塞利埃尔基莱特机场到于尔居普的VIP接送服务。',
    },
    duration: '60-70 dakika',
    distance: '75 km',
  },
  {
    id: 'asr-goreme',
    slug: 'asr-goreme',
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
      ko: '카이세리 에르킬레트에서 괴레메까지 편안한 터미널.',
      ja: 'カイセリ・エルキレトからギョレメへの快適な送迎。',
      'zh-hans': '从开塞利埃尔基莱特到格雷梅的舒适接送。',
    },
    duration: '70-80 dakika',
    distance: '80 km',
  },
];

