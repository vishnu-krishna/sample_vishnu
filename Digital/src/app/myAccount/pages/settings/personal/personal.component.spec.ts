import { PersonalModule } from './personal.module';
import { RouterTestingModule } from '@angular/router/testing';
import { FeatureFlagMockService } from './../../../services/mock/featureflag.mock.service';
import { Observable } from 'rxjs/Observable';
import { PersonalComponent } from './personal.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core/core';
import { By } from '@angular/platform-browser';
import { FeatureFlagService, FeatureFlagTypes } from '../../../services/featureFlag.service';
import { ConfigService } from '../../../../shared/service/config.service';
import { IApiService } from '../../../../shared/service/contract/iapi.service';
import { ApiStubService } from '../../../../test/stubs/api.stub.service';
import { ContactDetailModel } from './../../../../shared/service/api.service';
import { DocumentService } from '../../../../shared/service/document.service';
import { ContactDetailsStateService, IContactDetailsStateService } from '../contactDetails/contactDetailsState.service';
import { DataLayerService } from '../../../../shared/service/dataLayer.service';
import { DataLayerStubService } from '../../../../test/stubs/dataLayer.stub.service';
import { IConcessionStatusService, ConcessionStatusService } from '../concession/services/concessionStatus.service';
import { IAccountServiceMA } from '../../../services/account.service';
import { AccountMockService } from '../../../services/mock/account.mock.service';
import { ConcessionApiStubService } from '../../../../test/stubs/concessionApi.stub.service';
import { IConcessionApi } from '../../../services/concession/concessionApi.service';
import { ConcessionStatus } from '../concession/services/concessionStatus';
import { Mock } from 'ts-mocks';

describe('PersonalComponent', () => {
    let fixture: ComponentFixture<PersonalComponent>;
    let de: DebugElement;
    let featureFlagMockService: FeatureFlagMockService = new FeatureFlagMockService();

    beforeEach(() => {
        let accountMockService = new AccountMockService();
        let concessionStatusMockService = new Mock<IConcessionStatusService>();

        let contactDetailsStateMockService = new Mock<IContactDetailsStateService>();
        contactDetailsStateMockService.setup((m) => m.canNotifyOfSuccessfulUpdate).is(() => false);
        contactDetailsStateMockService.setup((m) => m.contextId).is(() => null);

        TestBed.configureTestingModule({
            imports: [
                PersonalModule,
                RouterTestingModule
            ],
            providers: [
                { provide: FeatureFlagService, useValue: featureFlagMockService },
                { provide: IApiService, useClass: ApiStubService },
                ConfigService,
                DocumentService,
                { provide: IContactDetailsStateService, useValue: contactDetailsStateMockService.Object },
                { provide: DataLayerService, useClass: DataLayerStubService },
                { provide: IConcessionStatusService, useValue: concessionStatusMockService.Object },
                { provide: IConcessionApi, useClass: ConcessionApiStubService },
                { provide: IAccountServiceMA, useValue: accountMockService },
            ]
        });

        fixture = TestBed.createComponent(PersonalComponent);
        de = fixture.debugElement;
    });

    describe('contact details link', () => {
        describe('single business partner', () => {
            beforeEach(() => {
                let apiService = de.injector.get(IApiService);
                let singleBpContactDetails: ContactDetailModel = {
                    hasMultipleBusinessPartners: false,
                    businessPartners: []
                };

                spyOn(apiService, 'getContactDetail').and.returnValue(Observable.of(singleBpContactDetails));
            });

            it('should link to /aeo/myaccount/update-details when contactDetailsEnabled feature flag is off', () => {
                let featureFlagService = fixture.debugElement.injector.get(FeatureFlagService);
                spyOn(featureFlagService, 'featureFlagged').and.returnValue(Observable.of(false));

                fixture.detectChanges();

                let link = de.query(By.css('.settings-container__contact-details-link'));
                expect(link.nativeElement.getAttribute('href')).toContain('/aeo/myaccount/update-details');
                expect(de.query(By.css('#LPContactDetailsMultipleBusinessPartners'))).toBeFalsy();
            });

            it('should link to /settings/contactdetails when contactDetailsEnabled feature flag is on', () => {
                featureFlagMockService.setFeatureFlags([FeatureFlagTypes.contactDetailsEnabled]);
                fixture.detectChanges();

                let link = de.query(By.css('.settings-container__contact-details-link'));
                expect(link.nativeElement.getAttribute('href')).toBe('/settings/contactdetails');
                expect(de.query(By.css('#LPContactDetailsMultipleBusinessPartners'))).toBeFalsy();
            });
        });

        describe('multiple business partners', () => {
            it('should show web chat component rather than contact details link', () => {
                let apiService = de.injector.get(IApiService);

                let multiBpContactDetails: ContactDetailModel = {
                    hasMultipleBusinessPartners: true,
                    businessPartners: []
                };

                spyOn(apiService, 'getContactDetail').and.returnValue(Observable.of(multiBpContactDetails));
                featureFlagMockService.setFeatureFlags([FeatureFlagTypes.contactDetailsEnabled]);

                fixture.detectChanges();

                expect(de.query(By.css('.settings-container__contact-details-link'))).toBeNull();
                expect(de.query(By.css('#LPContactDetailsMultipleBusinessPartners'))).toBeTruthy();
            });
        });
    });
});
