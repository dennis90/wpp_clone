import React from 'react';
export { default as ActionHeader } from './Header';

import { StyledMessageModal } from './styles';

export interface ActionModalProps {
  open: boolean;
}

const ActionModal: React.FC<ActionModalProps> = ({ open, children }) => (
  <StyledMessageModal open={open}>{children}</StyledMessageModal>
);

export default ActionModal;
