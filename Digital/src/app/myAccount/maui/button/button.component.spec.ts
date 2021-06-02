import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { ButtonSize, ButtonType, MauiButtonModule } from './index';

describe('Maui Button Component', () => {
    let comp: ButtonComponent;
    let fixture: ComponentFixture<ButtonComponent>;
    let de: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ MauiButtonModule ]
        });

        fixture = TestBed.createComponent(ButtonComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
    });

    it('should display the default button', () => {
        // ACT
        fixture.detectChanges();

        // ASSERT
        const button = fixture.nativeElement.querySelector('button');
        expect(button.classList).toContain('maui-button--primary');
        expect(button.classList).toContain('maui-button--large');
    });

    it('should display a small primary button', () => {
        // ARRANGE
        comp.type = ButtonType.primary;
        comp.size = ButtonSize.small;

        // ACT
        fixture.detectChanges();

        // ASSERT
        const button = fixture.nativeElement.querySelector('button');
        expect(button.classList).toContain('maui-button--primary');
        expect(button.classList).toContain('maui-button--small');
    });

    it('should display a large secondary button', () => {
        // ARRANGE
        comp.type = ButtonType.secondary;
        comp.size = ButtonSize.large;

        // ACT
        fixture.detectChanges();

        // ASSERT
        const button = fixture.nativeElement.querySelector('button');
        expect(button.classList).toContain('maui-button--secondary');
        expect(button.classList).toContain('maui-button--large');
    });

    it('should display a small secondary button', () => {
        // ARRANGE
        comp.type = ButtonType.secondary;
        comp.size = ButtonSize.small;

        // ACT
        fixture.detectChanges();

        // ASSERT
        const button = fixture.nativeElement.querySelector('button');
        expect(button.classList).toContain('maui-button--secondary');
        expect(button.classList).toContain('maui-button--small');
    });

    it('should display a large tertiary button', () => {
        // ARRANGE
        comp.type = ButtonType.tertiary;

        // ACT
        fixture.detectChanges();

        // ASSERT
        const button = fixture.nativeElement.querySelector('button');
        expect(button.classList).toContain('maui-button--tertiary');
        expect(button.classList).toContain('maui-button--large-tertiary');
    });

    it('should display a small tertiary button', () => {
        // ARRANGE
        comp.type = ButtonType.tertiary;
        comp.size = ButtonSize.small;

        // ACT
        fixture.detectChanges();

        // ASSERT
        const button = fixture.nativeElement.querySelector('button');
        expect(button.classList).toContain('maui-button--tertiary');
        expect(button.classList).toContain('maui-button--small-tertiary');
    });

    describe('for link buttons', () => {
        it('should be a small button type', () => {
            // ARRANGE
            comp.type = ButtonType.link;

            // ACT
            fixture.detectChanges();

            // ASSERT
            const button = fixture.nativeElement.querySelector('.maui-button--link');
            expect(button.classList).toContain('maui-button--small');
        });

        it('should not display a button when type is link', () => {
            // ARRANGE
            comp.type = ButtonType.link;

            // ACT
            fixture.detectChanges();

            // ASSERT
            const button = fixture.nativeElement.querySelector('button');
            expect(button).toBeNull();
        });

        it('should display as link type when type is link', () => {
            // ARRANGE
            comp.type = ButtonType.link;

            // ACT
            fixture.detectChanges();

            // ASSERT
            const link = fixture.nativeElement.querySelector('.maui-button--link');
            expect(link).not.toBeNull();
        });

        it('should emit click event for link',  () => {
            // ARRANGE
            comp.type = ButtonType.link;
            spyOn(comp.clicked, 'emit');

            // ACT
            fixture.detectChanges();
            const link = fixture.nativeElement.querySelector('a');
            link.dispatchEvent(new Event('click'));

            // ASSERT
            expect(comp.clicked.emit).toHaveBeenCalled();
        });
    });

    describe('when disabled', () => {
        it('should disable button', () => {
            // ARRANGE
            comp.disabled = true;

            // ACT
            fixture.detectChanges();

            // ASSERT
            const button = fixture.nativeElement.querySelector('button');
            expect(button.classList).toContain('maui-button--disabled');
        });

        it('should not emit click event if button in disabled state',  () => {
            // ARRANGE
            comp.disabled = true;
            spyOn(comp.clicked, 'emit');

            // ACT
            // fixture.detectChanges();
            de.triggerEventHandler('click', null);
            fixture.detectChanges();

            // ASSERT
            expect(comp.clicked.emit).not.toHaveBeenCalled();
        });

        describe('for link buttons', () => {
            it('should disable button', () => {
                // ARRANGE
                comp.type = ButtonType.link;
                comp.disabled = true;

                // ACT
                fixture.detectChanges();

                // ASSERT
                const button = fixture.nativeElement.querySelector('.maui-button--link');
                expect(button.classList).toContain('maui-button--link__disabled');
            });

            it('should not emit click event if button in disabled state',  () => {
                // ARRANGE
                comp.type = ButtonType.link;
                comp.disabled = true;
                spyOn(comp.clicked, 'emit');

                // ACT
                // fixture.detectChanges();
                de.triggerEventHandler('click', null);
                fixture.detectChanges();

                // ASSERT
                expect(comp.clicked.emit).not.toHaveBeenCalled();
            });
        });
    });

    describe('when loading', () => {
        it('should show button loading state', () => {
            // ARRANGE
            comp.loading = true;

            // ACT
            fixture.detectChanges();

            // ASSERT
            const button = fixture.nativeElement.querySelector('button');
            expect(button.classList).toContain('maui-button--loading');
        });

        it('should not emit click event if button in loading state',  () => {
            // ARRANGE
            comp.loading = true;
            spyOn(comp.clicked, 'emit');

            // ACT
            // fixture.detectChanges();
            de.triggerEventHandler('click', null);
            fixture.detectChanges();

            // ASSERT
            expect(comp.clicked.emit).not.toHaveBeenCalled();
        });
        describe('for link buttons', () => {
            it('should show button loading state', () => {
                // ARRANGE
                comp.type = ButtonType.link;
                comp.loading = true;

                // ACT
                fixture.detectChanges();

                // ASSERT
                const button = fixture.nativeElement.querySelector('.maui-button--link');
                expect(button.classList).toContain('maui-button--loading');
            });

            it('should not emit click event if button in loading state',  () => {
                // ARRANGE
                comp.type = ButtonType.link;
                comp.loading = true;
                spyOn(comp.clicked, 'emit');

                // ACT
                // fixture.detectChanges();
                de.triggerEventHandler('click', null);
                fixture.detectChanges();

                // ASSERT
                expect(comp.clicked.emit).not.toHaveBeenCalled();
            });
        });
    });
});
