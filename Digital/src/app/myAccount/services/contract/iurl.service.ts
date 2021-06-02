import { Observable } from 'rxjs/Observable';

export abstract class IUrlService {
    public abstract observeOneUrlChange(): Observable<boolean>;
}
