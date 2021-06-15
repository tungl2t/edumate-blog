import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import '../styles/globals.sass';
import type { AppProps } from 'next/app';
import theme from '../theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default MyApp;
