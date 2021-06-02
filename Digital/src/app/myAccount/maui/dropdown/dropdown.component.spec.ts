import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DropdownComponent } from './dropdown.component';
import { DropdownModule } from './index';

@Component({
  selector: 'agl-maui-dropdown-test',
  template: `<agl-maui-dropdown (notify)='handleNotify($event)'>
              <agl-maui-dropdown-option text='Select an option' disabled="true" selected="true"></agl-maui-dropdown-option>
              <agl-maui-dropdown-option value='Option1' text='Option 1'></agl-maui-dropdown-option>
              <agl-maui-dropdown-function value='Function1' text='Function 1'></agl-maui-dropdown-function>
            </agl-maui-dropdown>`,
})
class MauiDropdownTest1Component {
  public eventValue: string;
  public handleNotify($event) {
    this.eventValue = $event;
  }
}

@Component({
  selector: 'agl-maui-dropdown-test',
  template: `<agl-maui-dropdown (notify)='handleNotify($event)'>
              <agl-maui-dropdown-option text='Select an option' disabled="true"></agl-maui-dropdown-option>
              <agl-maui-dropdown-option value='Option1' text='Option 1' selected="true" ></agl-maui-dropdown-option>
              <agl-maui-dropdown-function value='Function1' text='Function 1'></agl-maui-dropdown-function>
            </agl-maui-dropdown>`,
})
class MauiDropdownTest2Component {
  public eventValue: string;
  public handleNotify($event) {
    this.eventValue = $event;
  }
}

@Component({
  selector: 'agl-maui-dropdown-test',
  template: `<agl-maui-dropdown (notify)='handleNotify($event)'>
              <agl-maui-dropdown-option text='Select an option' disabled="true"></agl-maui-dropdown-option>
              <agl-maui-dropdown-option value='Option1' text='Option 1'></agl-maui-dropdown-option>
              <agl-maui-dropdown-function value='Function1' text='Function 1' selected="true"></agl-maui-dropdown-function>
            </agl-maui-dropdown>`,
})
class MauiDropdownTest3Component {
  public eventValue: string;
  public handleNotify($event) {
    this.eventValue = $event;
  }
}

describe('Maui Dropdown Component 1 : basic placeholder version', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<MauiDropdownTest1Component>;
  let de: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MauiDropdownTest1Component
      ],
      imports: [
        DropdownModule
      ]
    });

    fixture = TestBed.createComponent(MauiDropdownTest1Component);
    de = fixture.debugElement;
    spyOn(fixture.componentInstance, 'handleNotify').and.callThrough();
    fixture.detectChanges();
  });

  it('should disabled the first option as the placeholder text option', () => {
    // Arrange
    component = fixture.debugElement.children[0].componentInstance;

    // Act
    fixture.detectChanges();

    // Assert
    // TODO: NG5-UPGRADE somewhere at runtime the property is being set to a string rather than a bool, should be fixed
    expect(component.options.first.disabled as any).toEqual('true');
  });

  it('should select as default the first option as the placeholder text option', () => {
    // Arrange
    component = fixture.debugElement.children[0].componentInstance;

    // Act
    fixture.detectChanges();

    // Assert
    // TODO: NG5-UPGRADE somewhere at runtime the property is being set to a string rather than a bool, should be fixed
    expect(component.options.first.selected as any).toEqual('true');
  });

  it('should set the first option as placeholder text and have the correct text', () => {
    // Arrange
    component = fixture.debugElement.children[0].componentInstance;

    // Act
    fixture.detectChanges();

    // Assert
    expect(component.options.first.text).toEqual('Select an option');
  });

  describe('for change events', () => {
    it('should check that an event is raised after option selection', () => {
      // Arrange
      const selectElement = fixture.debugElement.query(By.css('select')).nativeElement;

      // Act
      selectElement.value = 'Option1';
      fixture.detectChanges();
      selectElement.dispatchEvent(new Event('change'));

      // Assert
      expect(fixture.componentInstance.eventValue).toBe('Option1');
      expect(fixture.componentInstance.handleNotify).toHaveBeenCalled();
    });

    it('should check that an event is raised after function selection', () => {
      // Arrange
      const selectElement = fixture.debugElement.query(By.css('select')).nativeElement;

      // Act
      selectElement.value = 'Function1';
      fixture.detectChanges();
      selectElement.dispatchEvent(new Event('change'));

      // Assert
      expect(fixture.componentInstance.eventValue).toBe('Function1');
      expect(fixture.componentInstance.handleNotify).toHaveBeenCalled();
    });

    it('should set the selected option to be the second option when selected', () => {
      // Arrange
      component = fixture.debugElement.children[0].componentInstance;
      const selectElement = fixture.debugElement.query(By.css('select')).nativeElement;

      // Act
      selectElement.value = 'Option1';
      fixture.detectChanges();
      selectElement.dispatchEvent(new Event('change'));

      // Assert
      expect(selectElement.selectedIndex).toBe(1);
      expect(fixture.componentInstance.handleNotify).toHaveBeenCalled();
    });

    it('should set the selected option to be the function option when selected', () => {
      // Arrange
      component = fixture.debugElement.children[0].componentInstance;
      const selectElement = fixture.debugElement.query(By.css('select')).nativeElement;

      // Act
      selectElement.value = 'Function1';
      fixture.detectChanges();
      selectElement.dispatchEvent(new Event('change'));

      // Assert
      expect(selectElement.selectedIndex).toBe(3);
      expect(fixture.componentInstance.handleNotify).toHaveBeenCalled();
    });
  });
});

describe('Maui Dropdown Component 2: setting the first option as default', () => {

  let component: DropdownComponent;
  let fixture: ComponentFixture<MauiDropdownTest2Component>;
  let de: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MauiDropdownTest2Component
      ],
      imports: [
        DropdownModule
      ]
    });

    fixture = TestBed.createComponent(MauiDropdownTest2Component);
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should select as default the first no placeholder option from the list', () => {
    // Arrange
    const selectElement = fixture.debugElement.query(By.css('select')).nativeElement;

    // Act
    fixture.detectChanges();

    // Assert
    expect(selectElement.selectedIndex).toBe(1);
  });

});

describe('Maui Dropdown Component 3: setting the first function as default', () => {

  let component: DropdownComponent;
  let fixture: ComponentFixture<MauiDropdownTest3Component>;
  let de: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MauiDropdownTest3Component
      ],
      imports: [
        DropdownModule
      ]
    });

    fixture = TestBed.createComponent(MauiDropdownTest3Component);
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should select as default the first function from the list', () => {
    // Arrange
    const selectElement = fixture.debugElement.query(By.css('select')).nativeElement;

    // Act
    fixture.detectChanges();

    // Assert
    expect(selectElement.selectedIndex).toBe(3);
  });

});

describe('Maui Dropdown Component', () => {
    let component: DropdownComponent;
    let fixture: ComponentFixture<DropdownComponent>;
    let de: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ DropdownModule ]
        });

        fixture = TestBed.createComponent(DropdownComponent);
        component = fixture.componentInstance;
        de = fixture.debugElement;
    });

    describe('When has error', () => {
        it ('Should set has-error CSS class', () => {
            // ARRANGE
            component.hasError = true;

            // ACT
            fixture.detectChanges();

            // ASSERT
            const selectElement = de.query(By.css('select')).nativeElement;
            expect(selectElement.classList).toContain('maui-dropdown--has-error');
        });
    });

    describe('When disabled', () => {
        it ('Should disable select', () => {
            // ARRANGE
            component.disabled = true;

            // ACT
            fixture.detectChanges();

            // ASSERT
            const selectElement = de.query(By.css('select')).nativeElement;
            expect(selectElement.disabled).toBeTruthy();
        });
    });
});
