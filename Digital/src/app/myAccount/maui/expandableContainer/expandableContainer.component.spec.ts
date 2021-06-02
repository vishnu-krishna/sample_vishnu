import { DebugElement, Component } from '@angular/core';
import { TestBed, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ExpandableContainerComponent, MauiExpandableContainerModule } from '.';

const expandedHeightForContainers = 498;
const collapsedHeightForCollapsableContainer = 410;
const gradientHeight = 64;

@Component({
    selector: 'agl-test-component',
    template: `<agl-maui-expandable-container
                    class='collapsable'
                    [collapsedHeight]="${collapsedHeightForCollapsableContainer}"
                    [gradientHeight]="${gradientHeight}"
                    [collapsedMessage]="'Show more'"
                    [expandedMessage]="'Show less'">
                        <div style="height: ${expandedHeightForContainers}px;">Placeholder</div>
               </agl-maui-expandable-container>
               <agl-maui-expandable-container
                    class='non-collapsable'
                    [collapsedHeight]="1000"
                    [gradientHeight]="${gradientHeight}"
                    [collapsedMessage]="'Show more'"
                    [expandedMessage]="'Show less'">
                        <div style="height: ${expandedHeightForContainers}px;">Placeholder</div>
               </agl-maui-expandable-container>`,
})
class TestComponent {
}

describe('MAUI Expandable Container', () => {
    let fixture: ComponentFixture<TestComponent>;
    let collapsedComponent: DebugElement;
    let collapsedContainer: DebugElement;
    let gradient: DebugElement;
    let menu: DebugElement;

    let expandedComponent: DebugElement;
    let expandedContainer: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MauiExpandableContainerModule
            ],
            declarations: [
                TestComponent
            ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(TestComponent);
        const de = fixture.debugElement;

        collapsedComponent = de.query(By.css('.collapsable'));
        collapsedContainer = collapsedComponent.query(By.css('.maui-expandable-container'));
        gradient = collapsedContainer.query(By.css('.maui-expandable-container__gradient'));
        menu = collapsedComponent.query(By.css('.maui-chevron-menu'));

        expandedComponent = de.query(By.css('.non-collapsable'));
        expandedContainer = expandedComponent.query(By.css('.maui-expandable-container'));
    });

    describe('When height is bigger than collapsedHeight', () => {
        it(`should set max-height of 'collapsedHeight' on collapsable container`, () => {
            expect(collapsedContainer.nativeElement.style.maxHeight).toBe(`${collapsedHeightForCollapsableContainer}px`);
        });

        describe('gradient', () => {
            it(`should set top of 'collapsedHeight - gradientHeight'`, () => {
                const expected = collapsedHeightForCollapsableContainer - gradientHeight;
                expect(gradient.nativeElement.style.top).toBe(`${expected}px`);
            });

            it(`should set height of 'gradientHeight'`, () => {
                expect(gradient.nativeElement.style.height).toBe(`${gradientHeight}px`);
            });
        });

        describe('menu', () => {
            it('should use down chevron icon', () => {
                const upIcon = menu.query(By.css('.maui-chevron-menu__icon--up'));

                expect(upIcon).toBeNull();
            });

            it(`should use 'Show more' as link`, () => {
                const sentence = menu.query(By.css('span'));

                expect(sentence.nativeElement.innerText).toBe('Show more');
            });
        });

        describe(`When click 'Show more'`, () => {
            beforeEach(() => {
                menu.triggerEventHandler('click', null);
                fixture.detectChanges();
            });

            it(`should set max-height of 'initial height' on collapsable container`, () => {
                expect(collapsedContainer.nativeElement.style.maxHeight).toBe(`${expandedHeightForContainers}px`);
            });

            describe('gradient', () => {
                it(`should set top of 'initial height'`, () => {
                    expect(gradient.nativeElement.style.top).toBe(`${expandedHeightForContainers}px`);
                });
            });

            describe('menu', () => {
                it('should use up chevron icon', () => {
                    const upIcon = menu.query(By.css('.maui-chevron-menu__icon--up'));

                    expect(upIcon).not.toBeNull();
                });

                it(`should use 'Show less' as link`, () => {
                    const sentence = menu.query(By.css('span'));

                    expect(sentence.nativeElement.innerText).toBe('Show less');
                });
            });

            describe(`When click 'Show less'`, () => {
                beforeEach(() => {
                    menu.triggerEventHandler('click', null);
                    fixture.detectChanges();
                });

                it(`should set max-height of 'collapsedHeight' on collapsed container`, () => {
                    expect(collapsedContainer.nativeElement.style.maxHeight).toBe(`${collapsedHeightForCollapsableContainer}px`);
                });

                describe('gradient', () => {
                    it(`should set top of 'collapsedHeight - gradientHeight'`, () => {
                        const expected = collapsedHeightForCollapsableContainer - gradientHeight;
                        expect(gradient.nativeElement.style.top).toBe(`${expected}px`);
                    });

                    it(`should set height of 'gradientHeight'`, () => {
                        expect(gradient.nativeElement.style.height).toBe(`${gradientHeight}px`);
                    });
                });

                describe('menu', () => {
                    it('should use down chevron icon', () => {
                        const upIcon = menu.query(By.css('.maui-chevron-menu__icon--up'));

                        expect(upIcon).toBeNull();
                    });

                    it(`should use 'Show more' as link`, () => {
                        const sentence = menu.query(By.css('span'));

                        expect(sentence.nativeElement.innerText).toBe('Show more');
                    });
                });
            });
        });
    });

    describe('When height is smaller than collapsedHeight', () => {
        it(`should not set max-height on non-expandable container`, () => {
            expect(expandedContainer.nativeElement.style.maxHeight).toBe('');
        });

        describe('gradient', () => {
            it(`should not set top`, () => {
                const expandedgradient = expandedContainer.query(By.css('.maui-expandable-container__gradient'));

                expect(expandedgradient.nativeElement.style.top).toBe('');
            });

            it('should not set height', () => {
                const expandedgradient = expandedContainer.query(By.css('.maui-expandable-container__gradient'));

                expect(expandedgradient.nativeElement.style.height).toBe('');
            });
        });

        it('should hide the menu', () => {
            const collapsedMenu = expandedComponent.query(By.css('.maui-chevron-menu'));

            expect(collapsedMenu.nativeElement.classList.contains('hidden')).toBeTruthy();
        });
    });
});
