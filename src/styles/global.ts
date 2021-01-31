import { Theme } from '@material-ui/core/styles';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html {
    font-size: 10px;
  }

  body {
    background-color: ${({ theme }: { theme: Theme }) => theme.palette.background.default};
    font-family: 'Roboto', sans-serif;
    font-size: 1.6rem;
    margin: 0;
  }
`;
