import AppProviders from '__mocks__/appProviders';
import { initialData } from '__mocks__/data';
import { render, screen } from '@testing-library/react';
import DataContext from 'data/dataContext';
import format from 'date-fns/format';
import { ActionTypes, Message, MessageTypes, User } from 'types/Conversation';

import MessageItem from './index';

describe('Message item component', () => {
  it('display avatar if message was not sent from current user', () => {
    const user: User = {
      id: '100',
      name: 'User name',
      profilePicture: 'path/to/picture.png',
    };

    const message: Message = {
      actions: [],
      type: MessageTypes.Text,
      userId: user.id,
      when: new Date(),
    };

    render(
      <AppProviders>
        <MessageItem message={message} conversationUsers={[user]}/>
      </AppProviders>
    );

    const image = screen.getByAltText(user.name) as HTMLImageElement;
    expect(image.src).toContain(user.profilePicture);
  });

  it('don\'t display avatar if message was sent from current user', () => {
    const currentUser: User = {
      id: '100',
      name: 'Active user',
      profilePicture: 'path/to/user-picture.png',
    };

    const user: User = {
      id: '200',
      name: 'User name',
      profilePicture: 'path/to/picture.png',
    };

    const message: Message = {
      actions: [],
      type: MessageTypes.Text,
      userId: currentUser.id,
      when: new Date(),
    };

    render(
      <AppProviders>
        <DataContext.Provider value={{ ...initialData, user: currentUser }}>
          <MessageItem message={message} conversationUsers={[user]}/>
        </DataContext.Provider>
      </AppProviders>
    );

    expect(screen.queryByAltText(currentUser.name)).not.toBeInTheDocument();
  });

  it('display every action button', () => {
    const message: Message = {
      actions: [ActionTypes.Approve, ActionTypes.Reject],
      type: MessageTypes.Text,
      userId: '100',
      when: new Date(),
    };

    render(
      <AppProviders>
        <MessageItem message={message} conversationUsers={[]}/>
      </AppProviders>
    );

    expect(screen.getByText(ActionTypes.Approve)).toBeInTheDocument();
    expect(screen.getByText(ActionTypes.Reject)).toBeInTheDocument();
  });

  it('display message text', () => {
    const message: Message = {
      actions: [],
      type: MessageTypes.Text,
      userId: '100',
      text: 'Hello world',
      when: new Date(),
    };

    render(
      <AppProviders>
        <MessageItem message={message} conversationUsers={[]}/>
      </AppProviders>
    );

    expect(message.text).not.toBeUndefined();
    expect(screen.getByText(message.text || 'Epic fail')).toBeInTheDocument();
  });

  it('display message time if was sent today', () => {
    const message: Message = {
      actions: [],
      type: MessageTypes.Text,
      userId: '100',
      text: 'Hello world',
      when: new Date(),
    };

    render(
      <AppProviders>
        <MessageItem message={message} conversationUsers={[]}/>
      </AppProviders>
    );

    expect(screen.getByText(format(message.when, 'p'))).toBeInTheDocument();
  });

  it('display message date and time if wasn\'t sent today', () => {
    const message: Message = {
      actions: [],
      type: MessageTypes.Text,
      userId: '100',
      text: 'Hello world',
      when: new Date('2021-01-31T12:00:00.000Z'),
    };

    render(
      <AppProviders>
        <MessageItem message={message} conversationUsers={[]}/>
      </AppProviders>
    );

    expect(screen.getByText(format(message.when, 'Pp'))).toBeInTheDocument();
  });
});
