import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { ConfigService } from '../../../../../shared/service/config.service';
import { DataLayerService } from '../../../../../shared/service/dataLayer.service';
import { ConfigStubService } from '../../../../../test/stubs/config.stub.service';
import { DataLayerStubService } from '../../../../../test/stubs/dataLayer.stub.service';
import { MauiFlashMessageModule } from '../../../../maui/flashMessage';
import { FeatureFlagService } from '../../../../services/featureFlag.service';
import { ContactDetailsStateMockService } from '../../../../services/mock/contactDetailsState.mock.service';
import { FeatureFlagMockService } from '../../../../services/mock/featureflag.mock.service';
import { IContactDetailsStateService } from '../contactDetailsState.service';
import { FeatureFlagTypes } from './../../../../services/featureFlag.constants';
import { ContactDetailsConfirmationType } from './contactDetailsConfirmationType.enum';
import { ContactDetailsUpdateConfirmationComponent } from './contactDetailsUpdateConfirmation.component';

describe('ContactDetailsUpdateConfirmationComponent', () => {
    const loginBaseUrl = 'https://mock-loginBaseUrl';
    let fixture: ComponentFixture<ContactDetailsUpdateConfirmationComponent>;
    let de: DebugElement;
    let contactDetailsStateMockService: IContactDetailsStateService;
    let featureFlagMockService: FeatureFlagService;
    let dataLayerService: DataLayerService;

    beforeEach(() => {
        let configStubService = new ConfigStubService();
        configStubService.current.loginDetailsBaseUrl = loginBaseUrl; // TODO refactor to setup in the relevant it() functions once we use a version of jasmine that allows spyOnProperty()

        TestBed.configureTestingModule({
            declarations: [
                ContactDetailsUpdateConfirmationComponent
            ],
            imports: [
                MauiFlashMessageModule
            ],
            providers: [
                { provide: FeatureFlagService, useClass: FeatureFlagMockService },
                { provide: IContactDetailsStateService, useClass: ContactDetailsStateMockService },
                { provide: ConfigService, useValue: configStubService },
                { provide: DataLayerService, useClass: DataLayerStubService }
            ]
        });

        fixture = TestBed.createComponent(ContactDetailsUpdateConfirmationComponent);
        de = fixture.debugElement;
        contactDetailsStateMockService = de.injector.get(IContactDetailsStateService);
        dataLayerService = de.injector.get(DataLayerService);
        featureFlagMockService = de.injector.get(FeatureFlagService);
    });

    describe('based on contactDetailStateService state', () => {
        beforeEach(() => {
            spyOn(featureFlagMockService, 'featureFlagged').and.callFake((arg) => {
                return Observable.of(arg === FeatureFlagTypes.loginDetailsEnabled);
            });
        });

        it('should show success message when contact details have been recently updated and id matches specified id', () => {
            let contextId = '1234567890';
            spyOn(contactDetailsStateMockService, 'canNotifyOfSuccessfulUpdate').and.returnValue(true);
            let hasNotifiedSpy = spyOn(contactDetailsStateMockService, 'hasNotifiedOfSuccessfulUpdate');
            spyOn(contactDetailsStateMockService, 'contextId').and.returnValue(contextId);
            fixture.componentInstance.contextId = contextId;
            let getPrePushSpy = spyOn(dataLayerService, 'pushFormSuccess');
            let getControlsSpy = spyOn(contactDetailsStateMockService, 'getControlsUpdated');

            fixture.detectChanges();

            let flashMessage = de.query(By.css('.update-confirmation__flash-message'));
            expect(flashMessage).toBeTruthy();
            expect(hasNotifiedSpy).toHaveBeenCalled();
        });

        it('should show success message when contact details have been recently updated and id is not specified', () => {
            let contextId = '1234567890';
            spyOn(contactDetailsStateMockService, 'canNotifyOfSuccessfulUpdate').and.returnValue(true);
            let hasNotifiedSpy = spyOn(contactDetailsStateMockService, 'hasNotifiedOfSuccessfulUpdate');
            spyOn(contactDetailsStateMockService, 'contextId').and.returnValue(null);
            let getPrePushSpy = spyOn(dataLayerService, 'pushFormSuccess');
            let getControlsSpy = spyOn(contactDetailsStateMockService, 'getControlsUpdated');

            fixture.detectChanges();

            let flashMessage = de.query(By.css('.update-confirmation__flash-message'));
            expect(flashMessage).toBeTruthy();
            expect(hasNotifiedSpy).toHaveBeenCalled();
            expect(getPrePushSpy).toHaveBeenCalled();
        });

        it('should not show success message when contact details have been recently updated but id does not match specified id', () => {
            spyOn(contactDetailsStateMockService, 'canNotifyOfSuccessfulUpdate').and.returnValue(true);
            spyOn(contactDetailsStateMockService, 'contextId').and.returnValue('some id');
            let getPrePushSpy = spyOn(dataLayerService, 'pushFormSuccess');

            fixture.componentInstance.contextId = 'other id';
            fixture.detectChanges();

            let flashMessage = de.query(By.css('.update-confirmation__flash-message'));
            expect(flashMessage).toBeFalsy();
            expect(getPrePushSpy).not.toHaveBeenCalled();
        });

        it('should not show success message when contact details have not been recently updated', () => {
            spyOn(contactDetailsStateMockService, 'canNotifyOfSuccessfulUpdate').and.returnValue(false);
            spyOn(contactDetailsStateMockService, 'contextId');

            fixture.detectChanges();

            let flashMessage = de.query(By.css('.update-confirmation__flash-message'));
            expect(flashMessage).toBeFalsy();
        });
    });

    describe('based on the confirmationType input property', () => {
        beforeEach(() => {
            spyOn(featureFlagMockService, 'featureFlagged').and.returnValue(Observable.of(true));
            spyOn(contactDetailsStateMockService, 'canNotifyOfSuccessfulUpdate').and.returnValue(false);
            spyOn(contactDetailsStateMockService, 'contextId');
        });

        it('should show correct heading for general contact detail updates', () => {
            fixture.componentInstance.confirmationType = ContactDetailsConfirmationType.AnyContactDetails;
            expect(fixture.componentInstance.heading).toBe('You\'ve successfully updated your contact details.');
        });

        it('should show correct heading for email updates', () => {
            fixture.componentInstance.confirmationType = ContactDetailsConfirmationType.Email;
            expect(fixture.componentInstance.heading).toBe('You\'ve successfully updated your email address.');
        });

        it('should show correct heading for mobile updates', () => {
            fixture.componentInstance.confirmationType = ContactDetailsConfirmationType.Mobile;
            expect(fixture.componentInstance.heading).toBe('You\'ve successfully updated your mobile number.');
        });
    });

    describe ('link to view login details', () => {
        beforeEach(() => {
            spyOn(contactDetailsStateMockService, 'canNotifyOfSuccessfulUpdate').and.returnValue(true);
            spyOn(contactDetailsStateMockService, 'hasNotifiedOfSuccessfulUpdate');
            spyOn(contactDetailsStateMockService, 'contextId');
            spyOn(dataLayerService, 'pushFormSuccess');
            spyOn(contactDetailsStateMockService, 'getControlsUpdated');
        });

        it('should be set to the login details url when feature flag is enabled', () => {
            spyOn(featureFlagMockService, 'featureFlagged').and.callFake((arg) => {
                return Observable.of(arg === FeatureFlagTypes.loginDetailsEnabled);
            });

            fixture.detectChanges();

            let link = de.query(By.css('.update-confirmation__login-details'));
            expect(link).toBeTruthy();
            expect(link.nativeElement.getAttribute('href')).toContain(`${loginBaseUrl}/profile?returnTo=`);
        });

        it('should be hidden when feature flag is disabled', () => {
            spyOn(featureFlagMockService, 'featureFlagged').and.callFake((arg) => {
                return Observable.of(arg !== FeatureFlagTypes.loginDetailsEnabled);
            });
            fixture.detectChanges();

            let link = de.query(By.css('.update-confirmation__login-details'));
            expect(link).toBeFalsy();
        });
    });
});
