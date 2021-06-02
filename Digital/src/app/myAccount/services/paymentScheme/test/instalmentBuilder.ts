import { InstalmentPayment } from '../paymentSchemeApi.service';

export class InstalmentBuilder {
    public constructor(private date: Date, private amount: number = 50, private dueAmount: number = 50) {}

    public build(): InstalmentPayment {
        return {
            instalmentDate: this.date,
            instalmentAmount: this.amount,
            dueAmount: this.dueAmount
        };
    }
}
