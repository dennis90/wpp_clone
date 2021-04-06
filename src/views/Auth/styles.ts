import Avatar from '@material-ui/core/Avatar';
import { Theme } from '@material-ui/core/styles';
import styled from 'styled-components';

export const StyledAvatar = styled(Avatar)`
  background-color: ${({ theme }: { theme: Theme }) => theme.palette.secondary.main};
  margin: 20px auto;
`;

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 500px;
  margin: 10px auto;
  padding: 20px;
  border: 1px solid ${({ theme }: { theme: Theme }) => theme.palette.divider};

  * {
    margin-bottom: 10px;
  }
`;
