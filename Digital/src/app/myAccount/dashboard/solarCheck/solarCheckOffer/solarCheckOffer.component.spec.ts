import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MyAccountMaterialModule } from '../../../modules/my-account.material.module';

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

// Test Subject
import { SolarCheckMessageComponent } from './solarCheckMessage/solarCheckMessage.component';
import { SolarCheckOfferComponent } from './solarCheckOffer.component';

import { LoadingComponent } from '../../../../shared/loaders/loading.component';
import { SolarCheckEligibilityContract, SolarCheckEligiblity } from '../../../../shared/model/solar/solarCheckEligibility.model';
import { SolarCheckRegistrationStatusType } from '../../../../shared/model/solar/solarCheckRegistrationStatus.model';
import { DataLayerService } from '../../../../shared/service/dataLayer.service';
import { ModalService } from '../../../modal/modal.service';
import { AccountViewModel, ContractViewModel } from '../../../services/account.service';
import { ISolarCheckService } from '../../../services/contract/isolarCheck.service';
import { LocalStorageService } from '../../../services/localStorage.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Solar Check Offer Component tests', () => {
    let comp: SolarCheckOfferComponent;
    let fixture: ComponentFixture<SolarCheckOfferComponent>;
    let de: DebugElement;

    let dummySolarCheckService = {
        isEligible: (): Observable<SolarCheckEligiblity> => {
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

    let dummyDataLayerService = {
        pushSccBannerOfferDisplayed: () => {
            return;
        },
        pushSccBannerOfferDismissed: () => {
            return;
        }
    };

    let localStorageService = {
        // tslint:disable-next-line:no-empty
        addKey: (key: string): any => { },
        getKeys: (): any => {
            return null;
        }
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                SolarCheckOfferComponent,
                SolarCheckMessageComponent,
                LoadingComponent],
            imports: [
                MyAccountMaterialModule,
                HttpClientTestingModule,
            ],
            providers: [
                { provide: ISolarCheckService, useValue: dummySolarCheckService },
                { provide: ModalService, useValue: dummyModalService },
                { provide: LocalStorageService, useValue: localStorageService },
                { provide: MATERIAL_SANITY_CHECKS, useValue: false },
                { provide: DataLayerService, useValue: dummyDataLayerService },
            ]
        });

        fixture = TestBed.createComponent(SolarCheckOfferComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
    });

    it('Customer has solar, customer eligible and not registered', () => {

        let contract = new ContractViewModel('123456789');
        contract.hasSolar = true;
        contract.solarCheckRegistered = false;

        let contract2 = new ContractViewModel('1234567890');
        contract2.hasSolar = false;
        contract2.solarCheckRegistered = false;

        let contracts = [contract, contract2];
        let accounts = [new AccountViewModel('123123', contracts)];

        comp.accounts = accounts;
        let solarContract = new SolarCheckEligibilityContract();
        solarContract.eligible = true;
        solarContract.registrationStatus = SolarCheckRegistrationStatusType.NotRegistered;

        let response = new SolarCheckEligiblity();
        response.eligible = true;
        response.contracts = [solarContract];

        let solarCheckService = fixture.debugElement.injector.get(ISolarCheckService);
        spyOn(solarCheckService, 'isEligible').and.returnValue(Observable.of(response));
        // ACT
        // Cause ngOnInit to run in the test subject component and the template to be rendered once
        fixture.detectChanges();

        let offerElement = de.query(By.css('.solar-check-offer'));
        expect(offerElement).not.toBeNull('offerElement');
    });

    it('Customer has solar for both contract, customer eligible and not registered', () => {

        let contract = new ContractViewModel('123456789');
        contract.hasSolar = true;
        contract.solarCheckRegistered = false;

        let contract2 = new ContractViewModel('1234567890');
        contract2.hasSolar = true;
        contract2.solarCheckRegistered = false;

        let contracts = [contract, contract2];
        let accounts = [new AccountViewModel('123123', contracts)];

        comp.accounts = accounts;

        let solarContract = new SolarCheckEligibilityContract();
        solarContract.eligible = true;
        solarContract.registrationStatus = SolarCheckRegistrationStatusType.NotRegistered;

        let response = new SolarCheckEligiblity();
        response.eligible = true;
        response.contracts = [solarContract];

        let solarCheckService = fixture.debugElement.injector.get(ISolarCheckService);
        spyOn(solarCheckService, 'isEligible').and.returnValue(Observable.of(response));
        // ACT
        // Cause ngOnInit to run in the test subject component and the template to be rendered once
        fixture.detectChanges();

        let offerElement = de.query(By.css('.solar-check-offer'));
        expect(offerElement).not.toBeNull('offerElement');
    });

    it('Customer has solar for contract 2, customer eligible and not registered', () => {

        let contract = new ContractViewModel('123456789');
        contract.hasSolar = false;
        contract.solarCheckRegistered = false;

        let contract2 = new ContractViewModel('1234567890');
        contract2.hasSolar = true;
        contract2.solarCheckRegistered = false;

        let contracts = [contract, contract2];
        let accounts = [new AccountViewModel('123123', contracts)];

        comp.accounts = accounts;

        let solarContract = new SolarCheckEligibilityContract();
        solarContract.eligible = true;
        solarContract.registrationStatus = SolarCheckRegistrationStatusType.NotRegistered;

        let response = new SolarCheckEligiblity();
        response.eligible = true;
        response.contracts = [solarContract];

        let solarCheckService = fixture.debugElement.injector.get(ISolarCheckService);
        spyOn(solarCheckService, 'isEligible').and.returnValue(Observable.of(response));
        // ACT
        // Cause ngOnInit to run in the test subject component and the template to be rendered once
        fixture.detectChanges();

        let offerElement = de.query(By.css('.solar-check-offer'));
        expect(offerElement).not.toBeNull('offerElement');
    });

    it('Customer dont have solar, customer eligible and not registered', () => {

        let contract = new ContractViewModel('123456789');
        contract.hasSolar = false;
        contract.solarCheckRegistered = false;

        let contract2 = new ContractViewModel('1234567890');
        contract2.hasSolar = false;
        contract2.solarCheckRegistered = false;

        let contracts = [contract, contract2];
        let accounts = [new AccountViewModel('123123', contracts)];

        comp.accounts = accounts;

        let solarContract = new SolarCheckEligibilityContract();
        solarContract.eligible = true;
        solarContract.registrationStatus = SolarCheckRegistrationStatusType.NotRegistered;

        let response = new SolarCheckEligiblity();
        response.eligible = true;
        response.contracts = [solarContract];

        let solarCheckService = fixture.debugElement.injector.get(ISolarCheckService);
        spyOn(solarCheckService, 'isEligible').and.returnValue(Observable.of(response));
        // ACT
        // Cause ngOnInit to run in the test subject component and the template to be rendered once
        fixture.detectChanges();

        let offerElement = de.query(By.css('.solar-check-offer'));
        expect(offerElement).toBeNull('offerElement');
    });

    it('Customer has solar, Customer eligible and already registered', () => {
        let contract = new ContractViewModel('123456789');
        contract.hasSolar = true;
        contract.solarCheckRegistered = false;

        let contract2 = new ContractViewModel('1234567890');
        contract2.hasSolar = false;
        contract2.solarCheckRegistered = false;

        let contracts = [contract, contract2];
        let accounts = [new AccountViewModel('123123', contracts)];

        comp.accounts = accounts;

        let response = new SolarCheckEligiblity();
        response.eligible = true;
        response.contracts = [{ contractNumber: 'testContract', eligible: true, registrationStatus: SolarCheckRegistrationStatusType.Registered }];
        let solarCheckService = fixture.debugElement.injector.get(ISolarCheckService);
        spyOn(solarCheckService, 'isEligible').and.returnValue(Observable.of(response));
        // ACT
        // Cause ngOnInit to run in the test subject component and the template to be rendered once
        fixture.detectChanges();

        let offerElement = de.query(By.css('.solar-check-offer'));
        expect(offerElement).toBeNull('offerElement');
    });

    it('Customer not eligible and not registered', () => {
        let contract = new ContractViewModel('123456789');
        contract.hasSolar = true;
        contract.solarCheckRegistered = false;

        let contract2 = new ContractViewModel('1234567890');
        contract2.hasSolar = false;
        contract2.solarCheckRegistered = false;

        let contracts = [contract, contract2];
        let accounts = [new AccountViewModel('123123', contracts)];

        comp.accounts = accounts;

        let response = new SolarCheckEligiblity();
        response.eligible = false;
        response.contracts = [{ contractNumber: 'testContract', eligible: false, registrationStatus: SolarCheckRegistrationStatusType.NotRegistered }];
        let solarCheckService = fixture.debugElement.injector.get(ISolarCheckService);
        spyOn(solarCheckService, 'isEligible').and.returnValue(Observable.of(response));
        // ACT
        // Cause ngOnInit to run in the test subject component and the template to be rendered once
        fixture.detectChanges();

        let offerElement = de.query(By.css('.solar-check-offer'));
        expect(offerElement).toBeNull('offerElement');
    });

    it('Customer dont have Solar, not eligible and not registered', () => {
        let contract = new ContractViewModel('123456789');
        contract.hasSolar = false;
        contract.solarCheckRegistered = false;

        let contract2 = new ContractViewModel('1234567890');
        contract2.hasSolar = false;
        contract2.solarCheckRegistered = false;

        let contracts = [contract, contract2];
        let accounts = [new AccountViewModel('123123', contracts)];

        comp.accounts = accounts;

        let response = new SolarCheckEligiblity();
        response.eligible = false;
        response.contracts = [{ contractNumber: 'testContract', registrationStatus: SolarCheckRegistrationStatusType.NotRegistered, eligible: false }];
        let solarCheckService = fixture.debugElement.injector.get(ISolarCheckService);
        spyOn(solarCheckService, 'isEligible').and.returnValue(Observable.of(response));
        // ACT
        // Cause ngOnInit to run in the test subject component and the template to be rendered once
        fixture.detectChanges();

        let offerElement = de.query(By.css('.solar-check-offer'));
        expect(offerElement).toBeNull('offerElement');
    });

    it('Customer not eligible but already registered', () => {
        let contract = new ContractViewModel('123456789');
        contract.hasSolar = true;
        contract.solarCheckRegistered = false;

        let contract2 = new ContractViewModel('1234567890');
        contract2.hasSolar = false;
        contract2.solarCheckRegistered = false;

        let contracts = [contract, contract2];
        let accounts = [new AccountViewModel('123123', contracts)];

        comp.accounts = accounts;

        let response = new SolarCheckEligiblity();
        response.eligible = false;
        response.contracts = [{ contractNumber: 'testContract', registrationStatus: SolarCheckRegistrationStatusType.Registered, eligible: false }];
        let solarCheckService = fixture.debugElement.injector.get(ISolarCheckService);
        spyOn(solarCheckService, 'isEligible').and.returnValue(Observable.of(response));
        // ACT
        // Cause ngOnInit to run in the test subject component and the template to be rendered once
        fixture.detectChanges();

        let offerElement = de.query(By.css('.solar-check-offer'));
        expect(offerElement).toBeNull('offerElement');
     });

    it('Customer eligible and where Request Status equals Deregistration Pending then expects banner to not be displayed', () => {
         let contract = new ContractViewModel('123456789');
         contract.hasSolar = true;
         contract.solarCheckRegistered = false;

         let contract2 = new ContractViewModel('1234567890');
         contract2.hasSolar = false;
         contract2.solarCheckRegistered = false;

         let contracts = [contract, contract2];
         let accounts = [new AccountViewModel('123123', contracts)];

         comp.accounts = accounts;

         let response = new SolarCheckEligiblity();
         response.eligible = true;
         response.contracts = [{ contractNumber: 'testContract', registrationStatus: SolarCheckRegistrationStatusType.DeregistrationPending, eligible: false }];
         let solarCheckService = fixture.debugElement.injector.get(ISolarCheckService);
         spyOn(solarCheckService, 'isEligible').and.returnValue(Observable.of(response));
         // ACT
         // Cause ngOnInit to run in the test subject component and the template to be rendered once
         fixture.detectChanges();

         let offerElement = de.query(By.css('.solar-check-offer'));
         expect(offerElement).toBeNull('offerElement');
     });

    it('Customer eligible and where Request Status equals Deregistered then expects banner not to be displayed', () => {
         let contract = new ContractViewModel('123456789');
         contract.hasSolar = true;
         contract.solarCheckRegistered = false;

         let contract2 = new ContractViewModel('1234567890');
         contract2.hasSolar = false;
         contract2.solarCheckRegistered = false;

         let contracts = [contract, contract2];
         let accounts = [new AccountViewModel('123123', contracts)];

         comp.accounts = accounts;

         let response = new SolarCheckEligiblity();
         response.eligible = true;
         response.contracts = [{ contractNumber: 'testContract', registrationStatus: SolarCheckRegistrationStatusType.Deregistered, eligible: false }];
         let solarCheckService = fixture.debugElement.injector.get(ISolarCheckService);
         spyOn(solarCheckService, 'isEligible').and.returnValue(Observable.of(response));
         // ACT
         // Cause ngOnInit to run in the test subject component and the template to be rendered once
         fixture.detectChanges();

         let offerElement = de.query(By.css('.solar-check-offer'));
         expect(offerElement).toBeNull('offerElement');
     });

});
