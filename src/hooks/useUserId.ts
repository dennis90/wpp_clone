import { createContext, useContext } from 'react';
import firebase from 'firebase/app';

const context = createContext<firebase.UserInfo | undefined>(undefined);

export const Provider = context.Provider;

const useCurrentUser = (): firebase.UserInfo | undefined => {
  return useContext(context);
};

export default useCurrentUser;
