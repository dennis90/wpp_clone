import DateFnsUtils from '@date-io/date-fns';
import { createMuiTheme } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider } from 'styled-components';

const theme = createMuiTheme();

const AppMockProviders: React.FC = (props) => {

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        {props.children}
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default AppMockProviders;
