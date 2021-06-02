import { Observable } from 'rxjs/Rx';

export abstract class IRewardsApiService {
    public abstract get(url: string, extraHeaders?: { [headerName: string]: string }): Observable<any>;
    public abstract post(url: string, body: any): Observable<any>;
    public abstract getAuthorizationToken(): string;
    public abstract put(url: string, body: any): Observable<any>;
}
