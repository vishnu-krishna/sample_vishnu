import * as express from 'express';
import * as jwt_decode from 'jwt-decode';

export function overwriteResponse(req: express.Request, res: express.Response, dynamicMockKey: string, modifyBodyFunc: (body?: any) => any) {
    if (shouldDynamicMockBeApplied(req, dynamicMockKey)) {
        let origSend = res.send;
        res.send = (body?: any): express.Response => {
            if (modifyBodyFunc) {
                console.log('dynamic mocks altered response');
                body = modifyBodyFunc(body);
            }

            res.send = origSend; // Reset back
            // arguments[0] will be the body? param but we need to pass any others too
            return origSend.apply(res, arguments);
        };
    }
}

function shouldDynamicMockBeApplied(req: express.Request, dynamicMockKey: string): boolean {
    let claim = false;

    if (req.headers.authorization) {
        const authHeaderValue = req.headers.authorization;
        const authHeaderRawToken = (authHeaderValue as string).substring(7, authHeaderValue.length);

        const decodedJsonWebToken = jwt_decode(authHeaderRawToken);
        claim = decodedJsonWebToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mockserver' + dynamicMockKey];
    }

    return !!claim;
}
