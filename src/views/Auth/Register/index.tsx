import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { auth, firestore } from 'config/firebase';
import { StyledAvatar, StyledContainer, StyledForm } from '../styles';

const Register: React.VFC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter();

  const registerFormSubmitHandler = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setError(undefined);

    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      await firestore.collection('profile').doc(user?.uid).set({
        email: user?.email,
        name: name,
        photo: user?.photoURL,
        uid: user?.uid,
      });

      router.push('/');
    } catch (error) {
      setError(String(error.message));
    }
  };

  return (
    <StyledContainer>
      <StyledAvatar>
        <AccountCircleIcon />
      </StyledAvatar>

      <StyledForm onSubmit={registerFormSubmitHandler}>
        <TextField
          type="text"
          name="name"
          id="display-name"
          label="Nome de exibição"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required={true}
        />

        <TextField
          type="email"
          name="email"
          id="email"
          label="E-mail"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required={true}
        />

        <TextField
          type="password"
          name="password"
          id="password"
          label="Senha"
          value={password}
          required={true}
          onChange={(event) => setPassword(event.target.value)}
        />

        {error && <div>{error}</div>}

        <Button type="submit" variant="contained" color="primary">
          Cadastre-se
        </Button>
      </StyledForm>
    </StyledContainer>
  );
};

export default Register;
