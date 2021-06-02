import { Response, Request, NextFunction, Router } from 'express';

import * as express from 'express';
import * as path from 'path';
import * as fileUpload from 'express-fileupload';
import * as moment from 'moment';

import { Attributes } from '../../middleware/attributes';
import { FileOperations } from '../../common/fileOperations';
import { CacheManager } from '../../common/cacheManager';
import { IMockApi } from '../IMockApi';
import { UploadedFile } from 'express-fileupload';
import { PayOnTimeDiscountDynamicMock } from './../../middleware/dynamic-mocking/payOnTimeDiscountDynamicMock';

/*
BASED UPON https://app.swaggerhub.com/apis/AGL/WebApi/1.0.0
*/

export class WebApi implements IMockApi {

    private router: Router;
    private hostKey = `aglWebApi`;

    constructor() {

        this.router = express.Router();

        this.router.use(Attributes.DemandBearerToken, (req: Request, res: Response, next: NextFunction) => {
            next();
        });

    }

    public registerRoutes(): Router {

        this.router.route('/api/v1/usage/:granularity')
            .get((req: Request, res: Response) => {
                if (req.params.granularity) {
                    FileOperations.serveContentFromDiskBasedOnUrl(req, res, this.hostKey);
                } else {
                    res.send(`Please check the API documentation`);
                }
            });

        // PENDING PAYMENTS

        this.router.route('/api/v1/pendingpayments')
            .get((req: Request, res: Response) => {
                FileOperations.serveContentFromDiskBasedOnUrl(req, res, this.hostKey);
            })
            .post((req: Request, res: Response) => {
                res.send('NOT SUPPORTED');
            });

        // SYNCDATA

        this.router.route('/api/v1/syncdata/start')
            .get((req: Request, res: Response) => {
                res.send('Start');
            });

        this.router.route('/api/v1/syncdata/status')
            .get((req: Request, res: Response) => {

                let now = moment().format();

                console.log(`Now is: ${now}`);

                res.status(200).json(
                    [
                        {
                            dataGroup: 'Account',
                            status: 'Complete',
                            lastUpdated: now,
                            failed: false,
                        },
                        {
                            dataGroup: 'BillingHistory',
                            status: 'Complete',
                            lastUpdated: now,
                            failed: false,
                        },
                        {
                            dataGroup: 'Dashboard',
                            status: 'Complete',
                            lastUpdated: now,
                            failed: false,
                        },
                        {
                            dataGroup: 'Payments',
                            status: 'Complete',
                            lastUpdated: now,
                            failed: false,
                        },
                        {
                            dataGroup: 'Usage',
                            status: 'Complete',
                            lastUpdated: now,
                            failed: false,
                        }
                    ]

                );
            });

        // ACCOUNTS

        this.router.route('/api/accounts')
            .get((req: Request, res: Response) => {
                res.status(400).send(`Not yet implemented`);
            });

        this.router.route('/api/accounts/list')
            .get((req: Request, res: Response) => {
                let result = CacheManager.getItem(req, 'accounts-list');
                if (result) {
                    res.status(result.status).send(result.body);
                } else {
                    FileOperations.serveContentFromDiskBasedOnUrl(req, res, this.hostKey);
                }
            });

        // NOTIFICATIONS

        this.router.route('/api/v1/notifications')
            .get((req: Request, res: Response) => {
                res.status(400).send(`Not yet implemented`);
            });

        // BILLS

        this.router.route('/api/v1/bills')
            .get((req: Request, res: Response) => {
                FileOperations.serveContentFromDiskBasedOnUrl(req, res, this.hostKey);
            });

        // PAYMENTS

        this.router.route('/api/v1/payments')
            .get(PayOnTimeDiscountDynamicMock.alterPaymentsApiResponse, (req: Request, res: Response) => {
                this.returnStatus(req.path, req, res);
            });

        this.router.route('/api/v1/payments/emailreceipt')
            .post((req: Request, res: Response) => {

                if (req.body) {
                    let model = req.body;
                    if (
                        model.referenceNumber &&
                        model.receiptNumber &&
                        model.paymentAmount &&
                        model.paymentDate
                    ) {
                        console.log(`Sending EMAIL to: ${req['customerEmail']}`);
                        console.log(model);
                        res.status(200).send(`Done. Email has been sent to the customer's email address: ${req['customerEmail']}`);
                    } else {
                        res.status(422).send(`Invalid`);
                    }
                }

            });

        // PAYMENT HISTORY

        this.router.route('/api/v1/paymentslist')
            .get((req, res) => {
                FileOperations.serveContentFromDiskBasedOnUrl(req, res, this.hostKey);
            });

        // NOTIFICATIONSETUP

        // DASHBOARD

        this.router.route('/api/v1/dashboard')
            .get((req, res) => {
                FileOperations.serveContentFromDiskBasedOnUrl(req, res, this.hostKey);
            });

        // CONTENT V2

        // APPVERSION

        // CONTENT

        /*

        BASED UPON https://app.swaggerhub.com/apis/AGL/WebApi/2.0.0
        */

        // CONTACT

        this.router.route('/v2/contactdetail')
            .get(Attributes.DemandCorrelationId, (req: Request, res: Response) => {
                this.returnStatus(req.path, req, res);
            });

        this.router.route('/v2/businesspartners/:businessPartnerNumber')
            .patch(Attributes.DemandCorrelationId, (req: Request, res: Response) => {
                FileOperations.serveContentFromDiskBasedOnUrl(req, res, this.hostKey, () => {
                    const cacheKey = '/v2/contactdetail';

                    let cachedContactDetails = CacheManager.getItem(req, cacheKey);
                    if (!cachedContactDetails) {
                        return res.status(400).send(`no cached content details found - must call get ${cacheKey} first`);
                    } else {
                        // tslint:disable-next-line:prefer-for-of
                        for (let i = 0; i < req.body.length; i++) {
                            let patch = req.body[i];
                            console.log(`patch ${patch.path} to ${patch.value}`);
                            if (patch.op !== 'Replace') {
                                return res.status(400).send(`only patch operations of 'Replace' are currently supported: '${patch.op}'`);
                            }

                            let prop = patch.path.replace('/', ''); // path is in the format '/email' or '/mobile'
                            if (!cachedContactDetails.body.businessPartners[0].hasOwnProperty(prop)) {
                                return res.status(400).send(`unknown property: '${prop}'`);
                            }

                            cachedContactDetails.body.businessPartners[0][prop] = patch.value;
                        }

                        CacheManager.saveItem(req, cacheKey, cachedContactDetails);
                        return res.status(200).send(); // empty body
                    }
                });
            });

        // SSMR

        this.router.route('/v2/contracts/:contractNumber/meters/selfServiceEligibility')
            .get(Attributes.DemandCorrelationId, Attributes.DemandSource, (req: Request, res: Response) => {
                FileOperations.serveContentFromDiskBasedOnUrl(req, res, this.hostKey);
            });

        this.router.route('/v2/contracts/:contractNumber/meters/selfServiceReadings')
            .post(Attributes.DemandCorrelationId, Attributes.DemandSource, (req: Request, res: Response) => {
                FileOperations.serveContentFromDiskBasedOnUrl(req, res, this.hostKey);
            });

        this.router.route('/v2/contracts/:contractNumber/meters/selfServicePhotos')
            .post((req: Request, res: Response) => {

                if (req.files && req.body.data && req.params.contractNumber) {

                    let fileCount = Object.keys(req.files).length;

                    let photo1 = req.files.photo1 as UploadedFile;
                    let photo2 = req.files.photo2 as UploadedFile;
                    let photo3 = req.files.photo3 as UploadedFile;

                    let now = new Date();
                    let filenameSafeDateTime = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}_${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`;
                    let photoUploadFolder = path.join(req.app.locals.mockConfig.uploadsFolder);
                    console.log(`There were ${fileCount} file(s) uploaded`);

                    if (photo1) {
                        let photo1Filename = path.join(photoUploadFolder, `${filenameSafeDateTime}-SSMR-Photo-1.jpg`);
                        console.log(`\tSaving photo1 to ${photo1Filename}`);
                        photo1.mv(photo1Filename, (err) => {
                            console.error(err);
                        });
                    }

                    if (photo2) {
                        let photo2Filename = path.join(photoUploadFolder, `${filenameSafeDateTime}-SSMR-Photo-2.jpg`);
                        console.log(`\tSaving photo2 to ${photo2Filename}`);
                        photo2.mv(photo2Filename, (err) => {
                            console.error(err);
                        });
                    }

                    if (photo3) {
                        let photo3Filename = path.join(photoUploadFolder, `${filenameSafeDateTime}-SSMR-Photo-3.jpg`);
                        console.log(`\tSaving photo3 to ${photo3Filename}`);
                        photo3.mv(photo3Filename, (err) => {
                            console.error(err);
                        });
                    }

                    let validationErrorModel = {
                        errors: [{
                            code: `Required`,
                            field: `registers.registerId`,
                            message: `'registerId' is requied`
                        }]
                    };

                    // Validate the data model
                    let isValid = false;
                    try {
                        let model = JSON.parse(req.body.data);
                        if (model && (model.length === fileCount)) {
                            // TODO: RegisterID is mandatory, check for it.
                            isValid = true;
                        }
                    } catch (err) {
                        console.log(`Error processing the data model:`);
                        console.log(err);
                    }

                    if (!isValid) {
                        console.log(`422 - Model Validation Failed.`);
                        console.log(`Model Contents:`);
                        console.log(req.body.data);
                        console.log(``);
                        return res.status(422).json(validationErrorModel);
                    }

                    console.log(``);
                    return res.status(200).json(`{}`);

                } else {
                    console.log(`INVALID`);
                    return res.status(400).send('Invalid Request - Please send files and data');
                }
            });

        // PREPAYMENTBALANCES

        this.router.route('/v2/contracts/:contractNumber/prepaymentbalance')
            .get(Attributes.DemandCorrelationId, (req: Request, res: Response) => {
                FileOperations.serveContentFromDiskBasedOnUrl(req, res, this.hostKey);
            });

        this.router.route('/v2/contracts/:contractNumber/payments/:paymentAmount/productBonusEligibility')
            .get(Attributes.DemandCorrelationId, (req: Request, res: Response) => {
                FileOperations.serveContentFromDiskBasedOnUrl(req, res, this.hostKey);
            });

        // CONTRACTS

        // PRODUCTBONUS
        // Cached

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
