import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { IPaymentExtensionFuelChipService } from '../../pages/bills/paymentAssistance/extend/eligibility/services/paymentExtensionFuelChip.service';

import { ClassifiedFuelChips } from '../../pages/bills/paymentAssistance/extend/eligibility/services/fuelChipClassification.service';

@Injectable()
export class PaymentExtensionFuelChipMockService implements IPaymentExtensionFuelChipService {
    public get classifiedFuelChips(): ClassifiedFuelChips {
        throw new Error('Method not implemented.');
    }
    public init(): Observable<ClassifiedFuelChips> {
        throw new Error('Method not implemented.');
    }
}
