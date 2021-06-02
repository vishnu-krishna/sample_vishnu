"use strict";
exports.__esModule = true;
var mockJWT_service_1 = require("./../src/app/myAccount/mockManager/mockJWT.service");
var guid_1 = require("./../src/app/shared/utils/guid");
/* NOTE:  Whenever this file is updated can you please re-compile (via `tsc --outDir js identityEmulator.ts` then run `rm -rf js/src` in this `commons` directory.
   Do not check-in any other compiled `.js` files.  The `.js` version fo this file is used to generate login tokens
   for the CSS Regression testing (see `backstop/.../login.js`) */
var IdentityEmulator = /** @class */ (function () {
    function IdentityEmulator() {
    }
    IdentityEmulator.generateTokenForCustomer = function (nameIdentifier, email, additionalMockServerClaims) {
        if (email === void 0) { email = "fakeemail@gmail.com"; }
        if (additionalMockServerClaims === void 0) { additionalMockServerClaims = []; }
        var payload = {
            'aud': 'https://aglsts.accesscontrol-website.windows.net/',
            'iss': 'AGL Azure',
            'nbf': 0,
            'exp': 0,
            'http://schemas.microsoft.com/ws/2008/06/identity/claims/authenticationmethod': 'OAuth2',
            'http://identity.agl.com.au/claims/profileclaims/customertype': 'MM',
            'http://identity.agl.com.au/claims/profileclaims/betaeligible': 'True'
        };
        var now = new Date();
        payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] = email;
        payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] = nameIdentifier;
        payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/authenticationinstant'] = now.toISOString();
        payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mockserversessionid'] = guid_1.Guid.newGuid();
        additionalMockServerClaims.forEach(function (claim) {
            payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mockserver' + claim] = 'enabled';
        });

        return mockJWT_service_1.MockJWTService.encode(payload);
    };
    IdentityEmulator.getCustomerFromToken = function (token) {
        var customer;
        var decoded = mockJWT_service_1.MockJWTService.decode(token);
        customer.nameId = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
        if (decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] &&
            decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] &&
            decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/authenticationinstant'] &&
            decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mockserversessionid'] &&
            decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/authenticationmethod'] &&
            decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/authenticationmethod'] === 'OAuth2' &&
            decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/customertype'] &&
            decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/betaeligible']) {
            return customer;
        }
        return null;
    };
    return IdentityEmulator;
}());
exports.IdentityEmulator = IdentityEmulator;
