import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import * as ApiModel  from '../../model/api.model';

export abstract class IApiv2Repository {
    public abstract errors: Subject<any>;
    public abstract get<T>( endpoint: string, useCache: boolean, isJson: boolean, parameters?: URLSearchParams): Observable<T>;
    public abstract post<T>(apiOptions: ApiModel.ApiV2RequestOptions): Observable<T>;
    public abstract patch<T>(apiOptions: ApiModel.ApiV2RequestOptions): Observable<T>;
    public abstract postForm<T>(apiOptions: ApiModel.ApiV2RequestOptions, formSubmissionData: FormData): Observable<T>;
}
