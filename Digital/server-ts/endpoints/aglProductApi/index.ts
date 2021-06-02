import { Response, Request, NextFunction, Router } from 'express';

import * as express from 'express';
import * as path from 'path';

import { Attributes } from '../../middleware/attributes';
import { FileOperations } from '../../common/fileOperations';
import { CacheManager } from '../../common/cacheManager';
import { IMockApi } from '../IMockApi';
import { PayOnTimeDiscountDynamicMock } from '../../middleware/dynamic-mocking/payOnTimeDiscountDynamicMock';

/*
BASED UPON https://app.swaggerhub.com/apis/AGL/Product/2.0.0
*/

export class ProductApi implements IMockApi {

    private router: Router;
    private hostKey = `aglProductApi`;

    constructor() {

        this.router = express.Router();

    }

    public registerRoutes(): Router {

        this.router.route('/products/:productId')
            .get(PayOnTimeDiscountDynamicMock.alterProductApiResponse, (req, res) => {
                if (req.params.productId) {
                    FileOperations.serveStaticFile(req, res, `/productApi/${req.params.productId}.json`);
                } else {
                    res.status(510);
                }
            });

        this.router.route('/products/:productId/bonuses')
            .get((req, res) => {
                let regionId = req.query.regionId;
                if (req.params.productId && regionId) {
                    FileOperations.serveStaticFile(req, res, `/productApi/${req.params.productId}/bonuses/${regionId}.json`);
                } else {
                    res.status(510);
                }
            });

        return this.router;
        }

}
