import { Injectable } from '@angular/core';

import * as moment from 'moment';
import { Now } from '../../shared/service/now.service';
import { ContractViewModel } from './account.service';
import { FeatureFlagService, FeatureFlagTypes } from './featureFlag.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BillDescriptionService {
    constructor(private now: Now,
                private featureFlagService: FeatureFlagService) {
    }

    /** logic for describing when the next bill will be issued  */
    public nextBillIssuedIn(currentBillEndDate: Date,
                            neverIssuedText: string,
                            recentlyIssuedText: string,
                            issuedInTheFutureTextPrefix: string,
                            issuedInTheFutureTextSuffix: string = ''): string {
        const yesterday = -1;
        const today = 0;
        const tomorrow = 1;
        const limit = 150;

        if (this.isInvalidDate(currentBillEndDate)) {
            return neverIssuedText;
        }

        let nextBillDate = moment(currentBillEndDate).startOf('day');
        let daysDiff: number = nextBillDate.diff(this.now.date(), 'days');

        let nextBillIssued: string;
        if (daysDiff === yesterday || daysDiff === today) {
            nextBillIssued = recentlyIssuedText;
        } else if (daysDiff >= tomorrow && daysDiff <= limit) {
            // we add 1 to daysDiff as new bills are issued the day after the current bill end date
            nextBillIssued = `${issuedInTheFutureTextPrefix} ${daysDiff + 1} days${issuedInTheFutureTextSuffix}`;
        } else {
            nextBillIssued = '';
        }

        return nextBillIssued;
    }

    /** when is the most recent bill due, in the format: 'Due/Debited in xx days' */
    public paymentMethodDueInDays(contract: ContractViewModel): Observable<string> {
        return this.resolveDueDate(contract)
                   .map((dueDate: Date | null) => {
                       if (dueDate) {
                           let daysDiff: number = moment(dueDate).startOf('day').diff(this.now.date(), 'days');

                           if (daysDiff >= 0) {
                               let whenDueDescMap = {
                                   0: 'today',
                                   1: 'tomorrow'
                               };

                               let whenDueDesc = whenDueDescMap[daysDiff] || `in ${daysDiff} day${daysDiff !== 1 ? 's' : ''}`;

                               return `${contract.isDirectDebit ? 'Debited' : 'Due'} ${whenDueDesc}`;
                           }
                       }

                       return '';
                   });
    }

    public dateRangeDescription(from: Date, to: Date): string {
        const fromYear: number = moment(from).year();
        const toYear: number = moment(to).year();

        if (this.isInvalidDate(from) || this.isInvalidDate(to)) {
            return '';
        }
        return `${moment(from).format('D MMM')} to ${moment(to).format('D MMM YYYY')}`;
    }

    /**
     * treat null dates and very old dates (such as 01/01/0001 from the api responses) as if the data is invalid - we chose an arbitrary min date of 2010 for this reason.
     */
    private isInvalidDate(date: Date) {
        const minBelievableYear: number = 2010;
        const year: number = moment(date).year();
        return !year || year < minBelievableYear;
    }

    private resolveDueDate(contract: ContractViewModel): Observable<Date | null> {
        return this.featureFlagService.featureFlagged(FeatureFlagTypes.paymentExtensionEnabled)
                   .map((featureIsEnabled: boolean) => {
                           if (featureIsEnabled && contract.extendedDueDate) {
                               return contract.extendedDueDate;
                           }

                           let newestBill = contract.getNewestBill();
                           return newestBill ? newestBill.dueDate : null;
                       }
                   );
    }
}
