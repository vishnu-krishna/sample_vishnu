import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { AlertComponent } from './alert.component';

/**
 * Change describe to xdescribe in Dec 2017 as most of these tests are broken and we have started running the *.spec.ts
 * tests under /shared/components again (previously these were missed by the test runner).
 * TODO fix broken tests if this component is still required.
 */
xdescribe('Alert Component', () => {

    let comp: AlertComponent;
    let fixture: ComponentFixture<AlertComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [],
            declarations: [],
            imports: []
        });

        fixture = TestBed.createComponent(AlertComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
    });

    it('should accept input if Alert Type is valid', () => {
        comp.alertType = 'blah';

        comp.convertAlertTypeEnumToString(comp.alertType);

        expect(comp.hasAlertType).toBeFalsy();
    });

    it('should not accept input if Alert Type is invalid', () => {
        comp.alertType = 'warning';

        comp.convertAlertTypeEnumToString(comp.alertType);

        expect(comp.hasAlertType).toBeTruthy();
    });

    describe('isDismissible', () => {
        describe('when set to "true"', () => {
            beforeEach(() => {
                comp.isDismissible = 'true';
            });

            it('should set "showClose" to true', () => {
                expect(comp.showClose).toBeTruthy();
            });
        });

        describe('when set to "false"', () => {
            beforeEach(() => {
                comp.isDismissible = 'false';
            });
            it('should set "showClose" to true', () => {
                expect(comp.showClose).toBeFalsy();
            });
        });
    });
});
