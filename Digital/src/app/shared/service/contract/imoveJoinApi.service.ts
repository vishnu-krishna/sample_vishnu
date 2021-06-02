import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { MoveGetResponseModel } from '../../model/oneMinMove/moveGetResponse.model';

export abstract class IMoveJoinApiService {
    public abstract GetOMMTracker(): Observable<MoveGetResponseModel>;
    public abstract get errors(): Subject<any>;
    public abstract get checkAuthorization(): Subject<any>;
    public abstract get checkExpiredOMM(): Subject<any>;
}
