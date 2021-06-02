import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { IPaymentExtensionStateService } from '../../pages/bills/paymentAssistance/extend/services/paymentExtensionState.service';

import { FuelChipData } from '../../pages/bills/paymentAssistance/extend/eligibility/fuelChipData';
import { PaymentExtensionContractEligibility } from '../paymentScheme/paymentExtensionEligibility.service';

@Injectable()
export class PaymentExtensionStateMockService implements IPaymentExtensionStateService {
    public paymentExtensionContractEligibility: PaymentExtensionContractEligibility;

    public extensionCompleted(extendedDueDate: Date): Observable<boolean> {
        throw new Error('Method not implemented.');
    }
    public getExtendedFuelChip(): FuelChipData {
        throw new Error('Method not implemented.');
    }
    public clearSelectedFuelChip(): void {
        throw new Error('Method not implemented.');
    }
    public selectChip(selectedContractNumber: string) {
        throw new Error('Method not implemented.');
    }

    public initNewSession(selectedContractNumber: string, eligibleFuelChips: FuelChipData[]) {
        throw new Error('Method not implemented.');
    }
    public getSelectedFuelChip(): FuelChipData {
        throw new Error('Method not implemented.');
    }
    public getEligibleFuelChips(): FuelChipData[] {
        throw new Error('Method not implemented.');
    }
    public showLeanEngageSurveyOnSuccessfulSetup(): void {
        throw new Error('Method not implemented.');
    }
    public shouldLeanEngageSurveyBeShown(): boolean {
        throw new Error('Method not implemented.');
    }
    public setLeanEngageSurveyShown(leanSurveyShown: boolean): void {
        throw new Error('Method not implemented.');
    }
}
