import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import type { AppContext, AppProps } from 'next/app';
import NextApp from 'next/app';
import { NextIntlProvider } from 'next-intl';
import { ChakraProvider, Progress } from '@chakra-ui/react';
import smoothScroll from 'smoothscroll-polyfill';

import Header from '@/components/header';
import Footer from '@/components/footer';
import ScrollToTop from '@/components/scroll-to-top';
import '../styles/globals.sass';
import theme from '../theme';
import * as gtag from '../lib/gtag';

const isProduction = process.env.NODE_ENV === 'production';

interface MyProps extends AppProps {
  messages: any;
}

const EdumateApp = ({ Component, pageProps, messages }: MyProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      /* invoke analytics function only for production */
      if (isProduction) gtag.pageView(url);
      setIsLoading(false);
    };

    if (typeof window !== 'undefined') {
      smoothScroll.polyfill();
    }
    router.events.on('routeChangeStart', () => setIsLoading(true));
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', () => setIsLoading(false));
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <NextIntlProvider messages={{ ...messages, ...pageProps.messages }}>
      <ChakraProvider resetCSS theme={theme}>
        <Header />
        {isLoading && (
          <Progress
            size="xs"
            colorScheme="yellow"
            isIndeterminate
            position="fixed"
            top="60px"
            zIndex={2}
            w="100%"
          />
        )}
        <Component {...pageProps} />
        <ScrollToTop />
        <Footer />
      </ChakraProvider>
    </NextIntlProvider>
  );
};

EdumateApp.getInitialProps = async (context: AppContext) => {
  const { locale } = context.router;
  return {
    ...(await NextApp.getInitialProps(context)),
    messages: {
      ...require(`../messages/shared/${locale}.json`),
    },
  };
};

export default EdumateApp;
