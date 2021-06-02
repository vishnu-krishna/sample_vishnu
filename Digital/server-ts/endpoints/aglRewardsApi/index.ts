import { Response, Request, NextFunction, Router } from 'express';

import * as express from 'express';
import * as path from 'path';

import { Attributes } from '../../middleware/attributes';
import { FileOperations } from '../../common/fileOperations';
import { CacheManager } from '../../common/cacheManager';
import { IMockApi } from '../IMockApi';

/*
BASED UPON https://app.swaggerhub.com/apis/AGL/Rewards/1.0.0
*/

export class RewardsApi implements IMockApi {

    private router: Router;
    private hostKey = `aglRewardsApi`;
    private cacheBenefitsActive = 'isRewardsBenefitsActive';

    constructor() {

        this.router = express.Router();

        this.router.use(Attributes.DemandBearerToken, (req: Request, res: Response, next: NextFunction) => {
            next();
        });

    }

    public registerRoutes(): Router {

        this.router.route('/v1/eligibility')
            .get((req, res) => {
                let defaultResponse = {
                    isEligible: true
                };
                FileOperations.serveContentFromDiskBasedOnUrl(req, res, this.hostKey, () => res.json(defaultResponse));
            });

        this.router.route('/v1/eligibility/benefits')
            .get((req, res) => {
                let defaultResponse = {
                    isEligibleForBenefits: true
                };
                FileOperations.serveContentFromDiskBasedOnUrl(req, res, this.hostKey, () => res.json(defaultResponse));
            });

        this.router.route('/v1/benefits/eligibility')
            .get((req, res) => {
                let defaultResponse = {
                    isEligibleForBenefits: true
                };
                FileOperations.serveContentFromDiskBasedOnUrl(req, res, this.hostKey, () => res.json(defaultResponse));
            });

        this.router.route('/v1/benefits')
        .get((req, res) => {
            let defaultResponse = [];
            FileOperations.serveContentFromDiskBasedOnUrl(req, res, this.hostKey, () => res.json(defaultResponse));
        });

        this.router.route('/v1/benefits/status')
            .get((req, res) => {
                const currentBenefitsStatus =  CacheManager.getItem(req, this.cacheBenefitsActive);
                let defaultResponse = {
                    isBenefitsStatusActive: currentBenefitsStatus
                };
                if (currentBenefitsStatus === null || typeof currentBenefitsStatus === 'undefined') {
                    FileOperations.serveContentFromDiskBasedOnUrl(req, res, this.hostKey, () => res.json(defaultResponse));
                } else {
                    res.json(defaultResponse);
                }
            });

        this.router.route('/v1/benefits/activate')
            .put((req, res) => {
                const cacheKey = req.url;
                CacheManager.saveItem(req, this.cacheBenefitsActive, true);
                res.status(200).json({});
            });

        this.router.route('/v1/benefits/token').post((req, res) => res.status(200).json({token: '1234xxxxx'}));

        this.router.route('/v1/discounts/summary')
            .get((req, res) => {
                FileOperations.serveContentFromDiskBasedOnUrl(req, res, this.hostKey);
            });

        this.router.route('/v1/flybuys/summary')
            .get((req, res) => {
                FileOperations.serveContentFromDiskBasedOnUrl(req, res, this.hostKey);
            });

        this.router.route('/v1/flybuys')
            .get((req, res) => {
                // TODO: mock different data per user
                setTimeout(() => {
                    FileOperations.serveStaticFile(req, res, '/rewardsApi/default-flybuys-transactions.json');
                }, 800);
            });

        this.router.route('/v1/offers')
            .get((req, res) => {
                setTimeout(() => {
                    FileOperations.serveStaticFile(req, res, '/rewardsApi/default-offers.json');
                }, 1000);
            });

        this.router.route('/v1/offers/:id/redemption')
            .post((req, res) => {
                setTimeout(() => {
                    if (req.params.id === 'OFFER002') {
                        res.status(500);
                        FileOperations.serveStaticFile(req, res, '/rewardsApi/offer-fail.json');
                    } else {
                        res.status(200);
                        FileOperations.serveStaticFile(req, res, '/rewardsApi/offer-success.json');
                    }
                }, 1000);
            });

        return this.router;
    }

}
