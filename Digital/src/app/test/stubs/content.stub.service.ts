import { Injectable }     from '@angular/core';

import { Observable }     from 'rxjs/Observable';

import { IContentService } from '../../shared/service/contract/icontent.service';

@Injectable()
export class ContentStubService implements IContentService {
    public load(): Observable<any> {
        throw new Error('Method not implemented.');
    }
    public getLightMode(): Observable<boolean> {
        throw new Error('Method not implemented.');
    }
    public getContent(): Observable<any> {
        throw new Error('Method not implemented.');
    }

}
