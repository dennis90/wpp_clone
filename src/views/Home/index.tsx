import React from 'react';

import ConversationContainer from 'components/Conversation/Container';
import ConversationList from 'components/Conversation/List';
import { StyledContainer } from './styles';

import DataContext, { initialData } from './dataContext';

const Home: React.FC = () => (
  <DataContext.Provider value={initialData}>
    <StyledContainer>
      <ConversationList/>
      <ConversationContainer/>
    </StyledContainer>
  </DataContext.Provider>
);

export default Home;
