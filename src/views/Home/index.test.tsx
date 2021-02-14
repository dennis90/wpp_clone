import useMediaQuery from '@material-ui/core/useMediaQuery';

import { render, screen } from 'test-utils';
import AppMockProviders from '__mocks__/appProviders';

import Home from './index';

jest.mock('@material-ui/core/useMediaQuery', () => jest.fn());

jest.mock('components/Conversation/Container', () => () => <div data-testid="conversation-messages" />);
jest.mock('components/Conversation/List', () => () => <div data-testid="conversation-listing" />);

describe('Home document', () => {
  test('Listing and messages are present on larger screens', () => {
    (useMediaQuery as jest.Mock).mockImplementation(() => true);

    render(
      <AppMockProviders>
        <Home />
      </AppMockProviders>,
    );

    expect(screen.getByTestId('conversation-messages')).toBeInTheDocument();
    expect(screen.getByTestId('conversation-listing')).toBeInTheDocument();
  });

  describe('on smaller screens', () => {
    test('If there is no message selected, show conversations listing', () => {
      (useMediaQuery as jest.Mock).mockImplementation(() => false);
      render(
        <AppMockProviders>
          <Home />
        </AppMockProviders>,
        {
          initialState: {
            conversations: { selectedConversationId: '100', conversations: [] },
          },
        },
      );

      expect(screen.getByTestId('conversation-messages')).toBeInTheDocument();
      expect(screen.queryByTestId('conversation-listing')).not.toBeInTheDocument();
    });

    test('show messages if message is selected', () => {
      (useMediaQuery as jest.Mock).mockImplementation(() => false);
      render(
        <AppMockProviders>
          <Home />
        </AppMockProviders>,
      );

      expect(screen.queryByTestId('conversation-messages')).not.toBeInTheDocument();
      expect(screen.getByTestId('conversation-listing')).toBeInTheDocument();
    });
  });
});
