import { BillDeliveryMethodType }    from '../../../../../myAccount/services/settings/model';
import { AlertType, EmailBillingComponentModel } from './emailBillingComponentModel';

/**
 * @deprecated: the new EBilling component should be used moving forward
 * The new Manage Account Information Architecture (IA) has the Notifications page which has the eBilling component using the Maui-Toggle
 */
describe('EmailBillingComponentModel tests', () => {
    let contractAccountNumber = '123456789';
    let emailAddress = 'john.smith@hotmail.com';
    let testSubject: EmailBillingComponentModel;

    describe('Computed property view model tests', () => {

        describe('When created with a bill delivery method of undefined', () => {
            beforeEach(() => {
                testSubject = new EmailBillingComponentModel(contractAccountNumber, emailAddress, false, 1);
            });
            it('should compute all calculated properties correctly', () => {
                expect(testSubject.canChangeBillingPreference).toBeFalsy('testSubject.canChangeBillingPreference');
                expect(testSubject.isEmailBill).toBeFalsy('testSubject.isEmailBill');
                expect(testSubject.isBillingPreferenceBPayView).toBeFalsy('testSubject.isBillingPreferenceBPayView');
                expect(testSubject.isBillingPreferenceNA).toBeFalsy('testSubject.isBillingPreferenceNA');
                expect(testSubject.hasMultipleBusinessPartners).toBe(false, 'testSubject.hasMultipleBusinessPartners');
                expect(testSubject.modelSequenceId).toBe(1, 'testSubject.modelSequenceId');
            });
        });

        describe('When created with a bill delivery method of Postal', () => {
            beforeEach(() => {
                testSubject = new EmailBillingComponentModel(contractAccountNumber, emailAddress, true, 33, BillDeliveryMethodType.Postal);
            });
            it('should compute all calculated properties correctly', () => {
                expect(testSubject.canChangeBillingPreference).toBeTruthy('testSubject.canChangeBillingPreference');
                expect(testSubject.isEmailBill).toBeFalsy('testSubject.isEmailBill');
                expect(testSubject.isBillingPreferenceBPayView).toBeFalsy('testSubject.isBillingPreferenceBPayView');
                expect(testSubject.isBillingPreferenceNA).toBeFalsy('testSubject.isBillingPreferenceNA');
                expect(testSubject.hasMultipleBusinessPartners).toBe(true, 'testSubject.hasMultipleBusinessPartners');
                expect(testSubject.modelSequenceId).toBe(33, 'testSubject.modelSequenceId');
            });
        });

        describe('When created with a bill delivery method of Email', () => {
            beforeEach(() => {
                testSubject = new EmailBillingComponentModel(contractAccountNumber, emailAddress, false, 1, BillDeliveryMethodType.Email);
            });
            it('should compute all calculated properties correctly', () => {
                expect(testSubject.canChangeBillingPreference).toBeTruthy('testSubject.canChangeBillingPreference');
                expect(testSubject.isEmailBill).toBeTruthy('testSubject.isEmailBill');
                expect(testSubject.isBillingPreferenceBPayView).toBeFalsy('testSubject.isBillingPreferenceBPayView');
                expect(testSubject.isBillingPreferenceNA).toBeFalsy('testSubject.isBillingPreferenceNA');
            });
        });

        describe('When created with a bill delivery method of BPayView', () => {
            beforeEach(() => {
                testSubject = new EmailBillingComponentModel(contractAccountNumber, emailAddress, false, 1, BillDeliveryMethodType.BPayView);
            });
            it('should compute all calculated properties correctly', () => {
                expect(testSubject.canChangeBillingPreference).toBeFalsy('testSubject.canChangeBillingPreference');
                expect(testSubject.isEmailBill).toBeFalsy('testSubject.isEmailBill');
                expect(testSubject.isBillingPreferenceBPayView).toBeTruthy('testSubject.isBillingPreferenceBPayView');
                expect(testSubject.isBillingPreferenceNA).toBeFalsy('testSubject.isBillingPreferenceNA');
            });
        });

        describe('When created with a bill delivery method of NotApplicable', () => {
            beforeEach(() => {
                testSubject = new EmailBillingComponentModel(contractAccountNumber, emailAddress, false, 1, BillDeliveryMethodType.NotApplicable);
            });
            it('should compute all calculated properties correctly', () => {
                expect(testSubject.canChangeBillingPreference).toBeFalsy('testSubject.canChangeBillingPreference');
                expect(testSubject.isEmailBill).toBeFalsy('testSubject.isEmailBill');
                expect(testSubject.isBillingPreferenceBPayView).toBeFalsy('testSubject.isBillingPreferenceBPayView');
                expect(testSubject.isBillingPreferenceNA).toBeTruthy('testSubject.isBillingPreferenceNA');
            });
        });

        describe('When created with a Mandatory Ebilling', () => {
            beforeEach(() => {
                testSubject = new EmailBillingComponentModel(contractAccountNumber, emailAddress, false, 1, BillDeliveryMethodType.NotApplicable, true);
            });
            it('should compute all calculated properties correctly', () => {
                expect(testSubject.isEmailBill).toBeFalsy('testSubject.isEmailBill');
                expect(testSubject.isMandatoryEBilling).toBeFalsy('testSubject.isMandatoryEBilling');
            });
        });

    });

    describe('Valid Transition tests', () => {

        describe('After transitioning from Postal to In-Flight', () => {
            beforeEach(() => {
                testSubject = new EmailBillingComponentModel(contractAccountNumber, emailAddress, false, 1, BillDeliveryMethodType.Postal);
            });
            it('should the correct state', () => {
                testSubject.beginTransition();
                expect(testSubject.billingPreference).toBe(BillDeliveryMethodType.Postal, 'testSubject.billingPreference');
                expect(testSubject.indicatedBillingPreference).toBe(BillDeliveryMethodType.Email, 'testSubject.indicatedBillingPreference');
                expect(testSubject.inFlight).toBeTruthy('testSubject.inFlight');
                expect(testSubject.updateError).toBeUndefined('testSubject.updateError');
            });
        });

        describe('After transitioning from Email to In-Flight', () => {
            beforeEach(() => {
                testSubject = new EmailBillingComponentModel(contractAccountNumber, emailAddress, false, 1, BillDeliveryMethodType.Email);
            });
            it('should the correct state', () => {
                testSubject.beginTransition();
                expect(testSubject.billingPreference).toBe(BillDeliveryMethodType.Email, 'testSubject.billingPreference');
                expect(testSubject.indicatedBillingPreference).toBe(BillDeliveryMethodType.Postal, 'testSubject.indicatedBillingPreference');
                expect(testSubject.inFlight).toBeTruthy('testSubject.inFlight');
                expect(testSubject.updateError).toBeUndefined('testSubject.updateError');
            });
        });

        describe('After transitioning from In-Flight to Postal', () => {
            beforeEach(() => {
                testSubject = new EmailBillingComponentModel(contractAccountNumber, emailAddress, false, 1, BillDeliveryMethodType.Email);
            });
            it('should the correct state', () => {
                testSubject.beginTransition();
                testSubject.endTransition();
                expect(testSubject.billingPreference).toBe(BillDeliveryMethodType.Postal, 'testSubject.billingPreference');
                expect(testSubject.indicatedBillingPreference).toBe(BillDeliveryMethodType.Postal, 'testSubject.indicatedBillingPreference');
                expect(testSubject.inFlight).toBeFalsy('testSubject.inFlight');
                expect(testSubject.updateError).toBeUndefined('testSubject.updateError');
            });
        });

        describe('After transitioning from In-Flight to Email', () => {
            beforeEach(() => {
                testSubject = new EmailBillingComponentModel(contractAccountNumber, emailAddress, false, 1, BillDeliveryMethodType.Postal);
            });
            it('should the correct state', () => {
                testSubject.beginTransition();
                testSubject.endTransition();
                expect(testSubject.billingPreference).toBe(BillDeliveryMethodType.Email, 'testSubject.billingPreference');
                expect(testSubject.inFlight).toBeFalsy('testSubject.inFlight');
                expect(testSubject.updateError).toBeUndefined('testSubject.updateError');
            });
        });

        describe('After FAILING to transition from In-Flight to Postal', () => {
            beforeEach(() => {
                testSubject = new EmailBillingComponentModel(contractAccountNumber, emailAddress, false, 1, BillDeliveryMethodType.Email);
            });
            it('should transition to former state successfully', () => {
                testSubject.beginTransition();
                testSubject.failTransition();
                expect(testSubject.billingPreference).toBe(BillDeliveryMethodType.Email, 'testSubject.billingPreference');
                expect(testSubject.indicatedBillingPreference).toBe(BillDeliveryMethodType.Email, 'testSubject.indicatedBillingPreference');
                expect(testSubject.inFlight).toBeFalsy('testSubject.inFlight');
                expect(testSubject.updateError).toBeDefined('testSubject.updateError');
                expect(testSubject.updateError.alertType).toBe(AlertType.Error.toString(), 'testSubject.updateError.alertType');
                expect(testSubject.updateError.heading).toEqual('Well, that didn’t go to plan.', 'testSubject.updateError.heading');
                expect(testSubject.updateError.body).toEqual('Sorry, we couldn’t save your preference. Please give it another try.', 'testSubject.updateError.body');
            });
        });

        describe('After FAILING to transition from In-Flight to Email', () => {
            beforeEach(() => {
                testSubject = new EmailBillingComponentModel(contractAccountNumber, emailAddress, false, 1, BillDeliveryMethodType.Postal);
            });
            it('should transition to former state successfully', () => {
                testSubject.beginTransition();
                testSubject.failTransition();
                expect(testSubject.billingPreference).toBe(BillDeliveryMethodType.Postal, 'testSubject.billingPreference');
                expect(testSubject.indicatedBillingPreference).toBe(BillDeliveryMethodType.Postal, 'testSubject.indicatedBillingPreference');
                expect(testSubject.inFlight).toBeFalsy('testSubject.inFlight');
                expect(testSubject.updateError).toBeDefined('testSubject.updateError');
                expect(testSubject.updateError.alertType).toBe(AlertType.Error.toString(), 'testSubject.updateError.alertType');
                expect(testSubject.updateError.heading).toEqual('Well, that didn’t go to plan.', 'testSubject.updateError.heading');
                expect(testSubject.updateError.body).toEqual('Sorry, we couldn’t save your preference. Please give it another try.', 'testSubject.updateError.body');
            });
        });

    });

    describe('InValid Transition tests', () => {

        describe('Given initial billingPreference of undefined', () => {
            beforeEach(() => {
                testSubject = new EmailBillingComponentModel(contractAccountNumber, emailAddress, false, 1);
            });
            it('should not transition to any other state', () => {
                expect(() => testSubject.beginTransition()).toThrow(new Error('Can\'t transition'));
            });
        });

        describe('Given initial billingPreference of NotApplicable', () => {
            beforeEach(() => {
                testSubject = new EmailBillingComponentModel(contractAccountNumber, emailAddress, false, 1, BillDeliveryMethodType.NotApplicable);
            });
            it('should not transition to any other state', () => {
                expect(() => testSubject.beginTransition()).toThrow(new Error('Can\'t transition'));
            });
        });

        describe('Given initial billingPreference of BPayView', () => {
            beforeEach(() => {
                testSubject = new EmailBillingComponentModel(contractAccountNumber, emailAddress, false, 1, BillDeliveryMethodType.BPayView);
            });
            it('should not transition to any other state', () => {
                expect(() => testSubject.beginTransition()).toThrow(new Error('Can\'t transition'));
            });
        });

        describe('Given the state is not In-Flight', () => {
            beforeEach(() => {
                testSubject = new EmailBillingComponentModel(contractAccountNumber, emailAddress, false, 1, BillDeliveryMethodType.NotApplicable);
            });
            it('should not be able to transition', () => {
                expect(testSubject.inFlight).toBeFalsy();
                expect(() => testSubject.endTransition()).toThrow(new Error('Can\'t transition'));
            });
        });
    });

});
