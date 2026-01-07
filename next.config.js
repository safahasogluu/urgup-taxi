const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/tr/transfer/asr-urgup',
        destination: '/tr/transfer/urgup-asr-transfer',
        permanent: true,
      },
      {
        source: '/tr/transfer/asr-goreme',
        destination: '/tr/transfer/goreme-asr-transfer',
        permanent: true,
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);

