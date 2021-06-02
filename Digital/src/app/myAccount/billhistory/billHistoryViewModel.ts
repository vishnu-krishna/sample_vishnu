export class BillHistoryViewModel {
    public newCharges: number;
    public totalDue: string;
    public issuedDate: Date;
    public dueDate: Date;
    public isInCredit: boolean;
    public isOverdue: boolean;
    public billStatus: string;
    public sapPrintDoc: string;
    public fxPrintDoc: string;
    public startDate: string;
    public endDate: string;
    public hasUsageBreakdown: boolean;
    public dateRange: string;
    public days: string;
    public billId: string;
    public billPdfLoading: boolean;
    public billPdfLoadFailed: boolean;
    public showEllipses: boolean;
    public showEllipsesContent: boolean;
}
