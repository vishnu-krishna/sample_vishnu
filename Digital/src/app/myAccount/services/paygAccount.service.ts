import { Injectable } from '@angular/core';
import union from 'lodash-es/union';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { PaygProductAttribue } from '../../shared/globals/paygConstants';
import { PrePaymentBalanceTopUpUrgency } from '../../shared/globals/prePaymentBalanceTopUpUrgency';
import { PrePaymentBalanceType } from '../../shared/globals/prePaymentBalanceType';
import { PrePaymentBalance } from '../../shared/model/product/prePaymentBalance.model';
import { Product } from '../../shared/model/product/product.model';
import * as api from '../../shared/service/api.service';
import { ContentService } from '../../shared/service/content.service';
import { IProductApiService } from '../../shared/service/contract/iproductApi.service';
import { Now } from '../../shared/service/now.service';
import { AccountViewModel, ContractViewModel } from './account.service';
import { FeatureFlagTypes } from './featureFlag.constants';
import { FeatureFlagService } from './featureFlag.service';

@Injectable()
export class PaygAccountService {
    private productSwapPrepaidEnabled: boolean;

    constructor(
        private _productApiService: IProductApiService,
        private _contentService: ContentService,
        private _api: api.ApiService,
        private _now: Now,
        private _featureFlagService: FeatureFlagService
    ) {
    }

    /**
     * gets whether the account is payg or not
     * @param {AccountViewModel[]} accounts
     */
    public getPaygDetails(accounts: AccountViewModel[]): Observable<boolean> {
        let contractList: ContractViewModel[] = [];

        return new Observable((observer) => {
            Observable
            .forkJoin(this._contentService.getContent(),
            this._featureFlagService.featureFlagged(FeatureFlagTypes.productSwapPrepaidEnabled)).subscribe(([content, productSwapPrepaidEnabled]) => {
                // first check if the payg flag is active
                if (content.selfService &&
                    content.selfService.payg &&
                    content.selfService.payg.isActive) {
                    // loop through each contract of every account and find all the contracts that are not
                    // restricted or inflight
                    accounts.forEach((account) =>
                        account.contracts.forEach((contract) => {
                            // Restricting product call for restrict and Inflight Contract
                            if (!contract.isRestricted && !contract.isInFlight) {
                                contractList.push(contract);
                            }
                        }));
                    this.getPaygProducts(contractList).subscribe((productPaygList) => {
                        this.getPrepaidBalance(accounts).subscribe((result) => {
                            observer.next(true);
                            observer.complete();
                        });
                    });
                    this.productSwapPrepaidEnabled = productSwapPrepaidEnabled;
                } else {
                    observer.next(true);
                    observer.complete();
                }
            });
        });
    }
    /**
     * checks whether the contract can be checked for payg
     * @param {ContractViewModel} contract
     */
    private contractIsPaygValid(contract: ContractViewModel): boolean {
        if (contract.productId === undefined || contract.productId === null || contract.productId === '') {
            return false;
        }
        if (contract.regionId === undefined || contract.regionId === null || contract.regionId === '') {
            return false;
        }
        if (contract.isRestricted || contract.isInFlight) {
            return false;
        }
        return true;
    }
    /**
     * gets a list of all the products and sets the contract to whether it is payg or not
     * @param {ContractViewModel[]} contractList
     */
    private getPaygProducts(contractList: ContractViewModel[]): Observable<ProductPaygModel[]> {
        let products: ProductPaygModel[] = [];

        // get a unique list of the products
        let productList = union(contractList.filter(
            (result) => {
                return this.contractIsPaygValid(result);
            })
            .map((result) => {
                return result.productId;
            }));

        let productRequests: Array<Observable<Product>> = [];
        if (productList.length > 0) {
            // loop through each product and create a list of subscriptions
            productList.forEach((product) => {
                productRequests.push(this._productApiService.GetProductAttribute(product));
            });
            return Observable
                .forkJoin(productRequests)
                .map((productResults) => {
                    // loop through the contract products
                    for (let contract of contractList) {
                        if (this.contractIsPaygValid(contract)) {
                            // loop through the results from the forkjoin
                            for (let productResult of productResults) {
                                contract.isPayg = this.setPayg(productResult, contract);
                                if (contract.isPayg) {
                                    break;
                                }
                            }
                        }
                    }
                    return products;
                });

        } else {
            return Observable.of(products);
        }
    }

    /**
     * checks to see if the contract should be set to payg or not
     * @param {Product} productResult - the product retrieved from the http call
     * @param {ContractViewModel} contract
     */
    private setPayg(productResult: Product, contract: ContractViewModel): boolean {
        if (productResult !== null && !productResult.invalid) {
            if (productResult.id === contract.productId) {
                let productFound = productResult.attributes.find((attribute) => {
                    return attribute.id === PaygProductAttribue.PaygProductAttributeId &&
                        attribute.value === PaygProductAttribue.PaygProductAttributeValue &&
                        (attribute.regionId === contract.regionId || attribute.regionId === undefined);
                });
                if (productFound !== undefined) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * gets the prepaid balance
     * @param {AccountViewModel[]} accounts
     */
    private getPrepaidBalance(accounts: AccountViewModel[]): Observable<boolean> {

        let prePaymentModels: Array<Observable<PrePaymentBalance>> = [];
        accounts.forEach((account) => {
            account.contracts.forEach((contract) => {
                if (contract.isPayg) {
                    prePaymentModels.push(this._api.getPrePaymentBalance(contract.contractNumber));
                }
            });
        });

        if (prePaymentModels.length > 0) {
            return Observable
                .forkJoin(prePaymentModels)
                .map((prePayments) => {
                    if (prePayments !== null) {
                        prePayments.forEach((prePaymentModel) => {
                            if (prePaymentModel !== null && prePaymentModel.hasOwnProperty('contractNumber')) {
                                accounts.forEach((account) => {
                                    account.contracts.forEach((contract) => {
                                        if (contract.contractNumber === prePaymentModel.contractNumber.toString()) {
                                            contract.paygBalance = PrePaymentBalanceType[prePaymentModel.balanceType] === PrePaymentBalanceType.Credit ? prePaymentModel.balance : (-(prePaymentModel.balance));
                                            contract.paygBand = PrePaymentBalanceTopUpUrgency[prePaymentModel.balanceTopUpUrgency];
                                            if (prePaymentModel.hasOutstandingBalanceWithinFPDD && prePaymentModel.isProductSwapUser && this.productSwapPrepaidEnabled) {
                                                contract.showOutstandingBillPayg = prePaymentModel.hasOutstandingBalanceWithinFPDD;
                                                contract.outstandingBill = prePaymentModel.previousPlanFinalBalance.balance ? prePaymentModel.previousPlanFinalBalance.balance : 0;
                                                contract.prepaidCharges = prePaymentModel.prepaidPlanBalance.balance ? prePaymentModel.prepaidPlanBalance.balance : 0;
                                                contract.prepaidCredit = prePaymentModel.prepaidPlanBalance.balanceType === 'Credit' ? true : false ;
                                                contract.paygPrepaymentEligibile = moment(new Date(prePaymentModel.firstPrepaymentDueDate)).isAfter(this._now.date()) ? moment(new Date(prePaymentModel.firstPrepaymentDueDate)).toString() : null;
                                            } else if (prePaymentModel.firstPrepaymentDueDate !== null && prePaymentModel.firstPrepaymentDueDate !== undefined) {
                                                contract.paygPrepaymentEligibile = moment(new Date(prePaymentModel.firstPrepaymentDueDate)).isAfter(this._now.date()) ? moment(new Date(prePaymentModel.firstPrepaymentDueDate)).toString() : null;
                                            }
                                        }
                                    });
                                });
                            }

                        });
                    }
                    accounts.forEach((account) => {
                        account.contracts.forEach((contract) => {
                            if (contract.isPayg && contract.paygBand === undefined && contract.paygBalance === undefined) {
                                contract.paygBalance = null;
                                contract.paygBand = PrePaymentBalanceTopUpUrgency.Unavailable;
                            }
                        });
                    });

                    return true;
                });
        } else {
            return Observable.of(true);
        }
    }

}

export class ProductPaygModel {
    public productId: string;
    public regionId: string;
    public payg: boolean;
}
