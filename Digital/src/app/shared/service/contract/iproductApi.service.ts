import { Observable } from 'rxjs/Observable';
import { BonusBand } from '../../model/payment/bonusBand.model';
import { Product } from '../../model/product/product.model';

export abstract class IProductApiService {
    public abstract GetProductAttribute(productId: string): Observable<Product>;
    public abstract GetBonusBand(productId: string, regionId: string): Observable<BonusBand[]>;
}
