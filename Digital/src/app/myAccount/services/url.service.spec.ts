import { async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { UrlService } from './url.service';

describe('url service', () => {
    let location: any;
    location = {
        subscribe: (e) => {
            throw new Error ('subscribe is not implemented');
        }
    };

    it(`observeOneUrlChange`, async (() => {
        // arrange
        const urlService = new UrlService(location);

        // act
        spyOn(location, 'subscribe').and.returnValue(Observable.of(null));

        // assert
        urlService.observeOneUrlChange().subscribe((val: boolean) => {
            expect(val).toBe(true);
        });
    }));
});
