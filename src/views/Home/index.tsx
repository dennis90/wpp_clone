import React from 'react';

import ConversationContainer from 'components/Conversation/Container';
import ConversationList from 'components/Conversation/List';
import { StyledContainer } from './styles';

const Home: React.FC = () => (
  <StyledContainer>
    <ConversationList/>
    <ConversationContainer/>
  </StyledContainer>
);

export default Home;
