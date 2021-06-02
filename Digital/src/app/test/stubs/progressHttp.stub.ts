import { Injectable } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http } from '@angular/http';
import { HttpWithDownloadProgressListener, HttpWithUploadProgressListener, ProgressHttp } from 'angular-progress-http';

@Injectable()
export class ProgressHttpStub extends Http implements HttpWithUploadProgressListener, HttpWithDownloadProgressListener {

    public constructor(
        _backend: ConnectionBackend,
        _defaultOptions: BaseRequestOptions
    ) {
        super(_backend, _defaultOptions);
    }

    public withDownloadProgressListener(): HttpWithDownloadProgressListener {
        return this;
    }

    public withUploadProgressListener(): HttpWithUploadProgressListener {
        return this;
    }

    private _buildProgressHttpInstance(): ProgressHttp {
        throw new Error('Method not implemented.');
    }

    private _buildXHRBackend(): ConnectionBackend {
        throw new Error('Method not implemented.');
    }

}
