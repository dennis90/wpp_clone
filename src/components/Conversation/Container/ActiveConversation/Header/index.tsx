import Avatar from '@material-ui/core/Avatar';
import React from 'react';

import { Conversation } from 'types/Conversation';
import { StyledConversationDetails, StyledHeaderContainer, StyledParticipants, StyledTitle } from './styles';

export interface HeaderProps {
  image: Conversation['image'];
  title: Conversation['title'];
  users: Conversation['users'];
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <StyledHeaderContainer>
      <Avatar src={props.image} alt={props.title} />

      <StyledConversationDetails>
        <StyledTitle>{props.title}</StyledTitle>

        <StyledParticipants>{props.users.map((user) => user.name).join(', ')}</StyledParticipants>
      </StyledConversationDetails>
    </StyledHeaderContainer>
  );
};

export default Header;
