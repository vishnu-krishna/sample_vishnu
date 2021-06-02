import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RatesModel } from '../../shared/component/ratesTable/ratesTable.model';
import { PricingInfoSearchModel } from '../model/oneMinMove/pricingInfoSearch.model';
import { IPricingInfoService } from './contract/ipricinginfo.service';
@Injectable()
export class PricingInfoService implements IPricingInfoService {

    /**
     * Creates an instance of PricingInfoService.
     */
    constructor(private _http: Http) { }

    public getPricingInfo(pricingInfoRFG: PricingInfoSearchModel): Observable<RatesModel[]> {
        return this._http.post('/svc/QuickQuoteSAPData/FindPricingInfo/', pricingInfoRFG)
            .map((result) => result.json())
            .catch(this.handleError);
    }

    /**
     * Handle HTTP error
     */
    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
