import Avatar from '@material-ui/core/Avatar';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { StyledUserHeader, StyledUserName } from './styles';
import { auth } from 'config/firebase';

const ListHeader: React.FC = () => {
  const [user] = useAuthState(auth);

  return (
    <StyledUserHeader>
      <Avatar src={user?.photoURL || ''} alt={user?.email || 'Profile picture'} />
      <StyledUserName>{user?.displayName || user?.email}</StyledUserName>
    </StyledUserHeader>
  );
};

export default ListHeader;
