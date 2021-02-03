import { ProviderValue } from 'data/dataContext';
import { messageTypeAvailableActions,MessageTypes, User } from 'types/Conversation';

const userJohnDoe: User = {
  id: '100',
  name: 'John Doe',
  profilePicture: 'media/ball.jpg',
};

const userKaren: User = {
  id: '200',
  name: 'Karen',
  profilePicture: 'media/beach.jpg',
};

const userKYC: User = {
  id: '300',
  name: 'KYC',
  profilePicture: 'media/butterfly.jpg',
};

export const initialData: ProviderValue = {
  user: userJohnDoe,
  selectConversation: () => ({}),
  conversations: [
    {
      id: '100',
      title: 'Vender para John Doe',
      image: 'media/astronaut.jpg',
      messages: [
        {
          userId: userKYC.id,
          actions: messageTypeAvailableActions[MessageTypes.ValidateDocuments],
          type: MessageTypes.ValidateDocuments,
          read: false,
          when: new Date('2021-01-31T12:35:00.000Z'),
        },
        {
          userId: userKaren.id,
          actions: messageTypeAvailableActions[MessageTypes.GreetingFromBuyer],
          type: MessageTypes.Text,
          when: new Date('2021-01-31T12:30:00.000Z'),
          text: 'Houve um novo cadastro de Pessoa Física\n\nDados do formulário:\nNome:\t\t| José da Silva\nData de nascimento:\t\t| 22/02/1922\nCPF:\t\t | 022.332.556-65\nEndereço:\t\tRua das flores, 1022 - São Paulo, SP',
          read: true,
        },
      ],
      type: 'seller',
      users: [userJohnDoe, userKaren, userKYC],
    },
    {
      id: '200',
      title: 'Comprar de Intersowa',
      image: 'media/airplane.jpg',
      messages: [
        {
          userId: userKaren.id,
          actions: messageTypeAvailableActions[MessageTypes.GreetingFromSeller],
          type: MessageTypes.GreetingFromSeller,
          when: new Date('2021-01-30T10:30:00.000Z'),
          text: 'Olá\n\nMeu nome é Karen, eu sou o robô assitente de cadastro do Intersowa OTC.\n\nVamos dar início ao seu processo de cadastramento?',
          read: false,
        },
      ],
      type: 'buyer',
      users: [userJohnDoe, userKaren],
    }
  ],
};
