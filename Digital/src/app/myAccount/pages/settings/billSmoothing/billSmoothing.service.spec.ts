import { async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { AlertType } from '../../../../shared/globals/alertType';
import { AccountViewModel, ContractViewModel } from '../../../services/account.service';
import { BillDeliveryMethod } from '../../../services/settings/model/billDeliveryMethod';
import { BillDeliveryMethodType } from '../../../services/settings/model/billDeliveryMethodType';
import { SettingsAggregateModel } from '../../../services/settings/model/settingsAggregateModel';
import { AlertDisplayModel, BillSmoothingAccountModel, BillSmoothingAccountsViewModel, BillSmoothingEstimatesViewModel, BillSmoothingFrequency, BillSmoothingFuelDisplayModel, BillSmoothingInternalErrorTypes, LivePersonEngagementTypes, PaymentSchemeDisplayModel, SapBillSmoothingErrorTypes } from './billSmoothing.model';
import { BillSmoothingService } from './billSmoothing.service';
import { InstalmentPlanData } from '../../../services/paymentScheme/instalmentPlan.service';

describe('Bill Smoothing Service', () => {
    let sut: BillSmoothingService;
    let accountService: any;
    let settingsService: any;
    let apiService: any;

    beforeEach(() => {
        accountService = {
            getAccounts: () => {
                throw new Error('accountservice.getAccounts has not been mocked properly.');
            }
        };
        settingsService = {
            getSettings: () => {
                throw new Error('settingsService.getSettings has not been mocked properly.');
            }
        };
        apiService = {
            getBillSmoothingEstimates: () => {
                throw new Error('apiService.getBillSmoothingEstimates has not been mocked properly.');
            }
        };
        sut = new BillSmoothingService(accountService, settingsService, apiService);
    });

    describe('generateBillSmoothingViewModel tests', () => {
        it('should have the same number of view models as contract accounts', async(() => {
            // arrange
            let mockAccounts = new Array<AccountViewModel>();
            let contractAccount1 = createContractAccountViewModel('123456789');
            let contractAccount2 = createContractAccountViewModel('234567890');
            mockAccounts.push(contractAccount1);
            mockAccounts.push(contractAccount2);
            spyOn(accountService, 'getAccounts').and.returnValue(Observable.of(mockAccounts));
            spyOn(settingsService, 'getSettings').and.returnValue(Observable.of(null));
            spyOn(apiService, 'getBillSmoothingEstimates').and.returnValue(Observable.of(null));

            // act
            const viewModelsObservable = sut.generateBillSmoothingViewModel();

            // assert
            viewModelsObservable.subscribe((viewModels: BillSmoothingAccountModel[]) => {
                expect(viewModels.length).toBe(2);
            });
        }));

        it('should consolidate all chat buttons when all contracts are on BS', async(() => {
            // arrange
            let mockAccounts = new Array<AccountViewModel>();
            let contractAccount1 = createContractAccountViewModel('123456789');
            mockAccounts.push(contractAccount1);
            spyOn(accountService, 'getAccounts').and.returnValue(Observable.of(mockAccounts));
            spyOn(settingsService, 'getSettings').and.returnValue(Observable.of(null));
            spyOn(apiService, 'getBillSmoothingEstimates').and.returnValue(Observable.of(null));

            // act
            const viewModelsObservable = sut.generateBillSmoothingViewModel();

            // assert
            viewModelsObservable.subscribe((viewModels: BillSmoothingAccountModel[]) => {
                expect(viewModels[0].hasConsolidatedChatButton).toBe(true);
            });
        }));

        it('should show contract to be eligible for BS when contract is not on BS and has payment options available', async(() => {
            // arrange
            let mockAccounts = new Array<AccountViewModel>();
            let mockEstimates = createAccountEstimatesModel(123456789, AccountEstimatesModelTypes.paymentOptions);
            let settings = createSettingsModel('123456789');
            let contractAccount = createContractAccountViewModel('123456789');
            contractAccount.contracts[0].isBillSmoothingV2 = false;
            contractAccount.contracts[1].isBillSmoothingV2 = false;
            mockAccounts.push(contractAccount);
            spyOn(accountService, 'getAccounts').and.returnValue(Observable.of(mockAccounts));
            spyOn(settingsService, 'getSettings').and.returnValue(Observable.of(settings));
            spyOn(apiService, 'getBillSmoothingEstimates').and.returnValue(Observable.of(mockEstimates));

            // act
            const viewModelsObservable = sut.generateBillSmoothingViewModel();

            // assert
            viewModelsObservable.subscribe((viewModels: BillSmoothingAccountModel[]) => {
                expect(viewModels[0].billSmoothingFuelModel[0].isEligibleForBillSmoothing).toBe(true);
            });
        }));

        it('should show contract to be ineligible for BS when contract is not on BS and has errors', async(() => {
            // arrange
            let mockAccounts = new Array<AccountViewModel>();
            let mockEstimates = createAccountEstimatesModel(123456789, AccountEstimatesModelTypes.error);
            let settings = createSettingsModel('123456789');
            let contractAccount = createContractAccountViewModel('123456789');
            contractAccount.contracts[0].isBillSmoothingV2 = false;
            contractAccount.contracts[1].isBillSmoothingV2 = false;
            mockAccounts.push(contractAccount);
            spyOn(accountService, 'getAccounts').and.returnValue(Observable.of(mockAccounts));
            spyOn(settingsService, 'getSettings').and.returnValue(Observable.of(settings));
            spyOn(apiService, 'getBillSmoothingEstimates').and.returnValue(Observable.of(mockEstimates));

            // act
            const viewModelsObservable = sut.generateBillSmoothingViewModel();

            // assert
            viewModelsObservable.subscribe((viewModels: BillSmoothingAccountModel[]) => {
                expect(viewModels[0].billSmoothingFuelModel[0].isEligibleForBillSmoothing).toBe(false);
            });
        }));

        it('should show contract to be ineligible for BS when contract is not on BS and has unknown errors', async(() => {
            // arrange
            let mockAccounts = new Array<AccountViewModel>();
            let mockEstimates = createAccountEstimatesModel(123456789, AccountEstimatesModelTypes.errorUnknown);
            let settings = createSettingsModel('123456789');
            let contractAccount = createContractAccountViewModel('123456789');
            contractAccount.contracts[0].isBillSmoothingV2 = false;
            contractAccount.contracts[1].isBillSmoothingV2 = false;
            mockAccounts.push(contractAccount);
            spyOn(accountService, 'getAccounts').and.returnValue(Observable.of(mockAccounts));
            spyOn(settingsService, 'getSettings').and.returnValue(Observable.of(settings));
            spyOn(apiService, 'getBillSmoothingEstimates').and.returnValue(Observable.of(mockEstimates));

            // act
            sut.turnOnChangesToReduceWorkloadOfCallCentre = true;
            const viewModelsObservable = sut.generateBillSmoothingViewModel();

            // assert
            viewModelsObservable.subscribe((viewModels: BillSmoothingAccountModel[]) => {
                expect(viewModels[0].billSmoothingFuelModel[0].isEligibleForBillSmoothing).toBe(false);
            });
        }));

        it('should consolidate all setup buttons when all contracts are not on BS and are eligible for BS', async(() => {
            // arrange
            let mockAccounts = new Array<AccountViewModel>();
            let mockEstimates = createAccountEstimatesModel(123456789, AccountEstimatesModelTypes.paymentOptions);
            let contractAccount = createContractAccountViewModel('123456789');
            let settings = createSettingsModel('123456789');
            contractAccount.contracts[0].isBillSmoothingV2 = false;
            contractAccount.contracts[1].isBillSmoothingV2 = false;
            mockAccounts.push(contractAccount);
            spyOn(accountService, 'getAccounts').and.returnValue(Observable.of(mockAccounts));
            spyOn(settingsService, 'getSettings').and.returnValue(Observable.of(settings));
            spyOn(apiService, 'getBillSmoothingEstimates').and.returnValue(Observable.of(mockEstimates));

            // act
            const viewModelsObservable = sut.generateBillSmoothingViewModel();

            // assert
            viewModelsObservable.subscribe((viewModels: BillSmoothingAccountModel[]) => {
                expect(viewModels[0].hasConsolidatedSetUpButton).toBe(true);
            });
        }));

        it('should show consolidated chat buttons when there are duplicate fuels', async(() => {
            // arrange
            let mockAccounts = new Array<AccountViewModel>();
            let contractAccount = createContractAccountViewModel('123456789');
            contractAccount.contracts[0].fuelType = 'Gas';
            mockAccounts.push(contractAccount);
            spyOn(accountService, 'getAccounts').and.returnValue(Observable.of(mockAccounts));
            spyOn(settingsService, 'getSettings').and.returnValue(Observable.of(null));
            spyOn(apiService, 'getBillSmoothingEstimates').and.returnValue(Observable.of(null));

            // act
            const viewModelsObservable = sut.generateBillSmoothingViewModel();

            // assert
            viewModelsObservable.subscribe((viewModels: BillSmoothingAccountModel[]) => {
                expect(viewModels[0].hasConsolidatedChatButton).toBe(true);
            });
        }));

        it('should show account level error if all contracts has an api error with no payment schemes returned.', async(() => {
            // arrange
            let mockAccounts = new Array<AccountViewModel>();
            let contractAccount = createContractAccountViewModel('123456789');
            let mockEstimates = createAccountEstimatesModel(123456789);
            let settings = createSettingsModel('123456789');
            mockEstimates.hasEstimatesApiError = true;
            contractAccount.contracts[0].isBillSmoothingV2 = false;
            contractAccount.contracts[1].isBillSmoothingV2 = false;
            mockAccounts.push(contractAccount);
            spyOn(accountService, 'getAccounts').and.returnValue(Observable.of(mockAccounts));
            spyOn(settingsService, 'getSettings').and.returnValue(Observable.of(settings));
            spyOn(apiService, 'getBillSmoothingEstimates').and.returnValue(Observable.of(mockEstimates));

            // act
            const viewModelsObservable = sut.generateBillSmoothingViewModel();

            // assert
            viewModelsObservable.subscribe((viewModels: BillSmoothingAccountModel[]) => {
                expect(viewModels[0].hasEstimatesApiError).toBe(true);
            });
        }));

        it('should show consolidated chat buttons when there are duplicate fuels.', async(() => {
            // arrange
            let mockAccounts = new Array<AccountViewModel>();
            let contractAccount = createContractAccountViewModelWithDuplicateFuels('123456789');
            let mockEstimates = createAccountEstimatesModelWithDuplicateFuels(123456789);
            let settings = createSettingsModel('123456789');
            mockEstimates.hasEstimatesApiError = true;
            contractAccount.contracts[0].isBillSmoothingV2 = false;
            contractAccount.contracts[1].isBillSmoothingV2 = false;
            contractAccount.contracts[2].isBillSmoothingV2 = false;
            mockAccounts.push(contractAccount);
            spyOn(accountService, 'getAccounts').and.returnValue(Observable.of(mockAccounts));
            spyOn(settingsService, 'getSettings').and.returnValue(Observable.of(settings));
            spyOn(apiService, 'getBillSmoothingEstimates').and.returnValue(Observable.of(mockEstimates));

            // act
            const viewModelsObservable = sut.generateBillSmoothingViewModel();

            // assert
            viewModelsObservable.subscribe((viewModels: BillSmoothingAccountModel[]) => {
                expect(viewModels[0].hasConsolidatedChatButton).toBe(true);
            });
        }));

        it('should show consolidated messages when all contracts are on BS && are not on direct debit', async(() => {
            // arrange
            let mockAccounts = new Array<AccountViewModel>();
            let contractAccount1 = createContractAccountViewModel('123456789');
            contractAccount1.contracts.forEach((contract) => {
                contract.isDirectDebit = false;
            });
            mockAccounts.push(contractAccount1);
            spyOn(accountService, 'getAccounts').and.returnValue(Observable.of(mockAccounts));
            spyOn(settingsService, 'getSettings').and.returnValue(Observable.of(null));
            spyOn(apiService, 'getBillSmoothingEstimates').and.returnValue(Observable.of(null));

            // act
            const viewModelsObservable = sut.generateBillSmoothingViewModel();

            // assert
            viewModelsObservable.subscribe((viewModels: BillSmoothingAccountModel[]) => {
                expect(viewModels[0].hasConsolidatedMessages).toBe(true);
            });
        }));

        it('should show not consolidated messages when one contract is on BS and one contract is not', async(() => {
            // arrange
            let mockAccounts = new Array<AccountViewModel>();
            let contractAccount1 = createContractAccountViewModel('123456789');
            let mockEstimates = createAccountEstimatesModel(123456789, AccountEstimatesModelTypes.paymentOptions);
            let settings = createSettingsModel('123456789');
            contractAccount1.contracts[0].isBillSmoothingV2 = false;
            mockAccounts.push(contractAccount1);
            spyOn(accountService, 'getAccounts').and.returnValue(Observable.of(mockAccounts));
            spyOn(settingsService, 'getSettings').and.returnValue(Observable.of(settings));
            spyOn(apiService, 'getBillSmoothingEstimates').and.returnValue(Observable.of(mockEstimates));

            // act
            const viewModelsObservable = sut.generateBillSmoothingViewModel();

            // assert
            viewModelsObservable.subscribe((viewModels: BillSmoothingAccountModel[]) => {
                expect(viewModels[0].hasConsolidatedMessages).toBe(false);
            });
        }));

        it('should show not consolidated messages when one contract has payment scheme and the other has api estimate error', async(() => {
            // arrange
            let mockAccounts = new Array<AccountViewModel>();
            let contractAccount1 = createContractAccountViewModel('123456789');
            let mockEstimates = createAccountEstimatesModel(123456789, AccountEstimatesModelTypes.paymentOptions);
            let settings = createSettingsModel('123456789');
            contractAccount1.contracts[0].isBillSmoothingV2 = false;
            mockEstimates.hasEstimatesApiError = true;
            mockAccounts.push(contractAccount1);
            spyOn(accountService, 'getAccounts').and.returnValue(Observable.of(mockAccounts));
            spyOn(settingsService, 'getSettings').and.returnValue(Observable.of(settings));
            spyOn(apiService, 'getBillSmoothingEstimates').and.returnValue(Observable.of(mockEstimates));

            // act
            const viewModelsObservable = sut.generateBillSmoothingViewModel();

            // assert
            viewModelsObservable.subscribe((viewModels: BillSmoothingAccountModel[]) => {
                expect(viewModels[0].hasConsolidatedMessages).toBe(false);
            });
        }));

        describe('when estimate result has account level error object', () => {
            describe('with response code 400 and error code 16 for customer hardship', () => {
                it('should show contract to be ineligible for bill smoothing', async(() => {
                    // arrange
                    let mockAccounts = new Array<AccountViewModel>();
                    let mockEstimates = createAccountEstimatesModel(123456789, AccountEstimatesModelTypes.customerHardship);
                    let settings = createSettingsModel('123456789');
                    let contractAccount = createContractAccountViewModel('123456789');
                    contractAccount.contracts[0].isBillSmoothingV2 = false;
                    contractAccount.contracts[1].isBillSmoothingV2 = false;
                    mockAccounts.push(contractAccount);
                    spyOn(accountService, 'getAccounts').and.returnValue(Observable.of(mockAccounts));
                    spyOn(settingsService, 'getSettings').and.returnValue(Observable.of(settings));
                    spyOn(apiService, 'getBillSmoothingEstimates').and.returnValue(Observable.of(mockEstimates));
                    spyOn(sut, 'updateLivePersonEngagementType').and.returnValue(null);

                    // act
                    sut.turnOnChangesToReduceWorkloadOfCallCentre = true;
                    const viewModelsObservable = sut.generateBillSmoothingViewModel();

                    // assert
                    viewModelsObservable.subscribe((viewModels: BillSmoothingAccountModel[]) => {
                        expect(viewModels[0].billSmoothingFuelModel[0].isEligibleForBillSmoothing).toBe(false);
                        expect(viewModels[0].billSmoothingFuelModel[0].alerts.every((a) => a.billSmoothingInternalErrorType === BillSmoothingInternalErrorTypes.GeneralIneligibility)).toBe(true);
                    });
                }));
            });
        });
    });

    describe('getStartInformationSubtext tests', () => {
        let selectedDay: string;
        let selectedDateOrdinal: string;

        beforeEach(() => {
            selectedDay = 'selectedDay';
            selectedDateOrdinal = 'selectedDateOrdinal';
        });

        it('should return weekly direct debit payment message', () => {
            let frequency = BillSmoothingFrequency.Weekly;
            let isDirectDebit = true;

            let message = sut.getStartInformationSubtext(frequency, isDirectDebit, selectedDay, selectedDateOrdinal);

            expect(message).toBe('We will debit your nominated account every selectedDay.');
        });

        it('should return monthly direct debit payment message', () => {
            let frequency = BillSmoothingFrequency.Monthly;
            let isDirectDebit = true;

            let message = sut.getStartInformationSubtext(frequency, isDirectDebit, selectedDay, selectedDateOrdinal);

            expect(message).toBe('We will debit your nominated account on the selectedDateOrdinal of every month from your start date.');
        });

        it('should return weekly manual payment message', () => {
            let frequency = BillSmoothingFrequency.Weekly;
            let isDirectDebit = false;

            let message = sut.getStartInformationSubtext(frequency, isDirectDebit, selectedDay, selectedDateOrdinal);

            expect(message).toBe('Payments will be due every selectedDay from your start date.');
        });

        it('should return monthly manual payment message', () => {
            let frequency = BillSmoothingFrequency.Monthly;
            let isDirectDebit = false;

            let message = sut.getStartInformationSubtext(frequency, isDirectDebit, selectedDay, selectedDateOrdinal);

            // assert
            expect(message).toBe('Payments will be due on the selectedDateOrdinal of every month from your start date.');
        });
    });

    describe('generateBillCycleChangeMessage tests', () => {

        it('should return correct message for VIC gas basic and VIC electricity basic', () => {
            let billSmoothingFuels = [
                <BillSmoothingFuelDisplayModel> { isElectricity: true, isGas: false, isSmartMeter: false, regionId: 'VIC' },
                <BillSmoothingFuelDisplayModel> { isElectricity: false, isGas: true, isSmartMeter: false, regionId: 'VIC' }
            ];

            let message = sut.generateBillCycleChangeMessage(billSmoothingFuels);

            expect(message).toBe(`If you are on monthly billing with a basic meter, once you switch to Bill Smoothing, your bill cycle will change and we'll bill you every quarter for Electricity, and every two months for Gas.`);
        });

        it('should return correct message for VIC gas basic', () => {
            let billSmoothingFuels = [
                <BillSmoothingFuelDisplayModel> { isElectricity: false, isGas: true, isSmartMeter: false, regionId: 'VIC' }
            ];

            let message = sut.generateBillCycleChangeMessage(billSmoothingFuels);

            expect(message).toBe(`If you are on monthly billing with a basic meter, once you switch to Bill Smoothing, your bill cycle will change and we'll bill you every two months.`);
        });

        it('should return correct message for non-VIC electricity basic', () => {
            let billSmoothingFuels = [
                <BillSmoothingFuelDisplayModel> { isElectricity: true, isGas: false, isSmartMeter: false, regionId: 'NSW' }
            ];

            let message = sut.generateBillCycleChangeMessage(billSmoothingFuels);

            expect(message).toBe(`If you are on monthly billing with a basic meter, once you switch to Bill Smoothing, your bill cycle will change and we'll bill you every quarter.`);
        });

        it('should return no message for VIC electricity smart meter', () => {
            let billSmoothingFuels = [
                <BillSmoothingFuelDisplayModel> { isElectricity: true, isGas: false, isSmartMeter: true, regionId: 'VIC' }
            ];

            let message = sut.generateBillCycleChangeMessage(billSmoothingFuels);

            expect(message).toBe('');
        });
    });

    describe('updateChatButtonsToReduceWorkloadOfCallCentre', () => {
        beforeEach(() => {
            sut.turnOnChangesToReduceWorkloadOfCallCentre = true;
        });

        it('duplicate fuel alert message replaced', () => {
            // arrange
            const account = new BillSmoothingAccountModel();
            account.hasDuplicateFuels = true;
            account.hasConsolidatedChatButton = true;
            const fuel = new BillSmoothingFuelDisplayModel();
            const alert = new AlertDisplayModel(BillSmoothingInternalErrorTypes.DuplicatedFuels, AlertType.error, 'heading', 'body');
            fuel.alerts.push(alert);
            account.billSmoothingFuelModel = [fuel];

            // act
            sut.updateChatButtonsToReduceWorkloadOfCallCentre([account]);

            // assert
            const alertBody = account.billSmoothingFuelModel[0].alerts[0].body;
            expect(alertBody).toBeDefined();
            expect(alertBody).not.toBe('body');
        });

        it('non-overdue ineligible fuel alert message replaced', () => {
            // arrange
            const account = new BillSmoothingAccountModel();
            account.hasDuplicateFuels = false;
            const fuel = new BillSmoothingFuelDisplayModel();
            fuel.hasBillSmoothing = false;
            fuel.hasEstimatesApiError = false;
            fuel.isEligibleForBillSmoothing = false;
            const alert = new AlertDisplayModel(BillSmoothingInternalErrorTypes.Payg, AlertType.error, 'heading', 'body');
            fuel.alerts.push(alert);
            account.billSmoothingFuelModel = [fuel];

            // act
            sut.updateChatButtonsToReduceWorkloadOfCallCentre([account]);

            // assert
            const alertBody = account.billSmoothingFuelModel[0].alerts[0].body;
            expect(alertBody).toBeDefined();
            expect(alertBody).not.toBe('body');
        });

        it('overdue ineligible fuel alert message not replaced', () => {
            // arrange
            const account = new BillSmoothingAccountModel();
            account.hasDuplicateFuels = false;
            const fuel = new BillSmoothingFuelDisplayModel();
            fuel.hasBillSmoothing = false;
            fuel.hasEstimatesApiError = false;
            fuel.isEligibleForBillSmoothing = false;
            const alert = new AlertDisplayModel(BillSmoothingInternalErrorTypes.Overdue, AlertType.error, 'heading', 'body');
            fuel.alerts.push(alert);
            account.billSmoothingFuelModel = [fuel];

            // act
            sut.updateChatButtonsToReduceWorkloadOfCallCentre([account]);

            // assert
            const alertBody = account.billSmoothingFuelModel[0].alerts[0].body;
            expect(alertBody).toBe('body');
        });

        it('duplicated fuels have consolidated chat button removed', () => {
            // arrange
            const account = new BillSmoothingAccountModel();
            account.hasDuplicateFuels = true;
            account.hasConsolidatedChatButton = true;
            const fuel = new BillSmoothingFuelDisplayModel();
            const alert = new AlertDisplayModel(BillSmoothingInternalErrorTypes.DuplicatedFuels, AlertType.error, 'heading', 'body');
            fuel.alerts.push(alert);
            account.billSmoothingFuelModel = [fuel];

            // act
            sut.updateChatButtonsToReduceWorkloadOfCallCentre([account]);

            // assert
            const alertBody = account.billSmoothingFuelModel[0].alerts[0].body;
            expect(alertBody).toBeDefined();
            expect(alertBody).not.toBe('body');
            expect(account.hasConsolidatedChatButton).toBe(false);
        });

        it('non-overdue ineligible fuels have consolidated chat button removed', () => {
            // arrange
            const account = new BillSmoothingAccountModel();
            account.hasDuplicateFuels = false;
            const fuel = new BillSmoothingFuelDisplayModel();
            fuel.hasBillSmoothing = false;
            fuel.hasEstimatesApiError = false;
            fuel.isEligibleForBillSmoothing = false;
            const alert = new AlertDisplayModel(BillSmoothingInternalErrorTypes.Payg, AlertType.error, 'heading', 'body');
            fuel.alerts.push(alert);
            account.billSmoothingFuelModel = [fuel, fuel];
            account.hasConsolidatedChatButton = true;

            // act
            sut.updateChatButtonsToReduceWorkloadOfCallCentre([account]);

            // assert
            expect(account.hasConsolidatedChatButton).toBe(false);
        });

        it('one overdue and one non-overdue ineligible fuels have consolidated chat button replaced by single chat button only for overdue', () => {
            // arrange
            const account = new BillSmoothingAccountModel();
            account.hasDuplicateFuels = false;
            const overduefuel = new BillSmoothingFuelDisplayModel();
            overduefuel.hasBillSmoothing = false;
            overduefuel.hasEstimatesApiError = false;
            overduefuel.isEligibleForBillSmoothing = false;
            overduefuel.hasChatButton = false;
            const overdueAlert = new AlertDisplayModel(BillSmoothingInternalErrorTypes.Overdue, AlertType.error, 'heading', 'body');
            overduefuel.alerts.push(overdueAlert);
            const paygfuel = new BillSmoothingFuelDisplayModel();
            paygfuel.hasBillSmoothing = false;
            paygfuel.hasEstimatesApiError = false;
            paygfuel.isEligibleForBillSmoothing = false;
            paygfuel.hasChatButton = false;
            const paygAlert = new AlertDisplayModel(BillSmoothingInternalErrorTypes.Payg, AlertType.error, 'heading', 'body');
            paygfuel.alerts.push(paygAlert);
            account.billSmoothingFuelModel = [overduefuel, paygfuel];
            account.hasConsolidatedChatButton = true;

            // act
            sut.updateChatButtonsToReduceWorkloadOfCallCentre([account]);

            // assert
            expect(account.hasConsolidatedChatButton).toBe(false);
            expect(overduefuel.hasChatButton).toBe(true);
            expect(paygfuel.hasChatButton).toBe(false);
        });
    });

    describe('removeButtonLinesForLivePersonIntegration', () => {
        it('remove consolidated chat button line of an account model if any account model of same live person type before it already has chat button', () => {
            // arrange
            const account1 = new BillSmoothingAccountModel();
            account1.hasConsolidatedChatButton = true;
            account1.livePersonEngagementType = LivePersonEngagementTypes.LPBillSmoothingOverdue;
            account1.billSmoothingFuelModel = [];
            const account2 = new BillSmoothingAccountModel();
            account2.livePersonEngagementType = LivePersonEngagementTypes.LPBillSmoothingOverdue;
            account2.hasConsolidatedChatButton = true;
            account2.billSmoothingFuelModel = [];
            account2.hasButtonLineAboveMessage = true;
            account2.hasButtonLineBelowMessage = true;

            // act
            sut.removeButtonLinesForLivePersonIntegration([account1, account2]);

            // assert
            expect(account2.hasButtonLineAboveMessage).toBe(false);
            expect(account2.hasButtonLineBelowMessage).toBe(false);
        });

        it('remove consolidated chat button line of an account model if any fuel model of same live person type before it already has chat button', () => {
            // arrange
            const account1 = new BillSmoothingAccountModel();
            const fuel = new BillSmoothingFuelDisplayModel();
            fuel.hasChatButton = true;
            fuel.livePersonEngagementType = LivePersonEngagementTypes.LPBillSmoothingOverdue;
            account1.billSmoothingFuelModel = [fuel];
            const account2 = new BillSmoothingAccountModel();
            account2.livePersonEngagementType = LivePersonEngagementTypes.LPBillSmoothingOverdue;
            account2.hasConsolidatedChatButton = true;
            account2.billSmoothingFuelModel = [];
            account2.hasButtonLineAboveMessage = true;
            account2.hasButtonLineBelowMessage = true;

            // act
            sut.removeButtonLinesForLivePersonIntegration([account1, account2]);

            // assert
            expect(account2.hasButtonLineAboveMessage).toBe(false);
            expect(account2.hasButtonLineBelowMessage).toBe(false);
        });

        it('keep consolidated chat button line of an account model if no account or fuel model of same live person type before it already has chat button', () => {
            // arrange
            const account1 = new BillSmoothingAccountModel();
            account1.hasConsolidatedChatButton = true;
            account1.livePersonEngagementType = LivePersonEngagementTypes.LPBillSmoothingOverdue;
            account1.billSmoothingFuelModel = [];
            account1.hasButtonLineAboveMessage = true;
            account1.hasButtonLineBelowMessage = true;
            const account2 = new BillSmoothingAccountModel();
            account2.livePersonEngagementType = LivePersonEngagementTypes.LPBillSmoothingOverdue;
            account2.hasConsolidatedChatButton = true;
            account2.billSmoothingFuelModel = [];

            // act
            sut.removeButtonLinesForLivePersonIntegration([account1, account2]);

            // assert
            expect(account1.hasButtonLineAboveMessage).toBe(true);
            expect(account1.hasButtonLineBelowMessage).toBe(true);
        });
    });

    describe('updateLivePersonEngagementType', () => {
        it('overdue', (done) => {
            // arrange
            const accountNumber = 123456789;
            let mockAccounts = new Array<AccountViewModel>();
            let mockEstimates = createAccountEstimatesModel(accountNumber, AccountEstimatesModelTypes.error);
            let settings = createSettingsModel('123456789');
            let contractAccount = createContractAccountViewModel('123456789');
            contractAccount.contracts[0].isBillSmoothingV2 = false;
            contractAccount.contracts[1].isBillSmoothingV2 = false;
            mockAccounts.push(contractAccount);
            spyOn(accountService, 'getAccounts').and.returnValue(Observable.of(mockAccounts));
            spyOn(settingsService, 'getSettings').and.returnValue(Observable.of(settings));
            spyOn(apiService, 'getBillSmoothingEstimates').and.returnValue(Observable.of(mockEstimates));

            // act
            sut.generateBillSmoothingViewModel().subscribe((accountModels: BillSmoothingAccountModel[]) => {
                const account = accountModels.find((a) => a.accountDetailModel.contractAccountNumber === accountNumber.toString());
                // assert
                expect(account.livePersonEngagementType).toBe(LivePersonEngagementTypes.LPBillSmoothingOverdue);
                done();
            });
        });

        it('on Bill Smoothing', (done) => {
            // arrange
            const accountNumber = 123456789;
            let mockAccounts = new Array<AccountViewModel>();
            let mockEstimates = createAccountEstimatesModel(accountNumber, AccountEstimatesModelTypes.onBillSmoothing);
            let settings = createSettingsModel('123456789');
            let contractAccount = createContractAccountViewModel('123456789');
            contractAccount.contracts[0].isBillSmoothingV2 = true;
            contractAccount.contracts[1].isBillSmoothingV2 = true;
            mockAccounts.push(contractAccount);
            spyOn(accountService, 'getAccounts').and.returnValue(Observable.of(mockAccounts));
            spyOn(settingsService, 'getSettings').and.returnValue(Observable.of(settings));
            spyOn(apiService, 'getBillSmoothingEstimates').and.returnValue(Observable.of(mockEstimates));

            // act
            sut.generateBillSmoothingViewModel().subscribe((accountModels: BillSmoothingAccountModel[]) => {
                const account = accountModels.find((a) => a.accountDetailModel.contractAccountNumber === accountNumber.toString());
                // assert
                expect(account.livePersonEngagementType).toBe(LivePersonEngagementTypes.LPBillSmoothingModify);
                done();
            });
        });

        it('overdue and on Bill Smoothing', (done) => {
            // arrange
            const accountNumber = 123456789;
            let mockAccounts = new Array<AccountViewModel>();
            let mockEstimates = createAccountEstimatesModel(accountNumber, AccountEstimatesModelTypes.onBillSmoothingErrorMix);
            let settings = createSettingsModel('123456789');
            let contractAccount = createContractAccountViewModel('123456789');
            contractAccount.contracts[0].isBillSmoothingV2 = true;
            contractAccount.contracts[1].isBillSmoothingV2 = false;
            mockAccounts.push(contractAccount);
            spyOn(accountService, 'getAccounts').and.returnValue(Observable.of(mockAccounts));
            spyOn(settingsService, 'getSettings').and.returnValue(Observable.of(settings));
            spyOn(apiService, 'getBillSmoothingEstimates').and.returnValue(Observable.of(mockEstimates));

            // act
            sut.generateBillSmoothingViewModel().subscribe((accountModels: BillSmoothingAccountModel[]) => {
                const account = accountModels.find((a) => a.accountDetailModel.contractAccountNumber === accountNumber.toString());
                // assert
                expect(account.livePersonEngagementType).toBe(LivePersonEngagementTypes.LPBillSmoothingOverdueAndModify);
                done();
            });
        });
    });

    describe('getBillSmoothingInternalErrorTypeBySapErrorNumber', () => {

        let contract: ContractViewModel;

        beforeEach(() => {
            contract = createContractViewModel('123456789', '12345', 'Electricity');
        });

        it('should return an internal error type of GeneralIneligibility when an SAP error of IneligibleOverdue is received and the contract due date has been extended.', () => {
            contract.extendedDueDate = new Date('2018/05/03');
            let result = sut.getBillSmoothingInternalErrorTypeBySapErrorNumber(SapBillSmoothingErrorTypes.IneligibleOverdue, contract);
            expect(result).toEqual(BillSmoothingInternalErrorTypes.GeneralIneligibility);
        });

        it('should return an internal error type of GeneralIneligibility when an SAP error of IneligibleOverdue is received and the contract has instalment plans.', () => {
            contract.instalmentPlan = new InstalmentPlanData(undefined, undefined);
            let result = sut.getBillSmoothingInternalErrorTypeBySapErrorNumber(SapBillSmoothingErrorTypes.IneligibleOverdue, contract);
            expect(result).toEqual(BillSmoothingInternalErrorTypes.GeneralIneligibility);
        });

        it('should return an internal error type of PAYG when an SAP error of IneligibleOnAGLPrepaid is received', () => {
            let result = sut.getBillSmoothingInternalErrorTypeBySapErrorNumber(SapBillSmoothingErrorTypes.IneligibleOnAGLPrepaid, contract);
            expect(result).toEqual(BillSmoothingInternalErrorTypes.Payg);
        });

        it('should return an internal error type of BillSmoothingV1 when an SAP error of IneligibleOnBillSoomthingV1 is received', () => {
            let result = sut.getBillSmoothingInternalErrorTypeBySapErrorNumber(SapBillSmoothingErrorTypes.IneligibleOnBillSoomthingV1, contract);
            expect(result).toEqual(BillSmoothingInternalErrorTypes.BillSmoothingV1);
        });

        it('should return an internal error type of GeneralIneligibility when an SAP error of IneligibleGeneric is received', () => {
            let result = sut.getBillSmoothingInternalErrorTypeBySapErrorNumber(SapBillSmoothingErrorTypes.IneligibleGeneric, contract);
            expect(result).toEqual(BillSmoothingInternalErrorTypes.GeneralIneligibility);
        });

    });

    // HELPER FUNCTIONS:
    function createContractAccountViewModel(accountId: string): AccountViewModel {
        let contractAccountViewModel = new AccountViewModel(accountId);
        let groupedAddress = '123 street st';
        contractAccountViewModel.groupedAddress = groupedAddress;

        let contract1 = createContractViewModel(accountId, '12345', 'Electricity');
        let contract2 = createContractViewModel(accountId, '23456', 'Gas');
        contractAccountViewModel.contracts.push(contract1);
        contractAccountViewModel.contracts.push(contract2);
        return contractAccountViewModel;
    }

    function createContractAccountViewModelWithDuplicateFuels(accountId: string): AccountViewModel {
        let contractAccountViewModel = new AccountViewModel(accountId);
        let groupedAddress = '123 street st';
        contractAccountViewModel.groupedAddress = groupedAddress;

        contractAccountViewModel.contracts.push(createContractViewModel(accountId, '12345', 'Electricity'));
        contractAccountViewModel.contracts.push(createContractViewModel(accountId, '23456', 'Gas'));
        contractAccountViewModel.contracts.push(createContractViewModel(accountId, '54687', 'Gas'));
        return contractAccountViewModel;
    }

    function createContractViewModel(accountId: string, contractId: string, fuelType: string): ContractViewModel {
        let contractViewModel = new ContractViewModel(contractId);
        contractViewModel.accountNumber = accountId;
        contractViewModel.fuelType = fuelType;
        contractViewModel.isDirectDebit = true;
        contractViewModel.paymentOverdue = 0;
        contractViewModel.isBillSmoothingV2 = true;
        contractViewModel.paymentScheme = new PaymentSchemeDisplayModel();
        return contractViewModel;
    }

    function createAccountEstimatesModel(accountNo: number, type?: AccountEstimatesModelTypes): BillSmoothingAccountsViewModel {
        let accountEstimatesModel = new BillSmoothingAccountsViewModel();
        accountEstimatesModel.contractAccountNumber = accountNo;

        let estimate1: BillSmoothingEstimatesViewModel;
        let estimate2: BillSmoothingEstimatesViewModel;

        if (type === AccountEstimatesModelTypes.paymentOptions) {
            estimate1 = createContractEstimatesModel(12345, AccountEstimatesModelTypes.paymentOptions);
            estimate2 = createContractEstimatesModel(23456, AccountEstimatesModelTypes.paymentOptions);
        } else if (type === AccountEstimatesModelTypes.error) {
            estimate1 = createContractEstimatesModel(12345, AccountEstimatesModelTypes.error);
            estimate2 = createContractEstimatesModel(23456, AccountEstimatesModelTypes.error);
        } else if (type === AccountEstimatesModelTypes.onBillSmoothingErrorMix) {
            estimate1 = createContractEstimatesModel(12345, null);
            estimate2 = createContractEstimatesModel(23456, AccountEstimatesModelTypes.error);
        } else if (type === AccountEstimatesModelTypes.onBillSmoothing) {
            estimate1 = createContractEstimatesModel(12345, null);
            estimate2 = createContractEstimatesModel(23456, null);
        } else if (type === AccountEstimatesModelTypes.errorUnknown) {
            estimate1 = createContractEstimatesModel(12345, AccountEstimatesModelTypes.errorUnknown);
            estimate2 = createContractEstimatesModel(23456, AccountEstimatesModelTypes.errorUnknown);
        }

        if (type === AccountEstimatesModelTypes.customerHardship) {
            accountEstimatesModel.error = {
                message: 'Customer hardship error',
                internalError: {
                    errorId: 'ZIFI516',
                    errorNumber: '016',
                    description: 'Customer has hardship'
                }
            };
        } else {
            accountEstimatesModel.estimates = [estimate1, estimate2];
        }

        return accountEstimatesModel;
    }

    function createAccountEstimatesModelWithDuplicateFuels(accountNo: number, type?: AccountEstimatesModelTypes): BillSmoothingAccountsViewModel {
        let accountEstimatesModel = new BillSmoothingAccountsViewModel();
        accountEstimatesModel.contractAccountNumber = accountNo;

        accountEstimatesModel.estimates = [];
        accountEstimatesModel.estimates.push(createContractEstimatesModel(12345, type));
        accountEstimatesModel.estimates.push(createContractEstimatesModel(23456, type));
        accountEstimatesModel.estimates.push(createContractEstimatesModel(54687, type));
        return accountEstimatesModel;
    }

    function createContractEstimatesModel(contractNo: number, type?: AccountEstimatesModelTypes): BillSmoothingEstimatesViewModel {
        let contractEstimatesModel = new BillSmoothingEstimatesViewModel();
        contractEstimatesModel.contractNumber = contractNo;
        if (type === AccountEstimatesModelTypes.paymentOptions) {
            contractEstimatesModel.paymentOptions = [
                {
                    frequency: 'Weekly',
                    amount: '13',
                    minDate: '2017-05-01T14:00:00Z',
                    maxDate: '2017-07-01T14:00:00Z',
                    excludedDates: []
                }
            ];
        }
        if (type === AccountEstimatesModelTypes.error) {
            contractEstimatesModel.error = {
                message: 'Contract 566643 unbilled for 358 days – Ineligible for Payment scheme.',
                internalError: {
                    errorId: 'ZIFI511',
                    errorNumber: '004',
                    description: 'Contract 566643 unbilled for 358 days – Ineligible for Payment scheme.'
                }
            };
        }
        const unknownErrorNumber = '10000'; // unknown error number
        if (type === AccountEstimatesModelTypes.errorUnknown) {
            contractEstimatesModel.error = {
                message: 'Contract 566643 unbilled for 358 days – Ineligible for Payment scheme.',
                internalError: {
                    errorId: 'ZIFI511',
                    errorNumber: unknownErrorNumber,
                    description: 'Contract 566643 unbilled for 358 days – Ineligible for Payment scheme.'
                }
            };
        }
        return contractEstimatesModel;
    }

    function createSettingsModel(accountId: string) {
        let settingsModel = new SettingsAggregateModel();
        settingsModel.billDeliveryMethodList = [];
        settingsModel.billDeliveryMethodList.push(new BillDeliveryMethod(accountId, BillDeliveryMethodType.Email));
        return settingsModel;
    }
});

enum AccountEstimatesModelTypes {
    paymentOptions,
    error,
    onBillSmoothingErrorMix,
    onBillSmoothing,
    errorUnknown,
    customerHardship
}
