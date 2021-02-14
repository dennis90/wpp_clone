import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Action } from 'redux';
import { useDispatch } from 'react-redux';

import AppProviders from '__mocks__/appProviders';
import { fireEvent, render, screen } from 'test-utils';
import { User } from 'types/Conversation';

import ConversationHeader from './index';

jest.mock('react-redux', () => {
  const reactReduxModule = jest.requireActual('react-redux');

  return {
    ...reactReduxModule,
    useDispatch: jest.fn(),
  };
});

jest.mock('@material-ui/core/useMediaQuery', () => jest.fn());

describe('Active conversation Header', () => {
  test('display conversation avatar', () => {
    render(
      <AppProviders>
        <ConversationHeader image="/image/01.png" title="Conversation 01" users={[]} />
      </AppProviders>,
    );

    const image = screen.getByAltText('Conversation 01') as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toContain('/image/01.png');
  });

  test('display conversation title', () => {
    render(
      <AppProviders>
        <ConversationHeader image="" title="Conversation 01" users={[]} />
      </AppProviders>,
    );

    expect(screen.getByText('Conversation 01')).toBeInTheDocument();
  });

  test('display conversation participants', () => {
    const users: User[] = [
      {
        id: '100',
        name: 'People 01',
        profilePicture: '',
      },
      {
        id: '200',
        name: 'People 02',
        profilePicture: '',
      },
    ];

    render(
      <AppProviders>
        <ConversationHeader image="" title="Conversation 01" users={users} />
      </AppProviders>,
    );

    expect(screen.getByText(`${users[0].name}, ${users[1].name}`)).toBeInTheDocument();
  });

  test('Back button on smaller screens', () => {
    (useMediaQuery as jest.Mock).mockImplementation(() => false);

    type DispatchedActionType = { payload: number | undefined } & Action;
    const dispatchList: DispatchedActionType[] = [];
    (useDispatch as jest.Mock).mockImplementation(() => (action: DispatchedActionType) => dispatchList.push(action));

    render(
      <AppProviders>
        <ConversationHeader image="" title="Conversation 01" users={[]} />
      </AppProviders>,
    );

    const backButton = screen.getByLabelText('Back to listing') as HTMLButtonElement;
    fireEvent.click(backButton);

    expect(dispatchList).toEqual([
      {
        payload: undefined,
        type: 'conversations/selectConversationId',
      },
    ]);
  });

  test('Back button is not present on bigger screens', () => {
    (useMediaQuery as jest.Mock).mockImplementation(() => true);

    render(
      <AppProviders>
        <ConversationHeader image="" title="Conversation 01" users={[]} />
      </AppProviders>,
    );

    expect(screen.queryByLabelText('Back to listing')).not.toBeInTheDocument();
  });
});
