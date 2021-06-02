import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MauiRadioButtonGroupModule } from './index';
import { RadioButtonGroupComponent } from './radioButtonGroup.component';
import { RadioButtonComponent } from './radioButton/radioButton.component';

@Component({
    selector: 'agl-test-wrapper-component',
    template: `<agl-maui-radio-button-group selectedValue="cc" name="groupB">
                    <agl-maui-radio-button value="aa">
                        <div label>
                            label for the first radio button
                        </div>
                        <div content>
                            ng content for first radio button
                        </div>
                    </agl-maui-radio-button>
                    <agl-maui-radio-button value="bb">
                        <div label>
                            Second label
                        </div>
                        <div content>
                            The second ng content
                        </div>
                    </agl-maui-radio-button>
                    <agl-maui-radio-button value="cc">
                        <div label>
                            Third label
                        </div>
                    </agl-maui-radio-button>
                </agl-maui-radio-button-group>`,
})
class TestWrapperComponent {
}

describe('Maui radio button component', () => {
    let fixture: ComponentFixture<TestWrapperComponent>;
    let de: DebugElement;
    let radioDebugElements: any;
    let radioInputElements: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MauiRadioButtonGroupModule
            ],
            declarations: [
                TestWrapperComponent
            ],
        });

        fixture = TestBed.createComponent(TestWrapperComponent);
        de = fixture.debugElement;
        fixture.detectChanges();

        radioDebugElements = fixture.debugElement.queryAll(By.css('agl-maui-radio-button'));
        radioInputElements = radioDebugElements.map((debugEl) => debugEl.query(By.css('input')).nativeElement);

    });

    it('should have the correct number of radio buttons', () => {
        // ACT
        fixture.detectChanges();

        // ASSERT
        let radioButtons = fixture.nativeElement.querySelectorAll('agl-maui-radio-button');
        expect(radioButtons.length).toBe(3);
    });

    it('should set the correct default radio buttons', () => {
        // ARRANGE
        let groupComp: RadioButtonGroupComponent;
        groupComp = fixture.debugElement.children[0].componentInstance;

        fixture.detectChanges();

        // ASSERT
        expect(radioInputElements[2].checked).toBe(true);
        expect(groupComp.selectedValue).toBe('cc');
    });

    it('should not show the accordion content for any radio button as the default does not have content', () => {
        // ACT
        let accordion = fixture.nativeElement.querySelectorAll('.content');

        // ASSERT
        expect(accordion[0].children.length).toEqual(0);
    });

    it('should show the correct label content for button 1 ', () => {
        // ACT
        let label = fixture.nativeElement.querySelectorAll('.maui-radio-button-label-container');

        // ASSERT
        expect(label[0].innerText).toContain('label for the first radio button');
    });

    it('should show the correct accordion content when the first radio button is selected', () => {
        // ACT
        radioInputElements[0].click();
        fixture.detectChanges();

        let accordion = fixture.nativeElement.querySelectorAll('.content');

        // ASSERT
        expect(accordion[0].innerText).toContain('ng content for first radio button');
    });

    it('should set selectedValue to bb when the second radio button is selected', () => {
        let groupComp: RadioButtonGroupComponent;
        groupComp = fixture.debugElement.children[0].componentInstance;
        let eventEmitterSpy = spyOn(groupComp.selectedValueChange, 'emit').and.callThrough();

        expect(groupComp.selectedValue).toBe('cc'); // the default value

        radioInputElements[1].click();
        fixture.detectChanges();

        expect(groupComp.selectedValue).toBe('bb');
        expect(eventEmitterSpy).toHaveBeenCalledWith('bb');
    });

    it('should hide the accordion content of button 2 when the first radio button is selected', () => {
        // ACT
        radioInputElements[1].click();
        radioInputElements[0].click();
        fixture.detectChanges();

        let accordion = fixture.nativeElement.querySelectorAll('.content');

        // ASSERT
        expect(accordion[0].innerText).not.toContain('The second ng content');
    });

});
