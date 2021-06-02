import { Injectable }                 from '@angular/core';
import { Headers, Http, RequestMethod, RequestOptions, Response, URLSearchParams } from '@angular/http';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';

import { AglAuthTokenProvider }       from '../../../shared/repository/aglAuthTokenProvider';
import { ErrorApiModel }              from '../../../shared/service/api.service';
import { ConfigService }              from '../../../shared/service/config.service';
import { Guid }                       from '../../../shared/utils/guid';
import { DateHelper } from '../../../shared/utils/dateHelper';
import { PaymentAssistancePlanInstalmentsProgressItem } from '../../pages/bills/paymentAssistance/plan/instalments';

export interface GetPaymentArrangementInstalmentPlanOptionsParams {
    suggestInstalments?: boolean;
    startDate?: Date;
    frequency?: InstalmentPlanFrequency;
}

export abstract class IPaymentSchemeApi {
    public abstract getBillSmoothingContracts(contractAccountNumber: string): Observable<any>;
    public abstract getBillSmoothingEstimates(contractAccountNumber: string): Observable<any>;
    public abstract postBillSmoothingScheme(contractAccountNumber: string, body): Observable<any>;
    public abstract getPaymentArrangementExtensionOptions(contractAccountNumber: string): Observable<PaymentArrangementExtensionOptions>;
    public abstract submitPaymentArrangementExtension(contractNumber: string, extendedDueDate: Date): Observable<void>;
    public abstract getPaymentArrangementInstalmentPlanOptions(contractNumber: string, params: GetPaymentArrangementInstalmentPlanOptionsParams): Observable<PaymentArrangementInstalmentPlanOption[]>;
    public abstract getPaymentArrangementInstalmentSummary(instalmentPlanParameters: InstalmentPlanParameters): Observable<PaymentArrangementInstalmentSummary>;
    public abstract submitPaymentArrangementInstalmentPlan(instalmentPlanParameters: InstalmentPlanParameters): Observable<PaymentArrangementInstalmentSummary>;
    public abstract getPaymentArrangementInstalmentPlans(contractAccountNumber: string, status?: InstalmentPlanStatus): Observable<PaymentArrangementInstalmentPlans[]>;
}

@Injectable()
export class PaymentSchemeApiService implements IPaymentSchemeApi {
    private basePath: string;

    constructor(
        private http: Http,
        private configService: ConfigService,
        private tokenProvider: AglAuthTokenProvider) {
        this.basePath = configService.current.aglPaymentSchemeApi;
    }

    // bill smoothing
    public getBillSmoothingContracts(contractAccountNumber: string): Observable<any> {
        let getEndPoint = `/v1/contractAccounts/${contractAccountNumber}/billsmoothing/schemes`;
        return this.get(getEndPoint);
    }

    public getBillSmoothingEstimates(contractAccountNumber: string): Observable<any> {
        let getEndPoint = `/v1/contractAccounts/${contractAccountNumber}/billsmoothing/estimates`;
        return this.get(getEndPoint);
    }

    public postBillSmoothingScheme(contractAccountNumber: string, body): Observable<any> {
        const postEndPoint = `/v1/contractAccounts/${contractAccountNumber}/billsmoothing/schemes`;
        return this.post(postEndPoint, body);
    }

    // payment arrangement payment extensions
    public getPaymentArrangementExtensionOptions(contractAccountNumber: string): Observable<PaymentArrangementExtensionOptions> {
        let getEndPoint = `/v1/contractAccounts/${contractAccountNumber}/paymentArrangement/extensionOptions`;
        return this.get<PaymentArrangementExtensionOptions>(getEndPoint);
    }

    public submitPaymentArrangementExtension(contractNumber: string, extendedDueDate: Date): Observable<void> {
        const postEndPoint = `/v1/contracts/${contractNumber}/paymentArrangement/paymentExtensions`;
        const body = { extendedDueDate: extendedDueDate };
        return this.post<any>(postEndPoint, body);
    }

    // payment arrangement instalment plans
    public getPaymentArrangementInstalmentPlanOptions(contractNumber: string, params: GetPaymentArrangementInstalmentPlanOptionsParams): Observable<PaymentArrangementInstalmentPlanOption[]> {
        let searchParams: URLSearchParams = new URLSearchParams();

        if (params && params.startDate) {
            searchParams.set('startDate', DateHelper.toIsoDateString(moment(params.startDate)));
        }

        if (params && params.frequency) {
            searchParams.set('frequency', params.frequency.toString());
        }

        if (params && params.suggestInstalments !== undefined) {
            searchParams.set('suggestInstalments', params.suggestInstalments.toString());
        }

        let getEndPoint = `/v1/contracts/${contractNumber}/paymentArrangement/instalmentPlans/options`;
        return this.get<PaymentArrangementInstalmentPlanOption[]>(getEndPoint, searchParams);
    }

    public getPaymentArrangementInstalmentSummary(instalmentPlanParameters: InstalmentPlanParameters): Observable<PaymentArrangementInstalmentSummary> {
        const startDateString: string = moment(instalmentPlanParameters.startDate).format('YYYY-MM-DD');
        const getEndPoint = `/v1/contracts/${instalmentPlanParameters.contractNumber}/paymentArrangement/instalmentPlans/summary?frequency=${instalmentPlanParameters.frequency}&startDate=${startDateString}&instalmentAmount=${instalmentPlanParameters.instalmentAmount}`;
        return this.get<PaymentArrangementInstalmentSummary>(getEndPoint);
    }

    public submitPaymentArrangementInstalmentPlan(instalmentPlanParameters: InstalmentPlanParameters): Observable<PaymentArrangementInstalmentSummary> {
        const postEndPoint = `/v1/contracts/${instalmentPlanParameters.contractNumber}/paymentArrangement/instalmentPlans`;
        const frequency = instalmentPlanParameters.frequency;
        const startDate = instalmentPlanParameters.startDate;
        const instalmentAmount = instalmentPlanParameters.instalmentAmount;
        const body = { frequency, startDate, instalmentAmount };
        return this.post<any>(postEndPoint, body);
    }

    public getPaymentArrangementInstalmentPlans(contractAccountNumber: string, status?: InstalmentPlanStatus): Observable<PaymentArrangementInstalmentPlans[]> {
        let searchParams: URLSearchParams = new URLSearchParams();
        if (status && status === InstalmentPlanStatus.Open) {
            searchParams.set('status', InstalmentPlanStatus.Open.toString());
        }

        const getEndPoint = `/v1/contractAccounts/${contractAccountNumber}/paymentArrangement/instalmentPlans`;
        return this.get<PaymentArrangementInstalmentPlans[]>(getEndPoint, searchParams);
    }

    private get<T>(url: string, searchParams?: URLSearchParams): Observable<T> {
        let requestOptions = new RequestOptions({
            method: RequestMethod.Get,
            headers: this.commonHeaders(),
        });

        if (searchParams) {
            requestOptions.search = searchParams;
        }

        return this.http.get(`${this.basePath}${url}`, requestOptions)
            .map((response) => {
                return response.json();
            });
    }

    private post<T>(url: string, body: any): Observable<T> {
        let requestOptions = new RequestOptions({ method: RequestMethod.Get, headers: this.commonHeaders() });
        return this.http.post(`${this.basePath}${url}`, body, requestOptions)
            .map((response: Response) => {
                let result = (response.text() === '') ? response : response.json(); // Safely handle empty response bodies
                return result;
            });
    }

    private commonHeaders(): Headers {
        return new Headers({
            'Authorization': `Bearer ${this.tokenProvider.getToken()}`,
            'X-Correlation-Id': Guid.newGuid(),
            'Content-Type': 'application/json'
        });
    }
}

export interface PaymentArrangementExtensionOptions {
    contractAccountNumber: number;
    extensionOptions: PaymentArrangementExtensionOption[];
}

export interface PaymentArrangementExtensionOption {
    contractNumber: number;
    isEligible: boolean;
    dueDate?: Date;
    totalDueAmount?: number;
    dueDateExtensions?: PaymentArrangementDueDateExtension[];
    error?: ErrorApiModel;
}

export interface PaymentArrangementDueDateExtension {
    numberOfDays: number;
    date: Date;
}

export interface PaymentArrangementExtensionOptionsUpdate {
    extendedDueDate: Date;
}

export interface PaymentArrangementInstalmentPlanOption {
    frequency: InstalmentPlanFrequency;
    minStartDate: Date;
    maxStartDate: Date;
    instalmentSuggestions: PaymentArrangementInstalmentSuggestion[];
    instalmentMinAmount: number;
    instalmentMaxAmount: number;
}

export interface PaymentArrangementInstalmentSuggestion {
    instalmentAmount: number;
    numberOfInstalments: number;
}

export enum InstalmentPlanFrequency {
    Weekly = <any> 'Weekly',
    Fortnightly = <any> 'Fortnightly',
    Monthly = <any> 'Monthly'
}

export interface PaymentArrangementInstalmentSummary {
    instalments: PaymentArrangementInstalmentSummaryItem[];
}

export interface PaymentArrangementInstalmentSummaryItem {
    instalmentDate: string;
    instalmentAmount: number;
}

export class InstalmentPlanParameters {
    accountNumber: string;
    contractNumber: string;
    frequency: InstalmentPlanFrequency;
    instalmentAmount: number;
    startDate: Date;
    firstInstalmentDue: string;
    selectedNumberOfInstalments?: number;
}

export interface PaymentArrangementInstalmentPlans {
    contractNumber: number;
    instalmentPlans: InstalmentPlan[];
}

export interface InstalmentPlan {
    instalments: InstalmentPayment[];
    status: InstalmentPlanStatus;
    remark?: string;
}

export interface InstalmentPayment {
    instalmentDate: Date;
    instalmentAmount: number;
    dueAmount: number;
}

export enum InstalmentPlanStatus {
    Open = 'Open',
    Closed = 'Closed',
}
