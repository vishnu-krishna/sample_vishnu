export interface Dashboard {
    account: string;
    balance: number;
    contract: string;
    costToDate: number;
    currentBillEndDate: string;
    currentBillStartDate: string;
    dueDate: string;
    estimatedReads: boolean;
    isSmartMeter: boolean;
    projectedBill: number;
    usageCostLastWeek: number;
    usageCostThisWeek: number;
    usageLastWeek: string;
    usageThisWeek: string;
}
