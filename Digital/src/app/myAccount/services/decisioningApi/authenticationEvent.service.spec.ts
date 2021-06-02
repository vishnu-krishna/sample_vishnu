import { async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { BusinessPartnerNumber } from '../../services/businessPartnerNumber/model/businessPartnerNumber';
import { AuthenticationEventService } from '../../services/decisioningApi/authenticationEvent.service';
import { DecisioningApiService } from '../../services/decisioningApi/decisioningApi.service';
import { DecisioningEventTypeStorageKey } from '../../services/decisioningApi/model/decisioningEventType';

describe('Authentication Event Service', () => {
    let decisioiningApiRepositorySpy;
    let authenticationEventService: AuthenticationEventService;
    beforeEach(async(() => {
        sessionStorage.removeItem(DecisioningEventTypeStorageKey.Authenticated.toString());
        sessionStorage.setItem('Bearer', 'Bearer 123');
        decisioiningApiRepositorySpy = {
            get: jasmine.createSpy('get').and.returnValue(Observable.from([])),
            post: jasmine.createSpy('post').and.returnValue(Observable.from([]))
        };
        window['visitor'] = {
            getMarketingCloudVisitorID(): string {
                return 'MID123213';
            }
        };
        let cookieServiceMock = {
            getCookie(): string {
                return '32432423423423';
            },
            setCookie(): void { return; },
            deleteCookie(): void { return; }
        };
        let businessPartnerServiceMock = {
            getBusinessPartnerNumber(): Observable<BusinessPartnerNumber> {
                return Observable.of(new BusinessPartnerNumber('098102312', 'Hasifasif932597406jgfgngw'));
            }
        };
        let decisioningApiServiceMock = new DecisioningApiService(decisioiningApiRepositorySpy, businessPartnerServiceMock);
        authenticationEventService = new AuthenticationEventService(decisioningApiServiceMock, businessPartnerServiceMock, cookieServiceMock);
    }));

    it('should send authentication event', async(() => {
        authenticationEventService.sendAuthenticationEvent();
        expect(decisioiningApiRepositorySpy.post).toHaveBeenCalled();
    }));
    it('should NOT send authentication event when Bearer token is unavailable', async(() => {
        sessionStorage.removeItem('Bearer');
        authenticationEventService.sendAuthenticationEvent();
        expect(decisioiningApiRepositorySpy.post).not.toHaveBeenCalled();
    }));
    it('should NOT send authentication event when AuthenticationEvent flag has been set', async(() => {
        sessionStorage.setItem(DecisioningEventTypeStorageKey.Authenticated.toString(), true.toString());
        authenticationEventService.sendAuthenticationEvent();
        expect(decisioiningApiRepositorySpy.post).not.toHaveBeenCalled();
    }));
    it('should NOT send authentication event when MID is NOT available', async(() => {
        window['visitor'] = null;
        authenticationEventService.sendAuthenticationEvent();
        expect(decisioiningApiRepositorySpy.post).not.toHaveBeenCalled();
    }));
});
