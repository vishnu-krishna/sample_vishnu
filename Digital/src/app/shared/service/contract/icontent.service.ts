import { Observable }     from 'rxjs/Observable';

export interface IContentService {

    load(): Observable<any>;
    getLightMode(): Observable<boolean>;
    getContent(): Observable<any>;

}
