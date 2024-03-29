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
      main: {
        marginTop: '60px',
        minHeight: 'calc(100vh - 185px)',
        display: 'flex',
        flexDirection: 'column',
      },
      time: {
        paddingTop: '5px',
      },
      a: {
        color: 'blue.500',
      },
      p: {
        margin: '0.5em 0',
      },
      ul: {
        paddingLeft: '1em',
        li: {
          fontStyle: 'italic',
          fontSize: '0.85em',
        },
      },
      '.content': {
        p: {
          margin: '1em 0',
          img: {
            width: '100%',
            margin: '10px 0',
          },
        },
        center: {
          fontStyle: 'italic',
        },
        h1: {
          fontSize: '1.75em',
          fontWeight: 600,
          margin: '1em 0',
        },
        h2: {
          fontSize: '1.5em',
          fontWeight: 600,
          margin: '1em 0',
        },
        blockquote: {
          background: '#fff',
          borderLeft: '5px solid',
          borderColor: '#2a43652e',
          margin: '1.5em 0',
          padding: '0.5em',
          fontSize: '0.9em',
          '&:before': {
            content: '"\\201C"',
            color: 'blue.800',
            fontSize: '4em',
            lineHeight: '0.1em',
            marginRight: '0.25em',
            verticalAlign: '-0.4em',
          },
          ul: {
            margin: '5px 0',
            li: {
              fontSize: '1em',
            },
          },
          p: {
            display: 'inline',
          },
        },
      },
      '.rounded-full': {
        borderRadius: '9999px',
      },
    },
  },
  colors: {
    black: '#16161D',
  },
  breakpoints,
  fonts: {
    body: 'Gilroy-Regular, sans-serif',
    heading: 'Gilroy-Regular, sans-serif',
  },
});

export default theme;
