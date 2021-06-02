import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { ClassifiedFuelChips, IFuelChipClassificationService } from '../../pages/bills/paymentAssistance/extend/eligibility/services/fuelChipClassification.service';

import { FuelChipData } from '../../pages/bills/paymentAssistance/extend/eligibility/fuelChipData';

@Injectable()
export class FuelChipClassificationMockService implements IFuelChipClassificationService {
    public classify(fuelChipDetails: FuelChipData[]): Observable<ClassifiedFuelChips> {
        throw new Error('Method not implemented.');
    }
}
