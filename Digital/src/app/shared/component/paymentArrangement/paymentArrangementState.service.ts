import { Injectable } from '@angular/core';

@Injectable()
export class PaymentArrangementStateService implements IPaymentArrangementStateService  {

    public isUpdatingPaymentArrangement: boolean = false;
    public hasSmsPaySetup: boolean = false;
    public hasDirectDebitSetup: boolean = false;
    private accountsBeingUpdated: string[] = [];

    public isUpdatingAccount(account: string): boolean {
        return (this.accountsBeingUpdated.indexOf(account) !== -1);
    }

    public updateStarted(account: string) {
        this.accountsBeingUpdated.push(account);
    }

    public updateCompleted(account: string) {
        let item = this.accountsBeingUpdated.indexOf(account);
        if (item !== -1) {
            this.accountsBeingUpdated.splice(item, 1);
        }
    }
}

export abstract class IPaymentArrangementStateService {
    public abstract isUpdatingPaymentArrangement: boolean;
    public abstract hasSmsPaySetup: boolean;
    public abstract hasDirectDebitSetup: boolean;

    public abstract isUpdatingAccount(account: string): boolean;
    public abstract updateStarted(account: string);
    public abstract updateCompleted(account: string);
}
