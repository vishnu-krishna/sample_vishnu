import * as express from 'express';

export class Attributes {

    public static DemandBearerToken(req: express.Request, res: express.Response, next: express.NextFunction) {
        // The middleware layer 'determine customer' should have already populated the nameid
        if (!req['nameId']) {
            res.status(401).json(`Unauthorised`);
            res.end();
            return;
        }
        next();
    }

    public static DemandCorrelationId(req: express.Request, res: express.Response, next: express.NextFunction) {
        const badRequestErrorMessage = {
            message: `Bad Request. Your request headers must include an 'X-Correlation-Id' header with value that is a unique GUID for this request.`
        };
        if (!req.headers['x-correlation-id']) {
            res.status(400).json(badRequestErrorMessage);
            res.end();
            return;
        }
        next();
    }

    public static DemandSource(req: express.Request, res: express.Response, next: express.NextFunction) {
        const badRequestErrorMessage = { message: `The 'source' parameter is mandatory` };
        if (!(req.query && req.query.source)) {
            console.log(`Source param missing for call`);
            console.log(req.query);
            res.status(400).json(badRequestErrorMessage);
            res.end();
            return;
        }
        next();
    }

}
