import { createMuiTheme } from '@material-ui/core/styles';
import Head from 'next/head';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from 'styles/global';

export interface MyAppProps {
  Component: React.ComponentClass;
  pageProps: any;
}

const theme = createMuiTheme();

const MyApp: React.FC<MyAppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    </Head>

    <ThemeProvider theme={theme}>
      <GlobalStyle/>
      <Component {...pageProps} />
    </ThemeProvider>

  </>
);

export default MyApp
