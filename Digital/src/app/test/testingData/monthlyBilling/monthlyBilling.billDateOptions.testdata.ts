import { BillDateOption } from './../../../myAccount/services/settings/model/billDateOption';

export class MonthlyBillingBillDateOptions {

    public static ClintEastWood: BillDateOption[] = [
        {
            dayOfMonth: 1,
            billDates: [
                {
                    issueDate: new Date('2017-10-10'),
                    dueDate: new Date('2017-10-21')
                },
                {
                    issueDate: new Date('2017-11-10'),
                    dueDate: new Date('2017-11-21')
                },
                {
                    issueDate: new Date('2017-12-10'),
                    dueDate: new Date('2017-12-21')
                }
            ]
        },
        {
            dayOfMonth: 2,
            billDates: [
                {
                    issueDate: new Date('2017-10-11'),
                    dueDate: new Date('2017-10-22')
                },
                {
                    issueDate: new Date('2017-11-11'),
                    dueDate: new Date('2017-11-22')
                },
                {
                    issueDate: new Date('2017-12-11'),
                    dueDate: new Date('2017-12-22')
                }
            ]
        },
        {
            dayOfMonth: 3,
            billDates: [
                {
                    issueDate: new Date('2017-10-12'),
                    dueDate: new Date('2017-10-23')
                },
                {
                    issueDate: new Date('2017-11-12'),
                    dueDate: new Date('2017-11-23')
                },
                {
                    issueDate: new Date('2017-12-12'),
                    dueDate: new Date('2017-12-23')
                }
            ]
        },
    ];

}
