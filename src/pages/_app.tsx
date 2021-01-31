import Head from 'next/head';
import React from 'react';

import 'styles/styles.global.css';

export interface MyAppProps {
  Component: React.ComponentClass;
  pageProps: unknown;
}

const MyApp: React.FC<MyAppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    </Head>

    <Component {...pageProps} />
  </>
);

export default MyApp
