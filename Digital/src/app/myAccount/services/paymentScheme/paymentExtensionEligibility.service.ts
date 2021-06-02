import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ErrorApiModel } from '../../../shared/service/api.service';
import { IPaymentSchemeApi, PaymentArrangementExtensionOption, PaymentArrangementExtensionOptions } from './paymentSchemeApi.service';

export abstract class IPaymentExtensionEligibility {
    public abstract getContractAccountEligibility(contractAccountNumber: string): Observable<PaymentExtensionContractEligibility>;
}

@Injectable()
export class PaymentExtensionEligibilityService implements IPaymentExtensionEligibility {
    constructor(private api: IPaymentSchemeApi) {}

    public getContractAccountEligibility(contractAccountNumber: string): Observable<PaymentExtensionContractEligibility> {
        return new Observable((observer) => {
            this.api.getPaymentArrangementExtensionOptions(contractAccountNumber)
                .subscribe((apiResults: PaymentArrangementExtensionOptions) => {
                    apiResults.extensionOptions.forEach((apiOption: PaymentArrangementExtensionOption) => {
                        let res = this.MapToPaymentExtensionContractEligibility(apiOption);
                        observer.next(res);
                    });
                    observer.complete();
                },
                (error) => {
                    observer.error(`Unable to determine payment extension eligibility ${contractAccountNumber}`);
                });
        });
    }

    private MapToPaymentExtensionContractEligibility(apiOption: PaymentArrangementExtensionOption): PaymentExtensionContractEligibility {
        apiOption.dueDateExtensions = apiOption.dueDateExtensions || [];

        return new PaymentExtensionContractEligibility(
            apiOption.contractNumber.toString(),
            apiOption.isEligible,
            this.resolveReasonForIneligibility(apiOption.error),
            apiOption.totalDueAmount,
            apiOption.dueDate,
            apiOption.dueDateExtensions.map((v) => {
                return new PaymentExtensionAvailableDate(v.numberOfDays, v.date);
            })
        );
    }

    private resolveReasonForIneligibility(error: ErrorApiModel): PaymentExtensionIneligibilityReasons {

        if (error && error.internalError && error.internalError.errorNumber) {

            const errorNumber = Number(error.internalError.errorNumber);

            const errorNumberToIneligibilityReasonMap = {
                5: PaymentExtensionIneligibilityReasons.NoIssuedBill,
                8: PaymentExtensionIneligibilityReasons.ExistingPaymentArrangement,
                9: PaymentExtensionIneligibilityReasons.ExistingPaymentArrangement,
                10: PaymentExtensionIneligibilityReasons.Payg,
                11: PaymentExtensionIneligibilityReasons.UnableToExtendOnline,
                12: PaymentExtensionIneligibilityReasons.UnableToExtendOnline,
                13: PaymentExtensionIneligibilityReasons.UnableToExtendOnline,
                14: PaymentExtensionIneligibilityReasons.UnableToExtendOnline,
                15: PaymentExtensionIneligibilityReasons.BrokenAccount,
                16: PaymentExtensionIneligibilityReasons.UnableToExtendOnlineOrNoIssuedBill,
                17: PaymentExtensionIneligibilityReasons.UnableToExtendOnline,
                18: PaymentExtensionIneligibilityReasons.TechnicalError,
                19: PaymentExtensionIneligibilityReasons.TechnicalError,
                20: PaymentExtensionIneligibilityReasons.TechnicalError,
                21: PaymentExtensionIneligibilityReasons.TechnicalError,
                22: PaymentExtensionIneligibilityReasons.TechnicalError,
                27: PaymentExtensionIneligibilityReasons.AlreadyExtended,
                28: PaymentExtensionIneligibilityReasons.UnableToExtendOnline,
                30: PaymentExtensionIneligibilityReasons.UnableToExtendOnline,
                31: PaymentExtensionIneligibilityReasons.UnableToExtendOnline
            };

            return errorNumberToIneligibilityReasonMap[errorNumber] || PaymentExtensionIneligibilityReasons.Unknown;
        }

        return PaymentExtensionIneligibilityReasons.None;
    }
}

export class PaymentExtensionContractEligibility {
    constructor(
        public contractNumber: string,
        public isEligible: boolean,
        public reasonForIneligibility?: PaymentExtensionIneligibilityReasons,
        public totalAmountDue?: number,
        public dueDate?: Date,
        public availableExtensionDates?: PaymentExtensionAvailableDate[]
    ) {}
}

export class PaymentExtensionAvailableDate {
    constructor(
        public numberOfDays: number,
        public dueDate?: Date,
    ) {}
}

export enum PaymentExtensionIneligibilityReasons {
    None,
    AlreadyExtended,
    BrokenAccount,
    ExistingPaymentArrangement,
    NoIssuedBill,
    Payg,
    TechnicalError,
    UnableToExtendOnline,
    UnableToExtendOnlineOrNoIssuedBill,
    Unknown
}
