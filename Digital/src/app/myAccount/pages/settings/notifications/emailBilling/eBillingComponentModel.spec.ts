import { FlashMessageType } from './../../../../maui/flashMessage/flashMessageType.enum';
import { AccountViewModel, ContractViewModel } from './../../../../services/account.service';
import { EBillingComponentModel } from './eBillingComponentModel';
import { BillDeliveryContactDetailModel } from './../../../../services/settings/model/billDeliveryContactDetailModel';
import { BusinessPartnerModel, ContactDetailModel } from './../../../../../shared/service/api.service';
import { BillDeliveryMethodType } from '../../../../services/settings/model';

describe('EBillingComponentModel tests', () => {

    let createBillDeliveryContactDetailModel =
        (billDeliveryMethodType: BillDeliveryMethodType = BillDeliveryMethodType.Email,
         emailAddress: string = 'bob.jane@gmail.com',
         hasMultipleBusinessPartners: boolean = false): BillDeliveryContactDetailModel => {
        let businessPartners: BusinessPartnerModel[] = [{
            businessPartnerNumber: 'BP00001',
            phone: '0417 635 283',
            mobile: '0417 635 283',
            hasDateOfBirth: false,
            email: emailAddress,
            firstName: 'Bob',
            lastName: 'Jane',
        }];

        let contactDetail: ContactDetailModel = {
            hasMultipleBusinessPartners: hasMultipleBusinessPartners,
            businessPartners: businessPartners
        };

        let billDeliveryContactDetailModel: BillDeliveryContactDetailModel = {
            accountNumber: '123456780',
            billDeliveryPreference: billDeliveryMethodType,
            contactDetails: contactDetail,
        };

        return billDeliveryContactDetailModel;
    };

    let accountViewModel: AccountViewModel = {
        accountNumber: '123456780',
        groupedAddress: '22 Goldsworthy St, Plumption, VIC',
        contracts: [new ContractViewModel('0987654', null)],
        firstName: 'Bob',
        lastName: 'Jane',
        hasContractInWA: false,
        allContractsAreNewConnection: false,
        allContractsAreRestricted: false
    };

    describe('Computed properties of the component model', () => {
        let testModel: EBillingComponentModel;
        beforeEach(() => {
            testModel = new EBillingComponentModel(createBillDeliveryContactDetailModel(), accountViewModel);
        });
        it('should compute correctly if the model is initialised', () => {
            // ASSERT
            expect(testModel.emailAddress).toEqual('bob.jane@gmail.com');
            expect(testModel.isEmailBillingSetup).toBe(true);
            expect(testModel.isEmailAddressEmptyOrInvalid).toBe(false);
            expect(testModel.hasMultipleBusinessPartners).toBe(false);
            expect(testModel.billDeliveryPreference).toBe(BillDeliveryMethodType.Email);
            expect(testModel.canManageBillDeliveryPreferences).toBe(true);
            expect(testModel.showNonEbillingFlashMessage).toBe(false);
            expect(testModel.showUpdateEbillingResultsMessage).toBe(false);
            expect(testModel.billDeliveryMessage).toEqual('Emailed to: bob.jane@gmail.com.');
            expect(testModel.updateContactDetailsMessage).toEqual('Update');
            expect(testModel.accountAddresses[0]).toBe('22 Goldsworthy St, Plumption, VIC');
            expect(testModel.billDeliveryFlashMessageComponent.flashMessageType).toBe(FlashMessageType.Error);
            expect(testModel.billDeliveryFlashMessageComponent.heading).toBe(`Sorry we can't retrieve your data right now.`);
            expect(testModel.billDeliveryFlashMessageComponent.subheading).toBe(`Please reload the page and try again.`);
        });

        it('should set the billDeliveryPreferences from Postal to Email correctly', () => {
            // ARRANGE
            testModel.setBillDeliveryPreferenceMethod(BillDeliveryMethodType.Postal);

            // ASSERT
            expect(testModel.billDeliveryPreference).toBe(BillDeliveryMethodType.Postal);
            expect(testModel.isEmailBillingSetup).toBe(false);
            expect(testModel.canManageBillDeliveryPreferences).toBe(true);
            expect(testModel.showNonEbillingFlashMessage).toBe(true);
            expect(testModel.showUpdateEbillingResultsMessage).toBe(false);
            expect(testModel.billDeliveryFlashMessageComponent.flashMessageType).toBe(FlashMessageType.Inform);
            expect(testModel.billDeliveryFlashMessageComponent.heading).toBeNull();
            expect(testModel.billDeliveryFlashMessageComponent.subheading).toBe(`A $1.75 fee (inc GST) may be charged for each paper bill we mail you. Switch to free paperless bills.`);
        });

        it('should compute values correcty for BPayView bill delivery Method', () => {
            // ARRANGE
            testModel = new EBillingComponentModel(createBillDeliveryContactDetailModel(BillDeliveryMethodType.BPayView), accountViewModel);

            // ASSERT
            expect(testModel.billDeliveryPreference).toBe(BillDeliveryMethodType.BPayView);
            expect(testModel.isEmailBillingSetup).toBe(false);
            expect(testModel.canManageBillDeliveryPreferences).toBe(false);
            expect(testModel.showNonEbillingFlashMessage).toBe(true);
            expect(testModel.billDeliveryFlashMessageComponent.flashMessageType).toBe(FlashMessageType.Inform);
            expect(testModel.billDeliveryFlashMessageComponent.heading).toBe('You are on BPayView.');
            expect(testModel.billDeliveryFlashMessageComponent.subheading).toBe(`Please log into your banking institutions website to view your bill.`);
        });

        it('should compute values correcty for NotApplicable bill delivery Method', () => {
            // ARRANGE
            testModel = new EBillingComponentModel(createBillDeliveryContactDetailModel(BillDeliveryMethodType.NotApplicable), accountViewModel);

            // ASSERT
            expect(testModel.billDeliveryPreference).toBe(BillDeliveryMethodType.NotApplicable);
            expect(testModel.isEmailBillingSetup).toBe(false);
            expect(testModel.canManageBillDeliveryPreferences).toBe(false);
            expect(testModel.showNonEbillingFlashMessage).toBe(true);
            expect(testModel.billDeliveryFlashMessageComponent.flashMessageType).toBe(FlashMessageType.Error);
            expect(testModel.billDeliveryFlashMessageComponent.heading).toBe(`Sorry we can't retrieve your ebill settings.`);
            expect(testModel.billDeliveryFlashMessageComponent.subheading).toBe(`Please chat with us and we will be happy to help.`);
        });

        it('should compute values correcty if the bill delivery method type is updated to Ebilling', () => {
            // ARRANGE
            testModel = new EBillingComponentModel(createBillDeliveryContactDetailModel(BillDeliveryMethodType.Email), accountViewModel);
            testModel.isUpdatedToEbilling = true;

            // ASSERT
            expect(testModel.billDeliveryPreference).toBe(BillDeliveryMethodType.Email);
            expect(testModel.isEmailBillingSetup).toBe(true);
            expect(testModel.showUpdateEbillingResultsMessage).toBe(true);
            expect(testModel.resultsFlashMessageComponent.flashMessageType).toBe(FlashMessageType.Success);
            expect(testModel.resultsFlashMessageComponent.heading).toBeNull();
            expect(testModel.resultsFlashMessageComponent.subheading).toBe(`AGL will also send offers and other important messages about your account to the email address you have provided.`);
        });

        it('should compute values correcty if an API error occurred while updating the bill delivrey preferences', () => {
            // ARRANGE
            testModel = new EBillingComponentModel(createBillDeliveryContactDetailModel(BillDeliveryMethodType.Email), accountViewModel);
            testModel.isApiError = true;

            // ASSERT
            expect(testModel.showUpdateEbillingResultsMessage).toBe(true);
            expect(testModel.resultsFlashMessageComponent.flashMessageType).toBe(FlashMessageType.Error);
            expect(testModel.resultsFlashMessageComponent.heading).toBe('Well, that didn’t go to plan.');
            expect(testModel.resultsFlashMessageComponent.subheading).toBe(`Sorry, we couldn’t save your preference. Please give it another try.`);
        });

        it('should reset results value correctly', () => {
            // ARRANGE
            testModel = new EBillingComponentModel(createBillDeliveryContactDetailModel(BillDeliveryMethodType.Email),
                                                    accountViewModel);
            testModel.isApiError = true;
            testModel.isUpdatedToEbilling = true;

            // ACT
            testModel.resetUpdateEbillingResultsMessage();

            // ASSERT
            expect(testModel.showUpdateEbillingResultsMessage).toBe(false);
            expect(testModel.isApiError).toBe(false);
            expect(testModel.isUpdatedToEbilling).toBe(false);
        });

        it('should correctly determine mandatory eBilling contracts', () => {
            // ARRANGE
            accountViewModel.contracts[0].isMandatoryEBilling = true;
            testModel = new EBillingComponentModel(createBillDeliveryContactDetailModel(BillDeliveryMethodType.Email),
                                                    accountViewModel);

            // ASSERT
            expect(testModel.isMandatoryEbilling).toBe(true);
        });

        it('should correctly identify empty bill delivery preference data', () => {
            // ARRANGE
            testModel = new EBillingComponentModel(createBillDeliveryContactDetailModel(null), accountViewModel);

            // ASSERT
            expect(testModel.isEmailBillingSetup).toBe(false);
            expect(testModel.billDeliveryPreference).toBeNull();
            expect(testModel.canManageBillDeliveryPreferences).toBeFalsy();
            expect(testModel.showNonEbillingFlashMessage).toBe(true);
            expect(testModel.billDeliveryFlashMessageComponent.flashMessageType).toBe(FlashMessageType.Error);
            expect(testModel.billDeliveryFlashMessageComponent.heading).toBe(`Sorry we can't retrieve your data right now.`);
            expect(testModel.billDeliveryFlashMessageComponent.subheading).toBe(`Please reload the page and try again.`);
        });

        it('should correctly display the update email address link if the email address is null', () => {
            // ARRANGE
            testModel = new EBillingComponentModel(createBillDeliveryContactDetailModel(BillDeliveryMethodType.Email, null),
                                                    accountViewModel);
            testModel.isContactDetailsEnabled = true;

            // ASSERT
            expect(testModel.emailAddress).toEqual('');
            expect(testModel.isEmailBillingSetup).toBe(true);
            expect(testModel.isEmailAddressEmptyOrInvalid).toBe(true);
            expect(testModel.eBillDeliveryMethodHasInvalidEmailAddress).toBe(true);
            expect(testModel.billDeliveryPreference).toBe(BillDeliveryMethodType.Email);
            expect(testModel.canManageBillDeliveryPreferences).toBe(true);
            expect(testModel.showNonEbillingFlashMessage).toBe(false);
            expect(testModel.showUpdateEbillingResultsMessage).toBe(false);
            expect(testModel.billDeliveryMessage).toEqual('');
            expect(testModel.updateContactDetailsMessage).toEqual('Please provide an email address');
        });
    });
});
