import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { IPaymentExtensionEligibility, PaymentExtensionContractEligibility } from '../../services/paymentScheme/paymentExtensionEligibility.service';

@Injectable()
export class PaymentExtensionEligibilityMockService implements IPaymentExtensionEligibility {
    public getContractAccountEligibility(contractAccountNumber: string): Observable<PaymentExtensionContractEligibility> {
        throw new Error('Method not implemented.');
    }
}
