import { Response, Request, NextFunction, Router } from 'express';

import * as express from 'express';
import * as path from 'path';

import { Attributes } from '../../middleware/attributes';
import { FileOperations } from '../../common/fileOperations';
import { CacheManager } from '../../common/cacheManager';
import { IMockApi } from '../IMockApi';

/*
BASED UPON https://app.swaggerhub.com/apis/AGL/Personalisation/1.0.0#/
*/

export class PersonalisationApi implements IMockApi {

    private router: Router;
    private hostKey = `aglPersonalisationApi`;

    constructor() {

        this.router = express.Router();

        this.router.use(Attributes.DemandBearerToken, (req: Request, res: Response, next: NextFunction) => {
            next();
        });

    }

    public registerRoutes(): Router {

        this.router.route('/v1/features')
            .get((req, res) => {
                setTimeout(() => {
                    if (req.query.channel === 'myaccount') {
                        let onFileNotFound = () => {
                            res.json([]);
                        };

                        FileOperations.serveContentFromDiskBasedOnUrl(req, res, this.hostKey, onFileNotFound);
                    } else {
                        res.status(401);
                    }
                }, 800);
            });

        this.router.route('/v1/features/:featureid')
            .patch((req, res) => {
                setTimeout( () => {
                    res.status(204).json({});
                }, 500);
            });

        return this.router;
        }

}
