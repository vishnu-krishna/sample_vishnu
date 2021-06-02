import { PaymentArrangementStateService } from './../../../../../../shared/component/paymentArrangement/paymentArrangementState.service';
import { Component, Input, OnInit } from '@angular/core';
import { PaymentAssistancePlanOptionsTotalModel } from './models';
import { MauiFuelChipFuelType } from '../../../../../maui/fuelChip';
import { Now } from '../../../../../../shared/service/now.service';
import * as moment from 'moment';

@Component({
    selector: 'agl-payment-assistance-plan-options-total',
    templateUrl: './optionsTotal.component.html',
    styleUrls: ['./optionsTotal.component.scss']
})
export class PaymentAssistancePlanOptionsTotalComponent implements OnInit {

    @Input() optionsTotalModel: PaymentAssistancePlanOptionsTotalModel = {
        totalAmountDue: 0,
        fuelType: MauiFuelChipFuelType.Electricity,
        currentBillEndDate: null
    };

    public currentBillEndDateFormatted: string;
    public shouldShowTip: boolean;

    constructor(
        private now: Now
    ) {}

    ngOnInit(): void {
        const referenceMoments = this.getReferenceMoments();
        this.currentBillEndDateFormatted = this.formatCurrentBillEndDate(this.optionsTotalModel.currentBillEndDate, referenceMoments);
        this.shouldShowTip = this.showTip(this.optionsTotalModel.currentBillEndDate, referenceMoments);
    }
    public formatCurrentBillEndDate = (date: Date, referenceMoments: ReferenceMoments): string => {

        const nextBillDate = moment(date).startOf('day');

        const isToday = nextBillDate.isSame(referenceMoments.today);
        const isYesterday = nextBillDate.isSame(referenceMoments.yesterday);
        const isBlank = nextBillDate === null;
        const isDateInvalid = !moment(date).isValid();

        const isSoon = isToday || isYesterday || isBlank || isDateInvalid;

        return isSoon ?
            'soon' :
            `on ${moment(nextBillDate).add(1, 'day').format('DD MMM YYYY')}`;
    }

    public showTip = (date: Date, referenceMoments: ReferenceMoments): boolean => {
        const nextBillDate = moment(date).startOf('day');

        const isBeforeYesterday = nextBillDate.isBefore(referenceMoments.yesterday);
        const isGreaterThanTodayPlus150Days = nextBillDate.isAfter(referenceMoments.todayPlus150Days);
        const isNull = date === null;

        return !(isBeforeYesterday || isGreaterThanTodayPlus150Days || isNull);

    }

    private getTodayPlus150Days(today: moment.Moment) {
        return moment(today).add(150, 'days');
    }

    private getYesterday(today: moment.Moment) {
        return moment(today).add(-1, 'days');
    }

    private getToday() {
        return this.now.date();
    }

    private getReferenceMoments = (): ReferenceMoments => {
        const today = this.now.date();
        return {
            today: today,
            yesterday: moment(today).add(-1, 'days'),
            todayPlus150Days:  moment(today).add(150, 'days')
        };
    }
}

interface ReferenceMoments {
    today: moment.Moment;
    yesterday: moment.Moment;
    todayPlus150Days: moment.Moment;
}
