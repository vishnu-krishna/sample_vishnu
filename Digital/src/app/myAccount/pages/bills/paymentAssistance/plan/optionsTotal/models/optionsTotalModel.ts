import { MauiFuelChipFuelType } from '../../../../../../maui/fuelChip';

export interface PaymentAssistancePlanOptionsTotalModel {
    totalAmountDue: number;
    fuelType: MauiFuelChipFuelType;
    currentBillEndDate: Date;
}
