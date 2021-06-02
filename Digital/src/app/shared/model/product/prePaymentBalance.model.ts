import { Balance } from './balance.model';

export class PrePaymentBalance {
    public contractNumber: number;
    public balance: number;
    public balanceType: string;
    public balanceTopUpUrgency: string;
    public calculationDate: string;
    public expirationDate: string;
    public remainingDays: number;
    public firstPrepaymentDueDate: string;
    public isProductSwapUser: boolean;
    public isEligibleForFullBonus: number;
    public hasOutstandingBalanceWithinFPDD: boolean;
    public previousPlanFinalBalance: Balance;
    public prepaidPlanBalance: Balance;
}
