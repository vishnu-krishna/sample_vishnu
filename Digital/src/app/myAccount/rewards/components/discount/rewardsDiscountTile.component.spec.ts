import { DebugElement, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { FormatDatePipeModule } from '../../../../shared/pipes/formatDate/formatDatePipe.module';
import { MauiButtonModule } from '../../../maui/button';
import { MauiSecondaryNavigationModule } from '../../../maui/secondaryNavigation';
import { RewardsAnalytics, RewardsAnalyticsMock } from '../../rewards-analytics';
import { RewardsDiscountSummary } from '../../shared/rewards-discount-summary';
import { DLSCTATileComponent } from '../ctaTile/dlsCtaTile.component';
import { DLSModule } from '../dls';
import { RewardsDiscountTileComponent } from './rewardsDiscountTile.component';

describe('RewardsDiscountTileComponent', () => {
    let comp: RewardsDiscountTileComponent;
    let fixture: ComponentFixture<RewardsDiscountTileComponent>;
    let de: DebugElement;
    let er: ElementRef;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                DLSModule,
                FormatDatePipeModule,
                RouterTestingModule,
                MauiButtonModule,
                MauiSecondaryNavigationModule
            ],
            declarations: [RewardsDiscountTileComponent, DLSCTATileComponent],
            providers: [
                { provide: MATERIAL_SANITY_CHECKS, useValue: false },
                { provide: RewardsAnalytics, useClass: RewardsAnalyticsMock }
            ]
        });

        fixture = TestBed.createComponent(RewardsDiscountTileComponent);
        comp = fixture.componentInstance;

        de = fixture.debugElement;
        er = fixture.elementRef;
    });

    it('should show the total discount formatted as currency with cents rounded', () => {
        let summary = new RewardsDiscountSummary();
        summary.summary.totalDiscount = 842.23;

        comp.discountArgs = summary;

        fixture.detectChanges();
        const discountElem = de.query(By.css('.discount-amount strong')).nativeElement;
        expect(discountElem.textContent).toContain('$842');

        summary.summary.totalDiscount = 842.51;
        fixture.detectChanges();
        expect(discountElem.textContent).toContain('$843');
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
