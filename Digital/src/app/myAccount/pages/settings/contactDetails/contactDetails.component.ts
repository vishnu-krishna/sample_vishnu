import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BusinessPartnerModel, ContactDetailModel } from '../../../../shared/service/api.service';
import { IApiService } from '../../../../shared/service/contract/iapi.service';
import { DataLayerService, ErrorCodes, ModalName, PageChannel, PageType, SiteSubSection } from '../../../../shared/service/dataLayer.service';
import { ContactDetailsContextService, IContactDetailsContextService } from './contactDetailsContext.service';
import { IContactDetailsStateService } from './contactDetailsState.service';

@Component({
    selector: 'agl-contact-details',
    templateUrl: 'contactDetails.component.html',
    styleUrls: ['contactDetails.component.scss'],
    providers: [
        // a new instance of the context service should be created along with every instance of this component
        { provide: IContactDetailsContextService, useClass: ContactDetailsContextService }
    ]
})
export class ContactDetailsComponent implements OnInit {
    public get headingText(): string {
        return this.contactDetailsContextService.heading;
    }
    public get subHeadingText(): string {
        return this.contactDetailsContextService.subHeading;
    }

    public isLoading: boolean = true;
    public submitDetailsInProgress = false;
    public updateContactDetailInProgress = false;

    public updateContactDetailFailed: boolean = false;
    public getContactDetailFailed: boolean = false;

    public contactDetailsForm: FormGroup;
    public emailErrorMessage: string;
    public mobileErrorMessage: string;
    public apiErrorMessage = 'Sorry, we can\'t update your contact details right now.';

    private initialContactDetails: BusinessPartnerModel;
    private hasAttemptedToSubmitDetails = false;
    private goBackClicked: boolean = false;

    constructor(private contactDetailsContextService: IContactDetailsContextService,
                private contactDetailsStateService: IContactDetailsStateService,
                private apiService: IApiService,
                private location: Location,
                private router: Router,
                private formBuilder: FormBuilder,
                private dataLayerService: DataLayerService) {
    }

    public ngOnInit(): void {
        this.apiService.getContactDetail()
            .subscribe(
                (data: ContactDetailModel) => {
                    if (data.hasMultipleBusinessPartners) {
                        // Multi-Business partners are not supported so if someone uses a deep link or a bookmark then force them back to the main settings page
                        this.router.navigate(['/settings/personal']);
                        // leave isLoading as true so the page does not flash up for a split second
                    } else {
                        if (!data.businessPartners || data.businessPartners.length !== 1) {
                            console.warn('Unexpected businessPartner data', data.businessPartners);
                            this.getContactDetailFailed = true;
                        } else {
                            this.initialContactDetails = { ...data.businessPartners[0] };
                            this.initialContactDetails.mobile = this.initialContactDetails.mobile || '';
                            this.initialContactDetails.email = this.initialContactDetails.email || '';
                            this.createFormWithValidation(this.initialContactDetails);
                        }

                        this.isLoading = false;
                    }
                },
                (err) => {
                    this.getContactDetailFailed = true;
                    this.isLoading = false;
                }
            );
    }

    public goToOverview() {
        this.router.navigate(['/overview']);
    }

    public goBack(): void {
        if (!this.goBackClicked) {
            this.goBackClicked = true;
            this.location.back();
        }
    }

    public submitDetails(): void {
        let controlsUpdated: string[] = [];
        if (this.submitDetailsInProgress) {
            return; // prevent double clicks
        }
        this.submitDetailsInProgress = true;

        this.updateContactDetailFailed = false; // reset
        this.hasAttemptedToSubmitDetails = true;

        // run validation of all fields
        Object.keys(this.contactDetailsForm.controls).forEach((field) => {
            this.runValidation(field);
        });

        if (this.contactDetailsForm.valid) {
            let updatedContactDetails: BusinessPartnerModel = { ...this.initialContactDetails };
            updatedContactDetails.mobile = (this.contactDetailsForm.get('mobile').value || '').trim();
            updatedContactDetails.email = (this.contactDetailsForm.get('email').value || '').trim();

            // Need this for adding the list of fields updated to tealium.
            if (updatedContactDetails.email !== this.initialContactDetails.email) {
                controlsUpdated.push('Email address');
            }
            if (updatedContactDetails.mobile !== this.initialContactDetails.mobile) {
                controlsUpdated.push('Mobile number');
            }
            this.contactDetailsStateService.setControlsUpdated(controlsUpdated);

            if (controlsUpdated.length === 0) {
                // if the value is same as fetched from Api, then don't update the api.
                this.goBack();
                return;
            }

            this.updateContactDetailInProgress = true;
            this.apiService.updateContactDetail(this.initialContactDetails, updatedContactDetails)
                .finally(() => {
                    this.submitDetailsInProgress = false;
                })
                .subscribe((success) => {
                    if (success) {
                        this.contactDetailsStateService.detailsUpdatedSuccessfully(this.contactDetailsContextService.contextId);
                        this.goBack();
                    } else {
                        let fieldsUpdated = this.contactDetailsStateService.getControlsUpdated();
                        this.dataLayerService.pushFormFailure(ModalName.UpdateContactDetails,
                                                              PageChannel.UpdateContactDetails,
                                                              PageType.Account,
                                                              SiteSubSection.UpdateContactDetails,
                                                              fieldsUpdated, this.apiErrorMessage,
                                                              ErrorCodes.ApiError);
                        this.updateContactDetailInProgress = false;
                        this.updateContactDetailFailed = true;
                    }
                });
        } else {
            this.submitDetailsInProgress = false;
        }
        }

    public runValidation(field: string): void {
        let control = this.contactDetailsForm.get(field);
        control.markAsTouched();
        control.updateValueAndValidity();
    }

    private setMobileErrorMessage(c: AbstractControl): void {
        const validationMessages = {
            mobile: 'That doesn\'t look like a valid Australian mobile number. Please try again.',
            required: 'Sorry, mobile number cannot be blank.'
        };

        this.mobileErrorMessage = this.resolveErrorMessage(c, validationMessages);
    }

    private setEmailErrorMessage(c: AbstractControl): void {
        const validationMessages = {
            email: 'That doesn\'t look like a valid email address. Please try again.',
            required: 'Sorry, email address cannot be blank.',
        };

        this.emailErrorMessage = this.resolveErrorMessage(c, validationMessages);
    }

    private resolveErrorMessage(controlToCheck: AbstractControl, validationMessageLookup: {}): string {
        let message = '';
        if (this.hasAttemptedToSubmitDetails && (controlToCheck.touched || controlToCheck.dirty) && controlToCheck.errors) {
            message = Object.keys(controlToCheck.errors).map((key) => validationMessageLookup[key])[0]; // just show the 1st error
        }
        return message;
    }

    private createFormWithValidation(initialContactDetails: BusinessPartnerModel) {
        this.contactDetailsForm = this.formBuilder.group({
            mobile: [initialContactDetails.mobile, Validators.compose(
                this.contactDetailsContextService.getValidators('mobile', initialContactDetails)
            )],
            email: [initialContactDetails.email, Validators.compose(
                this.contactDetailsContextService.getValidators('email', initialContactDetails)
            )],
        });

        this.initFieldValidation('mobile', this.setMobileErrorMessage);
        this.initFieldValidation('email', this.setEmailErrorMessage);
    }

    private initFieldValidation(field: string, setErrorMessageFunction: (c: AbstractControl) => void): void {
        let control = this.contactDetailsForm.get(field);
        control.valueChanges.subscribe((val) => {
            setErrorMessageFunction.call(this, control);
        });

        if (this.contactDetailsContextService.shouldRunValidationOnLoad(field)) {
            this.hasAttemptedToSubmitDetails = true; // we want validation to kick in straight away
            this.runValidation(field);
        }
    }
}
