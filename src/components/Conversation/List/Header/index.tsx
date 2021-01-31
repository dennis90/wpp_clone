import Avatar from '@material-ui/core/Avatar';
import React, { useContext } from 'react';

import { StyledUserHeader, StyledUserName } from './styles';

import DataContext from 'views/Home/dataContext';

const ListHeader: React.FC = () => {
  const { user } = useContext(DataContext);

  return (
    <StyledUserHeader>
      <Avatar src={user.profilePicture} alt={user.name}/>
      <StyledUserName>
        {user.name}
      </StyledUserName>
    </StyledUserHeader>
  );
};

export default ListHeader;
