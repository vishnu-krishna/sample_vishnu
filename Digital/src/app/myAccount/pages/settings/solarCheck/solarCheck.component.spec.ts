import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MyAccountMaterialModule } from '../../../modules/my-account.material.module';

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

// Test Subject
import { SolarCheckComponent } from './solarCheck.component';
import { SolarCheckSystemDetailsComponent } from './systemDetails/solarCheckSystemDetails.component';

import { AlertComponent } from '../../../../shared/component/alert/alert.component';
import { YesNoSwitchComponent } from '../../../../shared/component/yesNoSwitch/yesNoSwitch.component';
import { LoadingComponent } from '../../../../shared/loaders/loading.component';
import { SolarCheckContractResponse } from '../../../../shared/model/solar/solarCheckContract.model';
import { SolarCheckEligibilityContract, SolarCheckEligiblity } from '../../../../shared/model/solar/solarCheckEligibility.model';
import { SolarCheckRegistrationStatusType } from '../../../../shared/model/solar/solarCheckRegistrationStatus.model';
import { IMessageBusService } from '../../../../shared/service/contract/imessageBus.service';
import { DataLayerService } from '../../../../shared/service/dataLayer.service';
import { ModalService } from '../../../modal/modal.service';
import { ISolarCheckService } from '../../../services/contract/isolarCheck.service';
import { LocalStorageService } from '../../../services/localStorage.service';

describe('solar settings: solar check component tests', () => {
    let comp: SolarCheckComponent;
    let fixture: ComponentFixture<SolarCheckComponent>;
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
                SolarCheckComponent,
                SolarCheckSystemDetailsComponent,
                AlertComponent,
                LoadingComponent,
                YesNoSwitchComponent
            ],
            imports: [
                MyAccountMaterialModule
            ],
            providers: [
                { provide: ISolarCheckService, useValue: dummySolarCheckService },
                { provide: ModalService, useValue: dummyModalService },
                { provide: LocalStorageService, useValue: localStorageService },
                { provide: IMessageBusService, useValue: messageBusService },
                { provide: MATERIAL_SANITY_CHECKS, useValue: false },
                { provide: DataLayerService, useValue: dummyDataLayerService }
            ]
        });
        fixture = TestBed.createComponent(SolarCheckComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
    });

    it('for a registered customer show the system details', () => {
        let solarContract = new SolarCheckEligibilityContract();
        solarContract.eligible = true;
        solarContract.registrationStatus = SolarCheckRegistrationStatusType.Registered;
        solarContract.contractNumber = '123456';

        let response = new SolarCheckEligiblity();
        response.eligible = true;
        response.contracts = [solarContract];

        let solarCheckService = fixture.debugElement.injector.get(ISolarCheckService);
        spyOn(solarCheckService, 'isEligible').and.returnValue(Observable.of(response));

        let solarCheckContractResponse = new SolarCheckContractResponse();
        solarCheckContractResponse.contractNumber = '123456';
        solarCheckContractResponse.hasBattery = false;
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
    });
    it('for a registered customer show the deregister button', () => {
        let solarContract = new SolarCheckEligibilityContract();
        solarContract.eligible = true;
        solarContract.registrationStatus = SolarCheckRegistrationStatusType.Registered;
        solarContract.contractNumber = '123456';

        let response = new SolarCheckEligiblity();
        response.eligible = true;
        response.contracts = [solarContract];

        let solarCheckService = fixture.debugElement.injector.get(ISolarCheckService);
        spyOn(solarCheckService, 'isEligible').and.returnValue(Observable.of(response));

        let solarCheckContractResponse = new SolarCheckContractResponse();
        solarCheckContractResponse.contractNumber = '123456';
        solarCheckContractResponse.hasBattery = false;
        solarCheckContractResponse.installationYear = 1999;
        solarCheckContractResponse.numberPanels = 10;
        solarCheckContractResponse.systemSizeKw = 12;
        spyOn(solarCheckService, 'getContract').and.returnValue(Observable.of(solarCheckContractResponse));

        let preferences = { marketingComms: true, statusChangeComms: true };
        spyOn(solarCheckService, 'getPreferences').and.returnValue(Observable.of(preferences));
        // ACT
        // Cause ngOnInit to run in the test subject component and the template to be rendered once
        fixture.detectChanges();

        let deregisterButtonElement = de.query(By.css('.deregister-button'));
        expect(deregisterButtonElement).not.toBeNull('deregisterButtonElement');
    });

    it('for an un-registered customer do not show the system details', () => {
        let solarContract = new SolarCheckEligibilityContract();
        solarContract.eligible = true;
        solarContract.registrationStatus = SolarCheckRegistrationStatusType.NotRegistered;
        solarContract.contractNumber = '123456';

        let response = new SolarCheckEligiblity();
        response.eligible = true;
        response.contracts = [solarContract];

        let solarCheckService = fixture.debugElement.injector.get(ISolarCheckService);
        spyOn(solarCheckService, 'isEligible').and.returnValue(Observable.of(response));

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
        expect(systemDetailsElement).toBeNull('systemDetailsElement');
    });

    it('for a not yet registered and eligible customer should show the sign up button', () => {
        let solarContract = new SolarCheckEligibilityContract();
        solarContract.eligible = true;
        solarContract.registrationStatus = SolarCheckRegistrationStatusType.NotRegistered;
        solarContract.contractNumber = '123456';

        let response = new SolarCheckEligiblity();
        response.eligible = true;
        response.contracts = [solarContract];

        let solarCheckService = fixture.debugElement.injector.get(ISolarCheckService);
        spyOn(solarCheckService, 'isEligible').and.returnValue(Observable.of(response));

        // ACT
        // Cause ngOnInit to run in the test subject component and the template to be rendered once
        fixture.detectChanges();

        let signupButtonElement = de.query(By.css('.register-button'));
        expect(signupButtonElement).not.toBeNull('signupButtonElement');
    });

    it('for a customer who is not eligible and not registered should not see sign up button nor system details', () => {
        let solarContract = new SolarCheckEligibilityContract();
        solarContract.eligible = false;
        solarContract.registrationStatus = SolarCheckRegistrationStatusType.NotRegistered;
        solarContract.contractNumber = '123456';

        let response = new SolarCheckEligiblity();
        response.eligible = false;
        response.contracts = [solarContract];

        let solarCheckService = fixture.debugElement.injector.get(ISolarCheckService);
        spyOn(solarCheckService, 'isEligible').and.returnValue(Observable.of(response));

        // ACT
        // Cause ngOnInit to run in the test subject component and the template to be rendered once
        fixture.detectChanges();

        let signupButtonElement = de.query(By.css('.register-button'));
        expect(signupButtonElement).toBeNull('signupButtonElement');

        let systemDetailsElement = de.query(By.css('.settings-system-details'));
        expect(systemDetailsElement).toBeNull('systemDetailsElement');
    });

    it('for a customer who is registered and in a state of DeregistrationPending should see Deregistration message only', () => {
        let solarContract = new SolarCheckEligibilityContract();
        solarContract.eligible = true;
        solarContract.registrationStatus = SolarCheckRegistrationStatusType.DeregistrationPending;
        solarContract.contractNumber = '123456';

        let response = new SolarCheckEligiblity();
        response.eligible = false;
        response.contracts = [solarContract];

        let solarCheckService = fixture.debugElement.injector.get(ISolarCheckService);
        spyOn(solarCheckService, 'isEligible').and.returnValue(Observable.of(response));

        // ACT
        // Cause ngOnInit to run in the test subject component and the template to be rendered once
        fixture.detectChanges();

        let deregisteringMessageElement = de.query(By.css('.deregister-status'));
        expect(deregisteringMessageElement).not.toBeNull('deregisteringMessageElement');

        let signupButtonElement = de.query(By.css('.register-button'));
        expect(signupButtonElement).toBeNull('signupButtonElement');

        let systemDetailsElement = de.query(By.css('.settings-system-details'));
        expect(systemDetailsElement).toBeNull('systemDetailsElement');
    });

    it('for a customer who has a request status of Deregistered and who isEligible, should show the sign up only', () => {
        let solarContract = new SolarCheckEligibilityContract();
        solarContract.eligible = true;
        solarContract.registrationStatus = SolarCheckRegistrationStatusType.Deregistered;
        solarContract.contractNumber = '123456';

        let response = new SolarCheckEligiblity();
        response.eligible = false;
        response.contracts = [solarContract];

        let solarCheckService = fixture.debugElement.injector.get(ISolarCheckService);
        spyOn(solarCheckService, 'isEligible').and.returnValue(Observable.of(response));

        // ACT
        // Cause ngOnInit to run in the test subject component and the template to be rendered once
        fixture.detectChanges();

        let signupButtonElement = de.query(By.css('.register-button'));
        expect(signupButtonElement).not.toBeNull('signupButtonElement');

        let deregisteringMessageElement = de.query(By.css('.deregister-status'));
        expect(deregisteringMessageElement).toBeNull('deregisteringMessageElement');

        let systemDetailsElement = de.query(By.css('.settings-system-details'));
        expect(systemDetailsElement).toBeNull('systemDetailsElement');
    });
});
