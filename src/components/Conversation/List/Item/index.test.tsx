import { fireEvent, render, screen } from '@testing-library/react';
import format from 'date-fns/format';
import { useDispatch } from 'react-redux';

import AppProviders from '__mocks__/appProviders';
import { Conversation, Message, MessageTypes } from 'types/Conversation';

import Item from './index';
import { Action } from '@reduxjs/toolkit';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

const message: Message = {
  when: new Date().toISOString(),
  userId: '1001',
  actions: [],
  type: MessageTypes.Text,
  text: 'Hello World!',
};

const conversation: Conversation = {
  id: '1001',
  image: 'path/to/image.png',
  title: 'First message',
  type: 'buyer',
  users: [],
  messages: [message],
};

describe('Conversation listing Item component', () => {
  it('display last message time if the message was sent today', () => {
    const localMessage = { ...message, when: new Date().toISOString() };
    const localConversation = { ...conversation, messages: [localMessage] };

    render(
      <AppProviders>
        <Item conversation={localConversation} active={false} />
      </AppProviders>,
    );

    expect(screen.getByText(format(new Date(localMessage.when), 'p'))).toBeInTheDocument();
  });

  it('display last message date if the message was sent before today', () => {
    const localMessage = { ...message, when: '2021-02-01T10:00:00.000Z' };
    const localConversation = { ...conversation, messages: [localMessage] };

    render(
      <AppProviders>
        <Item conversation={localConversation} active={false} />
      </AppProviders>,
    );

    expect(screen.getByText(format(new Date(localMessage.when), 'P'))).toBeInTheDocument();
  });

  it('display conversation title', () => {
    const localConversation = { ...conversation, title: 'First conversation' };

    render(
      <AppProviders>
        <Item conversation={localConversation} active={false} />
      </AppProviders>,
    );

    expect(screen.getByText(localConversation.title)).toBeInTheDocument();
  });

  it('display conversation image', () => {
    const localConversation = {
      ...conversation,
      title: 'First conversation',
      image: 'path/to/image.png',
    };

    render(
      <AppProviders>
        <Item conversation={localConversation} active={false} />
      </AppProviders>,
    );

    const image = screen.getByAltText(localConversation.title) as HTMLImageElement;

    expect(image).toBeInTheDocument();
    expect(image.src).toContain(localConversation.image);
  });

  it('display unread messages count', () => {
    const localMessage = { ...message, read: false };
    const localConversation = { ...conversation, messages: [localMessage] };

    render(
      <AppProviders>
        <Item conversation={localConversation} active={false} />
      </AppProviders>,
    );

    const badge = screen.getByText('1');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('MuiBadge-badge');
  });

  it('display last message text', () => {
    const localMessage = { ...message, text: 'This is a message' };
    const localConversation = { ...conversation, messages: [localMessage] };

    render(
      <AppProviders>
        <Item conversation={localConversation} active={false} />
      </AppProviders>,
    );

    expect(screen.getByText(localMessage.text)).toBeInTheDocument();
  });

  it('call selectConversation function on click', () => {
    const localConversation = { ...conversation, title: 'First conversation' };

    type DispatchedActionType = { payload: unknown } & Action;
    const dispatchList: DispatchedActionType[] = [];

    (useDispatch as jest.Mock).mockImplementation(() => (action: DispatchedActionType) => dispatchList.push(action));

    render(
      <AppProviders>
        <Item conversation={localConversation} active={false} />
      </AppProviders>,
    );

    const element = screen.getByText(localConversation.title);

    fireEvent.click(element);

    expect(dispatchList).toEqual([
      {
        payload: localConversation.id,
        type: 'conversations/selectConversationId',
      },
    ]);
  });
});
