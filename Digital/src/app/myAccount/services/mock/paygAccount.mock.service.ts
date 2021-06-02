
import { Observable } from 'rxjs/Observable';
import { AccountViewModel } from '../account.service';
import { IPaygAccountService } from '../contract/ipaygaccount.service';

export class PaygAccountMockService implements IPaygAccountService {
    public getPaygDetails(accounts: AccountViewModel[]): Observable<boolean> {
        return Observable.of(false);
    }

}
