import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { IPaymentSchemeApi } from './paymentSchemeApi.service';

export abstract class IPaymentExtensionApplication {
    public abstract submit(contractNumber: string, extendedDueDate: Date): Observable<boolean>;
}

@Injectable()
export class PaymentExtensionApplicationService implements IPaymentExtensionApplication {
    constructor(
        private _router: Router,
        private api: IPaymentSchemeApi
    ) {}

    public submit(contractNumber: string, extendedDueDate: Date): Observable<boolean> {
        return this.api.submitPaymentArrangementExtension(contractNumber, extendedDueDate)
        .map((result) => {
            return true;
        })
        .catch((result) => {
            return Observable.of(false);
        });
    }
}
