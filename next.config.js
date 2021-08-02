const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
  pwa: {
    dest: 'public',
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
