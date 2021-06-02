import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ContainerComponent } from './container.component';

describe('Container', () => {
    let comp: ContainerComponent;
    let fixture: ComponentFixture<ContainerComponent>;
    let de: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ContainerComponent
            ]
        });

        fixture = TestBed.createComponent(ContainerComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
    });

    it ('has shadow', () => {
        comp.hasShadow = true;
        fixture.detectChanges();

        let shadow = de.query(By.css('.maui-container__shadow'));

        expect(shadow).toBeTruthy();
    });

    it ('has no shadow', () => {
        comp.hasShadow = false;
        fixture.detectChanges();

        let shadow = de.query(By.css('.maui-container__shadow'));

        expect(shadow).toBeFalsy();
    });
});
