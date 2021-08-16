import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import type { AppContext, AppProps } from 'next/app';
import NextApp from 'next/app';
import { NextIntlProvider } from 'next-intl';
import { ChakraProvider, Progress } from '@chakra-ui/react';
import smoothScroll from 'smoothscroll-polyfill';

import Header from '@/components/header';
import '../styles/globals.sass';
import theme from '../theme';
import Footer from '@/components/footer';

interface MyProps extends AppProps {
  messages: any;
}

const EdumateApp = ({ Component, pageProps, messages }: MyProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      smoothScroll.polyfill();
    }
    router.events.on('routeChangeStart', () => setIsLoading(true));
    router.events.on('routeChangeComplete', () => setIsLoading(false));

    return () => {
      router.events.off('routeChangeStart', () => setIsLoading(false));
      router.events.off('routeChangeComplete', () => setIsLoading(false));
    };
  }, []);

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
