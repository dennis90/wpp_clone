export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum CivilStatus {
  Divorced = 'divorced',
  Married = 'married',
  Separated = 'separated',
  Single = 'single',
  Widowed = 'widowed',
}

export enum Citizenship {
  Brazilian = 'brazilian',
  Other = 'other',
}

export enum FormType {
  Registration = 'fazer_meu_cadastro',
}

export const formTypeGreeting: Record<FormType, string> = {
  [FormType.Registration]: 'Houve um novo cadastro de Pessoa Física\n\nDados do formulário:\n',
};

export interface BuyerRegistration {
  form: FormType;
  chat_id: string;
  citizenship: Citizenship;
  fullname: string;
  birth_date: Date;
  gender: Gender;
  civil_status: CivilStatus;
  mother_fullname: string;
  father_fullname: string;
  birth_country: string;
  birth_state: string;
  birth_city: string;
}
