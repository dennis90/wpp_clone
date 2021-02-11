import { useDispatch } from 'react-redux';
import { waitFor } from '@testing-library/dom';
import { Action } from 'redux';

import AppProviders from '__mocks__/appProviders';
import { users } from '__mocks__/data';
import { getByText, render, screen, fireEvent } from 'test-utils';
import { Message } from 'types/Conversation';
import BuyerRegistration from './index';

jest.mock('react-redux', () => {
  const reactReduxModule = jest.requireActual('react-redux');

  return {
    ...reactReduxModule,
    useDispatch: jest.fn(),
  };
});

describe('BuyersRegistration Component', () => {
  test('form filled and submit', async () => {
    type DispatchedActionType = { payload: unknown } & Action;
    const dispatchList: DispatchedActionType[] = [];
    (useDispatch as jest.Mock).mockImplementation(() => (action: DispatchedActionType) => dispatchList.push(action));

    render(
      <AppProviders>
        <BuyerRegistration />
      </AppProviders>,
      {
        initialState: {
          conversations: {
            conversations: [],
            selectedConversationId: '1001',
          },
          session: {
            user: users.johnDoe,
          },
        },
      },
    );

    const citizenship = screen.getByRole('button', { name: 'Nacionalidade ​' });
    fireEvent.mouseDown(citizenship);
    const citizenshipOption = screen.getByRole('option', { name: 'Brasileira' });
    citizenshipOption.click();
    getByText(citizenship, 'Brasileira');
    expect(getByText(citizenship, 'Brasileira')).toBeInTheDocument();

    const fullname = screen.getByRole('textbox', { name: 'Nome completo' }) as HTMLInputElement;
    fireEvent.change(fullname, { target: { value: 'John Doe' } });
    expect(fullname.value).toBe('John Doe');

    const birthDate = screen.getByLabelText('Data de Nascimento') as HTMLInputElement;
    fireEvent.change(birthDate, { target: { value: '09/12/1999' } });
    expect(birthDate.value).toBe('09/12/1999');

    const gender = screen.getByRole('button', { name: 'Gênero ​' });
    fireEvent.mouseDown(gender);
    const genderOption = screen.getByRole('option', { name: 'Feminino' });
    genderOption.click();
    expect(getByText(gender, 'Feminino')).toBeInTheDocument();

    const civilStatus = screen.getByRole('button', { name: 'Estado civil ​' });
    fireEvent.mouseDown(civilStatus);
    const civilStatusOption = screen.getByRole('option', { name: 'Casado' });
    civilStatusOption.click();
    expect(getByText(civilStatus, 'Casado')).toBeInTheDocument();

    const mother_fullname = screen.getByRole('textbox', { name: 'Nome da mãe' }) as HTMLInputElement;
    fireEvent.change(mother_fullname, { target: { value: 'Joan Doe' } });
    expect(mother_fullname.value).toBe('Joan Doe');

    const father_fullname = screen.getByRole('textbox', { name: 'Nome do pai' }) as HTMLInputElement;
    fireEvent.change(father_fullname, { target: { value: 'John Doe Sr' } });
    expect(father_fullname.value).toBe('John Doe Sr');

    const birth_country = screen.getByRole('textbox', { name: 'Local de nascimento' }) as HTMLInputElement;
    fireEvent.change(birth_country, { target: { value: 'Brazil' } });
    expect(birth_country.value).toBe('Brazil');

    const birth_state = screen.getByRole('textbox', { name: 'Estado' }) as HTMLInputElement;
    fireEvent.change(birth_state, { target: { value: 'São Paulo' } });
    expect(birth_state.value).toBe('São Paulo');

    const birth_city = screen.getByRole('textbox', { name: 'Cidade' }) as HTMLInputElement;
    fireEvent.change(birth_city, { target: { value: 'São Paulo' } });
    expect(birth_city.value).toBe('São Paulo');

    await waitFor(() => fireEvent.click(screen.getByRole('button', { name: /salvar/i })));

    expect(dispatchList).toHaveLength(2);

    expect(dispatchList[0].type).toBe('conversations/sendMessage');

    const { when: _, ...messagePayload } = dispatchList[0].payload as Message;

    expect(messagePayload).toEqual({
      actions: [],
      form: {
        birth_city: 'São Paulo',
        birth_country: 'Brazil',
        birth_date: '09/12/1999',
        birth_state: 'São Paulo',
        chat_id: '1001',
        citizenship: 'brazilian',
        civil_status: 'married',
        father_fullname: 'John Doe Sr',
        form: 'fazer_meu_cadastro',
        fullname: 'John Doe',
        gender: 'female',
        mother_fullname: 'Joan Doe',
      },
      read: true,
      type: 'buyer_greeting',
      userId: '100',
    });

    expect(dispatchList[1].type).toBe('actionPanel/setPanelInfo');
    expect(dispatchList[1].payload).toEqual(undefined);
  });
});
