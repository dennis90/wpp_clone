import AppProviders from '__mocks__/appProviders';
import { conversations } from '__mocks__/data';
import { render, screen } from 'test-utils';

import ConversationContainer from './index';

jest.mock('./ActiveConversation', () => () => <div data-testid="active-conversation"/>);
jest.mock('./EmptyPlaceholder', () => () => <div data-testid="empty-placeholder"/>);

describe('Conversation container component', () => {
  it('Render empty placeholder when no conversation is selected', async () => {
    render(
      <AppProviders>
        <ConversationContainer/>
      </AppProviders>,
      {
        initialState: { conversations: { conversations, selectedConversationId: undefined } }
      },
    );

    expect(await screen.findByTestId('empty-placeholder')).toBeInTheDocument();
  });

  it('Render active conversation when a conversation is selected', async () => {
    render(
      <AppProviders>
        <ConversationContainer/>
      </AppProviders>,
      {
        initialState: { conversations: { conversations, selectedConversationId: conversations[0].id } }
      },
    );

    expect(await screen.findByTestId('active-conversation')).toBeInTheDocument();
  });
});
