import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export abstract class IMoveJoinRepository {
    public abstract errors: Subject<any>;
    public abstract authorizationError: Subject<any>;
    public abstract get<T>(endpoint: string): Observable<T>;
}
