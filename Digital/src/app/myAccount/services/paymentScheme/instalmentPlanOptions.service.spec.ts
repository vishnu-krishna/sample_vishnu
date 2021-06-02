
import { async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

import { PaymentSchemeApiStubService } from '../../../test/stubs/paymentSchemeApi.stub';
import { InstalmentPlanOptionsService, InstalmentOption, InstalmentCustomPlan } from './instalmentPlanOptions.service';
import { AccountMockService } from '../mock/account.mock.service';
import { PaymentExtensionFuelChipMockService } from '../mock/paymentExtensionFuelChip.mock.service';
import { PaymentExtensionStateMockService } from '../mock/paymentExtensionState.mock.service';
import { InstalmentPlanFrequency, GetPaymentArrangementInstalmentPlanOptionsParams } from './paymentSchemeApi.service';
import { FuelChipData } from '../../pages/bills/paymentAssistance/extend/eligibility/fuelChipData';
import { MauiFuelChipFuelType, MauiFuelChipFuelContext, FuelChipContractAccountDetails, FuelChipContract } from '../../maui/fuelChip';
import { PaymentExtensionContractEligibility, PaymentExtensionIneligibilityReasons } from './paymentExtensionEligibility.service';
import { ClassifiedFuelChips } from '../../pages/bills/paymentAssistance/extend/eligibility/services/fuelChipClassification.service';
import { AccountViewModel, ContractViewModel } from '../account.service';

describe('Instalment plan options service', () => {
    let sut: InstalmentPlanOptionsService;
    let apiStub: PaymentSchemeApiStubService;
    let accountStub: AccountMockService;
    let fuelChipStub: PaymentExtensionFuelChipMockService;
    let paymentExtensionStateStub: PaymentExtensionStateMockService;

    const contractAccountNumber: string = '111111111';
    const contractNumber: string = '123456789';
    const contractNumber2: string = '234567890';
    const minStartDate = new Date('2018-03-01');
    const maxStartDate = new Date('2018-03-14');
    let suggestInstalments: boolean = false;

    beforeEach(() => {
        apiStub = new PaymentSchemeApiStubService();
        accountStub = new AccountMockService();
        fuelChipStub = new PaymentExtensionFuelChipMockService();
        paymentExtensionStateStub = new PaymentExtensionStateMockService();
        sut = new InstalmentPlanOptionsService(apiStub, accountStub, fuelChipStub, paymentExtensionStateStub);
    });

    describe('Get and map instalment options', () => {
        it('should map api results to InstalmentOptions results', async(() => {
            const apiResponse = createInstalmentOptionApiResponse();
            const spy = spyOn(apiStub, 'getPaymentArrangementInstalmentPlanOptions').and.returnValue(Observable.of(apiResponse));

            const results = sut.getInstalmentOptions(contractNumber, { suggestInstalments: suggestInstalments });
            let index = 0;

            results.subscribe({
                next: (instalmentOptions: InstalmentOption[]) => {
                    const expectedParams: GetPaymentArrangementInstalmentPlanOptionsParams = {
                        suggestInstalments: suggestInstalments
                    };

                    expect(spy).toHaveBeenCalledWith(contractNumber, expectedParams);
                    expect(instalmentOptions.length).toBe(3);

                    if (index === 0) {
                        expect(instalmentOptions[index].frequency).toEqual(InstalmentPlanFrequency.Weekly);
                        expect(instalmentOptions[index].minStartDate).toEqual(minStartDate);
                        expect(instalmentOptions[index].maxStartDate).toEqual(maxStartDate);
                        expect(instalmentOptions[index].instalmentMinAmount).toEqual(30);
                        expect(instalmentOptions[index].instalmentMaxAmount).toEqual(60);
                    }
                    if (index === 1) {
                        expect(instalmentOptions[index].frequency).toEqual(InstalmentPlanFrequency.Fortnightly);
                        expect(instalmentOptions[index].minStartDate).toContain(minStartDate);
                        expect(instalmentOptions[index].maxStartDate).toContain(maxStartDate);
                        expect(instalmentOptions[index].instalmentSuggestions).toEqual(null);
                        expect(instalmentOptions[index].instalmentMinAmount).toEqual(null);
                        expect(instalmentOptions[index].instalmentMaxAmount).toEqual(null);
                    }
                    if (index === 2) {
                        expect(instalmentOptions[index].frequency).toEqual(InstalmentPlanFrequency.Monthly);
                        expect(instalmentOptions[index].minStartDate).toBe(minStartDate);
                        expect(instalmentOptions[index].maxStartDate).toBe(maxStartDate);
                        expect(instalmentOptions[index].instalmentSuggestions).toEqual(null);
                        expect(instalmentOptions[index].instalmentMinAmount).toEqual(null);
                        expect(instalmentOptions[index].instalmentMaxAmount).toEqual(null);
                    }

                    index++;
                }
            });
        }));

        it('should return error when api fails and throws observable errors', async(() => {
            const expectedError = 'an error occurred';
            const spy = spyOn(apiStub, 'getPaymentArrangementInstalmentPlanOptions').and.returnValue(Observable.throw(expectedError));

            const results = sut.getInstalmentOptions(contractNumber, { suggestInstalments: suggestInstalments });

            results.subscribe(
                () => { fail('expected an error'); },
                (error) => {
                    expect(error).toBe(expectedError);
                });
        }));
    });

    describe('Init a instalment plan custom options session', () => {
        it('should map api results to InstalmentOptions results', (done) => {
            const fuelChipServiceSpy = spyOn(fuelChipStub, 'init').and.returnValue(Observable.of(createClassifiedFuelChipData()));
            const accountServiceSpy = spyOn(accountStub, 'getAccounts').and.returnValue(Observable.of(createAccountViewModel()));
            const instalmentOptionsSpy = spyOn(apiStub, 'getPaymentArrangementInstalmentPlanOptions').and.returnValue(Observable.of(createInstalmentOptionApiResponseForCustomPage()));
            const paymentExtensionStateServiceSpy = spyOn(paymentExtensionStateStub, 'initNewSession').and.returnValue(Observable.of([createEligibleFuelChipsData()]));

            const results = sut.initCustomInstalmentPlanSession(contractAccountNumber, contractNumber);
            results.subscribe((instalmentCustomPlan: InstalmentCustomPlan) => {
                    expect(paymentExtensionStateServiceSpy).toHaveBeenCalledWith(contractNumber, [createEligibleFuelChipsData()]);
                    expect(instalmentCustomPlan.fuelChipData).toEqual(createEligibleFuelChipsData());
                    expect(instalmentCustomPlan.currentBillEndDate).toEqual(new Date('2018-06-01'));
                    expect(instalmentCustomPlan.instalmentOptions.length).toBe(1);
                    done();
            });
        });
    });

    function createInstalmentOptionApiResponse() {
        return [
            {
                frequency: InstalmentPlanFrequency.Weekly,
                minStartDate: minStartDate,
                maxStartDate: maxStartDate,
                instalmentMinAmount: 30,
                instalmentMaxAmount: 60,
            },
            {
                frequency: InstalmentPlanFrequency.Fortnightly,
                minStartDate: minStartDate,
                maxStartDate: maxStartDate,
                instalmentMinAmount: null,
                instalmentMaxAmount: null,
            },
            {
                frequency: InstalmentPlanFrequency.Monthly,
                minStartDate: minStartDate,
                maxStartDate: maxStartDate,
                instalmentMinAmount: null,
                instalmentMaxAmount: null,
            }
        ];
    }

    // options returned for custom page don't have "instalmentSuggestions"
    function createInstalmentOptionApiResponseForCustomPage() {
        return [
            {
                frequency: InstalmentPlanFrequency.Weekly,
                minStartDate: minStartDate,
                maxStartDate: maxStartDate,
                instalmentSuggestions: null,
                instalmentMinAmount: 30,
                instalmentMaxAmount: 60,
            }
        ];
    }

    function createClassifiedFuelChipData(): ClassifiedFuelChips {
        return new ClassifiedFuelChips([createEligibleFuelChipsData()], null, null, null);
    }

    function createEligibleFuelChipsData(): FuelChipData {
        return new FuelChipData(contractAccountNumber, contractNumber, MauiFuelChipFuelType.Electricity, createFuelChipContractAccountDetail(), createPaymentExtensionContractEligibility(), MauiFuelChipFuelContext.None);
    }

    function createPaymentExtensionContractEligibility(): PaymentExtensionContractEligibility {
        return new PaymentExtensionContractEligibility(contractNumber, true, PaymentExtensionIneligibilityReasons.None, 100);
    }

    function createFuelChipContractAccountDetail(): FuelChipContractAccountDetails[] {
        return [new FuelChipContractAccountDetails(contractAccountNumber, [new FuelChipContract(contractNumber, '123 Blyth St, Brunswick VIC 3056', MauiFuelChipFuelType.Gas, 'VIC'), new FuelChipContract(contractNumber2, '321 Blyth St, Brunswick VIC 3056', MauiFuelChipFuelType.Electricity, 'VIC')])];
    }

    function createAccountViewModel(): AccountViewModel[] {
        return [new AccountViewModel(contractAccountNumber, createContractViewModel())];
    }

    function createContractViewModel(): ContractViewModel[] {
        const contract = new ContractViewModel(contractNumber);
        contract.accountNumber = contractAccountNumber;
        contract.currentBillEndDate = new Date('2018-06-01');
        return [contract];
    }
});
