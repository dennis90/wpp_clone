import React from 'react';
import { useSelector } from 'react-redux';

import { StoreState } from 'store';
import { ActionTypes } from 'types/Conversation';
import BuyerRegistration from 'components/forms/BuyerRegistration';
import SendDocument from 'components/forms/SendDocument';
import { StyledMessageModal } from './styles';

const ActionModal: React.FC = () => {
  const actionPanelState = useSelector((store: StoreState) => store.actionPanel);

  return (
    <StyledMessageModal open={actionPanelState.panelInfo !== undefined}>
      {actionPanelState.panelInfo?.actionType === ActionTypes.Register && <BuyerRegistration/>}
      {actionPanelState.panelInfo?.actionType === ActionTypes.SendDocument && <SendDocument/>}
    </StyledMessageModal>
  );
};

export default ActionModal;
