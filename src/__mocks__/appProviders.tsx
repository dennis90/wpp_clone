import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';

const theme = createMuiTheme();

const AppMockProviders: React.FC = (props) => {

  return (
    <ThemeProvider theme={theme}>
      {props.children}
    </ThemeProvider>
  );
};

export default AppMockProviders;
