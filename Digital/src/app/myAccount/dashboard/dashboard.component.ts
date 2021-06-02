import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { PaymentMethods } from '../../shared/globals/paygConstants';
import { ReceiptDetail } from '../../shared/model/domain/receiptDetail.model';
import { PaymentDetails } from '../../shared/model/payment/paymentDetails.model';
import * as api from '../../shared/service/api.service';
import { ConfigService } from '../../shared/service/config.service';
import { ContentService } from '../../shared/service/content.service';
import { DeviceDetectorService } from '../../shared/service/deviceDetector.service';
import { Now } from '../../shared/service/now.service';
import { PaypalApiService } from '../../shared/service/paypalApi.service';
import { ModalService } from '../modal/modal.service';
import { AccountViewModel, ContractViewModel, IAccountServiceMA } from '../services/account.service';
import { ISsmrService } from '../services/contract/issmr.service';
import { IUrlService } from '../services/contract/iurl.service';
import { FeatureFlagService, FeatureFlagTypes } from '../services/featureFlag.service';

declare let leanengage: any;

@Component({
    selector: 'agl-account-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    public decisioningEnabled: boolean = false;
    public marketingTileEnabled: boolean = false;

    public accounts: AccountViewModel[];
    public browserClass: string;
    public loadedAccount: string = 'notloaded';
    public payPalModal: string = 'notvisible';
    public loadedContent: Boolean = false;
    public loadedContentSub: any;
    public groupedAccounts: Boolean = false;
    public isContractAccountRestricted: Boolean;
    public solarCheckFeatureEnabled: boolean = false;
    public ssmrFeatureEnabled: boolean = true;
    public allContractsAreRestricted: boolean = true;
    private sub: any;

    /**
     * Creates an instance of DashboardComponent.
     * @param {PaypalApiService} _paypalApi
     * @param {ConfigService} _config
     * @param {DeviceDetectorService} _device
     * @param {Router} _router
     * @param {ModalService} _confirmService
     * @param {IAccountServiceMA} _accountsService
     * @param {ApiService} _api
     * @param {ContentService} _contentService
     * @param {Now} _now
     * @param {FeatureFlagService} _featureService
     */
    constructor(
        private _paypalApi: PaypalApiService,
        private _config: ConfigService,
        private _device: DeviceDetectorService,
        private _router: Router,
        private _confirmService: ModalService,
        private _accountsService: IAccountServiceMA,
        private _api: api.ApiService,
        private _contentService: ContentService,
        private _now: Now,
        private _featureService: FeatureFlagService,
        private _ssmrService: ISsmrService,
        private _urlService: IUrlService
    ) {
        if (_device.isIE) {
            this.browserClass = 'ie';
        }
    }

    /**
     * Mocks leanEngage
     */
    public mockLeanEngage() {
        // tslint:disable-next-line:only-arrow-functions
        let userId = Array.apply(0, Array(15)).map(function() {
            // tslint:disable-next-line:only-arrow-functions
            return (function(charset) {
                return charset.charAt(Math.floor(Math.random() * charset.length));
            }('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'));
        }).join('');

        let leanAppId = this._config.current.leanEngageAppId;

        leanengage('start', { user_id: userId, name: 'Automated Test', app_id: leanAppId });
        leanengage('triggerSurvey', 'my-account-v2-survey-pay-now');
    }

    /**
     * Runs the getPendingPayments API (currently) to get the pending payments then
     * subsequently runs the account service for the account data and then resets
     * the accounts to the updated view
     */
    public showApiData() {
        this._accountsService.refreshAccounts().subscribe((data) => {
            this.accounts = data; // Update data.
        });
    }

    /**
     * Check accounts, checks if its grouped account or needs a tip panel.
     * @memberOf DashboardComponent
     */
    public checkAccounts() {
        // More than 1 contract when you have a single account then don't make the accounts group.
        // 2 accounts 1 contract each, then group accounts.
        if (this.accounts.length >= 2) {
            for (let account of this.accounts) {
                if (account.contracts.length >= 2) {
                    this.groupedAccounts = false;
                    return;
                } else {
                    this.groupedAccounts = true;
                }
            }
        }
    }

    /**
     * Check Contract Account to see if all Accounts are restricted.
     */
    public checkForRestrictedContractAccount() {
        for (let account of this.accounts) {
            if (account.allContractsAreRestricted) {
                this.isContractAccountRestricted = true;
            } else {
                return this.isContractAccountRestricted = false;
            }
        }
    }

    public isButtonStackReadOnly(): boolean {
        // If all contracts in all accounts are restricted
        // present buttonStack as read only.
        if (!this.accounts) { return true; }
        let restrictedAccountCount =
            this.accounts
                .map((account) => account.allContractsAreRestricted)
                .reduce((accumulator: number, allContractsAreRestrictedFlag: boolean) => {
                    return accumulator + (allContractsAreRestrictedFlag ? 1 : 0);
                }, 0);
        let result = (restrictedAccountCount > 0 && restrictedAccountCount === this.accounts.length);
        return result;
    }

    // This ensures on refresh it only updates new/modified accounts.
    public trackById(index, item) {
        return item.number;
    }

    public ngOnInit() {
        this._contentService.contentLoaded.subscribe((data) => {
            this.loadedContent = data;
        });
        this._accountsService.getAccounts().subscribe((accounts) => {
            this.accounts = accounts;
            this.loadedAccount = 'loaded';
            this.checkAccounts();
            this.checkForRestrictedContractAccount();
        });
        // This is to check if all the accounts are inactive and if so hide certain section that leads to SSMR.
        this._accountsService.areAllAccountContractsRestricted().subscribe((result) => {
            this.allContractsAreRestricted = result;
        });

        this._featureService
            .featureFlagged(FeatureFlagTypes.ssmrEnabled)

            .subscribe(
            (result: boolean) => {
                this.ssmrFeatureEnabled = result;
            }
            );

        this._featureService.featureFlagged(FeatureFlagTypes.solarCheckEnabled).subscribe(
            (featureIsEnabled: boolean) => {
                this.solarCheckFeatureEnabled = featureIsEnabled;
            }
        );

        this._featureService.featureFlagged(FeatureFlagTypes.decisioningEnabled).subscribe(
            (featureIsEnabled: boolean) => {
                this.decisioningEnabled = featureIsEnabled;
                this.marketingTileEnabled = !this.decisioningEnabled;
            }
        );
        /**
         * This checks the router then will pop a modal for paypal
         * @type {Observable}
         */
        this.sub = this._router
            .routerState
            .root
            .queryParams
            .subscribe((params) => {
                let options: any = params;

                if (options.mockPaypalData === 'true') {
                    let mockContent = {
                        cart: '6BU13589YH040135C',
                        payer: {
                            payer_info: {
                                email: 'test@test.com'
                            }
                        },
                        transactions: [
                            {
                                description: 'Payment for Electricity bill at 32 Brewery Ln, North Willoughby, Sydney, NSW 2023',
                                amount: {
                                    total: '100.07'
                                }
                            }
                        ]
                    };

                    // Set flag to loaded.
                    this.payPalModal = 'visible';

                    // Fake payment details
                    let paymentDetails = new PaymentDetails();
                    paymentDetails.fuelType = 'Electricty';
                    paymentDetails.address = '1 Test Road';
                    paymentDetails.contractNumber = '12345';
                    paymentDetails.referenceNumber = '123456789';
                    paymentDetails.amount = '107.69';

                    // Fake receipt
                    let receiptDetail = new ReceiptDetail();
                    receiptDetail.paymentDate = this._now.date().format('DD MMM YYYY');
                    receiptDetail.paymentAmount = parseFloat('107.69');
                    receiptDetail.receiptNumber = '12345678910111213';
                    receiptDetail.paymentMethod = PaymentMethods.Paypal;
                    paymentDetails.receiptDetail = receiptDetail;

                    this._confirmService.activate(
                        {
                            title: '',
                            cancelText: '',
                            okText: '',
                            modalType: 'componentPaymentSuccess',
                            component: 'agl-payment-success',
                            fullScreen: true,
                            componentData: { paymentDetails: paymentDetails, emailAddress: 'test@test.com' }
                        }
                    ).then(
                        (res) => this.mockLeanEngage()
                        );
                }
                // Returning when user clicks the cancel to avoid displaying payment failure popup modal
                if (options.cancelpp === 'true') {
                    this.removeHistory();
                    return;
                } else if (options.successpp === 'true') {
                    let payerId = options.PayerID;
                    let paymentId = options.paymentId;
                    this.payPalModal = 'visible';

                    this.callExecutePayment(payerId, paymentId);
                }
            });
    }

    public popupSsmrModal(deeplinkAction: string) {
        if (deeplinkAction === 'meterread') {
            this.hasBasicMeter().subscribe((hasBasicMeter: boolean) => {
                if (hasBasicMeter) {
                    this._ssmrService.showModal();
                    this._urlService.observeOneUrlChange().subscribe(() => { this._ssmrService.onClickClose(); });
                } else {
                    this._router.navigate(['/usage/meterreadcheck']);
                }
            });
        }
    }

    public generateBillSmoothingTooltip(contract: ContractViewModel): string {
        if (contract.isBillSmoothingV2) {
            let amount = contract.paymentScheme.nextPayment ? contract.paymentScheme.nextPayment.amount : contract.paymentScheme.previousPayment.amount;
            let frequency = contract.paymentScheme.frequency.toLowerCase();
            if (contract.isDirectDebit) {
                return `This is just an indication of your energy use. You’re on Bill Smoothing, so don’t worry too much about this. Your ${frequency} payments of $${amount} will be debited automatically.`;
            }
            return `This is an indication of your monthly energy use. You’re on Bill Smoothing, so don’t worry too much about this. You just need to continue making your ${frequency} payments of $${amount}.`;
        }
        return '';
    }

    public hasBasicMeter(): Observable<boolean> {
        return this._accountsService.getAccounts().map((accounts: AccountViewModel[]) => {
            const hasBasicMeter = accounts.some((account: AccountViewModel) => {
                return account.contracts.some((contract: ContractViewModel) => {
                    return !contract.isSmartMeter;
                });
            });

            return hasBasicMeter;
        });
    }

    private removeHistory() {
        history.replaceState({}, document.title, '.' + '/overview');
    }

    private callExecutePayment(payerId: string, paymentId: string) {
        this._paypalApi.executePayment(paymentId, payerId).subscribe((content: any) => {
            // Set flag to loaded. More information at DSP-
            this.payPalModal = 'visible';
            let paymentDetails = new PaymentDetails();
            let savedDetails: any = JSON.parse(localStorage.getItem('selfService.payPal'));
            paymentDetails.fuelType = savedDetails.fuelType;
            paymentDetails.address = savedDetails.address;
            paymentDetails.contractNumber = savedDetails.contractNumber;
            paymentDetails.isPayg = savedDetails.isPayg;
            paymentDetails.prePaymentDate = savedDetails.prePaymentDate;
            paymentDetails.showOutstandingBillPayg = savedDetails.showOutstandingBillPayg;
            if (savedDetails.paygBand && savedDetails.paygBand != null) {
                paymentDetails.paygBand = parseInt(savedDetails.paygBand, 10);
            }
            paymentDetails.referenceNumber = savedDetails.referenceNumber;
            let receiptDetail = new ReceiptDetail();
            receiptDetail.paymentDate = this._now.date().format('DD MMM YYYY');
            receiptDetail.paymentAmount = parseFloat(content.transactions[0].amount.total);
            receiptDetail.bonusAmount = savedDetails.bonusAmount;
            receiptDetail.receiptNumber = content.cart;
            receiptDetail.paymentMethod = PaymentMethods.Paypal;
            paymentDetails.receiptDetail = receiptDetail;

            this._confirmService.activate(
                {
                    title: '',
                    cancelText: '',
                    okText: '',
                    modalType: 'componentPaymentSuccess',
                    component: 'agl-payment-success',
                    fullScreen: true,
                    componentData: { paymentDetails: paymentDetails, emailAddress: content.payer.payer_info.email }
                }
            ).then(
                (res) => {
                    if (localStorage.getItem('appContainer') && localStorage.getItem('appContainer').toLowerCase() === 'mock') {
                        this.mockLeanEngage();
                    } else {
                        if (paymentDetails.isPayg) {
                            leanengage('triggerSurvey', 'my-account-v2-survey-pay-now', { customData: { version: 'payg' } });
                        } else {
                            leanengage('triggerSurvey', 'my-account-v2-survey-pay-now', { customData: { version: 'non-payg' } });
                        }
                    }
                }
                );
            this.removeHistory();
        },
            (error) => {
                this._confirmService.activate(
                    {
                        title: 'Payment Failure',
                        message: `<p>Unfortunately your payment could not be processed at this time. Please try again.</p>`,
                        cancelText: 'Close',
                        okText: '',
                        modalType: 'error'
                    }
                );
                this.removeHistory();
            });
    }
}
