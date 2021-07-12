import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import '../styles/globals.sass';
import theme from '../theme';
import { NextIntlProvider } from 'next-intl';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextIntlProvider messages={pageProps.messages}>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </NextIntlProvider>
  );
}

export default MyApp;
