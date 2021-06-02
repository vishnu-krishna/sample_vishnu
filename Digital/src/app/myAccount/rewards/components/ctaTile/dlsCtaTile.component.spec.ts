import { DebugElement, ElementRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { By } from '@angular/platform-browser';

import { MauiButtonModule } from '../../../maui/button';
import { ButtonType } from '../../../maui/button/button.enum';
import { MauiSecondaryNavigationModule } from '../../../maui/secondaryNavigation';
import { ButtonViewModel } from '../dls/shared/models/button.model';
import { DLSCTATileComponent } from './dlsCtaTile.component';
import { DLSCTATileModel } from './dlsCtaTile.model';

describe('component: CTA Tile', () => {
    let component: DLSCTATileComponent;
    let fixture: ComponentFixture<DLSCTATileComponent>;
    let de: DebugElement;
    let er: ElementRef;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MauiButtonModule,
                MauiSecondaryNavigationModule
            ],
            declarations: [DLSCTATileComponent],
            providers: [
                { provide: MATERIAL_SANITY_CHECKS, useValue: false }
            ]
          });

        // create component and test fixture
        fixture = TestBed.createComponent(DLSCTATileComponent);

        // get test component from the fixture
        component = fixture.componentInstance;
        de = fixture.debugElement;
        er = fixture.elementRef;
    }));

    it('should call onCTAButton1Clicked when button 1 is clicked', () => {
        let args = new DLSCTATileModel();
        args.defaultImage.path = 'test/image.png';
        args.button1 = new ButtonViewModel();
        args.button1.buttonText = 'some text here';
        args.button1.buttonType = ButtonType.primary;
        component.args = args;

        spyOn(component.onCTAButton1Clicked, 'emit');
        spyOn(component.onCTAButton2Clicked, 'emit');

        // first round of change detection
        fixture.detectChanges();

        let buttonElement = de.query(By.css('.cta-tile-module__buttons agl-maui-button')).nativeElement;

        buttonElement.dispatchEvent(new Event('clicked'));

        fixture.detectChanges();

        expect(component.onCTAButton1Clicked.emit).toHaveBeenCalled();
        expect(component.onCTAButton2Clicked.emit).not.toHaveBeenCalled();
    });

    it('should call onCTAButton2Clicked when button 2 is clicked', () => {
        let args = new DLSCTATileModel();
        args.defaultImage.path = 'test/image.png';
        args.button2 = new ButtonViewModel();
        args.button2.buttonText = 'some text here';
        args.button2.buttonType = ButtonType.secondary;
        component.args = args;

        spyOn(component.onCTAButton1Clicked, 'emit');
        spyOn(component.onCTAButton2Clicked, 'emit');

        // first round of change detection
        fixture.detectChanges();

        let buttonElement = de.query(By.css('.cta-tile-module__buttons .cta-btn-second')).nativeElement;

        buttonElement.dispatchEvent(new Event('clicked'));

        fixture.detectChanges();

        expect(component.onCTAButton2Clicked.emit).toHaveBeenCalled();
        expect(component.onCTAButton1Clicked.emit).not.toHaveBeenCalled();
    });
});
