import Avatar from '@material-ui/core/Avatar';
import React from 'react';
import { useSelector } from 'react-redux';

import { StoreState } from 'store';
import { StyledUserHeader, StyledUserName } from './styles';

const ListHeader: React.FC = () => {
  const appUser = useSelector((store: StoreState) => store.session.user);

  return (
    <StyledUserHeader>
      <Avatar src={appUser?.profilePicture} alt={appUser?.name} />
      <StyledUserName>{appUser?.name}</StyledUserName>
    </StyledUserHeader>
  );
};

export default ListHeader;
