import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { Observable } from 'rxjs/Observable';

import { ModalService } from '../../modal/modal.service';
import { FeatureIntroService } from '../services/featureIntro.service';
import { IFeatureIntroService } from '../services/iFeatureIntro.service';
import { RouterTestingModule } from '@angular/router/testing';

import { MauiButtonModule } from '../../maui/button';
import { FeatureIntroDetailComponent } from '../featureIntroDetail/featureIntroDetail.component';
import { FeatureIntro } from '../shared/featureIntro';
import { FeatureIntroModalComponent } from './featureIntroModal.component';
import { FeatureIntroAnalytics } from '../services/featureIntro-analytics';
import { FeatureIntroAnalyticsMock } from '../services/mock/featureIntro-analytics-mock';

describe('FeatureIntroModalComponent', () => {
    let comp: FeatureIntroModalComponent;
    let fixture: ComponentFixture<FeatureIntroModalComponent>;
    let de: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MauiButtonModule,
                RouterTestingModule
            ],
            declarations: [
                FeatureIntroModalComponent,
                FeatureIntroDetailComponent
            ],
            providers: [
                { provide: FeatureIntroService, useClass: FeatureIntroServiceMock },
                { provide: ModalService, useClass: ModalServiceMock },
                { provide: MATERIAL_SANITY_CHECKS, useValue: false },
                { provide: FeatureIntroAnalytics, useClass: FeatureIntroAnalyticsMock }
            ]
        });

        fixture = TestBed.createComponent(FeatureIntroModalComponent);
        comp = fixture.componentInstance;
        comp.featureIntros = loadFeatureIntros();

        fixture.detectChanges();

        de = fixture.debugElement;
    });

    it('should mark feature intro as viewed when clicking close', () => {
        const modalService = fixture.debugElement.injector.get(ModalService);
        let modalCloseSpy = spyOn(modalService, 'close');
        const featureIntroService = fixture.debugElement.injector.get(FeatureIntroService);
        let introViewedSpy = spyOn(featureIntroService, 'markFeatureIntroAsViewed').and.callThrough();

        expect(comp.featureIntros[0].hasViewed).toBeFalsy();
        expect(comp.featureIntros[1].hasViewed).toBeFalsy();

        comp.dismissFeatureIntro(false);
        fixture.detectChanges();

        expect(modalCloseSpy.calls.count()).toEqual(0);
        expect(introViewedSpy.calls.count()).toEqual(1);

        expect(comp.featureIntros[0].hasViewed).toBeFalsy();
        expect(comp.featureIntros[1].hasViewed).toBeTruthy();

        comp.dismissFeatureIntro(false);
        fixture.detectChanges();

        expect(modalCloseSpy.calls.count()).toEqual(1);
        expect(introViewedSpy.calls.count()).toEqual(2);
    });

    function loadFeatureIntros(): FeatureIntro[] {
        let intros = [{
            featureId: 'Rewards',
            startDate: '2017-01-25',
            endDate: '2017-01-31',
            priority: 1,
            content: {
              heading: 'Rewards is here',
              description: 'Feature intro description.',
              image: '/public/lib/icons/feature.png'
            }
        }, {
            featureId: 'FeatureIntro2',
            startDate: '2017-01-25',
            endDate: '2017-01-31',
            priority: 1,
            content: {
              heading: 'Test Feature',
              description: 'Feature intro description.',
              image: '/public/lib/icons/feature.png'
            }
        }];

        let intro1 = new FeatureIntro();
        Object.assign(intro1, intros[0]);

        let intro2 = new FeatureIntro();
        Object.assign(intro2, intros[1]);

        return [intro2, intro1];
    }

});

class FeatureIntroServiceMock implements IFeatureIntroService {

    public markFeatureIntroAsViewed(featureId: string): Observable<boolean> {
        return Observable.of(true);
    }

    public getFeatureIntros(): Observable<FeatureIntro[]> {
        return Observable.of([]);
    }
}

class ModalServiceMock {
    public close() { return; }
}
