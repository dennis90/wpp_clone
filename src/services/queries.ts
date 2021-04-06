import firebase from 'firebase/app';

import { firestore } from 'config/firebase';
import { Message } from 'types/Conversation';

export function sendMessage(
  conversation: string,
  message: Message,
): Promise<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>> {
  const docRef = firestore.collection(`conversation/${conversation}/messages`);

  return docRef.add({ ...message, when: firebase.firestore.FieldValue.serverTimestamp() });
}
