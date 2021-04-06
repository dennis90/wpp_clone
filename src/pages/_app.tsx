import CircularProgress from '@material-ui/core/CircularProgress';
import DateFnsUtils from '@date-io/date-fns';
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from 'styles/global';

import firebase from 'config/firebase';
import { EXTERNAL_PATHNAMES } from 'config/routes';
import { Provider as UserIdProvider } from 'hooks/useUserId';
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

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  const [user, loading] = useAuthState(firebase.auth());

  useEffect(() => {
    if (!loading) {
      if (!user && !EXTERNAL_PATHNAMES.includes(router.pathname)) {
        router.push('/login');
      }

      if (user && EXTERNAL_PATHNAMES.includes(router.pathname)) {
        router.push('/');
      }
    }
  }, [router, user, loading]);

  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>

      <ThemeProvider theme={theme}>
        <MuiThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <ReduxProvider store={store}>
              <UserIdProvider value={user || undefined}>
                <GlobalStyle />
                {loading ? <CircularProgress /> : <Component {...pageProps} />}
              </UserIdProvider>
            </ReduxProvider>
          </MuiPickersUtilsProvider>
        </MuiThemeProvider>
      </ThemeProvider>
    </>
  );
};

export default MyApp;
