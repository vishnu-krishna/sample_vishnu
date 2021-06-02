import capitalize from 'lodash-es/capitalize';
import * as moment from 'moment';

import { Component, Input } from '@angular/core';

import { InstalmentPlanFrequency } from '../../../../../../services/paymentScheme/paymentSchemeApi.service';
import { FormatDatePipe } from '../../../../../../pipes/formatDate.pipe';
import { PaymentAssistancePlanSuccessSummaryModel } from './models';

@Component({
    selector: 'agl-payment-assistance-plan-success-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss']
})
export class PaymentAssistancePlanSuccessSummaryComponent {
    @Input() summaryModel: PaymentAssistancePlanSuccessSummaryModel = {
        totalDue: 0,
        frequency: InstalmentPlanFrequency.Weekly,
        startDate: null,
        firstInstalmentDue: null
    };

    constructor(
        private aglFormatDate: FormatDatePipe
    ) {}

    public formatInstalmentsDue = (frequency: InstalmentPlanFrequency, startDate: Date): string => {
        if (startDate) {
            if (frequency === InstalmentPlanFrequency.Monthly) {
                const day = moment(startDate).format('Do');
                return `Monthly on the ${day}`;
            } else {
                const sentenceCaseFrequency: string = capitalize(frequency.toString());
                const frequencyValue = InstalmentPlanFrequency[sentenceCaseFrequency];
                const dayOfWeek = moment(startDate).format('dddd');
                return `${frequencyValue} on ${dayOfWeek}s`;
            }
        } else {
            return '';
        }
    }

    public isDateToday = (date: Date): boolean => date ? moment(date).isSame(moment(), 'day') : false;

    public formatFirstInstalmentDue = (date: Date): string => {
        if (date) {
            return this.isDateToday(date) ? 'Today' : this.aglFormatDate.transform(date.toString());
        } else {
            return '';
        }
    }

}
