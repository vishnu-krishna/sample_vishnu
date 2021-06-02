import { async, inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DeepLinkRoutingGuard } from '../deepLinkRouting.guard';

describe('AuthGuardService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeepLinkRoutingGuard],
      imports: [RouterTestingModule]
    });
  });

  describe('Deep Link Routing Guard', () => {

    it('go to the url provided in the session storage without query string params',
      // inject your guard service AND Router
      async(inject([DeepLinkRoutingGuard, Router], (auth, router) => {
        let temp = {};
        temp['navigateurl'] = '/settings';
        sessionStorage.setItem('queryArgs', JSON.stringify(temp));

        const promise = Promise.resolve(true);

        spyOn(router, 'navigate').and.returnValue(promise);

        expect(auth.canActivate()).toBeTruthy();
        expect(router.navigate).toHaveBeenCalledWith(['/settings'], undefined);
      }))
    );

    it('go to the url provided in the session storage with query string params',
      async(inject([DeepLinkRoutingGuard, Router], (auth, router) => {
        let temp = {};
        temp['navigateurl'] = '/settings?someKey1=someVal1&someKey2=someVal2';
        sessionStorage.setItem('queryArgs', JSON.stringify(temp));

        const promise = Promise.resolve(true);

        spyOn(router, 'navigate').and.returnValue(promise);

        expect(auth.canActivate()).toBeTruthy();
        expect(router.navigate).toHaveBeenCalledWith(['/settings'], { queryParams: { someKey1: 'someVal1', someKey2: 'someVal2' } });
      }))
    );

    it('navigateurl is removed from session storage after it has been used once',
      async(inject([DeepLinkRoutingGuard, Router], (auth, router) => {
        let temp = {};
        temp['navigateurl'] = '/settings?someKey1=someVal1&someKey2=someVal2';
        sessionStorage.setItem('queryArgs', JSON.stringify(temp));

        const promise = Promise.resolve(true);

        spyOn(router, 'navigate').and.returnValue(promise);

        expect(JSON.parse(sessionStorage.getItem('queryArgs')).navigateurl).toBeTruthy('navigateurl should initially be in queryArgs');

        expect(auth.canActivate()).toBeTruthy();
        expect(router.navigate).toHaveBeenCalledWith(['/settings'], { queryParams: { someKey1: 'someVal1', someKey2: 'someVal2' } });

        expect(JSON.parse(sessionStorage.getItem('queryArgs')).navigateurl).toBeFalsy('navigateurl should removed from queryArgs');
      }))
    );

    it('redirect to overview page when there is no navigateUrl in session storage',
      async(inject([DeepLinkRoutingGuard, Router], (auth, router) => {
        let temp = {};
        temp['randomArg'] = 'randomArg';
        sessionStorage.setItem('queryArgs', JSON.stringify({}));

        const promise = new Promise((resolve, reject) => { /* empthy */ });

        spyOn(router, 'navigate').and.returnValue(promise);

        expect(auth.canActivate()).toBeTruthy();
        expect(router.navigate).toHaveBeenCalledWith(['/overview']);
      }))
    );

    it('redirect to overview page when there is no queryArgs in session storage',
      async(inject([DeepLinkRoutingGuard, Router], (auth, router) => {
        sessionStorage.clear();

        spyOn(router, 'navigate');

        expect(auth.canActivate()).toBeTruthy();
        expect(router.navigate).toHaveBeenCalledWith(['/overview']);
      }))
    );
  });
});
