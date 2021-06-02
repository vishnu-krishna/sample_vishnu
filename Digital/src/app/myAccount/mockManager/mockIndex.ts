import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { MockCustomer } from './models/mockCustomer';
import { Guid } from '../../shared/utils/guid';
import { ConfigService } from '../../shared/service/config.service';
import { AccountApiModel } from '../../shared/service/api.service';

@Injectable()
export class MockIndex {

    constructor(
        private http: Http,
        private configService: ConfigService
    ) { }

    public loadMockCustomers(): Observable<MockCustomer[]> {
        return this.http.get(`${this.configService.current.aglMockServerConfigBaseUrl}/users/_directory.json`)
            .map((rs: Response) => rs.json());
    }

    public loadAccounts(customerNameId: string): Observable<AccountApiModel[]> {
        if (customerNameId && customerNameId.length > 0) {
            return this.http
                .get(`${this.configService.current.aglMockServerConfigBaseUrl}/users/${customerNameId}/aglWebApi/api/accounts/list/response.json`)
                .map(
                        (x) => {
                        let result = x.json();
                        if (result) {
                            if (result.body) {
                                return result.body;
                            }
                            return result;
                        }
                        return undefined;
                    }
                );
        }
        console.error(`ERROR: customerNameId was empty`);
        return Observable.throw(`ERROR: customerNameId was empty`);
    }

    public alterDirectDebitForAllContractAccounts(mockToken: string, enable: boolean): Observable<void> {
        let action = enable ? 'on' : 'off';

        let requestOptions = new RequestOptions({ headers: this.commonHeaders(mockToken) });
        return this.http.post(`${this.configService.current.aglMockServerConfigBaseUrl}/config/directDebit/${action}`, {}, requestOptions)
            .map((rs: Response) => { return; });
    }

    private commonHeaders(mockToken: string): Headers {
        return new Headers({
            'Authorization': `Bearer ${mockToken.toString()}`,
            'X-Correlation-Id': Guid.newGuid(),
            'Content-Type': 'application/json'
        });
    }
}
