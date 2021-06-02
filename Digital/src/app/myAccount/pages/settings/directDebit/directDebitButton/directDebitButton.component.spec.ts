import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { TestData } from '../../../../../shared/component/paymentArrangement/paymentArrangement.component.data';
import { DirectDebitButtonComponent } from './directDebitButton.component';

describe('Direct Debit button Component', () => {
    let sut: DirectDebitButtonComponent;
    let fixture: ComponentFixture<DirectDebitButtonComponent>;
    let de: DebugElement;
    let myWalletService: any = {
        getStoredPaymentMethods: () => {
            throw new Error('iMyWalletServiceStub.getStoredPaymentMethods has not been mocked properly.');
        },
        getValidPaymentMethods: (paymentMethods) => {
            throw new Error('iMyWalletServiceStub.getValidPaymentMethods has not been mocked properly.');
        },
        checkPendingPayments: () => {
            throw new Error('iMyWalletServiceStub.checkPendingPayments has not been mocked properly.');
        }
    };
    let modalService: any = {
        activate: (options: Object): Promise<boolean> => {
            throw new Error('modalService.activate has not been mocked properly.');
        }
    };
    let messageBusService: any = {
        broadcast: () => {
            throw new Error('messageBusService.broadcast has not been mocked properly.');
        }
    };
    let eRef: any = {};
    let paymentMethodService: any = {
        attachDirectDebitToPaymentMethod: () => {
            throw new Error('paymentMethodService.attachDirectDebitToPaymentMethod has not been mocked properly.');
        },
    };
    let stateService: any = {};

    let alertMessage: any = {};
    let accountService: any = {};
    let directDebitService: any = {};
    let switchDirectDebitResult: any = {};

    beforeEach(() => {
        sut = new DirectDebitButtonComponent(eRef,
            modalService,
            paymentMethodService,
            alertMessage,
            messageBusService,
            myWalletService,
            accountService,
            directDebitService,
            switchDirectDebitResult,
            stateService);
    });

    it('should open a modal when adding payment method', () => {
        spyOn(messageBusService, 'broadcast');
        spyOn(modalService, 'activate').and.returnValue(Promise.resolve(false));

        sut.addPaymentMethod('345345');

        expect(modalService.activate).toHaveBeenCalled();
    });

    it('should open a modal when switching payment method', () => {
        sut.hasPaypalSetUp = true;
        sut.storedPaymentMethods = TestData.myWalletViewModels;
        spyOn(messageBusService, 'broadcast');
        spyOn(modalService, 'activate').and.returnValue(Promise.resolve(false));
        spyOn(paymentMethodService, 'attachDirectDebitToPaymentMethod').and.returnValue(Observable.of({}));

        sut.switchPaymentMethod(TestData.myWalletViewModels[0]);

        expect(modalService.activate).toHaveBeenCalled();
    });

    it('hasSavedPaymentMethodInWallet should return true when storedPaymentMethods is not empty', () => {
        sut.storedPaymentMethods = TestData.myWalletViewModels;

        let hasSavedPaymentMethodInWallet = sut.hasSavedPaymentMethodInWallet();

        expect(hasSavedPaymentMethodInWallet).toBeTruthy();
    });

    it('should toggle the visibility correctly', () => {
        let randomBoolean = Math.random() >= 0.5;
        sut.isShowOption = randomBoolean;

        sut.toggleOption();

        expect(sut.isShowOption).not.toBe(randomBoolean);
    });
});
