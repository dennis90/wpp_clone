// Attention, the intent of this file is to mock the app request data
// this should be replaced with the data from an external API.

import { createContext } from 'react';

import { Conversation, MessageTypes, User } from 'types/Conversation';

export type SelectConversationHandler = (conversation?: Conversation) => void;

export interface ProviderData {
  conversations: Conversation[];
  selectedConversation?: Conversation;
  user: User;
  selectConversation: SelectConversationHandler;
}

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

export const initialData: ProviderData = {
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
          actions: [],
          type: MessageTypes.Text,
          when: new Date('2021-01-31T12:30:00.000Z'),
          text: 'Hello world',
          read: false,
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
          actions: [],
          type: MessageTypes.Text,
          when: new Date('2021-01-30T10:30:00.000Z'),
          text: 'Hello world 2',
          read: false,
        },
      ],
      type: 'buyer',
      users: [userJohnDoe, userKaren],
    }
  ],
};

export default createContext<ProviderData>(initialData);
