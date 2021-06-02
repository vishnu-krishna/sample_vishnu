import { async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import {
    MauiFuelChipFuelContext,
    MauiFuelChipFuelType,
    MauiFuelChipState
} from '../../../../../maui/fuelChip/index';
import {
    PaymentExtensionContractEligibility
} from '../../../../../services/paymentScheme/paymentExtensionEligibility.service';
import { FuelChipData } from '../eligibility/fuelChipData';
import { PaymentExtensionStateService } from './paymentExtensionState.service';

describe('Payment extension state service', () => {
    let sut: PaymentExtensionStateService = null;
    let accountService: any;
    accountService = {
        refreshAccounts: () => {
            throw new Error('refreshAccounts is not implemented');
        }
    };
    let configService: any;
    configService = {};

    beforeEach(() => {
        sut = new PaymentExtensionStateService(accountService, configService);
        eligibleFuelChips = [
            new FuelChipData('22', '12', MauiFuelChipFuelType.Electricity, [], new PaymentExtensionContractEligibility('12', true), MauiFuelChipFuelContext.Bill),
            new FuelChipData('33', '13', MauiFuelChipFuelType.Electricity, [], new PaymentExtensionContractEligibility('13', true), MauiFuelChipFuelContext.Bill),
            new FuelChipData('44', '14', MauiFuelChipFuelType.Electricity, [], new PaymentExtensionContractEligibility('14', true), MauiFuelChipFuelContext.Bill)
        ];
    });

    let eligibleFuelChips;

    describe('Init new session tests', () => {

        it('should select fuel chip and assign eligible chips', () => {
            const selectedContractNumber = '13';
            spyOn(sut, 'selectChip').and.returnValue(null);

            sut.initNewSession(selectedContractNumber, eligibleFuelChips);

            expect(sut.selectChip).toHaveBeenCalledWith(selectedContractNumber);
            expect(sut.getEligibleFuelChips().length).toBe(eligibleFuelChips.length);
        });
    });

    describe('Extension completed tests', () => {

        it('should unselect the selected fuel chip', async(() => {
            const selectedContractNumber = '13';
            sut.initNewSession(selectedContractNumber, eligibleFuelChips);
            spyOn(accountService, 'refreshAccounts').and.returnValue(Observable.of(null));

            sut.extensionCompleted(null).subscribe((result: boolean) => {
                expect(result).toBe(true);
                expect(sut.getSelectedFuelChip()).toBeNull();
            });
        }));

        it('should remove the selected fuel chip from the eligible fuel chips', async(() => {
            const selectedContractNumber = '13';
            sut.initNewSession(selectedContractNumber, eligibleFuelChips);
            spyOn(accountService, 'refreshAccounts').and.returnValue(Observable.of(null));

            sut.extensionCompleted(null).subscribe((result: boolean) => {
                expect(result).toBe(true);
                expect(sut.getEligibleFuelChips().length).toBe(eligibleFuelChips.length - 1);
            });
        }));

        it('should update extended fuel chip', async(() => {
            const selectedContractNumber = '13';
            const extendedDueDate = new Date('2000-01-01');
            sut.initNewSession(selectedContractNumber, eligibleFuelChips);
            spyOn(accountService, 'refreshAccounts').and.returnValue(Observable.of(null));

            sut.extensionCompleted(extendedDueDate).subscribe((result: boolean) => {
                expect(result).toBe(true);
                const extendedChip = sut.getExtendedFuelChip();
                expect(extendedChip.contractNumber).toBe(selectedContractNumber);
                expect(extendedChip.eligibility.isEligible).toBe(false);
                expect(extendedChip.eligibility.dueDate).toBe(extendedDueDate);
                expect(extendedChip.eligibility.availableExtensionDates).toBe(null);
            });
        }));
    });

    describe('select chip tests', () => {
        it('should select the correct fuel chip', () => {
            const selectedContractNumber = '13';
            spyOn(sut, 'getEligibleFuelChips').and.returnValue(eligibleFuelChips);

            sut.selectChip(selectedContractNumber);

            expect(sut.getSelectedFuelChip().contractNumber).toBe(selectedContractNumber);
            expect(sut.getSelectedFuelChip().state).toBe(MauiFuelChipState.Display);
        });

        it(`should not select fuel chip if eligible fuel chips don't include it`, () => {
            const contractNumberNotInEligibleChips = '15';
            spyOn(sut, 'getEligibleFuelChips').and.returnValue(eligibleFuelChips);

            sut.selectChip(contractNumberNotInEligibleChips);

            expect(sut.getSelectedFuelChip()).toBeFalsy();
        });
    });

    describe('lean engage survey tests when no additional eligible fuels', () => {

        beforeEach(() => {
            noEligibleChips = [];
        });
        let noEligibleChips;

        it('should default survey as able to be shown', () => {
            const selectedContractNumber = null;
            sut.initNewSession(selectedContractNumber, noEligibleChips);
            expect(sut.shouldLeanEngageSurveyBeShown()).toBeTruthy();
        });

        it('should not allow survey if it has already been shown', () => {
            const selectedContractNumber = null;
            sut.initNewSession(selectedContractNumber, noEligibleChips);
            sut.setLeanEngageSurveyShown(true);
            expect(sut.shouldLeanEngageSurveyBeShown()).toBeFalsy();
        });

    });

    describe('lean engage survey tests when additional eligible fuels', () => {
        it('should default survey as not able to be shown', () => {
            const selectedContractNumber = '12';
            sut.initNewSession(selectedContractNumber, eligibleFuelChips);
            expect(sut.shouldLeanEngageSurveyBeShown()).toBeFalsy();
        });
    });
});
