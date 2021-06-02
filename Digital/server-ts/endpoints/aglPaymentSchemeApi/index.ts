import { Response, Request, NextFunction, Router } from 'express';

import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import * as moment from 'moment';

import { Attributes } from '../../middleware/attributes';
import { FileOperations } from '../../common/fileOperations';
import { CacheManager } from '../../common/cacheManager';
import { IMockApi } from '../IMockApi';
import { Filters } from '../../middleware/filters';

/*
BASED UPON https://app.swaggerhub.com/apis/AGL/PaymentScheme/1.0.0
*/

export class PaymentSchemeApi implements IMockApi {

    private router: Router;
    private hostKeyPaymentArrangement = `aglPaymentArrangementApi`;
    private hostKeyBillSmoothing = `aglBillSmoothingApi`;

    constructor() {

        this.router = express.Router();

        this.router.use(Attributes.DemandBearerToken, Attributes.DemandCorrelationId, (req: Request, res: Response, next: NextFunction) => {
            next();
        });

    }

    public registerRoutes(): Router {

        // FROM aglPaymentArrangementApi/index.js

        this.router.route('/v1/contractAccounts/:contractAccountNumber/paymentArrangement/extensionOptions')
            .get((req, res) => {
                const contractAccountNumber = req.params.contractAccountNumber;
                this.returnStatus(req.path, req, res, this.hostKeyPaymentArrangement);
            });

        this.router.route('/v1/contracts/:contractNumber/paymentArrangement/paymentExtensions')
            .post((req, res) => {
                let response = FileOperations.loadContentFromDataFile(req, this.hostKeyPaymentArrangement);
                if (!response) {
                    throw new Error(`POST paymentExtensions mock data for contract ${req.params.contractNumber} hasn't been setup.`);
                }

                const contractAccountNumber = this.getContractAccountNumber(req);
                if (contractAccountNumber) {
                    const getExtensionOptionsCacheKey = `/v1/contractAccounts/${contractAccountNumber}/paymentArrangement/extensionOptions`;
                    const getExtensionOptionsCache = CacheManager.getItem(req, getExtensionOptionsCacheKey);
                    const paymentsCacheKey = `/api/v1/payments`;
                    const paymentsCache = CacheManager.getItem(req, paymentsCacheKey);

                    if (getExtensionOptionsCache && paymentsCache) {
                        const extensionOption = getExtensionOptionsCache.body.extensionOptions.find((e) => e.contractNumber.toString() === req.params.contractNumber);
                        extensionOption.isEligible = false;
                        extensionOption.dueDate = req.body.extendedDueDate;
                        extensionOption.dueDateExtensions = null;
                        CacheManager.saveItem(req, getExtensionOptionsCacheKey, getExtensionOptionsCache);

                        const payment = paymentsCache.body.find((p) => p.contract === req.params.contractNumber);
                        payment.extendedDueDate = req.body.extendedDueDate;
                        CacheManager.saveItem(req, paymentsCacheKey, paymentsCache);

                        res.status(response.status).send(response.body);
                    } else {
                        throw new Error(`GET extensionOptions mock data for account ${contractAccountNumber} is not cached.`);
                    }
                } else {
                    throw new Error(`GET extensionOptions mock data for contract ${req.params.contractNumber} hasn't been setup.`);
                }
            });

        this.router.route('/v1/contracts/:contractNumber/paymentArrangement/instalmentPlans/options')
            .get((req, res) => {
                // use req.url rather than req.path is because we take querystring into consideration
                const cacheKey = req.url;
                const cache = CacheManager.getItem(req, cacheKey);
                let result: any;

                if (cache) {
                    result = cache;
                    console.log(`GET USING CACHE`);
                } else {
                    const minNumberOfInstalments = 2;
                    const today = moment().startOf('day');
                    result = FileOperations.loadContentFromDataFile(req, this.hostKeyPaymentArrangement);

                    // filter by frequency if supplied as a querystring param
                    if (req.query.frequency) {
                        result.body = result.body.filter(
                            (item) => item.frequency === req.query.frequency
                        );
                    }

                    result.body.map((item) => {
                        const minStartDate = this.getMinStartDate(today, item.frequency);
                        const maxStartDate = this.getMaxStartDate(today, item.frequency);

                        item.minStartDate = minStartDate.format('YYYY-MM-DD');
                        item.maxStartDate = maxStartDate.format('YYYY-MM-DD');

                        if (typeof req.query.suggestInstalments !== 'undefined' && (req.query.suggestInstalments === 'false')) {
                            item.instalmentSuggestions = null;
                        }
                    });

                    CacheManager.saveItem(req, cacheKey, result);
                    console.log(`GET LOADING FROM FILE`);
                }
                res.status(result.status).send(result.body);
            });

        this.router.route('/v1/contracts/:contractNumber/paymentArrangement/instalmentPlans/summary')
            .get((req: Request, res: Response) => {
                const cacheKey = req.url;
                const cache = CacheManager.getItem(req, cacheKey);
                let result: any = { body: {} };

                this.checkForErrorResponse(req, res);

                if (cache) {
                    result = cache;
                    res.status(200).send(result.body);
                    console.log(`GET USING CACHE`);

                } else {
                    const frequency = req.query.frequency;
                    const startDate = req.query.startDate;
                    const instalmentAmount = Number(req.query.instalmentAmount);

                    result.body.instalments = this.generateInstalmentData(res, req, frequency, startDate, instalmentAmount);

                    CacheManager.saveItem(req, cacheKey, result);
                    res.status(200).send(result.body);
                    console.log(`GET LOADING FROM FILE`);
                }
            });

        this.router.route('/v1/contracts/:contractNumber/paymentArrangement/instalmentPlans')
            .post((req: Request, res: Response) => {
                const contractNumber = Number(req.params.contractNumber);
                const frequency = req.body.frequency;
                const startDate = req.body.startDate;
                const instalmentAmount = Number(req.body.instalmentAmount);
                let result: any = { body: {} };

                this.checkForErrorResponse(req, res);

                const contractAccountNumber = this.getContractAccountNumber(req);
                if (!contractAccountNumber) {
                    this.returnError(res, `Contract Account ${contractAccountNumber} cannot be found`);
                }

                // Relies on the payment extension options cache to be stateful.
                const paymentArrangementCacheKey = `/v1/contractAccounts/${contractAccountNumber}/paymentArrangement/extensionOptions`;
                const paymentArrangement = CacheManager.getItem(req, paymentArrangementCacheKey);

                if (paymentArrangement) {
                    const contract = paymentArrangement.body.extensionOptions.find((option) => option.contractNumber === Number(contractNumber));
                    console.log(`GET USING PAYMENT EXTENSIONS CACHE`);

                    if (contract) {

                        if (contract.isEligible) {
                            const updatedEligibilityResponse = {
                                contractNumber: contractNumber,
                                isEligible: false,
                                error: {
                                    message: 'Ineligible for extension',
                                    internalError: {
                                        errorNumber: '027',
                                        description: 'some reason as to why the contract is not eligible'
                                    }
                                }
                            };

                            paymentArrangement.body.extensionOptions = [updatedEligibilityResponse];

                        } else {
                            this.returnError(res, 'Contract is not eligible for instalment plan');
                        }

                        CacheManager.saveItem(req, paymentArrangementCacheKey, paymentArrangement);
                        result.body.instalments = this.generateInstalmentData(res, req, frequency, startDate, instalmentAmount);
                        res.status(200).send(result.body);

                    } else {
                        this.returnError(res, `Contract ${contractNumber} cannot be found`);
                    }

                } else {
                    this.returnError(res, 'No cache data found for Payment Extension Options');
                }
            });

        this.router.route('/v1/contractAccounts/:contractAccountNumber/paymentArrangement/instalmentPlans')
            .get(Filters.ValidateAccountNumber, (req: Request, res: Response) => {
                const contractAccountNumber = req.params.contractAccountNumber;
                const cacheKey = req.url;
                const cache = CacheManager.getItem(req, cacheKey);
                const instalmentStatus = req.query.status;
                let result: any = {};

                this.checkForErrorResponse(req, res);

                if (cache) {
                    result = cache;
                    res.status(200).send(result);
                    console.log(`GET USING CACHE`);

                } else {
                    const instalmentPlans = this.loadContentFromInstalmentPlans(req['nameId'], contractAccountNumber.toString());

                    if (instalmentPlans) {
                        const isOpen = instalmentStatus && instalmentStatus === InstalmentPlanStatus.Open;
                        const contractsWithoutClosedInstalmentsPlans = instalmentPlans.body.map((contract) => {
                            return {
                                ...contract,
                                instalmentPlans: contract.instalmentPlans.filter((instalmentPlan) => instalmentPlan.status === InstalmentPlanStatus.Open)
                            };
                        });

                        const openInstalmentPlans = contractsWithoutClosedInstalmentsPlans.filter((contract) => Boolean(contract.instalmentPlans.length));

                        const filteredInstalmentPlans = isOpen
                                                       ? openInstalmentPlans
                                                       : instalmentPlans.body;

                        CacheManager.saveItem(req, cacheKey, filteredInstalmentPlans);
                        res.status(200).send(filteredInstalmentPlans);
                        console.log(`GET LOADING FROM FILE`);

                    } else {
                        this.returnError(res, `Missing Instalment Plan mock file for ${contractAccountNumber}`);
                    }
                }
            });

        // FROM aglBillSmoothingApi/index.js

        this.router.route('/v1/contractAccounts/:id/billsmoothing/estimates')
            .get((req, res) => {
                this.returnStatus(req.path, req, res, this.hostKeyBillSmoothing);
            });

        this.router.route('/v1/contractAccounts/:id/billsmoothing/schemes')
            .get((req, res) => {
                this.returnStatus(req.path, req, res, this.hostKeyBillSmoothing);
            });

        this.router.route('/v1/contractAccounts/:id/billsmoothing/reviews')
            .get((req, res) => {
            this.returnStatus(req.path, req, res, this.hostKeyBillSmoothing);
        });

        this.router.route('/v1/contracts/:id/billsmoothing/review')
            .get((req, res) => {
            this.returnStatus(req.path, req, res, this.hostKeyBillSmoothing);
        });

        this.router.route('/v1/contractAccounts/:id/billsmoothing/schemes')
            .post((req, res) => {

                // TODO: This endpoint has been observed to be broken.. it will show a contract as 'bill smoothing' on first load, then
                // on subsequent loads the contract will appear to be not on bill smoothing.

                setTimeout(() => {

                    let contractAccountNumber = req.params.id;

                    // Relevent caching
                    let estimatesCacheKey = `/v1/contractAccounts/${contractAccountNumber}/billsmoothing/estimates`;
                    let schemesCacheKey = `/v1/contractAccounts/${contractAccountNumber}/billsmoothing/schemes`;
                    let estimatesCache = CacheManager.getItem(req, estimatesCacheKey);
                    let schemesCache = CacheManager.getItem(req, schemesCacheKey);
                    let paymentsCache = CacheManager.getItem(req, '/api/v1/payments');

                    let response = FileOperations.loadContentFromDataFile(req, this.hostKeyBillSmoothing);
                    if (!response) {
                        res.status(200).json({});
                        return;
                    }
                    let allContractNumbers = req.body.paymentSchemes.map((paymentScheme) => paymentScheme.contractNumber);
                    response.body.results = response.body.results.filter((result) => allContractNumbers.includes(result.contractNumber));

                    // Requested information
                    req.body.paymentSchemes.forEach((paymentScheme) => {
                        let contractNumber = paymentScheme.contractNumber;
                        let result = response.body.results.find((outcome) => outcome.contractNumber === contractNumber);

                        if (result && result.isSuccess) {
                            let freq = paymentScheme.frequency;
                            let amount = paymentScheme.amount;
                            let paymentDate = paymentScheme.firstPaymentDate;

                            // Mock an entry
                            let newEntry = {
                                contractNumber: contractNumber,
                                paymentSchemeNumber: 91238821302108380,
                                startDate: '2017-06-01T14:00:00Z',
                                endDate: '2018-05-31T14:00:00Z',
                                frequency: freq,
                                nextPayment: {
                                    date: paymentDate,
                                    amount: amount
                                },
                                previousPayment: {
                                    date: paymentDate,
                                    amount: amount
                                }
                            };

                            schemesCache.body.paymentSchemes.push(newEntry);
                            CacheManager.saveItem(req, schemesCacheKey, schemesCache);

                            let estimates = estimatesCache.body.estimates.filter((estimate) => estimate.contractNumber !== contractNumber);
                            estimatesCache.body.estimates = estimates;
                            CacheManager.saveItem(req, estimatesCacheKey, estimatesCache);

                            // Update payments cache
                            let paymentObject = paymentsCache.body;

                            let paymentArr = paymentObject.map((payment) => {
                                return payment.contract === contractNumber.toString() ?
                                    {
                                        account: contractAccountNumber.toString(),
                                        contract: contractNumber.toString(),
                                        billSmoothing: true,
                                        overdue: 0,
                                        currentBalance: 0,
                                        totalPayment: 0,
                                        directDebit: false
                                    } : payment;
                            });

                            paymentsCache.body = paymentArr;

                            // Update payment cache
                            CacheManager.saveItem(req, '/api/v1/payments', paymentsCache);
                        }
                    });

                    // Send a successful response
                    res.status(response.status).send(response.body);
                }, 1000);
            });

        return this.router;

    }

    private getContractAccountNumber(req: Request) {
        const absoluteFolder = path.join(__dirname, '..', FileOperations.baseMockDataPath);
        const aglPaymentArrangementApiFolder = path.join(absoluteFolder, req['nameId'], this.hostKeyPaymentArrangement, 'v1', 'contractAccounts');

        for (const item of fs.readdirSync(aglPaymentArrangementApiFolder)) {
            const accountFolderPath = path.join(aglPaymentArrangementApiFolder, item);
            if (this.isDirectory(accountFolderPath)) {
                const extensionOptionsFilePath = path.join(accountFolderPath, 'paymentArrangement/extensionOptions/response.json');
                if (this.isFile(extensionOptionsFilePath)) {
                    const result = FileOperations.loadFile(extensionOptionsFilePath);
                    const isAccountOfContractFromRequest = result.body.extensionOptions.some((extensionOption) => {
                        return extensionOption.contractNumber.toString() === req.params.contractNumber;
                    });
                    if (isAccountOfContractFromRequest) {
                        return result.body.contractAccountNumber;
                    }
                }
            }
        }

        return null;
    }

    private isDirectory(value) {
        return fs.existsSync(value) && fs.statSync(value).isDirectory();
    }

    private isFile(value) {
        return fs.existsSync(value) && fs.statSync(value).isFile();
    }

    private returnStatus(cacheKey, request, res, hostKey) {
        let cache = CacheManager.getItem(request, cacheKey);
        let result: any = {};
        if (cache) {
            result = cache;
            console.log(`GET USING CACHE`);
        } else {
            result = FileOperations.loadContentFromDataFile(request, hostKey);
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

    private returnError(res: Response, errorMessage: string) {
        console.error(errorMessage);
        res.status(404).json({ message: errorMessage });
        res.end();
    }

    private loadContentFromInstalmentPlans(nameId: string, contractAccountNumber: string) {
        const paymentArrangementFilePath = path.join(__dirname, '..', FileOperations.baseMockDataPath, nameId, this.hostKeyPaymentArrangement, 'v1', 'contractAccounts', contractAccountNumber, 'paymentArrangement/instalmentPlans/response.json');
        return FileOperations.loadFile(paymentArrangementFilePath);
    }

    private loadContentFromExtensionOptions(nameId: string, contractAccountNumber: string) {
        const paymentArrangementFilePath = path.join(__dirname, '..', FileOperations.baseMockDataPath, nameId, this.hostKeyPaymentArrangement, 'v1', 'contractAccounts', contractAccountNumber, 'paymentArrangement/extensionOptions/response.json');
        return FileOperations.loadFile(paymentArrangementFilePath);
    }

    private generateInstalmentData(res: Response, req: Request, frequency: InstalmentPlanFrequency, startDate: Date, inputInstalmentAmount: number) {
        const contractAccountNumber = this.getContractAccountNumber(req);
        if (!contractAccountNumber) {
            this.returnError(res, 'Contract Account does not exist in accounts list, check mock files');
        }

        const paymentArrangement = this.loadContentFromExtensionOptions(req['nameId'], contractAccountNumber.toString());
        if (paymentArrangement) {
            const totalToPay = paymentArrangement.body.extensionOptions.find((option) => option.contractNumber.toString() === req.params.contractNumber).totalDueAmount;

            if (!totalToPay) {
                this.returnError(res, 'Contract is not eligible for payment assistance, check mock files');
            }

            const numberOfInstalments = Math.ceil(totalToPay / inputInstalmentAmount);

            console.log('GENERATING DYNAMIC DATA FOR INSTALMENT PLAN');

            // Mapping over an empty array
            return Array.apply(null, Array(numberOfInstalments)).map((x, index) => {
                const noOfFrequencies = frequency === InstalmentPlanFrequency.Fortnightly ? index * 2 : index;
                const duration = frequency === InstalmentPlanFrequency.Monthly ? 'months' : 'weeks';
                const instalmentDate = moment(startDate).add(noOfFrequencies, duration).format('YYYY-MM-DD');

                const isLastInstalmentPlan = (index === numberOfInstalments - 1);
                const lastInstalmentAmount = totalToPay - (inputInstalmentAmount * index);
                const instalmentAmount = isLastInstalmentPlan ? lastInstalmentAmount : inputInstalmentAmount;

                return { instalmentDate, instalmentAmount };
            });

        } else {
            this.returnError(res, 'Payment Extension options not found, check mock files');
        }
    }

    private checkForErrorResponse(req: Request, res: Response) {
        const staticResponse = FileOperations.loadContentFromDataFile(req, this.hostKeyPaymentArrangement);
        if (staticResponse && staticResponse.status !== 200) {
            this.returnError(res, `${staticResponse.status} - ${staticResponse.body.message}`);
        }
    }

    private getMinStartDate(today: moment.Moment, frequency: InstalmentPlanFrequency): moment.Moment {
        let minStartDate = today.clone().startOf('day');

        if (minStartDate.isoWeekday() >= 6 && frequency !== InstalmentPlanFrequency.Monthly) {
            console.log('Setting min start date to next Monday');
            return minStartDate.isoWeekday(8);
        }

        return minStartDate;
    }

    private getMaxStartDate(today: moment.Moment, frequency: InstalmentPlanFrequency): moment.Moment {
        let maxStartDate = today.clone().add(14, 'day').startOf('day');

        if (maxStartDate.isoWeekday() >= 6 && frequency !== InstalmentPlanFrequency.Monthly) {
            console.log('Setting max start date to previous Friday');
            return maxStartDate.isoWeekday(5);
        }

        return maxStartDate;
    }
}

export enum InstalmentPlanFrequency {
    Weekly = 'Weekly',
    Fortnightly = 'Fortnightly',
    Monthly = 'Monthly'
}

export enum InstalmentPlanStatus {
    Open = 'Open',
    Closed = 'Closed',
}
