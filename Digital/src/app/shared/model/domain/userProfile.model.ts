import { ContractAccountModel } from './contractAccount.model';

export interface UserProfileModel {
    displayName: string;
    defaultContractAccountId: string;
    contractAccounts: ContractAccountModel[];
    numberOfContractAccounts: number;
    hasAeoProfile: boolean;
    isVerifyAuthentication: boolean;
    isLoginAuthentication: boolean;
    isError: boolean;
    providerWhichErrored?: any;
    errorMessage?: any;
    hasRestrictedAccess: boolean;
}
