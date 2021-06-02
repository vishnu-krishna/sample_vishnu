import { AccountDetailComponentModel } from '../../../../myAccount/settings/accountDetail/accountDetail.component';
import { AlertType } from '../../../../shared/globals/alertType';
import { PaymentSimpleModel } from '../../../../shared/model/billSmoothing/paymentSimple.model';
import { ContractViewModel } from '../../../services/account.service';
import { BillDeliveryMethodType } from '../../../services/settings/model/billDeliveryMethodType';

export class BillSmoothingAccountModel {
    public accountDetailModel: AccountDetailComponentModel;
    public billSmoothingFuelModel: BillSmoothingFuelDisplayModel[] = [];
    public hasDuplicateFuels?: boolean;
    public hasConsolidatedChatButton?: boolean;
    public hasConsolidatedSetUpButton?: boolean;
    public hasSuggestMessage: boolean;
    public hasEstimatesApiError?: boolean;
    public hasConsolidatedMessages: boolean;
    public hasButtonLineAboveMessage: boolean;
    public hasButtonLineBelowMessage: boolean;
    public allContractsHaveDirectDebit: boolean;
    public livePersonEngagementType: LivePersonEngagementTypes;
    public get hasConsolidatedButton(): boolean {
        return this.hasConsolidatedSetUpButton || this.hasConsolidatedChatButton;
    }
}

export class BillSmoothingFuelDisplayModel {
    public paymentContractInfo?: ContractViewModel;
    public contractAccountNumber: number;
    public contractNumber: number;
    public fuel: string;
    public isGas: boolean;
    public isElectricity: boolean;
    public hasBillSmoothing: boolean;
    public hasDirectDebit: boolean;
    public isEligibleForBillSmoothing?: boolean;
    public paymentScheme?: PaymentSchemeDisplayModel;
    public paymentOptions?: BillSmoothingPaymentOptionModel[];
    public alerts: AlertDisplayModel[];
    public paymentOverdue?: number;
    public billDeliveryMethod?: BillDeliveryMethodType;
    public hasEstimatesApiError?: boolean;
    public isSmartMeter: boolean;
    public regionId: string;
    public hasChatButton: boolean;
    public hasSetupButton: boolean;
    public hasMessage: boolean;
    public livePersonEngagementType: LivePersonEngagementTypes;
    public get heading(): string {
        const isBillSmoothingV1 = this.alerts.some((a) => a.billSmoothingInternalErrorType === BillSmoothingInternalErrorTypes.BillSmoothingV1 );
        if (this.hasBillSmoothing || isBillSmoothingV1) {
            return 'On Bill Smoothing';
        } else {
            return 'Bill Smoothing isn\'t set up yet';
        }
    }
    public get hasAlerts(): boolean {
        return this.alerts.length > 0;
    }

    constructor() {
        this.alerts = [];
    }
}

export enum LivePersonEngagementTypes {
    LPBillSmoothingOverdue = <any> 'LPBillSmoothingOverdue',
    LPBillSmoothingModify = <any> 'LPBillSmoothingModify',
    LPBillSmoothingOverdueAndModify = <any> 'LPBillSmoothingOverdueAndModify'
}

export class AlertDisplayModel {
    public get IsOverdueAlert(): boolean {
        return this.billSmoothingInternalErrorType === BillSmoothingInternalErrorTypes.Overdue;
    }
    public get typeAsString(): string {
        return AlertType[this.type];
    }
    constructor(public billSmoothingInternalErrorType: BillSmoothingInternalErrorTypes, public type: AlertType, public heading: string, public body: string) {}
}

export enum BillSmoothingInternalErrorTypes {
    EstimateError,
    DuplicatedFuels,
    Overdue,
    BillSmoothingV1,
    Payg,
    GeneralIneligibility,
    CustomerHardship
}

export enum SapBillSmoothingErrorTypes {
    IneligibleOverdue = '4',
    IneligibleOnBillSoomthingV1 = '11',
    IneligibleOnAGLPrepaid = '30',
    IneligibleGeneric = '10', // this enum also caters for the following  SAP errors 10, 12, 16, 24, 3, 23, 21, 34
}

export class BillSmoothingAccountsViewModel {
    public contractAccountNumber: number;
    public estimates: BillSmoothingEstimatesViewModel[];
    public hasEstimatesApiError?: boolean;
    public error: BillSmoothingErrorModel;
}

export class BillSmoothingEstimatesViewModel {
    public contractNumber: number;
    public paymentOptions: BillSmoothingPaymentOptionModel[];
    public error: BillSmoothingErrorModel;
}

export class PaymentSchemeDisplayModel {
    public contractNumber: number;
    public paymentSchemeNumber: number;
    public startDate: string;
    public endDate: string;
    public frequency: string;
    public nextPayment: PaymentSimpleModel;
    public previousPayment: PaymentSimpleModel;
}

export class BillSmoothingPaymentOptionModel {
    public frequency: string;
    public amount: string;
    public minDate: string;
    public maxDate: string;
    public excludedDates: string[];
}

export class BillSmoothingErrorModel {
    public message: string;
    public internalError: BillSmoothingInternalErrorModel;
}

export class BillSmoothingInternalErrorModel {
    public errorId: string;
    public errorNumber: string;
    public description: string;
}

export class BillSmoothingValidAccountsModel {
    public fuel: string;
    public contractNumber;
}

export class BillSmoothingPostSchemeModel {
    public contractNumber: number;
    public frequency: string;
    public amount: number;
    public firstPaymentDate: string;
}

export enum BillSmoothingFrequency {
    Weekly = <any> 'Weekly',
    Fortnightly = <any> 'Fortnightly',
    Monthly = <any> 'Monthly',
    None = <any> 'None'
}
