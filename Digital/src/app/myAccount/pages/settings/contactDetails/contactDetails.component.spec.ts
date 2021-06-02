import { Location } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';

import { IApiService } from '../../../../shared/service/contract/iapi.service';
import { DataLayerService } from '../../../../shared/service/dataLayer.service';
import { DocumentService } from '../../../../shared/service/document.service';
import { ActivatedRouteStub } from '../../../../shared/testing/activatedRouteStub';
import { DataLayerStubService } from '../../../../test/stubs/dataLayer.stub.service';
import { ContactDetailsStateMockService } from '../../../services/mock/contactDetailsState.mock.service';
import { ContactDetailModel } from './../../../../shared/service/api.service';
import { ApiStubService } from './../../../../test/stubs/api.stub.service';
import { ContactDetailsComponent } from './contactDetails.component';
import { ContactDetailsModule } from './contactDetails.module';
import { ContactDetailsContext } from './contactDetailsContext.enum';
import { ContactDetailsContextService, IContactDetailsContextService } from './contactDetailsContext.service';
import { IContactDetailsStateService } from './contactDetailsState.service';

class TestContactDetailData {
    static get contactWithSingleBP(): ContactDetailModel {
        return {
            hasMultipleBusinessPartners: false,
            businessPartners: [{
                firstName: 'Vishnu',
                lastName: 'Chander',
                businessPartnerNumber: '123',
                phone: '',
                mobile: '0400 000 000',
                hasDateOfBirth: false,
                email: 'some.email@agl.com.au',
            }]
        };
    }

    static get contactWithMultiBP(): ContactDetailModel {
        return {
            hasMultipleBusinessPartners: true,
            businessPartners: [ /* details don't matter to the tests */ ]
        };
    }

    static get contactWithEmptyMobAndEmail(): ContactDetailModel {
        let contact = this.contactWithSingleBP;
        contact.businessPartners[0].mobile = '';
        contact.businessPartners[0].email = '';
        return contact;
    }

    static get contactWithInvalidMobAndBlankEmail(): ContactDetailModel {
        let contact = this.contactWithSingleBP;
        contact.businessPartners[0].mobile = '12344';
        contact.businessPartners[0].email = '';
        return contact;
    }

    static get contactWithValidMobAndBlankEmail(): ContactDetailModel {
        let contact = this.contactWithSingleBP;
        contact.businessPartners[0].mobile = '0403095052';
        contact.businessPartners[0].email = '';
        return contact;
    }

    static get contactWithBlankMobAndInvalidEmail(): ContactDetailModel {
        let contact = this.contactWithSingleBP;
        contact.businessPartners[0].mobile = '';
        contact.businessPartners[0].email = 'abc.bbc';
        return contact;
    }

    static get contactWithBlankMobAndValidEmail(): ContactDetailModel {
        let contact = this.contactWithSingleBP;
        contact.businessPartners[0].mobile = '';
        contact.businessPartners[0].email = 'a@a.com';
        return contact;
    }

    static get contactWithValidMobAndValidEmail(): ContactDetailModel {
        let contact = this.contactWithSingleBP;
        contact.businessPartners[0].mobile = '0403095052';
        contact.businessPartners[0].email = 'a@a.com';
        return contact;
    }

    static get contactWithInvalidMobAndInvalidEmail(): ContactDetailModel {
        let contact = this.contactWithSingleBP;
        contact.businessPartners[0].mobile = '345345';
        contact.businessPartners[0].email = 'abc.bbc';
        return contact;
    }
}

interface IValidationScenarios {
    describe: string;
    scenario: string;
    expectedOutcome: string;
    contactDetailResult: ContactDetailModel;
    newMobileVal?: string;
    newEmailVal?: string;
    expectedMobileErrorText?: string;
    expectedEmailErrorText?: string;
    expectUpdateContactDetailToBeCalled: boolean;
    /**
     * set to true to run an individual scenario
     */
    fdescribe?: boolean;
}

function configureTestBedForContext(context: ContactDetailsContext): void {
    const locationStub = {
        back(): void { /* stub */ }
    };

    const routerStub = {
        navigate: (urls: string[]) => {
            throw new Error('not implemented');
        }
    };

    const activatedRouteStub = new ActivatedRouteStub();
    activatedRouteStub.testParamMap = { context: context.toString() };

    TestBed.configureTestingModule({
        imports: [
            ContactDetailsModule,
            RouterTestingModule
        ],
        providers: [
            { provide: Location, useValue: locationStub },
            { provide: IApiService, useClass: ApiStubService },
            { provide: IContactDetailsStateService, useClass: ContactDetailsStateMockService },
            { provide: Router, useValue: routerStub },
            { provide: ActivatedRoute, useValue: activatedRouteStub },
            { provide: DataLayerService, useClass: DataLayerStubService },
            { provide: IContactDetailsContextService, useClass: ContactDetailsContextService }, // use the real service as is contains all the context specific validators
            DocumentService
        ]
    });
}

describe('Contact Details Component', () => {
    let comp: ContactDetailsComponent;
    let fixture: ComponentFixture<ContactDetailsComponent>;
    let de: DebugElement;
    let apiService: IApiService;

    describe('general contact details context', () => {
        beforeEach(() => {
            configureTestBedForContext(ContactDetailsContext.GeneralContactDetails);

            fixture = TestBed.createComponent(ContactDetailsComponent);
            comp = fixture.componentInstance;
            de = fixture.debugElement;
            apiService = de.injector.get(IApiService);
        });

        describe('getContactDetail api scenarios', () => {
            it('should set getContactDetailFailed to FALSE when getContactDetail Api succeeds', () => {
                spyOn(apiService, 'getContactDetail').and.returnValue(Observable.of(TestContactDetailData.contactWithSingleBP));
                comp.ngOnInit();
                expect(comp.getContactDetailFailed).toBe(false);
                expect(comp.isLoading).toBe(false);
            });

            it('should set getContactDetailFailed to TRUE when getContactDetail Api FAILS', () => {
                spyOn(apiService, 'getContactDetail').and.returnValue(Observable.throw('error'));
                comp.ngOnInit();
                expect(comp.getContactDetailFailed).toBe(true);
                expect(comp.isLoading).toBe(false);
            });

            it('should navigate back to /settings/personal for a multi bp contact', () => {
                spyOn(apiService, 'getContactDetail').and.returnValue(Observable.of(TestContactDetailData.contactWithMultiBP));
                let router = de.injector.get(Router);
                let routerSpy = spyOn(router, 'navigate');

                comp.ngOnInit();

                expect(comp.isLoading).toBe(true);
                expect(routerSpy).toHaveBeenCalledWith(['/settings/personal']);
            });
        });

        describe('Submit update', () => {
            it('should show an error when updateContactDetail returns false', () => {
                spyOn(apiService, 'getContactDetail').and.returnValue(Observable.of(TestContactDetailData.contactWithSingleBP));
                spyOn(apiService, 'updateContactDetail').and.returnValue(Observable.of(false));
                let contactDetailsStateMockService = de.injector.get(IContactDetailsStateService);
                let dataLayerService = de.injector.get(DataLayerService);
                spyOn(contactDetailsStateMockService, 'setControlsUpdated');
                spyOn(contactDetailsStateMockService, 'getControlsUpdated');
                spyOn(dataLayerService, 'pushFormFailure');
                fixture.detectChanges();

                let controlEmail = comp.contactDetailsForm.get('email');
                controlEmail.setValue('b@b.com');
                let controlMobile = comp.contactDetailsForm.get('mobile');
                controlMobile.setValue('0403095052');
                fixture.detectChanges();

                let submitButton = de.query(By.css('.contact-details__cta-submit agl-maui-button'));
                submitButton.triggerEventHandler('clicked', null);
                fixture.detectChanges();

                expect(comp.updateContactDetailFailed).toBe(true);
            });

            it('should call navigate and set state service when updateContactDetail returns true', () => {
                spyOn(apiService, 'getContactDetail').and.returnValue(Observable.of(TestContactDetailData.contactWithSingleBP));
                spyOn(apiService, 'updateContactDetail').and.returnValue(Observable.of(true));

                let location: Location = de.injector.get(Location);
                const locationSpy = spyOn(location, 'back');

                let contactDetailsStateMockService = de.injector.get(IContactDetailsStateService);
                let stateServiceSpy = spyOn(contactDetailsStateMockService, 'detailsUpdatedSuccessfully');
                let stateServiceDetailsUpdatedSpy = spyOn(contactDetailsStateMockService, 'setControlsUpdated');
                let stateServiceDetailsFetchedSpy = spyOn(contactDetailsStateMockService, 'getControlsUpdated');

                fixture.detectChanges();

                let controlEmail = comp.contactDetailsForm.get('email');
                controlEmail.setValue('b@b.com');
                let controlMobile = comp.contactDetailsForm.get('mobile');
                controlMobile.setValue('0403095052');
                fixture.detectChanges();

                let submitButton = de.query(By.css('.contact-details__cta-submit agl-maui-button'));
                submitButton.triggerEventHandler('clicked', null);
                fixture.detectChanges();

                expect(comp.updateContactDetailFailed).toBe(false);
                expect(locationSpy).toHaveBeenCalled();
                expect(stateServiceSpy).toHaveBeenCalled();
            });
        });

        describe('Contact details form validation', () => {
            it(`should not show validation until submit is clicked in general contact details`, () => {
                spyOn(apiService, 'getContactDetail').and.returnValue(Observable.of(TestContactDetailData.contactWithInvalidMobAndInvalidEmail));
                fixture.detectChanges();

                let errorMessage = de.query(By.css('.contact-details__form-mobile-number .has-error'));
                expect(errorMessage).toBeFalsy(`expected mobile error not to be displayed`);

                errorMessage = de.query(By.css('.contact-details__form-email-address .has-error'));
                expect(errorMessage).toBeFalsy(`expected email error not to be displayed`);

                let submitButton = de.query(By.css('.contact-details__cta-submit agl-maui-button'));
                submitButton.triggerEventHandler('clicked', null);
                fixture.detectChanges();

                errorMessage = de.query(By.css('.contact-details__form-mobile-number .has-error'));
                expect(errorMessage).toBeTruthy(`expected mobile error to be displayed`);

                errorMessage = de.query(By.css('.contact-details__form-email-address .has-error'));
                expect(errorMessage).toBeTruthy(`expected email error to be displayed`);
            });

            describe('Validation on submit for different email/mobile scenarios', () => {
                const invalidMobileValidationMessage = 'That doesn\'t look like a valid Australian mobile number. Please try again.';
                const mobileRequiredValidationMessage = 'Sorry, mobile number cannot be blank.';
                const invalidEmailValidationMessage = 'That doesn\'t look like a valid email address. Please try again.';
                const emailRequiredValidationMessage = 'Sorry, email address cannot be blank.';

                let validationScenarios: IValidationScenarios[] = [
                    {
                        describe: '01. Invalid mobile number and invalid email from getContactDetail api',
                        scenario: 'when nothing changed',
                        expectedOutcome: 'should display error',
                        contactDetailResult: TestContactDetailData.contactWithInvalidMobAndInvalidEmail,
                        expectedMobileErrorText: invalidMobileValidationMessage,
                        expectedEmailErrorText: invalidEmailValidationMessage,
                        expectUpdateContactDetailToBeCalled: false
                    },
                    {
                        describe: '02. Invalid mobile number and invalid email from getContactDetail api',
                        scenario: 'when only valid mobile is added',
                        expectedOutcome: 'should display error',
                        contactDetailResult: TestContactDetailData.contactWithInvalidMobAndInvalidEmail,
                        newMobileVal: '0403095052',
                        expectedEmailErrorText: invalidEmailValidationMessage,
                        expectUpdateContactDetailToBeCalled: false
                    },
                    {
                        describe: '03. Invalid mobile number and invalid email from getContactDetail api',
                        scenario: 'when only valid email is added',
                        expectedOutcome: 'should display error',
                        contactDetailResult: TestContactDetailData.contactWithInvalidMobAndInvalidEmail,
                        newEmailVal: 'a@a.com',
                        expectedMobileErrorText: invalidMobileValidationMessage,
                        expectUpdateContactDetailToBeCalled: false
                    },
                    {
                        describe: '04. Invalid mobile number and invalid email from getContactDetail api',
                        scenario: 'when valid mobile and valid email are added',
                        expectedOutcome: 'should call updateContactDetail api',
                        contactDetailResult: TestContactDetailData.contactWithInvalidMobAndInvalidEmail,
                        newMobileVal: '0403095052',
                        newEmailVal: 'a@a.com',
                        expectUpdateContactDetailToBeCalled: true
                    },
                    {
                        describe: '05. Invalid mobile number and invalid email from getContactDetail api',
                        scenario: 'when clearing mobile number and email address',
                        expectedOutcome: 'should display error',
                        contactDetailResult: TestContactDetailData.contactWithInvalidMobAndInvalidEmail,
                        newMobileVal: '',
                        newEmailVal: '',
                        expectedMobileErrorText: mobileRequiredValidationMessage,
                        expectedEmailErrorText: emailRequiredValidationMessage,
                        expectUpdateContactDetailToBeCalled: false
                    },
                    {
                        describe: '06. Invalid mobile number and Invalid email from getContactDetail api',
                        scenario: 'when clearing mobile number',
                        expectedOutcome: 'should display error',
                        contactDetailResult: TestContactDetailData.contactWithInvalidMobAndInvalidEmail,
                        newMobileVal: '',
                        expectedMobileErrorText: mobileRequiredValidationMessage,
                        expectedEmailErrorText: invalidEmailValidationMessage,
                        expectUpdateContactDetailToBeCalled: false
                    },
                    {
                        describe: '07. Valid mobile number and valid email from getContactDetail api',
                        scenario: 'when clearing the email address',
                        expectedOutcome: 'should display error',
                        contactDetailResult: TestContactDetailData.contactWithValidMobAndValidEmail,
                        newEmailVal: '',
                        expectedEmailErrorText: emailRequiredValidationMessage,
                        expectUpdateContactDetailToBeCalled: false
                    },
                    {
                        describe: '07.1 Valid mobile number and valid email from getContactDetail api',
                        scenario: 'when clearing the mobile number and adding only spaces',
                        expectedOutcome: 'should display error',
                        contactDetailResult: TestContactDetailData.contactWithValidMobAndValidEmail,
                        newMobileVal: '      ',
                        expectedMobileErrorText: invalidMobileValidationMessage,
                        expectUpdateContactDetailToBeCalled: false
                    },
                    {
                        describe: '07.2 Valid mobile number and valid email from getContactDetail api',
                        scenario: 'when clearing the email address and adding only spaces',
                        expectedOutcome: 'should display error',
                        contactDetailResult: TestContactDetailData.contactWithValidMobAndValidEmail,
                        newEmailVal: '       ',
                        expectedEmailErrorText: invalidEmailValidationMessage,
                        expectUpdateContactDetailToBeCalled: false
                    },
                    {
                        describe: '07.3 Valid mobile number and valid email from getContactDetail api',
                        scenario: 'when clearing the email address and mobile number and adding only spaces',
                        expectedOutcome: 'should display error',
                        contactDetailResult: TestContactDetailData.contactWithValidMobAndValidEmail,
                        newMobileVal: '     ',
                        newEmailVal: '      ',
                        expectedMobileErrorText: invalidMobileValidationMessage,
                        expectedEmailErrorText: invalidEmailValidationMessage,
                        expectUpdateContactDetailToBeCalled: false
                    },
                    {
                        describe: '07.4 Valid mobile number and valid email from getContactDetail api',
                        scenario: 'with leading/trailing space',
                        expectedOutcome: 'should call updateContactDetail api and call location.back',
                        contactDetailResult: TestContactDetailData.contactWithValidMobAndValidEmail,
                        newMobileVal: ' 0403095055 ',
                        newEmailVal: ' b@b.com ',
                        expectUpdateContactDetailToBeCalled: true
                    },
                    {
                        describe: '08. Valid mobile number and valid email from getContactDetail api',
                        scenario: 'when clearing the email address and mobile number',
                        expectedOutcome: 'should display error',
                        contactDetailResult: TestContactDetailData.contactWithValidMobAndValidEmail,
                        newMobileVal: '',
                        newEmailVal: '',
                        expectedMobileErrorText: mobileRequiredValidationMessage,
                        expectedEmailErrorText: emailRequiredValidationMessage,
                        expectUpdateContactDetailToBeCalled: false
                    },
                    {
                        describe: '09. Valid mobile number and valid email from getContactDetail api',
                        scenario: 'when changing to different valid mobile number and email address',
                        expectedOutcome: 'should call updateContactDetail api and call location.back',
                        contactDetailResult: TestContactDetailData.contactWithValidMobAndValidEmail,
                        newMobileVal: '0403095055',
                        newEmailVal: 'b@b.com',
                        expectUpdateContactDetailToBeCalled: true
                    },
                    {
                        describe: '10. Valid mobile number and valid email from getContactDetail api',
                        scenario: 'when changing only valid email address',
                        expectedOutcome: 'should call updateContactDetail api and call location.back',
                        contactDetailResult: TestContactDetailData.contactWithValidMobAndValidEmail,
                        newEmailVal: 'b@b.com',
                        expectUpdateContactDetailToBeCalled: true
                    },
                    {
                        describe: '11. Valid mobile number and valid email from getContactDetail api',
                        scenario: 'when changing only valid mobile number',
                        expectedOutcome: 'should call updateContactDetail api and call location.back',
                        contactDetailResult: TestContactDetailData.contactWithValidMobAndValidEmail,
                        newMobileVal: '0403095055',
                        expectUpdateContactDetailToBeCalled: true
                    },
                    {
                        describe: '12. Valid mobile number and valid email from getContactDetail api',
                        scenario: 'when nothing changed',
                        expectedOutcome: 'should call location.back',
                        contactDetailResult: TestContactDetailData.contactWithValidMobAndValidEmail,
                        expectUpdateContactDetailToBeCalled: false
                    },
                    {
                        describe: '13. Blank mobile number and valid email from getContactDetail api',
                        scenario: 'when nothing changed',
                        expectedOutcome: 'should call location.back',
                        contactDetailResult: TestContactDetailData.contactWithBlankMobAndValidEmail,
                        expectUpdateContactDetailToBeCalled: false
                    },
                    {
                        describe: '14. Blank mobile number and valid email from getContactDetail api',
                        scenario: 'when valid mobile is added',
                        expectedOutcome: 'should call updateContactDetail and location.back',
                        contactDetailResult: TestContactDetailData.contactWithBlankMobAndValidEmail,
                        newMobileVal: '0403095055',
                        expectUpdateContactDetailToBeCalled: true
                    },
                    {
                        describe: '15. Blank mobile number and valid email from getContactDetail api',
                        scenario: 'when valid email is changed',
                        expectedOutcome: 'should call updateContactDetail and location.back',
                        contactDetailResult: TestContactDetailData.contactWithBlankMobAndValidEmail,
                        newEmailVal: 'b@b.com',
                        expectUpdateContactDetailToBeCalled: true
                    },
                    {
                        describe: '16. Blank mobile number and valid email from getContactDetail api',
                        scenario: 'when valid email and valid mobile is added',
                        expectedOutcome: 'should call updateContactDetail and location.back',
                        contactDetailResult: TestContactDetailData.contactWithBlankMobAndValidEmail,
                        newMobileVal: '0403095055',
                        newEmailVal: 'b@a.com',
                        expectUpdateContactDetailToBeCalled: true
                    },
                    {
                        describe: '17. Blank mobile number and valid email from getContactDetail api',
                        scenario: 'when invalid email and invalid mobile is added',
                        expectedOutcome: 'should display error',
                        contactDetailResult: TestContactDetailData.contactWithBlankMobAndValidEmail,
                        newMobileVal: '040309',
                        newEmailVal: 'bbc.asd',
                        expectedMobileErrorText: invalidMobileValidationMessage,
                        expectedEmailErrorText: invalidEmailValidationMessage,
                        expectUpdateContactDetailToBeCalled: false
                    },
                    {
                        describe: '18. Valid mobile number and blank email from getContactDetail api',
                        scenario: 'when nothing changed',
                        expectedOutcome: 'should call location.back',
                        contactDetailResult: TestContactDetailData.contactWithValidMobAndBlankEmail,
                        expectUpdateContactDetailToBeCalled: false
                    },
                    {
                        describe: '19. Valid mobile number and blank email from getContactDetail api',
                        scenario: 'when valid mobile number is changed',
                        expectedOutcome: 'should call updateContactDetail and call location.back',
                        contactDetailResult: TestContactDetailData.contactWithValidMobAndBlankEmail,
                        newMobileVal: '0403095055',
                        expectUpdateContactDetailToBeCalled: true
                    },
                    {
                        describe: '20. Valid mobile number and blank email from getContactDetail api',
                        scenario: 'when valid email is added',
                        expectedOutcome: 'should call updateContactDetail and call location.back',
                        contactDetailResult: TestContactDetailData.contactWithValidMobAndBlankEmail,
                        newEmailVal: 'b@b.com',
                        expectUpdateContactDetailToBeCalled: true
                    },
                    {
                        describe: '21. Valid mobile number and blank email from getContactDetail api',
                        scenario: 'when valid email and valid mobile number is added',
                        expectedOutcome: 'should call updateContactDetail and call location.back',
                        contactDetailResult: TestContactDetailData.contactWithValidMobAndBlankEmail,
                        newMobileVal: '0403095055',
                        newEmailVal: 'b@b.com',
                        expectUpdateContactDetailToBeCalled: true
                    },
                    {
                        describe: '22. Valid mobile number and blank email from getContactDetail api',
                        scenario: 'when mobile number is cleared',
                        expectedOutcome: 'should display error message',
                        contactDetailResult: TestContactDetailData.contactWithValidMobAndBlankEmail,
                        newMobileVal: '',
                        expectedMobileErrorText: mobileRequiredValidationMessage,
                        expectUpdateContactDetailToBeCalled: false
                    },
                    {
                        describe: '23. Valid mobile number and blank email from getContactDetail api',
                        scenario: 'when invalid mobile number and invalid email is added',
                        expectedOutcome: 'should display error message',
                        contactDetailResult: TestContactDetailData.contactWithValidMobAndBlankEmail,
                        newMobileVal: '45345',
                        newEmailVal: 'bb.com',
                        expectedMobileErrorText: invalidMobileValidationMessage,
                        expectedEmailErrorText: invalidEmailValidationMessage,
                        expectUpdateContactDetailToBeCalled: false
                    },
                    {
                        describe: '24. Invalid mobile number and blank email from getContactDetail api',
                        scenario: 'when nothing changed',
                        expectedOutcome: 'should display error message',
                        contactDetailResult: TestContactDetailData.contactWithInvalidMobAndBlankEmail,
                        expectedMobileErrorText: invalidMobileValidationMessage,
                        expectUpdateContactDetailToBeCalled: false
                    },
                    {
                        describe: '25. Invalid mobile number and blank email from getContactDetail api',
                        scenario: 'when only valid email is added',
                        expectedOutcome: 'should display error message',
                        contactDetailResult: TestContactDetailData.contactWithInvalidMobAndBlankEmail,
                        newEmailVal: 'b@b.com',
                        expectedMobileErrorText: invalidMobileValidationMessage,
                        expectUpdateContactDetailToBeCalled: false
                    },
                    {
                        describe: '26. Invalid mobile number and blank email from getContactDetail api',
                        scenario: 'when valid mobile number is added but no email added',
                        expectedOutcome: 'should call updateContactDetail api and call location.back',
                        contactDetailResult: TestContactDetailData.contactWithInvalidMobAndBlankEmail,
                        newMobileVal: '0403095055',
                        expectUpdateContactDetailToBeCalled: true
                    },
                    {
                        describe: '27. Invalid mobile number and blank email from getContactDetail api',
                        scenario: 'when valid mobile number and valid email added',
                        expectedOutcome: 'should call updateContactDetail api and call location.back',
                        contactDetailResult: TestContactDetailData.contactWithInvalidMobAndBlankEmail,
                        newMobileVal: '0403095055',
                        newEmailVal: 'b@b.com',
                        expectUpdateContactDetailToBeCalled: true
                    },
                    {
                        describe: '28. Invalid mobile number and blank email from getContactDetail api',
                        scenario: 'when mobile number is cleared',
                        expectedOutcome: 'should display error message',
                        contactDetailResult: TestContactDetailData.contactWithInvalidMobAndBlankEmail,
                        newMobileVal: '',
                        expectedMobileErrorText: mobileRequiredValidationMessage,
                        expectUpdateContactDetailToBeCalled: false
                    },
                    {
                        describe: '29. Invalid mobile number and blank email from getContactDetail api',
                        scenario: 'when invalid mobile number and invalid email are added',
                        expectedOutcome: 'should display error message',
                        contactDetailResult: TestContactDetailData.contactWithInvalidMobAndBlankEmail,
                        newMobileVal: '5435',
                        newEmailVal: 'bb.com',
                        expectedMobileErrorText: invalidMobileValidationMessage,
                        expectUpdateContactDetailToBeCalled: false
                    },
                    {
                        describe: '30. Both email and mobile number are blank from getContactDetail api',
                        scenario: 'when nothing changed',
                        expectedOutcome: 'should call location.back',
                        contactDetailResult: TestContactDetailData.contactWithEmptyMobAndEmail,
                        expectUpdateContactDetailToBeCalled: false
                    },
                    {
                        describe: '31. Both email and mobile number are blank from getContactDetail api',
                        scenario: 'when invalid email is entered',
                        expectedOutcome: 'should display error message',
                        contactDetailResult: TestContactDetailData.contactWithEmptyMobAndEmail,
                        newEmailVal: 'bb.com',
                        expectedEmailErrorText: invalidEmailValidationMessage,
                        expectUpdateContactDetailToBeCalled: false
                    },
                    {
                        describe: '32. Both email and mobile number are blank from getContactDetail api',
                        scenario: 'when invalid mobile number is entered',
                        expectedOutcome: 'should display error message',
                        contactDetailResult: TestContactDetailData.contactWithEmptyMobAndEmail,
                        newMobileVal: '5435',
                        expectedMobileErrorText: invalidMobileValidationMessage,
                        expectUpdateContactDetailToBeCalled: false
                    },
                    {
                        describe: '33. Both email and mobile number are blank from getContactDetail api',
                        scenario: 'when valid mobile number and valid email are added',
                        expectedOutcome: 'should call update contact detail api and call location.back',
                        contactDetailResult: TestContactDetailData.contactWithEmptyMobAndEmail,
                        newMobileVal: '0403095055',
                        newEmailVal: 'b@b.com',
                        expectUpdateContactDetailToBeCalled: true
                    },
                    {
                        describe: '34. Both email and mobile number are blank from getContactDetail api',
                        scenario: 'when only valid mobile number is added',
                        expectedOutcome: 'should call update contact detail api and call location.back',
                        contactDetailResult: TestContactDetailData.contactWithEmptyMobAndEmail,
                        newMobileVal: '0403095055',
                        expectUpdateContactDetailToBeCalled: true
                    },
                    {
                        describe: '35. Both email and mobile number are blank from getContactDetail api',
                        scenario: 'when only valid email is added',
                        expectedOutcome: 'should call update contact detail api and call location.back',
                        contactDetailResult: TestContactDetailData.contactWithEmptyMobAndEmail,
                        newEmailVal: 'b@b.com',
                        expectUpdateContactDetailToBeCalled: true
                    }
                ];

                let runAll = validationScenarios.every((t) => !t.fdescribe); /* if none have fdescribe set to true then run them all */
                for (let td of validationScenarios.filter((t) => runAll || t.fdescribe)) {
                    it(`${td.describe} ${td.scenario} ${td.expectedOutcome}`, () => {
                        spyOn(apiService, 'getContactDetail').and.returnValue(Observable.of(td.contactDetailResult));
                        fixture.detectChanges();

                        // update values
                        if (td.newMobileVal !== undefined) {
                            let controlMobile = comp.contactDetailsForm.get('mobile');
                            controlMobile.markAsTouched();
                            controlMobile.setValue(td.newMobileVal);
                            fixture.detectChanges();
                        }
                        if (td.newEmailVal !== undefined) {
                            let controlEmail = comp.contactDetailsForm.get('email');
                            controlEmail.markAsTouched();
                            controlEmail.setValue(td.newEmailVal);
                            fixture.detectChanges();
                        }

                        // submit form
                        let updateContactDetailSpy = spyOn(apiService, 'updateContactDetail').and.returnValue(Observable.of(true));

                        let contactDetailsStateMockService = de.injector.get(IContactDetailsStateService);
                        spyOn(contactDetailsStateMockService, 'detailsUpdatedSuccessfully');
                        let stateServiceSetControlsSpy = spyOn(contactDetailsStateMockService, 'setControlsUpdated');
                        fixture.detectChanges();

                        let location: Location = de.injector.get(Location);
                        const locationSpy = spyOn(location, 'back');

                        let submitButton = de.query(By.css('.contact-details__cta-submit agl-maui-button'));
                        submitButton.triggerEventHandler('clicked', null);
                        fixture.detectChanges();
                        let dataLayerService = de.injector.get(DataLayerService);
                        fixture.detectChanges();
                        if (td.expectUpdateContactDetailToBeCalled) {
                            expect(updateContactDetailSpy).toHaveBeenCalled();
                            expect(stateServiceSetControlsSpy).toHaveBeenCalled();
                        } else {

                            expect(updateContactDetailSpy).not.toHaveBeenCalled();
                        }

                        if (!td.expectedMobileErrorText && !td.expectedEmailErrorText) {
                            expect(locationSpy).toHaveBeenCalled();
                        }

                        // verify error messages
                        if (td.expectedMobileErrorText) {
                            let mobError = de.query(By.css('.contact-details__form-mobile-number .has-error'));
                            expect(mobError).toBeTruthy(`expected mobile error to be displayed`);
                            expect(mobError.nativeElement.innerText).toBe(td.expectedMobileErrorText, `expected mobile error to be ${td.expectedMobileErrorText}`);
                        }

                        if (td.expectedEmailErrorText) {
                            let emailError = de.query(By.css('.contact-details__form-email-address .has-error'));
                            expect(emailError).toBeTruthy(`expected email error to be displayed`);
                            expect(emailError.nativeElement.innerText).toBe(td.expectedEmailErrorText, `expected mobile error to be ${td.expectedEmailErrorText}`);
                        }
                    });
                }
            });
        });
    });

    describe('ebilling context', () => {
        beforeEach(() => {
            configureTestBedForContext(ContactDetailsContext.EBilling);

            fixture = TestBed.createComponent(ContactDetailsComponent);
            comp = fixture.componentInstance;
            de = fixture.debugElement;
            apiService = de.injector.get(IApiService);
        });

        describe('Contact details form validation', () => {
            it(`should only show email validation prior to submit being clicked in ebilling`, () => {
                spyOn(apiService, 'getContactDetail').and.returnValue(Observable.of(TestContactDetailData.contactWithInvalidMobAndInvalidEmail));
                fixture.detectChanges();

                let errorMessage = de.query(By.css('.contact-details__form-mobile-number .has-error'));
                expect(errorMessage).toBeFalsy(`expected mobile error not to be displayed`);

                errorMessage = de.query(By.css('.contact-details__form-email-address .has-error'));
                expect(errorMessage).toBeTruthy(`expected email error to be displayed`);

                let submitButton = de.query(By.css('.contact-details__cta-submit agl-maui-button'));
                submitButton.triggerEventHandler('clicked', null);
                fixture.detectChanges();

                errorMessage = de.query(By.css('.contact-details__form-mobile-number .has-error'));
                expect(errorMessage).toBeTruthy(`expected mobile error to be displayed`);

                errorMessage = de.query(By.css('.contact-details__form-email-address .has-error'));
                expect(errorMessage).toBeTruthy(`expected email error to be displayed`);
            });
        });
    });

    describe('smspay context', () => {
        beforeEach(() => {
            configureTestBedForContext(ContactDetailsContext.SMSPay);

            fixture = TestBed.createComponent(ContactDetailsComponent);
            comp = fixture.componentInstance;
            de = fixture.debugElement;
            apiService = de.injector.get(IApiService);
        });

        describe('Contact details form validation', () => {
            it(`should only show mobile validation prior to submit being clicked in smspay`, () => {
                spyOn(apiService, 'getContactDetail').and.returnValue(Observable.of(TestContactDetailData.contactWithInvalidMobAndInvalidEmail));
                fixture.detectChanges();

                let errorMessage = de.query(By.css('.contact-details__form-mobile-number .has-error'));
                expect(errorMessage).toBeTruthy(`expected mobile error to be displayed`);

                errorMessage = de.query(By.css('.contact-details__form-email-address .has-error'));
                expect(errorMessage).toBeFalsy(`expected email error not to be displayed`);

                let submitButton = de.query(By.css('.contact-details__cta-submit agl-maui-button'));
                submitButton.triggerEventHandler('clicked', null);
                fixture.detectChanges();

                errorMessage = de.query(By.css('.contact-details__form-mobile-number .has-error'));
                expect(errorMessage).toBeTruthy(`expected mobile error to be displayed`);

                errorMessage = de.query(By.css('.contact-details__form-email-address .has-error'));
                expect(errorMessage).toBeTruthy(`expected email error to be displayed`);
            });
        });
    });
});
