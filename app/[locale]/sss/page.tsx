import { getTranslations, setRequestLocale } from 'next-intl/server';
import { generateMetadata as genMeta } from '@/lib/seo';
import { generateFAQPageSchema, generateBreadcrumbSchema } from '@/lib/schema';
import { Locale } from '@/i18n';
import FAQAccordion from '@/components/FAQAccordion';
import { buildLocaleUrl } from '@/lib/url';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'faq' });
  
  return genMeta({
    locale: locale as Locale,
    title: t('title'),
    description: t('description'),
    path: '/sss',
  });
}

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'faq' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  
  // General FAQs
  const faqs = [
    {
      question: {
        tr: '7/24 hizmet veriyor musunuz?',
        en: 'Do you provide 24/7 service?',
        ko: '24시간 서비스를 제공합니까?',
        ja: '24時間サービスを提供していますか？',
        'zh-hans': '你们提供24小时服务吗？',
      },
      answer: {
        tr: 'Evet, 7 gün 24 saat hizmet veriyoruz. Her zaman arayabilirsiniz.',
        en: 'Yes, we provide 24/7 service. You can call us anytime.',
        ko: '네, 24시간 서비스를 제공합니다. 언제든지 전화하실 수 있습니다.',
        ja: 'はい、24時間サービスを提供しています。いつでもお電話ください。',
        'zh-hans': '是的，我们提供24小时服务。您可以随时致电。',
      },
    },
    {
      question: {
        tr: 'Havalimanı transferi ne kadar sürer?',
        en: 'How long does airport transfer take?',
        ko: '공항 터미널은 얼마나 걸립니까?',
        ja: '空港送迎はどのくらいかかりますか？',
        'zh-hans': '机场接送需要多长时间？',
      },
      answer: {
        tr: 'Nevşehir Kapadokya Havalimanı\'ndan Ürgüp\'e yaklaşık 40-45 dakika, Kayseri Erkilet\'ten ise 60-70 dakika sürer.',
        en: 'From Nevşehir Kapadokya Airport to Ürgüp takes approximately 40-45 minutes, and from Kayseri Erkilet it takes 60-70 minutes.',
        ko: '네브세히르 카파도키아 공항에서 우르귀프까지 약 40-45분, 카이세리 에르킬레트에서 약 60-70분 소요됩니다.',
        ja: 'ネヴシェヒル・カッパドキア空港からウルギュップまで約40-45分、カイセリ・エルキレトからは60-70分かかります。',
        'zh-hans': '从内夫谢希尔卡帕多西亚机场到于尔居普大约需要40-45分钟，从开塞利埃尔基莱特大约需要60-70分钟。',
      },
    },
    {
      question: {
        tr: 'Rezervasyon yapmam gerekir mi?',
        en: 'Do I need to make a reservation?',
        ko: '예약이 필요합니까?',
        ja: '予約が必要ですか？',
        'zh-hans': '我需要预订吗？',
      },
      answer: {
        tr: 'Rezervasyon yapmanızı öneririz, özellikle havalimanı transferleri için. Ancak acil durumlarda doğrudan arayabilirsiniz.',
        en: 'We recommend making a reservation, especially for airport transfers. However, you can call directly in emergencies.',
        ko: '특히 공항 터미널의 경우 예약을 권장합니다. 하지만 긴급 상황에서는 직접 전화할 수 있습니다.',
        ja: '特に空港送迎の場合は予約をお勧めします。ただし、緊急時は直接お電話いただけます。',
        'zh-hans': '我们建议预订，特别是机场接送。但在紧急情况下，您可以直接致电。',
      },
    },
    {
      question: {
        tr: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?',
        en: 'What payment methods do you accept?',
        ko: '어떤 결제 방법을 받습니까?',
        ja: 'どのような支払い方法を受け付けていますか？',
        'zh-hans': '你们接受哪些付款方式？',
      },
      answer: {
        tr: 'Nakit ve kredi kartı ile ödeme kabul ediyoruz.',
        en: 'We accept cash and credit card payments.',
        ko: '현금 및 신용 카드 결제를 받습니다.',
        ja: '現金とクレジットカードの支払いを受け付けています。',
        'zh-hans': '我们接受现金和信用卡付款。',
      },
    },
  ];

  const faqSchema = generateFAQPageSchema(
    faqs.map((faq) => ({
      question: faq.question[locale as Locale],
      answer: faq.answer[locale as Locale],
    }))
  );
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: tCommon('home'), url: buildLocaleUrl(locale, '/') },
    { name: tNav('faq'), url: buildLocaleUrl(locale, '/sss') },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 text-center">{t('title')}</h1>
          <p className="text-xl text-gray-600 mb-12 text-center">{t('description')}</p>

          <FAQAccordion
            faqs={faqs.map((faq) => ({
              question: faq.question[locale as Locale],
              answer: faq.answer[locale as Locale],
            }))}
          />
        </div>
      </div>
    </>
  );
}
