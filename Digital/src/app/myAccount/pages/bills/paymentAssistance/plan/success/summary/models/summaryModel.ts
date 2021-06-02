import { InstalmentPlanFrequency } from '../../../../../../../services/paymentScheme/paymentSchemeApi.service';

export interface PaymentAssistancePlanSuccessSummaryModel {
    totalDue: number;
    frequency: InstalmentPlanFrequency;
    startDate: Date;
    firstInstalmentDue: Date;
}
