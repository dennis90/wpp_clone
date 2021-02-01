import { createMuiTheme } from '@material-ui/core/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from 'styles/global';


const theme = createMuiTheme();

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
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
