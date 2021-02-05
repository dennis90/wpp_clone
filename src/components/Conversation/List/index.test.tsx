import AppProviders from '__mocks__/appProviders';
import { initialData } from '__mocks__/data';
import { render, screen } from '@testing-library/react';
import DataContext from 'data/dataContext';
import { Conversation } from 'types/Conversation';

import ConversationListing from './index';

jest.mock('./Header', () => () => <div data-testid="header-component"/>);
jest.mock('./Item', () => () => <div data-testid="list-item"/>)

describe('Conversation list component', () => {
  it('display the Header component', () => {
    render(
      <AppProviders>
        <DataContext.Provider value={initialData}>
          <ConversationListing/>
        </DataContext.Provider>
      </AppProviders>
    );

    expect(screen.getByTestId('header-component')).toBeInTheDocument()
  });

  it('Display every provided conversation', () => {
    const conversations: Conversation[] = [
      {
        id: '1',
        image: '',
        messages: [],
        title: '',
        type: 'buyer',
        users: [],
      },
      {
        id: '2',
        image: '',
        messages: [],
        title: '',
        type: 'buyer',
        users: [],
      },
      {
        id: '3',
        image: '',
        messages: [],
        title: '',
        type: 'buyer',
        users: [],
      },
    ]
    render(
      <AppProviders>
        <DataContext.Provider value={{ ...initialData, conversations: conversations}}>
          <ConversationListing/>
        </DataContext.Provider>
      </AppProviders>
    );

    const conversationsCount = screen.getAllByTestId('list-item');

    expect(conversationsCount).toHaveLength(conversations.length)
  });
});
