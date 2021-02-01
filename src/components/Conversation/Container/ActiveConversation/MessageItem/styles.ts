import { Theme } from '@material-ui/core/styles';
import styled from 'styled-components';

export interface StyledReceivedMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  kind: 'received' | 'sent';
}

export const StyledReceivedMessage = styled.div<StyledReceivedMessageProps>`
  background-color: ${({ kind, theme }: { theme: Theme } & StyledReceivedMessageProps) => kind === 'received' ? theme.palette.background.paper : theme.palette.primary.light};
  border-radius: 6px;
  border: 1px solid ${({ theme }: { theme: Theme }) => theme.palette.grey[200]};
  padding: 20px;
  white-space: pre-wrap;

  p {
    margin: 0;
  }
`;

export interface StyledMessageContentProps extends React.HTMLAttributes<HTMLDivElement> {
  kind: 'received' | 'sent';
}

export const StyledMessageContent = styled.div<StyledMessageContentProps>`
  display: flex;
  margin: ${({ kind }: StyledMessageContentProps) => kind === 'received' ? '20px' : '20px 20px 20px auto'};
  justify-content: ${({ kind }: StyledMessageContentProps) => kind === 'received' ? 'flex-start' : 'flex-end'};
  width: 60%;
`;

export const StyledDate = styled.p`
  text-align: right;
  font-size: 1.2rem;
  color: ${({ theme }: { theme: Theme }) => theme.palette.text.secondary};
`;

export const StyledActionsContainer = styled.div`
  display: flex;
  margin: 10px 0;
  flex-wrap: wrap;
  button {
    margin-bottom: 10px;
    min-width: 80px;
  }

  button:not(:last-child) {
    margin-right: 20px;
  }
`;

export const StyledAvatarContainer = styled.div`
  margin: 0 20px;
`;
