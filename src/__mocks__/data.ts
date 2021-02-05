import { Conversation, messageTypeAvailableActions,MessageTypes, User } from 'types/Conversation';

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
        userId: users.kyc.id,
        actions: messageTypeAvailableActions[MessageTypes.ValidateDocuments],
        type: MessageTypes.ValidateDocuments,
        read: false,
        when: new Date('2021-01-31T12:35:00.000Z'),
      },
      {
        userId: users.karen.id,
        actions: messageTypeAvailableActions[MessageTypes.GreetingFromBuyer],
        type: MessageTypes.Text,
        when: new Date('2021-01-31T12:30:00.000Z'),
        text: 'Houve um novo cadastro de Pessoa Física\n\nDados do formulário:\nNome:\t\t| José da Silva\nData de nascimento:\t\t| 22/02/1922\nCPF:\t\t | 022.332.556-65\nEndereço:\t\tRua das flores, 1022 - São Paulo, SP',
        read: true,
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
        userId: users.karen.id,
        actions: messageTypeAvailableActions[MessageTypes.GreetingFromSeller],
        type: MessageTypes.GreetingFromSeller,
        when: new Date('2021-01-30T10:30:00.000Z'),
        text: 'Olá\n\nMeu nome é Karen, eu sou o robô assitente de cadastro do Intersowa OTC.\n\nVamos dar início ao seu processo de cadastramento?',
        read: false,
      },
    ],
    type: 'buyer',
    users: [users.johnDoe, users.karen],
  }
];
