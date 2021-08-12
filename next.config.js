const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    runtimeCaching,
  },
  images: {
    domains: ['cms.edumate.vn'],
  },
  i18n: {
    locales: ['en', 'vi'],
    defaultLocale: 'en',
  },
});
