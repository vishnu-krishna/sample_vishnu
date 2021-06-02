import { MauiChevronMenuModule } from './chevronMenu.module';
import { DebugElement, Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
    selector: 'agl-test-component',
    template: `<agl-maui-chevron-menu
                    [isUp]="isUp"
                    [upMessage]="'UP'"
                    [downMessage]="'DOWN'"
                    (toggled)="toggleIsUp()">
               </agl-maui-chevron-menu>`,
})
class TestComponent {
    public isUp: boolean = true;

    toggleIsUp(): void {
        this.isUp = !this.isUp;
    }
}

describe('MAUI Chevron menu', () => {
    let fixture: ComponentFixture<TestComponent>;
    let menu: HTMLDivElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MauiChevronMenuModule
            ],
            declarations: [
                TestComponent
            ]
        });
        fixture = TestBed.createComponent(TestComponent);

        fixture.detectChanges();

        menu = fixture.nativeElement.querySelector('.maui-chevron-menu');
    });

    describe(`When 'isUp' is 'true'`, () => {
        it(`should display 'UP' as link text`, () => {
            const message = menu.querySelector('span');
            expect(message.innerText).toBe('UP');
        });

        it('should use UP chevron icon', () => {
            const upIcon = menu.querySelector('.maui-chevron-menu__icon--up');
            expect(upIcon).not.toBeNull();
        });

        describe(`When click 'UP'`, () => {
            beforeEach(() => {
                menu.dispatchEvent(new Event('click'));
                fixture.detectChanges();
            });

            it(`should display 'DOWN' as link text`, () => {
                const message = menu.querySelector('span');

                expect(message.innerText).toBe('DOWN');
            });

            it('should NOT use UP chevron icon', () => {
                const upIcon = menu.querySelector('.maui-chevron-menu__icon--up');
                expect(upIcon).toBeNull();
            });

            describe(`When click 'DOWN'`, () => {
                beforeEach(() => {
                    menu.dispatchEvent(new Event('click'));
                    fixture.detectChanges();
                });

                it(`should display 'UP' as link text`, () => {
                    const message = menu.querySelector('span');

                    expect(message.innerText).toBe('UP');
                });

                it('should use UP chevron icon', () => {
                    const upIcon = menu.querySelector('.maui-chevron-menu__icon--up');

                    expect(upIcon).not.toBeNull();
                });
            });
        });
    });
});
