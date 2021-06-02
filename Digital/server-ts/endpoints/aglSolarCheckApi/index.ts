import { Response, Request, NextFunction, Router } from 'express';

import * as express from 'express';
import * as path from 'path';

import { Attributes } from '../../middleware/attributes';
import { FileOperations } from '../../common/fileOperations';
import { CacheManager } from '../../common/cacheManager';
import { IMockApi } from '../IMockApi';

/*
BASED UPON https://app.swaggerhub.com/apis/AGL/SolarHealthCheck/1.0.0
*/

export class SolarCheckApi implements IMockApi {

    private router: Router;
    private hostKey = `aglSolarCheckApi`;

    constructor() {

        this.router = express.Router();

        // MIDDLEWARE
        this.router.use(Attributes.DemandBearerToken, (req: Request, res: Response, next: NextFunction) => {
            next();
        });

    }

    public registerRoutes(): Router {

        this.router.route('/v1/preferences')
            .get((req, res) => {
                FileOperations.serveContentFromDiskBasedOnUrl(req, res, this.hostKey);
            });

        this.router.route('/v1/preferences/marketingComms')
            .put((req, res) => {
                FileOperations.serveContentFromDiskBasedOnUrl(req, res, this.hostKey);
            });

        this.router.route('/v1/preferences/statusChangeComms')
            .put((req, res) => {
                FileOperations.serveContentFromDiskBasedOnUrl(req, res, this.hostKey);
            });

        // Eligibility
        this.router.route('/v1/eligibility')
            .get((req, res) => {
                FileOperations.serveContentFromDiskBasedOnUrl(req, res, this.hostKey);
            });

        // CONTRACT
        this.router.route('/v1/contracts/:contractNumber/eligibility')
            .put((req, res) => {
                FileOperations.serveContentFromDiskBasedOnUrl(req, res, this.hostKey);
            });

        this.router.route('/v1/contracts/:contractNumber/register')
            .post((req, res) => {
                FileOperations.serveContentFromDiskBasedOnUrl(req, res, this.hostKey);
            });

        this.router.route('/v1/contracts/:contractNumber/deregister')
            .post((req, res) => {
                FileOperations.serveContentFromDiskBasedOnUrl(req, res, this.hostKey);
            });

        this.router.route('/v1/contracts/:contractNumber')
            .get((req, res) => {
                FileOperations.serveContentFromDiskBasedOnUrl(req, res, this.hostKey);
            });

        this.router.route('/v1/contracts/:contractNumber/pvinfo')
            .put((req, res) => {
                FileOperations.serveContentFromDiskBasedOnUrl(req, res, this.hostKey);
            });

        this.router.route('v1/contracts/:contractNumber/registration')
            .put((req, res) => {
                FileOperations.serveContentFromDiskBasedOnUrl(req, res, this.hostKey);
            });

        // CONTRACT STATUS

        this.router.route('/v1/contracts/:contractNumber/status')
            .get((req, res) => {
                FileOperations.serveContentFromDiskBasedOnUrl(req, res, this.hostKey);
            });

        return this.router;
    }

}
