import { HttpRequest, HttpClient } from '@angular/common/http';

import { ApiClientBaseRepository } from './base/apiClientBase.repository';
import { IEnergyInsightsRepository } from './contract/iEnergyInsights.repository';
import { Observable } from 'rxjs/Observable';
import { SetupEnergyInsightsRequest } from '../services/settings/model/setupEnergyInsightsRequest';
import { Guid } from '../../shared/utils/guid';
import { ConfigService } from '../../shared/service/config.service';
import { AglAuthTokenProvider } from '../../shared/repository/aglAuthTokenProvider';
import { Injectable } from '@angular/core';
import { EnergyInsightsUsage } from '../services/settings/model/energyInsightsUsage';
import { EnergyInsightsEligibilityContract } from '../services/settings/model/energyInsightsEligibilityContract';

/*
BASED UPON https://app.swaggerhub.com/apis/AGL/EnergyInsights/1.0.0#/Energy_Insights/SaveEnergyInsightsSubscriptions
*/

@Injectable()
export class EnergyInsightsApiRepository extends ApiClientBaseRepository implements IEnergyInsightsRepository {

    constructor(
        protected httpClient: HttpClient,
        protected configService: ConfigService,
        protected tokenProvider: AglAuthTokenProvider,
    ) {
        super(
            httpClient,
            configService,
            configService.current.aglEnergyInsightsApiBaseUrl
        );
    }

    public getEligibilityAndSubscriptionStatus(accountNumber: string): Observable<EnergyInsightsEligibilityContract[]> {
        if (!accountNumber) {
            return Observable.throw(`accountNumber was empty`);
        }
        if (isNaN(Number(accountNumber))) {
            return Observable.throw(`accountNumber was not a valid number`);
        }
        const endpointUrl: string = `/v1/contractAccounts/${accountNumber}/energyInsights/subscriptions`;
        return this.getModel<EnergyInsightsEligibilityContract[]>(endpointUrl);
    }

    public getUsageBreakdownForBilled(contractNumber: string, billStartDate: string, billEndDate: string): Observable<EnergyInsightsUsage> {
        if (!contractNumber) {
            return Observable.throw(`contractNumber was empty`);
        }
        if (isNaN(Number(contractNumber))) {
            return Observable.throw(`contractNumber was not a valid number`);
        }
        if (!billStartDate) {
            return Observable.throw(`billStartDate was invalid`);
        }
        if (!billEndDate) {
            return Observable.throw(`billEndDate was invalid`);
        }
        const endpointUrl: string = `/v1/contracts/${contractNumber}/usageBreakdown/billed/billStartDate/${billStartDate}/billEndDate/${billEndDate}`;
        return this.getModel<EnergyInsightsUsage>(endpointUrl);
    }

    public setupEnergyInsights(contractNumber: string, setupEnergyInsightsRequest: SetupEnergyInsightsRequest): Observable<void> {
        if (!contractNumber) {
            return Observable.throw(`contractNumber was empty`);
        }
        if (isNaN(Number(contractNumber))) {
            return Observable.throw(`contractNumber was not a valid number`);
        }
        if (setupEnergyInsightsRequest.subscribedToMidBillEnergyBreakdown === null && setupEnergyInsightsRequest.subscribedToEndBillEnergyBreakdown === null) {
            return Observable.throw(`at least one of Mid or End subscription must be provided`);
        }
        const endpointUrl: string = `/v1/contracts/${contractNumber}/energyInsights/subscriptions`;
        return this.postModel<void, SetupEnergyInsightsRequest>(endpointUrl, setupEnergyInsightsRequest);
    }

}
