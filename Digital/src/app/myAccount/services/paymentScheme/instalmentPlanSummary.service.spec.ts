import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { IInstalmentPlanSummaryService, InstalmentPlanSummaryResults, PaymentArrangementInstalmentSummaryItem, PaymentArrangementInstalmentSummary, InstalmentPlanSummaryService } from './instalmentPlanSummary.service';
import { PaymentSchemeApiStubService } from '../../../test/stubs/paymentSchemeApi.stub';
import { PaymentExtensionFuelChipMockService } from '../mock/paymentExtensionFuelChip.mock.service';
import { PaymentExtensionStateMockService } from '../mock/paymentExtensionState.mock.service';
import { FuelChipData } from '../../pages/bills/paymentAssistance/extend/eligibility/fuelChipData';
import { MauiFuelChipFuelType, FuelChipContractAccountDetails, FuelChipContract, MauiFuelChipFuelContext } from '../../maui/fuelChip';
import { InstalmentPlanParameters, InstalmentPlanFrequency } from './paymentSchemeApi.service';
import { ClassifiedFuelChips } from '../../pages/bills/paymentAssistance/extend/eligibility/services/fuelChipClassification.service';
import { PaymentExtensionContractEligibility, PaymentExtensionIneligibilityReasons } from './paymentExtensionEligibility.service';

describe('Instalment plan summary service', () => {

    let sut: InstalmentPlanSummaryService;
    let apiStub: PaymentSchemeApiStubService;
    let fuelChipStub: PaymentExtensionFuelChipMockService;
    let paymentExtensionStateStub: PaymentExtensionStateMockService;
    const instalments: PaymentArrangementInstalmentSummaryItem[] =
        [{ instalmentDate: '1/1/2018', instalmentAmount: 60 },
        { instalmentDate: '2/1/2018', instalmentAmount: 65 }
        ];
    const InstalmentSummary: PaymentArrangementInstalmentSummary = new PaymentArrangementInstalmentSummary(instalments);
    const contractAccountNumber: string = '140000';
    const contractNumber: string = '121212';
    const contractNumber2: string = '234567890';
    const eligibility: any = {
        contractNumber: '1422222222',
        isEligible: true,
        reasonForIneligibility: 0,
        totalAmountDue: 114.75,
        dueDate: '2017-12-08T14:00:00Z',
        availableExtensionDates: [
            {
                numberOfDays: 7,
                dueDate: '2017-12-15T14:00:00Z'
            }
        ]
    };
    const selectedFuelChipData = new FuelChipData('22', contractNumber, MauiFuelChipFuelType.Gas, null, eligibility, null);
    const instalmentPlanSummaryResults: InstalmentPlanSummaryResults = new InstalmentPlanSummaryResults(selectedFuelChipData, InstalmentSummary);
    const instalmentPlanParameters: InstalmentPlanParameters = new InstalmentPlanParameters();
    Object.assign(instalmentPlanParameters, {
        accountNumber: contractAccountNumber,
        contractNumber: contractNumber,
        frequency: InstalmentPlanFrequency.Weekly,
        instalmentAmount: 60,
        startDate: new Date('2018-03-16'),
        firstInstalmentDue: '16 Mar 2018'
    });

    beforeEach(() => {
        apiStub = new PaymentSchemeApiStubService();
        fuelChipStub = new PaymentExtensionFuelChipMockService();
        paymentExtensionStateStub = new PaymentExtensionStateMockService();
        sut = new InstalmentPlanSummaryService(apiStub, fuelChipStub, paymentExtensionStateStub);
    });

    it('should return InstalmentPlanSummaryResults when getInstalmentSummary is called', () => {

        // arrange
        sut.instalmentPlanSummaryResults = instalmentPlanSummaryResults;

        // act
        const results = sut.getInstalmentSummary();

        // assert
        expect(results).toBe(instalmentPlanSummaryResults);

    });

    it('should return PaymentArrangementInstalmentSummary when init is called ', async(() => {

        // arrange
        const spy = spyOn(apiStub, 'getPaymentArrangementInstalmentSummary').and.returnValue(Observable.of(createInstalmentSummaryApiResponse()));

        // act - assert
        const results = sut.init(instalmentPlanParameters);
        let index = 0;
        results.subscribe({
            next: (instalmentSummary: PaymentArrangementInstalmentSummary) => {
                expect(spy).toHaveBeenCalledWith(instalmentPlanParameters);
                expect(instalmentSummary.instalments.length).toBe(2);

                if (index === 0) {
                    expect(instalmentSummary.instalments[index].instalmentAmount).toEqual(instalments[index].instalmentAmount);
                    expect(instalmentSummary.instalments[index].instalmentDate).toEqual(instalments[index].instalmentDate);
                }
                if (index === 1) {
                    expect(instalmentSummary.instalments[index].instalmentAmount).toEqual(instalments[index].instalmentAmount);
                    expect(instalmentSummary.instalments[index].instalmentDate).toEqual(instalments[index].instalmentDate);
                }
                index++;
            }
        });
    }));

    it('should return error when InstalmentSummaryApi fails and throws observable errors', async(() => {

        // arrange
        const expectedError = 'an error occurred';
        const spy = spyOn(apiStub, 'getPaymentArrangementInstalmentSummary').and.returnValue(Observable.throw(expectedError));

        // act
        const results = sut.init(instalmentPlanParameters);

        // assert
        results.subscribe(
            () => { fail('expected an error'); },
            (error) => {
                expect(error).toBe(expectedError);
            });
    }));

    it('should return InstalmentPlanSummaryResults when initInstalmentPlanSummary is called', async(() => {

        // arrange
        const fuelChipServiceSpy = spyOn(fuelChipStub, 'init').and.returnValue(Observable.of(createClassifiedFuelChipData()));
        const initSpy = spyOn(sut, 'init').and.returnValue(Observable.of(createInitResponse()));
        const paymentExtensionStateServiceSpy = spyOn(paymentExtensionStateStub, 'initNewSession').and.returnValue(Observable.of([createEligibleFuelChipsData()]));

        // act
        const results = sut.initInstalmentPlanSummary(instalmentPlanParameters);

        // assert
        results.subscribe({
            next: (instalmentPlanSummary) => {

                expect(paymentExtensionStateServiceSpy).toHaveBeenCalledWith(contractNumber, [createEligibleFuelChipsData()]);
                expect(instalmentPlanSummary.fuelChipData).toEqual(createEligibleFuelChipsData());
                expect(instalmentPlanSummary.fuelChipData.contractNumber).toEqual(contractNumber);
                expect(instalmentPlanSummary.instalmentPlans.instalments.length).toEqual(2);
                expect(instalmentPlanSummary.instalmentPlans.instalments[0].instalmentDate).toEqual(instalments[0].instalmentDate);
                expect(instalmentPlanSummary.instalmentPlans.instalments[0].instalmentAmount).toEqual(instalments[0].instalmentAmount);
            }
        });

    }));

    it('should return error when init api fails and throws observable errors', async(() => {

        // arrange
        const expectedError = 'an error occurred';
        const fuelChipServiceSpy = spyOn(fuelChipStub, 'init').and.returnValue(Observable.of(createClassifiedFuelChipData()));
        const initSpy = spyOn(sut, 'init').and.returnValue(Observable.throw(expectedError));
        const paymentExtensionStateServiceSpy = spyOn(paymentExtensionStateStub, 'initNewSession').and.returnValue(Observable.of([createEligibleFuelChipsData()]));

        // act
        const results = sut.initInstalmentPlanSummary(instalmentPlanParameters);

        // assert
        results.subscribe(
            () => { fail('expected an error'); },
            (error) => {
                expect(error).toBe(expectedError);
            });
    }));

    function createInstalmentSummaryApiResponse(): PaymentArrangementInstalmentSummary {
        return InstalmentSummary;
    }

    function createInitResponse(): PaymentArrangementInstalmentSummary {
        return InstalmentSummary;
    }

    function createClassifiedFuelChipData(): ClassifiedFuelChips {
        return new ClassifiedFuelChips([createEligibleFuelChipsData()], null, null, null);
    }

    function createEligibleFuelChipsData(): FuelChipData {
        return new FuelChipData(contractAccountNumber, contractNumber, MauiFuelChipFuelType.Electricity,
            createFuelChipContractAccountDetail(), createPaymentExtensionContractEligibility(), MauiFuelChipFuelContext.None);
    }

    function createPaymentExtensionContractEligibility(): PaymentExtensionContractEligibility {
        return new PaymentExtensionContractEligibility(contractNumber, true, PaymentExtensionIneligibilityReasons.None, 100);
    }

    function createFuelChipContractAccountDetail(): FuelChipContractAccountDetails[] {
        return [new FuelChipContractAccountDetails(contractAccountNumber,
            [new FuelChipContract(contractNumber, '123 Blyth St, Brunswick VIC 3056', MauiFuelChipFuelType.Gas, 'VIC'),
            new FuelChipContract(contractNumber2, '321 Blyth St, Brunswick VIC 3056', MauiFuelChipFuelType.Electricity, 'VIC')
            ])
        ];
    }
});
