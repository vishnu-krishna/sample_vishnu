import { DebugElement } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MauiLightBoxModule } from './';
import { LightBoxComponent } from './lightBox.component';

let comp: LightBoxComponent;
let fixture: ComponentFixture<LightBoxComponent>;
let de: DebugElement;

describe(`MAUI Light Box Component`, () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MauiLightBoxModule]
        });
        fixture = TestBed.createComponent(LightBoxComponent);
        comp = fixture.componentInstance;
    });

    describe(`Element display`, () => {

        it(`should display element`, () => {
            comp.showLightBox(true);
            de = fixture.debugElement;
            let element = de.query(By.css('.maui-lightbox'));
            expect(element).not.toBeNull('MAUI Light Box component should be displayed');
        });

        it(`should display title`, () => {
            comp.title = 'This component is awesome';
            comp.showLightBox(true);
            de = fixture.debugElement;
            fixture.detectChanges();
            let element = de.query(By.css('.maui-lightbox-container__heading-title'));
            expect(element).not.toBeNull('title should be displayed');
        });

        it(`should display close X button`, () => {
            comp.title = 'This component is awesome';
            comp.showLightBox(true);
            de = fixture.debugElement;
            fixture.detectChanges();
            let element = de.query(By.css('.maui-lightbox-container__heading-close'));
            expect(element).not.toBeNull('close X button should be displayed');
        });

        it(`should display primary button if text is provided for that`, () => {
            comp.title = 'This component is awesome';
            comp.buttonPrimaryText = 'Thanks';
            comp.showLightBox(true);
            de = fixture.debugElement;
            fixture.detectChanges();
            let element = de.query(By.css('.maui-lightbox__button-container__button--primary'));
            expect(element).not.toBeNull('primary button should be displayed');
        });

        it(`should display dismiss button if text is provided for that`, () => {
            comp.title = 'This component is awesome';
            comp.buttonDismissText = 'Cancel';
            comp.showLightBox(true);
            de = fixture.debugElement;
            fixture.detectChanges();
            let element = de.query(By.css('.maui-lightbox__button-container__button--dismiss'));
            expect(element).not.toBeNull('dismiss button should be displayed');
        });

    });

    describe(`Interaction`, () => {
        it(`should emit primary button when clicked`, () => {
            spyOn(comp.clickButtonPrimary, 'emit');
            comp.onClickButtonPrimary(null);
            de = fixture.debugElement;
            fixture.detectChanges();
            expect(comp.clickButtonPrimary.emit).toHaveBeenCalled();
        });

        it(`should emit secondary button when clicked`, () => {
            spyOn(comp.clickButtonDismiss, 'emit');
            comp.onClickButtonDismiss(null);
            de = fixture.debugElement;
            fixture.detectChanges();
            expect(comp.clickButtonDismiss.emit).toHaveBeenCalled();
        });

        it(`lightbox should not be displayed when closed`, () => {
            comp.showLightBox(false);
            de = fixture.debugElement;
            let element = de.query(By.css('.maui-lightbox'));
            expect(element).not.toBeNull('MAUI Light Box component should not be displayed');
        });

    });
});
