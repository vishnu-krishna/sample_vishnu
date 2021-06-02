import { RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export abstract class IWebService {

    public abstract havePendingRequests(): boolean;

    public abstract get(url: string, blocking?: boolean, options?: RequestOptions): Observable<Response>;
    public abstract post(url: string, body: any, blocking?: boolean, options?: RequestOptions): Observable<Response>;

    // Need to properly implement these
    public abstract head(): Observable<Response>;
    public abstract put(url: string, body: any, blocking?: boolean, options?: RequestOptions): Observable<Response>;
    public abstract delete(url: string, blocking?: boolean, options?: RequestOptions): Observable<Response>;
    public abstract options(): Observable<Response>;
    public abstract patch(): Observable<Response>;

}
