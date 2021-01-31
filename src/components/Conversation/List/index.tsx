import React, { useContext } from 'react';

import Header from './Header';
import ConversationItem from './Item';
import { StyledContainer } from './styles';

// TODO: This information should come from API Endpoint
import DataContext from 'views/Home/dataContext';

const ConversationList: React.FC = () => {
  const { conversations } = useContext(DataContext);

  return (
    <StyledContainer>
      <Header/>

      {conversations.map(
        (conversation) => <ConversationItem key={conversation.id} {...conversation}/>,
      )}
    </StyledContainer>
  );
};

export default ConversationList;
