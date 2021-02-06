import { render, screen, fireEvent } from '@testing-library/react';
import { Action } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import AppProviders from '__mocks__/appProviders';
import { users } from '__mocks__/data';
import { Message } from 'types/Conversation';

import MessageBar from './index';

global.URL.createObjectURL = jest.fn().mockImplementation((file) => {
  return `http://localhost/${file.name}`;
});

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('Message bar component', () => {
  describe('Send file message', () => {
    it('send file without message', () => {
      type DispatchedActionType = { payload: Message } & Action;
      const dispatchList: DispatchedActionType[] = [];
      (useDispatch as jest.Mock) .mockImplementation(() => (action: DispatchedActionType) => dispatchList.push(action));
      (useSelector as jest.Mock) .mockImplementation(() => users.johnDoe);

      render(
        <AppProviders>
          <MessageBar/>
        </AppProviders>
      );

      const fileInputElement = screen.getByLabelText('upload file input');
      expect(fileInputElement).toBeInTheDocument();

      const file = new File(['File content'], 'filename.png', { type: 'image/png' });
      fireEvent.change(fileInputElement, { target: { files: [file] } });

      // Display extra field info details
      expect(screen.getByText('Digite a legenda do arquivo')).toBeInTheDocument();
      expect(screen.getByText(file.name)).toBeInTheDocument();

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
          file: {
            name: 'filename.png',
            path: 'http://localhost/filename.png',
          },
          read: true,
          type: 'media_unknown',
          userId: users.johnDoe.id,
          when: '',
        },
        type: 'conversations/sendMessage',
      });
    });

    it('send document with message', () => {
      type DispatchedActionType = { payload: Message } & Action;
      const dispatchList: DispatchedActionType[] = [];
      (useDispatch as jest.Mock) .mockImplementation(() => (action: DispatchedActionType) => dispatchList.push(action));
      (useSelector as jest.Mock) .mockImplementation(() => users.johnDoe);

      render(
        <AppProviders>
          <MessageBar/>
        </AppProviders>
      );

      const fileInputElement = screen.getByLabelText('upload file input');
      expect(fileInputElement).toBeInTheDocument();

      const file = new File(['File content'], 'filename.png', { type: 'image/png' });
      fireEvent.change(fileInputElement, { target: { files: [file] } });

      // Display extra field info details
      expect(screen.getByText('Digite a legenda do arquivo')).toBeInTheDocument();
      expect(screen.getByText(file.name)).toBeInTheDocument();

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
          file: {
            name: 'filename.png',
            path: 'http://localhost/filename.png',
          },
          read: true,
          type: 'media_unknown',
          text: 'Hello World!',
          userId: users.johnDoe.id,
          when: '',
        },
        type: 'conversations/sendMessage',
      });
    });
  });
});
