import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ActionTypes } from 'types/Conversation';

type ActionTypeData =
  ({ actionType: ActionTypes.Register }) |
  ({ actionType: ActionTypes.SendDocument } & { documentName: string, documentPath: string, initialMessage: string });

export interface ActionPanelSlice {
  panelInfo?: ActionTypeData;
}

const initialState: ActionPanelSlice = {
  panelInfo: undefined,
};

export const actionPanelSlice = createSlice({
  name: 'actionPanel',
  initialState,
  reducers: {
    setPanelInfo: (state, action: PayloadAction<ActionTypeData | undefined>) => {
      state.panelInfo = action.payload;
    },
  },
});

export const actions = actionPanelSlice.actions;

export default actionPanelSlice.reducer;
