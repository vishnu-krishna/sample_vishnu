import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../shared/model/product/product.model';
import { BonusBand } from '../model/payment/bonusBand.model';
import { BonusBandApiModel } from '../model/payment/bonusBandApi.model';
import { IProductRepository } from '../repository/contract/iproduct.repository';
import { IProductApiService } from './contract/iproductApi.service';

@Injectable()
export class ProductApiService implements IProductApiService {

    constructor(
        private _repository: IProductRepository
    ) {
    }

    public GetProductAttribute(productId: string): Observable<Product> {
        let endpoint = `/products/${productId}`;
        return this._repository.get<Product>(endpoint, null)
        .map((product) => {
            if (this.isEmpty(product)) {
                console.warn(`The product "${productId}" returned by the Product API is associated with the user but does not exist (it was returned as a property-less object). Discarding it.`);
                return null;
            }

            return product;
        })
        .catch((err) => {
            return Observable.of(null); // TODO: consider fixing / changing
        });
    }
    public GetBonusBand(productId: string, regionId: string): Observable<BonusBand[]> {
        let endpoint = `/products/${productId}/bonuses?regionId=${regionId}`;
        return this._repository.get<BonusBandApiModel[]>(endpoint, null).map((result) => {
            let bonusBandlist: BonusBand[] = [];
            result.forEach((data) => {
                if (data.lowerBand > 0) {
                    let bonusBand = new BonusBand();
                    bonusBand.lowerBand = data.lowerBand;
                    bonusBand.upperBand = data.isUpperBandApplicable ? data.upperBand : 9999999999;
                    bonusBand.bonus = data.bonus;
                    bonusBandlist.push(bonusBand);
                }
            });
            bonusBandlist = bonusBandlist.sort((a, b) => {
                return a.lowerBand - b.lowerBand;
            });
            return bonusBandlist;
        }).catch((err) => {
            return Observable.of([]);
        });
    }

    private isEmpty(product: Product): boolean {
        return !product.attributes || !product.id;
    }
}
