import { DebugElement }    from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { Observable }      from 'rxjs/Observable';
import { ModalService } from '../../../../modal/modal.service';

import { SolarCheckEligiblity } from '../../../../../shared/model/solar/solarCheckEligibility.model';
import { SolarCheckStatusResponse } from '../../../../../shared/model/solar/solarCheckStatusResponse.model';
import { IMessageBusService } from '../../../../../shared/service/contract/imessageBus.service';
import { DataLayerService } from '../../../../../shared/service/dataLayer.service';
import { ISolarCheckService } from '../../../../services/contract/isolarCheck.service';
import { SolarCheckPrerequisiteComponent } from './solarCheckPrerequisite.component';

describe('Solar Check Prerequisite', () => {

     let comp: SolarCheckPrerequisiteComponent;
     let fixture: ComponentFixture<SolarCheckPrerequisiteComponent>;
     let de: DebugElement;
     let el: HTMLElement;

     let dummySolarCheckService = {
         isEligible: (): Observable<SolarCheckEligiblity> => {
             throw new Error('dummySolarCheckService.isEligible has not been mocked properly.');
         },
         getStatus: (): Observable<SolarCheckStatusResponse> => {
             throw new Error('dummySolarCheckService.isEligible has not been mocked properly.');
         },
         setHasBattery: (hasBattery: boolean): Observable<boolean>  => {
             throw new Error('dummyModalService.activate has not been mocked properly.');
         }
     };

     let dummyModalService = {
         activate: (options: Object): Promise<boolean> => {
             throw new Error('dummyModalService.activate has not been mocked properly.');
         },
         close: (): Promise<boolean> => {
             throw new Error('dummyModalService.activate has not been mocked properly.');
         }
     };

     let dummyDataLayerService = {
        pushSccRegisterBatteryError: () => {
            return;
        },
        pushSccRegisterHasBattery: () => {
            return;
        },
        pushSccRegisterSolarDetails: () => {
            return;
        }
     };

     let messageBusService = {
         // tslint:disable-next-line:no-empty
         broadcast: (): any => {
         },
         listenWithLatest: (): any => {
             return Observable.of({});
         },
         listen: (): any => {
             return Observable.of({});
         }
     };

     beforeEach(() => {

        TestBed.configureTestingModule({
             providers: [
                 { provide: ISolarCheckService, useValue: dummySolarCheckService },
                 { provide: ModalService, useValue: dummyModalService },
                 { provide: DataLayerService, useValue: dummyDataLayerService },
                 { provide: IMessageBusService, useValue: messageBusService },
            ],
                declarations: [SolarCheckPrerequisiteComponent],
                imports: []
            });

        fixture = TestBed.createComponent(SolarCheckPrerequisiteComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
     });

     describe('When Solar Check Prequisite is initially loaded', () => {
        it('should display page with \'Next\' button disabled and both \'Yes\' and \'No\' buttons\' deselected', async(() => {

            // ACT
            fixture.detectChanges();

            // ASSERT
            let prerequisiteMainElement = de.query(By.css('.battery-details-capture'));
            expect(prerequisiteMainElement).not.toBeNull('could not find prerequisite main screen');

            let yesButtonElement = de.query(By.css('.option-button-yes.option-button-deselected'));
            expect(yesButtonElement).not.toBeNull('Yes option button to be present and in a deselected state');

            let noButtonElement = de.query(By.css('.option-button-no.option-button-deselected'));
            expect(noButtonElement).not.toBeNull('No option button to be present and in a deselected state');

            let nextButtonElement = de.query(By.css('[disabled].next-button'));
            expect(nextButtonElement).not.toBeNull('Next button to be present and in a disabled state');

            expect(comp.model.hasBattery).toBeNull('hasBattery to be null i.e. not yet selected either true or false');
        }));
    });

     describe('When Solar Check Prequisite is initially loaded', () => {
        it('should initialise with model\'s \'hasBattery\' set to null', async(() => {

            // ACT
            fixture.detectChanges();

            // ASSERT
            expect(comp.model.hasBattery).toBeNull('hasBattery to be null i.e. not yet selected either true or false');
        }));
    });

     describe('When Solar Check Prequisite\'s \'Yes\' Button is selected', () => {
        it('Should display page with \'Yes\' button selected, \'Next\' button enabled, and \'No\' button deselected', async(() => {

            // Arrange
            fixture.detectChanges();

            // Pre Check
            let nextButtonElement = de.query(By.css('[disabled].next-button'));
            expect(nextButtonElement).not.toBeNull('Next button to be present and disabled');

            let yesDeselectedButtonElement = de.query(By.css('.option-button-yes.option-button-deselected'));
            expect(yesDeselectedButtonElement).not.toBeNull(' \'Yes\' button to be present and deselected');

            expect(comp.model.hasBattery).toBe(null);

            // Act
            yesDeselectedButtonElement.triggerEventHandler('click', null);
            fixture.detectChanges();

            /// Assert
            yesDeselectedButtonElement = de.query(By.css('.option-button-yes'));
            expect(yesDeselectedButtonElement).not.toBeNull(' \'Yes\' button to be present');

            yesDeselectedButtonElement = de.query(By.css('.option-button-yes.option-button-deselected'));
            expect(yesDeselectedButtonElement).toBeNull(' \'Yes\' button not to be in a deselected state');

            nextButtonElement = de.query(By.css('.next-button'));
            expect(nextButtonElement).not.toBeNull('Next button to be present');

            nextButtonElement = de.query(By.css('[disabled].button-next'));
            expect(nextButtonElement).toBeNull('Next button not to be in a disabled state');

            let noDeselectedButtonElement = de.query(By.css('.option-button-no.option-button-deselected'));
            expect(noDeselectedButtonElement).not.toBeNull(' \'No\' button to be in a deselected state');
        }));
    });

     describe('When Solar Check Prequisite\'s \'Yes\' Button is selected', () => {
        it('Should set model\'s \'hasBattery\' set to true', async(() => {
            // Arrange
            fixture.detectChanges();
            let yesDeselectedButtonElement = de.query(By.css('.option-button-yes.option-button-deselected'));

            // Pre Check
            expect(comp.model.hasBattery).toBe(null);

            // Act
            yesDeselectedButtonElement.triggerEventHandler('click', null);
            fixture.detectChanges();

            /// Assert
            expect(comp.model.hasBattery).toEqual(true);
        }));
    });

     describe('When Solar Check Prequisite\'s \'No\' Button is selected', () => {
        it('Should display page with \'No\' button selected, \'Next\' button enabled, and \'Yes\' button deselected', async(() => {

            // Arrange
            fixture.detectChanges();

            // Pre Check
            let nextButtonElement = de.query(By.css('[disabled].next-button'));
            expect(nextButtonElement).not.toBeNull('Next button to be present and disabled');

            let noButtonElement = de.query(By.css('.option-button-no.option-button-deselected'));
            expect(noButtonElement).not.toBeNull(' \'No\' button to be present and deselected');

            // Act
            noButtonElement.triggerEventHandler('click', null);
            fixture.detectChanges();

            /// Assert
            noButtonElement = de.query(By.css('.option-button-no'));
            expect(noButtonElement).not.toBeNull(' \'No\'button to be present');

            noButtonElement = de.query(By.css('.option-button-no.option-button-deselected'));
            expect(noButtonElement).toBeNull(' \'No\' option button to be in a selected state');

            nextButtonElement = de.query(By.css('.next-button'));
            expect(nextButtonElement).not.toBeNull('Next button to be present');

            nextButtonElement = de.query(By.css('[disabled].next-button'));
            expect(nextButtonElement).toBeNull('Next button not to be in a disabled state');

            let yesDeselectedButtonElement = de.query(By.css('.option-button-yes.option-button-deselected'));
            expect(yesDeselectedButtonElement).not.toBeNull(' \'Yes\' button to be in a deselected state');
        }));
    });

     describe('When Solar Check Prequisite\'s \'No\' Button is selected', () => {
        it('Should set model\'s \'hasBattery\' set to false', async(() => {

            // Arrange
            fixture.detectChanges();
            let noButtonElement = de.query(By.css('.option-button-no.option-button-deselected'));

            // Pre Check
            expect(comp.model.hasBattery).toBe(null);

            // Act
            noButtonElement.triggerEventHandler('click', null);
            fixture.detectChanges();

            /// Assert
            expect(comp.model.hasBattery).toEqual(false);
        }));
    });

});
