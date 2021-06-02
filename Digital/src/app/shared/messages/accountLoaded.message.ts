import { AccountModel } from '../model/domain/account.model';
import { BaseMessage } from './base.message';

export class AccountLoadedMessage extends BaseMessage {

    public Account: AccountModel;

    constructor(account: AccountModel) {
        super();
        this.Account = account;
    }
}
