import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import Header from './Header';
import ConversationItem from './Item';
import { StyledContainer } from './styles';
import { auth, firestore } from 'config/firebase';
import { Conversation } from 'types/Conversation';

const ConversationList: React.FC = () => {
  const [user] = useAuthState(auth);
  const [value] = useCollectionData<Conversation>(firestore.collection(`user/conversations/${user?.uid}`));

  return (
    <StyledContainer>
      <Header />

      {(value === undefined || value?.length === 0) && <div>Usuário ainda não possui conversas :(</div>}

      {value?.map((conversation) => (
        <ConversationItem key={conversation.id} id={conversation.id} active={false} conversation={conversation} />
      ))}
    </StyledContainer>
  );
};

export default ConversationList;
