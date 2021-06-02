import { async } from '@angular/core/testing';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';

import { Now } from '../../../../../../../shared/service/now.service';
import { MauiFuelChipFuelContext } from '../../../../../../maui/fuelChip/fuelChip.component.enum';
import { MauiFuelChipFuelType } from '../../../../../../maui/fuelChip/index';
import { AccountViewModel, BillViewModel, ContractViewModel, IAccountServiceMA } from '../../../../../../services/account.service';
import { AccountMockService } from '../../../../../../services/mock/account.mock.service';
import { PaymentExtensionContractEligibility, PaymentExtensionIneligibilityReasons } from '../../../../../../services/paymentScheme/paymentExtensionEligibility.service';
import { FuelChipData } from '../fuelChipData';
import { IneligibleFuelChipFilterService } from './ineligibleFuelChipFilter.service';
import { Locale } from '../../../../../../../shared/globals/localisation';
import { AglCurrencyPipe } from '../../../../../../pipes/aglCurrency.pipe';

describe('Ineligible fuel chip filter service', () => {
    let sut: IneligibleFuelChipFilterService = null;
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
        sut = new IneligibleFuelChipFilterService(accountServiceStub, nowStub, currencyPipe);
        accountServiceStub.getAccounts = (): Observable<AccountViewModel[]> => Observable.of([
            new AccountViewModel('11', [
                createContract('111', 111.1, 11, new Date('2027-05-20'), true),
                createContract('222', 222.2, 22, new Date('2027-05-20')),
                createContract('333', 333.3, 33, new Date('2027-05-20')),
                createContract('444', 444.4, 44)
            ])
        ]);

        nowStub.date = (): moment.Moment => moment('2027-10-30');

        testData = [
            new FuelChipData('123', '111', MauiFuelChipFuelType.Electricity, null, new PaymentExtensionContractEligibility('111', false, PaymentExtensionIneligibilityReasons.AlreadyExtended, totalAmountDue), MauiFuelChipFuelContext.Bill),
            new FuelChipData('234', '222', MauiFuelChipFuelType.Gas, null, new PaymentExtensionContractEligibility('222', true, undefined, totalAmountDue), MauiFuelChipFuelContext.Bill),
            new FuelChipData('345', '333', MauiFuelChipFuelType.Gas, null, new PaymentExtensionContractEligibility('333', false, PaymentExtensionIneligibilityReasons.Unknown, totalAmountDue, new Date('2027-10-25')), MauiFuelChipFuelContext.Bill)
        ];
    });

    it('should include contract when isEligible is false', async(() => {
        sut.filter(testData).subscribe((results) => {
            expect(results.length).toBe(1);
            expect(results.some((result) => result.contractNumber === '333')).toBe(true);
        });
    }));

    it('should include contract when there is no issued bill with balance > 0 (error 016)', async(() => {
        testData = [
            new FuelChipData('123', '111', MauiFuelChipFuelType.Electricity, null, new PaymentExtensionContractEligibility('111', false, PaymentExtensionIneligibilityReasons.AlreadyExtended, totalAmountDue), MauiFuelChipFuelContext.Bill),
            new FuelChipData('234', '222', MauiFuelChipFuelType.Gas, null, new PaymentExtensionContractEligibility('222', true, undefined, totalAmountDue), MauiFuelChipFuelContext.Bill),
            new FuelChipData('345', '333', MauiFuelChipFuelType.Electricity, null, new PaymentExtensionContractEligibility('444', false, PaymentExtensionIneligibilityReasons.UnableToExtendOnline, totalAmountDue), MauiFuelChipFuelContext.Bill),
        ];
        sut.filter(testData).subscribe((results) => {
            expect(results.length).toBe(1);
            expect(results.some((result) => result.contractNumber === '333')).toBe(true);
        });
    }));

    it('should include contract when already extended but have no extended due date', async(() => {
        testData = [
            new FuelChipData('123', '111', MauiFuelChipFuelType.Electricity, null, new PaymentExtensionContractEligibility('111', false, PaymentExtensionIneligibilityReasons.AlreadyExtended, totalAmountDue), MauiFuelChipFuelContext.Bill),
            new FuelChipData('234', '222', MauiFuelChipFuelType.Gas, null, new PaymentExtensionContractEligibility('222', true, undefined, totalAmountDue), MauiFuelChipFuelContext.Bill),
            new FuelChipData('456', '444', MauiFuelChipFuelType.Electricity, null, new PaymentExtensionContractEligibility('444', false, PaymentExtensionIneligibilityReasons.AlreadyExtended, totalAmountDue), MauiFuelChipFuelContext.Bill),
        ];
        sut.filter(testData).subscribe((results) => {
            expect(results.length).toBe(1);
            expect(results.some((result) => result.contractNumber === '444')).toBe(true);
        });
    }));

    describe('Technical error', () => {
        beforeEach(() => {
            testData = [
                new FuelChipData('123', '111', MauiFuelChipFuelType.Electricity, null, new PaymentExtensionContractEligibility('111', false, PaymentExtensionIneligibilityReasons.TechnicalError), MauiFuelChipFuelContext.Bill),
            ];
        });

        it('should set primary message to empty string', async(() => {
            sut.filter(testData).subscribe((results) => {
                expect(results[0].statusMessage[0].primaryMessage).toBe('');
            });
        }));

        it('should set secondary message to undefined', async(() => {
            sut.filter(testData).subscribe((results) => {
                expect(results[0].statusMessage[0].secondaryMessage).toBeUndefined();
            });
        }));

        it('should set tertiary message to the reason why user is unable to extend (Payg)', async(() => {
            sut.filter(testData).subscribe((results) => {
                expect(results[0].tertiaryMessage).toBe(`You can't set up a payment extension at this time. Please call us to discuss your account.`);
            });
        }));
    });

    describe('Broken account', () => {
        beforeEach(() => {
            testData = [
                new FuelChipData('123', '111', MauiFuelChipFuelType.Electricity, null, new PaymentExtensionContractEligibility('111', false, PaymentExtensionIneligibilityReasons.BrokenAccount), MauiFuelChipFuelContext.Bill),
            ];
        });

        it('should set primary message to empty string', async(() => {
            sut.filter(testData).subscribe((results) => {
                expect(results[0].statusMessage[0].primaryMessage).toBe('Total to pay: $122.10');
            });
        }));

        it('should set secondary message to undefined', async(() => {
            sut.filter(testData).subscribe((results) => {
                expect(results[0].statusMessage[0].secondaryMessage).toBe('Overdue by 3 days');
            });
        }));

        it('should set tertiary message to the reason why user is unable to extend (Payg)', async(() => {
            sut.filter(testData).subscribe((results) => {
                expect(results[0].tertiaryMessage).toBe(`You can't set up a payment extension at this time. Please call us to discuss your account.`);
            });
        }));
    });

    describe('Unable to extend online', () => {

        it('should set primary message to total to pay', async(() => {
            sut.filter(testData).subscribe((results) => {
                expect(results[0].statusMessage[0].primaryMessage).toBe('Total to pay: $366.30');
            });
        }));

        it('should set secondary message to due date when not overdue', async(() => {
            nowStub.date = (): moment.Moment => moment('2027-10-22');

            sut.filter(testData).subscribe((results) => {
                expect(results[0].statusMessage[0].secondaryMessage).toBe('Due Wed 27 Oct 2027');
            });
        }));

        it('should set secondary message to overdue by 1 day when overdue', async(() => {
            nowStub.date = (): moment.Moment => moment('2027-10-28');

            sut.filter(testData).subscribe((results) => {
                expect(results[0].statusMessage[0].secondaryMessage).toBe('Overdue by 1 day');
            });
        }));

        it('should set secondary message to overdue by x days when overdue', async(() => {
            nowStub.date = (): moment.Moment => moment('2027-10-30');

            sut.filter(testData).subscribe((results) => {
                expect(results[0].statusMessage[0].secondaryMessage).toBe('Overdue by 3 days');
            });
        }));

        it('should set tertiary message to the reason why user is unable to extend', async(() => {
            sut.filter(testData).subscribe((results) => {
                expect(results[0].tertiaryMessage).toBe(`You can't set up a payment extension at this time. Please call us to discuss your account.`);
            });
        }));
    });

    describe('PAYG', () => {
        beforeEach(() => {
            testData = [
                new FuelChipData('123', '111', MauiFuelChipFuelType.Electricity, null, new PaymentExtensionContractEligibility('111', false, PaymentExtensionIneligibilityReasons.Payg), MauiFuelChipFuelContext.Bill),
            ];
        });

        it('should set primary message to empty string', async(() => {
            sut.filter(testData).subscribe((results) => {
                expect(results[0].statusMessage[0].primaryMessage).toBe('');
            });
        }));

        it('should set secondary message to undefined', async(() => {
            sut.filter(testData).subscribe((results) => {
                expect(results[0].statusMessage[0].secondaryMessage).toBeUndefined();
            });
        }));

        it('should set tertiary message to the reason why user is unable to extend (Payg)', async(() => {
            sut.filter(testData).subscribe((results) => {
                expect(results[0].tertiaryMessage).toBe(`You can't set up a payment extension because you're on AGL Prepaid.`);
            });
        }));
    });

    describe('Existing payment arrangement', () => {
        beforeEach(() => {
            testData = [
                new FuelChipData('123', '111', MauiFuelChipFuelType.Electricity, null, new PaymentExtensionContractEligibility('111', false, PaymentExtensionIneligibilityReasons.ExistingPaymentArrangement), MauiFuelChipFuelContext.Bill),
            ];
        });

        it('should set primary message to empty string', async(() => {
            sut.filter(testData).subscribe((results) => {
                expect(results[0].statusMessage[0].primaryMessage).toBe('');
            });
        }));

        it('should set secondary message to undefined', async(() => {
            sut.filter(testData).subscribe((results) => {
                expect(results[0].statusMessage[0].secondaryMessage).toBeUndefined();
            });
        }));

        it('should set tertiary message to the reason why user is unable to extend', async(() => {
            sut.filter(testData).subscribe((results) => {
                expect(results[0].tertiaryMessage).toBe(`You've got an existing payment arrangement set up. Please call us to discuss your options.`);
            });
        }));

    });
    function createContract(contractNumber: string, currentBalance: number, paymentOverdue: number, extendedDueDate?: Date, isSmartMeter: boolean = false): ContractViewModel {
        const contract = new ContractViewModel(contractNumber);
        contract.currentBalance = currentBalance;
        contract.paymentOverdue = paymentOverdue;
        contract.extendedDueDate = extendedDueDate;
        contract.isSmartMeter = isSmartMeter;
        contract.projectedBill = 255.5;
        contract.bills = [
            createBill()
        ];
        return contract;
    }

    function createBill(): BillViewModel {
        return new BillViewModel(50, 70, new Date('2027-10-19'), new Date('2027-10-27'), false, false, '', new Date('2027-08-10'), new Date('2027-10-10'));
    }
});
