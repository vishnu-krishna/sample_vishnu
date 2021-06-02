import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../shared/model/product/product.model';
import { AccountViewModel, ContractViewModel } from './account.service';
import { IProductApiService } from '../../shared/service/contract/iproductApi.service';
import compact from 'lodash-es/compact';
import uniq from 'lodash-es/uniq';
import { ProductAttributeModel } from '../../shared/model/product/productAttribute.model';
import { MandatoryEBillingAttribue, MandatoryDirectDebitAttribue } from '../../shared/globals/paygConstants';

@Injectable()
export class ProductAttributesService {
    public static readonly payOnTimeDiscountAttributeId: string = 'ZPOT_TYP';

    private products: Product[] = null;

    constructor(private productApiService: IProductApiService) { }

    public processContractProductAttributes(accounts: AccountViewModel[]): void {
        this.getAttributes(accounts).subscribe(
            (products) => {
                this.processAttributes(accounts, products);
            }
        );
    }

    private getAttributes(accounts: AccountViewModel[]): Observable<Product[]> {

        const self = this;
        // use the details that have already been returned if populated
        if (this.products !== null) {
            return Observable.of(this.products);
        }

        // get a list of the products
        let productIds = accounts.reduce((ids, account) => {
            return ids.concat(account.contracts.map((contract) => {
                return contract.productId;
            }));
        }, []);

        // make the list of products unique
        productIds = uniq(compact(productIds));

        if (productIds.length > 0) {
            let productAttributeObservables = productIds.map((productId) => {
                return this.productApiService.GetProductAttribute(productId);
            });

            // return an array of attributes/subscriptions for the relevant contracts
            return Observable.forkJoin(productAttributeObservables)
                .map((results) => {
                    self.products = results;
                    return results;
                });
        } else {
            return Observable.of([]);
        }
    }

    private processAttributes(accounts: AccountViewModel[], products: Product[]): void {
        // need to compact the products to deal with the scenario that the service errors and returns nulls
        products = compact(products);

        if (products.length > 0) {
            accounts.forEach((account) => {
                account.contracts.forEach((contract) => {

                    // match the contract product id to the returned products
                    let product = products.find((p) =>
                        contract.productId === p.id
                    );
                    if (product) {
                        this.setPayOnTimeFlag(contract, product);
                        this.setMandatoryEBillingFlag(contract, product);
                        this.setMandatoryDirectDebitFlag(contract, product);
                    }
                });
            });
        }
    }

    private setPayOnTimeFlag(contract: ContractViewModel, product: Product): void {
        let attribute = product.attributes.find((a: ProductAttributeModel) =>
            a.id === ProductAttributesService.payOnTimeDiscountAttributeId
        );

        if (attribute) {
            contract.hasPayOnTimeDiscount = true;
        }
    }

    private setMandatoryEBillingFlag(contract: ContractViewModel, product: Product): void {

        contract.isMandatoryEBilling = product.attributes.some((attribute) => {
            return attribute.id === MandatoryEBillingAttribue.AttributeId &&
                attribute.value === MandatoryEBillingAttribue.AttributeValue;
        });
    }

    private setMandatoryDirectDebitFlag(contract: ContractViewModel, product: Product): void {

        contract.isMandatoryDirectDebit = product.attributes.some((attribute) => {
            return attribute.id === MandatoryDirectDebitAttribue.AttributeId &&
                attribute.value === MandatoryDirectDebitAttribue.AttributeValue;
        });
    }
}
