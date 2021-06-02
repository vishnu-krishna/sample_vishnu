
import { Observable } from 'rxjs/Observable';
import { SolarCheckEligibilityContract } from '../../../shared/model/solar/solarCheckEligibility.model';
import { AccountViewModel } from '../account.service';

export abstract class ISolarCheckOfferService {
    public abstract checkAccountHasSolar(accounts: AccountViewModel[]): boolean;
    public abstract isRegistered(): Observable<boolean>;
    public abstract isEligible(): Observable<boolean>;
    public abstract isDeregistrationPending(): Observable<boolean>;
    public abstract getEligibleContract(): Observable<SolarCheckEligibilityContract>;
}
