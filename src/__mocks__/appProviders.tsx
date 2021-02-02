import { ThemeProvider } from 'styled-components';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme();

const AppMockProviders: React.FC = (props) => {

  return (
    <ThemeProvider theme={theme}>
      {props.children}
    </ThemeProvider>
  );
};

export default AppMockProviders;
