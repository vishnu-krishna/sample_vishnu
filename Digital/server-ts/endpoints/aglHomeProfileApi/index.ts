import { Response, Request, NextFunction, Router } from 'express';

import * as express from 'express';
import * as path from 'path';

import { Attributes } from '../../middleware/attributes';
import { FileOperations } from '../../common/fileOperations';
import { CacheManager } from '../../common/cacheManager';
import { IMockApi } from '../IMockApi';

/*
BASED UPON https://app.swaggerhub.com/apis/AGL/HomeProfile/1.0.0
*/

export class HomeProfileApi implements IMockApi {

    private router: Router;
    private hostKey = `aglHomeProfileApi`;

    constructor() {

        this.router = express.Router();

        this.router.use(Attributes.DemandBearerToken, Attributes.DemandCorrelationId, (req: Request, res: Response, next: NextFunction) => {
            next();
        });

    }

    public registerRoutes(): Router {

        this.router.route('/v1/homeProfiles')
            .get((req: Request, res: Response) => {
                const cacheKey = `${req['nameId']} ${req.path}`;
                this.returnStatus(cacheKey, req, res);
            });

        this.router.route('/v1/contracts/:contractNumber/homeProfile')
            .get((req: Request, res: Response) => {
                const cacheKey = req.path;
                this.returnStatus(cacheKey, req, res);
            });

        this.router.route('/v1/contracts/:contractNumber/homeProfile')
            .post((req: Request, res: Response) => {
                const response = FileOperations.loadContentFromDataFile(req, this.hostKey);
                // Save update to cache if response status is 200 (Ok).
                if (response.status === 200) {
                    this.saveStatus(req, req.url, req.body);
                    this.updateHomeProfilesApi(req);
                }
                res.status(response.status).send(response.body);
            });

        return this.router;
    }

    private updateHomeProfilesApi(request: Request) {
        let homeProfiles = CacheManager.getItem(request, `${request['nameId']} /v1/homeProfiles`);
        const temp = request.path.split('/');
        const contractNumber = temp[temp.length - 2];
        if (!homeProfiles) {
            homeProfiles = {
                status: 200,
                headers: {},
                body: []
            };
        }
        const existingContract = homeProfiles.body.find((x) => x.contractNumber === contractNumber);
        if (existingContract) {
            existingContract.updatedUtc = new Date();
        } else {
            homeProfiles.body.push({
                contractNumber: contractNumber,
                accountNumber: 123,
                updatedUtc: new Date()
            });
        }
    }

    private saveStatus(request: Request, cacheKey: string, content: any) {
        const result = {
            status: 200,
            headers: [],
            body: content
        };
        CacheManager.saveItem(request, cacheKey, result);
    }

    private returnStatus(cacheKey: string, request: Request, res: Response) {
        const cache = CacheManager.getItem(request, cacheKey);
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
