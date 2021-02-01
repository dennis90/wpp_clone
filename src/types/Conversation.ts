export interface User {
  id: string;
  name: string;
  profilePicture: string;
}

export enum ActionTypes {
  Approve = 'approve',
  Reject = 'reject',
  BuyerInfo = 'buyer_info',
  SellerInfo = 'seller_info',
  Register = 'register',
  ValidateDriversLicense = 'validate_drivers_license',
  ValidateCredit = 'validate_credit',
  ValidateCriminalRecord = 'validate_criminal_record',
}

export enum MessageTypes {
  GreetingFromBuyer = 'buyer_greeting',
  MediaAudio = 'media_audio',
  MediaImage = 'media_image',
  MediaUnknown = 'media_unknown',
  GreetingFromSeller = 'seller_greeting',
  Text = 'text',
  ValidateDocuments = 'validate_documents',
}

export const messageTypeAvailableActions: Record<MessageTypes, ActionTypes[]> = {
  [MessageTypes.GreetingFromBuyer]: [ActionTypes.Approve, ActionTypes.Reject, ActionTypes.BuyerInfo],
  [MessageTypes.GreetingFromSeller]: [ActionTypes.Register, ActionTypes.SellerInfo],
  [MessageTypes.ValidateDocuments]: [
    ActionTypes.ValidateDriversLicense, ActionTypes.ValidateCredit, ActionTypes.ValidateCriminalRecord
  ],
  [MessageTypes.MediaAudio]: [],
  [MessageTypes.MediaImage]: [],
  [MessageTypes.MediaUnknown]: [],
  [MessageTypes.Text]: [],
};

export interface Message {
  actions: ActionTypes[];
  media?: Blob;
  read?: boolean;
  text?: string;
  type: MessageTypes;
  userId: string;
  when: Date;
}

export interface Conversation {
  id: string;
  image: string;
  messages: Message[];
  title: string;
  type: 'buyer' | 'seller';
  users: User[];
}
