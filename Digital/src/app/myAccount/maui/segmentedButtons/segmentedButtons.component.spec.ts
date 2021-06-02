import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SegmentedButtonComponent } from './segmentedButton/segmentedButton.component';
import { SegmentedButtonsComponent } from './segmentedButtons.component';

@Component({
    selector: 'agl-test-wrapper-component',
    template: `<agl-maui-segmented-buttons [(value)]="value" (change)="setSelectedValue($event)">
                   <agl-maui-segmented-button id="yes" value="yes" text="Yes"></agl-maui-segmented-button>
                   <agl-maui-segmented-button id="no" value="no" text="No"></agl-maui-segmented-button>
               </agl-maui-segmented-buttons>`,
})
class TestWrapperComponent {
    public value: string = 'no';
    public setSelectedValue($event) {
        // Do Something
    }
}

describe('Maui Segmented Buttons Component', () => {
    let fixture: ComponentFixture<TestWrapperComponent>;
    let de: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestWrapperComponent,
                SegmentedButtonsComponent,
                SegmentedButtonComponent
            ],
        });

        fixture = TestBed.createComponent(TestWrapperComponent);
        de = fixture.debugElement;
        fixture.detectChanges();
    }));

    it('should have the correct number of segmented buttons', () => {
        // ARRANGE
        let comp: SegmentedButtonsComponent;
        comp = fixture.debugElement.children[0].componentInstance;
        fixture = TestBed.createComponent(TestWrapperComponent);

        // ACT
        fixture.detectChanges();

        // ASSERT
        let buttons = fixture.nativeElement.querySelectorAll('agl-maui-segmented-button');
        expect(buttons.length).toBe(2);
    });

    it('should emit the updated button value on change', () => {
        // ARRANGE
        let comp: SegmentedButtonsComponent;
        comp = fixture.debugElement.children[0].componentInstance;
        fixture = TestBed.createComponent(TestWrapperComponent);
        let selectedButtonChange: string;
        comp.change.subscribe((value: string) => { selectedButtonChange = value; });

        // ACT
        let button = de.query(By.css('#yes'));
        fixture.detectChanges();
        button.triggerEventHandler('click', null);

        // ASSERT
        expect(selectedButtonChange).toBe('yes');
    });
});
