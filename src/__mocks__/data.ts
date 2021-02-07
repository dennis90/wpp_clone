import { Conversation, messageTypeAvailableActions,MessageTypes, User } from 'types/Conversation';
import { Citizenship, CivilStatus, FormType, Gender } from 'types/Forms';

type MockedUsers = 'johnDoe' | 'karen' | 'kyc';

export const users: Record<MockedUsers, User> = {
  johnDoe: {
    id: '100',
    name: 'John Doe',
    profilePicture: 'media/ball.jpg',
  },

  karen: {
    id: '200',
    name: 'Karen',
    profilePicture: 'media/beach.jpg',
  },

  kyc: {
    id: '300',
    name: 'KYC',
    profilePicture: 'media/butterfly.jpg',
  },
};

export const conversations: Conversation[] = [
  {
    id: '100',
    title: 'Vender para John Doe',
    image: 'media/astronaut.jpg',
    messages: [
      {
        actions: messageTypeAvailableActions[MessageTypes.ValidateDocuments],
        read: false,
        type: MessageTypes.ValidateDocuments,
        userId: users.kyc.id,
        when: new Date('2021-01-31T12:35:00.000Z').toISOString(),
      },
      {
        actions: messageTypeAvailableActions[MessageTypes.GreetingFromBuyer],
        read: true,
        form: {
          chat_id: '100',
          form: FormType.Registration,
          fullname: 'José da Silva',
          birth_date: new Date('1922-02-22'),
          mother_fullname: 'Joan Doe',
          father_fullname: 'John Doe Sr',
          birth_country: 'Brazil',
          birth_state: 'São Paulo',
          birth_city: 'São Paulo',
          citizenship: Citizenship.Brazilian,
          gender: Gender.Male,
          civil_status: CivilStatus.Single,
        },
        type: MessageTypes.Text,
        userId: users.karen.id,
        when: new Date('2021-01-31T12:30:00.000Z').toISOString(),
      },
    ],
    type: 'seller',
    users: [users.johnDoe, users.karen, users.kyc],
  },
  {
    id: '200',
    title: 'Comprar de Intersowa',
    image: 'media/airplane.jpg',
    messages: [
      {
        actions: messageTypeAvailableActions[MessageTypes.GreetingFromSeller],
        read: false,
        text: 'Olá\n\nMeu nome é Karen, eu sou o robô assitente de cadastro do Intersowa OTC.\n\nVamos dar início ao seu processo de cadastramento?',
        type: MessageTypes.GreetingFromSeller,
        userId: users.karen.id,
        when: new Date('2021-01-30T10:30:00.000Z').toISOString(),
      },
    ],
    type: 'buyer',
    users: [users.johnDoe, users.karen],
  }
];
