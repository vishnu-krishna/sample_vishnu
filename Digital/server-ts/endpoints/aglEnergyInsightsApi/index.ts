import { EnergyInsightsEligibilityContract } from './../../../src/app/myAccount/services/settings/model/energyInsightsEligibilityContract';
import { EnergyInsightsUsage } from './../../../src/app/myAccount/services/settings/model/energyInsightsUsage';
import * as express from 'express';
import * as path from 'path';
import * as moment from 'moment';

import { Attributes } from '../../middleware/attributes';
import { FileOperations } from '../../common/fileOperations';
import { CacheManager } from '../../common/cacheManager';
import { IMockApi } from '../IMockApi';
import { Filters } from '../../middleware/filters';
import { SetupEnergyInsightsRequest } from '../../../src/app/myAccount/services/settings/model/setupEnergyInsightsRequest';
import { CacheTable } from '../../common/cacheTable';
import { BillDelivery } from '../../../src/app/myAccount/services/settings/model/billDelivery';
import { BillDeliveryMethodType } from '../../../src/app/myAccount/services/settings/model/billDeliveryMethodType';
import { AccountApiModel } from '../../../src/app/shared/service/api.service';

/*

BASED UPON https://app.swaggerhub.com/apis/AGL/EnergyInsights/1.0.0#/Energy_Insights/SaveEnergyInsightsSubscriptions

*/

export class EnergyInsightsApi implements IMockApi {

    private router: express.Router;
    private hostKey = `aglEnergyInsightsApi`;

    constructor() {

        this.router = express.Router();

        // MIDDLEWARE
        this.router.use(Attributes.DemandBearerToken, Attributes.DemandCorrelationId, (req: express.Request, res: express.Response, next: express.NextFunction) => {
            next();
        });

    }

    public registerRoutes(): express.Router {

        this.router.route('/v1/contractAccounts/:contractAccountNumber/energyInsights/subscriptions')
            .get(Filters.ValidateAccountNumber, (req: express.Request, res: express.Response) => {

                let accountNumber: number = req.params.contractAccountNumber;

                let subscriptionForAccount: any = FileOperations.loadContentFromDataFile(req, this.hostKey);
                if (!subscriptionForAccount) {
                    res.status(404).json(
                        {
                            message: 'Not Found'
                        }
                    );
                    return;
                }

                let subscriptionModelForAccount: EnergyInsightsEligibilityContract[] = subscriptionForAccount.body;

                // 1 second delay to simulate the lengthy wait from SAP
                setTimeout(() => {

                    // Determine if the account is on ebilling
                    let cachedItem = CacheManager.getItem(req, CacheTable.BillingDeliveryPreferences.toString());
                    let eBillingData: any;
                    if (!cachedItem) {
                        eBillingData = FileOperations.loadDataFromDiskForEndpoint(req, res, path.join(`aglSettingsApi`, `v2`, `billdeliverypreferences`));
                        CacheManager.saveItem(req, CacheTable.BillingDeliveryPreferences.toString(), eBillingData);
                    } else {
                        eBillingData = cachedItem;
                    }

                    let record: BillDelivery[] = eBillingData.body;

                    // Get the Bill Delivery record for the required account
                    let billDeliveryForAccount: BillDelivery = record.find((r) => {
                        if (r && r.contractAccountNumbers && r.contractAccountNumbers.length > 0) {
                            return r.contractAccountNumbers.some((c) => c.toString() === accountNumber.toString());
                        }
                    });

                    if (!billDeliveryForAccount) {
                        res.status(404).json(
                            {
                                message: 'Not Found'
                            }
                        );
                        return;
                    }

                    // If the account isn't setup for eBilling
                    if (billDeliveryForAccount.billDeliveryMode !== BillDeliveryMethodType.Email) {
                        // iterate through all contracts in the account
                        subscriptionModelForAccount.forEach((e: EnergyInsightsEligibilityContract) => {
                            // We only send error code 032 for a contract if there isn't another error
                            if (e.isEligible) {
                                e.isEligible = false;
                                e.ineligibleReason = {
                                    message: 'Energy insights registration is not allowed for bill distribution type apap',
                                    internal: {
                                        id: 'ZIDM_ENERGY_INSIGHT',
                                        number: '032',
                                        description: 'Energy insights registration is not allowed for bill distribution type apap'
                                    }
                                };
                            }
                        });
                    } else {
                        // Ensure that any non-ebill status are not sent back
                        subscriptionModelForAccount.forEach((e: EnergyInsightsEligibilityContract) => {
                            // We only send error code 032 for a contract if there isn't another error
                            if (!e.isEligible
                                    && e.ineligibleReason
                                    && e.ineligibleReason.internal
                                    && e.ineligibleReason.internal.number
                                    && e.ineligibleReason.internal.number === '032'
                                ) {
                                e.isEligible = true;
                                e.ineligibleReason = null;
                            }
                        });
                    }

                    res.status(200).json(subscriptionModelForAccount);

                }, 1000);
            });

        this.router.route('/v1/contracts/:contractNumber/usageBreakdown/billed/billStartDate/:billStartDate/billEndDate/:billEndDate')
            .get(Filters.ValidateContractNumber, (req: express.Request, res: express.Response) => {
                //

                /* We need to enforce strict parsing from the specified string format (YYYY-MM-DD) so
                 moment doesn't consider it valid */
                let startDateMoment: moment.Moment = moment(req.params.billStartDate, `YYYY-MM-DD`, true);
                let endDateMoment: moment.Moment = moment(req.params.billEndDate, `YYYY-MM-DD`, true);

                // Validations
                if (!startDateMoment.isValid()) {
                    res.status(400).json({ message: `Invalid billStartDate format` });
                    return;
                }
                if (!endDateMoment.isValid()) {
                    res.status(400).json({ message: `Invalid billEndDate format` });
                    return;
                }
                if (!startDateMoment.isBefore(endDateMoment)) {
                    res.status(400).json({ message: `billStartDate must be before billEndDate` });
                    return;
                }

                let dataModel: EnergyInsightsUsage;

                let data = FileOperations.loadContentFromDataFile(req, this.hostKey);

                if (data) {
                    console.log(`THE DATA IS:`);
                    console.log(data);
                    res.status(data.status).json(data.body);
                } else {
                    console.warn(`No mock data :(`);
                    res.status(404).json({ message: `Mock data file not located` });
                }
            });

        this.router.route('/v1/contracts/:contractNumber/energyInsights/subscriptions')
            .post(Filters.ValidateContractNumber, (req: express.Request, res: express.Response) => {

                let cacheKey: string = `energyInsights`;
                let contract: number = req.params.contractNumber;
                const allowedProperties: string[] = [
                    `subscribedToEndBillEnergyBreakdown`,
                    `subscribedToMidBillEnergyBreakdown`
                ];

                // The submitted model should be of this type
                let model: SetupEnergyInsightsRequest;
                try {
                    model = req.body as SetupEnergyInsightsRequest;
                } catch (err) {
                    res.status(422).json({
                        message: `Submitted model is invalid`
                    });
                    return;
                }

                // The submitted model must have a property that
                let hasNonNullAllowedProperty: boolean =
                    Object.keys(model).some((item: string) => {
                        return allowedProperties.includes(item) && model[item] !== null;
                    });

                if (!hasNonNullAllowedProperty) {
                    res.status(422).json({
                        errors: [
                            {
                                code: 'Required',
                                field: 'Subscriptions',
                                message: 'Subscriptions should not be empty.'
                            }
                        ]
                    });
                    return;
                }

                let cache = CacheManager.getItem(req, cacheKey);
                if (!cache) {
                    cache = [];
                }
                let newEnergyInsightsEntry = {
                    contract: contract,
                    data: model
                };

                console.log(`Setting up energy insights for: ${contract}`);
                console.log(JSON.stringify(newEnergyInsightsEntry));
                cache.push(newEnergyInsightsEntry);
                CacheManager.saveItem(req, cacheKey, cache);
                console.log(JSON.stringify(cache));

                // delay to simulate the lengthy wait from SAP
                setTimeout(() => {
                    res.status(204).send();
                }, 1000);
            });

        return this.router;

    }
}
