import { Observable } from 'rxjs/Observable';

import { AccountViewModel } from '../account.service';

export abstract class IPaygAccountService {

    public abstract getPaygDetails(accounts: AccountViewModel[]): Observable<boolean>;

}
