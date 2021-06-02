import { Observable } from 'rxjs';
import {
    MauiFuelChipState,
    MauiFuelChipFuelType,
    MauiFuelChipFuelContext,
    FuelChipMessage,
    FuelChipContractAccountDetails
} from '../../../../maui/fuelChip';
import { FuelChipContract } from '../../../../maui/fuelChip/fuelChip.component.model';
import { PaymentExtensionContractEligibility } from '../../../../services/paymentScheme/paymentExtensionEligibility.service';

export class FuelChipDataModel {
    private fuelChipState: MauiFuelChipState;
    private fuelChipMessage: FuelChipMessage;
    private fuelChipTertiaryMessage: string;

    public get state(): MauiFuelChipState {
        return this.fuelChipState;
    }

    public get statusMessage(): FuelChipMessage[] {
        return [this.fuelChipMessage];
    }

    public get tertiaryMessage(): string {
        return this.fuelChipTertiaryMessage;
    }

    constructor(public readonly accountNumber: string,
                public readonly contractNumber: string,
                public readonly fuelType: MauiFuelChipFuelType,
                public readonly accountDetails: FuelChipContractAccountDetails[],
                public readonly eligibility: PaymentExtensionContractEligibility,
                public readonly fuelContext: MauiFuelChipFuelContext) {
    }

    public setClassification(fuelChipState: MauiFuelChipState,
                             fuelChipMessage: FuelChipMessage,
                             tertiaryMessage?: string) {
        this.fuelChipState = fuelChipState;
        this.fuelChipMessage = fuelChipMessage;
        this.fuelChipTertiaryMessage = tertiaryMessage;
    }

    public hasBeenSelected() {
        this.fuelChipState = MauiFuelChipState.Display;
    }

    // TODO refactor to getter once we use a version of jasmine that allows spyOnProperty()
    public isVicRegion(): boolean {
        const contracts = this.accountDetails.reduce((total: FuelChipContract[], current: FuelChipContractAccountDetails) => {
            return total.concat(current.contracts);
        }, []);

        return contracts.find((contract: FuelChipContract) => {
                return contract.contractNumber === this.contractNumber;
            }).IsVicRegion;
    }
}
