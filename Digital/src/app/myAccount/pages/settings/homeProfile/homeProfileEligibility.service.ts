import { ContractViewModel, AccountViewModel } from '../../../services/account.service';

export class HomeProfileEligibilityService {

    public isEligibleForHomeProfile(accounts: AccountViewModel[]): boolean {
        let validAccounts = accounts.filter((account) => !!account.groupedAddress || account.contracts.some((contract) => !!contract.address));
        return validAccounts.length > 0;
    }
 }
