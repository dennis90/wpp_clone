import AppProviders from '__mocks__/appProviders';
import { render, screen } from 'test-utils';
import { User } from 'types/Conversation';
import Header from './index';

const mockedUser: User = {
  id: '1001',
  name: 'Sample user',
  profilePicture: 'path/to/image.png',
};

describe('Conversation listing Header component', () => {
  it('display Avatar image', () => {
    render(
      <AppProviders>
        <Header />
      </AppProviders>,
      { initialState: { session: { user: mockedUser } } },
    );

    const image = screen.getByAltText(mockedUser.name) as HTMLImageElement;

    expect(image).toBeInTheDocument();
    expect(image.src).toContain(mockedUser.profilePicture);
  });

  it('display user name', () => {
    render(
      <AppProviders>
        <Header />
      </AppProviders>,
      { initialState: { session: { user: mockedUser } } },
    );

    expect(screen.getByText(mockedUser.name)).toBeInTheDocument();
  });
});
