
import { async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { PaymentSchemeApiStubService } from '../../../test/stubs/paymentSchemeApi.stub';
import { PaymentExtensionContractEligibility, PaymentExtensionEligibilityService, PaymentExtensionIneligibilityReasons } from './paymentExtensionEligibility.service';
import { PaymentArrangementExtensionOptions } from './paymentSchemeApi.service';

describe('Payment extension eligibility service', () => {
    let sut: PaymentExtensionEligibilityService;
    let apiStub: PaymentSchemeApiStubService;

    beforeEach(() => {
        apiStub = new PaymentSchemeApiStubService();
        sut = new PaymentExtensionEligibilityService(apiStub);
    });

    it('should map multiple api results to multiple PaymentExtensionContractEligibility results', async(() => {
        const expectedDueDate = new Date('2017-05-01');
        const expectedExtensionDueDate = new Date('2017-05-10');

        let apiResults: PaymentArrangementExtensionOptions = {
            contractAccountNumber: 123,
            extensionOptions: [{
                contractNumber: 111,
                isEligible: true,
                dueDate: expectedDueDate,
                totalDueAmount: 123.45,
                dueDateExtensions: [
                    {
                        numberOfDays: 45,
                        date: expectedExtensionDueDate
                    }
                ],
                error: null
            },
            {
                contractNumber: 222,
                isEligible: false,
                error: {
                    message: 'Ineligible',
                    internalError: {
                        errorNumber: '123456789'
                    }
                }
            }]
        };

        const contractAccountNumber = '123';
        const spy = spyOn(apiStub, 'getPaymentArrangementExtensionOptions').and.returnValue(Observable.of(apiResults));

        let results = sut.getContractAccountEligibility(contractAccountNumber);
        let count = 0;

        results.subscribe({
            next: (eligibility: PaymentExtensionContractEligibility) => {
                expect(spy).toHaveBeenCalledWith(contractAccountNumber);

                count++;
                if (count === 1) {
                    expect(eligibility.contractNumber).toBe('111');
                    expect(eligibility.isEligible).toBe(true);
                    expect(eligibility.dueDate).toBe(expectedDueDate);
                    expect(eligibility.totalAmountDue).toBe(123.45);
                    expect(eligibility.reasonForIneligibility).toBe(PaymentExtensionIneligibilityReasons.None);
                    expect(eligibility.availableExtensionDates.length).toBe(1);
                    expect(eligibility.availableExtensionDates[0].numberOfDays).toBe(45);
                    expect(eligibility.availableExtensionDates[0].dueDate).toBe(expectedExtensionDueDate);
                } else {
                    expect(eligibility.contractNumber).toBe('222');
                    expect(eligibility.isEligible).toBe(false);
                    expect(eligibility.reasonForIneligibility).toBe(PaymentExtensionIneligibilityReasons.Unknown);
                    expect(eligibility.availableExtensionDates.length).toBe(0);
                }
            },
            error: () => { fail('unexpected error'); },
            complete: () => {
                expect(count).toBe(2);
            }
        });
    }));

    it('should return error when api observable errors', async(() => {
        const expectedError = 'an error occurred';
        const spy = spyOn(apiStub, 'getPaymentArrangementExtensionOptions').and.returnValue(Observable.throw(expectedError));

        let results = sut.getContractAccountEligibility('123');

        results.subscribe(
            () => { fail('expected an error'); },
            (error) => {
                expect(error).toBe('Unable to determine payment extension eligibility 123');
            });
    }));

    it('should map api errorNumber 027 to PaymentExtensionIneligibilityReasons.AlreadyExtended', async(() => {
        let apiResults = createPaymentArrangementExtensionOptionsWithApiError('027');

        const spy = spyOn(apiStub, 'getPaymentArrangementExtensionOptions').and.returnValue(Observable.of(apiResults));

        let results = sut.getContractAccountEligibility('123');

        results.subscribe((eligibility: PaymentExtensionContractEligibility) => {
            expect(eligibility.isEligible).toBe(false);
            expect(eligibility.reasonForIneligibility).toBe(PaymentExtensionIneligibilityReasons.AlreadyExtended);
            expect(eligibility.availableExtensionDates.length).toBe(0);
        });
    }));

    it('should map unknown api errorNumber to PaymentExtensionIneligibilityReasons.Unknown', async(() => {
        let apiResults = createPaymentArrangementExtensionOptionsWithApiError('999');

        const spy = spyOn(apiStub, 'getPaymentArrangementExtensionOptions').and.returnValue(Observable.of(apiResults));

        let results = sut.getContractAccountEligibility('123');

        results.subscribe((eligibility: PaymentExtensionContractEligibility) => {
            expect(eligibility.isEligible).toBe(false);
            expect(eligibility.reasonForIneligibility).toBe(PaymentExtensionIneligibilityReasons.Unknown);
            expect(eligibility.availableExtensionDates.length).toBe(0);
        });
    }));

    function createPaymentArrangementExtensionOptionsWithApiError(errorNumber: string): PaymentArrangementExtensionOptions {
        let apiResults: PaymentArrangementExtensionOptions = {
            contractAccountNumber: 123,
            extensionOptions: [{
                contractNumber: 111,
                isEligible: false,
                dueDate: new Date(),
                totalDueAmount: 123.45,
                dueDateExtensions: null,
                error: {
                    message: 'This contact is ineligible',
                    internalError: {
                        errorNumber: errorNumber
                    }
                }
            }]
        };

        return apiResults;
    }
});
