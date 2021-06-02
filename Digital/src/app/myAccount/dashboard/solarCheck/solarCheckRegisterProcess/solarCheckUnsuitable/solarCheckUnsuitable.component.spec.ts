import { DebugElement }    from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { Observable }      from 'rxjs/Observable';

import { SolarCheckEligiblity } from '../../../../../shared/model/solar/solarCheckEligibility.model';
import { IMessageBusService } from '../../../../../shared/service/contract/imessageBus.service';
import { DataLayerService } from '../../../../../shared/service/dataLayer.service';
import { ModalService } from '../../../../modal/modal.service';
import { ISolarCheckService } from '../../../../services/contract/isolarCheck.service';
import { SolarCheckUnsuitableComponent } from './solarCheckUnsuitable.component';

describe('Solar Check Unsuitable', () => {

     let comp: SolarCheckUnsuitableComponent;
     let fixture: ComponentFixture<SolarCheckUnsuitableComponent>;
     let de: DebugElement;
     let el: HTMLElement;

     let dummySolarCheckService = {
         isEligible: (): Observable<SolarCheckEligiblity> => {
             throw new Error('dummySolarCheckService.isEligible has not been mocked properly.');
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
        pushSccRegisterHasBattery: () => {
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
                 { provide: IMessageBusService, useValue: messageBusService }
            ],
                declarations: [SolarCheckUnsuitableComponent],
                imports: []
            });

        fixture = TestBed.createComponent(SolarCheckUnsuitableComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
     });

     describe('When Solar Check Unsuitable is initially loaded', () => {
        it('should display page with \'My Account Button\' button with battery yes image and battery link present.', async(() => {

            // ACT
            fixture.detectChanges();

            // ASSERT
            let prerequisiteMainElement = de.query(By.css('.battery-details-capture'));
            expect(prerequisiteMainElement).not.toBeNull('could not find prerequisite main screen');

            let yesButtonElement = de.query(By.css('.option-button-yes-img-size'));
            expect(yesButtonElement).not.toBeNull('Yes option button to be present and in a deselected state');

            let myAccountButtonElement = de.query(By.css('.next-button'));
            expect(myAccountButtonElement).not.toBeNull('my account button to be present');

            let previousLinkElement = de.query(By.css('.link'));
            expect(previousLinkElement).not.toBeNull('do not have battery link to be present');
        }));
    });

});
