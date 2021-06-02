import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IIntervalService } from '../../service/interval.service';
import { FakeIntervalService } from './../../../myAccount/services/mock/fakeInterval.service';
import { DocumentService } from './../../service/document.service';
import { AgentStatus } from './agentStatus.enum';
import { WebChatComponent } from './webChat.component';

describe('web chat component', () => {
    const chatButtonId = '123';
    const lpTagKey = `${chatButtonId}.lpTag.newPage`;
    const lpInjectedContentKey = `${chatButtonId}.injected.lp.content`;

    let webChatComp: WebChatComponent;
    let fixture: ComponentFixture<WebChatTestComponent>;
    let fakeIntervalService: FakeIntervalService;

    @Component({
        selector: 'agl-test-component',
        template: `
            <agl-webchat chatButtonId="123">
                <div agent-status-unresolved>agent status is unresolved</div>
                <div agent-online>online content</div>
                <div agent-offline>offline content</div>
            </agl-webchat>
            `
    })
    class WebChatTestComponent {
        public simulateLivePersonAgentOnlineInjection(): void {
            document.getElementById(chatButtonId).insertAdjacentHTML('afterbegin', '<a style="display:none" data-LP-event="click">online</a>');
        }

        public simulateLivePersonAgentOfflineInjection(): void {
            document.getElementById(chatButtonId).insertAdjacentHTML('afterbegin', '<span style="display:none">offline</span>');
        }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                WebChatComponent,
                WebChatTestComponent
            ],
            imports: [
                CommonModule
            ],
            providers: [
                { provide: IIntervalService, useClass: FakeIntervalService },
                DocumentService
            ]
        });

        fixture = TestBed.createComponent(WebChatTestComponent);
        webChatComp = fixture.debugElement.query(By.css('agl-webchat')).componentInstance;

        fakeIntervalService = TestBed.get(IIntervalService);
    });

    function setFakeIsReadyStateComplete(isReadyStateComplete: boolean): void {
        let documentService = fixture.debugElement.injector.get(DocumentService);

        spyOn(documentService, 'isReadyStateComplete').and.callFake(() => {
            return isReadyStateComplete;
        });
    }

    describe('when lpTag.newPage is not available', () => {
        beforeEach(() => {
            (window as any).lpTag = {};
        });

        function actAndAssert(attempts: number) {
            let tickAttempts = 0;
            while (++tickAttempts <= attempts) {
                fakeIntervalService.tick(lpTagKey);
            }

            expect(webChatComp.agentStatus).toBe(AgentStatus.Unresolved);
            fakeIntervalService.tick(lpTagKey); // one extra tick should exceed the max attempts

            expect(webChatComp.agentStatus).toBe(AgentStatus.Offline);
        }

        it('should set agentStatus to offline after 20 attempts to check if document.readyState is complete', () => {
            webChatComp.contentIsHostedInLivePerson = false;
            setFakeIsReadyStateComplete(true);
            fixture.detectChanges();

            actAndAssert(20);
        });

        it('should set agentStatus to offline after 40 attempts to check if document.readyState is not complete', () => {
            webChatComp.contentIsHostedInLivePerson = false;
            setFakeIsReadyStateComplete(false);
            fixture.detectChanges();

            actAndAssert(40);
        });
    });

    describe('when lpTag.newPage is available', () => {
        beforeEach(() => {
            (window as any).lpTag = {
                newPage: () => { return; }
            };
        });

        describe('and live person injection runs', () => {
            it('should show agent status unresolved content before agent status is determined', () => {
                webChatComp.contentIsHostedInLivePerson = false;
                setFakeIsReadyStateComplete(true);
                fixture.detectChanges();

                let displayedContent = fixture.debugElement.query(By.css('div[agent-status-unresolved]'));
                expect(displayedContent).toBeTruthy();
                expect(displayedContent.nativeElement.textContent).toBe('agent status is unresolved');
                expect(fixture.debugElement.query(By.css('div[agent-online]'))).toBeNull();
                expect(fixture.debugElement.query(By.css('div[agent-offline]'))).toBeNull();
            });

            it('should detect agent online when injected content indicates agent is online', () => {
                webChatComp.contentIsHostedInLivePerson = false;
                setFakeIsReadyStateComplete(true);
                fixture.detectChanges();

                fakeIntervalService.tick(lpTagKey);
                expect(webChatComp.agentStatus).toBe(AgentStatus.Unresolved);

                fixture.componentInstance.simulateLivePersonAgentOnlineInjection();

                fakeIntervalService.tick(lpInjectedContentKey);
                expect(webChatComp.agentStatus).toBe(AgentStatus.Online);
                expect(fakeIntervalService.onMaxAttemptsExceededCalled(lpTagKey)).toBe(false);
                expect(fakeIntervalService.onMaxAttemptsExceededCalled(lpInjectedContentKey)).toBe(false);

                fixture.detectChanges();

                let displayedContent = fixture.debugElement.query(By.css('div[agent-online]'));
                expect(displayedContent).toBeTruthy();
                expect(displayedContent.nativeElement.textContent).toBe('online content');
                expect(fixture.debugElement.query(By.css('div[agent-offline]'))).toBeNull();
            });

            it('should detect agent offline when injected content indicates agent is offline', () => {
                webChatComp.contentIsHostedInLivePerson = false;
                setFakeIsReadyStateComplete(true);
                fixture.detectChanges();

                fakeIntervalService.tick(lpTagKey);
                expect(webChatComp.agentStatus).toBe(AgentStatus.Unresolved);

                fixture.componentInstance.simulateLivePersonAgentOfflineInjection();

                fakeIntervalService.tick(lpInjectedContentKey);
                expect(webChatComp.agentStatus).toBe(AgentStatus.Offline);
                expect(fakeIntervalService.onMaxAttemptsExceededCalled(lpTagKey)).toBe(false);
                expect(fakeIntervalService.onMaxAttemptsExceededCalled(lpInjectedContentKey)).toBe(false);

                fixture.detectChanges();

                let displayedContent = fixture.debugElement.query(By.css('div[agent-offline]'));
                expect(displayedContent).toBeTruthy();
                expect(displayedContent.nativeElement.textContent).toBe('offline content');
                expect(fixture.debugElement.query(By.css('div[agent-online]'))).toBeNull();
            });
        });

        describe('but live person content injection does not run', () => {
            function actAndAssert(attempts: number) {
                fakeIntervalService.tick(lpTagKey);

                let tickAttempts = 0;
                while (++tickAttempts <= attempts) {
                    fakeIntervalService.tick(lpInjectedContentKey);
                }

                expect(webChatComp.agentStatus).toBe(AgentStatus.Unresolved);
                fakeIntervalService.tick(lpInjectedContentKey); // one extra tick should exceed the max attempts

                expect(webChatComp.agentStatus).toBe(AgentStatus.Offline);
                expect(fakeIntervalService.onMaxAttemptsExceededCalled(lpTagKey)).toBe(false);
                expect(fakeIntervalService.onMaxAttemptsExceededCalled(lpInjectedContentKey)).toBe(true);

                fixture.detectChanges();

                let displayedContent = fixture.debugElement.query(By.css('div[agent-offline]'));
                expect(displayedContent).toBeTruthy();
                expect(displayedContent.nativeElement.textContent).toBe('offline content');
                expect(fixture.debugElement.query(By.css('div[agent-online]'))).toBeNull();
            }

            it('should set agentStatus to offline after 25 attempts to check if document.readyState is complete', () => {
                webChatComp.contentIsHostedInLivePerson = false;
                setFakeIsReadyStateComplete(true);
                fixture.detectChanges();

                actAndAssert(25);
            });

            it('should set agentStatus to offline after 50 attempts to check document.readyState is not complete', () => {
                webChatComp.contentIsHostedInLivePerson = false;
                setFakeIsReadyStateComplete(false);
                fixture.detectChanges();

                actAndAssert(50);
            });
        });
    });
});
