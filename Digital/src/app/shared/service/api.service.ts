import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import clone from 'lodash-es/clone';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { ModalService } from '../../myAccount/modal/modal.service';
import { BillSmoothingAccountsViewModel } from '../../myAccount/pages/settings/billSmoothing/billSmoothing.model';
import { IPaymentSchemeApi, InstalmentPlanStatus, PaymentArrangementInstalmentPlans } from '../../myAccount/services/paymentScheme/paymentSchemeApi.service';
import { SsmrScreenCode } from '../../myAccount/services/ssmr.service';
import { CreatePaymentMethodRequest } from '../../myAccount/services/storedPaymentsApi/model/createPaymentMethodRequest';
import * as ApiModel from '../model/api.model';
import { PaymentSimpleModel } from '../model/billSmoothing/paymentSimple.model';
import { BonusEligible } from '../model/payment/bonusEligible.model';
import { PaymentDetailsApiModel } from '../model/payment/paymentApi.model';
import { PrePaymentBalance } from '../model/product/prePaymentBalance.model';
import { UsageDataModel } from '../model/usage/usageData.model';
import { UsageGranularity } from '../model/usage/usageGranularity.model';
import { IApiRepository } from '../repository/contract/iapi.repository';
import { IApiv2Repository } from '../repository/contract/iapiv2.repository';
import { IPaymentApiRepository } from '../repository/contract/ipaymentapi.repository';
import { Guid } from '../utils/guid';
import { ConfigService } from './config.service';
import { IApiService } from './contract/iapi.service';

/**
 * An HTTP client service for consumption of the AGL Web API.
 * Encapsulates the HTTP transportation mechanism and applies common configuration
 * requirements such as JSON serialisation and deserialisation.
 */
@Injectable()
export class ApiService implements IApiService {

    /**
     * Provides a replay subject for loaded
     */
    public allContentLoaded: ReplaySubject<boolean> = new ReplaySubject(1);
    public contactLoadedStatus: ReplaySubject<string> = new ReplaySubject<string>(1);
    public businessPartnerNumber: string[] = [];
    public accountLoadedStatus: ReplaySubject<string> = new ReplaySubject<string>(1);
    public accountNumber: number[] = [];
    protected isAllSyncComplete: boolean = false;
    protected _baseUrl: string = this._config.current.aglWebApiBaseUrl;
    protected _errors: Subject<any> = new Subject<any>();
    protected maxPollingIndex: number;
    protected pollingIntervalMs: number;
    protected pollSyncStatusIndex: number = 0;
    protected pollSyncStatusIntervalId: any;
    protected siteCoreUrl: string = this._config.current.aglSiteCoreWebsiteBaseUrl;
    protected sourcePlatformKey: string = 'source';
    protected sourcePlatformValue: string = 'Web';

    /**
     * API data synchronisation status trackers for each available data group
     */
    private _syncStatus: any = {
        Account: new ReplaySubject<ApiModel.SyncStatus>(1),
        BillingHistory: new ReplaySubject<ApiModel.SyncStatus>(1),
        Dashboard: new ReplaySubject<ApiModel.SyncStatus>(1),
        Payments: new ReplaySubject<ApiModel.SyncStatus>(1),
        Usage: new ReplaySubject<ApiModel.SyncStatus>(1)
    };

    /**
     * Provides a stream of HTTP errors that other parts of the application can listen to.
     */
    public get errors(): Subject<any> {
        return this._errors;
    }

    private _isSyncing: boolean = false;

    /**
     * Creates an instance of ApiService.
     */
    constructor(
        private _http: Http,
        private _apiRepository: IApiRepository,
        private _config: ConfigService,
        private _modalService: ModalService,
        private _apiv2Repository: IApiv2Repository,
        private _paymentApiRepository: IPaymentApiRepository,
        private _paymentSchemeApi: IPaymentSchemeApi
    ) {

        this._apiRepository.errors.subscribe((err) => {
            this._errors.next(err);
        });
        this.pollingIntervalMs = this._config.current.aglWebApiSyncPollingIntervalMs;
        this.maxPollingIndex = Math.round(this._config.current.aglWebApiSyncPollingTimeOutMs / this.pollingIntervalMs);
    }

    /**
     * Invoke the AGL Web API /dashboard endpoint.
     */
    public getDashboard(): Observable<ContractDetailApiModel[]> {
        return this._apiRepository.get<ContractDetailApiModel[]>('/api/v1/dashboard', this._syncStatus.Dashboard, true, true).catch((err) => {
            return Observable.of([]);
        });
    }

    public getUsage(granularity: UsageGranularity, startDate: Date, endDate: Date): Observable<UsageDataModel[]> {
        let searchParams = new URLSearchParams();
        searchParams.append('startDate', startDate.toISOString());
        searchParams.append('endDate', endDate.toISOString());
        searchParams.append('includeEstimatedReads', 'true');
        return this._apiRepository.get<UsageDataModel[]>(`/api/v1/usage/${granularity}`, this._syncStatus.Usage, true, true, searchParams);
    }

    /**
     * Invoke the AGL Web API /accounts/list endpoint.
     */
    public getAccounts(): Observable<AccountApiModel[]> {
        let searchParams = new URLSearchParams();
        searchParams.append('includeInFlight', 'true');
        return this._apiRepository.get<AccountApiModel[]>('/api/accounts/list', this._syncStatus.Account, true, true, searchParams);
    }

    /**
     * Invoke the AGL Web API /bills endpoint.
     */
    public getBills(): Observable<BillHistoryApiModel[]> {
        return this._apiRepository.get<BillHistoryApiModel[]>('/api/v1/bills', this._syncStatus.BillingHistory, true, true);
    }

    /**
     * Invoke the AGL Web API /payments endpoint
     * @return {Observable<PaymentApiModel[]>}
     */
    public getPayments(): Observable<PaymentApiModel[]> {
        return this._apiRepository.get<PaymentApiModel[]>('/api/v1/payments', this._syncStatus.Payments, false, true).catch((err) => {
            return Observable.of([]);
        });
    }

    public sendPaymentEmail(data: EmailReceiptRequestModel): Observable<boolean> {
        return this._apiRepository.post({
            endpoint: '/api/v1/payments/emailreceipt',
            isJson: false,
            body: data,
            useCache: false
        });
    }

    /**
     * Invoke the AGL Web API /pendingpayments endpoint
     * @return {Observable<PendingPaymentApiModel[]>}
     */
    public getPendingPayments(): Observable<PendingPaymentApiModel[]> {
        return this._apiRepository.get<PendingPaymentApiModel[]>('/api/v1/pendingpayments', this._syncStatus.Payments, false, true);
    }

    /**
     * Invoke the AGL Web API /pendingpayments endpoint POST
     * @return {Observable<PendingPaymentApiModel[]>}
     */
    public postPendingPayments(data): Observable<PendingPaymentApiModel[]> {
        return this._apiRepository.post<PendingPaymentApiModel[]>({
            endpoint: '/api/v1/pendingpayments',
            isJson: false,
            body: data,
            useCache: false
        });
    }

    /**
     * Invoke the AGL Web API v2 /contracts/{contractNumber}/prePaymentBalance endpoint
     * @return {Observable<PrePaymentBalance>}
     */
    public getPrePaymentBalance(contractNumber: string): Observable<PrePaymentBalance> {
        return this._apiv2Repository.get<PrePaymentBalance>('/v2/contracts/' + contractNumber + '/prepaymentbalance', false, true).catch((err) => {
            return Observable.of(null);
        });
    }

    /**
     * Invoke the AGL Web API v2 /contracts/{contractNumber}/prePaymentBalance endpoint
     * @return {Observable<BonusEligible>}
     */
    public getBonusEligible(contractNumber: string, paymentAmount: number): Observable<BonusEligible> {
        return this._apiv2Repository.get<BonusEligible>('/v2/contracts/' + contractNumber + '/payments/' + paymentAmount + '/productBonusEligibility', false, true).catch((err) => {
            return Observable.of(null);
        });
    }

    /**
     * Invoke the AGL Web API v2 /contactdetail endpoint
     * @return {Observable<ContactDetail>}
     */
    public getContactDetail(): Observable<ContactDetailModel> {
        return this._apiv2Repository.get<ContactDetailModel>('/v2/contactdetail', false, true);
    }

    /**
     * Invoke the AGL Web API v2 /businessPartners endpoint
     * @return {Observable<boolean>}
     */
    public updateContactDetail(currentDetails: BusinessPartnerModel, updatedDetails: BusinessPartnerModel): Observable<boolean> {
        let patchBody: ApiModel.PatchDocument[] = [];

        if (updatedDetails.mobile) {
            this.appendAlteredPatchDocumentValues(patchBody, '/mobile', currentDetails.mobile, updatedDetails.mobile);
        }
        if (updatedDetails.email) {
            this.appendAlteredPatchDocumentValues(patchBody, '/email', currentDetails.email, updatedDetails.email);
        }

        if (patchBody.length === 0) {
            return Observable.of(true); // nothing to update
        } else {
            let endpointUrl = `/v2/businessPartners/${currentDetails.businessPartnerNumber}`;
            let requestOptions: ApiModel.ApiV2RequestOptions = {
                endpoint: endpointUrl,
                isJson: false, // 200 OK response will send an empty body
                body: patchBody,
                guid: Guid.newGuid(),
                useCache: false
            };

            return this._apiv2Repository.patch(requestOptions)
                       .map((res) => {
                           return true;
                       })
                       .catch((err) => {
                           console.error('updateContactDetail error', err);
                           return Observable.of(false);
                       });
        }
    }

    /**
     * Invoke the API call to get bill smoothing contracts for the provided contract account number.
     */
    public getBillSmoothingContracts(contractAccountNumber: string): Observable<any> {
        return this._paymentSchemeApi.getBillSmoothingContracts(contractAccountNumber)
                   .catch((error) => {
                       console.error('BillSmoothingApi error', error);
                       return Observable.of({
                           paymentSchemes: []
                       });
                   });
    }

    /**
     * Invoke the API call to get bill smoothing estimates for the provided contract account number.
     */
    public getBillSmoothingEstimates(contractAccountNumber: string): Observable<BillSmoothingAccountsViewModel> {
        return this._paymentSchemeApi.getBillSmoothingEstimates(contractAccountNumber)
                   .catch((response: any) => {
                       const result = new BillSmoothingAccountsViewModel();
                       result.contractAccountNumber = Number(contractAccountNumber);
                       if (this.isHardshipCustomer(response)) {
                           result.hasEstimatesApiError = false;
                           result.error = response.json();
                       } else {
                           result.hasEstimatesApiError = true;
                           result.error = null;
                       }
                       return Observable.of(result);
                   });
    }

    /**
     * Invoke the API call to get bill smoothing contracts for the provided contract account number.
     */
    public postBillSmoothingScheme(contractAccountNumber: string, body): Observable<any> {
        return this._paymentSchemeApi.postBillSmoothingScheme(contractAccountNumber, body);
    }

    /**
     * Invoke the API call to get instalment plans for the provided contract account number.
     */
    public getInstalmentPlans(contractAccountNumber: string, status: InstalmentPlanStatus): Observable<PaymentArrangementInstalmentPlans[]> {
        return this._paymentSchemeApi.getPaymentArrangementInstalmentPlans(contractAccountNumber, status)
                .catch((error) => {
                    console.error('InstalmentPlanApi error', error);
                    return Observable.of([]);
                });
    }

    /**
     * Invoke the AGL Web API /v2/contracts/contractNumber/meters/selfServiceEligibility` endpoint
     * @return {Observable<PendingPaymentApiModel>}
     */
    public getMetersForContract(contractNumber: string): Observable<SelfServiceEligibilityResponseApiModel> {
        let searchParams: URLSearchParams = this.appendSourcePlatform();
        let endpointUrl = `/v2/contracts/${contractNumber}/meters/selfServiceEligibility`;
        return this._apiv2Repository.get<SelfServiceEligibilityResponseApiModel>(endpointUrl, false, true, searchParams);
    }

    public postMetersForContract(contractNumber: string, data: SelfServiceMeterReading[]): Observable<SelfServiceReadingResponse> {
        let endpointUrl = `/v2/contracts/${contractNumber}/meters/selfServiceReadings?source=Web`;

        let filteredReadings: SelfServiceMeterReading[] = [];

        // Skipped reads need to be removed prior to submission or they will cause an error in SAP
        data.map((meter) => {
            let thisMeter = clone(meter);
            thisMeter.registers = thisMeter.registers.filter((p) => !!p.reading);
            if (thisMeter.registers.length > 0) {
                filteredReadings.push(thisMeter);
            }
        });

        let requestOptions: ApiModel.ApiV2RequestOptions = {
            endpoint: endpointUrl,
            isJson: true,
            body: filteredReadings,
            guid: Guid.newGuid(),
            useCache: false
        };
        return this._apiv2Repository.post<SelfServiceReadingResponse>(requestOptions);
    }

    public postPhotosForContract(contractNumber: string, data: SelfServicePhotoReading[]): Observable<SelfServiceReadingResponse> {

        let endpointUrl = `/v2/contracts/${contractNumber}/meters/selfServicePhotos?source=Web`;

        let requestOptions: ApiModel.ApiV2RequestOptions = {
            endpoint: endpointUrl,
            isJson: false,
            body: ``,
            guid: Guid.newGuid(),
            useCache: false
        };

        let formData = new FormData();

        let fileCount = data.length;
        let dataModel: SelfServicePhotoSubmissionDataModel[] = [];

        for (let index: number = 0; index < data.length; index++) {

            let item = data[index];
            let photoIndex = index + 1;

            let thisDataModel: SelfServicePhotoSubmissionDataModel = {};
            thisDataModel.meterSerial = item.meterSerial;
            thisDataModel.registers = item.registers;

            if (item.fileMetadata) {
                thisDataModel.photoName = item.fileMetadata.name;
                dataModel.push(thisDataModel);
                formData.append(`photo${photoIndex}`, item.fileMetadata);
            }
        }

        formData.append(`data`, JSON.stringify(dataModel));

        return this._apiv2Repository.postForm(requestOptions, formData);
    }

    /**
     * Generates a Token for a creditcard on the api payment gateway
     *
     * @param {string} endpointUrl
     * @param {string} billingRef
     * @returns
     *
     * @memberof ApiService
     */
    public paymentApiGenerateToken(cardNumber: string, endpoint: string) {
        let tokenEndpoint = `${this._config.current.aglWebPaymentApiBaseUrl}${endpoint}${cardNumber}`;

        return this._http.get(tokenEndpoint);
    }

    /**
     * Generates a UID for the api payment gateway
     *
     * @param {string} endpointUrl
     * @param {string} billingRef
     * @returns
     *
     * @memberof ApiService
     */
    public paymentApiGenerateBillingReference(billingRef: string, endpoint: string) {
        let requestOptions: ApiModel.ApiV2RequestOptions = {
            endpoint: `${this._config.current.aglWebPaymentApiBaseUrl}${endpoint}${billingRef}`,
            isJson: true,
            body: {},
            guid: Guid.newGuid(),
            useCache: false
        };
        // This endpoint just returns a string...
        return this._paymentApiRepository.post(requestOptions);
    }

    /**
     * Sends a saved payment (card) to the api payment gateway
     *
     * @param {string} endpointUrl
     * @param {string} billingRef
     * @returns
     *
     * @memberof ApiService
     */
    public paymentApiGeneratePayment(endpoint: string, paymentDetails: PaymentDetailsApiModel) {
        let requestOptions: ApiModel.ApiV2RequestOptions = {
            endpoint: `${this._config.current.aglWebPaymentApiBaseUrl}${endpoint}`,
            isJson: true,
            body: paymentDetails,
            guid: Guid.newGuid(),
            useCache: false
        };
        // This endpoint just returns a string...
        return this._paymentApiRepository.post(requestOptions);
    }

    /**
     * Sends a saved payment (bank account) to the stored payment api
     *
     * @param {string} endpointUrl
     * @param {string} billingRef
     * @returns
     *
     * @memberof ApiService
     */
    public storedPaymentApiGeneratePayment(endpoint: string, paymentDetails: CreatePaymentMethodRequest) {
        let requestOptions: ApiModel.ApiV2RequestOptions = {
            endpoint: `${this._config.current.aglStoredPaymentApi}${endpoint}`,
            isJson: true,
            body: paymentDetails,
            guid: Guid.newGuid(),
            useCache: false
        };

        return this._paymentApiRepository.postBody(requestOptions);
    }

    /**
     * Start user data synchronisation
     *
     * @returns {Observable<any>} Mocked, LightMode, Queued or AttemptedAndIgnored
     */
    public startSync() {

        // let mockCounter = 0;

        if (this._isSyncing) {
            console.warn('Sync already in progress, skipping.');
            return;
        }

        this._isSyncing = true;
        console.time(`api-service-sync-start`);
        console.time(`api-service-syncing-complete`);
        this.checkSync();
        this._apiRepository.get<string>('/api/v1/syncdata/start', null, false, false).subscribe(() => {
            console.timeEnd(`api-service-sync-start`);
            this.pollSyncStatusIndex = 0;
            if (!this.isAllSyncComplete) {
                this.checkSync();
                this.pollSyncStatusIntervalId = setInterval(() => {
                    this.checkSync();
                }, this.pollingIntervalMs);
            }
        });

    }

    public checkSync() {

        if (!this.isAllSyncComplete) {

            this.getSyncStatus().subscribe((statuses: ApiModel.SyncStatus[]) => {

                for (let syncStatus of statuses) {
                    let subject = <BehaviorSubject<ApiModel.SyncStatus>> this._syncStatus[syncStatus.dataGroup];
                    if (subject.closed) {
                        continue;
                    }
                    subject.next(syncStatus);
                    if (this.isSyncComplete(syncStatus)) {
                        subject.complete();
                    }
                }

                this.isAllSyncComplete = statuses.every((s) => this.isSyncComplete(s));

                this.pollSyncStatusIndex++;

                if (this.pollSyncStatusIndex >= this.maxPollingIndex) {
                    clearInterval(this.pollSyncStatusIntervalId);
                    this._errors.next('Not all services responded within timeframe');
                    this._modalService.close();
                }

                if (this.isAllSyncComplete) {
                    clearInterval(this.pollSyncStatusIntervalId);
                    this._isSyncing = false;
                    console.timeEnd(`api-service-syncing-complete`);
                    this.allContentLoaded.next(true);
                    this.allContentLoaded.complete();
                }
            });
        }
    }

    /**
     * Starts the timeout for your session
     * Sets a timeout to 15 minutes before doing a heartbeat to the server
     */
    public startTimeout() {
        // Get the current time of the host.
        let time = new Date();
        // let waitTime = 1.2e+6; // 20 minutes
        // Remove any references to the old time.
        localStorage.removeItem('selfService.timeoutTime');
        // Set the current time into localstorage.
        localStorage.setItem('selfService.timeoutTime', time.toISOString());
    }

    /**
     * Check the timeout based on if a user interaction with the application has
     * been made.
     */
    public checkTimeout() {
        // Get the local time
        let localStorageTime = localStorage.getItem('selfService.timeoutTime'); // Timeout Time
        let d1: any = new Date(localStorageTime); // Older Date
        let d2: any = new Date(); // New Date
        let diff = d2 - d1; // Do the difference
        let seconds = Math.floor(diff / 1e3); // Set the seconds
        // Over 900 seconds (15 minutes) then ping the server
        if (seconds >= 900) {
            // Do API call
            let heartBeat = this._http.get(`${this.siteCoreUrl}/svc/app/heartBeat`,
                new RequestOptions({ withCredentials: true }));
            heartBeat.subscribe((value) => {
                if (value.ok) {
                    this.startTimeout();
                }
            });
        }
    }

    public getProfile() {

        // Wait until the sync process has completed, as it has prio #1 for data connections
        this.allContentLoaded.subscribe((loaded) => {

            let requestOptions = new RequestOptions({
                withCredentials: true
            });

            // Defer these calls to allow the application to 'settle'
            setTimeout(() => {
                // sequential calls
                this._http.get(`${this.siteCoreUrl}/svc/MyAccount/GetProfile`, requestOptions)
                    .switchMap(() => this._http.get(`${this.siteCoreUrl}/svc/MyAccount/GetCustomerMessages`, requestOptions)).subscribe(() => {
                    console.log(`Warm up for AEO is complete`);
                });
            }, this._config.current.aglAeoWarmUpDelayMs);
        });

    }

    /**
     * Invoke the AGL Web API /syncdata/status endpoint
     * @return {Observable<SyncStatus[]>}
     */
    private getSyncStatus(): Observable<ApiModel.SyncStatus[]> {
        return this._apiRepository.get<ApiModel.SyncStatus[]>('/api/v1/syncdata/status', null, false, true);
    }

    /**
     * Returns true if a synchronisation status is marked as complete
     */
    private isSyncComplete(sync: ApiModel.SyncStatus) {
        return (sync && sync.status && sync.status.toLowerCase() === 'complete');
    }

    private appendSourcePlatform(params?: URLSearchParams): URLSearchParams {
        if (!params) {
            params = new URLSearchParams();
        }
        params.append(`${this.sourcePlatformKey}`, `${this.sourcePlatformValue}`);
        return params;
    }

    /**
     * @param {fieldJsonPointer} string in json pointer format https://tools.ietf.org/html/rfc6901
     */
    private appendAlteredPatchDocumentValues(patchDocuments: ApiModel.PatchDocument[],
                                             fieldNameJsonPointer: string,
                                             currentValue: string | number,
                                             updatedValue: string | number): void {
        if (currentValue !== updatedValue) {
            patchDocuments.push({
                op: 'Replace',
                path: fieldNameJsonPointer,
                value: updatedValue
            });
        }
    }

    private isHardshipCustomer(response: any): boolean {
        const responseObj = response.json();
        if (response.status === 400 && responseObj.internalError) {
            if (Number(responseObj.internalError.errorNumber) === 16) {
                return true;
            }
        }
        return false;
    }
}

export interface ContractDetailApiModel {
    account: string;
    contract: string;
    currentBillStartDate: Date;
    currentBillEndDate: Date;
    costToDate: number;
    projectedBill: number;
    usageCostThisWeek: number;
    usageCostLastWeek: number;
    usageThisWeek: string;
    usageLastWeek: string;
    balance: number;
    dueDate: Date;
    isSmartMeter: boolean;
    estimatedReads: boolean;
}

export interface BillHistoryApiModel {
    account: string;
    contract: string;
    bills: BillApiModel[];
}

export interface BillApiModel {
    billIssued: Date;
    newCharges: number;
    totalDue: number;
    dueDate: Date;
    isInCredit: boolean;
    isOverdue: boolean;
    billStatus: string;
    printDoc: string;
    startDate: Date;
    endDate: Date;
}

export interface AccountApiModel {
    number: string;
    firstName: string;
    lastName: string;
    contracts: ContractApiModel[];
}

export interface ContractApiModel {
    address: string;
    accountNumber: string;
    fuelType: string;
    nameId: string;
    number: string;
    planName: string;
    inFlight: boolean;
    isRestricted: boolean;
    hasSolar: boolean;
    solarCheckRegistered: boolean;
    hasElectricVehicle: boolean;
    productId: string;
    regionId: string;
}

export interface PaymentApiModel {
    account: string;
    contract: string;
    overdue: number;
    currentBalance: number;
    totalPayment: number;
    dueDate?: string;
    extendedDueDate?: string;
    billSmoothing: boolean;
    directDebit: boolean;
    payOnTimeDiscount: number;
    currentBalanceExcludingPayOnTimeDiscount: number;
}

export interface PendingPaymentApiModel {
    contractNumber: string;
    paymentDateTime: Date;
    amount: number;
}

export interface ContactDetailModel {
    hasMultipleBusinessPartners: boolean;
    businessPartners: BusinessPartnerModel[];
}

export interface BusinessPartnerModel {
    /** Note: For business users, firstName may contain the company name. Additionally firstName will not be populated by the api until an Apr/May 2018 SAP release */
    firstName: string;
    /** Note For business users, lastName may contain the company name. Additionally lastName will not be populated by the api until an Apr/May 2018 SAP release */
    lastName: string;
    businessPartnerNumber: string;
    phone: string;
    mobile: string;
    hasDateOfBirth: boolean;
    email: string;
}

export interface SelfServiceEligibilityResponseApiModel {
    screenCode?: SsmrScreenCode;
    meters?: MeterApiModel[];
    error?: ErrorApiModel;
}

export interface MeterApiModel {
    meterSerial?: string;
    registers?: RegisterApiModel[];
}

export interface RegisterApiModel {
    registerId?: string;
    dialFormat?: number;
    currentMeterRead?: string;
    lastMeterRead?: string;
    lastReadQuality?: string;
    lastReadDate?: string;
}

export interface ErrorApiModel {
    message?: string;
    internalError?: InternalErrorApiModel;
}

export interface InternalErrorApiModel {
    errorId?: string;
    errorNumber?: string;
    description?: string;
}

export interface BillSmoothingApiModel {
    contractAccountNumber: number;
    paymentSchemes: BillSmoothingApiSchemeModel[];
}

export interface BillSmoothingApiSchemeModel {
    contractNumber: number;
    paymentSchemeNumber: number;
    startDate: string;
    endDate: string;
    frequency: string;
    nextPayment: PaymentSimpleModel;
    previousPayment: PaymentSimpleModel;
}

export interface SelfServiceReadingResponse {

    /**
     * Indicates reading submitted has been committed successfully.
     */
    isSuccess: boolean;

    /**
     * Screen code from SAP that indicates which screen to display at front-end
     */
    screenCode: SsmrScreenCode;

    /**
     * Average Daily Usage based on Current Bill Amount.
     */
    dailyUsage?: string;
    accountBalance?: number;
    invoiceDueDate?: Date;

    /**
     * Next Scheduled Bill Date as per customer meter reading schedule
     */
    nextScheduledBillDate?: Date;

    /**
     * Number of days remaining between current system date & Next Scheduled Bill Date
     */
    numberOfDaysTillNextBill?: string;
    currentBill?: SelfServiceBill;
    projectedBill?: SelfServiceBill;
    lastInvoice?: SelfServiceInvoice;
    adjustment?: SelfServiceAdjustment;
    meters?: SelfServiceMeterReadingResult[];
    error?: ErrorApiModel;
}

export interface SelfServiceBill {
    amount: number;
    startDate: Date;
    endDate: Date;
}

export interface SelfServiceInvoice {

    /**
     * Last invoice amount that was rendered to the customer
     */
    amount: number;

    /**
     * Commencement date of the last invoice period that customer has received their invoice
     */
    startDate: Date;

    /**
     * End date of the last invoice period that customer has received their invoice
     */
    endDate: Date;

    /**
     * Indicates the means in which the meter reading was provided (Market Quality flag).
     */
    quality: string;
}

export interface SelfServiceAdjustment {
    preAdjustmentBalance: number;
    postAdjustmentBalance: number;
    startDate: Date;
    endDate: Date;
}

export interface SelfServiceMeterReadingResult {
    meterSerial: string;
    photoUploadRequired: boolean;
    registers: SelfServiceRegisterReadingResult[];
}

export interface SelfServiceRegisterReadingResult {
    registerId: string;
    reading: string;
    isValid: boolean;
    status: string;
}

export interface SelfServiceMeterReading {
    meterSerial?: string;
    registers?: SelfServiceRegisterReading[];
}

export interface SelfServicePhotoReading extends MeterApiModel {
    fileData?: any;
    fileMetadata?: File;
    isThumbnailAvailable?: boolean;
}

export interface SelfServicePhotoSubmissionDataModel extends MeterApiModel {
    photoName?: string;
}

export interface SelfServiceRegisterReading {
    registerId?: string;
    reading?: string;
}

export class EmailReceiptRequestModel {
    public referenceNumber: string;
    public receiptNumber: string;
    public paymentAmount: number;
    public paymentDate: string;
    public payg?: boolean;

    public creditCardType?: string;
    public creditCardNumber?: string;
    public creditCardExpiry?: string;

    public bonus?: string;
    public additionalTextTemplate?: string;

    // Exist in .web but not in .api call :(
    public subjectTemplate?: string;
    public emailTitleTemplate?: string;
    public termsAndConditionsTemplate?: string;
}
