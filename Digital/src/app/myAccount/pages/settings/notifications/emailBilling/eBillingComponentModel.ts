import { BillDeliveryMethod } from './../../../../services/settings/model/billDeliveryMethod';
import { AccountViewModel, ContractViewModel } from './../../../../services/account.service';
import { AccountDetailComponentModel } from './../../../../settings/accountDetail/accountDetail.component';
import { ContactDetailModel } from './../../../../../shared/service/api.service';
import { BillDeliveryContactDetailModel } from './../../../../services/settings/model/billDeliveryContactDetailModel';
import { BillDeliveryMethodType } from '../../../../services/settings/model';
import { AglValidators } from '../../../../../shared/validators/aglValidators';
import { FlashMessageType } from '../../../../maui/flashMessage';

export class EBillingComponentModel {

    public isEmailBillingSetup: boolean = false;
    public isBillDeliveryUpdateLoading: boolean = false;
    public isUpdatedToEbilling: boolean = false;
    public isApiError: boolean = false;
    public isContactDetailsEnabled: boolean = false;

    private contactDetails: ContactDetailModel;

    constructor(
        private billDeliveryContactDetail: BillDeliveryContactDetailModel,
        private accountViewModel: AccountViewModel
    ) {
        this.contactDetails = billDeliveryContactDetail.contactDetails;
        this.isEmailBillingSetup = billDeliveryContactDetail.billDeliveryPreference === BillDeliveryMethodType.Email;
    }

    public get accountNumber(): string {
        return this.billDeliveryContactDetail.accountNumber;
    }

    public get emailAddress(): string {
        if (this.contactDetails && this.contactDetails.businessPartners) {
            let businessPartner = this.contactDetails.businessPartners[0];

            if (businessPartner) {
                if (businessPartner.email) {
                    return businessPartner.email.toLowerCase();
                }
            }
        }

        return '';
    }

    public get isEmailAddressEmptyOrInvalid(): boolean {
        return (this.emailAddress || '').length === 0 || !AglValidators.isEmailAddressValid(this.emailAddress);
    }

    public get hasMultipleBusinessPartners(): boolean {
        return this.contactDetails.hasMultipleBusinessPartners;
    }

    public get billDeliveryPreference(): BillDeliveryMethodType {
        return this.billDeliveryContactDetail.billDeliveryPreference;
    }

    public get canManageBillDeliveryPreferences(): boolean {
        return this.billDeliveryPreference
            && this.billDeliveryPreference !== BillDeliveryMethodType.BPayView
            && this.billDeliveryPreference !== BillDeliveryMethodType.NotApplicable
            && !this.shouldHideEbillComponents();
    }

    public get showNonEbillingFlashMessage(): boolean {
        return this.billDeliveryPreference !== BillDeliveryMethodType.Email
            && !this.shouldHideEbillComponents();
    }

    public get showUpdateEbillingResultsMessage(): boolean {
        return this.isApiError || this.isUpdatedToEbilling;
    }

    public get billDeliveryMessage(): string {
        return this.isEmailAddressEmptyOrInvalid && this.isContactDetailsEnabled
                ? '' : `Emailed to: ${this.emailAddress}.`;
    }

    public get updateContactDetailsMessage(): string {
        let updateContactDetailsMessage = 'Update';

        if (this.isEmailAddressEmptyOrInvalid) {
            updateContactDetailsMessage = this.isEmailBillingSetup ? `Please provide an email address`
                                                            : `Please provide a valid email address to setup eBilling`;
        }

        return updateContactDetailsMessage;
    }

    public get billDeliveryFlashMessageComponent(): FlashMessageComponentModel {
        switch (this.billDeliveryPreference) {
            case BillDeliveryMethodType.BPayView:
                return new FlashMessageComponentModel
                        (FlashMessageType.Inform,
                        `You are on BPayView.`,
                        `Please log into your banking institutions website to view your bill.`
                        );
            case BillDeliveryMethodType.NotApplicable:
                return new FlashMessageComponentModel
                        (FlashMessageType.Error,
                        `Sorry we can't retrieve your ebill settings.`,
                        `Please chat with us and we will be happy to help.`,
                        );
            case BillDeliveryMethodType.Postal:
                return new FlashMessageComponentModel
                        (FlashMessageType.Inform,
                        null,
                        `A $1.75 fee (inc GST) may be charged for each paper bill we mail you. Switch to free paperless bills.`,
                        );
            default:
                return new FlashMessageComponentModel
                        (FlashMessageType.Error,
                        `Sorry we can't retrieve your data right now.`,
                        `Please reload the page and try again.`,
                        );
        }
    }

    public get resultsFlashMessageComponent(): FlashMessageComponentModel {
        if (this.isUpdatedToEbilling) {
            return new FlashMessageComponentModel
                        (FlashMessageType.Success,
                        null,
                        `AGL will also send offers and other important messages about your account to the email address you have provided.`,
                        );
        } else if (this.isApiError) {
            return new FlashMessageComponentModel
                        (FlashMessageType.Error,
                        `Well, that didn’t go to plan.`,
                        `Sorry, we couldn’t save your preference. Please give it another try.`,
                        );
        }
    }

    public get isMandatoryEbilling(): boolean {
        let isMandatoryEbilling = this.accountViewModel.contracts.some((contract: ContractViewModel) => contract.isMandatoryEBilling);
        return isMandatoryEbilling && this.isEmailBillingSetup;
    }

    public get isEbillToggleDisabled(): boolean {
        return (this.hasMultipleBusinessPartners || (this.isEmailAddressEmptyOrInvalid && !this.isEmailBillingSetup))
            && this.isContactDetailsEnabled;
    }

    public get eBillDeliveryMethodHasInvalidEmailAddress(): boolean {
        return this.isEmailAddressEmptyOrInvalid && !this.hasMultipleBusinessPartners && this.isEmailBillingSetup;
    }

    public get accountAddresses(): string[] {
        let accountAddresses = [];
        if (this.accountViewModel.groupedAddress) {
            accountAddresses = [this.accountViewModel.groupedAddress];
        } else {
            this.accountViewModel.contracts.forEach((contract) => {
                if (!contract.isRestricted) {
                    accountAddresses.push(contract.address);
                }
            });
        }
        return accountAddresses;
    }

    public get accountHasGas(): boolean {
        return this.accountViewModel.contracts.some((contract) => contract.isGas);
    }

    public get accountHasElectricity(): boolean {
        return this.accountViewModel.contracts.some((contract) => contract.isElectricity);
    }

    public get ebillingContracts(): ContractViewModel[] {
        return this.accountViewModel.contracts;
    }

    public setBillDeliveryPreferenceMethod(value: BillDeliveryMethodType): void {
        this.billDeliveryContactDetail.billDeliveryPreference = value;
        this.isEmailBillingSetup = this.billDeliveryContactDetail.billDeliveryPreference === BillDeliveryMethodType.Email;
    }

    public resetUpdateEbillingResultsMessage(): void {
        this.isApiError = false;
        this.isUpdatedToEbilling = false;
    }

    private shouldHideEbillComponents(): boolean {
        return this.hasMultipleBusinessPartners
            && this.isEmailAddressEmptyOrInvalid
            && this.isContactDetailsEnabled;
    }

}

export class FlashMessageComponentModel {
    constructor(
        public flashMessageType: FlashMessageType,
        public heading?: string,
        public subheading?: string,
    ) { }
}
