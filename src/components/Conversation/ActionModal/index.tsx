import React from 'react';
import { useSelector } from 'react-redux';

import { StoreState } from 'store';
import { ActionTypes } from 'types/Conversation';
import BuyerRegistration from 'components/forms/BuyerRegistration';
import SendFile from 'components/forms/SendFile';
import { StyledMessageModal } from './styles';
import SendPhoto from 'components/forms/SendPhoto';

const ActionModal: React.FC = () => {
  const actionPanelState = useSelector((store: StoreState) => store.actionPanel);

  return (
    <StyledMessageModal open={actionPanelState.panelInfo !== undefined}>
      {actionPanelState.panelInfo?.actionType === ActionTypes.Register && <BuyerRegistration/>}
      {actionPanelState.panelInfo?.actionType === ActionTypes.SendFile && <SendFile/>}
      {actionPanelState.panelInfo?.actionType === ActionTypes.TakePhoto && <SendPhoto/>}
    </StyledMessageModal>
  );
};

export default ActionModal;
