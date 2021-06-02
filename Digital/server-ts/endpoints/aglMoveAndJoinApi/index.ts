import { Response, Request, NextFunction, Router } from 'express';

import * as express from 'express';
import * as path from 'path';

import { Attributes } from '../../middleware/attributes';
import { FileOperations } from '../../common/fileOperations';
import { CacheManager } from '../../common/cacheManager';
import { IMockApi } from '../IMockApi';

/*
BASED UPON https://app.swaggerhub.com/apis/AGL/MoveAndJoin/1.0.0
*/

export class MoveAndJoinApi implements IMockApi {

    private router: Router;
    private hostKey = `aglMoveAndJoinApi`;

    constructor() {

        this.router = express.Router();

        // MIDDLEWARE
        this.router.use(Attributes.DemandBearerToken, (req: Request, res: Response, next: NextFunction) => {
            next();
        });

    }

    public registerRoutes(): Router {

        this.router.route('/v2/moves/eligibility')
            .get(Attributes.DemandCorrelationId, (req, res) => {
                let customerAccounts = CacheManager.getItem(req, 'accounts-list');
                if (customerAccounts) {
                    let result = [
                        {
                            oneMinuteMove: {
                                contractAccounts: [],
                                isDateOfBirthOnRecord: true,
                                isEligible: true
                            }
                        }
                    ];

                    customerAccounts.body.forEach((item) => {
                        result[0].oneMinuteMove.contractAccounts.push({
                            contractAccountNumber: item['number'],
                            isEligible: true
                        });
                    });

                    res.send(result);
                } else {
                    res.send([]);
                }
            });

        this.router.route('/v2/moves')
            .get((req, res) => {
                res.send('{}');
            });

        return this.router;

        }

}
