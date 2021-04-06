import { CircularProgress } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useCollectionData, useDocumentDataOnce } from 'react-firebase-hooks/firestore';

import { firestore, storage } from 'config/firebase';
import useUserId from 'hooks/useUserId';
import { Profile } from 'types/Conversation';
import MessagesView from 'views/Message';

const MAX_USERS_PAGE = 10;

const CreateConversation: React.VFC = () => {
  const [profiles, setProfiles] = useState<Record<string, Profile | undefined>>({});
  const [picture, setPicture] = useState<File | null>(null);
  const [title, setTitle] = useState<string>('');
  const currentUser = useUserId();

  const router = useRouter();

  const [usersCollection, loading] = useCollectionData<Profile>(
    firestore.collection('profile').where('uid', '!=', currentUser?.uid).orderBy('uid').limit(MAX_USERS_PAGE),
  );

  const [currentUserProfile] = useDocumentDataOnce<Profile>(firestore.collection('profile').doc(currentUser?.uid));

  const profilesMap: Record<string, Profile | undefined> = (usersCollection || []).reduce(
    (map, profile) => ({ ...map, [profile.uid]: profile }),
    {},
  );

  const checkboxChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const uid = event.currentTarget.dataset.uid || '';
    const selectedMap = { ...profiles, [uid]: event.currentTarget.checked ? profilesMap[uid] : undefined };
    setProfiles(selectedMap);
  };

  const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPicture(event.target.files ? event.target.files[0] : null);
  };

  const createConversationSubmitHandler = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (!picture) {
      throw Error('Image required!');
    }

    const conversationUsers = Object.values(profiles).filter((profile) => profile !== undefined) as Profile[];

    const res = await firestore.collection('conversation').add({
      title,
      users: [...conversationUsers, currentUserProfile],
      owner: currentUserProfile,
      messages: [],
    });

    const coverRef = storage.ref().child(`images/${res.id}/${picture.name}`);

    await coverRef.put(picture);

    const imageURL = await coverRef.getDownloadURL();

    await firestore.doc(`user/conversations/${currentUser?.uid}/${res.id}`).set({
      id: res.id,
      image: imageURL,
      title,
    });

    await firestore.doc(`conversation/${res.id}`).update('image', imageURL);

    const usersActions = conversationUsers.map((user) => {
      return () =>
        firestore.doc(`user/conversations/${user.uid}/${res.id}`).set({
          id: res.id,
          image: imageURL,
          title,
        });
    });

    await Promise.all(usersActions);

    router.push(`/message/${res.id}`);
  };

  return (
    <MessagesView>
      <form onSubmit={createConversationSubmitHandler}>
        <TextField
          label="Título"
          type="text"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <Button variant="outlined" component="label" color="secondary">
          {picture === null ? 'Selecionar imagem' : picture.name}

          <input
            accept="image/*"
            maxLength={5 * 1024 * 1024}
            multiple={false}
            type="file"
            hidden={true}
            onChange={fileChangeHandler}
          />
        </Button>

        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {(usersCollection || []).map((profile) => (
              <div key={profile.uid}>
                <Checkbox
                  id={`profile-${profile.uid}`}
                  checked={profiles[profile.uid] !== undefined}
                  data-value={profile.uid}
                  onChange={checkboxChangeHandler}
                />
                <label htmlFor={`profile-${profile.uid}`}>{profile.name || profile.email}</label>
              </div>
            ))}
          </>
        )}

        <Button type="submit" variant="contained" color="primary">
          Iniciar conversa
        </Button>
      </form>
    </MessagesView>
  );
};

export default CreateConversation;
