import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IEligibilityService } from '../../shared/service/contract/ieligibility.service';
import { EligibilityModel } from './../../shared/model/oneMinMove/eligibility.model';

@Injectable()
export class EligibilityStubService implements IEligibilityService {
    public CheckEligibilityMyAccount(): Observable<EligibilityModel[]> {
        throw new Error('Method not implemented.');
    }
    public CheckEligibility(): Observable<EligibilityModel[]> {
        throw new Error('Method not implemented.');
    }
    public CheckEligibilityV2(): Observable<EligibilityModel[]> {
        throw new Error('Method not implemented.');
    }

}
