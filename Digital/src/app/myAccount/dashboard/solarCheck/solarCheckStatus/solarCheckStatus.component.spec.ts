import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import * as moment from 'moment';
import { SolarCheckEligiblity } from '../../../../shared/model/solar/solarCheckEligibility.model';
import { SolarCheckRegistrationStatusType } from '../../../../shared/model/solar/solarCheckRegistrationStatus.model';
import { SolarCheckStatusResponse } from '../../../../shared/model/solar/solarCheckStatusResponse.model';
import { ConfigService } from '../../../../shared/service/config.service';
import { IMessageBusService } from '../../../../shared/service/contract/imessageBus.service';
import { AccountViewModel, ContractViewModel } from '../../../services/account.service';
import { ISolarCheckService } from '../../../services/contract/isolarCheck.service';
import { Survey, SurveyService, SurveyType } from '../../../services/survey.service';
import { SolarCheckStatusComponent } from './solarCheckStatus.component';
import { SolarCheckStatusViewModelFactory } from './solarCheckStatusViewModelFactory';

describe('Solar Check Status', () => {

    let comp: SolarCheckStatusComponent;
    let fixture: ComponentFixture<SolarCheckStatusComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    let dummySolarCheckService = {
        getStatus: (): Observable<SolarCheckStatusResponse> => {
            throw new Error('solarCheckServiceStub getStatus has not been mocked properly.');
        },

        isEligible: (): Observable<SolarCheckEligiblity> => {
            throw new Error('solarCheckServiceStub isEligible has not been mocked properly.');
        }
    };

    let dummySurveyService = {
        start: (survey: Survey) => {
            return;
        },
        triggerSurvey: (survey: SurveyType) => {
            return;
        }
     };

    let messageBusService = {
        // tslint:disable-next-line:no-empty
        broadcast: (): any => {
        },
        listenWithLatest: (): any => {
            return Observable.of({});
        },
        listen: (): any => {
            return Observable.of({});
        }
    };

    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [ConfigService,
                        SolarCheckStatusViewModelFactory,
                        { provide: ISolarCheckService, useValue: dummySolarCheckService },
                        { provide: IMessageBusService, useValue: messageBusService },
                        { provide: SurveyService, useValue: dummySurveyService }],
            declarations: [SolarCheckStatusComponent],
            imports: []
        });

        fixture = TestBed.createComponent(SolarCheckStatusComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
    });

    describe('When Solar Check API response status is good', () => {

        let formattedDate: string;

        beforeEach(async(() => {

            // ARRANGE
            let contract = new ContractViewModel('123456789');
            contract.hasSolar = true;
            contract.solarCheckRegistered = true;

            let contract2 = new ContractViewModel('1234567890');
            contract2.hasSolar = false;
            contract2.solarCheckRegistered = false;

            let contracts = [contract, contract2];
            let accounts = [new AccountViewModel('123123', contracts)];

            comp.accounts = accounts;
            let testStatus = 'Good';
            let testDate = '2017-04-06';
            formattedDate = moment(testDate).format('D MMM YYYY');

            let mockSolarCheckResponse = {
                solarStatus: testStatus,
                measuredExpectedRatio: '0.9',
                confidence: '0.8',
                dataStartDate: '02/15/2017',
                dataEndDate: '04/11/2017',
                processedDateTime: testDate
            };

            let mockIsEligibleResponse = {
                eligible: true,
                contracts: [
                    {
                        contractNumber: '56879',
                        eligible: false,
                        registrationStatus : SolarCheckRegistrationStatusType.Registered,
                    }
                ]
            };

            let solarCheckService = fixture.debugElement.injector.get(ISolarCheckService);
            spyOn(solarCheckService, 'getStatus').and.returnValue(Observable.of(mockSolarCheckResponse));
            spyOn(solarCheckService, 'isEligible').and.returnValue(Observable.of(mockIsEligibleResponse));
        }));

        it('should display good status (Desktop) icon', async(() => {

            // ACT
            fixture.detectChanges();

            // ASSERT
            let desktopImageStatusGood = de.query(By.css('.main-image img[src*="scs_status_good.svg"] '));
            expect(desktopImageStatusGood).not.toBeNull('could not find desktop icon image scs_status_good.svg');

        }));

        it('should set the message header text to expected copy text', async(() => {

            // ACT
            fixture.detectChanges();

            // ASSERT
            let messageHeader = de.query(By.css('.message-header'));
            el = messageHeader.nativeElement;
            expect(el.innerText.toLowerCase().trim()).toContain('your system is producing solar energy.');

        }));

        it('should display the date updated (in expected format style) within the copy text', async(() => {

            // ACT
            fixture.detectChanges();

            // ASSERT
            let messageDetails = de.query(By.css('.message-details'));
            el = messageDetails.nativeElement;
            expect(el.innerText.toLowerCase().trim()).toContain('updated');
            expect(el.innerText.trim()).toContain(formattedDate);
        }));

        it('should display button with expected text', async(() => {

            // ACT
            fixture.detectChanges();

            // ASSERT
            let desktopLinkElement = de.query(By.css('.link-text'));
            el = desktopLinkElement.nativeElement;
            expect(el.innerText.toUpperCase()).toBe('COULD IT BE BETTER?');
        }));

        it('should not be displaying Check Systems Desktop "Take Action" button', async(() => {

            // ACT
            fixture.detectChanges();

            // ASSERT
            let desktopButtonElement = de.query(By.css('.upper-panel .dls-button-override'));
            expect(desktopButtonElement).toBeNull('Desktop "Take Action" button unexpectedly appearing (referenced by class .upper-panel .buttonText)');
        }));

        it('should not be displaying Check Systems Mobile "Take Action" button', async(() => {

            // ACT
            fixture.detectChanges();

            // ASSERT
            let mobileButtonElement = de.query(By.css('.mobile-link .dls-button-override'));
            expect(mobileButtonElement).toBeNull('Mobile "Take Action" button unexpectedly appearing (referenced by class .mobile-link .buttonText)');
        }));

        it('should display good status (Mobile) icon', async(() => {

            // ACT
            fixture.detectChanges();

            // ASSERT
            let mobileImageStatusGood = de.query(By.css('.mobile-status img[src*="scs_status_good.svg"] '));
            expect(mobileImageStatusGood).not.toBeNull('could not find mobile icon image scs_status_good.svg');
        }));
    });

    describe('When Solar Check API response status is Indeterminate', () => {

        it('should set the ViewModel with the "notAvailable" state properties', async(() => {

            // ARRANGE
            let contract = new ContractViewModel('123456789');
            contract.hasSolar = true;
            contract.solarCheckRegistered = true;

            let contract2 = new ContractViewModel('1234567890');
            contract2.hasSolar = false;
            contract2.solarCheckRegistered = false;

            let contracts = [contract, contract2];
            let accounts = [new AccountViewModel('123123', contracts)];

            comp.accounts = accounts;
            let testStatus = 'Indeterminate';
            let testDate = '2017-04-06';
            this.formattedDate = moment(testDate).format('D MMM YYYY');

            let mockSolarCheckResponse = {
                solarStatus: testStatus,
                measuredExpectedRatio: '0.9',
                confidence: '0.8',
                dataStartDate: '02/15/2017',
                dataEndDate: '04/11/2017',
                processedDateTime: testDate
            };

            let mockIsEligibleResponse = {
                eligible: true,
                contracts: [
                    {
                        contractNumber: '56879',
                        eligible: false,
                        registrationStatus: SolarCheckRegistrationStatusType.Registered
                    }
                ]
            };

            let solarCheckService = fixture.debugElement.injector.get(ISolarCheckService);
            spyOn(solarCheckService, 'getStatus').and.returnValue(Observable.of(mockSolarCheckResponse));
            spyOn(solarCheckService, 'isEligible').and.returnValue(Observable.of(mockIsEligibleResponse));

            // ACT
            fixture.detectChanges();

            // ASSERT
            let messageHeader = de.query(By.css('.message-header'));
            el = messageHeader.nativeElement;
            expect(el.innerText.toLowerCase().trim()).toContain("sorry, your solar status isn't currently available.");

            let messageDetails = de.query(By.css('.message-details'));
            el = messageDetails.nativeElement;
            expect(el.innerText.toLowerCase().trim()).toContain('check back soon.');

            let desktopImageStatusGood = de.query(By.css('.main-image img[src*="scs_status_notAvailable.svg"] '));
            expect(desktopImageStatusGood).not.toBeNull('could not find desktop icon image scs_status_notAvailable.svg');

            let desktopLinkElement = de.query(By.css('.link-text'));
            el = desktopLinkElement.nativeElement;
            expect(el.innerText.toUpperCase()).toBe('LEARN MORE');

            let mobileLinkElement = de.query(By.css('.mob-link-text'));
            el = mobileLinkElement.nativeElement;
            expect(el.innerText.toUpperCase()).toBe('LEARN MORE');

            let desktopButtonElement = de.query(By.css('.upper-panel .dls-button-override'));
            expect(desktopButtonElement).toBeNull('Desktop "Take Action" button unexpectedly appearing (referenced by class .upper-panel .buttonText)');

            let mobileButtonElement = de.query(By.css('.mobile-link .dls-button-override'));
            expect(mobileButtonElement).toBeNull('Desktop "Take Action" button unexpectedly appearing (referenced by class .mobile-link .buttonText)');

            let mobileImageStatusGood = de.query(By.css('.mobile-status img[src*="scs_status_notAvailable.svg"] '));
            expect(mobileImageStatusGood).not.toBeNull('could not find mobile icon image scs_status_notAvailable.svg');
        }));
    });

    describe('When Solar Check API response status is Update Pending', () => {

        it('should set the ViewModel with the "UpdatePending" state properties', async(() => {

            // ARRANGE
            let contract = new ContractViewModel('123456789');
            contract.hasSolar = true;
            contract.solarCheckRegistered = true;

            let contract2 = new ContractViewModel('1234567890');
            contract2.hasSolar = false;
            contract2.solarCheckRegistered = false;

            let contracts = [contract, contract2];
            let accounts = [new AccountViewModel('123123', contracts)];

            comp.accounts = accounts;
            let testStatus = 'UpdatePending';
            let testDate = '2017-04-06';
            this.formattedDate = moment(testDate).format('D MMM YYYY');

            let mockSolarCheckResponse = {
                solarStatus: testStatus,
                measuredExpectedRatio: '0.9',
                confidence: '0.8',
                dataStartDate: '02/15/2017',
                dataEndDate: '04/11/2017',
                processedDateTime: testDate
            };

            let mockIsEligibleResponse = {
                eligible: true,
                contracts: [
                    {
                        contractNumber: '56879',
                        eligible: false,
                        registrationStatus: SolarCheckRegistrationStatusType.Registered
                    }
                ]
            };

            let solarCheckService = fixture.debugElement.injector.get(ISolarCheckService);
            spyOn(solarCheckService, 'getStatus').and.returnValue(Observable.of(mockSolarCheckResponse));
            spyOn(solarCheckService, 'isEligible').and.returnValue(Observable.of(mockIsEligibleResponse));

            // ACT
            fixture.detectChanges();

            // ASSERT
            let messageHeader = de.query(By.css('.message-header'));
            el = messageHeader.nativeElement;
            expect(el.innerText.toLowerCase().trim()).toContain('solar command check status is being calculated.');

            let messageDetails = de.query(By.css('.message-details'));
            el = messageDetails.nativeElement;
            expect(el.innerText.toLowerCase().trim()).toContain('check back tomorrow.');

            let desktopImageStatusGood = de.query(By.css('.main-image img[src*="scs_status_registered.svg"] '));
            expect(desktopImageStatusGood).not.toBeNull('could not find desktop icon image scs_status_registered.svg');

            let desktopLinkElement = de.query(By.css('.link-text'));
            el = desktopLinkElement.nativeElement;
            expect(el.innerText.toUpperCase()).toBe('LEARN MORE');

            let mobileLinkElement = de.query(By.css('.mob-link-text'));
            el = mobileLinkElement.nativeElement;
            expect(el.innerText.toUpperCase()).toBe('LEARN MORE');

            let desktopButtonElement = de.query(By.css('.upper-panel .dls-button-override'));
            expect(desktopButtonElement).toBeNull('Desktop "Take Action" button unexpectedly appearing (referenced by class .upper-panel .buttonText)');

            let mobileButtonElement = de.query(By.css('.mobile-link .dls-button-override'));
            expect(mobileButtonElement).toBeNull('Desktop "Take Action" button unexpectedly appearing (referenced by class .mobile-link .buttonText)');

            let mobileImageStatusGood = de.query(By.css('.mobile-status img[src*="scs_status_registered.svg"] '));
            expect(mobileImageStatusGood).not.toBeNull('could not find mobile icon image scs_status_registered.svg');
        }));
    });

    describe('When Solar Check API response status is NotAvailable', () => {
        it('should set the ViewModel with the "registered" state properties', async(() => {

            // ARRANGE
            let contract = new ContractViewModel('123456789');
            contract.hasSolar = true;
            contract.solarCheckRegistered = true;

            let contract2 = new ContractViewModel('1234567890');
            contract2.hasSolar = false;
            contract2.solarCheckRegistered = false;

            let contracts = [contract, contract2];
            let accounts = [new AccountViewModel('123123', contracts)];

            comp.accounts = accounts;

            let testStatus = 'NotAvailable';
            let testDate = '2017-04-06';

            let mockSolarCheckResponse = {
                solarStatus: testStatus,
                measuredExpectedRatio: '0.9',
                confidence: '0.8',
                dataStartDate: '02/15/2017',
                dataEndDate: '04/11/2017',
                processedDateTime: testDate
            };

            let mockIsEligibleResponse = {
                eligible: true,
                contracts: [
                    {
                        contractNumber: '56879',
                        eligible: false,
                        registrationStatus: SolarCheckRegistrationStatusType.Registered
                    }
                ]
            };

            let solarCheckService = fixture.debugElement.injector.get(ISolarCheckService);
            spyOn(solarCheckService, 'getStatus').and.returnValue(Observable.of(mockSolarCheckResponse));
            spyOn(solarCheckService, 'isEligible').and.returnValue(Observable.of(mockIsEligibleResponse));

            // ACT
            fixture.detectChanges();

            // ASSERT
            let messageHeader = de.query(By.css('.message-header'));
            el = messageHeader.nativeElement;

            expect(el.innerText.toLowerCase().trim()).toContain('your solar command check will be available in about an hour; we\'ll email you when it\'s ready.');

            let desktopImageStatusGood = de.query(By.css('.main-image img[src*="scs_status_registered.svg"] '));
            expect(desktopImageStatusGood).not.toBeNull('could not find desktop icon image scs_status_registered.svg');

            let desktopLinkElement = de.query(By.css('.link-text'));
            el = desktopLinkElement.nativeElement;
            expect(el.innerText.toUpperCase()).toBe('LEARN MORE');

            let mobileLinkElement = de.query(By.css('.mob-link-text'));
            el = mobileLinkElement.nativeElement;
            expect(el.innerText.toUpperCase()).toBe('LEARN MORE');

            let desktopButtonElement = de.query(By.css('.upper-panel .dls-button-override'));
            expect(desktopButtonElement).toBeNull('Desktop "Take Action" button unexpectedly appearing (referenced by class .upper-panel .buttonText)');

            let mobileButtonElement = de.query(By.css('.mobile-link .dls-button-override'));
            expect(mobileButtonElement).toBeNull('Desktop "Take Action" button unexpectedly appearing (referenced by class .mobile-link .buttonText)');

            let mobileImageStatusGood = de.query(By.css('.mobile-status img[src*="scs_status_registered.svg"] '));
            expect(mobileImageStatusGood).not.toBeNull('could not find mobile icon image scs_status_registered.svg');
        }));
    });

    describe('When Solar Check API response status is "Fault" ', () => {
        it('should set the ViewModel with the "checkSystem" state properties', async(() => {

            // ARRANGE
            let contract = new ContractViewModel('123456789');
            contract.hasSolar = true;
            contract.solarCheckRegistered = true;

            let contract2 = new ContractViewModel('1234567890');
            contract2.hasSolar = false;
            contract2.solarCheckRegistered = false;

            let contracts = [contract, contract2];
            let accounts = [new AccountViewModel('123123', contracts)];

            comp.accounts = accounts;

            let testStatus = 'Fault';
            let testDate = '2017-04-06';

            let mockSolarCheckResponse = {
                solarStatus: testStatus,
                measuredExpectedRatio: '0.9',
                confidence: '0.8',
                dataStartDate: '02/15/2017',
                dataEndDate: '04/11/2017',
                processedDateTime: testDate
            };

            let mockIsEligibleResponse = {
                eligible: true,
                contracts: [
                    {
                        contractNumber: '56879',
                        eligible: false,
                        registrationStatus: SolarCheckRegistrationStatusType.Registered
                    }
                ]
            };

            let solarCheckService = fixture.debugElement.injector.get(ISolarCheckService);
            spyOn(solarCheckService, 'getStatus').and.returnValue(Observable.of(mockSolarCheckResponse));
            spyOn(solarCheckService, 'isEligible').and.returnValue(Observable.of(mockIsEligibleResponse));

            // ACT
            fixture.detectChanges();

            // ASSERT
            let upperMainElement2 = de.query(By.css('.icon-check-response'));
            expect(upperMainElement2).not.toBeNull('could not find element with class .icon-check-response');

            let messageHeader = de.query(By.css('.message-header'));
            el = messageHeader.nativeElement;
            expect(el.innerText.toLowerCase().trim()).toContain('your system may have an issue.');

            let messageDetails = de.query(By.css('.message-details'));
            el = messageDetails.nativeElement;
            expect(el.innerText.toLowerCase().trim()).toContain('updated');

            let formattedTestDate = moment(testDate).format('D MMM YYYY').trim().toLowerCase();
            expect(el.innerText.toLowerCase().trim()).toContain(formattedTestDate);

            let desktopImageStatusGood = de.query(By.css('.main-image img[src*="scs_status_checkSystem.svg"] '));
            expect(desktopImageStatusGood).not.toBeNull('could not find desktop icon image scs_status_checkSystem.svg');

            let desktopLinkElement = de.query(By.css('.link-text'));
            expect(desktopLinkElement).toBeNull('class .link-text unexpectedly appearing.');

            let mobileLinkElement = de.query(By.css('.mob-link-text'));
            expect(mobileLinkElement).toBeNull('class .mob-link-text unexpectedly appearing.');

            let desktopButtonElement = de.query(By.css('.upper-panel .dls-button-override'));
            el = desktopButtonElement.nativeElement;
            expect(el.innerText.toUpperCase()).toBe('WHAT DOES THIS MEAN?');

            let mobileButtonElement = de.query(By.css('.mobile-link .dls-button-override'));
            el = mobileButtonElement.nativeElement;

            let mobileImageStatusGood = de.query(By.css('.mobile-status img[src*="scs_status_checkSystem.svg"] '));
            expect(mobileImageStatusGood).not.toBeNull('could not find mobile icon image scs_status_checkSystem.svg');
        }));
    });

    describe('When Solar Check API response status is not a defined status type', () => {
        it('should set the ViewModel with the "notAvailable" state properties', async(() => {

            // ARRANGE
            let contract = new ContractViewModel('123456789');
            contract.hasSolar = true;
            contract.solarCheckRegistered = true;

            let contract2 = new ContractViewModel('1234567890');
            contract2.hasSolar = false;
            contract2.solarCheckRegistered = false;

            let contracts = [contract, contract2];
            let accounts = [new AccountViewModel('123123', contracts)];

            comp.accounts = accounts;

            let testStatus = 'thisIsAnUndefinedStatusCode';
            let testDate = '2017-04-06';

            let mockSolarCheckResponse = {
                solarStatus: testStatus,
                measuredExpectedRatio: '0.9',
                confidence: '0.8',
                dataStartDate: '02/15/2017',
                dataEndDate: '04/11/2017',
                processedDateTime: testDate
            };

            let mockIsEligibleResponse = {
                eligible: true,
                contracts: [
                    {
                        contractNumber: '56879',
                        eligible: false,
                        registrationStatus: SolarCheckRegistrationStatusType.Registered
                    }
                ]
            };

            let solarCheckService = fixture.debugElement.injector.get(ISolarCheckService);
            spyOn(solarCheckService, 'getStatus').and.returnValue(Observable.of(mockSolarCheckResponse));
            spyOn(solarCheckService, 'isEligible').and.returnValue(Observable.of(mockIsEligibleResponse));

            // ACT
            fixture.detectChanges();

            // ASSERT
            let messageHeader = de.query(By.css('.message-header'));
            el = messageHeader.nativeElement;
            expect(el.innerText.toLowerCase().trim()).toContain("sorry, your solar status isn't currently available.");

            let messageDetails = de.query(By.css('.message-details'));
            el = messageDetails.nativeElement;
            expect(el.innerText.toLowerCase().trim()).toContain('check back soon.');

            let desktopImageStatusGood = de.query(By.css('.main-image img[src*="scs_status_notAvailable.svg"] '));
            expect(desktopImageStatusGood).not.toBeNull('could not find desktop icon image scs_status_notAvailable.svg');

            let desktopLinkElement = de.query(By.css('.link-text'));
            el = desktopLinkElement.nativeElement;
            expect(el.innerText.toUpperCase()).toBe('LEARN MORE');

            let mobileLinkElement = de.query(By.css('.mob-link-text'));
            el = mobileLinkElement.nativeElement;
            expect(el.innerText.toUpperCase()).toBe('LEARN MORE');

            let desktopButtonElement = de.query(By.css('.upper-panel .dls-button-override'));
            expect(desktopButtonElement).toBeNull('Desktop "Take Action" button unexpectedly appearing (referenced by class .upper-panel .buttonText)');

            let mobileButtonElement = de.query(By.css('.mobile-link .dls-button-override'));
            expect(mobileButtonElement).toBeNull('Desktop "Take Action" button unexpectedly appearing (referenced by class .mobile-link .buttonText)');

            let mobileImageStatusGood = de.query(By.css('.mobile-status img[src*="scs_status_notAvailable.svg"] '));
            expect(mobileImageStatusGood).not.toBeNull('could not find mobile icon image scs_status_notAvailable.svg');
        }));
    });
});
