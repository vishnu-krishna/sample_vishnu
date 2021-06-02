export interface EnvironmentsList {
  environments: EnvironmentsEntity[];
}

export interface EnvironmentsEntity {
  envName: string;
  baseURI: string;
  path: string;
  users: UsersEntity[];
}

export interface UsersEntity {
  name: string;
  guid?: string;
  firstName: string;
  accounts: AccountsEntity[];
  email: string;
  password: string;
}

export interface AccountsEntity {
  number: number;
  numberFormatted: string;
  contracts: Contracts;
  addressFormatted: string;
}

export interface Contracts {
  gas: FuelEntity[];
  electricity: FuelEntity[];
}

export interface FuelEntity {
  number: number;
  fuelType: string;
  prepaidBalanceFormatted?: string;
  outstandingBill: OutstandingBill;
}

export interface OutstandingBill {
  amount: string;
  duedate: string;
}
