import { async } from '@angular/core/testing';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';

import { Now } from '../../../../../../../shared/service/now.service';
import { MauiFuelChipFuelContext } from '../../../../../../maui/fuelChip/fuelChip.component.enum';
import { MauiFuelChipFuelType } from '../../../../../../maui/fuelChip/index';
import { AccountViewModel, ContractViewModel, IAccountServiceMA } from '../../../../../../services/account.service';
import { AccountMockService } from '../../../../../../services/mock/account.mock.service';
import { PaymentExtensionContractEligibility, PaymentExtensionIneligibilityReasons } from '../../../../../../services/paymentScheme/paymentExtensionEligibility.service';
import { FuelChipData } from '../fuelChipData';
import { AlreadyExtendedFuelChipFilterService } from './alreadyExtendedFuelChipFilter.service';
import { Locale } from '../../../../../../../shared/globals/localisation';
import { AglCurrencyPipe } from '../../../../../../pipes/aglCurrency.pipe';

describe('Already extended fuel chip filter service', () => {
    let sut: AlreadyExtendedFuelChipFilterService = null;
    let accountServiceStub: IAccountServiceMA = null;
    let nowStub: Now = null;

    let testData: FuelChipData[];
    const totalAmountDue = 123.45;

    beforeEach(() => {
        accountServiceStub = new AccountMockService();
        nowStub = <Now> {
            date: (): moment.Moment => {
                throw new Error('Method not implemented.');
            }
        };
        let currencyPipe = new AglCurrencyPipe();
        sut = new AlreadyExtendedFuelChipFilterService(accountServiceStub, nowStub, currencyPipe);

        accountServiceStub.getAccounts = (): Observable<AccountViewModel[]> => Observable.of([
            new AccountViewModel('11', [
                createContract('111', 111.1, 10, new Date('2027-05-20'), true),
                createContract('222', 222.2, 20,  new Date('2027-05-20')),
                createContract('333', 333.3, 30, new Date('2027-05-20')),
                createContract('444', 444.4, 40),
            ])
        ]);

        nowStub.date = (): moment.Moment => moment('2027-10-20');

        testData = [
            new FuelChipData('123', '111', MauiFuelChipFuelType.Electricity, null, new PaymentExtensionContractEligibility('111', false, PaymentExtensionIneligibilityReasons.None, totalAmountDue), MauiFuelChipFuelContext.Bill),
            new FuelChipData('234', '222', MauiFuelChipFuelType.Gas, null, new PaymentExtensionContractEligibility('222', true, undefined, totalAmountDue), MauiFuelChipFuelContext.Bill),
            new FuelChipData('345', '333', MauiFuelChipFuelType.Gas, null, new PaymentExtensionContractEligibility('333', false, PaymentExtensionIneligibilityReasons.AlreadyExtended, totalAmountDue), MauiFuelChipFuelContext.Bill),
            new FuelChipData('456', '444', MauiFuelChipFuelType.Electricity, null, new PaymentExtensionContractEligibility('444', false, PaymentExtensionIneligibilityReasons.AlreadyExtended, totalAmountDue), MauiFuelChipFuelContext.Bill)
        ];
    });

    it('should include contract that is already extended', async(() => {
        sut.filter(testData).subscribe((results) => {
            expect(results.length).toBe(1);
        });
    }));

    it('should set primary status message to total to pay with formatted amount', async(() => {
        sut.filter(testData).subscribe((results) => {
            expect(results[0].statusMessage[0].primaryMessage).toBe('Total to pay: $363.30');
        });
    }));

    it('should set secondary status message to extended due date', async(() => {
        sut.filter(testData).subscribe((results) => {
            expect(results[0].statusMessage[0].secondaryMessage).toBe('Extended to Thu 20 May 2027');
        });
    }));

    function createContract(contractNumber: string, currentBalance: number, paymentOverdue: number, extendedDueDate?: Date, isSmartMeter: boolean = false): ContractViewModel {
        const contract = new ContractViewModel(contractNumber);
        contract.currentBalance = currentBalance;
        contract.paymentOverdue = paymentOverdue;
        contract.extendedDueDate = extendedDueDate;
        contract.isSmartMeter = isSmartMeter;
        contract.projectedBill = 255.5;
        return contract;
    }
});
