import { FuelConnectionType } from '../../../shared/globals/oneMinuteMove/fuelType';
import { SelfServiceEligibilityResponseApiModel } from '../../../shared/service/api.service';
import { ContractViewModel } from '../../services/account.service';

export class ContractDisplayViewModel {

    public accountNumber: string;
    public contractNumber: string;
    public address: string;
    public fuelType: string;
    public isSmartMeter: boolean;
    public isGas: boolean;
    public isElectricity: boolean;
    public isEligible: boolean;
    public isBillSmoothing?: boolean;
    public isDirectDebit?: boolean;
    public meterCount?: number;
    public ssmrModel: SelfServiceEligibilityResponseApiModel;
    public eligibilityMessage: string;
    public contract?: ContractViewModel;
    public lastReadDate?: string;
    public showWebChatLink?: boolean;
    public suggestPhotoUpload: boolean;

    constructor( contract: ContractViewModel) {
        let fuelType: FuelConnectionType = FuelConnectionType[contract.fuelType];

        this.accountNumber = contract.accountNumber;
        this.contractNumber = contract.contractNumber;
        this.address = this.formatAddress(contract.addressRaw);
        this.isSmartMeter = contract.isSmartMeter;
        this.fuelType = contract.fuelType;
        this.isBillSmoothing = contract.isBillSmoothing;
        this.isDirectDebit = contract.isDirectDebit;
        this.contract = contract;
        this.isGas = fuelType === FuelConnectionType.Gas;
        this.isElectricity = fuelType === FuelConnectionType.Electricity;
    }

    public formatAddress?(address: string): string {
        return !address ? '' : address
            .replace(/(\|)/g, ', ')
            .replace(/\s\s+/g, ' ')
            .toLowerCase()
            .split(' ')
            .map((word) => {
                return word.replace(word[0], word[0].toUpperCase());
            })
            .join(' ')
            .replace(/([a-z]{3})\s+\d{4}$/i, (v) => v.toUpperCase());
    }
}
