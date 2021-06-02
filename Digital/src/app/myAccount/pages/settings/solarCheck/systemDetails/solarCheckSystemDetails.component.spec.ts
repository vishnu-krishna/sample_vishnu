import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { DateAdapter, MAT_NATIVE_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { MyAccountMaterialModule } from '../../../../modules/my-account.material.module';

import { DebugElement, LOCALE_ID } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

// Test Subject
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { AlertComponent } from '../../../../../shared/component/alert/alert.component';
import { YesNoSwitchComponent } from '../../../../../shared/component/yesNoSwitch/yesNoSwitch.component';
import { Locale as Locales }  from '../../../../../shared/globals/localisation';
import { LoadingComponent } from '../../../../../shared/loaders/loading.component';
import { SolarCheckContractResponse } from '../../../../../shared/model/solar/solarCheckContract.model';
import { SolarCheckEligiblity } from '../../../../../shared/model/solar/solarCheckEligibility.model';
import { IMessageBusService } from '../../../../../shared/service/contract/imessageBus.service';
import { DataLayerService } from '../../../../../shared/service/dataLayer.service';
import { APP_DATE_FORMATS, MyDateAdapterService } from '../../../../dashboard/solarCheck/solarCheckRegisterProcess/solarCheckSolarDetails/solarCheckSolarDetails.component';
import { ModalService } from '../../../../modal/modal.service';
import { ISolarCheckService } from '../../../../services/contract/isolarCheck.service';
import { LocalStorageService } from '../../../../services/localStorage.service';
import { SolarCheckSystemDetailsComponent } from './solarCheckSystemDetails.component';
import { SolarCheckUpdateDetailsState } from './updateProcess/solarCheckUpdateDetailsProcess.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('solar settings: solar check system details component', () => {
    let comp: SolarCheckSystemDetailsComponent;
    let fixture: ComponentFixture<SolarCheckSystemDetailsComponent>;
    let de: DebugElement;

    let dummySolarCheckService = {
        isEligible: (): Observable<SolarCheckEligiblity> => {
            throw new Error('contentServiceStub.load has not been mocked properly.');
        },
        getContract: (contractNumber: String) => {
            throw new Error('contentServiceStub.load has not been mocked properly.');
        },
        getPreferences: () => {
            throw new Error('contentServiceStub.load has not been mocked properly.');
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

    let localStorageService = {
        // tslint:disable-next-line:no-empty
        addKey: (key: string): any => { },
        getKeys: (): any => {
            return null;
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

    let dummyDataLayerService = {
        pushSccStatusChangeEmailPreferenceNoError: () => {
            return;
        },
        pushSccStatusChangeEmailPreferenceNo: () => {
            return;
        },
        pushSccStatusChangeEmailPreferenceYes: () => {
            return;
        },
        pushSccStatusChangeEmailPreferenceYesError: () => {
            return;
        },
        pushSccMonthlyEmailPreferencesNoError: () => {
            return;
        },
        pushSccMonthlyEmailPreferencesNo: () => {
            return;
        },
        pushSccMonthlyEmailPreferencesYesError: () => {
            return;
        },
        pushSccMonthlyEmailPreferencesYes: () => {
            return;
        },
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                SolarCheckSystemDetailsComponent,
                YesNoSwitchComponent,
                LoadingComponent,
                AlertComponent
            ],
            imports: [
                MyAccountMaterialModule,
                FormsModule,
                ReactiveFormsModule,
                MatDatepickerModule,
                MatDatepickerModule,
                MatInputModule,
                MatNativeDateModule
            ],
            providers: [
                { provide: ISolarCheckService, useValue: dummySolarCheckService },
                { provide: ModalService, useValue: dummyModalService },
                { provide: LocalStorageService, useValue: localStorageService },
                { provide: IMessageBusService, useValue: messageBusService },
                { provide: MATERIAL_SANITY_CHECKS, useValue: false },
                { provide: DataLayerService, useValue: dummyDataLayerService },
                { provide: LOCALE_ID, useValue: Locales.DEFAULT },
                {
                    provide: DateAdapter, useClass: MyDateAdapterService
                },
                {
                    provide: MAT_NATIVE_DATE_FORMATS, useValue: APP_DATE_FORMATS
                },
                FormBuilder,
                MyAccountMaterialModule,
                HttpClientTestingModule,
            ]
        });

        fixture = TestBed.createComponent(SolarCheckSystemDetailsComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
    });

    it('display the values correctly in system details component', () => {
        let solarCheckService = fixture.debugElement.injector.get(ISolarCheckService);

        let solarCheckContractResponse = new SolarCheckContractResponse();
        solarCheckContractResponse.contractNumber = '123456';
        solarCheckContractResponse.hasBattery = true;
        solarCheckContractResponse.installationYear = 1999;
        solarCheckContractResponse.numberPanels = 10;
        solarCheckContractResponse.systemSizeKw = 12;
        spyOn(solarCheckService, 'getContract').and.returnValue(Observable.of(solarCheckContractResponse));

        let preferences = { marketingComms: true, statusChangeComms: true };
        spyOn(solarCheckService, 'getPreferences').and.returnValue(Observable.of(preferences));
        // ACT
        // Cause ngOnInit to run in the test subject component and the template to be rendered once
        fixture.detectChanges();

        let systemDetailsElement = de.query(By.css('.settings-system-details'));
        expect(systemDetailsElement).not.toBeNull('systemDetailsElement');
        let numberOfOPanels = de.query(By.css('#solar-system-details-panels'));
        expect(numberOfOPanels.nativeElement.innerText).toEqual('10');

        let systemSize = de.query(By.css('#solar-system-details-systemSize'));
        expect(systemSize.nativeElement.innerText).toEqual('12 kW');

        let installationYear = de.query(By.css('#solar-system-details-installationYear'));
        expect(installationYear.nativeElement.innerText).toEqual('1999');
    });
    describe('When Solar Details Updated with System Change',
        () => {
            it('should display System Changed alert',
                async(() => {
                    let solarCheckService = fixture.debugElement.injector.get(ISolarCheckService);

                    let solarCheckContractResponse = new SolarCheckContractResponse();
                    solarCheckContractResponse.contractNumber = '123456';
                    solarCheckContractResponse.hasBattery = true;
                    solarCheckContractResponse.installationYear = 1999;
                    solarCheckContractResponse.numberPanels = 10;
                    solarCheckContractResponse.systemSizeKw = 12;
                    spyOn(solarCheckService, 'getContract').and.returnValue(Observable.of(solarCheckContractResponse));

                    let preferences = { marketingComms: true, statusChangeComms: true };
                    spyOn(solarCheckService, 'getPreferences').and.returnValue(Observable.of(preferences));

                    // ARRANGE
                    comp.mostRecentSystemUpdateType = SolarCheckUpdateDetailsState.UPGRADE;

                    // ACT
                    fixture.detectChanges();

                    // ASSERT
                    let systemCorrectionAlertElement = de.query(By.css('.solar-details-system-correction-alert'));
                    expect(systemCorrectionAlertElement).toBeNull(' System Correction alert should not be visible');

                    let systemChangedAlertElement = de.query(By.css('.solar-details-system-changed-alert'));
                    expect(systemChangedAlertElement).not.toBeNull(' System Changed alert should be visible');
                }));
        });

    describe('When Solar Details Updated with System Correction',
        () => {
            it('Should display System Correction alert',
                async(() => {
                    let solarCheckService = fixture.debugElement.injector.get(ISolarCheckService);

                    let solarCheckContractResponse = new SolarCheckContractResponse();
                    solarCheckContractResponse.contractNumber = '123456';
                    solarCheckContractResponse.hasBattery = true;
                    solarCheckContractResponse.installationYear = 1999;
                    solarCheckContractResponse.numberPanels = 10;
                    solarCheckContractResponse.systemSizeKw = 12;
                    spyOn(solarCheckService, 'getContract').and.returnValue(Observable.of(solarCheckContractResponse));

                    let preferences = { marketingComms: true, statusChangeComms: true };
                    spyOn(solarCheckService, 'getPreferences').and.returnValue(Observable.of(preferences));

                    // ARRANGE
                    comp.mostRecentSystemUpdateType = SolarCheckUpdateDetailsState.CORRECTION;

                    // ACT
                    fixture.detectChanges();

                    // ASSERT
                    let systemChangedAlertElement = de.query(By.css('.solar-details-system-changed-alert'));
                    expect(systemChangedAlertElement).toBeNull(' System Changed alert should not be visible');

                    let systemCorrectionAlertElement = de.query(By.css('.solar-details-system-correction-alert'));
                    expect(systemCorrectionAlertElement).not.toBeNull(' System Correction alert should be visible');
                }));
        });

    describe('When System Details Update Error state is set to true',
        () => {
            it('Should display System Update Error Alert',
                async(() => {
                    let solarCheckService = fixture.debugElement.injector.get(ISolarCheckService);

                    let solarCheckContractResponse = new SolarCheckContractResponse();
                    solarCheckContractResponse.contractNumber = '123456';
                    solarCheckContractResponse.hasBattery = true;
                    solarCheckContractResponse.installationYear = 1999;
                    solarCheckContractResponse.numberPanels = 10;
                    solarCheckContractResponse.systemSizeKw = 12;
                    spyOn(solarCheckService, 'getContract').and.returnValue(Observable.of(solarCheckContractResponse));

                    let preferences = { marketingComms: true, statusChangeComms: true };
                    spyOn(solarCheckService, 'getPreferences').and.returnValue(Observable.of(preferences));

                    // ARRANGE
                    comp.hasSystemUpdateErrorOccurred = true;

                    // ACT
                    fixture.detectChanges();

                    // ASSERT
                    let systemDetailsUpdateAlertElement = de.query(By.css('.solar-details-system-update-error'));
                    expect(systemDetailsUpdateAlertElement).not.toBeNull(' System Details Update alert should be visible');
                    expect(systemDetailsUpdateAlertElement.nativeElement.attributes['alertType'].textContent).toBe('error');
                }));
        });

    describe('When System Details Update Error state is set to false',
        () => {
            it('Should not display System Update Error Alert',
                async(() => {
                    let solarCheckService = fixture.debugElement.injector.get(ISolarCheckService);

                    let solarCheckContractResponse = new SolarCheckContractResponse();
                    solarCheckContractResponse.contractNumber = '123456';
                    solarCheckContractResponse.hasBattery = true;
                    solarCheckContractResponse.installationYear = 1999;
                    solarCheckContractResponse.numberPanels = 10;
                    solarCheckContractResponse.systemSizeKw = 12;
                    spyOn(solarCheckService, 'getContract').and.returnValue(Observable.of(solarCheckContractResponse));

                    let preferences = { marketingComms: true, statusChangeComms: true };
                    spyOn(solarCheckService, 'getPreferences').and.returnValue(Observable.of(preferences));

                    // ARRANGE
                    comp.hasSystemUpdateErrorOccurred = false;

                    // ACT
                    fixture.detectChanges();

                    // ASSERT
                    let systemDetailsUpdateAlertElement = de.query(By.css('.solar-details-system-update-error'));
                    expect(systemDetailsUpdateAlertElement).toBeNull(' System Details Update alert should be visible');
                }));
        });

    describe('When Battery Update Error state is set to true',
        () => {
            it('Should display Battery Update Error Alert',
                async(() => {
                    let solarCheckService = fixture.debugElement.injector.get(ISolarCheckService);

                    let solarCheckContractResponse = new SolarCheckContractResponse();
                    solarCheckContractResponse.contractNumber = '123456';
                    solarCheckContractResponse.hasBattery = true;
                    solarCheckContractResponse.installationYear = 1999;
                    solarCheckContractResponse.numberPanels = 10;
                    solarCheckContractResponse.systemSizeKw = 12;
                    spyOn(solarCheckService, 'getContract').and.returnValue(Observable.of(solarCheckContractResponse));

                    let preferences = { marketingComms: true, statusChangeComms: true };
                    spyOn(solarCheckService, 'getPreferences').and.returnValue(Observable.of(preferences));

                    // ARRANGE
                    comp.hasBatteryUpdateErrorOccurred = true;

                    // ACT
                    fixture.detectChanges();

                    // ASSERT
                    let batteryStatusUpdateAlertElement = de.query(By.css('.solar-details-battery-update-error'));
                    expect(batteryStatusUpdateAlertElement).not.toBeNull('Battery Details Update alert should be visible');
                    expect(batteryStatusUpdateAlertElement.nativeElement.attributes['alertType'].textContent).toBe('error');
                }));
        });

    describe('When Battery Update Error state is set to false',
        () => {
            it('Should display Battery Update Error Alert',
                async(() => {
                    let solarCheckService = fixture.debugElement.injector.get(ISolarCheckService);

                    let solarCheckContractResponse = new SolarCheckContractResponse();
                    spyOn(solarCheckService, 'getContract').and.returnValue(Observable.of(solarCheckContractResponse));

                    let preferences = { marketingComms: true, statusChangeComms: true };
                    spyOn(solarCheckService, 'getPreferences').and.returnValue(Observable.of(preferences));

                    // ARRANGE
                    comp.hasBatteryUpdateErrorOccurred = false;

                    // ACT
                    fixture.detectChanges();

                    // ASSERT
                    let batteryStatusUpdateAlertElement = de.query(By.css('.solar-details-battery-update-error'));
                    expect(batteryStatusUpdateAlertElement).toBeNull('Battery Details Update alert should be visible');
                }));
        });
});
