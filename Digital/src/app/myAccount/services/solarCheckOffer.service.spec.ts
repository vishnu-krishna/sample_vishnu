import { TestBed } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';

import { AccountViewModel, ContractViewModel, IAccountServiceMA } from '../../myAccount/services/account.service';
import { ISolarCheckService } from '../../myAccount/services/contract/isolarCheck.service';
import { FeatureFlagService } from '../../myAccount/services/featureFlag.service';
import { SolarCheckOfferService } from '../../myAccount/services/solarCheckOffer.service';
import { SolarCheckEligibilityContract, SolarCheckEligiblity } from '../../shared/model/solar/solarCheckEligibility.model';
import { SolarCheckRegistrationStatusType } from '../../shared/model/solar/solarCheckRegistrationStatus.model';

describe('SolarCheckOfferService', () => {
    let solarCheckServiceSpy: any;
    let accountServiceSpy: any;
    let featureFlagServiceSpy: any;

    beforeEach(() => {
        solarCheckServiceSpy = {
            isEligible: jasmine.createSpy('isEligible')
        };

        accountServiceSpy = {
            getAccounts: jasmine.createSpy('getAccounts')
        };

        featureFlagServiceSpy = {
            featureFlagged: jasmine.createSpy('featureFlagService')
        };

        TestBed.configureTestingModule({
            providers: [
                { provide: ISolarCheckService, useValue: solarCheckServiceSpy },
                { provide: IAccountServiceMA, useValue: accountServiceSpy },
                { provide: FeatureFlagService, useValue: featureFlagServiceSpy },
                SolarCheckOfferService
            ]
        });
    });

    it('should return eligible false when the feature is off', () => {
        // ARRANGE
        accountServiceSpy.getAccounts.and.returnValue(Observable.of<AccountViewModel[]>([]));
        solarCheckServiceSpy.isEligible.and.returnValue(Observable.of<SolarCheckEligiblity>(null));
        // ARRANGE THE FEATUREFLAGSERVICE SPY
        featureFlagServiceSpy.featureFlagged.and.returnValue(Observable.of<boolean>(false));
        // ACT
        let serviceInstance = TestBed.get(SolarCheckOfferService);
        // ASSERT
        serviceInstance.isEligible().subscribe((result: boolean) => {
            expect(result).toBeFalsy();
        });
    });

    it('should not call the solarCheckService when the SolarCheck feature flag is off', () => {
        // ARRANGE
        accountServiceSpy.getAccounts.and.returnValue(Observable.of<AccountViewModel[]>([]));
        solarCheckServiceSpy.isEligible.and.returnValue(Observable.of<SolarCheckEligiblity>(null));
        // ARRANGE THE FEATUREFLAGSERVICE SPY
        featureFlagServiceSpy.featureFlagged.and.returnValue(Observable.of<boolean>(false));
        // ACT
        let serviceInstance = TestBed.get(SolarCheckOfferService);
        // ASSERT
        serviceInstance.isEligible().subscribe((result: boolean) => {
            expect(solarCheckServiceSpy.isEligible).not.toHaveBeenCalled();
        });

    });

    it('should return eligible true when the feature is on and user is eligible', () => {
        // ARRANGE THE ACCOUNT SERVICE SPY
        let accountIsEligibleTestValue = true;
        let contractIsEligibleTestValue = true;

        let contracts = [
            new ContractViewModel('12341234', [])
        ];
        contracts[0].hasSolar = true;
        let accountViewModel = new AccountViewModel('12345678', contracts);
        accountServiceSpy.getAccounts.and.returnValue(Observable.of<AccountViewModel[]>([accountViewModel]));
        // ARRANGE THE SOLARCHECKSERVICE SPY
        let testDataModel = CreateSolarCheckEligiblityResponseModel(accountIsEligibleTestValue, '12341234', contractIsEligibleTestValue, SolarCheckRegistrationStatusType.NotRegistered);
        solarCheckServiceSpy.isEligible.and.returnValue(Observable.of<SolarCheckEligiblity>(testDataModel));
        // ARRANGE THE FEATUREFLAGSERVICE SPY
        featureFlagServiceSpy.featureFlagged.and.returnValue(Observable.of<boolean>(true));

        // ACT
        let serviceInstance = TestBed.get(SolarCheckOfferService);
        // ASSERT
        serviceInstance.isEligible().subscribe((result: boolean) => {
            expect(result).toBeTruthy();
        });
    });

    it('should return eligible false when the feature is on and user is not eligible', () => {

        // ARRANGE THE ACCOUNT SERVICE SPY
        let accountIsEligibleTestValue = false;
        let contractIsEligibleTestValue = true;
        let contracts = [
            new ContractViewModel('12341234', [])
        ];
        contracts[0].hasSolar = true;
        let accountViewModel = new AccountViewModel('12345678', contracts);
        accountServiceSpy.getAccounts.and.returnValue(Observable.of<AccountViewModel[]>([accountViewModel]));
        // ARRANGE THE SOLARCHECKSERVICE SPY
        let testDataModel = CreateSolarCheckEligiblityResponseModel(accountIsEligibleTestValue, '12341234', contractIsEligibleTestValue, SolarCheckRegistrationStatusType.NotRegistered);
        solarCheckServiceSpy.isEligible.and.returnValue(Observable.of<SolarCheckEligiblity>(testDataModel));
        // ARRANGE THE FEATUREFLAGSERVICE SPY
        featureFlagServiceSpy.featureFlagged.and.returnValue(Observable.of<boolean>(true));

        // ACT
        let serviceInstance = TestBed.get(SolarCheckOfferService);
        // ASSERT
        serviceInstance.isEligible().subscribe((result: boolean) => {
            expect(result).toBeFalsy();
        });
    });

    function CreateSolarCheckEligiblityResponseModel(isAccountEligible: boolean, contractNumber: string, isContractEligible: boolean, registrationStatus: SolarCheckRegistrationStatusType): SolarCheckEligiblity {
        let model = new SolarCheckEligiblity();
        model.eligible = isAccountEligible;

        let solarContract: SolarCheckEligibilityContract = new SolarCheckEligibilityContract();
        solarContract.contractNumber = contractNumber;
        solarContract.eligible = isContractEligible;
        solarContract.registrationStatus = registrationStatus;
        model.contracts = [solarContract];

        return model;
    }
});
