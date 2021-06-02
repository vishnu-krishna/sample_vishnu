import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CheckboxGroupComponent } from './checkboxGroup.component';
import { MauiCheckboxGroupModule } from './checkboxGroup.module';
import { MauiCheckboxModule } from '../checkbox/checkbox.module';

@Component({
    selector: 'agl-test-wrapper-component',
    template: `<agl-maui-checkbox-group (checked)="checkboxChange($event)">
                    <agl-maui-checkbox label="1" value="1" [isChecked]="true" [isFullWidth]="true" id="checkbox1"></agl-maui-checkbox>
                    <agl-maui-checkbox label="2" value="2" [isChecked]="false" [isFullWidth]="true" id="checkbox2"></agl-maui-checkbox>
                    <agl-maui-checkbox label="3" value="3" [isChecked]="false" [isFullWidth]="true" id="checkbox3"></agl-maui-checkbox>
               </agl-maui-checkbox-group>`,
})
class WrapperComponent {
    public checkboxChange($event) { return true; }
}

describe('Maui Checkbox Group Component', () => {
    let fixture: ComponentFixture<WrapperComponent>;
    let de: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ WrapperComponent ],
            imports: [
                MauiCheckboxModule,
                MauiCheckboxGroupModule
            ]
        });

        fixture = TestBed.createComponent(WrapperComponent);
        de = fixture.debugElement;
        fixture.detectChanges();
    });

    it('should have the correct number of checkboxes', () => {
        // ASSERT
        let checkboxes = fixture.nativeElement.querySelectorAll('agl-maui-checkbox');
        expect(checkboxes.length).toBe(3);
    });

    describe('On selection', () => {
        // ARRANGE
        let comp: CheckboxGroupComponent;
        let selectCheckboxes: string[];
        let checkboxes: HTMLElement[];

        beforeEach(() => {
            comp = fixture.debugElement.children[0].componentInstance;
            comp.checked.subscribe((value: string[]) => { selectCheckboxes = value; });

            checkboxes = fixture.debugElement
                            .queryAll(By.css('agl-maui-checkbox'))
                            .map((debugEl) => {
                                return debugEl.query(By.css('input')).nativeElement;
                            });
            fixture.detectChanges();
        });

        it('should emit an array of items on selection', () => {
            // ACT
            checkboxes[1].click();
            checkboxes[2].click();
            fixture.detectChanges();

            // ASSERT
            expect(selectCheckboxes).toEqual(['1', '2', '3']);
        });

        it('should emit the correct number of items in array on toggle', () => {
            // ACT
            checkboxes[0].click();
            checkboxes[2].click();
            checkboxes[2].click();
            fixture.detectChanges();

            // ASSERT
            expect(selectCheckboxes).toEqual([]);
        });
    });
});
