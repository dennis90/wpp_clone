import { useDispatch } from 'react-redux';

import AppProviders from '__mocks__/appProviders';
import { render, screen } from 'test-utils';
import { ActionTypes, Message } from 'types/Conversation';
import { StoreState } from 'store';
import SendFile from './index';
import { Action } from 'redux';
import { fireEvent } from '@testing-library/dom';
import { users } from '__mocks__/data';

jest.mock('react-redux', () => {
  const reactReduxModule = jest.requireActual('react-redux');

  return {
    ...reactReduxModule,
    useDispatch: jest.fn(),
  }
});

describe('SendFile Component', () => {
  it('fill the TextField with initial message', () => {
    const actionPanelInitialState: StoreState['actionPanel']['panelInfo'] = {
      actionType: ActionTypes.SendFile,
      documentName: 'document.pdf',
      documentPath: 'http://localhost:3000/document.pdf',
      documentType: 'application/pdf',
      initialMessage: 'Hello World!',
    };

    render(
      <AppProviders>
        <SendFile/>
      </AppProviders>,
      {
        initialState: {
          actionPanel: { panelInfo: actionPanelInitialState },
          conversations: { selectedConversationId: '100', conversations: [], },
        },
      }
    );

    const textInput = screen.getByPlaceholderText('Informe a legenda da imagem') as HTMLInputElement;
    expect(textInput.value).toBe(actionPanelInitialState.initialMessage);
  });

  it('render MessageUnknown card with received filename', () => {
    const actionPanelInitialState: StoreState['actionPanel']['panelInfo'] = {
      actionType: ActionTypes.SendFile,
      documentName: 'document.pdf',
      documentPath: 'http://localhost:3000/document.pdf',
      documentType: 'application/pdf',
      initialMessage: 'Hello World!',
    };

    render(
      <AppProviders>
        <SendFile/>
      </AppProviders>,
      {
        initialState: {
          actionPanel: { panelInfo: actionPanelInitialState },
          conversations: { selectedConversationId: '100', conversations: [], },
        },
      }
    );

    expect(screen.getByLabelText('Attachment icon')).toBeInTheDocument();
    expect(screen.getByText(actionPanelInitialState.documentName)).toBeInTheDocument();
  });

  it('send file without message', () => {
    type DispatchedActionType = { payload: unknown } & Action;
    const dispatchList: DispatchedActionType[] = [];
    (useDispatch as jest.Mock) .mockImplementation(() => (action: DispatchedActionType) => dispatchList.push(action));

    const actionPanelInitialState: StoreState['actionPanel']['panelInfo'] = {
      actionType: ActionTypes.SendFile,
      documentName: 'document.pdf',
      documentPath: 'http://localhost:3000/document.pdf',
      documentType: 'application/pdf',
      initialMessage: '',
    };

    render(
      <AppProviders>
        <SendFile/>
      </AppProviders>,
      {
        initialState: {
          actionPanel: { panelInfo: actionPanelInitialState },
          conversations: { selectedConversationId: '100', conversations: [], },
          session: { user: users.johnDoe },
        },
      }
    );

    expect(screen.getByLabelText('Attachment icon')).toBeInTheDocument();
    expect(screen.getByText(actionPanelInitialState.documentName)).toBeInTheDocument();

    const sendButton = screen.getByLabelText('Send message') as HTMLButtonElement;
    fireEvent.click(sendButton);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { when: _, ...payload } = dispatchList[0].payload as Message;

    expect(payload).toEqual({
      actions: [],
      file: {
        name: 'document.pdf',
        path: 'http://localhost:3000/document.pdf',
        type: 'application/pdf',
      },
      read: true,
      text: '',
      type: 'file',
      userId: users.johnDoe.id,
    });

    expect(dispatchList[0].type).toBe('conversations/sendMessage');
  });

  it('send document with message', () => {
    type DispatchedActionType = { payload: unknown } & Action;
    const dispatchList: DispatchedActionType[] = [];
    (useDispatch as jest.Mock) .mockImplementation(() => (action: DispatchedActionType) => dispatchList.push(action));

    const actionPanelInitialState: StoreState['actionPanel']['panelInfo'] = {
      actionType: ActionTypes.SendFile,
      documentName: 'document.pdf',
      documentPath: 'http://localhost:3000/document.pdf',
      documentType: 'application/pdf',
      initialMessage: '',
    };

    render(
      <AppProviders>
        <SendFile/>
      </AppProviders>,
      {
        initialState: {
          actionPanel: { panelInfo: actionPanelInitialState },
          conversations: { selectedConversationId: '100', conversations: [], },
        },
      }
    );

    const messageInput = screen.getByPlaceholderText('Informe a legenda da imagem') as HTMLInputElement;
    fireEvent.change(messageInput, { target: { value: 'New message' } });

    const sendButton = screen.getByLabelText('Send message') as HTMLButtonElement;
    fireEvent.click(sendButton);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { when: _, ...payload } = dispatchList[0].payload as Message;

    expect(payload).toEqual({
      actions: [],
      file: {
        name: actionPanelInitialState.documentName,
        path: actionPanelInitialState.documentPath,
        type: actionPanelInitialState.documentType,
      },
      read: true,
      text: 'New message',
      type: 'file',
      userId: '',
    });

    expect(dispatchList[0].type).toEqual('conversations/sendMessage');
  });

  it('close panel after message is sent', () => {
    type DispatchedActionType = { payload: unknown } & Action;
    const dispatchList: DispatchedActionType[] = [];
    (useDispatch as jest.Mock) .mockImplementation(() => (action: DispatchedActionType) => dispatchList.push(action));

    const actionPanelInitialState: StoreState['actionPanel']['panelInfo'] = {
      actionType: ActionTypes.SendFile,
      documentName: 'document.pdf',
      documentPath: 'http://localhost:3000/document.pdf',
      documentType: 'application/pdf',
      initialMessage: '',
    };

    render(
      <AppProviders>
        <SendFile/>
      </AppProviders>,
      {
        initialState: {
          actionPanel: { panelInfo: actionPanelInitialState },
          conversations: { selectedConversationId: '100', conversations: [], },
        },
      }
    );

    const messageInput = screen.getByPlaceholderText('Informe a legenda da imagem') as HTMLInputElement;
    fireEvent.change(messageInput, { target: { value: 'New message' } });

    const sendButton = screen.getByLabelText('Send message') as HTMLButtonElement;
    fireEvent.click(sendButton);

    expect(dispatchList[1].type).toEqual('actionPanel/setPanelInfo');
    expect(dispatchList[1].payload).toEqual(undefined);
  });
});
