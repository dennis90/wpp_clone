import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { auth } from 'config/firebase';
import { StyledAvatar, StyledContainer, StyledForm } from '../styles';

const Register: React.VFC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter();

  const registerFormSubmitHandler = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setError(undefined);
    try {
      await auth.signInWithEmailAndPassword(email, password);
      router.push('/login');
    } catch (error) {
      setError(String(error.message));
    }
  };

  return (
    <StyledContainer>
      <StyledAvatar>
        <LockOutlinedIcon />
      </StyledAvatar>

      <StyledForm onSubmit={registerFormSubmitHandler}>
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
          Entrar
        </Button>
        <Link href="/register" variant="body2">
          Não tem uma conta? Cadastre-se
        </Link>
      </StyledForm>
    </StyledContainer>
  );
};

export default Register;
