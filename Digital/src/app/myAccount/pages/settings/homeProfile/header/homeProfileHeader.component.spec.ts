import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HomeProfileHeaderComponent } from './homeProfileHeader.component';
import { CommonModule } from '@angular/common';
import { MauiHeadingModule } from '../../../../maui/heading';
import { MauiPageProgressBarModule } from '../../../../maui/pageProgressBar';
import { MauiSecondaryNavigationModule } from '../../../../maui/secondaryNavigation';
import { HomeProfileNavigationService } from '../homeProfileNavigation.service';
import { HomeProfileHeaderModule } from './homeProfileHeader.module';

describe('Home Profile Header Component', () => {
    let fixture: ComponentFixture<HomeProfileHeaderComponent>;
    let component: HomeProfileHeaderComponent;
    let de: DebugElement;

    const mockValue = {
        pageHeading: 'Page Heading',
        currentPage: 1,
        totalPages: 10
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: HomeProfileNavigationService, useValue: mockValue }
            ],
            imports: [
                HomeProfileHeaderModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HomeProfileHeaderComponent);
        component = fixture.componentInstance;
        de = fixture.debugElement;

        component.pageHeading = mockValue.pageHeading;
        component.currentPage = mockValue.currentPage;
        component.totalPages = mockValue.totalPages;

        fixture.detectChanges();
    });

    it('rendered and display assigned value', () => {
        let pageHeadingEl: HTMLElement = de.query(By.css('.homeprofile-header .maui-heading__main')).nativeElement;
        expect(pageHeadingEl.textContent).toBe('Page Heading');

        let pageNumberEl: HTMLElement = de.query(By.css('.homeprofile-header .maui-page-progress-bar__page-number')).nativeElement;
        expect(pageNumberEl.textContent).toBe('1');

        let pageTotalEl: HTMLElement = de.query(By.css('.homeprofile-header .maui-page-progress-bar__page-total')).nativeElement;
        expect(pageTotalEl.textContent).toBe('10');
    });

    it('display updated value', () => {
        component.pageHeading = 'Random Heading';
        component.currentPage = 5;
        fixture.detectChanges();

        let pageHeadingEl: HTMLElement = de.query(By.css('.homeprofile-header .maui-heading__main')).nativeElement;
        expect(pageHeadingEl.textContent).toBe('Random Heading');

        let pageNumberEl: HTMLElement = de.query(By.css('.homeprofile-header .maui-page-progress-bar__page-number')).nativeElement;
        expect(pageNumberEl.textContent).toBe('5');
    });
});
