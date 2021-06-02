import { Observable } from 'rxjs/Observable';

export abstract class ISettingsApi {
    public abstract get<T>(url: string): Observable<T>;
    public abstract put<T>(url: string, body: T): Observable<T>;
    public abstract post<T>(url: string, body: T): Observable<T>;
    public abstract delete<T>(url: string): Observable<T>;
}
