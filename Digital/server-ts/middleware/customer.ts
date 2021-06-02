import * as express from 'express';
import * as jwt_decode from 'jwt-decode';

const guidLength = 36;

/*

    Middleware layer to extract the token and determine the cusomter's NAME_ID, if at all possible.

*/

export class Customer {

    public static identify(req: express.Request, res: express.Response, next: express.NextFunction) {

    if (req.headers.authorization) {

        const authHeaderValue = req.headers.authorization;
        const authHeaderRawToken = (authHeaderValue as string).substring(7, authHeaderValue.length);

        try {
            const decodedJsonWebToken = jwt_decode(authHeaderRawToken);
            const nameIdentifier = decodedJsonWebToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
            if (nameIdentifier) {
                req['nameId'] = nameIdentifier;
            }

            const emailAddress = decodedJsonWebToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
            if (emailAddress) {
                req['customerEmail'] = emailAddress;
            }

            const mockServerSessionId = decodedJsonWebToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mockserversessionid'];
            if (mockServerSessionId && mockServerSessionId.length === guidLength) {
                req['mockServerSessionId'] = mockServerSessionId;
            } else {
                res.status(401).send(`No mock server session`);
                res.end();
                return;
            }

            console.log('mockserver session id', mockServerSessionId);

        } catch (ex) {
            // Do nothing
        }
    }

    next();

    }
}
