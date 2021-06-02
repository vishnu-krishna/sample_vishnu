import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { IInstalmentPlanOptionsService, InstalmentOption, InstalmentCustomPlan } from '../paymentScheme/instalmentPlanOptions.service';

@Injectable()
export class InstalmentPlanOptionsMockService implements IInstalmentPlanOptionsService {
    public getInitialisedInstalmentOptions(): InstalmentOption[] {
        throw new Error('Method not implemented.');
    }
    public getInstalmentOptions(contractNumber: string): Observable<InstalmentOption[]> {
        throw new Error('Method not implemented.');
    }
    public initCustomInstalmentPlanSession(contractAccountNumber: string, contractNumber: string): Observable<InstalmentCustomPlan> {
        throw new Error('Method not implemented.');
    }
}
