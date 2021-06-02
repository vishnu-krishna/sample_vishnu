import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { IInstalmentPlanSummaryService, InstalmentPlanSummaryResults } from '../paymentScheme/instalmentPlanSummary.service';
import { PaymentArrangementInstalmentSummary, InstalmentPlanParameters } from '../paymentScheme/paymentSchemeApi.service';

@Injectable()
export class InstalmentPlanSummaryMockService implements IInstalmentPlanSummaryService {
    public getInstalmentSummary(): InstalmentPlanSummaryResults {
        throw new Error('Method not implemented.');
    }
    public init(instalmentPlanParameters: InstalmentPlanParameters): Observable<PaymentArrangementInstalmentSummary> {
        throw new Error('Method not implemented.');
    }
    public initInstalmentPlanSummary(instalmentPlanParameters: InstalmentPlanParameters): Observable<InstalmentPlanSummaryResults> {
        throw new Error('Method not implemented.');
    }
}
