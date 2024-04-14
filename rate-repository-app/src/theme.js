import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    white: '#FFFFFF'
  },
  fontSizes: {
    header: 23,
    formInput: 28,
    body: 14,
    subheading: 16,
  },
  font: Platform.select({
    android: 'Roboto',
    ios: 'Arial',
    default: 'System'
  }),
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;