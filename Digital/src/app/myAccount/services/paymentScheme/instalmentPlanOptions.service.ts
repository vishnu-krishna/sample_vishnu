import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

import { IPaymentSchemeApi, PaymentArrangementInstalmentPlanOption, InstalmentPlanFrequency, PaymentArrangementInstalmentSuggestion, GetPaymentArrangementInstalmentPlanOptionsParams } from './paymentSchemeApi.service';
import { SegmentedButtonOptions } from '../../maui/segmentedButtons';
import { IPaymentExtensionFuelChipService } from '../../pages/bills/paymentAssistance/extend/eligibility/services/paymentExtensionFuelChip.service';
import { IPaymentExtensionStateService } from '../../pages/bills/paymentAssistance/extend/services/paymentExtensionState.service';
import { FuelChipData } from '../../pages/bills/paymentAssistance/extend/eligibility/fuelChipData';
import { IAccountServiceMA } from '../account.service';

export abstract class IInstalmentPlanOptionsService {
    public abstract getInitialisedInstalmentOptions(): InstalmentOption[];
    public abstract getInstalmentOptions(contractNumber: string, params: GetPaymentArrangementInstalmentPlanOptionsParams): Observable<InstalmentOption[]>;
    public abstract initCustomInstalmentPlanSession(contractAccountNumber: string, contractNumber: string): Observable<InstalmentCustomPlan>;
}

@Injectable()
export class InstalmentPlanOptionsService implements IInstalmentPlanOptionsService {
    private instalmentOptions: InstalmentOption[];

    constructor(
        private api: IPaymentSchemeApi,
        private accountService: IAccountServiceMA,
        private fuelChipService: IPaymentExtensionFuelChipService,
        private paymentExtensionStateService: IPaymentExtensionStateService,
    ) {}

    public getInitialisedInstalmentOptions(): InstalmentOption[] {
        return this.instalmentOptions;
    }

    public getInstalmentOptions(contractNumber: string, params: GetPaymentArrangementInstalmentPlanOptionsParams): Observable<InstalmentOption[]> {
        return new Observable((observer) => {
            this.api.getPaymentArrangementInstalmentPlanOptions(contractNumber, params)
                .subscribe((options: PaymentArrangementInstalmentPlanOption[]) => {
                    this.instalmentOptions = options.map((option: PaymentArrangementInstalmentPlanOption) => this.mapToInstalmentOptions(option));
                    observer.next(this.instalmentOptions);
                    observer.complete();
                },
                (error) => {
                    observer.error(error);
                });
        });
    }

    public initCustomInstalmentPlanSession(contractAccountNumber: string, contractNumber: string): Observable<InstalmentCustomPlan> {
        return new Observable((observer) => {
            Observable.forkJoin(
                this.fuelChipService.init(),
                this.accountService.getAccounts(),
                this.getInstalmentOptions(contractNumber, { suggestInstalments: false })
            ).subscribe(([fuelChips, accountDetails, instalmentPlanOptions]) => {
                this.paymentExtensionStateService.initNewSession(contractNumber, fuelChips.eligibleFuelChips);
                const fuelChipDetail = fuelChips.eligibleFuelChips.find((fuelChip) => fuelChip.contractNumber === contractNumber);
                const currentBillEndDate = accountDetails
                                            .find((account) => account.accountNumber === contractAccountNumber).contracts
                                            .find((contract) => contract.contractNumber === contractNumber).currentBillEndDate;

                const instalmentOptions = instalmentPlanOptions
                    .map((option) => {
                        return new InstalmentOption(
                            option.frequency,
                            option.minStartDate,
                            option.maxStartDate,
                            option.instalmentSuggestions,
                            option.instalmentMinAmount,
                            option.instalmentMaxAmount
                        );
                    });

                observer.next(new InstalmentCustomPlan(fuelChipDetail, currentBillEndDate, instalmentOptions));
                observer.complete();
            },
            (error) => {
                observer.error(error);
            });
        });
    }

    private mapToInstalmentOptions(option: PaymentArrangementInstalmentPlanOption): InstalmentOption {
        return new InstalmentOption(
            option.frequency,
            option.minStartDate,
            option.maxStartDate,
            option.instalmentSuggestions,
            option.instalmentMinAmount,
            option.instalmentMaxAmount
        );
    }
}
export class InstalmentOption {
    constructor(
        public frequency: InstalmentPlanFrequency,
        public minStartDate: Date,
        public maxStartDate: Date,
        public instalmentSuggestions: PaymentArrangementInstalmentSuggestion[],
        public instalmentMinAmount: number,
        public instalmentMaxAmount: number
    ) {}
}

export class InstalmentCustomPlan {
    constructor(
        public fuelChipData: FuelChipData,
        public currentBillEndDate: Date,
        public instalmentOptions: InstalmentOption[]
    ) {}
}

export class FrequencyOption {
    constructor(
        public value: string,
        public text: string,
        public selected: boolean,
        public mobileText?: string
    ) {}
}

export class DateOption {
    constructor(
        public value: string,
        public text: string,
        public disabled: boolean,
        public selected: boolean,
    ) {}
}

export class DateOptions {
    constructor(
        public frequency: InstalmentPlanFrequency,
        public datesByWeek: DateOption[][]
    ) {}
}
