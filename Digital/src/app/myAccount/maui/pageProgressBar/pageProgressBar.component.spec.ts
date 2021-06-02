import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MauiPageProgressBarComponent } from './pageProgressBar.component';

describe('Page Progress Bar', () => {
    let comp: MauiPageProgressBarComponent;
    const currentPageIsInvalid = 'Current page is invalid';
    const totalPagesIsInvalid = 'Total pages is invalid';
    const currentPageOutOfRange = 'Current page is out of range';

    let fixture: ComponentFixture<MauiPageProgressBarComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                MauiPageProgressBarComponent
            ]
        });
        fixture = TestBed.createComponent(MauiPageProgressBarComponent);
        comp = fixture.componentInstance;
    });

    it ('sets current page and total pages correctly', () => {
        const currentPage = '2';
        const totalPages = '6';
        comp.currentPage = currentPage;
        comp.totalPages = totalPages;
        fixture.detectChanges();

        let currentStep = fixture.nativeElement.querySelector('.maui-page-progress-bar__page-current');
        let stepNumber = currentStep.querySelector('.maui-page-progress-bar__page-number');
        let stepTotal = currentStep.querySelector('.maui-page-progress-bar__page-total');

        expect(stepNumber.innerHTML).toContain(currentPage);
        expect(stepTotal.innerHTML).toContain(totalPages);
    });

    it('sets correct number of `steps` in the UI', () => {
        const currentPage = 1;
        const totalPages = 6;
        const expectedStepsCount = totalPages;
        comp.currentPage = currentPage.toString();
        comp.totalPages = totalPages.toString();
        fixture.detectChanges();
        let steps = fixture.nativeElement.querySelectorAll('.maui-page-progress-bar__page');
        expect(steps.length).toBe(expectedStepsCount);
    });

    it('does not display progress bar if currentPage is not provided', () => {
        comp.currentPage = '1';
        fixture.detectChanges();
        const progressBar = fixture.nativeElement.querySelector('[class^="maui-page-progress-bar"]');
        expect(progressBar.classList).not.toContain('maui-page-progress-bar');
        expect(progressBar.classList).toContain('maui-page-progress-bar--error');
    });

    it('does not display progress bar if totalPages is not provided', () => {
        comp.totalPages = '8';
        fixture.detectChanges();
        const progressBar = fixture.nativeElement.querySelector('[class^="maui-page-progress-bar"]');
        expect(progressBar.classList).not.toContain('maui-page-progress-bar');
        expect(progressBar.classList).toContain('maui-page-progress-bar--error');
    });

    it('does not display progress bar if currentPage is not an integer', () => {
        comp.currentPage = '1.5';
        fixture.detectChanges();
        const progressBar = fixture.nativeElement.querySelector('[class^="maui-page-progress-bar"]');
        expect(progressBar.classList).not.toContain('maui-page-progress-bar');
        expect(progressBar.classList).toContain('maui-page-progress-bar--error');
    });

    it('does not display progress bar if totalPages is not an integer', () => {
        comp.totalPages = 'abc';
        fixture.detectChanges();
        const progressBar = fixture.nativeElement.querySelector('[class^="maui-page-progress-bar"]');
        expect(progressBar.classList).not.toContain('maui-page-progress-bar');
        expect(progressBar.classList).toContain('maui-page-progress-bar--error');
    });

    it('does not display progress bar if currentPage is below 0', () => {
        comp.currentPage = '-1';
        fixture.detectChanges();
        const progressBar = fixture.nativeElement.querySelector('[class^="maui-page-progress-bar"]');
        expect(progressBar.classList).not.toContain('maui-page-progress-bar');
        expect(progressBar.classList).toContain('maui-page-progress-bar--error');
    });

    it('does not display progress bar if currentPage is greater than totalPages', () => {
        comp.currentPage = '10';
        comp.totalPages = '8';
        fixture.detectChanges();
        const progressBar = fixture.nativeElement.querySelector('[class^="maui-page-progress-bar"]');
        expect(progressBar.classList).not.toContain('maui-page-progress-bar');
        expect(progressBar.classList).toContain('maui-page-progress-bar--error');
    });

});
