import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { Mock } from 'ts-mocks/lib';

import { IPaymentMethodsService } from '../../../myAccount/services/settings/paymentMethods.service.interface';
import { PaymentArrangementSettingsService, PaymentArrangementSettingsViewModel } from './paymentArrangement.settings.service';
import { IAccountServiceMA, AccountViewModel, ContractViewModel } from '../../../myAccount/services/account.service';
import { PaymentArrangementType } from '../../../myAccount/common/enums';
import { FeatureFlagMockService } from '../../../myAccount/services/mock/featureflag.mock.service';
import { UpcomingInstalment, InstalmentPlanService, ContractUpcomingInstalment } from '../../../myAccount/services/paymentScheme/instalmentPlan.service';
import { FeatureFlagTypes } from '../../../myAccount/services/featureFlag.constants';
import { IFeatureFlagService } from '../../../myAccount/services/contract/ifeatureflag.service';
import { ContractViewModelBuilder } from './test/contractViewModelBuilder';
import { ContractUpcomingInstalmentBuilder } from './test/contractUpcomingInstalmentBuilder';
import { AccountViewModelBuilder } from './test/accountViewModelBuilder';

describe('getPaymentArrangementViewModel', () => {
    let featureFlagMockService = new FeatureFlagMockService();
    let service: PaymentArrangementSettingsService;
    const paymentMethodService: any = {
        getPaymentMethods: () => {
            return new Error('getPaymentMethods is not implemented.');
        }
    };
    const accountService: any = {
        getAccounts: () => {
            return new Error('getAccounts is not implemented.');
        }
    };

    let getUpcomingInstalmentsSpy: jasmine.Spy;
    let setGetUpcomingInstalments = (upcomingInstalments: ContractUpcomingInstalment[]): void => {
        getUpcomingInstalmentsSpy.and.callFake((accountNumber: string) => {
            const accountWithUpcomingInstalment = upcomingInstalments
                .filter((upcomingInstalment) => upcomingInstalment.contractAccountNumber === +accountNumber);
            return Observable.of(accountWithUpcomingInstalment);
        });
    };

    beforeEach(() => {
        const instalmentPlanService = new Mock<InstalmentPlanService>();
        getUpcomingInstalmentsSpy = instalmentPlanService.setup((instalmentPlanServiceValue) => instalmentPlanServiceValue.getUpcomingInstalments).Spy;
        featureFlagMockService.setFeatureFlags([FeatureFlagTypes.paymentExtensionEnabled, FeatureFlagTypes.paymentAssistanceEnabled]);
        service = new PaymentArrangementSettingsService(paymentMethodService, accountService, instalmentPlanService.Object, featureFlagMockService);
    });

    describe('totalAmountOwing', () => {
        const anyPaymentArrangementType = PaymentArrangementType.DirectDebit;
        const contractCurrentBalance = 1;
        const contractPaymentOverdue = 2;
        const anyDate = new Date();
        const bill = { issuedDate: anyDate };

        beforeEach(() => {
            spyOn(paymentMethodService, 'getPaymentMethods').and.returnValue(Observable.of([]));
        });

        // the existence of extendedDueDate means contract has payment extension
        describe('when contract has extendedDueDate and has bill', () => {
            it('should return model with totalAmountOwing equal to sum of contract current balance and overdue', (done) => {
                // arrange
                const contract = {
                    extendedDueDate: anyDate,
                    currentBalance: contractCurrentBalance,
                    paymentOverdue: contractPaymentOverdue,
                    getNewestBill: () => {
                        return new Error('getNewestBill is not implemented');
                    }
                };
                const account = {
                    accountNumber: 1,
                    contracts: [contract]
                };
                spyOn(contract, 'getNewestBill').and.returnValue(bill);
                spyOn(accountService, 'getAccounts').and.returnValue(Observable.of([account]));
                spyOn(service, 'withUpcomingInstalments').and.returnValue(Observable.of([{ account: account, upcomingInstalments: [] }]));

                // act
                const settings = service.getPaymentArrangementViewModel(anyPaymentArrangementType);

                // assert
                settings.subscribe((models: PaymentArrangementSettingsViewModel[]) => {
                    expect(models[0].upcomingPaymentArrangementModel[0].totalAmountOwing).toBe(contractCurrentBalance + contractPaymentOverdue);
                    done();
                });
            });
        });

        describe('when contract does not have extendedDueDate or bill', () => {
            it('should return model with totalAmountOwing equal to current balance', (done) => {
                // arrange
                const contract = {
                    currentBalance: contractCurrentBalance,
                    paymentOverdue: contractPaymentOverdue,
                    getNewestBill: () => {
                        return new Error('getNewestBill is not implemented');
                    }
                };
                const account = {
                    accountNumber: 1,
                    contracts: [contract]
                };
                spyOn(contract, 'getNewestBill').and.returnValue(bill);
                spyOn(accountService, 'getAccounts').and.returnValue(Observable.of([account]));
                spyOn(service, 'withUpcomingInstalments').and.returnValue(Observable.of([{ account: account, upcomingInstalments: [] }]));

                // act
                const settings = service.getPaymentArrangementViewModel(anyPaymentArrangementType);

                // assert
                settings.subscribe((models: PaymentArrangementSettingsViewModel[]) => {
                    expect(models[0].upcomingPaymentArrangementModel[0].totalAmountOwing).toBe(contractCurrentBalance);
                    done();
                });
            });
        });

        describe('when withUpcomingInstalments is called', () => {
            it('should add upcoming instalments to account stream', (done) => {
                // arrange
                const contractAccountNumberOne = 1;
                const contractNumberOne = 2;
                const contractNumberTwo = 3;

                const contractAccountNumberTwo = 4;
                const contractNumberThree = 5;

                const upcomingInstalments = [
                    new ContractUpcomingInstalmentBuilder(contractAccountNumberOne, contractNumberOne).build(),
                    new ContractUpcomingInstalmentBuilder(contractAccountNumberOne, contractNumberTwo).build(),
                    new ContractUpcomingInstalmentBuilder(contractAccountNumberTwo, contractNumberThree).build()
                ];

                const accountStream = Observable.of([
                    new AccountViewModelBuilder(contractAccountNumberOne)
                        .addContract(new ContractViewModelBuilder(contractAccountNumberOne, contractNumberOne).build())
                        .addContract(new ContractViewModelBuilder(contractAccountNumberOne, contractNumberTwo).build())
                        .build(),
                    new AccountViewModelBuilder(contractAccountNumberTwo)
                        .addContract(new ContractViewModelBuilder(contractAccountNumberTwo, contractNumberThree).build())
                        .build()
                ]);

                setGetUpcomingInstalments(upcomingInstalments);

                // act
                const accountWithUpcomingInstalmentsStream = service.withUpcomingInstalments(accountStream);

                // assert
                accountWithUpcomingInstalmentsStream.subscribe((accountWithUpcomingInstalments) => {
                    expect(accountWithUpcomingInstalments.length).toBe(2);

                    expect(accountWithUpcomingInstalments[0].upcomingInstalments.length).toBe(2);
                    expect(accountWithUpcomingInstalments[0].upcomingInstalments[0].contractNumber).toBe(upcomingInstalments[0].contractNumber);
                    expect(accountWithUpcomingInstalments[0].upcomingInstalments[1].contractNumber).toBe(upcomingInstalments[1].contractNumber);

                    expect(accountWithUpcomingInstalments[1].upcomingInstalments.length).toBe(1);

                    done();
                });
            });

            it(`shouldn't add upcoming instalments to account stream if there is no upcoming instalments`, (done) => {
                // arrange
                const contractAccountNumberOne: number = 1;
                const contractNumberOne: number = 2;

                const contractAccountNumberTwo: number = 4;
                const contractNumberTwo: number = 5;

                const upcomingInstalments = [];

                const accountStream = Observable.of([
                    new AccountViewModelBuilder(contractAccountNumberOne)
                        .addContract(new ContractViewModelBuilder(contractAccountNumberOne, contractNumberOne).build())
                        .build(),
                    new AccountViewModelBuilder(contractAccountNumberTwo)
                        .addContract(new ContractViewModelBuilder(contractAccountNumberTwo, contractNumberTwo).build())
                        .build()
                ]);

                setGetUpcomingInstalments(upcomingInstalments);

                // act
                const accountWithUpcomingInstalmentsStream = service.withUpcomingInstalments(accountStream);

                // assert
                accountWithUpcomingInstalmentsStream.subscribe((accountWithUpcomingInstalments) => {
                    expect(accountWithUpcomingInstalments.length).toBe(2);
                    expect(accountWithUpcomingInstalments[0].upcomingInstalments.length).toBe(0);
                    expect(accountWithUpcomingInstalments[1].upcomingInstalments.length).toBe(0);
                    done();
                });
            });
        });

        describe('upcoming bill display mode', () => {
            it('should be bill smoothing mode when isBillSmoothingV2 is true', (done) => {
                // arrange
                const frequency = 'weekly';
                const nextPaymentDate = new Date();
                const nextPaymentAmount = 10;
                const contract = {
                    isBillSmoothingV2: true,
                    paymentScheme: {
                        nextPayment: {
                            amount: nextPaymentAmount,
                            date: nextPaymentDate
                        },
                        frequency: frequency
                    },
                    getNewestBill: () => {
                        return new Error('getNewestBill is not implemented');
                    }
                };
                const account = {
                    accountNumber: 1,
                    contracts: [contract]
                };
                spyOn(contract, 'getNewestBill').and.returnValue(bill);
                spyOn(accountService, 'getAccounts').and.returnValue(Observable.of([account]));
                spyOn(service, 'withUpcomingInstalments').and.returnValue(Observable.of([{ account: account, upcomingInstalments: [] }]));

                // act
                const settings = service.getPaymentArrangementViewModel(anyPaymentArrangementType);

                // assert
                settings.subscribe((models: PaymentArrangementSettingsViewModel[]) => {
                    expect(models[0].upcomingPaymentArrangementModel[0].displayInBillSmoothingMode()).toBe(true);
                    expect(models[0].upcomingPaymentArrangementModel[0].frequency).toBe(frequency);
                    expect(models[0].upcomingPaymentArrangementModel[0].billSmoothingAmount).toBe(nextPaymentAmount);
                    expect(models[0].upcomingPaymentArrangementModel[0].billSmoothingPreviousAmountUsed).toBe(false);
                    expect(models[0].upcomingPaymentArrangementModel[0].billSmoothingDate).toBe(nextPaymentDate);
                    done();
                });
            });

            it('should be in payment extension mode when have extendedDueDate', (done) => {
                // arrange
                const contract = {
                    extendedDueDate: anyDate,
                    currentBalance: contractCurrentBalance,
                    paymentOverdue: contractPaymentOverdue,
                    getNewestBill: () => {
                        return new Error('getNewestBill is not implemented');
                    }
                };
                const account = {
                    accountNumber: 1,
                    contracts: [contract]
                };
                spyOn(contract, 'getNewestBill').and.returnValue(bill);
                spyOn(accountService, 'getAccounts').and.returnValue(Observable.of([account]));
                spyOn(service, 'withUpcomingInstalments').and.returnValue(Observable.of([{ account: account, upcomingInstalments: [] }]));

                // act
                const settings = service.getPaymentArrangementViewModel(anyPaymentArrangementType);

                // assert
                settings.subscribe((models: PaymentArrangementSettingsViewModel[]) => {
                    expect(models[0].upcomingPaymentArrangementModel[0].displayInPaymentExtensionMode()).toBe(true);
                    expect(models[0].upcomingPaymentArrangementModel[0].extendedDueDate).toBe(anyDate);
                    expect(models[0].upcomingPaymentArrangementModel[0].totalAmountOwing).toBe(contractCurrentBalance + contractPaymentOverdue);
                    done();
                });
            });

            it('should be in instalment plan mode when have upcomingInstalments', (done) => {
                // arrange
                const contractAccountNumber = 2;
                const contractNumber = 1;

                const contract = new ContractViewModelBuilder(contractAccountNumber, contractNumber).build();
                const account = new AccountViewModelBuilder(contractAccountNumber).addContract(contract).build();

                const upcomingInstalments = [
                    new ContractUpcomingInstalmentBuilder(contractAccountNumber, contractNumber).build()
                ];

                spyOn(contract, 'getNewestBill').and.returnValue(bill);
                spyOn(accountService, 'getAccounts').and.returnValue(Observable.of([account]));
                spyOn(service, 'withUpcomingInstalments').and.returnValue(Observable.of([{ account: account, upcomingInstalments: upcomingInstalments }]));

                // act
                const settings = service.getPaymentArrangementViewModel(anyPaymentArrangementType);

                // assert
                settings.subscribe((models: PaymentArrangementSettingsViewModel[]) => {
                    expect(models[0].upcomingPaymentArrangementModel[0].displayInInstalmentPlanMode()).toBe(true);
                    expect(models[0].upcomingPaymentArrangementModel[0].isOverdue).toBe(true);

                    const actualUpcomingInstalment = upcomingInstalments
                        .find((upcomingInstalmentValue) => upcomingInstalmentValue.contractNumber === contractNumber)
                        .upcomingInstalment;

                    expect(models[0].upcomingPaymentArrangementModel[0].overdueAmount).toBe(actualUpcomingInstalment.overdueAmount);
                    expect(models[0].upcomingPaymentArrangementModel[0].totalAmountOwing).toBe(actualUpcomingInstalment.instalmentDueAmount);
                    expect(models[0].upcomingPaymentArrangementModel[0].dueDate).toBe(actualUpcomingInstalment.instalmentDueDate);
                    done();
                });
            });

            it('should be in default mode in default', (done) => {
                // arrange
                const contract = {
                    currentBalance: contractCurrentBalance,
                    paymentOverdue: contractPaymentOverdue,
                    getNewestBill: () => {
                        return new Error('getNewestBill is not implemented');
                    }
                };
                const account = {
                    accountNumber: 1,
                    contracts: [contract]
                };
                spyOn(contract, 'getNewestBill').and.returnValue(bill);
                spyOn(accountService, 'getAccounts').and.returnValue(Observable.of([account]));
                spyOn(service, 'withUpcomingInstalments').and.returnValue(Observable.of([{ account: account, upcomingInstalments: [] }]));

                // act
                const settings = service.getPaymentArrangementViewModel(anyPaymentArrangementType);

                // assert
                settings.subscribe((models: PaymentArrangementSettingsViewModel[]) => {
                    expect(models[0].upcomingPaymentArrangementModel[0].displayInDefaultMode()).toBe(true);
                    expect(models[0].upcomingPaymentArrangementModel[0].isOverdue).toBe(true);
                    expect(models[0].upcomingPaymentArrangementModel[0].overdueAmount).toBe(contractPaymentOverdue);
                    expect(models[0].upcomingPaymentArrangementModel[0].isCurrentBalance).toBe(true);
                    expect(models[0].upcomingPaymentArrangementModel[0].totalAmountOwing).toBe(contractCurrentBalance);
                    done();
                });
            });
        });
    });
});
