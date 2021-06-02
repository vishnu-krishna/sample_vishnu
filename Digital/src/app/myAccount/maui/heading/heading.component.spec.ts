import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeadingComponent } from './heading.component';

describe('Heading', () => {
    let comp: HeadingComponent;
    let fixture: ComponentFixture<HeadingComponent>;
    let de: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                HeadingComponent
            ]
        });

        fixture = TestBed.createComponent(HeadingComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
    });

    it ('headings are set correctly', () => {
        const headingText = 'heading content';
        const subheadingText = 'subheading content';
        comp.heading = headingText;
        comp.subheading = subheadingText;
        fixture.detectChanges();

        let heading = de.query(By.css('.maui-heading__main')).nativeElement;
        let subheading = de.query(By.css('.maui-heading__sub')).nativeElement;

        expect(heading.innerHTML).toContain(headingText);
        expect(subheading.innerHTML).toContain(subheadingText);
    });
});
