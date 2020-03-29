import React, { ReactNode } from 'react';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import amber from '@material-ui/core/colors/amber';

import * as colors from './lib/colors';

const primary = colors.compute('#85ACD6')

console.log('primary', primary)

type ThemeProps = {
  children: ReactNode;
};

const PDFTheme: React.FC<ThemeProps> = ({
  children,
}) => {
    const t : any = {
      palette: {
        primary,
        secondary: amber,
        grey: {
            one: "#EAEAEB",
            two: "#FAFAFA",
            three: "#737373",
            four: '#E0E0E0'
        }
      }
    };
  const theme = createMuiTheme(t);
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default PDFTheme;
