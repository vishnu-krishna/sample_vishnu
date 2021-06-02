import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';

import { MauiFuelChipFuelType } from '../../../../../maui/fuelChip/';
import { MauiFuelChipFuelContext } from '../../../../../maui/fuelChip/fuelChip.component.enum';
import { Now } from '../../../../../../shared/service/now.service';
import { AccountMockService } from '../../../../../services/mock/account.mock.service';
import { IAccountServiceMA, AccountViewModel, ContractViewModel, BillViewModel } from '../../../../../services/account.service';
import { FuelChipDataModel } from '../../models';
import { PaymentExtensionContractEligibility, PaymentExtensionIneligibilityReasons } from '../../../../../services/paymentScheme/paymentExtensionEligibility.service';
import { IneligibleFuelChipFilterService } from './ineligibleFuelChipFilter.service';
import { Locale } from '../../../../../../shared/globals/localisation';
import { AglCurrencyPipe } from '../../../../../pipes/aglCurrency.pipe';
import { BillDescriptionService } from '../../../../../services/billDescription.service';
import { Mock } from 'ts-mocks/lib';
import { FeatureFlagService } from '../../../../../services/featureFlag.service';

describe('Ineligible fuel chip filter service - No open bills', () => {
    let sut: IneligibleFuelChipFilterService = null;
    let accountServiceStub: IAccountServiceMA = null;
    let nowStub: Now = null;
    let featureFlagMockService = new Mock<FeatureFlagService>();

    beforeEach(() => {
        accountServiceStub = new AccountMockService();
        nowStub = <Now> {
            date: (): moment.Moment => {
                throw new Error('Method not implemented.');
            }
        };
        let currencyPipe = new AglCurrencyPipe();
        const billDescriptionService = new BillDescriptionService(nowStub, featureFlagMockService.Object);
        sut = new IneligibleFuelChipFilterService(accountServiceStub, nowStub, currencyPipe, billDescriptionService);
    });

    let testData: FuelChipDataModel[];
    const totalAmountDue = 123.45;

    beforeEach(() => {
        accountServiceStub.getAccounts = (): Observable<AccountViewModel[]> => Observable.of([
            new AccountViewModel('11', [
                createContract('111', 111.1, 11, new Date('2027-05-20'), true, new Date('2027-10-25')),
                createContract('222', 222.2, 22, new Date('2027-05-20'), false, new Date('2027-10-25')),
                createContract('333', 333.3, 33, new Date('2027-05-20'), false, new Date('2027-10-21')),
                createContract('444', 444.4, 44, new Date('2027-05-20'), false, new Date('2027-10-25')),
                createContract('555', -200, 0, new Date('2027-10-25'), false, new Date('2027-10-25')),
                createContract('666', -666.6, 0, null, false, new Date('2017-10-25'))
            ])
        ]);

        nowStub.date = (): moment.Moment => moment('2027-10-20');

    });

    it('should include contract that has issued open bill (error 005)', ((done) => {

        testData = [
            new FuelChipDataModel('123', '111', MauiFuelChipFuelType.Electricity, null, new PaymentExtensionContractEligibility('111', false, PaymentExtensionIneligibilityReasons.AlreadyExtended, totalAmountDue), MauiFuelChipFuelContext.Bill),
            new FuelChipDataModel('234', '222', MauiFuelChipFuelType.Gas, null, new PaymentExtensionContractEligibility('222', true, undefined, totalAmountDue), MauiFuelChipFuelContext.Bill),
            new FuelChipDataModel('345', '333', MauiFuelChipFuelType.Gas, null, new PaymentExtensionContractEligibility('333', false, PaymentExtensionIneligibilityReasons.NoIssuedBill, totalAmountDue), MauiFuelChipFuelContext.Bill)
        ];

        sut.filter(testData).subscribe((results) => {
            expect(results.length).toBe(1);
            expect(results[0].contractNumber).toBe('333');
            done();
        });
    }));

    it('should include contract that has issued open bill with 0 balance (error 016)', ((done) => {
        testData = [
            new FuelChipDataModel('123', '111', MauiFuelChipFuelType.Electricity, null, new PaymentExtensionContractEligibility('111', false, PaymentExtensionIneligibilityReasons.AlreadyExtended, totalAmountDue), MauiFuelChipFuelContext.Bill),
            new FuelChipDataModel('234', '222', MauiFuelChipFuelType.Gas, null, new PaymentExtensionContractEligibility('222', true, undefined, totalAmountDue), MauiFuelChipFuelContext.Bill),
            new FuelChipDataModel('456', '444', MauiFuelChipFuelType.Gas, null, new PaymentExtensionContractEligibility('444', false, PaymentExtensionIneligibilityReasons.UnableToExtendOnlineOrNoIssuedBill, totalAmountDue), MauiFuelChipFuelContext.Bill)
        ];

        sut.filter(testData).subscribe((results) => {
            expect(results.length).toBe(1);
            expect(results[0].contractNumber).toBe('444');
            done();
        });
    }));

    it('should include contract that has negative balance (error 016)', ((done) => {
        testData = [
            new FuelChipDataModel('123', '111', MauiFuelChipFuelType.Electricity, null, new PaymentExtensionContractEligibility('111', false, PaymentExtensionIneligibilityReasons.AlreadyExtended, totalAmountDue), MauiFuelChipFuelContext.Bill),
            new FuelChipDataModel('234', '222', MauiFuelChipFuelType.Gas, null, new PaymentExtensionContractEligibility('222', true, undefined, totalAmountDue), MauiFuelChipFuelContext.Bill),
            new FuelChipDataModel('567', '555', MauiFuelChipFuelType.Gas, null, new PaymentExtensionContractEligibility('555', false, PaymentExtensionIneligibilityReasons.UnableToExtendOnlineOrNoIssuedBill, totalAmountDue), MauiFuelChipFuelContext.Bill)
        ];

        sut.filter(testData).subscribe((results) => {
            expect(results.length).toBe(1);
            expect(results[0].contractNumber).toBe('555');
            done();
        });
    }));

    describe('Negative balance', () => {
        beforeEach(() => {
            testData = [
                new FuelChipDataModel('567', '555', MauiFuelChipFuelType.Electricity, null,
                    new PaymentExtensionContractEligibility('111', false, PaymentExtensionIneligibilityReasons.UnableToExtendOnlineOrNoIssuedBill, 1, new Date('2027-10-25')), MauiFuelChipFuelContext.Bill)
            ];
        });

        it('should set primary message to account balance', ((done) => {
            sut.filter(testData).subscribe((results) => {
                expect(results[0].statusMessage[0].primaryMessage).toBe('Account balance: $200.00 CR');
                done();
            });
        }));

        it('should set secondary message to next bill issued in 6 days', ((done) => {
            sut.filter(testData).subscribe((results) => {
                expect(results[0].statusMessage[0].secondaryMessage).toBe('Next bill issued in 6 days');
                done();
            });
        }));

        it('should set tertiary message to the reason why user is unable to extend', ((done) => {
            sut.filter(testData).subscribe((results) => {
                expect(results[0].tertiaryMessage).toBe(`You can't set up payment assistance because your account balance is in credit.`);
                done();
            });
        }));
    });

    describe('Smart meter', () => {
        beforeEach(() => {
            testData = [
                new FuelChipDataModel('123', '111', MauiFuelChipFuelType.Electricity, null,
                    new PaymentExtensionContractEligibility('111', false, PaymentExtensionIneligibilityReasons.NoIssuedBill, 1, new Date('2027-10-25')), MauiFuelChipFuelContext.Bill)
            ];
        });

        it('should set primary message to projection', ((done) => {
            sut.filter(testData).subscribe((results) => {
                expect(results[0].statusMessage[0].primaryMessage).toBe('Total to pay: $122.10');
                done();
            });
        }));

        it('should set secondary message to next bill issued in x days', ((done) => {
            sut.filter(testData).subscribe((results) => {
                expect(results[0].statusMessage[0].secondaryMessage).toBe('Next bill issued in 7 days');
                done();
            });
        }));

        it('should set tertiary message to the reason why user is unable to extend', ((done) => {
            sut.filter(testData).subscribe((results) => {
                expect(results[0].tertiaryMessage).toBe(`You can't set up online payment assistance at this time.`);
                done();
            });
        }));

    });

    describe('Non smart meter', () => {
        beforeEach(() => {
            testData = [
                new FuelChipDataModel('345', '333', MauiFuelChipFuelType.Electricity, null,
                    new PaymentExtensionContractEligibility('333', false, PaymentExtensionIneligibilityReasons.NoIssuedBill, 1, new Date('2027-10-25')), MauiFuelChipFuelContext.Bill)
            ];
        });

        it('should set primary message to account balance', ((done) => {
            sut.filter(testData).subscribe((results) => {
                expect(results[0].statusMessage[0].primaryMessage).toBe('Total to pay: $366.30');
                done();
            });
        }));

        it('should set secondary message to next bill issued in 1 day', ((done) => {
            sut.filter(testData).subscribe((results) => {
                expect(results[0].statusMessage[0].secondaryMessage).toBe('Next bill issued in 7 days');
                done();
            });
        }));

        it('should set tertiary message to the reason why user is unable to extend', ((done) => {
            sut.filter(testData).subscribe((results) => {
                expect(results[0].tertiaryMessage).toBe(`You can't set up online payment assistance at this time.`);
                done();
            });
        }));

    });

    describe('contract that has issued open bill with balance > 10 (error 030)', (() => {

        beforeEach(() => {
            testData = [
                new FuelChipDataModel('123', '111', MauiFuelChipFuelType.Electricity, null, new PaymentExtensionContractEligibility('111', false, PaymentExtensionIneligibilityReasons.AlreadyExtended, totalAmountDue), MauiFuelChipFuelContext.Bill),
                new FuelChipDataModel('234', '222', MauiFuelChipFuelType.Gas, null, new PaymentExtensionContractEligibility('222', true, undefined, totalAmountDue), MauiFuelChipFuelContext.Bill),
                new FuelChipDataModel('345', '333', MauiFuelChipFuelType.Gas, null, new PaymentExtensionContractEligibility('333', false, PaymentExtensionIneligibilityReasons.UnableToExtendOnlineOrNoIssuedBill, totalAmountDue), MauiFuelChipFuelContext.Bill)
            ];
        });

        it('should set primary message to projection', ((done) => {
            sut.filter(testData).subscribe((results) => {
                expect(results[0].statusMessage[0].primaryMessage).toBe('Total to pay: $366.30');
                done();
            });
        }));

        it('should set secondary message to due x days', ((done) => {
            sut.filter(testData).subscribe((results) => {
                expect(results[0].statusMessage[0].secondaryMessage).toBe('Due 7 days');
                done();
            });
        }));

        it('should set tertiary message to the reason why user is unable to extend', ((done) => {
            sut.filter(testData).subscribe((results) => {
                expect(results[0].tertiaryMessage).toBe(`You can't set up online payment assistance at this time.`);
                done();
            });
        }));

    }));

    describe('contract has issued open bill with balance > 0 and currentBillEndDate is over 2 days ago', () => {

            beforeEach(() => {
                testData = [
                    new FuelChipDataModel('678', '666', MauiFuelChipFuelType.Gas, null, new PaymentExtensionContractEligibility('333', false, PaymentExtensionIneligibilityReasons.UnableToExtendOnlineOrNoIssuedBill, totalAmountDue), MauiFuelChipFuelContext.Bill)
                ];
            });

            it(`should show a secondary message should be set to empty string`, ((done) => {
                sut.filter(testData).subscribe((results) => {
                    expect(results[0].statusMessage[0].secondaryMessage).toBe('');
                    done();
                });
            }));
    });

    describe('contract that has issued open bill with balance > 10 (error 030)', (() => {

        beforeEach(() => {
            testData = [
                new FuelChipDataModel('123', '111', MauiFuelChipFuelType.Electricity, null, new PaymentExtensionContractEligibility('111', false, PaymentExtensionIneligibilityReasons.AlreadyExtended, totalAmountDue), MauiFuelChipFuelContext.Bill),
                new FuelChipDataModel('234', '222', MauiFuelChipFuelType.Gas, null, new PaymentExtensionContractEligibility('222', true, undefined, totalAmountDue), MauiFuelChipFuelContext.Bill),
                new FuelChipDataModel('345', '333', MauiFuelChipFuelType.Gas, null, new PaymentExtensionContractEligibility('333', false, PaymentExtensionIneligibilityReasons.UnableToExtendOnlineOrNoIssuedBill, totalAmountDue), MauiFuelChipFuelContext.Bill)
            ];
        });

        it('should set primary message to projection', ((done) => {
            sut.filter(testData).subscribe((results) => {
                expect(results[0].statusMessage[0].primaryMessage).toBe('Total to pay: $366.30');
                done();
            });
        }));

        it('should set secondary message to due x days', ((done) => {
            sut.filter(testData).subscribe((results) => {
                expect(results[0].statusMessage[0].secondaryMessage).toBe('Due 7 days');
                done();
            });
        }));

        it('should set tertiary message to the reason why user is unable to extend', ((done) => {
            sut.filter(testData).subscribe((results) => {
                expect(results[0].tertiaryMessage).toBe(`You can't set up online payment assistance at this time.`);
                done();
            });
        }));

    }));

    function createContract(contractNumber: string, currentBalance: number, paymentOverdue: number, extendedDueDate?: Date, isSmartMeter: boolean = false, currentBillEndDate?: Date): ContractViewModel {
        const contract = new ContractViewModel(contractNumber);
        contract.currentBalance = currentBalance;
        contract.paymentOverdue = paymentOverdue;
        contract.extendedDueDate = extendedDueDate;
        contract.isSmartMeter = isSmartMeter;
        contract.projectedBill = 255.5;
        contract.bills = [
            createBill()
        ];
        contract.currentBillEndDate = currentBillEndDate;
        return contract;
    }

    function createBill(): BillViewModel {
        return new BillViewModel(50, 70, new Date('2027-10-19'), new Date('2027-10-27'), false, false, '', new Date('2027-08-10'), new Date('2027-10-10'));
    }
});
