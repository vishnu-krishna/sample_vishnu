import { DebugElement, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { MauiButtonModule } from '../../../maui/button';
import { MauiSecondaryNavigationModule } from '../../../maui/secondaryNavigation';
import { RewardsAnalytics, RewardsAnalyticsMock } from '../../rewards-analytics';
import { RewardsFlybuysSummary } from '../../shared/rewards-flybuys-summary';
import { DLSCTATileComponent } from '../ctaTile/dlsCtaTile.component';
import { DLSModule } from '../dls';
import { RewardsFlybuysTileComponent } from './rewardsFlybuysTile.component';

describe('RewardsFlybuysTileComponent', () => {
    let comp: RewardsFlybuysTileComponent;
    let fixture: ComponentFixture<RewardsFlybuysTileComponent>;
    let de: DebugElement;
    let er: ElementRef;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                DLSModule,
                RouterTestingModule,
                MauiButtonModule,
                MauiSecondaryNavigationModule
            ],
            declarations: [RewardsFlybuysTileComponent, DLSCTATileComponent],
            providers: [
                { provide: MATERIAL_SANITY_CHECKS, useValue: false },
                { provide: RewardsAnalytics, useClass: RewardsAnalyticsMock }
            ]
        });

        fixture = TestBed.createComponent(RewardsFlybuysTileComponent);
        comp = fixture.componentInstance;

        de = fixture.debugElement;
        er = fixture.elementRef;
    });

    it('should show the flybuys points formatted with thousand seperators', () => {
        let summary = new RewardsFlybuysSummary();
        summary.summary.totalPoints = 9877;

        comp.flybuysArgs = summary;

        fixture.detectChanges();
        const points = de.query(By.css('.flybuys-points strong')).nativeElement;
        expect(points.textContent).toContain('9,877');
    });

    it('should display elements in a row if a single component', () => {
        fixture.detectChanges();
        let rowElem = de.query(By.css('.cta-tile--row'));
        expect(rowElem).toBeNull();

        comp.isSingleTile = true;
        fixture.detectChanges();

        rowElem = de.query(By.css('.cta-tile--row'));
        expect(rowElem).not.toBeNull();
    });
});
