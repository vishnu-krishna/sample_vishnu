import * as express from 'express';
/*

    https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request

    This Middleware layer allows us to mimic the behaviour of AGL's non-production API environments.

    There can only ever be one 'Access-Control-Allow-Origin' header in a response from an API. If web applications running
    from two different URL's need to access the same API, then there is no static way to configure the API to do this.

    Sending '*' will not work as this does not meet the security requirements of the browser for authenticated connections.

    We can make an API serve multiple web applications running in diferent URL's, by taking the ORIGIN header from their
    request and returing this as the 'Access-Control-Allow-Origin' header.

    For the OPTIONS verb (known as a PRE-FLIGHT request) the web application sends a header 'access-control-request-headers' that
    contains a comma seperated list of headers that it expects to be allowed to be sent and received. When the API returns it's list of
    supported headers through the 'Access-Control-Allow-Headers' header, this tells the browser if the next request (GET or POST) can proceed.

    We make sure we fully support the headers that the client wants by just returning the same comma seperated list that they sent the API.

*/

export class Cors {

    public static ApplyPolicy(req: express.Request, res: express.Response, next: express.NextFunction): void {

        // Change to '*' to allow any origin.
        let allowedOrigins = `*`;

        // CORS
        res.setHeader(`Access-Control-Allow-Credentials`, `true`);

        let origin = req.headers['origin'];
        if (origin) {
            if (allowedOrigins === '*') {
                res.setHeader(`Access-Control-Allow-Origin`, origin);
            } else {
                let allowedList = allowedOrigins.split(',');
                if (allowedList.indexOf(origin as string) !== -1) {
                    res.setHeader(`Access-Control-Allow-Origin`, origin);
                }
            }
        }

        // Pre-Flight OPTIONS
        if ('OPTIONS' === req.method) {
            // The 'access-control-request-headers' header contains a comma seperated list of headers that the client wants to know if we will allow
            let acrh = req.headers['access-control-request-headers'];
            let reqMethod = req.headers['access-control-request-method'];

            if (acrh) {
                // We are happy to work with any headers the client wants, so we just return the comma seperated list back to them as our allowed list, so they are happy
                res.setHeader(`Access-Control-Allow-Headers`, acrh);
            }

            if (reqMethod) {
                res.setHeader(`Access-Control-Allow-Methods`, reqMethod);
            }

            return res.status(200).end();
        }

        next();

    }

}
