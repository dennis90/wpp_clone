import AppProviders from '__mocks__/appProviders';
import format from 'date-fns/format';

import { render, screen } from 'test-utils';
import { ActionTypes, Message, MessageTypes, User } from 'types/Conversation';
import MessageItem from './index';

jest.mock('components/Messages/MediaTypes/Image', () => () => <div data-testid="image-media-type" />);
jest.mock('components/Messages/MediaTypes/Unknown', () => () => <div data-testid="unknown-media-type" />);

describe('Message item component', () => {
  test('display avatar if message was not sent from current user', () => {
    const user: User = {
      id: '100',
      name: 'User name',
      profilePicture: 'path/to/picture.png',
    };

    const message: Message = {
      actions: [],
      type: MessageTypes.Text,
      userId: user.id,
      when: new Date().toISOString(),
    };

    render(
      <AppProviders>
        <MessageItem message={message} conversationUsers={[user]} />
      </AppProviders>,
    );

    const image = screen.getByAltText(user.name) as HTMLImageElement;
    expect(image.src).toContain(user.profilePicture);
  });

  test("don't display avatar if message was sent from current user", () => {
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
      when: new Date().toISOString(),
    };

    render(
      <AppProviders>
        <MessageItem message={message} conversationUsers={[user]} />
      </AppProviders>,
    );

    expect(screen.queryByAltText(currentUser.name)).not.toBeInTheDocument();
  });

  test('display every action button', () => {
    const message: Message = {
      actions: [ActionTypes.Approve, ActionTypes.Reject],
      type: MessageTypes.Text,
      userId: '100',
      when: new Date().toISOString(),
    };

    render(
      <AppProviders>
        <MessageItem message={message} conversationUsers={[]} />
      </AppProviders>,
    );

    expect(screen.getByText(ActionTypes.Approve)).toBeInTheDocument();
    expect(screen.getByText(ActionTypes.Reject)).toBeInTheDocument();
  });

  test('display message text', () => {
    const message: Message = {
      actions: [],
      type: MessageTypes.Text,
      userId: '100',
      text: 'Hello world',
      when: new Date().toISOString(),
    };

    render(
      <AppProviders>
        <MessageItem message={message} conversationUsers={[]} />
      </AppProviders>,
    );

    expect(message.text).not.toBeUndefined();
    expect(screen.getByText(message.text || 'Epic fail')).toBeInTheDocument();
  });

  test('display message time if was sent today', () => {
    const message: Message = {
      actions: [],
      type: MessageTypes.Text,
      userId: '100',
      text: 'Hello world',
      when: new Date().toISOString(),
    };

    render(
      <AppProviders>
        <MessageItem message={message} conversationUsers={[]} />
      </AppProviders>,
    );

    expect(screen.getByText(format(new Date(message.when), 'p'))).toBeInTheDocument();
  });

  test("display message date and time if wasn't sent today", () => {
    const message: Message = {
      actions: [],
      type: MessageTypes.Text,
      userId: '100',
      text: 'Hello world',
      when: '2021-01-31T12:00:00.000Z',
    };

    render(
      <AppProviders>
        <MessageItem message={message} conversationUsers={[]} />
      </AppProviders>,
    );

    expect(screen.getByText(format(new Date(message.when), 'Pp'))).toBeInTheDocument();
  });

  test('render unknown file preview if has a file with type document', () => {
    const message: Message = {
      actions: [],
      type: MessageTypes.File,
      userId: '100',
      text: 'Hello world',
      when: '2021-01-31T12:00:00.000Z',
      file: {
        name: 'document.pdf',
        type: 'application/pdf',
        path: 'http://localhost:3000/document.pdf',
      },
    };

    render(
      <AppProviders>
        <MessageItem message={message} conversationUsers={[]} />
      </AppProviders>,
    );

    expect(screen.getByTestId('unknown-media-type')).toBeInTheDocument();
  });

  test('render image preview if has a file with type image', () => {
    const message: Message = {
      actions: [],
      type: MessageTypes.File,
      userId: '100',
      text: 'Hello world',
      when: '2021-01-31T12:00:00.000Z',
      file: {
        name: 'image.png',
        type: 'image/png',
        path: 'http://localhost:3000/image.png',
      },
    };

    render(
      <AppProviders>
        <MessageItem message={message} conversationUsers={[]} />
      </AppProviders>,
    );

    expect(screen.getByTestId('image-media-type')).toBeInTheDocument();
  });
});
