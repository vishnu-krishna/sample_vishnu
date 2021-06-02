import { DateBillDueModel } from './dateBillDue.model';
export class NextBillDateModel {
    public contractNo: string;
    public dayNumber: string;
    public billDueDate: DateBillDueModel[];
    public nextBillDate: string;
}
