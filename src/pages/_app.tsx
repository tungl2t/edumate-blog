import type { AppContext, AppProps } from 'next/app';
import NextApp from 'next/app';
import { NextIntlProvider } from 'next-intl';
import { ChakraProvider } from '@chakra-ui/react';

import '../styles/globals.sass';
import theme from '../theme';

interface MyProps extends AppProps {
  messages: any;
}

function MyApp({ Component, pageProps, messages }: MyProps) {
  return (
    <NextIntlProvider messages={{ ...messages, ...pageProps.messages }}>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </NextIntlProvider>
  );
}

MyApp.getInitialProps = async function getInitialProps(context: AppContext) {
  const { locale } = context.router;
  return {
    ...(await NextApp.getInitialProps(context)),
    messages: require(`../messages/navigation/${locale}.json`),
  };
};

export default MyApp;
