import { Response, Request, NextFunction, Router } from 'express';

import * as express from 'express';
import * as path from 'path';

import { Attributes } from '../../middleware/attributes';
import { FileOperations } from '../../common/fileOperations';
import { CacheManager } from '../../common/cacheManager';
import { IMockApi } from '../IMockApi';

/*
BASED UPON https://app.swaggerhub.com/apis/AGL/StoredPayments/1.0.0
*/

export class StoredPaymentsApi implements IMockApi {

    private router: Router;
    private hostKey = `aglStoredPaymentApi`;

    constructor() {

        this.router = express.Router();

        // MIDDLEWARE
        this.router.use(Attributes.DemandBearerToken, (req: Request, res: Response, next: NextFunction) => {
            next();
        });

    }

    public registerRoutes(): Router {

        this.router.route('/v1/paymentMethods/:paymentMethodId/payments')
            .post(Attributes.DemandCorrelationId, (req, res) => {
                FileOperations.serveContentFromDiskBasedOnUrl(req, res, this.hostKey);
            });

        return this.router;

    }

}
