import { BillDeliveryContactDetailModel } from './../../../src/app/myAccount/services/settings/model/billDeliveryContactDetailModel';
import { Response, Request, NextFunction, Router } from 'express';

import * as express from 'express';
import * as path from 'path';

import { Attributes } from '../../middleware/attributes';
import { FileOperations } from '../../common/fileOperations';
import { CacheManager } from '../../common/cacheManager';
import { IMockApi } from '../IMockApi';
import { CacheTable } from '../../common/cacheTable';
import { BillDelivery } from '../../../src/app/myAccount/services/settings/model/billDelivery';
import { BillDeliveryMethodType } from '../../../src/app/myAccount/services/settings/model/billDeliveryMethodType';

/*

BASED UPON https://app.swaggerhub.com/apis/AGL/Settings/2.0.0

*/

export class SettingsApi implements IMockApi {

    private router: Router;
    private hostKey = `aglSettingsApi`;

    constructor() {

        this.router = express.Router();

        // MIDDLEWARE
        this.router.use(Attributes.DemandBearerToken, (req: Request, res: Response, next: NextFunction) => {
            next();
        });

    }

    public registerRoutes(): Router {

        this.router.route('/v2/paymentmethods')
            .get((req: Request, res: Response) => {
                let routeCacheKey = `/v2/paymentmethods`;
                let result = this.load(routeCacheKey, req, res);
                res.status(result.status).send(result.body);
            })
            .post((req: Request, res: Response) => {

                let routeCacheKey = `/v2/paymentmethods`;
                let randomId = this.createRandomPaymentMethodId();
                let newEntry = {
                    id: randomId,
                    creditCard: req.body['creditCard'] || null,
                    bank: req.body['bank'] || null,
                    payPal: req.body['payPal'] || null,
                    directDebitContractAccounts: [],
                    oneTouchPayContractAccounts: []
                };

                let result = CacheManager.getItem(req, routeCacheKey);
                if (!result) {
                    result = {
                        status: 200,
                        headers: [],
                        body: []
                    };
                }

                console.log(`Created new payment method ${randomId}`);

                let settingDirectDebit = false;

                if (req.body.directDebitContractAccount) {
                    result = this.cancelPaymentArrangementsForAccount(result, req.body.directDebitContractAccount);
                    newEntry.directDebitContractAccounts.push(req.body.directDebitContractAccount);
                    console.log(`Configuring Direct Debit for payment method ${randomId} and contract ${req.body.directDebitContractAccount}`);
                } else if (req.body.oneTouchPayContractAccount) {
                    result = this.cancelPaymentArrangementsForAccount(result, req.body.oneTouchPayContractAccount);
                    newEntry.oneTouchPayContractAccounts.push(req.body.oneTouchPayContractAccount);
                    console.log(`Configuring One Touch Pay for payment method ${randomId} and contract ${req.body.directDebitContractAccount}`);
                }

                result.body.push(newEntry);
                CacheManager.saveItem(req, routeCacheKey, result);
                res.status(200).send();
            });

        this.router.route('/v2/paymentmethods/:id/directDebitContractAccounts')
            .post((req: Request, res: Response) => {
                const contractAccountNumber = req.body.contractAccountNumber;
                const paymentMethodId = req.params.id;

                if (!contractAccountNumber) {
                    res.status(422).json({
                        errors: [{
                            code: 'Required',
                            field: 'contractAccountNumber',
                            message: 'Contract account number is requied'
                        }]
                    });
                }
                const routeCacheKey = `/v2/paymentmethods`;
                let result = this.load(routeCacheKey, req, res);

                if (result) {
                    // Cancels any payment arrangements for this contract (A contract can only have 1 payment arrangement)
                    result = this.cancelPaymentArrangementsForAccount(result, contractAccountNumber);

                    const paymentMethodIndex = result.body.findIndex((item) => {
                        return item.id === paymentMethodId;
                    });

                    if (paymentMethodIndex !== -1) {
                        result.body[paymentMethodIndex].directDebitContractAccounts.push(contractAccountNumber);
                        CacheManager.saveItem(req, routeCacheKey, result);
                        console.log(`Created new Direct Debit payment arrangement for payment method ${paymentMethodId} and contract ${contractAccountNumber}`);
                        res.status(200).send();
                    }
                }

                res.status(400).send();
            });

        this.router.route('/v2/paymentmethods/:id/oneTouchPayContractAccounts')
            .post((req: Request, res: Response) => {

                const contractAccountNumber = req.body.contractAccountNumber;
                const paymentMethodId = req.params.id;

                if (!req.body.contractAccountNumber) {
                    res.status(422).json({
                        errors: [{
                            code: 'Required',
                            field: 'contractAccountNumber',
                            message: 'Contract account number is requied'
                        }]
                    });
                }
                let routeCacheKey = `/v2/paymentmethods`;
                let result = this.load(routeCacheKey, req, res);

                if (result) {
                    // Cancels any payment arrangements for this contract (A contract can only have 1 payment arrangement)
                    result = this.cancelPaymentArrangementsForAccount(result, contractAccountNumber);

                    let paymentMethodIndex = result.body.findIndex((item) => {
                        return item.id === paymentMethodId;
                    });

                    if (paymentMethodIndex !== -1) {
                        result.body[paymentMethodIndex].oneTouchPayContractAccounts.push(contractAccountNumber);
                        CacheManager.saveItem(req, routeCacheKey, result);
                        console.log(`Created new One Touch Pay payment arrangement for payment method ${paymentMethodId} and contract ${contractAccountNumber}`);
                        res.status(200).send();
                    }
                }
                res.status(400).send();
            });

        this.router.route('/v2/paymentmethods/:id/directDebitContractAccounts/:contractAccountNumber')
            .delete((req: Request, res: Response) => {
                let routeCacheKey = `/v2/paymentmethods`;
                let result = this.load(routeCacheKey, req, res);

                if (result) {
                    let paymentMethodIndex = result.body.findIndex((item) => {
                        return item.id === req.params.id;
                    });
                    if (paymentMethodIndex !== -1) {
                        let accountNumber = Number(req.params.contractAccountNumber);
                        if (isNaN(accountNumber)) {
                            console.log('Account number passed is not a number');
                            res.status(400).send();
                        } else {
                            let contractAccountNumberIndex = result.body[paymentMethodIndex].directDebitContractAccounts.indexOf(accountNumber);
                            result.body[paymentMethodIndex].directDebitContractAccounts.splice(contractAccountNumberIndex, 1);
                            CacheManager.saveItem(req, routeCacheKey, result);
                            res.status(200).send();
                        }
                    }
                }
                res.status(400).send();
            });

        this.router.route('/v2/paymentmethods/:id/oneTouchPayContractAccounts/:contractAccountNumber')
            .delete((req: Request, res: Response) => {
                let routeCacheKey = `/v2/paymentmethods`;
                let result = this.load(routeCacheKey, req, res);

                if (result) {
                    let paymentMethodIndex = result.body.findIndex((item) => {
                        return item.id === req.params.id;
                    });
                    if (paymentMethodIndex !== -1) {
                        let accountNumber = Number(req.params.contractAccountNumber);
                        if (isNaN(accountNumber)) {
                            console.log('Account number passed is not a number');
                            res.status(400).send();
                        } else {
                            let contractAccountNumberIndex = result.body[paymentMethodIndex].oneTouchPayContractAccounts.indexOf(accountNumber);
                            result.body[paymentMethodIndex].oneTouchPayContractAccounts.splice(contractAccountNumberIndex, 1);
                            CacheManager.saveItem(req, routeCacheKey, result);
                            res.status(200).send();
                        }
                    }
                }
                res.status(400).send();
            });

        this.router.route('/v2/paymentmethods/:id')
            .delete(Attributes.DemandCorrelationId, (req: Request, res: Response) => {

                const paymentMethodToDelete = req.params.id;

                let routeCacheKey = `/v2/paymentmethods`;
                let result = this.load(routeCacheKey, req, res);

                let filteredBody = result.body.filter((item) => {
                    return item.id !== paymentMethodToDelete;
                });
                result.body = filteredBody;

                console.log(`Deleted ${req.params.id} from payment methods`);
                res.status(200).send();
            });

        this.router.route('/v1/Account/Billing/DirectDebit/SetUpPaypal')
            .post((req: Request, res: Response) => {
                FileOperations.serveStaticFile(req, res, `/paypal/setUpPaypal.json`);
            });

        // BILL DELIVERY PREFERENCES

        this.router.route('/v2/billdeliverypreferences')
            .get(Attributes.DemandCorrelationId, (req: Request, res: Response) => {
                let item = CacheManager.getItem(req, CacheTable.BillingDeliveryPreferences.toString());
                if (!item) {
                    item = FileOperations.loadContentFromDataFile(req, this.hostKey);
                    CacheManager.saveItem(req, CacheTable.BillingDeliveryPreferences.toString(), item);
                }
                res.status(item.status).send(item.body);
            });

        this.router.route('/v2/billdeliverypreferences/:billDeliveryMode/contractAccounts')
            .post(Attributes.DemandCorrelationId, (req, res) => {

                let newPreference: string = '';
                let accountNumber: number;
                let model = req.body;

                if (model && model['contractAccountNumber']) {
                    accountNumber = model['contractAccountNumber'];

                    if (req && req.params && req.params['billDeliveryMode']) {
                        newPreference = req.params['billDeliveryMode'];
                        let newMethod: BillDeliveryMethodType = null;

                        switch (newPreference) {
                            case 'Postal' : {
                                newMethod = BillDeliveryMethodType.Postal;
                                break;
                            }
                            case 'Email' : {
                                newMethod = BillDeliveryMethodType.Email;
                                break;
                            }
                            case 'NotApplicable' : {
                                newMethod = BillDeliveryMethodType.NotApplicable;
                                break;
                            }
                            case 'BPayView' : {
                                newMethod = BillDeliveryMethodType.BPayView;
                                break;
                            }
                            default: {
                                console.warn(`INVALID bill method specified`);
                                res.status(400).json({
                                    message: 'Invalid bill delivery method'
                                });
                                return;
                            }
                        }

                        let item = CacheManager.getItem(req, CacheTable.BillingDeliveryPreferences.toString());
                        if (!item) {
                            item = FileOperations.loadContentFromDataFile(req, this.hostKey);
                        }

                        let billDeliveryGroups: BillDelivery[] = item.body;
                        let indexOfAccount: number;

                        let currentBillGroup: BillDelivery = billDeliveryGroups.find((billDeliveryGroup) => {
                            indexOfAccount = billDeliveryGroup.contractAccountNumbers.indexOf(accountNumber);
                            return (indexOfAccount !== -1);
                        });

                        if (currentBillGroup && indexOfAccount !== -1) {
                            if (currentBillGroup.contractAccountNumbers.length === 1) {
                                billDeliveryGroups = billDeliveryGroups.filter((bdg: BillDelivery) => {
                                    return (bdg.billDeliveryMode !== currentBillGroup.billDeliveryMode);
                                });
                            } else {
                                currentBillGroup.contractAccountNumbers.splice(indexOfAccount, 1);
                            }
                        }

                        let targetBillGroup: BillDelivery = billDeliveryGroups.find((b) => b.billDeliveryMode === newMethod);
                        // The target billing group doesn't exist; let's create it and add the account
                        if (!targetBillGroup) {
                            // Create it
                            targetBillGroup = new BillDelivery(
                                [
                                    accountNumber
                                ],
                                newMethod
                            );
                            billDeliveryGroups.push(targetBillGroup);
                        } else {
                            if (!targetBillGroup.contractAccountNumbers.find((c) => c === accountNumber)) {
                                targetBillGroup.contractAccountNumbers.push(accountNumber);
                            }
                        }

                        item.body = billDeliveryGroups;
                        CacheManager.saveItem(req, CacheTable.BillingDeliveryPreferences.toString(), item);

                        res.send(`{}`);

                    }
                } else {
                    res.status(422).json(
                        {
                            errors: [
                                {
                                    code: 'Required',
                                    field: 'contractAccountNumber',
                                    message: 'Contract account number is requied'
                                }
                            ]
                        }
                    );
                }
            });

        this.router.route('/v2/contractAccounts/:contractAccountNumber/monthlyBilling/eligibilities')
            .get(Attributes.DemandCorrelationId, (req, res) => {
                // 2 second delay to simulate the lengthy wait from SAP
                setTimeout(() => {
                    FileOperations.serveContentFromDiskBasedOnUrl(req, res, this.hostKey);
                }, 2000);
            });

        this.router.route('/v2/contractAccounts/:contractAccountNumber/billingFrequencies')
            .get(Attributes.DemandCorrelationId, (req, res) => {
                FileOperations.serveContentFromDiskBasedOnUrl(req, res, this.hostKey);
            });

        this.router.route('/v2/contracts/:contractNumber/monthlyBilling/billDateOptions')
            .get(Attributes.DemandCorrelationId, (req, res) => {
                FileOperations.serveContentFromDiskBasedOnUrl(req, res, this.hostKey);
            });

        this.router.route('/v2/contracts/:contractNumber/monthlyBilling')
            .post(Attributes.DemandCorrelationId, (req, res) => {
                let contract = req.params.contractNumber;
                let model = req.body;
                let cache = CacheManager.getItem(req, 'monthlybilling');
                if (!cache) {
                    cache = [];
                }
                let newMonthlyBillingEntry = {
                    contract: contract,
                    data: model
                };
                console.log(`Setting up monthly billing for: ${contract}`);
                console.log(JSON.stringify(newMonthlyBillingEntry));
                cache.push(newMonthlyBillingEntry);
                CacheManager.saveItem(req, 'monthlybilling', cache);
                console.log(JSON.stringify(cache));
                res.status(200).json({});
            })
            .delete(Attributes.DemandCorrelationId, (req, res) => {
                let cache = CacheManager.getItem(req, 'monthlybilling');
                if (cache) {
                    let contract = req.params.contractNumber;
                    let filteredBody = cache.filter((item) => {
                        return item.contract !== contract;
                    });
                    console.log(`Deleting item ${contract}`);
                    console.log(JSON.stringify(filteredBody));
                    CacheManager.saveItem(req, 'monthlybilling', filteredBody);
                    FileOperations.serveContentFromDiskBasedOnUrl(req, res, this.hostKey);
                } else {
                    res.status(404).json({
                        message: 'Not Found'
                    });
                }
            });

        return this.router;

    }

    private createRandomPaymentMethodId() {
        return 'C' + Math.trunc(Math.random() * 1000000);
    }

    private load(routeCacheKey, req, res): any {
        let result = {};
        let cache = CacheManager.getItem(req, routeCacheKey);
        if (cache) {
            result = cache;
        } else {
            result = FileOperations.loadContentFromDataFile(req, this.hostKey);
            CacheManager.saveItem(req, routeCacheKey, result);
        }
        return result;
    }

    private cancelPaymentArrangementsForAccount(entity, contractAccountNumber) {
        entity.body.forEach((walletEntry) => {
            walletEntry.directDebitContractAccounts = walletEntry.directDebitContractAccounts.filter((item) => {
                return (item !== contractAccountNumber);
            });
        });
        entity.body.forEach((walletEntry) => {
            walletEntry.oneTouchPayContractAccounts = walletEntry.oneTouchPayContractAccounts.filter((item) => {
                return (item !== contractAccountNumber);
            });
        });
        return entity;
    }

}
