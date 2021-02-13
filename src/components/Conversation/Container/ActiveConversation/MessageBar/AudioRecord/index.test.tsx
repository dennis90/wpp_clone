import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';

import AudioRecord from './index';

describe('AudioRecord component', () => {
  test('Click send audio button', async () => {
    const startFn = jest.fn();

    Object.defineProperty(global, 'MediaRecorder', {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        start: startFn,
        stop: jest.fn(),
        state: 'inactive',
        addEventListener: jest.fn(),
      })),
    });

    render(<AudioRecord onAudioRecorded={jest.fn()} />);
    const recordAudioButton = screen.getByLabelText('Record audio') as HTMLButtonElement;
    act(() => {
      fireEvent.click(recordAudioButton);
    });

    expect(screen.getByLabelText('Record audio loading')).toBeInTheDocument();
    await waitFor(() => expect(startFn).toBeCalled());
  });

  test('Click cancel button', async () => {
    const startFn = jest.fn().mockImplementation(() => {
      if (events.dataavailable) {
        events.dataavailable({ data: new Blob(['some-value']) });
      }
    });

    global.URL.createObjectURL = jest.fn().mockImplementation(() => 'http://localhost/recorded-audio');

    type EventAttribute = { data: Blob };

    type CallbackFnType = (val?: EventAttribute) => void;

    const events: Record<string, CallbackFnType> = {};

    Object.defineProperty(global, 'MediaRecorder', {
      writable: true,
      value: jest.fn().mockImplementation((stream: MediaStream) => ({
        stream,
        start: startFn,
        stop: jest.fn().mockImplementation(() => {
          if (events.stop) {
            events.stop();
          }
        }),
        state: 'recording',
        addEventListener: (event: string, callback: CallbackFnType) => {
          events[event] = callback;
        },
      })),
    });

    const messageSentHandler = jest.fn();
    render(<AudioRecord onAudioRecorded={messageSentHandler} />);

    const recordAudioButton = screen.getByLabelText('Record audio') as HTMLButtonElement;
    act(() => {
      fireEvent.click(recordAudioButton);
    });

    const cancelButton = await screen.findByLabelText('Cancel audio record');

    fireEvent.click(cancelButton);

    expect(messageSentHandler).not.toBeCalled();
  });

  test('Click Send audio button', async () => {
    const startFn = jest.fn().mockImplementation(() => {
      if (events.dataavailable) {
        events.dataavailable({ data: new Blob(['some-value']) });
      }
    });

    global.URL.createObjectURL = jest.fn().mockImplementation(() => 'http://localhost/recorded-audio');

    type EventAttribute = { data: Blob };

    type CallbackFnType = (val?: EventAttribute) => void;

    const events: Record<string, CallbackFnType> = {};

    Object.defineProperty(global, 'MediaRecorder', {
      writable: true,
      value: jest.fn().mockImplementation((stream: MediaStream) => ({
        stream,
        start: startFn,
        stop: jest.fn().mockImplementation(() => {
          if (events.stop) {
            events.stop();
          }
        }),
        state: 'recording',
        addEventListener: (event: string, callback: CallbackFnType) => {
          events[event] = callback;
        },
      })),
    });

    const messageSentHandler = jest.fn();
    render(<AudioRecord onAudioRecorded={messageSentHandler} />);

    const recordAudioButton = screen.getByLabelText('Record audio') as HTMLButtonElement;
    act(() => {
      fireEvent.click(recordAudioButton);
    });

    const sendAudioButton = await screen.findByLabelText('Send recorded audio');

    act(() => {
      fireEvent.click(sendAudioButton);
    });

    await waitFor(() => expect(messageSentHandler).toBeCalledWith('http://localhost/recorded-audio'));
  });
});
