import { Inject, Injectable }     from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { ReplaySubject }  from 'rxjs/ReplaySubject';
import { ApiService }     from '../../shared/service/api.service';
import { ConfigService }  from './config.service';
import { IContentService } from './contract/icontent.service';

/**
 * Provides static mock content to the application.
 * Useful as a test dependency or local development when a Sitecore instance is not available.
 *
 * @export
 * @class ContentMockService
 */
@Injectable()
export class ContentService implements IContentService {

    public content: Observable<any>;
    public isLightMode: Observable<boolean>;
    public contentLoaded: ReplaySubject<any> = new ReplaySubject(1);

    protected _isLoading: boolean = false;
    protected _contentSubject: ReplaySubject<any>;
    protected _isLightModeLoading: boolean = false;
    protected _lightModeSubject: ReplaySubject<any>;

    constructor(
        protected _http: Http,
        @Inject('AppContentBranch') protected appContentBranch: string,
        protected _api: ApiService,
        protected _configService: ConfigService
    ) {
        this._contentSubject = new ReplaySubject(1);
        this.content = this._contentSubject.share();

        this._lightModeSubject = new ReplaySubject(1);
        this.isLightMode = this._lightModeSubject.share();
    }

    public load(): Observable<any> {
        if (this._isLoading) { return this.content; }
        this._isLoading = true;
        let mockStorageKey = `${this.appContentBranch}.mock.sitecore:file`;
        let testData = localStorage.getItem(mockStorageKey);
        if (testData) {
            console.warn(`Mock content is set to "${testData}". To disable, clear local storage flag "${mockStorageKey}"`);

            let url = `/_mockData/sitecore/${testData}.json`;
            this.loadContentFromUrl(url);
            return this.content;

        } else {
            this.loadContentFromUrl(`./config/content.json`);
            return this.content;
        }
    }

    public getLightMode(): Observable<boolean> {

        if (this._isLightModeLoading) {
            return this.isLightMode;
        }
        this._isLightModeLoading = true;
        let mockStorageKey = `${this.appContentBranch}.mock.lightMode`;
        if (localStorage && localStorage.getItem(mockStorageKey) !== null) {
            let overrideValue = this.convertToBoolean(localStorage.getItem(mockStorageKey));
            console.warn(`Light Mode Override is set to "${overrideValue}". To disable, clear local storage flag "${mockStorageKey}"`);
            this._lightModeSubject.next(overrideValue);
            this._lightModeSubject.complete();
            return this.isLightMode;
        } else {
            this.loadLightModeFromUrl(this._configService.current.aglSiteCoreWebsiteBaseUrl + `/svc/app/IsLightMode`);
            return this.isLightMode;
        }
    }

    public convertToBoolean(input: string): boolean {
        try {
            return JSON.parse(input);
        } catch (e) {
            return false;
        }
     }

    public getContent(): Observable<any> {
        return this.content;
    }

    protected loadContentFromUrl(url: string) {

        // TODO: No handling here for failure for content to load?

        this._http
            .get(url)
            .map((r) => {

                let stringData = r.text();

                let siteCoreUrl = this._configService.current.aglSiteCoreWebsiteBaseUrl;

                // Fixes media URLs
                stringData = stringData.replace(new RegExp(`/-/media`, 'ig'), `${siteCoreUrl}/-/media`);

                // Fixes links to AEO
                stringData = stringData.replace(new RegExp(`"/aeo/`, 'ig'), `"${siteCoreUrl}/aeo/`);

                // Fixes links to the signup funnel
                stringData = stringData.replace(new RegExp(`/sts/`, 'ig'), `${siteCoreUrl}/sts/`);

                // Fixes all calls to services in the SiteCore website
                stringData = stringData.replace(new RegExp(`/svc/`, 'ig'), `${siteCoreUrl}/svc/`);

                // Fixes links to omm tracker
                stringData = stringData.replace(new RegExp(`/tracker`, 'ig'), `${siteCoreUrl}/tracker`);

                // Fixes any links that go to MyAccount routes
                stringData = stringData.replace(new RegExp(`/apps/my-account/`, 'ig'), `/`);

                let data = JSON.parse(stringData);

                return data;

            })
            .subscribe((response) => {
                this._contentSubject.next(response);
                if (this._api && this._api.allContentLoaded) {
                    this._api.allContentLoaded.subscribe((loaded) => {
                        this.contentLoaded.next(true);
                    });
                }
                this._contentSubject.complete();
            },
            (error) => {
                console.error('Error in loading the content!', error);
            });
    }

    protected loadLightModeFromUrl(url: string) {
        this._http
            .get(url, new RequestOptions({ withCredentials: true }))
            .map((r) => r.json())
            .subscribe((response) => {
                this._lightModeSubject.next(response);
                this._lightModeSubject.complete();
            });
    }
}
