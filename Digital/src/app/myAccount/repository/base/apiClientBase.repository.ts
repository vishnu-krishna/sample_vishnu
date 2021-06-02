import { HttpClient, HttpParams, HttpRequest, HttpResponse, HttpHeaders, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';

import { ConfigService } from '../../../shared/service/config.service';
import { AglAuthTokenProvider } from '../../../shared/repository/aglAuthTokenProvider';
import { Guid } from '../../../shared/utils/guid';

export abstract class ApiClientBaseRepository {

    public errors = new Subject();
    protected cache: Object = {};

    constructor(
        protected httpClient: HttpClient,
        protected configService: ConfigService,
        protected baseUrl: string,
        protected retryCount: number = 1
    ) {

    }

    /**
     * Creates a GET request to the specified URL
     * @param  {string} url The endpoint URL (additional to the baseUrl for this repository)
     * @param  {string} model The model to be sent
     * @param  {string} httpParams Optional collection of http params
     * @param  {string} headers Optional collection of http headers
     * @return {Observable<T>} An observable of the model type specified in T
     */
    protected getModel<T>(url: string, httpParams?: HttpParams, headers?: HttpHeaders): Observable<T> {
        let requestUrl: string = `${this.baseUrl}${url}`;
        return this.httpClient.get<T>(requestUrl, {
            params: (httpParams ? httpParams : undefined),
            headers: (headers ? headers : undefined)
        });
    }

    /**
     * Creates a GET request to the specified URL
     * @param  {string} url The endpoint URL (additional to the baseUrl for this repository)
     * @param  {string} model The model to be sent
     * @param  {string} httpParams Optional collection of http params
     * @param  {string} headers Optional collection of http headers
     * @return {Observable<T>} An observable of the 'HttpEvent' events (see https://angular.io/api/common/http/HttpEventType)
     */
    protected getModelWithProgress<T>(url: string, httpParams?: HttpParams, headers?: HttpHeaders): Observable<HttpEvent<T>> {
        let requestUrl: string = `${this.baseUrl}${url}`;
        return this.httpClient.get<HttpEvent<T>>(requestUrl, {
            params: (httpParams ? httpParams : undefined),
            headers: (headers ? headers : undefined),
            reportProgress: true,
        });
    }

    /**
     * Creates a POST request to the specified URL with the model K as the body payload
     * @param  {string} url The endpoint URL (additional to the baseUrl for this repository)
     * @param  {string} model Optional model to be sent
     * @param  {string} httpParams Optional collection of http params
     * @param  {string} headers Optional collection of http headers
     * @return {Observable<T>} An observable of the model type specified in T
     */
    protected postModel<T, K>(url: string, model: K | null, httpParams?: HttpParams, headers?: HttpHeaders): Observable<T> {
        let requestUrl: string = `${this.baseUrl}${url}`;
        return this.httpClient.post<T>(requestUrl, model, {
            params: (httpParams ? httpParams : undefined),
            headers: (headers ? headers : undefined),
        });
    }

    /**
     * Creates a POST request to the specified URL with the model K as the body payload
     * @param  {string} url The endpoint URL (additional to the baseUrl for this repository)
     * @param  {string} model Optional model to be sent
     * @param  {string} httpParams Optional collection of http params
     * @param  {string} headers Optional collection of http headers
     * @return {Observable<T>} An observable of the model type specified in T
     */
    protected postModelWithProgress<T, K>(url: string, model: K | null, httpParams?: HttpParams, headers?: HttpHeaders): Observable<HttpEvent<T>> {
        let requestUrl: string = `${this.baseUrl}${url}`;
        return this.httpClient.post<HttpEvent<T>>(requestUrl, model, {
            params: (httpParams ? httpParams : undefined),
            headers: (headers ? headers : undefined),
            reportProgress: true,
        });
    }

    /**
     * Creates a PUT request to the specified URL with the model K as the body payload
     * @param  {string} url The endpoint URL (additional to the baseUrl for this repository)
     * @param  {string} model Optional model to be sent
     * @param  {string} httpParams Optional collection of http params
     * @param  {string} headers Optional collection of http headers
     * @return {Observable<T>} An observable of the model type specified in T
     */
    protected putModel<T, K>(url: string, model: K | null, httpParams?: HttpParams, headers?: HttpHeaders): Observable<T> {
        let requestUrl: string = `${this.baseUrl}${url}`;
        return this.httpClient.put<T>(requestUrl, model, {
            params: (httpParams ? httpParams : undefined),
            headers: (headers ? headers : undefined),
        });
    }

    /**
     * Creates a DELETE request to the specified URL
     * @param  {string} url The endpoint URL (additional to the baseUrl for this repository)
     * @param  {string} httpParams Optional collection of http params
     * @param  {string} headers Optional collection of http headers
     * @return {Observable<T>} An observable of the model type specified in T
     */
    protected deleteModel<T>(url: string, httpParams?: HttpParams, headers?: HttpHeaders): Observable<T> {
        let requestUrl: string = `${this.baseUrl}${url}`;
        return this.httpClient.delete<T>(requestUrl, {
            params: (httpParams ? httpParams : undefined),
            headers: (headers ? headers : undefined),
        });
    }

}
