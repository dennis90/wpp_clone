import { Action } from 'redux';
import { useDispatch } from 'react-redux';

import { fireEvent, render, screen } from 'test-utils';
import AppMockProviders from '__mocks__/appProviders';

import SendPhotoComponent from './index';
import { ActionTypes } from 'types/Conversation';

jest.mock('react-redux', () => {
  const reactReduxModule = jest.requireActual('react-redux');

  return {
    ...reactReduxModule,
    useDispatch: jest.fn(),
  };
});

describe('SendPhoto component', () => {
  test('User take photo', () => {
    render(
      <AppMockProviders>
        <SendPhotoComponent />
      </AppMockProviders>,
    );

    const takePictureButton = screen.getByText('Tirar foto') as HTMLButtonElement;
    fireEvent.click(takePictureButton);
    expect(screen.getByAltText('Camera capture')).toBeInTheDocument();
  });

  test('User retake the photo', () => {
    render(
      <AppMockProviders>
        <SendPhotoComponent />
      </AppMockProviders>,
    );

    const takePictureButton = screen.getByText('Tirar foto') as HTMLButtonElement;
    fireEvent.click(takePictureButton);

    const retakePictureButton = screen.getByText('Tirar outra foto') as HTMLButtonElement;
    fireEvent.click(retakePictureButton);

    expect(screen.getByLabelText('Camera input')).toBeInTheDocument();
  });

  test('User pass the photo to another send component', () => {
    jest.useFakeTimers('modern').setSystemTime(new Date('2021-02-10').getTime());

    type DispatchedActionType = { payload: unknown } & Action;
    const dispatchList: DispatchedActionType[] = [];
    (useDispatch as jest.Mock).mockImplementation(() => (action: DispatchedActionType) => dispatchList.push(action));

    render(
      <AppMockProviders>
        <SendPhotoComponent />
      </AppMockProviders>,
    );

    const takePictureButton = screen.getByText('Tirar foto') as HTMLButtonElement;
    fireEvent.click(takePictureButton);
    expect(screen.getByAltText('Camera capture')).toBeInTheDocument();

    const sendMessageButton = screen.getByText('Enviar foto');
    fireEvent.click(sendMessageButton);

    expect(dispatchList).toHaveLength(1);

    expect(dispatchList[0].type).toEqual('actionPanel/setPanelInfo');
    expect(dispatchList[0].payload).toEqual({
      actionType: ActionTypes.SendFile,
      documentName: 'photo_2021-02-10T00:00:00.000Z.png',
      documentPath: 'image/png-data-url',
      documentType: 'image/png',
      initialMessage: '',
    });
  });
});
