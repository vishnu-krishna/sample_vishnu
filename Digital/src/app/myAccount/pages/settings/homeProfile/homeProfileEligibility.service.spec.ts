import { ContractViewModel, AccountViewModel } from '../../../services/account.service';
import { HomeProfileEligibilityService } from './homeProfileEligibility.service';

describe('isEligibleForHomeProfile tests', () => {
    let sut: HomeProfileEligibilityService = null;

    beforeEach(() => {
        sut = new HomeProfileEligibilityService();
    });

    it('should return true when multiple eligible accounts', () => {
        const accounts: AccountViewModel[] = [
            new AccountViewModel('100', [new ContractViewModel('900'), new ContractViewModel('901')]),
            new AccountViewModel('101', [new ContractViewModel('902'), new ContractViewModel('903')])
        ];
        accounts[0].groupedAddress = '699 Bourke St, Melbourne VIC 3000';
        accounts[1].groupedAddress = '700 Bourke St, Melbourne VIC 3000';

        let isEligibleForHomeProfile = sut.isEligibleForHomeProfile(accounts);
        expect(isEligibleForHomeProfile).toBe(true);
    });

    it('should return true for single account with two contracts and a group address', () => {
        const accounts: AccountViewModel[] = [
            new AccountViewModel('111', [new ContractViewModel('998'), new ContractViewModel('999')])
        ];
        accounts[0].groupedAddress = '43 Elizabeth St, Melbourne VIC 3000';

        let isEligibleForHomeProfile = sut.isEligibleForHomeProfile(accounts);
        expect(isEligibleForHomeProfile).toBe(true);
    });

    it('should return true for single account with single contract', () => {
        const contract = new ContractViewModel('321');
        contract.address = '21 Bumpy Road';

        const accounts: AccountViewModel[] = [new AccountViewModel('111', [ contract ])];
        accounts[0].groupedAddress = null;

        let isEligibleForHomeProfile = sut.isEligibleForHomeProfile(accounts);
        expect(isEligibleForHomeProfile).toBe(true);
    });

    it('should return false account without any addresses', () => {
        const contract = new ContractViewModel('321');
        contract.address = null;

        const accounts: AccountViewModel[] = [new AccountViewModel('111', [ contract ])];
        accounts[0].groupedAddress = null;

        let isEligibleForHomeProfile = sut.isEligibleForHomeProfile(accounts);
        expect(isEligibleForHomeProfile).toBe(false);
    });
});
