import { Conversation, messageTypeAvailableActions, MessageTypes, Profile } from 'types/Conversation';
import { Citizenship, CivilStatus, FormType, Gender } from 'types/Forms';

type MockedUsers = 'johnDoe' | 'karen' | 'kyc';

export const users: Record<MockedUsers, Profile> = {
  johnDoe: {
    uid: '100',
    name: 'John Doe',
    photo: 'media/ball.jpg',
  },

  karen: {
    uid: '200',
    name: 'Karen',
    photo: 'media/beach.jpg',
  },

  kyc: {
    uid: '300',
    name: 'KYC',
    photo: 'media/butterfly.jpg',
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
        userId: users.kyc.uid,
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
        userId: users.karen.uid,
      },
    ],
    users: [users.johnDoe, users.karen, users.kyc],
  },
  {
    id: '200',
    title: 'Buy from company',
    image: 'media/airplane.jpg',
    messages: [
      {
        actions: messageTypeAvailableActions[MessageTypes.GreetingFromSeller],
        read: false,
        text: 'Greeting message',
        type: MessageTypes.GreetingFromSeller,
        userId: users.karen.uid,
      },
    ],
    users: [users.johnDoe, users.karen],
  },
];
