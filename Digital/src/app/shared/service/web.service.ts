import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Guid } from '../utils/guid';
import { IWebService } from './contract/iweb.service';

@Injectable()
export class WebService implements IWebService {

    public _http: Http;
    public _activeRequests: string[];
    public _guid: Guid;

    public _diagnostics: boolean = false;

    constructor(
        http: Http
    ) {
        this._http = http;
        this._activeRequests = [];
    }

    public havePendingRequests(): boolean {
        return this._activeRequests.length > 0;
    }

    public requestStart(uid: string, url: string) {
        this._activeRequests.push(uid);
        if (this._diagnostics) {
            console.log('Request Start - ' + uid + ' for URL: ' + url);
            console.log(this._activeRequests);
        }
    }

    public requestComplete(uid: string, url: string) {
        let requestIndex = this._activeRequests.indexOf(uid, 0);
        if (requestIndex > -1) {
            this._activeRequests.splice(requestIndex, 1);
        }
        if (this._diagnostics) {
            console.log('Request Complete - ' + uid + ' for URL: ' + url);
            console.log(this._activeRequests);
        }
    }

    public get(url: string, blocking?: boolean, options?: RequestOptions): Observable<Response> {
        let reqGuid: string;
        if (blocking) {
            reqGuid = Guid.newGuid();
            this.requestStart(reqGuid, url);
        }
        let req = this._http
            .get(url, options)
            .finally(() => {
                if (blocking) {
                    this.requestComplete(reqGuid, url);
                }
            });
        return req;
    }

    public post(url: string, body: any, blocking?: boolean, options?: RequestOptions): Observable<Response> {
        let reqGuid: string;
        if (blocking) {
            reqGuid = Guid.newGuid();
            this.requestStart(reqGuid, url);
        }
        let req = this._http
            .post(url, body, options)
            .finally(() => {
                if (blocking) {
                    this.requestComplete(reqGuid, url);
                }
            });
        return req;
    }

    // Need to properly implement these
    public head(): Observable<Response> {
        return Observable.of(null);
    }

    public put(url: string, body: any, blocking?: boolean, options?: RequestOptions): Observable<Response> {
        let reqGuid: string;
        if (blocking) {
            reqGuid = Guid.newGuid();
            this.requestStart(reqGuid, url);
        }
        let req = this._http
            .put(url, body, options)
            .finally(() => {
                if (blocking) {
                    this.requestComplete(reqGuid, url);
                }
            });
        return req;
    }

    public delete(url: string, blocking?: boolean, options?: RequestOptions): Observable<Response> {
        let reqGuid: string;
        if (blocking) {
            reqGuid = Guid.newGuid();
            this.requestStart(reqGuid, url);
        }
        let req = this._http
            .delete(url, options)
            .finally(() => {
                if (blocking) {
                    this.requestComplete(reqGuid, url);
                }
            });
        return req;
    }

    public options(): Observable<Response> {
        return Observable.of(null);
    }
    public patch(): Observable<Response> {
        return Observable.of(null);
    }

}
