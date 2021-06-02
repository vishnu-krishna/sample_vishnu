import { AfterViewInit, Component, Input } from '@angular/core';

import { DocumentService } from '../../service/document.service';
import { IIntervalService } from '../../service/interval.service';
import { AgentStatus } from './agentStatus.enum';

/**
 * This component allows you to use angular components (for example components from the maui library) in web chat.`
 *
 * Usage:
 * In live person:
 *      for the online html use:
 *          <a style="display:none" data-LP-event="click">online</a>
 *      for the offline html use:
 *          <span style="display:none">offline</span>
 *
 * Example component usage:
 *      <agl-webchat #chat chatButtonId="engagement-element-id-from-live-person" [contentIsHostedInLivePerson]="false">
 *          <div agent-status-unresolved>Waiting...</div>
 *          <div agent-online><agl-maui-button (clicked)="chat.requestChat()">CHAT ONLINE NOW</agl-maui-button></div>
 *          <div agent-offline>Please call us on <a href="tel:131 245">131 245</a>.</div>
 *      </agl-webchat>
 */
@Component({
    selector: 'agl-webchat',
    templateUrl: './webChat.component.html',
    styleUrls: ['./webChat.component.scss']
})
export class WebChatComponent implements AfterViewInit {
    /**
     * The unique id of the chat element that matches the desired live person engagement (generate this in live person)
     */
    @Input() public chatButtonId: string;
    /**
     * Is the full chat html/css hosted in live person?
     */
    @Input() public contentIsHostedInLivePerson: boolean = true;
    /**
     * Should this component automatically check for the injected chat buttons. Use scanForWebChatAvailability() if this is set to false.
     */
    @Input() public autoScanForWebChatAvailability: boolean = true;

    public AgentStatus = AgentStatus;
    public agentStatus: AgentStatus = AgentStatus.Unresolved;

    private lpTagKey = 'lpTag.newPage';
    private lpInjectedContentKey = 'injected.lp.content';

    private get timerKey() {
        return `web chat resolution (${this.chatButtonId})`;
    }

    private cachedInjectedChatButtonWrapper: HTMLElement;

    constructor(private intervalService: IIntervalService,
                private documentService: DocumentService) { }

    public ngAfterViewInit(): void {
        if (this.autoScanForWebChatAvailability) {
            this.scanForWebChatAvailability();
        }
    }

    public requestChat(): void {
        if (this.agentStatus === AgentStatus.Online) {
            let button = this.injectedChatButton(this.injectedChatButtonWrapper());
            if (button) {
                button.click();
            }
        }
    }

    /**
     * Allows you to explicitly initiate a scan to see if web chat is available.
     * May be required if you wrap the live person chat id tags in an *ngIf that is resolved asynchronously
     * (e.g an *ngIf relying on an observable.subscribe() result that is kicked of in ngOnInit()).
     */
    public scanForWebChatAvailability(): void {
        // when the app is loading for the 1st time (page refresh, deep link etc) we need to give extra time to allow live person to load and inject its code
        let isSPAReloadOrDeepLink = !this.documentService.isReadyStateComplete();
        this.triggerLivePersonInjection(this.contentIsHostedInLivePerson, isSPAReloadOrDeepLink);
    }

    private triggerLivePersonInjection(contentIsHostedInLivePerson: boolean, isSPAReloadOrDeepLink: boolean): void {
        console.time(this.timerKey);

        // These timings have been agreed upon with the business so don't reduce them without consultation
        const pollEveryMs = 100;
        const maxAttempts = 20 * (isSPAReloadOrDeepLink ? 2 : 1); // allow extra time as the full page is loading

        let wd = window as any;
        this.intervalService.safeSetInterval(
            `${this.chatButtonId}.${this.lpTagKey}`, pollEveryMs, maxAttempts,
            (): boolean => {
                return wd.lpTag && wd.lpTag.newPage;
            }, (): void => {
                wd.lpTag.newPage(this.documentService.URL);

                if (!contentIsHostedInLivePerson) {
                    this.determineAgentStatusFromInjectedContent(isSPAReloadOrDeepLink);
                } else {
                    console.timeEnd(this.timerKey);
                }
            }, (): void => {
                this.unableToResolve(`unable to resolve lpTag.newPage`);
            });
    }

    private determineAgentStatusFromInjectedContent(isSPAReloadOrDeepLink: boolean): void {
        // These timings have been agreed upon with the business so don't reduce them without consultation
        const pollEveryMs = 100;
        const maxAttempts = 25 * (isSPAReloadOrDeepLink ? 2 : 1); // allow extra time as the full page is loading

        this.intervalService.safeSetInterval(
            `${this.chatButtonId}.${this.lpInjectedContentKey}`, pollEveryMs, maxAttempts,
            (): boolean => {
                return !!this.injectedChatButtonWrapper();
            }, (): void => {
                let btnWrapper = this.injectedChatButtonWrapper();
                this.agentStatus = !!this.injectedChatButton(btnWrapper) ? AgentStatus.Online : AgentStatus.Offline;
                console.timeEnd(this.timerKey);
            }, (): void => {
                this.unableToResolve(`unable to resolve injected lp content`);
            });
    }

    private unableToResolve(logMessage: string) {
        this.agentStatus = AgentStatus.Offline;
        console.timeEnd(this.timerKey);
        console.warn(logMessage);
    }

    private injectedChatButtonWrapper(): HTMLElement {
        if (!this.cachedInjectedChatButtonWrapper) {
            let chatButton: HTMLElement = this.documentService.getElementById(`${this.chatButtonId}`);
            if (chatButton) {
                // must have innerHtml content, otherwise it has not been detected and injected with content by live person yet
                if (chatButton.innerHTML) {
                    this.cachedInjectedChatButtonWrapper = chatButton;
                }
            }
        }
        return this.cachedInjectedChatButtonWrapper;
    }

    private injectedChatButton(injectedChatButtonWrapper: HTMLElement): HTMLAnchorElement {
        if (injectedChatButtonWrapper) {
            let hiddenAnchors: NodeListOf<HTMLAnchorElement> = injectedChatButtonWrapper.getElementsByTagName('a');

            if (hiddenAnchors && hiddenAnchors.length === 1) {
                if (hiddenAnchors[0].hasAttribute('data-LP-event')) {
                    return hiddenAnchors[0];
                }
            }
        }
    }
}
