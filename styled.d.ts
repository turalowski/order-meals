import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
      bg: {
        primary: string;
        secondary: string;
      };
      text: {
        primary: string;
      };
      ui: {
        primary: string;
        error: string;
        secondary: string;
      };
    };
    space: {
      [key: number]: string;
    };
    sizes: {
      [key: number]: string;
    };
    fonts: {
      body: string;
      heading: string;
    };
    fontSizes: {
      body: string;
    };
    fontWeights: {
      bold: string | number;
    };
  }
}