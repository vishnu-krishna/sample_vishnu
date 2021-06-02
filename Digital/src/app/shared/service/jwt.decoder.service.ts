import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class JwtDecoderService {
    public nameIdentifier() {
        let nameId = '';
        let bearerToken = sessionStorage.getItem('Bearer');
        if (bearerToken) {
            nameId = jwt_decode(bearerToken)['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
        }
        return nameId;
    }
    public emailAddress() {
        let emailAddress = '';
        let bearerToken = sessionStorage.getItem('Bearer');
        if (bearerToken) {
            emailAddress = jwt_decode(bearerToken)['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
        }
        return emailAddress;
    }
}
