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
import { NoIssuedBillFuelChipFilterService } from './noIssuedBillFuelChipFilter.service';
import { Locale } from '../../../../../../../shared/globals/localisation';
import { AglCurrencyPipe } from '../../../../../../pipes/aglCurrency.pipe';
import { BillDescriptionService } from '../../../../../../services/billDescription.service';
import { Mock } from 'ts-mocks/lib';
import { FeatureFlagService } from '../../../../../../services/featureFlag.service';

describe('No issued bill fuel chip filter service', () => {
    let sut: NoIssuedBillFuelChipFilterService = null;
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
        sut = new NoIssuedBillFuelChipFilterService(accountServiceStub, nowStub, currencyPipe, billDescriptionService);
    });

    let testData: FuelChipData[];
    const totalAmountDue = 123.45;

    beforeEach(() => {
        accountServiceStub.getAccounts = (): Observable<AccountViewModel[]> => Observable.of([
            new AccountViewModel('11', [
                createContract('111', 111.1, new Date('2027-10-25'), true),
                createContract('222', 222.2, new Date('2027-10-25')),
                createContract('333', 333.3, new Date('2027-10-21')),
                createContract('444', 0, new Date('2027-10-25')),
                createContract('555', -200, new Date('2027-10-25'))
            ])
        ]);

        nowStub.date = (): moment.Moment => moment('2027-10-20');

        testData = [
            new FuelChipData('123', '111', MauiFuelChipFuelType.Electricity, null, new PaymentExtensionContractEligibility('111', false, PaymentExtensionIneligibilityReasons.AlreadyExtended, totalAmountDue), MauiFuelChipFuelContext.Bill),
            new FuelChipData('234', '222', MauiFuelChipFuelType.Gas, null, new PaymentExtensionContractEligibility('222', true, undefined, totalAmountDue), MauiFuelChipFuelContext.Bill),
            new FuelChipData('345', '333', MauiFuelChipFuelType.Gas, null, new PaymentExtensionContractEligibility('333', false, PaymentExtensionIneligibilityReasons.NoIssuedBill, totalAmountDue), MauiFuelChipFuelContext.Bill)
        ];
    });

    it('should include contract that has issued open bill (error 005)', async(() => {
        sut.filter(testData).subscribe((results) => {
            expect(results.length).toBe(1);
            expect(results[0].contractNumber).toBe('333');
        });
    }));

    it('should include contract that has issued open bill with 0 balance (error 016)', async(() => {
        testData = [
            new FuelChipData('123', '111', MauiFuelChipFuelType.Electricity, null, new PaymentExtensionContractEligibility('111', false, PaymentExtensionIneligibilityReasons.AlreadyExtended, totalAmountDue), MauiFuelChipFuelContext.Bill),
            new FuelChipData('234', '222', MauiFuelChipFuelType.Gas, null, new PaymentExtensionContractEligibility('222', true, undefined, totalAmountDue), MauiFuelChipFuelContext.Bill),
            new FuelChipData('456', '444', MauiFuelChipFuelType.Gas, null, new PaymentExtensionContractEligibility('444', false, PaymentExtensionIneligibilityReasons.UnableToExtendOnlineOrNoIssuedBill, totalAmountDue), MauiFuelChipFuelContext.Bill)
        ];

        sut.filter(testData).subscribe((results) => {
            expect(results.length).toBe(1);
            expect(results[0].contractNumber).toBe('444');
        });
    }));

    it('should include contract that has negative balance (error 016)', async(() => {
        testData = [
            new FuelChipData('123', '111', MauiFuelChipFuelType.Electricity, null, new PaymentExtensionContractEligibility('111', false, PaymentExtensionIneligibilityReasons.AlreadyExtended, totalAmountDue), MauiFuelChipFuelContext.Bill),
            new FuelChipData('234', '222', MauiFuelChipFuelType.Gas, null, new PaymentExtensionContractEligibility('222', true, undefined, totalAmountDue), MauiFuelChipFuelContext.Bill),
            new FuelChipData('567', '555', MauiFuelChipFuelType.Gas, null, new PaymentExtensionContractEligibility('555', false, PaymentExtensionIneligibilityReasons.UnableToExtendOnlineOrNoIssuedBill, totalAmountDue), MauiFuelChipFuelContext.Bill)
        ];

        sut.filter(testData).subscribe((results) => {
            expect(results.length).toBe(1);
            expect(results[0].contractNumber).toBe('555');
        });
    }));

    it('should include contract that has issued open bill with 0 balance (unexpected error)', async(() => {
        testData = [
            new FuelChipData('123', '111', MauiFuelChipFuelType.Electricity, null, new PaymentExtensionContractEligibility('111', false, PaymentExtensionIneligibilityReasons.AlreadyExtended, totalAmountDue), MauiFuelChipFuelContext.Bill),
            new FuelChipData('234', '222', MauiFuelChipFuelType.Gas, null, new PaymentExtensionContractEligibility('222', true, undefined, totalAmountDue), MauiFuelChipFuelContext.Bill),
            new FuelChipData('456', '444', MauiFuelChipFuelType.Gas, null, new PaymentExtensionContractEligibility('444', false, PaymentExtensionIneligibilityReasons.Unknown, totalAmountDue), MauiFuelChipFuelContext.Bill)
        ];

        sut.filter(testData).subscribe((results) => {
            expect(results.length).toBe(1);
            expect(results[0].contractNumber).toBe('444');
        });
    }));

    it('should include contract that has negative balance (unexpected error)', async(() => {
        testData = [
            new FuelChipData('123', '111', MauiFuelChipFuelType.Electricity, null, new PaymentExtensionContractEligibility('111', false, PaymentExtensionIneligibilityReasons.AlreadyExtended, totalAmountDue), MauiFuelChipFuelContext.Bill),
            new FuelChipData('234', '222', MauiFuelChipFuelType.Gas, null, new PaymentExtensionContractEligibility('222', true, undefined, totalAmountDue), MauiFuelChipFuelContext.Bill),
            new FuelChipData('567', '555', MauiFuelChipFuelType.Gas, null, new PaymentExtensionContractEligibility('555', false, PaymentExtensionIneligibilityReasons.Unknown, totalAmountDue), MauiFuelChipFuelContext.Bill)
        ];

        sut.filter(testData).subscribe((results) => {
            expect(results.length).toBe(1);
            expect(results[0].contractNumber).toBe('555');
        });
    }));

    describe('Broken account', () => {
        beforeEach(() => {
            testData = [
                new FuelChipData('123', '111', MauiFuelChipFuelType.Electricity, null,
                    new PaymentExtensionContractEligibility('111', false, PaymentExtensionIneligibilityReasons.BrokenAccount, 1, new Date('2027-10-25')), MauiFuelChipFuelContext.Bill)
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
                expect(results[0].tertiaryMessage).toBe(`Your bill can't be extended because it has not been issued yet.`);
            });
        }));
    });

    describe('Negative balance', () => {
        describe('for UnableToExtendOnlineOrNoIssuedBill error', () => {
            beforeEach(() => {
                testData = [
                    new FuelChipData('567', '555', MauiFuelChipFuelType.Electricity, null,
                        new PaymentExtensionContractEligibility('111', false, PaymentExtensionIneligibilityReasons.UnableToExtendOnlineOrNoIssuedBill, 1, new Date('2027-10-25')), MauiFuelChipFuelContext.Bill)
                ];
            });

            it('should set primary message to account balance', async(() => {
                sut.filter(testData).subscribe((results) => {
                    expect(results[0].statusMessage[0].primaryMessage).toBe('Account balance: $200.00 CR');
                });
            }));

            it('should set secondary message to next bill issued in 6 days', async(() => {
                sut.filter(testData).subscribe((results) => {
                    expect(results[0].statusMessage[0].secondaryMessage).toBe('Next bill issued in 6 days');
                });
            }));

            it('should set tertiary message to the reason why user is unable to extend', async(() => {
                sut.filter(testData).subscribe((results) => {
                    expect(results[0].tertiaryMessage).toBe(`Your bill can't be extended because your account balance is in credit.`);
                });
            }));
        });

        describe('for Unknown error', () => {
            beforeEach(() => {
                testData = [
                    new FuelChipData('567', '555', MauiFuelChipFuelType.Electricity, null,
                        new PaymentExtensionContractEligibility('111', false, PaymentExtensionIneligibilityReasons.Unknown, 1, new Date('2027-10-25')), MauiFuelChipFuelContext.Bill)
                ];
            });

            it('should set primary message to account balance', async(() => {
                sut.filter(testData).subscribe((results) => {
                    expect(results[0].statusMessage[0].primaryMessage).toBe('Account balance: $200.00 CR');
                });
            }));

            it('should set secondary message to next bill issued in 6 days', async(() => {
                sut.filter(testData).subscribe((results) => {
                    expect(results[0].statusMessage[0].secondaryMessage).toBe('Next bill issued in 6 days');
                });
            }));

            it('should set tertiary message to the reason why user is unable to extend', async(() => {
                sut.filter(testData).subscribe((results) => {
                    expect(results[0].tertiaryMessage).toBe(`Your bill can't be extended because your account balance is in credit.`);
                });
            }));
        });
    });

    describe('Smart meter', () => {
        beforeEach(() => {
            testData = [
                new FuelChipData('123', '111', MauiFuelChipFuelType.Electricity, null,
                    new PaymentExtensionContractEligibility('111', false, PaymentExtensionIneligibilityReasons.NoIssuedBill, 1, new Date('2027-10-25')), MauiFuelChipFuelContext.Bill)
            ];
        });

        it('should set primary message to projection', async(() => {
            sut.filter(testData).subscribe((results) => {
                expect(results[0].statusMessage[0].primaryMessage).toBe('Projection: $255.50');
            });
        }));

        it('should set secondary message to next bill issued in 6 days', async(() => {
            sut.filter(testData).subscribe((results) => {
                expect(results[0].statusMessage[0].secondaryMessage).toBe('Next bill issued in 6 days');
            });
        }));

        it('should set tertiary message to the reason why user is unable to extend', async(() => {
            sut.filter(testData).subscribe((results) => {
                expect(results[0].tertiaryMessage).toBe(`Your bill can't be extended because it has not been issued yet.`);
            });
        }));

    });

    describe('Non smart meter', () => {
        beforeEach(() => {
            testData = [
                new FuelChipData('345', '333', MauiFuelChipFuelType.Electricity, null,
                    new PaymentExtensionContractEligibility('333', false, PaymentExtensionIneligibilityReasons.NoIssuedBill, 1, new Date('2027-10-25')), MauiFuelChipFuelContext.Bill)
            ];
        });

        it('should set primary message to account balance', async(() => {
            sut.filter(testData).subscribe((results) => {
                expect(results[0].statusMessage[0].primaryMessage).toBe('Account balance: $333.30');
            });
        }));

        it('should set secondary message to next bill issued in 2 days', async(() => {
            sut.filter(testData).subscribe((results) => {
                expect(results[0].statusMessage[0].secondaryMessage).toBe('Next bill issued in 2 days');
            });
        }));

        it('should set tertiary message to the reason why user is unable to extend', async(() => {
            sut.filter(testData).subscribe((results) => {
                expect(results[0].tertiaryMessage).toBe(`Your bill can't be extended because it has not been issued yet.`);
            });
        }));

    });

    function createContract(contractNumber: string, currentBalance: number, currentBillEndDate: Date, isSmartMeter: boolean = false): ContractViewModel {
        const contract = new ContractViewModel(contractNumber);
        contract.currentBalance = currentBalance;
        contract.currentBillEndDate = currentBillEndDate;
        contract.isSmartMeter = isSmartMeter;
        contract.projectedBill = 255.5;
        contract.paymentTotal = currentBalance;
        return contract;
    }
});
