import { Observable } from 'rxjs/Observable';

import { RatesModel } from '../../../shared/component/ratesTable/ratesTable.model';
import { PricingInfoSearchModel } from '../../model/oneMinMove/pricingInfoSearch.model';

export abstract class IPricingInfoService {
    public abstract getPricingInfo(pricingInfoRFG: PricingInfoSearchModel): Observable<RatesModel[]>;
}
