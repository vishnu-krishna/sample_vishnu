import { Component } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { async } from '@angular/core/testing';
import { IconListComponent } from './iconList.component';
import { IconListItemComponent } from './iconListItem/iconListItem.component';

@Component({
    selector: 'agl-test-wrapper1-component',
    template: `
        <agl-maui-icon-list>
            <agl-maui-icon-list-item iconPath="./svg/maui/iconList/showcase/icon-calendar.svg">Test text1.</agl-maui-icon-list-item>
            <agl-maui-icon-list-item iconPath="./svg/maui/iconList/showcase/icon_clock.svg">Test text 2</agl-maui-icon-list-item>
        </agl-maui-icon-list>
        `
})

class TestWrapper1Component {
}

@Component({
    selector: 'agl-test-wrapper2-component',
    template: `
        <agl-maui-icon-list heading="Test Heading">
            <agl-maui-icon-list-item iconPath="./svg/maui/iconList/showcase/icon-calendar.svg">Test text1.</agl-maui-icon-list-item>
            <agl-maui-icon-list-item iconPath="./svg/maui/iconList/showcase/icon_clock.svg">Test text 2</agl-maui-icon-list-item>
        </agl-maui-icon-list>
    `
})

class TestWrapper2Component {
}

describe('Maui Icon list component', () => {
    describe('component without heading', () => {

        let fixture: ComponentFixture<TestWrapper1Component>;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [
                    TestWrapper1Component,
                    IconListComponent,
                    IconListItemComponent,
                ]
            });

            fixture = TestBed.createComponent(TestWrapper1Component);
            fixture.detectChanges();
        }));

        it('should not show the Icon List heading when its not passed in', () => {
            let nativeElement = fixture.nativeElement.querySelector('.maui-icon-list__heading');
            expect(nativeElement).toBeNull();
        });

    });

    describe('component with heading text', () => {

        let fixture: ComponentFixture<TestWrapper2Component>;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [
                    TestWrapper2Component,
                    IconListComponent,
                    IconListItemComponent,
                ]
            });

            fixture = TestBed.createComponent(TestWrapper2Component);
            fixture.detectChanges();
        }));

        it('should show the Icon List heading when its passed in', () => {
            let nativeElementText = fixture.nativeElement.querySelector('.maui-icon-list__heading').textContent;
            expect(nativeElementText).toContain('Test Heading');
        });

        it('should have the correct number of icon items', () => {
            let items = fixture.nativeElement.querySelectorAll('agl-maui-icon-list-item');
            expect(items.length).toBe(2);
        });

        it('should display the correct text as passed in via transclusion', () => {
            let items = fixture.nativeElement.querySelectorAll('agl-maui-icon-list-item');
            expect(items[1].textContent).toContain('Test text 2');
        });

        it('should display the correct icon as passed in', () => {
            let itemsIcon = fixture.nativeElement.querySelectorAll('.maui-icon-list__item-icon');
            expect(itemsIcon[1].src).toContain('svg/maui/iconList/showcase/icon_clock.svg');
        });

    });
});
