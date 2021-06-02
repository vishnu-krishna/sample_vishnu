import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { URLSearchParams } from '@angular/http';
import { SetupEnergyInsightsRequest } from '../../services/settings/model/setupEnergyInsightsRequest';
import { EnergyInsightsEligibilityContract } from '../../services/settings/model/energyInsightsEligibilityContract';

export abstract class IEnergyInsightsRepository {
    public abstract getEligibilityAndSubscriptionStatus(accountNumber: string): Observable<EnergyInsightsEligibilityContract[]>;
    public abstract setupEnergyInsights(contractNumber: string, setupEnergyInsightsRequest: SetupEnergyInsightsRequest): Observable<any>;
}
