import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { MatIconRegistry } from '@angular/material/icon';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { By, DomSanitizer } from '@angular/platform-browser';
import { MyAccountMaterialModule } from '../../../myAccount/modules/my-account.material.module';
import { MauiSecondaryNavigationComponent, DisplayPageNumber } from './secondaryNavigation.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MAUI Secondary Navigation', () => {
    let comp: MauiSecondaryNavigationComponent;
    let fixture: ComponentFixture<MauiSecondaryNavigationComponent>;
    let de: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                MauiSecondaryNavigationComponent
            ],
            imports: [
                MyAccountMaterialModule,
                HttpClientTestingModule,
                HttpModule
            ],
            providers: [
                MatIconRegistry,
                { provide: MATERIAL_SANITY_CHECKS, useValue: false }
            ]
        });

        fixture = TestBed.createComponent(MauiSecondaryNavigationComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
        comp.display = true;
        comp.pageNumber = 1;
        comp.pageTotal = 8;
        let iconRegistry: MatIconRegistry = fixture.debugElement.injector.get(MatIconRegistry);
        let sanitizer: DomSanitizer = fixture.debugElement.injector.get(DomSanitizer);
        iconRegistry.addSvgIcon('icon-chevron-desktop', sanitizer.bypassSecurityTrustResourceUrl('svg/chevron-desktop.svg'));
        iconRegistry.addSvgIcon('icon-chevron-mobile', sanitizer.bypassSecurityTrustResourceUrl('svg/chevron-mobile.svg'));
    });

    describe('Display tests', () => {

        it('should hide back button when displayBackButton is false', () => {
            // arrange
            comp.displayBackButton = false;

            // act
            fixture.detectChanges();

            // asert
            let backOption = de.query(By.css('.maui-navigation__back-option'));
            expect(backOption).toBeNull();
        });

        it('should show back button when displayBackButton is true', () => {
            // arrange
            comp.displayBackButton = true;

            // act
            fixture.detectChanges();

            // asert
            let backOption = de.query(By.css('.maui-navigation__back-option'));
            expect(backOption.nativeElement).toBeDefined();
        });

        it('should add relevant class to page indicator when displayPageNumber is `OnDesktop`', () => {
            // arrange
            comp.displayPageNumber = DisplayPageNumber.OnDesktop;

            // act
            fixture.detectChanges();

            // asert
            const page = de.query(By.css('.maui-navigation__page')).nativeElement;
            expect(page.classList.contains('visible-xs')).toBe(false);
            expect(page.classList.contains('hidden-xs')).toBe(true);
        });

        it('should add relevant class to page indicator when displayPageNumber is `OnMobile`', () => {
            // arrange
            comp.displayPageNumber = DisplayPageNumber.OnMobile;

            // act
            fixture.detectChanges();

            // asert
            const page = de.query(By.css('.maui-navigation__page')).nativeElement;
            expect(page.classList.contains('visible-xs')).toBe(true);
            expect(page.classList.contains('hidden-xs')).toBe(false);
        });

        it('should not have page indicator when pageNumber is not provided', () => {
            // arrange
            comp.pageNumber = undefined;

            // act
            fixture.detectChanges();

            // asert
            const page = de.query(By.css('.maui-navigation__page'));
            expect(page).toBeNull();
        });

        it('should not have page indicator when pageTotal is not provided', () => {
            // arrange
            comp.pageTotal = undefined;

            // act
            fixture.detectChanges();

            // asert
            const page = de.query(By.css('.maui-navigation__page'));
            expect(page).toBeNull();
        });

        it('should hide secondary navigation when display is false', () => {
            // arrange
            comp.display = false;

            // act
            fixture.detectChanges();

            // asert
            let backOption = de.query(By.css('.maui-navigation'));
            expect(backOption).toBeNull();
        });

        it('should show secondary navigation when display is true', () => {
            // arrange
            comp.display = true;

            // act
            fixture.detectChanges();

            // asert
            let backOption = de.query(By.css('.maui-navigation'));
            expect(backOption.nativeElement).toBeDefined();
        });
    });

    describe('Scroll tests', () => {

        let scrollEvent;
        beforeEach(() => {
            const DOCUMENT_HEIGHT = '1000px';
            const DOCUMENT_WIDTH = '1000px';
            scrollEvent = document.createEvent('CustomEvent');
            scrollEvent.initCustomEvent('scroll', false, false, null);
            document.body.style.minHeight = DOCUMENT_HEIGHT;
            document.body.style.minWidth = DOCUMENT_WIDTH;
        });

        it('should hide secondary navigation when user scroll down', () => {
            // arrange
            const NEW_Y_POSITION = 300;
            comp.hideNavigation = false;

            // act
            scrollTo(0, NEW_Y_POSITION);
            dispatchEvent(scrollEvent);

            // assert
            expect(comp.hideNavigation).toBe(true);
        });

        it('should show secondary navigation when user scroll up', () => {
            // arrange
            const NEW_Y_POSITION = 100;
            const PREVIOUS_Y_POSITION = 500;
            comp.hideNavigation = true;
            scrollTo(0, PREVIOUS_Y_POSITION);
            dispatchEvent(scrollEvent);

            // act
            scrollTo(0, NEW_Y_POSITION);
            dispatchEvent(scrollEvent);

            // assert
            expect(comp.hideNavigation).toBe(false);
        });
    });
});
