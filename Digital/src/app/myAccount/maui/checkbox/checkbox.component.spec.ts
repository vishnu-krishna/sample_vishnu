import { Component, DebugElement, ElementRef, EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxComponent } from './checkbox.component';
import { MauiCheckboxModule } from './checkbox.module';

@Component({
    selector: 'agl-test-wrapper-component',
    template: `<agl-maui-checkbox value="mock" (checked)="checkboxChange()">
                  <div label class="transcluded">Transcluded label</div>
                  <div content class="content">Transcluded content</div>
               </agl-maui-checkbox>`,
})
class WrapperComponent {
    public label: string;
    public value: string;
    public isChecked: boolean;
    public isFullWidth: boolean;
    public checked: EventEmitter<boolean>;
    public contentWrapper: ElementRef;
    public checkboxChange() { return true; }
    public hasContent() { return true; }
}

describe('Maui Checkbox Component', () => {
    let comp: CheckboxComponent;
    let fixture: ComponentFixture<CheckboxComponent>;
    let de: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ WrapperComponent ],
            imports: [ MauiCheckboxModule ]
        });

        fixture = TestBed.createComponent(CheckboxComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
    });

    it('should display the correct label', () => {
        // ARRANGE
        comp.label = 'pudding';

        // ACT
        fixture.detectChanges();

        // ASSERT
        const checkboxLabel = fixture.nativeElement.querySelector('.maui-checkbox__label > span');
        expect(checkboxLabel.textContent).toBe(comp.label);
    });

    it('should select the checkbox if initially checked', () => {
        // ARRANGE
        comp.isChecked = true;

        // ACT
        fixture.detectChanges();

        // ASSERT
        const checkboxSelected = fixture.nativeElement.querySelector('.maui-checkbox__label--selected');
        expect(checkboxSelected).toBeDefined();
    });

    it('shouldnt select the checkbox in default state', () => {
        // ACT
        fixture.detectChanges();

        // ASSERT
        const checkboxSelected = fixture.nativeElement.querySelector('.maui-checkbox__label--selected');
        expect(checkboxSelected).toBeNull();
    });

    it('should select checkbox if checkbox is clicked', () => {
        // ACT
        fixture.detectChanges();
        const checkbox = de.nativeElement.querySelector('.maui-checkbox__label');
        checkbox.click();
        fixture.detectChanges();

        // ASSERT
        let segmentedButton = de.nativeElement;
        const checkboxSelected = fixture.nativeElement.querySelector('.maui-checkbox__label--selected');
        expect(checkboxSelected).toBeDefined();
    });

    it('should emit the checkbox value if checkbox is clicked', () => {
        // ARRANGE
        let checkboxValue: boolean;
        comp.checked.subscribe((value: boolean) => { checkboxValue = value; });

        // ACT
        fixture.detectChanges();
        const checkbox = de.nativeElement.querySelector('.maui-checkbox__label');
        checkbox.click();
        fixture.detectChanges();

        // ASSERT
        expect(comp.isChecked).toBe(true);
        expect(checkboxValue).toBe(comp.isChecked);
    });

    describe('With transcluded content', () => {
        beforeEach(() => {
            // ARRANGE
            fixture = TestBed.createComponent(WrapperComponent);
            comp = fixture.componentInstance;

            // ACT
            fixture.detectChanges();
        });

        it('should correctly project the label', () => {
            // ASSERT
            const transcludedContent = fixture.nativeElement.querySelector('.transcluded');
            const checkboxLabel = fixture.nativeElement.querySelector('.maui-checkbox__label > span');
            expect(transcludedContent.textContent).toBe('Transcluded label');
            expect(checkboxLabel).toBeNull();
        });

        it('should correctly project the content', () => {
            // ACT
            comp.checkboxChange();

            // ASSERT
            const transcludedContent = fixture.nativeElement.querySelector('.content');
            expect(transcludedContent.textContent).toBe('Transcluded content');
        });
    });
});
