import { BuyerRegistration } from './Forms';
export interface User {
  id: string;
  name: string;
  profilePicture: string;
}

export enum ActionTypes {
  Approve = 'approve',
  BuyerInfo = 'buyer_info',
  Register = 'register',
  Reject = 'reject',
  SellerInfo = 'seller_info',
  SendFile = 'send_file',
  TakePhoto = 'send_photo',
  ValidateCredit = 'validate_credit',
  ValidateCriminalRecord = 'validate_criminal_record',
  ValidateDriversLicense = 'validate_drivers_license',
}

export enum MessageTypes {
  File = 'file',
  GreetingFromBuyer = 'buyer_greeting',
  GreetingFromSeller = 'seller_greeting',
  Text = 'text',
  ValidateDocuments = 'validate_documents',
}

export const messageTypeAvailableActions: Record<MessageTypes, ActionTypes[]> = {
  [MessageTypes.GreetingFromBuyer]: [ActionTypes.Approve, ActionTypes.Reject, ActionTypes.BuyerInfo],
  [MessageTypes.GreetingFromSeller]: [ActionTypes.Register, ActionTypes.SellerInfo],
  [MessageTypes.ValidateDocuments]: [
    ActionTypes.ValidateDriversLicense,
    ActionTypes.ValidateCredit,
    ActionTypes.ValidateCriminalRecord,
  ],
  [MessageTypes.File]: [],
  [MessageTypes.Text]: [],
};

export interface FileInfo {
  name: string;
  path: string;
  type: string;
}

export interface Message {
  actions: ActionTypes[];
  file?: FileInfo;
  form?: BuyerRegistration; // should pipe (|) with the types of any other added form
  read?: boolean;
  text?: string;
  type: MessageTypes;
  userId: string;
  when: string;
}

export interface Conversation {
  id: string;
  image: string;
  messages: Message[];
  title: string;
  type: 'buyer' | 'seller';
  users: User[];
}
