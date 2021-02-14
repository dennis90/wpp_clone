import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import React from 'react';
import { useDispatch } from 'react-redux';

import { actions } from 'store/conversations';
import { Conversation } from 'types/Conversation';
import { StyledConversationDetails, StyledHeaderContainer, StyledParticipants, StyledTitle } from './styles';

export interface HeaderProps {
  image: Conversation['image'];
  title: Conversation['title'];
  users: Conversation['users'];
}

const Header: React.FC<HeaderProps> = (props) => {
  const dispatch = useDispatch();

  const backButtonClickHandler = (): void => {
    dispatch(actions.selectConversationId(undefined));
  };

  return (
    <StyledHeaderContainer>
      <IconButton color="inherit" onClick={backButtonClickHandler}>
        <ArrowBackIosIcon />
      </IconButton>

      <Avatar src={props.image} alt={props.title} />

      <StyledConversationDetails>
        <StyledTitle>{props.title}</StyledTitle>

        <StyledParticipants>{props.users.map((user) => user.name).join(', ')}</StyledParticipants>
      </StyledConversationDetails>
    </StyledHeaderContainer>
  );
};

export default Header;
