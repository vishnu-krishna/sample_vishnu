import { InstalmentPlanFrequency } from '../../../../../../services/paymentScheme/paymentSchemeApi.service';

export interface PaymentAssistancePlanConfirmRouteParamsModel {
    contractAccountNumber: string;
    contractNumber: string;
    frequency: InstalmentPlanFrequency;
    instalmentAmount: number;
    startDate: Date;
    selectedNumberOfInstalments: number;
}
