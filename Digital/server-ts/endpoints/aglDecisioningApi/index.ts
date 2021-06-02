import { Response, Request, NextFunction, Router } from 'express';

import * as express from 'express';
import * as path from 'path';

import { Attributes } from '../../middleware/attributes';
import { FileOperations } from '../../common/fileOperations';
import { CacheManager } from '../../common/cacheManager';
import { IMockApi } from '../IMockApi';

/*
BASED UPON https://app.swaggerhub.com/apis/AGL/Decisioning/1.0.0
*/

export class DecisioningApi implements IMockApi {

    private router: Router;
    private hostKey = `aglDecisioningApi`;

    constructor() {

        this.router = express.Router();

        this.router.use(Attributes.DemandBearerToken, Attributes.DemandCorrelationId, (req: Request, res: Response, next: NextFunction) => {
            next();
        });

    }

    public registerRoutes(): Router {

        this.router.route('/v1/offers/customer/:bpId/channel/:channel/container/:container/component/:componentId/pageId/:pageId')
            .get((req, res) => {
                this.returnStatus(req.path, req, res);
            });
        this.router.route('/v1/offers/nbaResponse')
            .post((req, res) => {
                this.returnStatus(req.path, req, res);
            });
        this.router.route('/v1/events/userAuthenticated')
            .post((req, res) => {
                this.returnStatus(req.path, req, res);
            });

        return this.router;
    }

    private returnStatus(cacheKey, request, res) {
        let cache = CacheManager.getItem(request, cacheKey);
        let result: any = {};
        if (cache) {
            result = cache;
            console.log(`GET USING CACHE`);
        } else {
            console.log(`GET LOADING FROM FILE`);
            result = FileOperations.loadContentFromDataFile(request, this.hostKey);
            if (result) {
                CacheManager.saveItem(request, cacheKey, result);
            } else {
                console.log(`NO FILE DATA`);
            }
        }
        if (result) {
            if (result.status) {
                res.status(result.status).send(result.body);
            } else {
                res.send(result.body);
            }
        } else {
            res.send();
        }
    }

}
