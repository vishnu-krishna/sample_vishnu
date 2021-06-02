import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ConfirmationBannerComponent } from './confirmationBanner.component';

describe('Container', () => {
    let comp: ConfirmationBannerComponent;
    let fixture: ComponentFixture<ConfirmationBannerComponent>;
    let de: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ConfirmationBannerComponent
            ]
        });

        fixture = TestBed.createComponent(ConfirmationBannerComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
    });

    it ('should set the text correctly', () => {
        // arrange
        const text = 'DUMMY TEXT';
        comp.text = text;

        // act
        fixture.detectChanges();

        // assert
        const textElement = de.query(By.css('.maui-confirmation-banner-content')).nativeElement;
        expect(textElement.innerHTML).toContain(text);
    });

    it ('should update icon file path if icon file name is set.', () => {
        // arrange
        const iconFileName = 'DUMMY TEXT';
        comp.iconFileName = iconFileName;

        // act
        fixture.detectChanges();

        // assert
        const iconElement = de.query(By.css('.maui-confirmation-banner-content-item-icon')).nativeElement;
        expect(iconElement.attributes['src'].value).toContain(iconFileName);
    });

    it ('icon file path should have default path if icon file name is not set.', () => {
        // arrange
        const defaultFileName = 'success icon.svg';

        // act
        fixture.detectChanges();

        // assert
        const iconElement = de.query(By.css('.maui-confirmation-banner-content-item-icon')).nativeElement;
        expect(iconElement.attributes['src'].value).toContain(defaultFileName);
    });
});
