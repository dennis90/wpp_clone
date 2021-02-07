import Button from '@material-ui/core/Button';
import styled from 'styled-components';

export const StyledFieldsRow = styled.div`
  display: flex;
  margin-bottom: 15px;

  div {
    flex: 1;
  }

  div + div {
    margin-left: 20px;
  }
`;

export const StyledForm = styled.form`
  padding: 20px;
`;

export const StyledButton = styled(Button).attrs({ type: 'submit' })`
  font-size: 2rem;
`;
