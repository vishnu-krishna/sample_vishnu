import { Component, Input, OnInit, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';

import { BillTypes } from '../billPanel.component';
import { FeatureFlagService, FeatureFlagTypes } from '../../../../services/featureFlag.service';
import { ContractViewModel } from '../../../../services/account.service';
import { BillDescriptionService } from '../../../../services/billDescription.service';

export class Pill {
    constructor(public readonly pillType: PillType,
                public readonly text: string = '') {
        if (pillType !== PillType.hidden && !text) {
            throw new Error('Pill text must be set');
        }
    }
}

export class BillDateComponentData {
    constructor(public readonly showComponent: boolean,
                public readonly dateRangeDescription: Observable<string> = null,
                public readonly pill: Observable<Pill> = null) {
        if (showComponent && !(dateRangeDescription && pill)) {
            throw new Error('All params must be set when showComponent is true');
        }
    }
}

export enum PillType {
    hidden = 1,
    overdue = 2,
    directDebit = 3,
    notDirectDebit = 4
}

@Component({
    selector: 'agl-bill-date',
    templateUrl: './billDate.component.html',
    styleUrls: ['./billDate.component.scss']
})
export class BillDateComponent implements OnInit {
    @Input() public type: BillTypes;
    @Input() public contract: ContractViewModel;
    @Input() public showPill: boolean = false;

    public dateRangeDescription: string = '';
    public pill: Pill = null;
    public pillTypes = PillType;

    @HostBinding('class.isVisible')
    public get isVisible(): boolean {
        return !!(this.dateRangeDescription && this.pill);
    }

    constructor(private featureFlagService: FeatureFlagService,
                private billDescriptionService: BillDescriptionService) {
    }

    public ngOnInit() {
        // TODO remove this feature flag check once the initial zenith release is deployed (mid May 2018)
        this.featureFlagService.featureFlagged(FeatureFlagTypes.payOnTimeDiscountFixEnabled)
            .takeWhile((isFeatureOn: boolean) => isFeatureOn)
            .flatMap(() => this.resolveBillDateComponentData())
            .takeWhile((data: BillDateComponentData) => data.showComponent)
            .flatMap((data: BillDateComponentData) => Observable.forkJoin([ data.dateRangeDescription, data.pill ]))
            .subscribe(([dateRangeDescription, pill]: [string, Pill]) => {
                this.pill = pill;
                this.dateRangeDescription = dateRangeDescription;
            });
    }

    // This function is in lieu of a service that creates a view model.
    // It's kept inline like this to match the existing pattern within each of the 'bill panel' set of components
    private resolveBillDateComponentData(): Observable<BillDateComponentData> {
        if (this.type.billSmoothing || this.type.billSmoothingV2) {
            return Observable.of(new BillDateComponentData(false));
        }

        const paymentTypePillType = this.type.directDebit ? PillType.directDebit : PillType.notDirectDebit;

        if (this.type.hasPaymentExtension) {
            return Observable.of(new BillDateComponentData(true, this.resolveDateRangeFromNewestBill(), this.createPill(paymentTypePillType)));
        }

        if (this.type.overdue) {
            let pt: PillType = this.type.paymentOverdueInDebit ? PillType.hidden : PillType.overdue;
            return Observable.of(new BillDateComponentData(true, this.resolveDateRangeFromNewestBill(), this.createPill(pt)));
        }

        if (this.type.hasDebit) { // new bill issued/due
            return Observable.of(new BillDateComponentData(true, this.resolveDateRangeFromNewestBill(), this.createPill(paymentTypePillType)));
        }

        // TODO installment plan (diamond)
        // if (this.type.isOnAnInstallmentPlan) {
        //    return Observable.of(new BillDateComponentData(true, this.resolveDateRangeFromSomethingOtherThanNewestBill(), this.createPill(paymentTypePillType)));
        // }

        return Observable.of(new BillDateComponentData(false));
    }

    private resolveDateRangeFromNewestBill(): Observable<string> {
        const newestBill = this.contract.getNewestBill();
        return Observable.of(newestBill ? this.billDescriptionService.dateRangeDescription(newestBill.startDate, newestBill.endDate) : '');
    }

    private createPill(pillType: PillType): Observable<Pill> {
        if (!this.showPill || pillType === PillType.hidden) {
            return Observable.of(new Pill(PillType.hidden));
        }
        if (pillType === PillType.overdue) {
            return Observable.of(new Pill(PillType.overdue, 'Overdue'));
        }

        return this.billDescriptionService.paymentMethodDueInDays(this.contract)
                                          .takeWhile((dueInDesc) => !!dueInDesc)
                                          .map((dueInDesc) => new Pill(pillType, dueInDesc));
    }
}
