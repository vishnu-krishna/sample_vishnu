import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { ConcessionDeepLinkEntryModule } from './concessionDeepLinkEntry.module';
import { ConcessionDeepLinkEntryComponent } from './concessionDeepLinkEntry.component';

describe('Concession Deep Link Entry Component', () => {
    let fixture: ComponentFixture<ConcessionDeepLinkEntryComponent>;
    let router: Router;

    beforeEach(() => {
        const routerStub = {
            navigate: (urls: string[]) => {
                throw new Error('not implemented');
            }
        };

        TestBed.configureTestingModule({
            imports: [
                ConcessionDeepLinkEntryModule
            ],
            providers: [
                { provide: Router, useValue: routerStub }
            ]
        });

        fixture = TestBed.createComponent(ConcessionDeepLinkEntryComponent);
        router = TestBed.get(Router);
    });

    it('should navigate to concession entry', () => {
        let routerSpy = spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

        fixture.detectChanges();

        expect(routerSpy).toHaveBeenCalledWith(['/settings/concession']);
    });
});
