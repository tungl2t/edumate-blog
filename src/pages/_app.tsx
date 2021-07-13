import type { AppContext, AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import '../styles/globals.sass';
import theme from '../theme';
import { NextIntlProvider } from 'next-intl';
import NextApp from 'next/app';

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
