import { Theme } from '@material-ui/core/styles';
import styled from 'styled-components';

export const StyledHeaderContainer = styled.div`
  background-color: ${({ theme }: { theme: Theme }) => theme.palette.primary.dark};
  display: flex;
  padding: 10px;
  color: ${({ theme }: { theme: Theme }) => theme.palette.primary.contrastText};
`;

export const StyledConversationDetails = styled.div`
  margin: 0 20px;
`;

export const StyledTitle = styled.h2`
  margin: 0;
  font-size: 1.2rem;
`;

export const StyledParticipants = styled.span`
  font-size: 0.9rem;
`;
