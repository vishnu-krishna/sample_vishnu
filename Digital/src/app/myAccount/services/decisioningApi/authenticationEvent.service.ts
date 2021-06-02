import { Injectable } from '@angular/core';
import { CookieService } from '../../../shared/service/cookie.service';
import { BusinessPartnerNumber } from '../../services/businessPartnerNumber/model/businessPartnerNumber';
import { IDecisioningApiService } from '../../services/contract/idecisioningApi.service';
import { DecisioningEventChannel } from '../../services/decisioningApi/model/decisioningEventChannel';
import { DecisioningEventType, DecisioningEventTypeStorageKey } from '../../services/decisioningApi/model/decisioningEventType';
import { IAuthenticationEventService } from '../contract/iauthenticationEvent.service';
import { IBusinessPartnerNumberService } from '../contract/ibusinessPartnerNumber.service';
import { UserAuthenticatedEventRequest, UserAuthenticatedEventRequestData } from './model/userAuthenticatedEventRequest';

@Injectable()
export class AuthenticationEventService implements IAuthenticationEventService {

    constructor(
        private _decisioningService: IDecisioningApiService,
        private _businessPartnerNumberService: IBusinessPartnerNumberService,
        private _cookieService: CookieService) {
    }

    public sendAuthenticationEvent(): void {
        if (sessionStorage.getItem('Bearer') && !sessionStorage.getItem(DecisioningEventTypeStorageKey.Authenticated.toString())) {
            this._businessPartnerNumberService.getBusinessPartnerNumber().subscribe((bp) => {
                this.checkAuthenticationEventCookieAvailability(1, bp);
            });
        }
    }

    public clearAuthenticatedEventFlag(): void {
        sessionStorage.removeItem(DecisioningEventTypeStorageKey.Authenticated.toString());
        sessionStorage.removeItem('Bearer');
    }

    private checkAuthenticationEventCookieAvailability(attempt: number, bp: BusinessPartnerNumber): string {
        let cookieCheckRetryTimeout: number = 500;
        let maximumTimeoutMilliseconds: number = 20000; // 20 seconds caters slow internet
        let maximumAttempts: number = maximumTimeoutMilliseconds / cookieCheckRetryTimeout;
        if (attempt >= maximumAttempts) {
            this.sendAuthenticationEventInternal('', bp);
            return;
         }
        let gaId = this._cookieService.getCookie('_ga');
        if (gaId) {
            this.sendAuthenticationEventInternal(gaId, bp);
            return;
         }
        attempt++;
        setTimeout(() => { this.checkAuthenticationEventCookieAvailability(attempt, bp); }, cookieCheckRetryTimeout);
    }

    private sendAuthenticationEventInternal(gaId: string, bp: BusinessPartnerNumber) {
        let marketingCloudVisitorId: string;
        let visitor = window['visitor'];
        if (visitor) {
            marketingCloudVisitorId = visitor.getMarketingCloudVisitorID();
            if (marketingCloudVisitorId) {
                let userAuthenticatedEventData = new UserAuthenticatedEventRequestData(bp.bpId, bp.hashed, marketingCloudVisitorId, gaId);
                let userAuthenticatedEventRequest: UserAuthenticatedEventRequest = {
                            channel: DecisioningEventChannel.MyAccount.toString(),
                            type: DecisioningEventType.Authenticated.toString(),
                            timeStamp: new Date().toJSON(),
                            data: userAuthenticatedEventData,
                        };
                this._decisioningService.sendUserAuthenticatedEvent(userAuthenticatedEventRequest);
                sessionStorage.setItem(DecisioningEventTypeStorageKey.Authenticated.toString(), true.toString());
            }
        }
    }
}
