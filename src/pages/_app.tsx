import { createMuiTheme } from '@material-ui/core/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from 'styles/global';

import store from 'store';

const theme = createMuiTheme();

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    </Head>

    <ThemeProvider theme={theme}>
      <ReduxProvider store={store}>
        <GlobalStyle/>
        <Component {...pageProps} />
      </ReduxProvider>
    </ThemeProvider>

  </>
);

export default MyApp
