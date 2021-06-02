import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FuelChipData } from '../../pages/bills/paymentAssistance/extend/eligibility/fuelChipData';
import { IPaymentExtensionFuelChipService } from '../../pages/bills/paymentAssistance/extend/eligibility/services/paymentExtensionFuelChip.service';
import { IPaymentExtensionStateService } from '../../pages/bills/paymentAssistance/extend/services/paymentExtensionState.service';
import { IPaymentSchemeApi, InstalmentPlanParameters } from './paymentSchemeApi.service';

export abstract class IInstalmentPlanSummaryService {
    public abstract getInstalmentSummary(): InstalmentPlanSummaryResults;
    public abstract init(instalmentPlanParameters: InstalmentPlanParameters): Observable<PaymentArrangementInstalmentSummary>;
    public abstract initInstalmentPlanSummary(instalmentPlanParameters: InstalmentPlanParameters): Observable<InstalmentPlanSummaryResults>;
}

@Injectable()
export class InstalmentPlanSummaryService {

    public instalmentPlanSummaryResults: InstalmentPlanSummaryResults;

    constructor(
        private api: IPaymentSchemeApi,
        private fuelChipService: IPaymentExtensionFuelChipService,
        private paymentExtensionStateService: IPaymentExtensionStateService,
    ) { }

    public getInstalmentSummary(): InstalmentPlanSummaryResults {
        return this.instalmentPlanSummaryResults;
    }

    public init(instalmentPlanParameters: InstalmentPlanParameters): Observable<PaymentArrangementInstalmentSummary> {
        return Observable.create((observer) => {
            this.api.getPaymentArrangementInstalmentSummary(instalmentPlanParameters)
                .subscribe((summary: PaymentArrangementInstalmentSummary) => {
                    observer.next(summary);
                    observer.complete();
                },
                    (error) => {
                        observer.error(error);
                    });
        });
    }

    public initInstalmentPlanSummary(instalmentPlanParameters: InstalmentPlanParameters): Observable<InstalmentPlanSummaryResults> {
        return Observable.create((observer) => {
            Observable.forkJoin(
                this.fuelChipService.init(),
                this.init(instalmentPlanParameters)
            ).subscribe(
                ([fuelChips, instalmentPlans]) => {

                    this.paymentExtensionStateService.initNewSession(instalmentPlanParameters.contractNumber, fuelChips.eligibleFuelChips);
                    const fuelChipDetail = fuelChips.eligibleFuelChips.find((fuelChip) => fuelChip.contractNumber === instalmentPlanParameters.contractNumber);
                    this.instalmentPlanSummaryResults = new InstalmentPlanSummaryResults(fuelChipDetail, instalmentPlans);
                    observer.next(this.instalmentPlanSummaryResults);
                    observer.complete();
                }
                ,
                (error) => {
                    observer.error(error);
                });
        });
    }
}

export class InstalmentPlanSummaryResults {
    constructor(
        public fuelChipData: FuelChipData,
        public instalmentPlans: PaymentArrangementInstalmentSummary
    ) { }
}

export class PaymentArrangementInstalmentSummary {
    constructor(
        public instalments: PaymentArrangementInstalmentSummaryItem[],
    ) { }
}

export class PaymentArrangementInstalmentSummaryItem {
    constructor(
        public instalmentDate: string,
        public instalmentAmount: number
    ) { }
}
