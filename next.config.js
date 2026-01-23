const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
    ];
  },
  async redirects() {
    const locales = ['tr', 'en', 'ko', 'ja', 'zh-hans'];
    const redirects = [];
    
    // Old transfer route patterns -> new canonical routes
    const transferRedirects = [
      { old: 'nav-urgup', new: 'urgup-nav-transfer' },
      { old: 'asr-urgup', new: 'urgup-asr-transfer' },
      { old: 'asr-goreme', new: 'goreme-asr-transfer' },
      { old: 'nav-goreme', new: 'goreme-nav-transfer' },
    ];
    
    // Generate redirects for all locales
    locales.forEach((locale) => {
      transferRedirects.forEach(({ old, new: newSlug }) => {
        redirects.push({
          source: `/${locale}/transfer/${old}`,
          destination: `/${locale}/transfer/${newSlug}`,
          permanent: true,
        });
      });
    });
    
    // Legacy /resim-galerisi redirect (if page doesn't exist, redirect to homepage)
    locales.forEach((locale) => {
      redirects.push({
        source: `/${locale}/resim-galerisi`,
        destination: `/${locale}`,
        permanent: true,
      });
    });
    
    // Root-level resim-galerisi (without locale)
    redirects.push({
      source: '/resim-galerisi',
      destination: '/tr',
      permanent: true,
    });
    
    return redirects;
  },
};

module.exports = withNextIntl(nextConfig);

