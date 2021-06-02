import { Injectable }           from '@angular/core';
import { Observable }           from 'rxjs/Observable';
import { AglAuthTokenProvider } from '../../../shared/repository/aglAuthTokenProvider';
import { UserInfo }             from './userInfo';
import { IUserInfoService }     from './userInfo.service.interface';

@Injectable()
export class UserInfoService extends IUserInfoService {

    constructor(private tokenProvider: AglAuthTokenProvider) { super(); }

    public getUserInfo(): Observable<UserInfo> {
        let model = new UserInfo();
        this.populateModelFromToken(model);
        return Observable.of<UserInfo>(model);
    }

    private populateModelFromToken(model: UserInfo) {
        try {
            let token = this.tokenProvider.getToken();
            if (token) {
                let payloadBase64Encoded = token.split(/\./)[1];
                let payloadAsJson = atob(payloadBase64Encoded);
                let payloadObject = JSON.parse(payloadAsJson);
                model.nameId = this.getValueFromPayloadObject(payloadObject, 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier') || '';
                model.betaEligible = ((this.getValueFromPayloadObject(payloadObject, 'http://identity.agl.com.au/claims/profileclaims/betaeligible') || '').toLowerCase() === 'true');
                model.customerType = this.getValueFromPayloadObject(payloadObject, 'http://identity.agl.com.au/claims/profileclaims/customertype') || '';
                model.emailAddress = this.getValueFromPayloadObject(payloadObject, 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress') || '';
            }
        } catch (e) {
            console.warn(e);
        }
    }

    private getValueFromPayloadObject(payloadObject: any, key: string) {
        if (payloadObject && payloadObject.hasOwnProperty(key)) {
            return payloadObject[key];
        }
        return null;
    }
}
