import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { IConcessionApi, ConcessionStatus, Issuer, SaveConcessionRequest } from '../../myAccount/services/concession/concessionApi.service';

@Injectable()
export class ConcessionApiStubService implements IConcessionApi {
    public getEligibleConcessionCards(regionId: string, fuelTypes: string[]): Observable<Issuer[]> {
        throw new Error('Method not implemented.');
    }

    public getConcessionStatus(bpId: string): Observable<ConcessionStatus> {
        throw new Error('Method not implemented.');
    }

    public saveConcession(businessPartnerNumber: string, request: SaveConcessionRequest): Observable<number> {
        throw new Error('Method not implemented.');
    }
}
