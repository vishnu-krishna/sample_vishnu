import { Injectable } from '@angular/core';

declare let window: any;

@Injectable()
export class DeviceDetectorService {

    public isIE: boolean;
    public isIOS: boolean;
    public isChrome: boolean;

    constructor() {
        this.userAgent = this.getBrowserUserAgent();
    }

    public getBrowserUserAgent(): string {
        return window.navigator.userAgent;
    }

    public set userAgent(userAgent: string) {
        let msie = userAgent.indexOf('MSIE ');
        let trident = userAgent.indexOf('Trident/');

        this.isIE = (msie > 0 || trident > 0);
        this.isIOS = !!userAgent.match(/iPad|iPhone|iPod/i);
        this.isChrome = !!userAgent.match(/chrome|crios|crmo|chromium/i);
    }

    public historyPushStateSupported(): boolean {
        // there is an issue with chrome on iOS where window.history.pushState is not working
        // this is causing the location.back to take us to an unintended page when modal closes
        // so disabling location.back for chrome on iOS
        return !(this.isIOS && this.isChrome);
    }
}
