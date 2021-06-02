/* tslint:disable:no-access-missing-member */
import { Component, Inject, Injector, OnDestroy, ViewChild } from '@angular/core';
import { ModalService } from './modal.service';

import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { PaymentContainerComponent } from '../../shared/component/payment/paymentContainer.component';
import { PaymentSuccessComponent } from '../../shared/component/payment/paymentSuccess.component';
import { StoreCreditCardFormComponent } from '../forms/storeCreditCardForm/storeCreditCardForm.component';
import { DeviceDetectorService } from '../../shared/service/deviceDetector.service';

const KEY_ESC = 27;

@Component({
    selector: 'agl-modal-confirm',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnDestroy {
    /**
     * Contains the defaults for the modal
     * @type {Object}
     */
    @ViewChild('confirmationModal') public _confirmElement;
    @ViewChild('aglModalExpand') public _modalElement;
    @ViewChild('cancelButton') public _cancelButton;
    @ViewChild('cancelButtonTopRight') public _cancelButtonTopRight;
    @ViewChild('okButton') public _okButton;
    @ViewChild('modalCheckBox') public _modalCheckBox;
    @ViewChild('backButtonTopLeft') public backButton;

    public title: string;
    public message: string;
    public cancelText: any;
    public okText: any;
    public class: string;
    public modalType: string;
    public componentData: Object;
    public modalTypeRemoveElement: boolean;
    public modalTypeRemovePaddingElement: boolean;
    public slantedBackground: boolean = false;
    public noButtons: boolean;
    public showCheckboxConfirmation = false;
    public isConfirmationChecked;

    public data: Object;
    public fullScreen: boolean;
    public dialogContainerClosable: Boolean;

    public _defaults = {
        title: '',
        message: 'An error has occurred within the application, please try again.',
        cancelText: '',
        okText: '',
        class: '',
        modalType: 'error',
        fullScreen: false,
        dialogContainerClosable: true
    };

    private locationSubscription: Subscription;

    constructor(
        modalService: ModalService,
        @Inject(Injector) injector: Injector,
        private location: Location,
        private deviceDetectorService: DeviceDetectorService
    ) {
        modalService.activate = this.activate.bind(this);
        modalService.close = this._hideDialog.bind(this);
        modalService.isModalOpen = this.isModalOpen.bind(this);
    }

    public ngOnDestroy() {
        this.cleanUpSubscriptions();
    }

    /*
     * Setlabels based on the options
     * @param  {Object} options is a object of options
     * @return {string} returns as a string to the front.
     */
    public _setLabels(options) {
        this.title = options.title === '' ? this._defaults.title : options.title;
        this.message = options.message;
        this.okText = options.okText === '' ? this._defaults.okText : options.okText;
        this.class = options.class === '' ? this._defaults.class : options.class;
        this.cancelText = options.cancelText === '' ? this._defaults.cancelText : options.cancelText;
        this.fullScreen = options.fullScreen || this._defaults.fullScreen;
    }

    /*
     * Activates the modal
     * @param  {Object} options is an object of options
     * @return {promise} returns a promise
     */
    public activate(options) {
        this._setLabels(options);
        if (options.showCheckboxConfirmation) {
            this.showCheckboxConfirmation = true;
            this.isConfirmationChecked = false;
        } else {
            this.showCheckboxConfirmation = false;
            this.isConfirmationChecked = true;
        }

        if (typeof options.dialogContainerClosable !== 'undefined') {
            this.dialogContainerClosable = options.dialogContainerClosable;
        }

        this.componentData = options.componentData;
        let promise = new Promise<boolean>((resolve) => {
            this._show(resolve, options.modalType, options.component);
        });
        return promise;
    }

    /*
     * Loads any component into the modal
     */
    public loadComponent(component, componentData?) {
        this.data = { component: component, data: componentData };
    }

    // ----------------------------------
    // --------LEGACY CODE BELOW---------
    // ----DO NOT FOLLOW THIS PATTERN----
    public loadBillingForm() {
        this.data = { component: PaymentContainerComponent, data: this.componentData };
    }

    public loadPaymentSuccessPayment() {
        this.data = { component: PaymentSuccessComponent, data: this.componentData };
        this.slantedBackground = true;
        this.modalTypeRemoveElement = true;
        this.noButtons = true;
    }

    public loadStoreCreditCardForm() {
        this.data = { component: StoreCreditCardFormComponent, data: this.componentData };
    }
    // --------LEGACY CODE ABOVE---------
    // ----DO NOT FOLLOW THIS PATTERN----
    // ----------------------------------

    /*
     * Hides the modal
     */
    public _hideDialog(browserBackButtonClicked: boolean = false) {

        // For non browser back closing of the dialog we need to clean up the top level history
        if (!browserBackButtonClicked && this.deviceDetectorService.historyPushStateSupported()) {
            this.location.back();
        }

        document.onkeyup = null;
        this._confirmElement.nativeElement.style.opacity = 0;
        setTimeout(() => this._confirmElement.nativeElement.style.zIndex = -1, 400);
        document.querySelector('body').removeAttribute('style');
        document.querySelector('html').removeAttribute('style');
        this._modalElement.nativeElement.style.transform = 'perspective(0px) scale(0)';
        // need to use queryselector instead of _cancelButton because this is how the class was added
        document.querySelector('#modal-close-button').classList.remove('colour-light');

        if (this._modalCheckBox) {
            this._modalCheckBox.checked = false;
        }
    }

    /*
     * checks whether a modal is currently open
     */
    public isModalOpen(): boolean {
        return this._confirmElement.nativeElement.style.opacity === '1';
    }

    /**
     * Adds a confirmation check to the modal.
     *
     * @memberof ModalComponent
     */
    public confirmationIsChecked() {
        this.isConfirmationChecked = !this.isConfirmationChecked;
    }

    /**
     * Shows the modal
     * @param  {boolean} resolve returns a bool for the resolve
     * @return {resolve} returns a resolve
     */
    private _show(resolve: (bool) => any, modalType: string, component: any) {
        document.onkeyup = null;
        document.querySelector('body').style.overflow = 'hidden';
        document.querySelector('body').style.position = 'relative';

        if (this.fullScreen) {
            document.querySelector('html').style.overflow = 'hidden';
        }

        let negativeOnClick = (e: any) => resolve(false);
        let positiveOnClick = (e: any) => resolve(true);

        if (!this._confirmElement || !this._cancelButton || !this._okButton || !this._modalElement) {
            return;
        }

        // Resets
        this.slantedBackground = false;
        this.modalTypeRemovePaddingElement = false;
        this.modalTypeRemoveElement = false;
        this.noButtons = false;
        let modalWrapperElement = document.getElementById('agl-modal-wrapper-id');
        modalWrapperElement.removeAttribute('style');
        this.cleanUpPaymentPage();

        if (modalType === 'error') {
            this.modalTypeRemoveElement = true;
        }

        if (modalType === 'emptyComponent') {
            this.modalTypeRemoveElement = true;
            this.modalTypeRemovePaddingElement = true;
            this.message = '';
            this.loadComponent(component, this.componentData);
        }

        if (modalType === 'component') {
            this.modalTypeRemoveElement = false;
            this.loadComponent(component, this.componentData);
        }

        // LEGACY ----------------------------
        if (modalType === 'componentForm') {
            this.modalTypeRemoveElement = false;
            this.loadBillingForm();
        }

        if (modalType === 'componentPaymentSuccess') {
            this.modalTypeRemoveElement = false;
            this.loadPaymentSuccessPayment();
        }

        if (modalType === 'componentStoreCreditCard') {
            this.modalTypeRemoveElement = false;
            this.loadStoreCreditCardForm();
        }
        // END LEGACY -------------------------

        this._confirmElement.nativeElement.style.opacity = 0;
        this._confirmElement.nativeElement.style.zIndex = 999;
        this._modalElement.nativeElement.style.transform = 'scale(0)';

        this._cancelButton.nativeElement.onclick = ((e: MouseEvent) => {
            e.preventDefault();
            if (!negativeOnClick(e)) {
                this._hideDialog();
            }
        });

        this._cancelButtonTopRight.nativeElement.onclick = ((e: MouseEvent) => {
            e.preventDefault();
            if (!negativeOnClick(e)) {
                this._hideDialog();
            }
        });

        this._okButton.nativeElement.onclick = ((e: MouseEvent) => {
            e.preventDefault();
            if (!positiveOnClick(e)) {
                this._hideDialog();
            }
        });

        this._confirmElement.nativeElement.onclick = (e: any) => {
            if (modalType === 'error' || modalType === 'failedLoadingComponent') {
                return;
            }
            if (this.dialogContainerClosable && e.target.id === 'dialog-container') {
                this._hideDialog();
                return negativeOnClick(null);
            }
        };

        document.onkeyup = (e: any) => {
            if (e.which === KEY_ESC) {
                this._hideDialog();
                return negativeOnClick(null);
            }
        };

        this._confirmElement.nativeElement.style.opacity = 1;
        this._modalElement.nativeElement.style.transform = 'perspective(1px) scale(1.0)';

        // Support browser back button by pushing an extra url into the browser history
        window.history.pushState(window.history.state, window.document.title, window.location.href);

        // Listen for navigation change (if the subscription doesn't already exist)
        if (!this.locationSubscription) {
            this.locationSubscription = <Subscription> this.location.subscribe(() => {
                this.cleanUpSubscriptions();
                this._hideDialog(true);
            });
        }
    }

    private cleanUpPaymentPage() {
        // Continuation of the hack to destroy this element from being generated multiple times.
        let paymentPageElement = document.getElementById('agl-payment-success');
        if (paymentPageElement) {
            paymentPageElement.remove();
            document.querySelector('#modal-close-button').removeAttribute('style');
        }
    }

    private cleanUpSubscriptions() {
        // Make sure that subscriptions are removed if the component is destroyed
        if (this.locationSubscription) {
            this.locationSubscription.unsubscribe();
            this.locationSubscription = undefined;
        }
    }
}
