import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observer, Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { IUrlService } from './contract/iurl.service';

@Injectable()
export class UrlService implements IUrlService {
    constructor(
        private location: Location
    ) { }

    public observeOneUrlChange(): Observable<boolean> {
        return new Observable((observer: Observer<boolean>) => {
            const locationSubscription = <Subscription> (this.location.subscribe((location) => {
                locationSubscription.unsubscribe();
                observer.next(true);
                observer.complete();
            }));
        });
    }
}
