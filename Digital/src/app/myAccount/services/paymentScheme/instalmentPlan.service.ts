import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import orderBy from 'lodash-es/orderBy';

import { Now } from '../../../shared/service/now.service';
import { IPaymentSchemeApi, PaymentArrangementInstalmentPlans, InstalmentPlanStatus, InstalmentPlan, InstalmentPayment } from './paymentSchemeApi.service';
import { PaymentAssistancePlanInstalmentsProgressItem, InstalmentStatus, PaymentAssistancePlanInstalmentsModel } from '../../pages/bills/paymentAssistance/plan/instalments';

@Injectable()
export class InstalmentPlanService {
    private unpaidInstalmentIndex: number = 0;

    public constructor(
        private api: IPaymentSchemeApi,
        private now: Now
    ) { }

    public getBilling(instalments: InstalmentPayment[]): InstalmentPlanBilling {
        const nextInstalment = this.getNextInstalment(instalments);
        const owingBalance = this.getOwingBalance(instalments);
        const overdueBalance = this.getOverdueBalance(instalments);

        return new InstalmentPlanBilling(
            nextInstalment,
            owingBalance,
            overdueBalance
        );
    }

    public prepareInstalmentProgressTracker(plan: InstalmentPlan): PaymentAssistancePlanInstalmentsModel {
        let instalmentModel: PaymentAssistancePlanInstalmentsModel = { progressItems: [] };
        instalmentModel.progressItems = this
            .sortInstalmentsByDueDateAscending(plan.instalments)
            .map((instalmentPayment: InstalmentPayment) => this.mapInstalmentPaymentToPaymentAssistancePlanInstalmentsProgressItem(instalmentPayment));

        this.resetUnpaidInstalmentIndex();

        return instalmentModel;
    }

    public getInstalmentPlans(contractAccountNumber: string): Observable<ContractInstalmentPlan[]> {
        return this.api.getPaymentArrangementInstalmentPlans(contractAccountNumber, InstalmentPlanStatus.Open)
            .map((contractPlans: PaymentArrangementInstalmentPlans[]) =>
                this.mapPaymentArrangementInstalmentPlansArrayToContractInstalmentPlanArray(+contractAccountNumber, contractPlans)
            )
            .catch((error) => {
                // this is when instalment plan record for the account number is not found
                if (error.status === 404) {
                    return Observable.of(new Array<ContractInstalmentPlan>());
                } else {
                    return Observable.throw(error);
                }
            });
    }

    public getUpcomingInstalments(contractAccountNumber: string): Observable<ContractUpcomingInstalment[]> {
        return this.getInstalmentPlans(contractAccountNumber)
            .map((contractPlans: ContractInstalmentPlan[]) =>
                this.mapContractInstalmentPlanArrayToContractUpcomingInstalmentArray(+contractAccountNumber, contractPlans)
            );
    }

    private getEarliestInstalmentPlan(plans: PaymentArrangementInstalmentPlans): { contractNumber: number, plan: InstalmentPlan } {
        const plan = plans.instalmentPlans.sort((a: InstalmentPlan, b: InstalmentPlan) => {
            return moment(this.getEarliestInstalment(a).instalmentDate).diff(moment(this.getEarliestInstalment(b).instalmentDate), 'day');
        })[0];

        return { contractNumber: plans.contractNumber, plan: plan };
    }

    private getUpcomingInstalment(instalments: InstalmentPayment[]): UpcomingInstalment {
        const nextInstalment = this.getNextInstalment(instalments);

        if (nextInstalment) {
            const overdueAmount = this.getOverdueBalance(instalments);

            return new UpcomingInstalment(overdueAmount, nextInstalment.dueAmount, nextInstalment.dueDate);
        }
    }

    private sortInstalmentsByDueDateAscending(instalments: InstalmentPayment[]): InstalmentPayment[] {
        return instalments.sort((a: InstalmentPayment, b: InstalmentPayment) =>
            moment(a.instalmentDate).diff(moment(b.instalmentDate), 'day')
        );
    }

    private getProgressTrackerAmount(plan: InstalmentPayment): number {
        const instalmentIsPaid = plan.dueAmount === 0;
        return instalmentIsPaid ? plan.instalmentAmount : plan.dueAmount;
    }

    private getProgressTrackerStatus(plan: InstalmentPayment): InstalmentStatus {
        const instalmentIsPaid = this.isPaid(plan.dueAmount);
        const numberOfDaysOverdue = this.now.date().diff(moment(plan.instalmentDate).startOf('day'), 'days');
        const isOverdue = this.isOverdue(numberOfDaysOverdue);
        const isCurrentlyDue = this.unpaidInstalmentIndex === 0;

        let instalmentStatus: InstalmentStatus;

        // Overdue
        if (!instalmentIsPaid && isOverdue) {
            instalmentStatus = InstalmentStatus.Overdue;
        }

        // Upcoming
        if (!instalmentIsPaid && !isOverdue) {
            instalmentStatus = InstalmentStatus.Upcoming;
        }

        // Due
        if (!instalmentIsPaid && !isOverdue && isCurrentlyDue) {
            instalmentStatus = InstalmentStatus.Due;
            this.unpaidInstalmentIndex++;
        }

        // Paid
        if (instalmentIsPaid) {
            instalmentStatus = InstalmentStatus.Paid;
        }

        return instalmentStatus;
    }

    private isPaid(dueAmount: number): boolean {
        return dueAmount === 0;
    }

    private isOverdue(numberOfDaysOverdue: number): boolean {
        return numberOfDaysOverdue > 0;
    }

    private resetUnpaidInstalmentIndex(): number {
        return this.unpaidInstalmentIndex = 0;
    }

    private getEarliestInstalment(plan: InstalmentPlan): InstalmentPayment {
        return plan.instalments.sort((a: InstalmentPayment, b: InstalmentPayment) => {
            return moment(a.instalmentDate).diff(moment(b.instalmentDate), 'day');
        })[0];
    }

    private getOwingBalance(instalments: InstalmentPayment[]): number {
        return this.roundToTwoDecimalPlaces(instalments
            .reduce((balance: number, instalment: InstalmentPayment) => balance + instalment.dueAmount, 0));
    }

    private getOverdueBalance(instalments: InstalmentPayment[]): number {
        const overdueInstalments = this.getOverdueInstalments(instalments);
        return this.roundToTwoDecimalPlaces(overdueInstalments
            .reduce((overdueAmount: number, instalment: OverdueInstalment) => overdueAmount + instalment.overdueAmount, 0));
    }

    // When summing multiple floating point numbers javascript will produce floating point errors. This method will calculate to 2 decimal places accurately.
    private roundToTwoDecimalPlaces(value: number): number {
        return Math.round(value * 100) / 100;
    }

    private getOverdueInstalments(instalments: InstalmentPayment[]): OverdueInstalment[] {
        return instalments
            .filter((instalment: InstalmentPayment) => this.isInstalmentOverdue(instalment))
            .map((instalment: InstalmentPayment, index: number) => new OverdueInstalment(index + 1, instalment.dueAmount));
    }

    private isInstalmentOverdue(instalment: InstalmentPayment): boolean {
        return this.hasOutstandingBalance(instalment) && moment(instalment.instalmentDate).isBefore(this.now.date(), 'day');
    }

    private hasOutstandingBalance(instalment: InstalmentPayment): boolean {
        return instalment.dueAmount > 0;
    }

    private getNextInstalment(instalments: InstalmentPayment[]): NextInstalment {
        const sortedInstalments = this.sortInstalmentsByDueDateAscending(instalments);

        const nextInstalmentIndex = sortedInstalments
            .findIndex((instalmentPayment: InstalmentPayment) => moment(instalmentPayment.instalmentDate).isSameOrAfter(this.now.date(), 'day'));

        if (nextInstalmentIndex > -1) {
            return new NextInstalment(
                sortedInstalments[nextInstalmentIndex].dueAmount,
                sortedInstalments[nextInstalmentIndex].instalmentDate,
                nextInstalmentIndex + 1);
        }

        return undefined;
    }

    private mapInstalmentPaymentToPaymentAssistancePlanInstalmentsProgressItem(instalment: InstalmentPayment): PaymentAssistancePlanInstalmentsProgressItem {
        const instalmentAmount = this.getProgressTrackerAmount(instalment);
        const instalmentDueDate = moment(instalment.instalmentDate).toDate();
        const instalmentStatus = this.getProgressTrackerStatus(instalment);

        return new PaymentAssistancePlanInstalmentsProgressItem(
            instalmentAmount, instalmentDueDate, instalmentStatus
        );
    }

    private mapPaymentArrangementInstalmentPlansArrayToContractInstalmentPlanArray(contractAccountNumber: number, contractPlans: PaymentArrangementInstalmentPlans[]): ContractInstalmentPlan[] {
        return contractPlans.map((contractPlan: PaymentArrangementInstalmentPlans) =>
            this.mapPaymentArrangementInstalmentPlansToContractInstalmentPlan(contractAccountNumber, contractPlan)
        );
    }

    private mapPaymentArrangementInstalmentPlansToContractInstalmentPlan(contractAccountNumber: number, contractPlans: PaymentArrangementInstalmentPlans): ContractInstalmentPlan {
        const earliestInstalmentPlan = this.getEarliestInstalmentPlan(contractPlans);
        return new ContractInstalmentPlan(contractAccountNumber, earliestInstalmentPlan.contractNumber, earliestInstalmentPlan.plan);
    }

    private mapContractInstalmentPlanArrayToContractUpcomingInstalmentArray(contractAccountNumber: number, contractPlans: ContractInstalmentPlan[]): ContractUpcomingInstalment[] {
        return contractPlans.map((contractPlan: ContractInstalmentPlan) =>
            this.mapContractInstalmentPlanToContractUpcomingInstalment(contractAccountNumber, contractPlan)
        );
    }

    private mapContractInstalmentPlanToContractUpcomingInstalment(contractAccountNumber: number, contractPlan: ContractInstalmentPlan): ContractUpcomingInstalment {
        const upcomingInstalment = this.getUpcomingInstalment(contractPlan.instalmentPlan.instalments);
        return new ContractUpcomingInstalment(contractAccountNumber, contractPlan.contractNumber, upcomingInstalment);
    }
}

export class InstalmentPlanData {
    constructor(
        public readonly billing: InstalmentPlanBilling,
        public readonly progressTrackerData: PaymentAssistancePlanInstalmentsModel
    ) {}
}

export class ContractInstalmentPlan {
    constructor(public readonly contractAccountNumber: number, public readonly contractNumber: number, public readonly instalmentPlan: InstalmentPlan) {}
}

export class ContractUpcomingInstalment {
    constructor(public readonly contractAccountNumber: number, public readonly contractNumber: number, public readonly upcomingInstalment: UpcomingInstalment) {}
}

export class UpcomingInstalment {
    constructor(public readonly overdueAmount: number, public readonly instalmentDueAmount: number, public readonly instalmentDueDate: Date) {}
}

export class OverdueInstalment {
    constructor(public readonly index: number, public readonly overdueAmount: number) {}
}

export class NextInstalment {
    public constructor(
        public readonly dueAmount: number,
        public readonly dueDate: Date,
        public readonly index: number) {}
}

export class InstalmentPlanBilling {
    public constructor(
        public readonly nextInstalment: NextInstalment,
        public readonly totalInstalmentPlanOwingBalance: number,
        public readonly overdueAmount: number = 0) {}

    public getAmountToPay(): number {
        const nextInstalmentDueAmount = this.nextInstalment ?
            this.nextInstalment.dueAmount :
            0;

        return nextInstalmentDueAmount + this.overdueAmount;
    }

    public hasTotalBalance(): boolean {
        return this.totalInstalmentPlanOwingBalance > 0;
    }

    public isOverdue(): boolean {
        return this.overdueAmount > 0;
    }
}
