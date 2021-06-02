import { Observable } from 'rxjs/Observable';
import { MockCustomer } from './../src/app/myAccount/mockManager/models/mockCustomer';
import { MockJWTService } from './../src/app/myAccount/mockManager/mockJWT.service';

import { Guid } from './../src/app/shared/utils/guid';

/* NOTE:  Whenever this file is updated can you please re-compile (via `tsc --outDir js identityEmulator.ts` then run `rm -rf js/src` in this `commons` directory.
   Do not check-in any other compiled `.js` files.  The `.js` version fo this file is used to generate login tokens
   for the CSS Regression testing (see `backstop/.../login.js`) */
export class IdentityEmulator {

    public static generateTokenForCustomer(nameIdentifier: string, email: string = `fakeemail@gmail.com`, additionalMockServerClaims: string[] = []) {
        let payload: any = {
            'aud': 'https://aglsts.accesscontrol-website.windows.net/',
            'iss': 'AGL Azure',
            'nbf': 0,
            'exp': 0,
            'http://schemas.microsoft.com/ws/2008/06/identity/claims/authenticationmethod': 'OAuth2',
            'http://identity.agl.com.au/claims/profileclaims/customertype': 'MM',
            'http://identity.agl.com.au/claims/profileclaims/betaeligible': 'True'
        };

        let now = new Date();

        payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] = email;
        payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] = nameIdentifier;
        payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/authenticationinstant'] = now.toISOString();
        payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mockserversessionid'] = Guid.newGuid();

        additionalMockServerClaims.forEach((claim) => {
            payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mockserver' + claim] = 'enabled';
        });

        return MockJWTService.encode(payload);
    }

    public static getCustomerFromToken(token: string): MockCustomer {

        let customer: MockCustomer;

        let decoded = MockJWTService.decode(token);

        customer.nameId = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

        if (
            decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] &&
            decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] &&
            decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/authenticationinstant'] &&
            decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mockserversessionid'] &&
            decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/authenticationmethod'] &&
            decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/authenticationmethod'] === 'OAuth2' &&
            decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/customertype'] &&
            decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/betaeligible']
        ) {
            return customer;
        }

        return null;

    }

}
