import { render, screen } from '@testing-library/react';

import AppProviders from '__mocks__/appProviders';
import { initialData } from '__mocks__/dataContextMock';
import DataContext from 'data/dataContext';
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
        <DataContext.Provider value={{ ...initialData, user: mockedUser }}>
          <Header/>
        </DataContext.Provider>
      </AppProviders>
    );

    const image = screen.getByAltText(mockedUser.name) as HTMLImageElement;

    expect(image).toBeInTheDocument();
    expect(image.src).toContain(mockedUser.profilePicture);

  });

  it('display user name', () => {
    render(
      <AppProviders>
        <DataContext.Provider value={{ ...initialData, user: mockedUser }}>
          <Header/>
        </DataContext.Provider>
      </AppProviders>
    );

    expect(screen.getByText(mockedUser.name)).toBeInTheDocument();
  });
});
