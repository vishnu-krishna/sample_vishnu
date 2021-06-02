
import { async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { PaymentSchemeApiStubService } from '../../../test/stubs/paymentSchemeApi.stub';
import { PaymentExtensionApplicationService } from './paymentExtensionApplication.service';

describe('Payment extension application service', () => {
    let sut: PaymentExtensionApplicationService;
    let apiStub: PaymentSchemeApiStubService;
    let routerStub: any;

    beforeEach(() => {
        apiStub = new PaymentSchemeApiStubService();
        sut = new PaymentExtensionApplicationService(routerStub, apiStub);
    });

    it('should submit extendedDueDate when api call successful', async(() => {
        const contractNumber = '123';
        const extendedDueDate = new Date('2017-01-01');

        // arrange
        spyOn(apiStub, 'submitPaymentArrangementExtension').and.returnValue(Observable.of(null));

        // act
        const result = sut.submit(contractNumber, extendedDueDate);

        // assert
        expect(apiStub.submitPaymentArrangementExtension).toHaveBeenCalledWith(contractNumber, extendedDueDate);

        result.subscribe((r) => {
            expect(r).toEqual(true);
        });
    }));

    it('should return false when api call failed', async(() => {
        const contractNumber = '123';
        const extendedDueDate = new Date('2017-01-01');

        // arrange
        spyOn(apiStub, 'submitPaymentArrangementExtension').and.returnValue(Observable.throw({ status: 500 }));

        // act
        const result = sut.submit(contractNumber, extendedDueDate);

        // assert
        expect(apiStub.submitPaymentArrangementExtension).toHaveBeenCalledWith(contractNumber, extendedDueDate);

        result.subscribe((r) => {
            expect(r).toEqual(false);
        });
    }));
});
