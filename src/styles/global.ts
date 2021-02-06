import { Theme } from '@material-ui/core/styles';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html {
    font-size: 14px;
  }

  body {
    background-color: ${({ theme }: { theme: Theme }) => theme.palette.background.default};
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
    margin: 0;
  }
`;
