import { PaymentArrangementInstalmentSummary, InstalmentPlanFrequency } from '../../../../../../services/paymentScheme/paymentSchemeApi.service';

export interface PaymentAssistancePlanConfirmStateModel {
    accountNumber: string;
    contractNumber: string;
    frequency: InstalmentPlanFrequency;
    totalDue: number;
    startDate: Date;
    paymentArrangementInstalmentSummary: PaymentArrangementInstalmentSummary;
}
