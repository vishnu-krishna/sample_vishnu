import { Injectable }     from '@angular/core';

import { Observable }     from 'rxjs/Observable';

@Injectable()
export class PaymentStubService  {
    public getPaymentMethods(): Observable<any> {
        throw new Error('Method not implemented.');
    }
}
