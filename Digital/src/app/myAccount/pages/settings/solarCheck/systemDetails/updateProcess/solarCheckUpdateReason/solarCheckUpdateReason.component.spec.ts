import { DebugElement }    from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { ModalService } from '../../../../../../modal/modal.service';

import { SolarCheckUpdateReasonComponent } from './solarCheckUpdateReason.component';

describe('Solar Check Update Reason', () => {

    let comp: SolarCheckUpdateReasonComponent;
    let fixture: ComponentFixture<SolarCheckUpdateReasonComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    let dummyModalService = {
        activate: (options: Object): Promise<boolean> => {
            throw new Error('dummyModalService.activate has not been mocked properly.');
        },
        close: (): Promise<boolean> => {
            throw new Error('dummyModalService.activate has not been mocked properly.');
        }
    };

    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [
                { provide: ModalService, useValue: dummyModalService },
            ],
            declarations: [SolarCheckUpdateReasonComponent],
            imports: []
        });

        fixture = TestBed.createComponent(SolarCheckUpdateReasonComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
    });

    describe('When Solar Check Update Reason is initially loaded', () => {
        it('should display page with \'Next\' button disabled and both \'Correction\' and \'Amendment\' buttons\' deselected', async(() => {

            // ACT
            fixture.detectChanges();

            // ASSERT
            let prerequisiteMainElement = de.query(By.css('.update-details-capture'));
            expect(prerequisiteMainElement).not.toBeNull('could not find update details main screen');

            let systemChangedButtonElement = de.query(By.css('.option-button-system-changed.option-button-deselected'));
            expect(systemChangedButtonElement).not.toBeNull('System Changed option button to be present and in a deselected state');

            let systemCorrectionButtonElement = de.query(By.css('.option-button-system-correction.option-button-deselected'));
            expect(systemCorrectionButtonElement).not.toBeNull('System correction option button to be present and in a deselected state');

            let nextButtonElement = de.query(By.css('[disabled].next-button'));
            expect(nextButtonElement).not.toBeNull('Next button to be present and in a disabled state');
        }));
    });

    describe('When Solar Check Prequisite is initially loaded', () => {
        it('should initialise with model\'s \'systemChanged\' set to null', async(() => {

            // ACT
            fixture.detectChanges();

            // ASSERT
            expect(comp.model.systemChanged).toBeNull('Model\'s System Change (i.e. update reason) to be null i.e. not yet selected either Change nor Correction');
        }));
    });

    describe('When Solar Check Update Reason\'s \'System Change\' Button is selected', () => {
        it('Should display page with \'System Change\' selected ready state', async(() => {

            // Arrange
            fixture.detectChanges();

            // Pre Check
            let nextButtonElement = de.query(By.css('[disabled].next-button'));
            expect(nextButtonElement).not.toBeNull('Next button to be present and disabled');

            let systemChangedDeselectedButtonElement = de.query(By.css('.option-button-system-changed.option-button-deselected'));
            expect(systemChangedDeselectedButtonElement).not.toBeNull(' \'System Changed\' button to be present and deselected');

            expect(comp.model.systemChanged).toBeNull();

            // Act
            systemChangedDeselectedButtonElement.triggerEventHandler('click', null);
            fixture.detectChanges();

            /// Assert
            systemChangedDeselectedButtonElement = de.query(By.css('.option-button-system-changed'));
            expect(systemChangedDeselectedButtonElement).not.toBeNull(' \'System Changed\' button to be present');

            systemChangedDeselectedButtonElement = de.query(By.css('.option-button-system-changed.option-button-deselected'));
            expect(systemChangedDeselectedButtonElement).toBeNull(' \'System Changed\' button not to be in a deselected state');

            nextButtonElement = de.query(By.css('.next-button'));
            expect(nextButtonElement).not.toBeNull('Next button to be present');

            nextButtonElement = de.query(By.css('[disabled].button-next'));
            expect(nextButtonElement).toBeNull('Next button not to be in a disabled state');

            let systemCorrectionDeselectedButtonElement = de.query(By.css('.option-button-system-correction.option-button-deselected'));
            expect(systemCorrectionDeselectedButtonElement).not.toBeNull(' \'System Correction\' button to be in a deselected state');
        }));
    });

    describe('When Solar Check Prequisite\'s \'System Changed\' Button is selected', () => {
        it('Should set model\'s \'systemChanged\' set to true', async(() => {
            // Arrange
            fixture.detectChanges();
            let systemChangedDeselectedButtonElement = de.query(By.css('.option-button-system-changed.option-button-deselected'));

            // Pre Check
            expect(comp.model.systemChanged).toBeNull();

            // Act
            systemChangedDeselectedButtonElement.triggerEventHandler('click', null);
            fixture.detectChanges();

            /// Assert
            expect(comp.model.systemChanged).toEqual(true);
        }));
    });

    describe('When Solar Check Update Reason\'s \'System Correction\' Button is selected', () => {
        it('Should display page with \'System Correction\' selected ready state', async(() => {

            // Arrange
            fixture.detectChanges();

            // Pre Check
            let nextButtonElement = de.query(By.css('[disabled].next-button'));
            expect(nextButtonElement).not.toBeNull('Next button to be present and disabled');

            let systemCorrectionDeselectedButtonElement = de.query(By.css('.option-button-system-correction.option-button-deselected'));
            expect(systemCorrectionDeselectedButtonElement).not.toBeNull(' \'System Correction\' button to be present and deselected');

            expect(comp.model.systemChanged).toBeNull();

            // Act
            systemCorrectionDeselectedButtonElement.triggerEventHandler('click', null);
            fixture.detectChanges();

            /// Assert
            systemCorrectionDeselectedButtonElement = de.query(By.css('.option-button-system-correction'));
            expect(systemCorrectionDeselectedButtonElement).not.toBeNull(' \'System Correction\' button to be present');

            systemCorrectionDeselectedButtonElement = de.query(By.css('.option-button-system-correction.option-button-deselected'));
            expect(systemCorrectionDeselectedButtonElement).toBeNull(' \'System Correction\' button not to be in a deselected state');

            nextButtonElement = de.query(By.css('.next-button'));
            expect(nextButtonElement).not.toBeNull('Next button to be present');

            nextButtonElement = de.query(By.css('[disabled].button-next'));
            expect(nextButtonElement).toBeNull('Next button not to be in a disabled state');

            let systemChangedDeselectedButtonElement = de.query(By.css('.option-button-system-changed.option-button-deselected'));
            expect(systemChangedDeselectedButtonElement).not.toBeNull(' \'System Changed\' button to be in a deselected state');
        }));
    });

    describe('When Solar Check Prequisite\'s \'System Correction\' Button is selected', () => {
        it('Should set model\'s \'systemCorrection\' set to true', async(() => {
            // Arrange
            fixture.detectChanges();
            let systemCorrectionDeselectedButtonElement = de.query(By.css('.option-button-system-correction.option-button-deselected'));

            // Pre Check
            expect(comp.model.systemChanged).toBeNull();

            // Act
            systemCorrectionDeselectedButtonElement.triggerEventHandler('click', null);
            fixture.detectChanges();

            /// Assert
            expect(comp.model.systemChanged).toEqual(false);
        }));
    });
});
