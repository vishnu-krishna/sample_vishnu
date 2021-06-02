import { TestBed } from '@angular/core/testing';
import { BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { Observable } from 'rxjs/Observable';
import { SolarCheckContractResponse } from '../../shared/model/solar/solarCheckContract.model';
import { SolarCheckEligibilityContract, SolarCheckEligiblity } from '../../shared/model/solar/solarCheckEligibility.model';
import { SolarCheckRegistrationStatusType } from '../../shared/model/solar/solarCheckRegistrationStatus.model';
import { SolarCheckSolarDetailsUpdateType } from '../../shared/model/solar/solarCheckSolarDetails.model';
import { SolarCheckStatusResponse } from '../../shared/model/solar/solarCheckStatusResponse.model';
import { SolarCheckService } from '../services/solarCheck.service';
import { ISolarCheckService } from './contract/isolarCheck.service';

describe('Solar Check Offer Component', () => {
    let service: SolarCheckService;
    beforeEach(() => {

        let solarCheckService: ISolarCheckService = {
            isEligible(): Observable<SolarCheckEligiblity> {
                return Observable.from(
                    [new SolarCheckEligiblity()]
                );
            },
            refreshEligibility(): Observable<SolarCheckEligiblity> {
                return Observable.from(
                    [new SolarCheckEligiblity()]
                );
            },
            getStatus(): Observable<SolarCheckStatusResponse> {
                return Observable.from(
                    [new SolarCheckStatusResponse()]
                );
            },
            setHasBattery(contractNumber: string, hasBattery: boolean): Observable<boolean> {
                return Observable.from(
                    [true]
                );
            },
            register(): Observable<boolean> {
                return Observable.from(
                    [true]
                );
            },
            getContract(contractNumber: string): Observable<SolarCheckContractResponse> {
                return Observable.from(
                    [new SolarCheckContractResponse()]
                );
            },
            setPVInfo(contractNumber: string, pvInfo: SolarCheckSolarDetailsUpdateType): Observable<any> {

                return Observable.from(
                    [new SolarCheckSolarDetailsUpdateType()]
                );
            },
            deregister(contractNumber: string): Observable<boolean> {
                return Observable.from(
                    [true]
                );
            },
            getPreferences(): Observable<any> {
                return Observable.from(
                    [{}]
                );
            },
            setMonthlyComms(): Observable<any> {
                return Observable.from(
                    [{}]
                );
            },
            setStatusChangeComms(): Observable<any> {
                return Observable.from(
                    [{}]
                );
            }
        };
        TestBed.configureTestingModule({
            providers: [
                { provide: ISolarCheckService, useValue: solarCheckService },
                { provide: MATERIAL_SANITY_CHECKS, useValue: false },
                { provide: MockBackend, useClass: MockBackend },
                { provide: BaseRequestOptions, useClass: BaseRequestOptions }
            ]
        });
        // passing null as we will be mocking the service itself any ways
        service = new SolarCheckService(null);
    });

    let solarCheckEligible = {
        eligible: true,
        contracts: [
            {
                contractNumber: 12345,
                eligible: true,
                registrationStatus: SolarCheckRegistrationStatusType.NotRegistered
            },
            {
                contractNumber: 123456,
                eligible: false,
                registrationStatus: SolarCheckRegistrationStatusType.NotRegistered
            }
        ]
    };

    let solarCheckNotEligible = {
        eligible: false,
        contracts: [
            {
                contractNumber: 12345,
                eligible: false,
                registrationStatus: SolarCheckRegistrationStatusType.NotRegistered
            },
            {
                contractNumber: 123456,
                eligible: false,
                registrationStatus: SolarCheckRegistrationStatusType.NotRegistered
            }
        ]
    };

    let solarCheckContract = {
        contractNumber: '67890',
        hasBattery: true,
        registrationDateTime: '2017-08-07T05:11:25.241Z',
        registrationStatus: SolarCheckRegistrationStatusType.Registered,
        systemSizeKw: 1.4,
        numberPanels: 5,
        installationYear: 2000,
        solarAnalyticsSiteId: '124531'
    };

    let solarCheckSetContract = {
        status: 204,
        body: {}
    };

    let solarCheckSetContractUnauthorised = {
        status: 404,
        body: {}
    };

    it('Customer is eligible for solar health check', () => {
        spyOn(service, 'isEligible').and.returnValue(Observable.of(solarCheckEligible));
        service.isEligible().subscribe((result) => {
            expect(result.eligible).toBe(true);
            let isRegistered = result.contracts.some((x) => IsRegisteredContract(x) === true);
            expect(isRegistered).toBe(false);
        });
    });

    it('Customer is not eligible for solar health check', () => {
        spyOn(service, 'isEligible').and.returnValue(Observable.of(solarCheckNotEligible));
        service.isEligible().subscribe((result) => {
            expect(result.eligible).toBe(false);
            let isRegistered = result.contracts.some((x) => IsRegisteredContract(x) === true);
            expect(isRegistered).toBe(false);
        });
    });

    it('Customer get pv information ', () => {
        let contractNumber: string;
        spyOn(service, 'getContract').and.returnValue(Observable.of(solarCheckContract));
        service.getContract(contractNumber).subscribe((result) => {
            expect(result.numberPanels).not.toBe(null);
            expect(result.hasBattery).not.toBe(null);
            expect(result.installationYear).not.toBe(null);
            expect(result.systemSizeKw).not.toBe(null);
        });
    });

    it('Customer update pv information ', () => {
        let contractNumber: string;
        let pvInfo: SolarCheckSolarDetailsUpdateType;
        spyOn(service, 'setPVInfo').and.returnValue(Observable.of(solarCheckSetContract));
        service.setPVInfo(contractNumber, pvInfo).subscribe((result) => {
            expect(result).not.toBeNull();
        });
    });

    it('Customer update pv information - not found ', () => {
        let contractNumber: string;
        let pvInfo: SolarCheckSolarDetailsUpdateType;
        spyOn(service, 'setPVInfo').and.returnValue(Observable.of(solarCheckSetContractUnauthorised));
        service.setPVInfo(contractNumber, pvInfo).subscribe((result) => {
            expect(result).not.toBeNull();
        });
    });

    function IsRegisteredContract(contract: SolarCheckEligibilityContract): boolean {
        return contract &&
            contract.registrationStatus &&
            (contract.registrationStatus === SolarCheckRegistrationStatusType.Registered ||
                contract.registrationStatus === SolarCheckRegistrationStatusType.RegistrationPending);
    }
});
