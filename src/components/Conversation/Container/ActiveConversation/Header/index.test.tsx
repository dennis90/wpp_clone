import AppProviders from '__mocks__/appProviders';
import { render, screen } from '@testing-library/react';
import { User } from 'types/Conversation';

import ConversationHeader from './index';

describe('Active conversation Header', () => {
  it('display conversation avatar', () => {
    render(
      <AppProviders>
        <ConversationHeader image="/image/01.png" title="Conversation 01" users={[]} />
      </AppProviders>,
    );

    const image = screen.getByAltText('Conversation 01') as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toContain('/image/01.png');
  });

  it('display conversation title', () => {
    render(
      <AppProviders>
        <ConversationHeader image="" title="Conversation 01" users={[]} />
      </AppProviders>,
    );

    expect(screen.getByText('Conversation 01')).toBeInTheDocument();
  });

  it('display conversation participants', () => {
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
});
