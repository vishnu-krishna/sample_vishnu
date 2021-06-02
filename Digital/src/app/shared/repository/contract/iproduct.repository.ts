import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export abstract class IProductRepository {
    public abstract errors: Subject<any>;
    public abstract get<T>(endpoint: string, parameters: URLSearchParams): Observable<T>;
    public abstract post<T>(endpoint: string, body: Object): Observable<T>;
}
