import { Issuer } from './../../../src/app/myAccount/services/concession/concessionApi.service';
import * as express from 'express';
import * as path from 'path';
import { Response, Request, NextFunction, Router } from 'express';

import { Attributes } from '../../middleware/attributes';
import { IMockApi } from '../IMockApi';
import { FileOperations } from '../../common/fileOperations';
import { CacheManager } from '../../common/cacheManager';

/*
BASED UPON https://app.swaggerhub.com/apis/AGL/Concession/1.0.0#/Concession/GetConcessionIssuers
*/
export class ConcessionApi implements IMockApi {

    private router: Router;
    private hostKey: string = `aglConcessionApi/api`;

    constructor() {
        this.router = express.Router();

        this.router.use(Attributes.DemandBearerToken, (req: Request, res: Response, next: NextFunction) => {
            next();
        });
    }

    public registerRoutes(): Router {
        this.router.route('/v1/concession/:regionId/issuers')
            .get((req: express.Request, res: express.Response) => {
                let result = FileOperations.loadContentFromDataFile(req, this.hostKey);
                if (!result) {
                    console.log('No specific api mock data set for this user. send the a default response so that api still works.');
                    let defaultFilePath = path.join(__dirname, '..', FileOperations.baseMockDataPath, '..', 'aglConcessionApi', 'eligible-cards-default-response.json');
                    result = FileOperations.loadFile(defaultFilePath);
                }
                result = this.filterCardsByFuelType([].concat(req.query.fuelTypes), result);

                res.status(result.status || 200).send(result.body);
            });

        this.router.route('/v1/businessPartners/:bpId/concession')
            .get((req: express.Request, res: express.Response) => {
                let cache = CacheManager.getItem(req, this.getStatusCacheKey(req.params.bpId));
                if (cache) {
                    console.log('send cached result');
                    res.status(200).send(cache);
                } else {
                    FileOperations.serveContentFromDiskBasedOnUrl(req, res, this.hostKey,
                        () => {
                            console.log('No specific api mock data set for this user. send response to indicate that no concession has been applied.');
                            res.status(200).send(<ConcessionStatus> {
                                cardAvailable: false
                            });
                        });
                }
            })
            .post((req: express.Request, res: express.Response) => {
                let result = FileOperations.loadContentFromDataFile(req, this.hostKey);
                if (!result) {
                    console.log('use default response');
                    result = this.createDefaultSaveConcessionResponse(req);
                }

                if (result.status === 200) {
                    console.log('cache new concession status');
                    let concessionStatusJson = <ConcessionStatus> {
                        cardAvailable: true,
                        concessionCard: {
                            cardCode: req.body.cardCode,
                            issuerCode: req.body.issuerCode,
                            cardNumber: req.body.cardNumber,
                            cardName: `Mock Server Pensioner Concession Card`,
                        }
                    };

                    CacheManager.saveItem(req, this.getStatusCacheKey(req.params.bpId), concessionStatusJson);
                }

                res.status(result.status).send(result.body);
            });

        return this.router;
    }

    private getStatusCacheKey(bpId: string) {
        return `/v1/businessPartners/${bpId}/concession`;
    }

    private filterCardsByFuelType(requestedFuelTypes: string[], data: any): any {
        if (data) {
            let issuers: Issuer[] = data.body || data;
            let fuelTypes: string[] = requestedFuelTypes.map((ft) => ft.toLowerCase());

            issuers.forEach((issuer: Issuer) => {
                let filteredCards: ConcessionCard[] = [];

                issuer.cards.forEach((card: ConcessionCard) => {
                    let eligibleFuelTypes = card.eligibleFuelTypes.map((ft) => ft.toLowerCase());
                    if (fuelTypes.find((rft) => eligibleFuelTypes.indexOf(rft) !== -1)) {
                        filteredCards.push(card);
                    } else {
                        console.log(`excluded card ${card.name} from results (does not match requested fuel types)`);
                    }
                });

                issuer.cards = filteredCards;
            });
        }

        return data;
    }

    private createDefaultSaveConcessionResponse(req: Request): any {
        let response: any;

        function requiredBodyErrorResponse(missingField: string): any {
            return {
                status: 400,
                body: {
                    errors: [{
                        code: 'Required',
                        field: missingField,
                        message: `concession ${missingField} should not be empty.`
                    }]
                }
            };
        }

        if (!req.body.cardCode) {
            response = requiredBodyErrorResponse('card code');
        } else if (!req.body.cardNumber) {
            response = requiredBodyErrorResponse('card number');
        } else if (!req.body.issuerCode) {
            response = requiredBodyErrorResponse('issuer code');
        } else if (req.body.contracts.length === 0) {
            response = requiredBodyErrorResponse('contracts');
        } else {
            response = {
                status: 200
            };
        }

        return response;
    }
}

interface ConcessionStatus {
    cardAvailable: boolean;
    concessionCard?: ConcessionStatusCardDetails;
}

interface ConcessionStatusCardDetails {
    cardCode: string;
    issuerCode: string;
    cardNumber: string;
    cardName: string;
    error?: ErrorApiModel;
}

interface ErrorApiModel {
    internalError?: InternalErrorApiModel;
}

interface InternalErrorApiModel {
    errorNumber?: string;
}

interface ConcessionCard {
    cardCode: string;
    name: string;
    eligibleFuelTypes: string[];
}

interface Issuer {
    issuerCode: string;
    issuer: string;
    cards: ConcessionCard[];
}
