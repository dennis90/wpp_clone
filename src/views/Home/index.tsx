import useMediaQuery from '@material-ui/core/useMediaQuery';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ConversationContainer from 'components/Conversation/Container';
import ConversationList from 'components/Conversation/List';
import { StoreState } from 'store';
import { actions as conversationActions } from 'store/conversations';
import { actions as sessionActions } from 'store/session';
import { MEDIUM_RULE } from 'styles/media-queries';
import { StyledContainer } from './styles';

import { conversations, users } from '__mocks__/data';
import useWindowHeight from 'hooks/useWindowHeight';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { selectedConversationId } = useSelector((store: StoreState) => store.conversations);

  const greaterThanMd = useMediaQuery(MEDIUM_RULE);
  const windowHeight = useWindowHeight();

  // TODO: This should be replaced by real data
  useEffect(() => {
    dispatch(sessionActions.login(users.johnDoe));

    conversations.forEach((conversation) => {
      dispatch(conversationActions.appendConversation(conversation));
    });
  }, [dispatch]);

  return (
    <StyledContainer height={windowHeight}>
      {(greaterThanMd || !selectedConversationId) && <ConversationList />}

      {(greaterThanMd || selectedConversationId) && <ConversationContainer />}
    </StyledContainer>
  );
};

export default Home;
