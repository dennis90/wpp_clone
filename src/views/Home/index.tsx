import React from 'react';

import ConversationBody from 'components/ConversationBody';
import ConversationsListing from 'components/ConversationsListing';
import { StyledContainer } from './styles';

const Home: React.FC = () => (
  <StyledContainer>
    <ConversationsListing/>
    <ConversationBody/>
  </StyledContainer>
);

export default Home;
