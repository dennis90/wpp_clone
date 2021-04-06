import { fireEvent, render, screen } from '@testing-library/react';

import AppProviders from '__mocks__/appProviders';
import MessageExtraField from './index';

describe('MessageExtraField Component', () => {
  it('render provided title', () => {
    const providedTitle = 'Component title';
    render(
      <AppProviders>
        <MessageExtraField title={providedTitle} onCancel={jest.fn()} />
      </AppProviders>,
    );
    expect(screen.getByText(providedTitle)).toBeInTheDocument();
  });

  it('call `onCancel` callback after close icon click', () => {
    const cancelFn = jest.fn();
    render(
      <AppProviders>
        <MessageExtraField title="title" onCancel={cancelFn} />
      </AppProviders>,
    );
    const closeButton = screen.getByLabelText('close button');
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);

    expect(cancelFn).toBeCalled();
  });

  it('render provided children', () => {
    render(
      <AppProviders>
        <MessageExtraField title="" onCancel={jest.fn()}>
          Provided children
        </MessageExtraField>
      </AppProviders>,
    );

    expect(screen.getByText('Provided children')).toBeInTheDocument();
  });
});
