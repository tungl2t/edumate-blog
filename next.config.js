const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const withTM = require('next-transpile-modules')(['lodash-es']);

module.exports = withPWA(
  withTM({
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
  }),
);
