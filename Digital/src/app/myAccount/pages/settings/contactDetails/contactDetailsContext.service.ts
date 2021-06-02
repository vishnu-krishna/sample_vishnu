import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { BusinessPartnerModel } from '../../../../shared/service/api.service';
import { AglValidators } from './../../../../shared/validators/aglValidators';
import { ContactDetailsContext } from './contactDetailsContext.enum';

export abstract class IContactDetailsContextService {
    /**
     * The contract or contract account id for which the change to contact details was initialed for (if applicable)
     */
    public abstract get contextId(): string | null;
    public abstract get heading(): string;
    public abstract get subHeading(): string;
    public abstract getValidators(field: string, initialContactDetails: BusinessPartnerModel): ValidatorFn[];
    public abstract shouldRunValidationOnLoad(field: string): boolean;
}

@Injectable()
export class ContactDetailsContextService implements IContactDetailsContextService {
    public contextId: string | null;
    public heading: string;
    public subHeading: string;

    private context: ContactDetailsContext;

    constructor(private activatedRoute: ActivatedRoute) {
        this.resolveContactDetailsContextFromRoute();
        this.setHeaders();
    }

    public shouldRunValidationOnLoad(field: string): boolean {
        return (field === 'email' && this.context === ContactDetailsContext.EBilling) ||
                (field === 'mobile' && (this.context === ContactDetailsContext.SMSPay || this.context === ContactDetailsContext.MonthlyBilling));
    }

    public getValidators(field: string, initialContactDetails: BusinessPartnerModel): ValidatorFn[] {
        let validators: ValidatorFn[] = [];

        if (field === 'email') {
            validators.push(AglValidators.email);
        } else if (field === 'mobile') {
            validators.push(AglValidators.mobile);
        }

        this.setRequiredValidator(field, initialContactDetails, validators);

        return validators;
    }

    private setRequiredValidator(field: string, initialContactDetails: BusinessPartnerModel, validators: ValidatorFn[]) {
        // once set, values cannot be removed/blanked out
        let initialValueWasNotEmpty: boolean = (initialContactDetails[field] || '').length > 0;

        if (field === 'email') {
            if (this.context === ContactDetailsContext.EBilling || initialValueWasNotEmpty) {
                validators.push(Validators.required );
            }
        } else if (field === 'mobile') {
            if (this.context === ContactDetailsContext.SMSPay || initialValueWasNotEmpty) {
                validators.push(Validators.required );
            }
        }
    }

    private resolveContactDetailsContextFromRoute(): void {
        this.contextId = this.activatedRoute.snapshot.paramMap.get('contextId');

        let routeParam = this.activatedRoute.snapshot.paramMap.get('context') || '';
        let matchingEnumVal = Object.keys(ContactDetailsContext).find((k) => k.toLowerCase() === routeParam.toLowerCase());
        let context: ContactDetailsContext = ContactDetailsContext[matchingEnumVal];

        if (context === undefined) {
            if (routeParam) {
                console.warn('Unknown contact details context in route');
            }
            context = ContactDetailsContext.GeneralContactDetails; // set a sensible default
        }

        this.context = context;
    }

    private setHeaders() {
        let map = {
            [ContactDetailsContext.EBilling]: 'Now we\'ll need your email address',
            [ContactDetailsContext.SMSPay]: 'Now we\'ll need your mobile number'
        };

        this.heading = map[this.context] || 'Update your contact details';

        map = {
            [ContactDetailsContext.EBilling]: 'Enter it below to set up eBilling',
            [ContactDetailsContext.SMSPay]: 'Enter it below to set up SMS Pay'
        };

        this.subHeading = map[this.context] || 'One easy place to update your contact details at any time';
    }
}
