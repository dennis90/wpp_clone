import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAv_MCc5C5FIntL_Axy0dMNS8vBJ4OfwNE',
  authDomain: 'simple-chat-887b2.firebaseapp.com',
  projectId: 'simple-chat-887b2',
  storageBucket: 'simple-chat-887b2.appspot.com',
  messagingSenderId: '240733351669',
  appId: '1:240733351669:web:c6575b18dad325e1dddfbc',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export default firebase;
