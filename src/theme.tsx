import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
  sm: '640px',
  md: '768px',
  '2md': '896px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
});

const theme = extendTheme({
  styles: {
    global: {
      a: {
        textDecoration: 'underline',
        color: 'blue.500',
      },
      p: {
        margin: '0.5em 0',
      },
    },
  },
  colors: {
    black: '#16161D',
  },
  breakpoints,
  fonts: {
    body: 'Gilroy-Regular, sans-serif',
    heading: 'Gilroy-Medium, sans-serif',
  },
});

export default theme;
