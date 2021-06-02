import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { By } from '@angular/platform-browser';

import { RouterTestingModule } from '@angular/router/testing';
import { MauiButtonModule } from '../../maui/button';
import { FeatureIntro } from '../shared/featureIntro';
import { FeatureIntroDetailComponent } from './featureIntroDetail.component';

describe('FeatureIntroDetailComponent', () => {
    let comp: FeatureIntroDetailComponent;
    let fixture: ComponentFixture<FeatureIntroDetailComponent>;
    let de: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MauiButtonModule,
                RouterTestingModule
            ],
            declarations: [
                FeatureIntroDetailComponent
            ],
            providers: [
                { provide: MATERIAL_SANITY_CHECKS, useValue: false }
            ]
        });

        fixture = TestBed.createComponent(FeatureIntroDetailComponent);
        comp = fixture.componentInstance;
        comp.featureIntro = loadFeatureIntro();
        fixture.detectChanges();

        de = fixture.debugElement;
    });

    it('should show a heading and text for the feature', () => {
        const headingElem = de.query(By.css('.intro-heading')).nativeElement;
        expect(headingElem.textContent).toContain(comp.featureIntro.content.heading);

        const paraElem = de.query(By.css('.intro-copy p')).nativeElement;
        expect(paraElem.textContent).toContain(comp.featureIntro.content.description);
    });

    it('should hide the feature if marked as viewed', () => {
        let viewedElem = de.query(By.css('.viewed'));
        expect(viewedElem).toBeNull();

        comp.featureIntro.hasViewed = true;
        fixture.detectChanges();

        viewedElem = de.query(By.css('.viewed'));
        expect(viewedElem).toBeDefined();
    });

    function loadFeatureIntro(): FeatureIntro {
        let intro = {
            featureId: 'Rewards',
            startDate: '2017-01-25',
            endDate: '2017-01-31',
            priority: 1,
            content: {
                heading: 'Rewards is here',
                description: 'Feature intro description.',
                image: '/public/lib/icons/feature.png'
            }
        };

        let result = new FeatureIntro();
        Object.assign(result, intro);

        return result;
    }

});
