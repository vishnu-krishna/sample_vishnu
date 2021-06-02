import { Observable } from 'rxjs/Observable';
import { DeleteDirectDebitComponent } from './deleteDirectDebit.component';
import { PaymentArrangementSettingsViewModel } from '../../../../../shared/component/paymentArrangement/paymentArrangement.settings.service';
import { PaymentArrangementPaymentMethodModel } from '../../../../../shared/model/domain/paymentArrangement/paymentArrangementData.model';
import { PaymentArrangementType } from '../../../../common/enums';
import { PaymentMethod } from '../../../../services/settings/model/paymentMethod';
import { AccountDetailComponentModel } from '../../../../settings/accountDetail/accountDetail.component';

describe('Delete Direct Debit Component', () => {
    let sut: DeleteDirectDebitComponent;
    let paymentMethodsService: any = {
        removePaymentArrangementFromPaymentMethod: () => {
            throw new Error('paymentMethodsService.removePaymentArrangementFromPaymentMethod has not been mocked properly.');
        },
        attachPaymentArrangementToPaymentMethod: () => {
            throw new Error('paymentMethodsService.attachPaymentArrangementToPaymentMethod has not been mocked properly.');
        }
    };
    let messageBusService: any = {
        broadcast: () => {
            throw new Error('messageBusService.broadcast has not been mocked properly.');
        }
    };
    let modalService: any = {
        close: () => {
            throw new Error('modalService.close has not been mocked properly.');
        }
    };
    let stateService: any = {
        updateStarted: () => {
            //
        },
        updateCompleted: () => {
            //
        },
        isUpdatingAccount: () => {
            return false;
        }
    };

    let paymentMethodService: any = {};
    let deletePaymentArrangementResult: any = {};
    let switchPaymentArrangementResult: any = {};

    beforeEach(() => {
        sut = new DeleteDirectDebitComponent(modalService, paymentMethodsService, messageBusService, deletePaymentArrangementResult, switchPaymentArrangementResult, stateService);
    });

    it('should call the correct api when removing direct debit', () => {
        sut.paymentArrangementSettingsViewModel = new PaymentArrangementSettingsViewModel();
        sut.paymentArrangementSettingsViewModel.accountDetailModel = new AccountDetailComponentModel();
        sut.paymentArrangementSettingsViewModel.accountDetailModel.contractAccountNumber = '0';
        sut.paymentArrangementSettingsViewModel.paymentArrangementPaymentMethodModel = new PaymentArrangementPaymentMethodModel(new PaymentMethod(), PaymentArrangementType.DirectDebit);
        sut.accountDetailModel = new AccountDetailComponentModel();

        spyOn(paymentMethodsService, 'removePaymentArrangementFromPaymentMethod').and.returnValue(Observable.of(null));
        spyOn(messageBusService, 'broadcast');
        spyOn(modalService, 'close');

        sut.removePaymentArrangement(PaymentArrangementType.DirectDebit);

        expect(paymentMethodsService.removePaymentArrangementFromPaymentMethod).toHaveBeenCalled();
        expect(messageBusService.broadcast).toHaveBeenCalled();
        expect(modalService.close).toHaveBeenCalled();
    });

    it('should call the correct api when changing direct debit', () => {
        sut.paymentArrangementSettingsViewModel = new PaymentArrangementSettingsViewModel();
        sut.paymentArrangementSettingsViewModel.accountDetailModel = new AccountDetailComponentModel();
        sut.paymentArrangementSettingsViewModel.accountDetailModel.contractAccountNumber = '0';
        sut.accountDetailModel = new AccountDetailComponentModel();

        spyOn(paymentMethodsService, 'attachPaymentArrangementToPaymentMethod').and.returnValue(Observable.of(null));
        spyOn(messageBusService, 'broadcast');
        spyOn(modalService, 'close');

        sut.changePaymentMethod(PaymentArrangementType.DirectDebit);

        expect(paymentMethodsService.attachPaymentArrangementToPaymentMethod).toHaveBeenCalled();
        expect(messageBusService.broadcast).toHaveBeenCalled();
        expect(modalService.close).toHaveBeenCalled();
    });

    it('should return the correct value for isAccountWithMultiAddresses', () => {
        sut.accountDetailModel = new AccountDetailComponentModel();
        sut.accountDetailModel.supplyAddresses = ['first address', 'second address'];
        sut.accountDetailModel.supplyAddresses = ['first address', 'second address'];

        let isAccountWithMulti = sut.isAccountWithMultiAddresses();

        expect(isAccountWithMulti).toBeTruthy();
    });

    it('should change the messages in the Modal -switch DD -single CA - has BA or CC setup ', () => {
        sut.isSwitchingPaymentArrangements = true;
        let pm = new PaymentArrangementPaymentMethodModel(new PaymentMethod(), PaymentArrangementType.DirectDebit);
        pm.paymentMethodType = 'bank';
        pm.reference = 'xxxx xxxx xxxx 5100';
        sut.paymentArrangementPaymentMethodModel = pm;
        sut.paymentMethodReference = 'Visa xxxx 1111';
        sut.getMessage();

        expect(sut.keepButtonText).toMatch('keep payment method');
        expect(sut.deleteButtonText).toMatch('change payment method');
        expect(sut.title).toMatch(`Are you sure you'd like to change your payment method for Direct Debit?`);
        expect(sut.description).toMatch(`We'll continue to store your existing payment method, Bank Account ending in 5100, in My Wallet. You can access My Wallet anytime to remove it.`);
    });

    it('should change the messages in the Modal -switch DD -single CA - has paypal setup ', () => {
        sut.isSwitchingPaymentArrangements = true;
        let pm = new PaymentArrangementPaymentMethodModel(new PaymentMethod(), PaymentArrangementType.DirectDebit);
        pm.paymentMethodType = 'PayPal';
        sut.paymentArrangementPaymentMethodModel = pm;
        sut.paymentMethodReference = 'Visa xxxx 1111';
        sut.paymentArrangementPaymentMethodModel.reference = 'test@gmail.com';
        sut.getMessage();

        expect(sut.keepButtonText).toMatch('keep paypal');
        expect(sut.deleteButtonText).toMatch('change payment method');
        expect(sut.title).toMatch(`Are you sure you'd like to change your payment method for Direct Debit?`);
        expect(sut.description).toMatch(`Your test@gmail.com PayPal account will be removed. If you want to use PayPal in the future, it's easy to set it up again.`);
    });
    it('should change the messages in the Modal -cancel DD -single CA - has BA or CC setup ', () => {
        sut.isSwitchingPaymentArrangements = false;
        let pm = new PaymentArrangementPaymentMethodModel(new PaymentMethod(), PaymentArrangementType.DirectDebit);
        pm.paymentMethodType = 'bank';
        sut.paymentArrangementPaymentMethodModel = pm;
        sut.paymentMethodReference = 'Visa xxxx 1111';
        sut.paymentArrangementPaymentMethodModel.reference = 'xxxx xxxx xxxx 5100';
        sut.getMessage();

        expect(sut.showMessage).toBeTruthy();
        expect(sut.keepButtonText).toMatch('Keep Direct Debit');
        expect(sut.deleteButtonText).toMatch('Cancel Direct Debit');
        expect(sut.title).toMatch(`Are you sure you'd like to cancel Direct Debit?`);
        expect(sut.description).toMatch(`We'll continue to store your existing payment method, Bank Account ending in 5100, in My Wallet. You can access My Wallet anytime to remove it.`);
    });

    it('should change the messages in the Modal -cancel DD -single CA - has paypal setup ', () => {
        sut.isSwitchingPaymentArrangements = false;
        let pm = new PaymentArrangementPaymentMethodModel(new PaymentMethod(), PaymentArrangementType.DirectDebit);
        pm.paymentMethodType = 'PayPal';
        sut.paymentArrangementPaymentMethodModel = pm;
        sut.paymentMethodReference = 'Visa xxxx 1111';
        sut.paymentArrangementPaymentMethodModel.reference = 'test@gmail.com';
        sut.getMessage();

        expect(sut.showMessage).toBeTruthy();
        expect(sut.keepButtonText).toMatch('keep paypal and direct debit');
        expect(sut.deleteButtonText).toMatch('Remove paypal and direct debit');
        expect(sut.title).toMatch(`Are you sure you want to cancel your Direct Debit for test@gmail.com PayPal account`);
        expect(sut.description).toMatch(`Your test@gmail.com PayPal account will be removed. If you want to use PayPal in the future, it's easy to set it up again.`);
    });

    it('should change the messages in the Modal -cancel DD -multi CA - has BA or CC setup ', () => {
        sut.isSwitchingPaymentArrangements = false;
        let pm = new PaymentArrangementPaymentMethodModel(new PaymentMethod(), PaymentArrangementType.DirectDebit);
        pm.paymentMethodType = 'bank';
        pm.reference = 'xxxx xxxx xxxx 5100';
        sut.paymentArrangementPaymentMethodModel = pm;
        sut.paymentMethodReference = 'Visa xxxx 1111';
        sut.isMultiAccount = true;
        sut.getMessage();
        expect(sut.title).toMatch(`Are you sure you'd like to cancel Direct Debit? for this address?`);
    });
    it('should change the messages in the Modal -cancel DD -multi CA - paypalsetup ', () => {
        sut.isSwitchingPaymentArrangements = false;
        let pm = new PaymentArrangementPaymentMethodModel(new PaymentMethod(), PaymentArrangementType.DirectDebit);
        pm.paymentMethodType = 'paypal';
        sut.paymentArrangementPaymentMethodModel = pm;
        sut.paymentMethodReference = 'Visa xxxx 1111';
        sut.paymentArrangementPaymentMethodModel.reference = 'test@gmail.com';
        sut.isMultiAccount = true;
        sut.getMessage();
        expect(sut.title).toMatch(`Are you sure you'd like to cancel Direct Debit for this address?`);
    });

    it('should change the messages in the Modal -switch DD -multi CA - has BA or CC setup ', () => {
        sut.isSwitchingPaymentArrangements = true;
        let pm = new PaymentArrangementPaymentMethodModel(new PaymentMethod(), PaymentArrangementType.DirectDebit);
        pm.paymentMethodType = 'bank';
        sut.paymentArrangementPaymentMethodModel = pm;
        sut.paymentMethodReference = 'Visa xxxx 1111';
        sut.paymentArrangementPaymentMethodModel.reference = 'test@gmail.com';
        sut.isMultiAccount = true;
        sut.getMessage();
        expect(sut.title).toMatch(`Are you sure you'd like to change your payment method for Direct Debit for this address:`);
    });

    it('should change the messages in the Modal -switch DD -multi CA -has paypal setup ', () => {
        sut.isSwitchingPaymentArrangements = true;
        let pm = new PaymentArrangementPaymentMethodModel(new PaymentMethod(), PaymentArrangementType.DirectDebit);
        pm.paymentMethodType = 'paypal';
        sut.paymentArrangementPaymentMethodModel = pm;
        sut.paymentMethodReference = 'Visa xxxx 1111';
        sut.paymentArrangementPaymentMethodModel.reference = 'test@gmail.com';
        sut.isMultiAccount = true;
        sut.getMessage();
        expect(sut.title).toMatch(`Are you sure you'd like to change your payment method for Direct Debit for this address:`);
    });

});
