import { DebugElement, HostListener } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MauiTooltipModule } from '.';
import { TooltipComponent } from './tooltip.component';

let comp: TooltipComponent;
let fixture: ComponentFixture<TooltipComponent>;
let de: DebugElement;

describe(`MAUI Tooltip Component`, () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MauiTooltipModule]
        });
        fixture = TestBed.createComponent(TooltipComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
    });

    describe(`Visibility functionality`, () => {

        it(`should not be visibile on initialisation`, () => {
            fixture.detectChanges();

            const tooltipDiv = fixture.nativeElement.querySelector('.tooltip');
            expect(tooltipDiv.classList.contains('tooltip--shown')).toBeFalsy();
        });

        it(`should be visible when set`, () => {
            comp.showTooltip = true;

            fixture.detectChanges();

            const tooltipDiv = fixture.nativeElement.querySelector('.tooltip');
            expect(tooltipDiv.classList.contains('tooltip--shown')).toBeTruthy();
        });
    });

    describe(`Tooltip text`, () => {

        it(`should init with empty text`, () => {
            let tooltipText = fixture.nativeElement.querySelector('.tooltip__text').textContent;
            expect(tooltipText).toMatch('');
        });

        it(`should display tooltip text`, () => {
            comp.tooltipBody = 'tooltip text is in';

            fixture.detectChanges();

            let tooltipText = fixture.nativeElement.querySelector('.tooltip__text').textContent;
            expect(tooltipText).toMatch('tooltip text is in');
        });
    });
});
