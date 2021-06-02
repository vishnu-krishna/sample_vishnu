import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { By } from '@angular/platform-browser';
import { MyAccountMaterialModule } from '../../modules/my-account.material.module';

import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { SolarCheckEligibilityContract, SolarCheckEligiblity } from '../../../shared/model/solar/solarCheckEligibility.model';
import { SolarCheckRegistrationStatusType } from '../../../shared/model/solar/solarCheckRegistrationStatus.model';
import { AccountViewModel } from '../../services/account.service';
import { ContractViewModel } from '../../services/account.service';
import { ISolarCheckService } from '../../services/contract/isolarCheck.service';
import { ISsmrService } from '../../services/contract/issmr.service';
import { LocalStorageService } from '../../services/localStorage.service';
import { SsmrMockService } from '../../services/mock/ssmr.mock.service';
import { SelfServiceMeterReadBannerComponent } from './selfServiceMeterReadBanner.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Dashboard - Self Service Meter Read Banner', () => {
    let comp: SelfServiceMeterReadBannerComponent;
    let fixture: ComponentFixture<SelfServiceMeterReadBannerComponent>;
    let de: DebugElement;

    beforeEach(() => {
        let dummySolarCheckService = {
            isEligible: (): Observable<SolarCheckEligiblity> => {
                throw new Error('isEligible has not been mocked properly.');
            }
        };
        let localStorageService = {
            // tslint:disable-next-line:no-empty
            addKey: (key: string): any => { },
            getKeys: (): any => {
                return null;
            }
        };
        TestBed.configureTestingModule({
            declarations: [
                SelfServiceMeterReadBannerComponent
            ],
            imports: [
                MyAccountMaterialModule,
                HttpModule,
                RouterTestingModule,
                HttpClientTestingModule,
            ],
            providers: [
                { provide: ISsmrService, useClass: SsmrMockService },
                { provide: ISolarCheckService, useValue: dummySolarCheckService },
                { provide: MATERIAL_SANITY_CHECKS, useValue: false },
                { provide: LocalStorageService, useValue: localStorageService }
            ]
        });

        fixture = TestBed.createComponent(SelfServiceMeterReadBannerComponent);
        comp = fixture.componentInstance;
        sessionStorage.clear();
    });

    it('should not show SSMR banner when customer has Solar and eligible for solar as well', () => {
        // Arrange

        let contract = new ContractViewModel('123456789');
        contract.hasSolar = true;
        contract.solarCheckRegistered = false;

        let contract2 = new ContractViewModel('1234567890');
        contract2.hasSolar = false;
        contract2.solarCheckRegistered = false;

        let contracts = [contract, contract2];
        let accounts = [new AccountViewModel('123123', contracts)];

        comp.accounts = accounts;

        de = fixture.debugElement;

        let service = de.injector.get(ISsmrService);
        service.hasElecBasicMeter = true;
        spyOn(service, 'checkForBasicMeterByFuelType').and.returnValue(true);

        let response = new SolarCheckEligiblity();
        response.eligible = true;
        let solarContract = new SolarCheckEligibilityContract();
        solarContract.eligible = true;
        solarContract.registrationStatus = SolarCheckRegistrationStatusType.NotRegistered;
        response.contracts = [solarContract];

        let solarCheckService = fixture.debugElement.injector.get(ISolarCheckService);
        spyOn(solarCheckService, 'isEligible').and.returnValue(Observable.of(response));

        // Act
        fixture.detectChanges();
        // Assert
        let ssmrBannerComp = de.query(By.css('.ssmr-banner'));
        expect(ssmrBannerComp === null).toBeTruthy('SSMR Banner should not be displayed');
    });

    it('should show SSMR banner when customer has Solar but is not eligible for solar registeration', () => {
        // Arrange

        let contract = new ContractViewModel('123456789');
        contract.hasSolar = true;
        contract.solarCheckRegistered = false;

        let contract2 = new ContractViewModel('1234567890');
        contract2.hasSolar = false;
        contract2.solarCheckRegistered = false;

        let contracts = [contract, contract2];
        let accounts = [new AccountViewModel('123123', contracts)];

        comp.accounts = accounts;

        de = fixture.debugElement;

        let service = de.injector.get(ISsmrService);
        service.hasElecBasicMeter = true;
        spyOn(service, 'checkForBasicMeterByFuelType').and.returnValue(true);

        let response = new SolarCheckEligiblity();
        response.eligible = false;
        let solarContract = new SolarCheckEligibilityContract();
        solarContract.eligible = false;
        solarContract.registrationStatus = SolarCheckRegistrationStatusType.NotRegistered;
        response.contracts = [solarContract];

        let solarCheckService = fixture.debugElement.injector.get(ISolarCheckService);
        spyOn(solarCheckService, 'isEligible').and.returnValue(Observable.of(response));

        // Act
        fixture.detectChanges();
        // Assert
        let ssmrBannerComp = de.query(By.css('.ssmr-banner'));
        expect(ssmrBannerComp !== null).toBeTruthy('SSMR Banner component should be present');
    });

    it('should not show SSMR banner when customer has Solar for both contract', () => {
        // Arrange
        let contract = new ContractViewModel('123456789');
        contract.hasSolar = true;
        contract.solarCheckRegistered = false;

        let contract2 = new ContractViewModel('1234567890');
        contract2.hasSolar = true;
        contract2.solarCheckRegistered = false;

        let contracts = [contract, contract2];
        let accounts = [new AccountViewModel('123123', contracts)];

        comp.accounts = accounts;

        de = fixture.debugElement;
        let service = de.injector.get(ISsmrService);
        service.hasElecBasicMeter = true;
        spyOn(service, 'checkForBasicMeterByFuelType').and.returnValue(true);

        let response = new SolarCheckEligiblity();
        response.eligible = true;
        let solarContract = new SolarCheckEligibilityContract();
        solarContract.eligible = true;
        solarContract.registrationStatus = SolarCheckRegistrationStatusType.NotRegistered;
        response.contracts = [solarContract];

        let solarCheckService = fixture.debugElement.injector.get(ISolarCheckService);
        spyOn(solarCheckService, 'isEligible').and.returnValue(Observable.of(response));
        // Act
        fixture.detectChanges();
        // Assert
        let ssmrBannerComp = de.query(By.css('.ssmr-banner'));
        expect(ssmrBannerComp === null).toBeTruthy('SSMR Banner component is not present');
    });

    it('should show SSMR banner when customer has Solar and already registered', () => {
        // Arrange
        let contract = new ContractViewModel('123456789');
        contract.hasSolar = true;

        let contract2 = new ContractViewModel('1234567890');
        contract2.hasSolar = true;

        let contracts = [contract, contract2];
        let accounts = [new AccountViewModel('123123', contracts)];

        comp.accounts = accounts;

        de = fixture.debugElement;
        let service = de.injector.get(ISsmrService);
        service.hasElecBasicMeter = true;
        spyOn(service, 'checkForBasicMeterByFuelType').and.returnValue(true);

        let response = new SolarCheckEligiblity();
        response.eligible = true;
        let solarContract = new SolarCheckEligibilityContract();
        solarContract.eligible = true;
        solarContract.registrationStatus = SolarCheckRegistrationStatusType.Registered;
        response.contracts = [solarContract];

        let solarCheckService = fixture.debugElement.injector.get(ISolarCheckService);
        spyOn(solarCheckService, 'isEligible').and.returnValue(Observable.of(response));
        // Act
        fixture.detectChanges();
        // Assert
        let ssmrBannerComp = de.query(By.css('.ssmr-banner'));
        expect(ssmrBannerComp !== null).toBeTruthy('SSMR Banner component is present');
    });

    it('should show SSMR banner when customer has Solar and already closed Solar Check offer banner ',
        () => {
            // Arrange
            let accountIdUnderTest: string = '123123';

            let contract = new ContractViewModel('123456789');
            contract.hasSolar = true;

            let contract2 = new ContractViewModel('1234567890');
            contract2.hasSolar = true;

            let contracts = [contract, contract2];
            let accounts = [new AccountViewModel(accountIdUnderTest, contracts)];

            comp.accounts = accounts;

            de = fixture.debugElement;
            let service = de.injector.get(ISsmrService);
            service.hasElecBasicMeter = true;
            spyOn(service, 'checkForBasicMeterByFuelType').and.returnValue(true);

            de = fixture.debugElement;
            let localStorageService = de.injector.get(LocalStorageService);
            let localStorageJsonWhereSolarCheckOfferHasBeenDismissed = {
                // tslint:disable:object-literal-key-quotes
                'localAlertDismissables': {
                    'displaySolarCheckOffer': {
                        'node': { 'type': 1, 'hash': 360049386, 'key': accountIdUnderTest, 'value': true },
                        'size': 1
                    }
                }
            };

            spyOn(localStorageService, 'getKeys').and.returnValue(localStorageJsonWhereSolarCheckOfferHasBeenDismissed);

            // Act
            fixture.detectChanges();
            // Assert
            let ssmrBannerComp = de.query(By.css('.ssmr-banner'));
            expect(ssmrBannerComp !== null).toBeTruthy('SSMR Banner component is present');
    });

    it('should show SSMR banner when customer dont have Solar', () => {
        // Arrange
        let contract = new ContractViewModel('123456789');
        contract.hasSolar = false;
        contract.solarCheckRegistered = false;

        let contract2 = new ContractViewModel('1234567890');
        contract2.hasSolar = false;
        contract2.solarCheckRegistered = false;

        let contracts = [contract, contract2];
        let accounts = [new AccountViewModel('123123', contracts)];

        comp.accounts = accounts;

        de = fixture.debugElement;
        let service = de.injector.get(ISsmrService);
        service.hasElecBasicMeter = true;
        spyOn(service, 'checkForBasicMeterByFuelType').and.returnValue(true);
        // Act
        fixture.detectChanges();
        // Assert
        let ssmrBannerComp = de.query(By.css('.ssmr-banner'));
        expect(ssmrBannerComp !== null).toBeTruthy('SSMR Banner component is present');
    });

    it('should show SSMR banner when customer has Solar and already registered for 2nd contract', () => {
        // Arrange
        let contract = new ContractViewModel('123456789');
        contract.hasSolar = false;

        let contract2 = new ContractViewModel('1234567890');
        contract2.hasSolar = true;

        let contracts = [contract, contract2];
        let accounts = [new AccountViewModel('123123', contracts)];

        comp.accounts = accounts;

        de = fixture.debugElement;
        let service = de.injector.get(ISsmrService);
        service.hasElecBasicMeter = true;
        spyOn(service, 'checkForBasicMeterByFuelType').and.returnValue(true);

        let response = new SolarCheckEligiblity();
        response.eligible = true;
        let solarContract = new SolarCheckEligibilityContract();
        solarContract.eligible = false;
        solarContract.registrationStatus = SolarCheckRegistrationStatusType.NotRegistered;
        let solarContract2 = new SolarCheckEligibilityContract();
        solarContract2.eligible = true;
        solarContract2.registrationStatus = SolarCheckRegistrationStatusType.Registered;
        response.contracts = [solarContract, solarContract2];

        let solarCheckService = fixture.debugElement.injector.get(ISolarCheckService);
        spyOn(solarCheckService, 'isEligible').and.returnValue(Observable.of(response));
        // Act
        fixture.detectChanges();
        // Assert
        let ssmrBannerComp = de.query(By.css('.ssmr-banner'));
        expect(ssmrBannerComp !== null).toBeTruthy('SSMR Banner component is present');
    });

    it('should show SSMR banner when customer has Solar and already registered for both contract', () => {
        // Arrange
        let contract = new ContractViewModel('123456789');
        contract.hasSolar = true;
        contract.solarCheckRegistered = true;

        let contract2 = new ContractViewModel('1234567890');
        contract2.hasSolar = true;
        contract2.solarCheckRegistered = true;

        let contracts = [contract, contract2];
        let accounts = [new AccountViewModel('123123', contracts)];

        comp.accounts = accounts;

        de = fixture.debugElement;
        let service = de.injector.get(ISsmrService);
        service.hasElecBasicMeter = true;
        spyOn(service, 'checkForBasicMeterByFuelType').and.returnValue(true);

        let response = new SolarCheckEligiblity();
        response.eligible = true;
        let solarContract = new SolarCheckEligibilityContract();
        solarContract.eligible = true;
        solarContract.registrationStatus = SolarCheckRegistrationStatusType.Registered;

        let solarContract2 = new SolarCheckEligibilityContract();
        solarContract2.eligible = true;
        solarContract2.registrationStatus = SolarCheckRegistrationStatusType.Registered;
        response.contracts = [solarContract, solarContract2];

        let solarCheckService = fixture.debugElement.injector.get(ISolarCheckService);
        spyOn(solarCheckService, 'isEligible').and.returnValue(Observable.of(response));

        // Act
        fixture.detectChanges();
        // Assert
        let ssmrBannerComp = de.query(By.css('.ssmr-banner'));
        expect(ssmrBannerComp !== null).toBeTruthy('SSMR Banner component is present');
    });
});
