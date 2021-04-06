import { useCollectionData } from 'react-firebase-hooks/firestore';

import { firestore } from 'config/firebase';
import MessageItem from './Item';
import { StyledMessagesContainer } from './styles';
import { Message, Profile } from 'types/Conversation';

export interface MessagesListProps {
  conversationId: string;
  conversationUsers: Profile[];
}

const MessagesList: React.FC<MessagesListProps> = ({ conversationId, conversationUsers }) => {
  const [messages] = useCollectionData<Message>(
    firestore.collection(`conversation/${conversationId}/messages`).orderBy('when', 'desc'),
  );

  return (
    <StyledMessagesContainer>
      {(messages || []).map((message, index) => (
        <MessageItem conversationUsers={conversationUsers} key={index} message={message} />
      ))}
    </StyledMessagesContainer>
  );
};

export default MessagesList;
