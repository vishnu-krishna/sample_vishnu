import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ConfigService } from '../../../shared/service/config.service';
import { AglAuthTokenProvider } from '../../../shared/repository/aglAuthTokenProvider';
import { Guid } from '../../../shared/utils/guid';
import { ErrorApiModel } from '../../../shared/service/api.service';

export abstract class IConcessionApi {
    public abstract getEligibleConcessionCards(regionId: string, fuelTypes: string[]): Observable<Issuer[]>;
    public abstract getConcessionStatus(bpId: string): Observable<ConcessionStatus>;

    /**
     * @returns 0 success else the internal error number
     */
    public abstract saveConcession(businessPartnerNumber: string, request: SaveConcessionRequest): Observable<number>;
}

@Injectable()
export class ConcessionApiService implements IConcessionApi {
    private basePath: string;

    constructor(private http: Http,
                private configService: ConfigService,
                private tokenProvider: AglAuthTokenProvider) {
        this.basePath = configService.current.aglConcessionApiBaseUrl;
    }

    public getEligibleConcessionCards(regionId: string, fuelTypes: string[]): Observable<Issuer[]> {
        let getEndPoint = `/v1/concession/${regionId.toLowerCase()}/issuers`;

        let params = new URLSearchParams();
        fuelTypes.forEach((ft) => params.append('fuelTypes', ft));

        return this.get<Issuer[]>(getEndPoint, params);
    }

    public getConcessionStatus(bpId: string): Observable<ConcessionStatus> {
        let endpoint = `/v1/businessPartners/${bpId}/concession`;
        return this.get<ConcessionStatus>(endpoint, new URLSearchParams());
    }

    public saveConcession(businessPartnerNumber: string, request: SaveConcessionRequest): Observable<number> {
        const postEndPoint = `/v1/businessPartners/${businessPartnerNumber}/concession`;
        return this.post<any>(postEndPoint, request)
            .map(() => {
                return 0; // success
            })
            .catch((response: Response) => {
                let body = this.extractResponseBody(response);

                if (response.status === 400) {
                    if (body.internalError && body.internalError.errorNumber) {
                        return Observable.of(Number(body.internalError.errorNumber));
                    }
                }

                return Observable.throw(body);
            });
    }

    private get<T>(url: string, searchParams: URLSearchParams): Observable<T> {
        let requestOptions = new RequestOptions({
            method: RequestMethod.Get,
            headers: this.commonHeaders(),
            search: searchParams
        });

        return this.http.get(`${this.basePath}${url}`, requestOptions)
            .map((response) => {
                return response.json();
            });
    }

    private post<T>(url: string, body: any): Observable<T> {
        let requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: this.commonHeaders() });
        return this.http.post(`${this.basePath}${url}`, body, requestOptions)
            .map((response: Response) => {
                return this.extractResponseBody(response);
            });
    }

    private extractResponseBody(response: Response): any {
        return (response.text() === '') ? response : response.json();
    }

    private commonHeaders(): Headers {
        return new Headers({
            'Authorization': `Bearer ${this.tokenProvider.getToken()}`,
            'X-Correlation-Id': Guid.newGuid(),
            'Content-Type': 'application/json'
        });
    }
}

export interface ConcessionCard {
    cardCode: string;
    name: string;
    eligibleFuelTypes: string[];
}

export interface Issuer {
    issuerCode: string;
    issuer: string;
    cards: ConcessionCard[];
}

export interface ConcessionStatus {
    cardAvailable: boolean;
    concessionCard?: ConcessionStatusCardDetails;
}

export interface ConcessionStatusCardDetails {
    cardCode: string;
    issuerCode: string;
    cardNumber: string;
    cardName: string;
    error?: ErrorApiModel;
}

export class SaveConcessionRequest {
    constructor(public cardNumber: string,
                public issuerCode: string,
                public cardCode: string,
                public contracts: string[]) {
        if (!cardNumber || !issuerCode || !cardCode || (contracts || []).length === 0) {
            throw new Error('Invalid SaveConcessionRequest');
        }
    }
}
