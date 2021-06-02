import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { Observable } from 'rxjs/Observable';

import { ModalService } from '../modal/modal.service';
import { IRewardsEligibilityService } from '../rewards';
import { FeatureIntroService } from './services/featureIntro.service';
import { IFeatureIntroService } from './services/iFeatureIntro.service';

import { RewardsEligibility } from '../rewards';
import { FeatureIntrosComponent } from './featureIntros.component';
import { FeatureIntro } from './shared/featureIntro';
import { FeatureIntroAnalytics } from './services/featureIntro-analytics';
import { FeatureIntroAnalyticsMock } from './services/mock/featureIntro-analytics-mock';

describe('FeatureIntrosComponent', () => {
    let comp: FeatureIntrosComponent;
    let fixture: ComponentFixture<FeatureIntrosComponent>;
    let de: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                FeatureIntrosComponent
            ],
            providers: [
                { provide: FeatureIntroService, useClass: FeatureIntroServiceMock },
                { provide: IRewardsEligibilityService, useClass: RewardsEligibilityServiceMock },
                { provide: ModalService, useClass: ModalServiceMock },
                { provide: MATERIAL_SANITY_CHECKS, useValue: false },
                { provide: FeatureIntroAnalytics, useClass: FeatureIntroAnalyticsMock }
            ]
        });

        fixture = TestBed.createComponent(FeatureIntrosComponent);
        comp = fixture.componentInstance;

        de = fixture.debugElement;
    });

    it('should load feature intros and display them on init', async(() => {
        let intros: FeatureIntro[] = [];
        let modalService = fixture.debugElement.injector.get(ModalService);
        spyOn(modalService, 'activate').and.callFake( (options ) => {
            intros = options.componentData.featureIntros;
            return Observable.of(true).toPromise();
        });

        fixture.detectChanges();

        fixture.whenStable().then(() => {
            fixture.detectChanges();

            expect(intros.length).toEqual(2);

            // the feature intro order will get reversed so they stack first on top
            expect(intros[0].featureId).toEqual(FeatureIntroServiceMock.intros[1].featureId);
            expect(intros[0].content.heading).toEqual(FeatureIntroServiceMock.intros[1].content.heading);
            expect(intros[1].featureId).toEqual(FeatureIntroServiceMock.intros[0].featureId);
            expect(intros[1].content.heading).toEqual(FeatureIntroServiceMock.intros[0].content.heading);

        });
    }));

    it('should not show the rewards feature intro if not eligible', async(() => {
        let eligibilityService = fixture.debugElement.injector.get(IRewardsEligibilityService);
        spyOn(eligibilityService, 'checkEligibility').and.returnValue(Observable.of(new RewardsEligibility()));

        let intros: FeatureIntro[] = [];
        let modalService = fixture.debugElement.injector.get(ModalService);
        spyOn(modalService, 'activate').and.callFake( (options ) => {
            intros = options.componentData.featureIntros;
            return Observable.of(true).toPromise();
        });

        fixture.detectChanges();

        fixture.whenStable().then(() => {
            fixture.detectChanges();

            expect(intros.length).toEqual(1);

            expect(intros[0].featureId).toEqual(FeatureIntroServiceMock.intros[1].featureId);
            expect(intros[0].content.heading).toEqual(FeatureIntroServiceMock.intros[1].content.heading);
        });
    }));

    it('should not show the feature intros if none loaded', async(() => {
        let featureIntroService = fixture.debugElement.injector.get(FeatureIntroService);
        spyOn(featureIntroService, 'getFeatureIntros').and.returnValue(Observable.of([]));

        let intros: FeatureIntro[] = [];
        let modalService = fixture.debugElement.injector.get(ModalService);
        let modalSpy = spyOn(modalService, 'activate');

        fixture.detectChanges();

        fixture.whenStable().then(() => {
            fixture.detectChanges();

            expect(modalSpy.calls.count()).toEqual(0);
        });
    }));

});

class FeatureIntroServiceMock implements IFeatureIntroService {
    public static readonly intros = [{
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

    public getFeatureIntros(): Observable<FeatureIntro[]> {
        let intro1 = new FeatureIntro();
        Object.assign(intro1, FeatureIntroServiceMock.intros[0]);

        let intro2 = new FeatureIntro();
        Object.assign(intro2, FeatureIntroServiceMock.intros[1]);

        return Observable.of([intro1, intro2]);
    }

    public markFeatureIntroAsViewed(featureId: string): Observable<boolean> {
        return Observable.of(true);
    }
}

class RewardsEligibilityServiceMock {
    public checkEligibility(): Observable<RewardsEligibility> {
        let result = new RewardsEligibility();
        result.isEligible = true;
        return Observable.of(result);
    }
}

class ModalServiceMock {
    public activate(options: Object): Promise<boolean> {
        return Observable.of(true).toPromise();
    }
}
