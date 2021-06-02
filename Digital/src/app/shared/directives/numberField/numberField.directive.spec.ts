
import { Component, EventEmitter, Output } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  // async,
  // fakeAsync, tick
} from '@angular/core/testing';

import { FormsModule }                  from '@angular/forms';
import { InputEventHelperService }      from '../../service/inputEventHelper.service';
import { NumberFieldDirective }         from '../numberField.directive';
// import { By }                           from '@angular/platform-browser';

@Component({
  selector: 'agl-test-container',
  template: `<input id="testInput" type="tel" (changes)="changed($event)" aglNumberField />`
})
export class TestContainerComponent {
  @Output() changes = new EventEmitter();
  changed(value) {
    this.changes.emit(value);
  }
}

describe('NumberFieldDirective Tests', () => {

    // let _appContainer = new AppContainer();
    let componentInstance: TestContainerComponent;
    let fixture: ComponentFixture<TestContainerComponent>;

    beforeEach(() => {
         TestBed.configureTestingModule({
            declarations: [
                        TestContainerComponent,
                        NumberFieldDirective
                         ],
            providers: [ InputEventHelperService ],
            imports: [
                FormsModule
            ]
        });

         fixture = TestBed.createComponent(TestContainerComponent);
         componentInstance = fixture.componentInstance;
            // inject the service into the debugelement
            // verifyService = fixture.debugElement.injector.get(IVerifyService);
            // console.log(verifyAccountResult);

            //  // Setup spy on the `getQuote` method
            // spy = spyOn(verifyService, 'VerifyAccountNumber')
            //         .and.returnValue(Promise.resolve(testQuote));

    });

    //  it('keypress should allow numbers',
    //     fakeAsync(() => {
    //         let input = fixture.debugElement.query(By.css('input'));
    //         // input.nativeElement.keypress({keyCode: 48});
    //         // let result = comp.onKeypress({keyCode: 48});
    //         // input.triggerEventHandler('keypress', {keyCode: 48});
    //         tick();

    //         fixture.detectChanges();
    //         let value = input.nativeElement.value;
    //         console.log(value);
    //         expect(value).toBe('0');
    //     })
    // );

    // xit('should not allow alphabetic characters',
    //     fakeAsync(() => {

    //         let textBox = fixture.debugElement.query(By.css('input'));

    //         // textBox.nativeElement.value = 'F';
    //         // textBox.nativeElement.dispatchEvent(new Event('keypress'));
    //         // let nativeElement = fixture.nativeElement;
    //         fixture.nativeElement.querySelector('input').value = 'C';
    //         fixture.nativeElement.querySelector('input').dispatchEvent(new Event('keypress'));
    //         // textBox.triggerEventHandler('keypress', {keyCode: '48'});
    //         fixture.detectChanges();
    //         tick(2000);

    //         // fixture.whenStable().then(() => {
    //             fixture.detectChanges();
    //             console.log('value is ' + textBox.nativeElement.value);
    //             expect(textBox.nativeElement.value).toBe('8');
    //         // });
    //     })
    // );

    // it('should not allow alphabetic characters',
    //     fakeAsync(() => {

    //         let textBox = fixture.debugElement.query(By.css('input'));

    //         textBox.nativeElement.value = '8';
    //         textBox.nativeElement.dispatchEvent(new Event('input'));

    //         fixture.detectChanges();
    //         tick();
    //         expect(textBox.nativeElement.value).toBe('F');
    //     })
    // );

});
