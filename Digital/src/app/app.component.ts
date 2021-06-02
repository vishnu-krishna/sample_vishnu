import { Component, HostBinding } from '@angular/core';
import { Angulartics2GoogleTagManager } from 'angulartics2';
import { PageLoadingMessage } from './shared/messages/pageLoading.message';
import { IMessageBusService } from './shared/service/contract/imessageBus.service';

/**
 * Root container
 */
@Component({
    selector: 'agl-apps',
    templateUrl: './app.component.html'
})
export class AppComponent {
    public isLoaded: Boolean = false;
    public showLoader: Boolean = false;
    public loadingMessage: string;
    public loadingSubMessage: string;
    @HostBinding('class.loaded') get valid() { return this.isLoaded = true; }

    constructor(
        public angulartics2GoogleTagManager: Angulartics2GoogleTagManager,
        private _messageBusService: IMessageBusService) {
        // listen for any messages to show the loader
        this._messageBusService.listen(PageLoadingMessage).subscribe((view) => {
            setTimeout(() => {
                this.showLoader = view.isLoading;
                this.loadingMessage = view.message;
                this.loadingSubMessage = view.subMessage;
            });
        });
    }
}
