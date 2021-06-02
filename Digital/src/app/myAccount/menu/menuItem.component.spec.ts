import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MenuItemComponent } from './menuItem.component';

describe('MenuItemComponent', () => {
    let comp: MenuItemComponent;
    let fixture: ComponentFixture<MenuItemComponent>;
    let de: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MenuItemComponent]
        });

        fixture = TestBed.createComponent(MenuItemComponent);
        comp = fixture.componentInstance;

        de = fixture.debugElement;
    });

    it("should display the menu item's label", () => {
        const menuLabel = 'Test';
        comp.menuItem.label = menuLabel;

        fixture.detectChanges();
        const label = de.query(By.css('.menu-item__label')).nativeElement;
        expect(label.textContent).toEqual(menuLabel);
    });

    it('should show an indicator for the menu item', () => {
        comp.menuItem.label = 'Test';

        fixture.detectChanges();
        let indicator = de.query(By.css('.menu-item__indicator'));
        expect(comp.showMenuIndicator).toBeFalsy();
        expect(indicator).toBeNull();

        comp.menuItem.showIndicator = true;
        fixture.detectChanges();

        indicator = de.query(By.css('.menu-item__indicator'));
        expect(comp.showMenuIndicator).toBeTruthy();
        expect(indicator).toBeDefined();
    });
});
