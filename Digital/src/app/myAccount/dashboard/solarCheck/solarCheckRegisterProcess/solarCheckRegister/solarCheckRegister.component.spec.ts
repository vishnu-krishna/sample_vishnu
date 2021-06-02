import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MyAccountMaterialModule } from '../../../../modules/my-account.material.module';

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { ISolarCheckOfferService } from '../../../../../myAccount/services/contract/isolarCheckOffer.service';
import { AlertComponent } from '../../../../../shared/component/alert/alert.component';
import { LoadingComponent } from  '../../../../../shared/loaders/loading.component';
import { SolarCheckEligiblity } from '../../../../../shared/model/solar/solarCheckEligibility.model';
import { SolarCheckStatusResponse } from '../../../../../shared/model/solar/solarCheckStatusResponse.model';
import { IMessageBusService } from '../../../../../shared/service/contract/imessageBus.service';
import { DataLayerService } from '../../../../../shared/service/dataLayer.service';
import { ModalService } from '../../../../modal/modal.service';
import { ISolarCheckService } from '../../../../services/contract/isolarCheck.service';
import { SolarCheckStatusViewModelFactory } from '../../solarCheckStatus/solarCheckStatusViewModelFactory';
import { SolarCheckRegisterComponent } from './solarCheckRegister.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Solar Check Register', () => {

    let comp: SolarCheckRegisterComponent;
    let fixture: ComponentFixture<SolarCheckRegisterComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    let dummySolarCheckService = {
        isEligible: (): Observable<SolarCheckEligiblity> => {
            throw new Error('dummySolarCheckService.isEligible has not been mocked properly.');
        },
        getStatus: (): Observable<SolarCheckStatusResponse> => {
            throw new Error('dummySolarCheckService.isEligible has not been mocked properly.');
        },
        setHasBattery: (hasBattery: boolean): Observable<boolean> => {
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
        pushSccRegisterError: () => {
            return;
        },
        pushSccRegisterSuccess: () => {
            return;
        }
    };

    let solarCheckOfferService = {
        isRegistered: false
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
                SolarCheckStatusViewModelFactory,
                { provide: ISolarCheckService, useValue: dummySolarCheckService },
                { provide: ModalService, useValue: dummyModalService },
                { provide: DataLayerService, useValue: dummyDataLayerService },
                { provide: IMessageBusService, useValue: messageBusService },
                { provide: ISolarCheckOfferService, useValue: solarCheckOfferService },
                { provide: MATERIAL_SANITY_CHECKS, useValue: false }
            ],
            declarations: [SolarCheckRegisterComponent,
                           AlertComponent,
                           LoadingComponent],
            imports: [
                MyAccountMaterialModule,
                HttpClientTestingModule,
            ]
        });

        fixture = TestBed.createComponent(SolarCheckRegisterComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
    });

    it('should display page with Terms of Service check box unchecked and Next button disabled', async(() => {
        fixture.detectChanges();
        let checkBox = de.query(By.css('.mat-checkbox-checked'));
        expect(checkBox).toBeNull('check box to be unchecked');
        let nextButtonElement = de.query(By.css('[disabled].dls-button'));
        expect(nextButtonElement).not.toBeNull('Next button to be present and in a disabled state');

    }));

    it('accepting the terms and conditions enables the next button', async(() => {
        comp.termsAccepted = true;
        // Arrange
        fixture.detectChanges();

        let checkBox = de.query(By.css('.mat-checkbox-checked'));
        expect(checkBox).not.toBeNull('check box to be checked');

        let nextButtonElement = de.query(By.css('.dls-button'));
        expect(nextButtonElement).not.toBeNull('Next button to be present and and enabled');
    }));

    it('when awaiting registration response then main text area should not appear', async(() => {
        comp.awaitingRegisterResponse = true;
        // Arrange
        fixture.detectChanges();

        let mainTextArea = de.query(By.css('.main-heading'));
        expect(mainTextArea).toBeNull('main text area not to be present');
    }));

    it('when awaiting registration response then check box should not appear', async(() => {
        comp.awaitingRegisterResponse = true;
        // Arrange
        fixture.detectChanges();

        let checkBox = de.query(By.css('.mat-checkbox-checked'));
        expect(checkBox).toBeNull('check box should to not be present');
    }));

    it('when awaiting registration response then Next button should not appear', async(() => {
        comp.awaitingRegisterResponse = true;
        // Arrange
        fixture.detectChanges();

        let nextButtonElement = de.query(By.css('.dls-button'));
        expect(nextButtonElement).toBeNull('Next button to be not present');
    }));

    it('when awaiting registration response then associated waiting text should appear', async(() => {
        comp.awaitingRegisterResponse = true;
        // Arrange
        fixture.detectChanges();

        // Assert
        let loadingTextTitleElement = de.query(By.css('.loading-text-title'));
        expect(loadingTextTitleElement).not.toBeNull('Loading text subtitle to be present');

        let loadingTextSubtitleElement = de.query(By.css('.loading-text-subtitle'));
        expect(loadingTextSubtitleElement).not.toBeNull('Loading text subtitle to be present');
    }));

    it('when awaiting registration response then AGL spinner should appear', async(() => {
        comp.awaitingRegisterResponse = true;
        // Arrange
        fixture.detectChanges();

        // Assert
        let loadingSpinnerElement = de.query(By.css('.spinner > .logo'));
        expect(loadingSpinnerElement).not.toBeNull('AGL spinner logo should appear');
    }));

    it('when not awaiting registration response then associated waiting text should not appear', async(() => {
        comp.awaitingRegisterResponse = false;
        // Arrange
        fixture.detectChanges();

        // Assert
        let loadingTextTitleElement = de.query(By.css('.loading-text-title'));
        expect(loadingTextTitleElement).toBeNull('Loading text subtitle not to be visible');

        let loadingTextSubtitleElement = de.query(By.css('.loading-text-subtitle'));
        expect(loadingTextSubtitleElement).toBeNull('Loading text subtitle not to be visible');
    }));

    it('when not awaiting registration response then AGL spinner should not appear', async(() => {
        comp.awaitingRegisterResponse = false;
        // Arrange
        fixture.detectChanges();

        // Assert
        let loadingSpinnerElement = de.query(By.css('.spinner > .logo '));
        expect(loadingSpinnerElement).toBeNull('AGL spinner logo should not appear');
    }));
});
