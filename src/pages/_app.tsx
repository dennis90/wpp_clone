import DateFnsUtils from '@date-io/date-fns';
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from 'styles/global';

import store from 'store';

const theme = createMuiTheme({
  props: {
    MuiTextField: {
      variant: 'outlined',
    },
    MuiFormControl: {
      variant: 'outlined',
    },
  },
});

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    </Head>

    <ThemeProvider theme={theme}>
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ReduxProvider store={store}>
            <GlobalStyle />
            <Component {...pageProps} />
          </ReduxProvider>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </ThemeProvider>
  </>
);

export default MyApp;
