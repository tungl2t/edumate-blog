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
        color: 'blue.500',
      },
      p: {
        margin: '0.5em 0',
      },
      ul: {
        paddingLeft: '1em',
      },
      '.content': {
        p: {
          margin: '1em 0',
          img: {
            width: '100%',
            aspectRatio: '16/9',
            objectFit: 'contain',
          },
        },
        center: {
          fontStyle: 'italic',
        },
        h1: {
          fontSize: '2em',
          fontWeight: 600,
          margin: '1em 0',
        },
        h2: {
          fontSize: '1.5em',
          fontWeight: 600,
          margin: '1em 0',
        },
      },
    },
  },
  colors: {
    black: '#16161D',
  },
  breakpoints,
  fonts: {
    body: 'Gilroy-Light, sans-serif',
    heading: 'Gilroy-Medium, sans-serif',
  },
});

export default theme;
