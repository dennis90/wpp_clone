import MessagesView from 'views/Message';
import ActiveConversation from 'components/Conversation/ActiveConversation';
import { useRouter } from 'next/router';
import { useDocument } from 'react-firebase-hooks/firestore';

import firebase from 'config/firebase';
import { Conversation } from 'types/Conversation';
import { CircularProgress } from '@material-ui/core';

const ConversationMessage: React.VFC = () => {
  const router = useRouter();
  const { pid } = router.query;

  const [value, loading, error] = useDocument<Conversation>(firebase.firestore().doc(`conversation/${pid}`));

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const conversation = value?.data();

  if (!conversation) {
    return <div>Mensagem não encontrada</div>;
  }

  return (
    <MessagesView>
      {loading && <CircularProgress />}
      <ActiveConversation id={value?.id} conversation={conversation} />
    </MessagesView>
  );
};

export default ConversationMessage;
