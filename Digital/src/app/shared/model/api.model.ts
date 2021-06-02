import { URLSearchParams } from '@angular/http';

export interface SyncStatus {
    dataGroup: string;
    status: string;
    lastUpdated: Date;
    failed: boolean;
    errors: SyncError[];
}

export interface SyncError {
    dataType: string;
    account: string;
    contract: string;
    message: string;
    hasRfcError: boolean;
    errorId: string;
    errorNumber: string;
}

export class ApiRequestOptions {
    public endpoint: string;
    public isJson: boolean = true;
    public useCache: boolean = true;
    public body: Object;
    public searchParams?: URLSearchParams;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }
}

export class ApiV2RequestOptions {
    public endpoint: string;
    public isJson: boolean = true;
    public useCache: boolean = true;
    public body: Object;
    public searchParams?: URLSearchParams;
    public guid?: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }
}

export interface PatchDocument { // json patch from https://tools.ietf.org/html/rfc6902
    op: string; // currently (dec 2017) only 'replace' is supported
    path: string; // a json pointer https://tools.ietf.org/html/rfc6901
    value: any;
}
