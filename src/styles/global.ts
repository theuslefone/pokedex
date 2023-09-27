import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    pokedex: {
      red: '#D32F2E',
      blue: '#1976D2',
      yellow: '#FFEB3B',
      white: '#FFFFFF',
      screenBg: '#3D5A80',
    },
  },
  fonts: {
    body: '"Open Sans", sans-serif',
    heading: '"Arvo", serif',
  },
});

export default theme;
