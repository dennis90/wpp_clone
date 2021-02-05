import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ConversationContainer from 'components/Conversation/Container';
import ConversationList from 'components/Conversation/List';
import { actions as conversationActions } from 'store/conversations';
import { actions as sessionActions } from 'store/session';
import { StyledContainer } from './styles';

import { conversations, users } from '__mocks__/data';

const Home: React.FC = () => {
  const dispatch = useDispatch();

  // TODO: This should be replaced by real data
  useEffect(() => {
    dispatch(sessionActions.login(users.johnDoe));

    conversations.forEach((conversation) => {
      dispatch(conversationActions.appendConversation(conversation));
    });
  }, [dispatch]);

  return (
    <StyledContainer>
      <ConversationList/>
      <ConversationContainer/>
    </StyledContainer>
  );
}

export default Home;
