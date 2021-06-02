import { Observable } from 'rxjs/Observable';

import { AddressSearchModel } from '../../model/oneMinMove/addressSearch.model';
import { RateFactGroupModel } from '../../model/oneMinMove/rateFactGroup.model';

export abstract class IRateFactGroupService {
    public errorRateFactGroups;
    public rateFactGroup;
    public abstract getRateFactGroupModel(): RateFactGroupModel;
    public abstract GetRateFactGroup(addressSearch: AddressSearchModel): Observable<RateFactGroupModel>;
    public abstract hasRateFactGroupError(fuel: string, rateFactGroup: string): boolean;
}
