import { Action } from 'redux';
import { useDispatch } from 'react-redux';

import AppProviders from '__mocks__/appProviders';
import { users } from '__mocks__/data';
import { render, screen, fireEvent } from 'test-utils';
import { ActionTypes, Message } from 'types/Conversation';

import MessageBar from './index';
import { ActionTypeData } from 'store/actionPanel';

global.URL.createObjectURL = jest.fn().mockImplementation((file) => {
  return `http://localhost/${file.name}`;
});

jest.mock('react-redux', () => {
  const reactReduxModule = jest.requireActual('react-redux');

  return {
    ...reactReduxModule,
    useDispatch: jest.fn(),
  };
});

describe('Message bar component', () => {
  describe('Send file message', () => {
    it('send document without message', () => {
      type DispatchedActionType = { payload: ActionTypeData | undefined } & Action;
      const dispatchList: DispatchedActionType[] = [];
      (useDispatch as jest.Mock).mockImplementation(() => (action: DispatchedActionType) => dispatchList.push(action));

      render(
        <AppProviders>
          <MessageBar />
        </AppProviders>,
        { initialState: { session: { user: users.johnDoe } } },
      );

      // Select a file
      const fileInputElement = screen.getByLabelText('upload file input');
      expect(fileInputElement).toBeInTheDocument();

      const file = new File(['File content'], 'filename.png', { type: 'image/png' });
      fireEvent.change(fileInputElement, { target: { files: [file] } });

      expect(dispatchList).toHaveLength(1);

      expect(dispatchList[0].type).toEqual('actionPanel/setPanelInfo');
      expect(dispatchList[0].payload).toEqual({
        actionType: ActionTypes.SendFile,
        documentName: 'filename.png',
        documentPath: 'http://localhost/filename.png',
        documentType: 'image/png',
        initialMessage: '',
      });
    });

    it('fill a text and then send document with message to action panel', () => {
      type DispatchedActionType = { payload: Message } & Action;
      const dispatchList: DispatchedActionType[] = [];
      (useDispatch as jest.Mock).mockImplementation(() => (action: DispatchedActionType) => dispatchList.push(action));

      render(
        <AppProviders>
          <MessageBar />
        </AppProviders>,
        { initialState: { session: { user: users.johnDoe } } },
      );

      // Enter message
      const textElement = screen.getByPlaceholderText('Escreva uma mensagem');
      fireEvent.change(textElement, { target: { value: 'Hello World!' } });

      // Select a file
      const fileInputElement = screen.getByLabelText('upload file input');
      expect(fileInputElement).toBeInTheDocument();

      const file = new File(['File content'], 'filename.png', { type: 'image/png' });
      fireEvent.change(fileInputElement, { target: { files: [file] } });

      expect(dispatchList).toHaveLength(1);

      expect(dispatchList[0].type).toEqual('actionPanel/setPanelInfo');
      expect(dispatchList[0].payload).toEqual({
        actionType: ActionTypes.SendFile,
        documentName: 'filename.png',
        documentPath: 'http://localhost/filename.png',
        documentType: 'image/png',
        initialMessage: 'Hello World!',
      });
    });
  });

  it('Send text message', () => {
    type DispatchedActionType = { payload: Message } & Action;
    const dispatchList: DispatchedActionType[] = [];
    (useDispatch as jest.Mock).mockImplementation(() => (action: DispatchedActionType) => dispatchList.push(action));

    render(
      <AppProviders>
        <MessageBar />
      </AppProviders>,
      { initialState: { session: { user: users.johnDoe } } },
    );

    // Enter message
    const textElement = screen.getByPlaceholderText('Escreva uma mensagem');
    fireEvent.change(textElement, { target: { value: 'Hello World!' } });

    // Send the message
    const submitButton = screen.getByLabelText('Send message');
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);

    expect(dispatchList).toHaveLength(1);

    const receivedMessage = {
      ...dispatchList[0],
      payload: {
        ...dispatchList[0].payload,
        when: '',
      },
    };

    expect(receivedMessage).toEqual({
      payload: {
        actions: [],
        read: true,
        type: 'text',
        text: 'Hello World!',
        userId: users.johnDoe.id,
        when: '',
      },
      type: 'conversations/sendMessage',
    });
  });
});
