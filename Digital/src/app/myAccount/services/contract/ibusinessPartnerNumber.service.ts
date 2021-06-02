import { Observable } from 'rxjs/Observable';
import { BusinessPartnerNumber } from '../businessPartnerNumber/model/businessPartnerNumber';

export abstract class IBusinessPartnerNumberService {
    public abstract getBusinessPartnerNumber(): Observable<BusinessPartnerNumber>;
}
