import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SHA512 } from 'crypto-js';
import * as Base64 from 'crypto-js/enc-base64';

import { IBusinessPartnerNumberService } from '../../services/contract/ibusinessPartnerNumber.service';
import { BusinessPartnerNumber } from '../businessPartnerNumber/model/businessPartnerNumber';
import { IApiService } from '../../../shared/service/contract/iapi.service';

@Injectable()
export class BusinessPartnerNumberService  implements IBusinessPartnerNumberService {
    private businessPartnerNumber: string = null;
    private businessPartnerNumberHashed: string;

    constructor(private _apiService: IApiService) {
    }
    public getBusinessPartnerNumber(): Observable<BusinessPartnerNumber> {
        return new Observable((observer) => {
            if (this.businessPartnerNumber === null) {
                this._apiService.getContactDetail().subscribe((content) => {
                    let result: BusinessPartnerNumber;
                    if (content) {
                        if (content.businessPartners && content.businessPartners.length > 0) {
                            this.businessPartnerNumber = content.businessPartners[0].businessPartnerNumber;
                            // Hashed business partner number is used Single customer Id database matching
                            // Also a requirement to not send raw BpId to Analytics but hashed version instead
                            this.businessPartnerNumberHashed = Base64.stringify(SHA512(this.businessPartnerNumber));
                            result = new BusinessPartnerNumber(this.businessPartnerNumber, this.businessPartnerNumberHashed);
                        } else {
                            this.setBusinessPartnerNumberToEmpty();
                            result = new BusinessPartnerNumber(this.businessPartnerNumber, this.businessPartnerNumberHashed);
                        }
                        observer.next(result);
                        observer.complete();
                    }}, (error) => {
                        this.setBusinessPartnerNumberToEmpty();
                        let result = new BusinessPartnerNumber(this.businessPartnerNumber, this.businessPartnerNumberHashed);
                        observer.next(result);
                        observer.complete();
                    });
            } else {
                let result = new BusinessPartnerNumber(this.businessPartnerNumber, this.businessPartnerNumberHashed);
                observer.next(result);
                observer.complete();
            }
        });
    }

    private setBusinessPartnerNumberToEmpty(): void {
        this.businessPartnerNumber = '';
        this.businessPartnerNumberHashed = '';
    }
}
