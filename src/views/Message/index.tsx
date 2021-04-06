import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';

import ConversationList from 'components/Conversation/List';
import { MEDIUM_RULE } from 'config/media-queries';
import { StyledContainer, StyledMessageContainer } from './styles';
import useWindowHeight from 'hooks/useWindowHeight';
import EmptyPlaceholder from './EmptyPlaceholder';

const Message: React.FC = ({ children }) => {
  const greaterThanMd = useMediaQuery(MEDIUM_RULE);
  const windowHeight = useWindowHeight();

  return (
    <StyledContainer height={windowHeight}>
      {(!children || greaterThanMd) && <ConversationList />}

      {children && <StyledMessageContainer>{children}</StyledMessageContainer>}

      {!children && greaterThanMd && (
        <StyledMessageContainer>
          <EmptyPlaceholder />
        </StyledMessageContainer>
      )}
    </StyledContainer>
  );
};

export default Message;
