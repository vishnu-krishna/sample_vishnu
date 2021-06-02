import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { BusinessPartnerModel } from '../../../../shared/service/api.service';
import { ActivatedRouteStub } from '../../../../shared/testing/activatedRouteStub';
import { AglValidators } from './../../../../shared/validators/aglValidators';
import { ContactDetailsContextService } from './contactDetailsContext.service';

describe('Contact Details Context Service', () => {
    let sut: ContactDetailsContextService;

    function createActivatedRouteStub(contextRouteParam: string): ActivatedRoute {
        const stub = new ActivatedRouteStub();
        stub.testParamMap = { context: contextRouteParam };

        return (stub as any) as ActivatedRoute;
    }

    describe('verify correct heading and subheading is set', () => {
        it('for contact details', () => {
            sut = new ContactDetailsContextService(createActivatedRouteStub(''));
            expect(sut.heading).toBe('Update your contact details');
            expect(sut.subHeading).toBe('One easy place to update your contact details at any time');
        });

        it('for unknown context', () => {
            sut = new ContactDetailsContextService(createActivatedRouteStub('some-unknown-string'));
            expect(sut.heading).toBe('Update your contact details');
            expect(sut.subHeading).toBe('One easy place to update your contact details at any time');
        });

        it('for ebilling', () => {
            sut = new ContactDetailsContextService(createActivatedRouteStub('ebilling'));
            expect(sut.heading).toBe('Now we\'ll need your email address');
            expect(sut.subHeading).toBe('Enter it below to set up eBilling');
        });

        it('for smspay', () => {
            sut = new ContactDetailsContextService(createActivatedRouteStub('smspay'));
            expect(sut.heading).toBe('Now we\'ll need your mobile number');
            expect(sut.subHeading).toBe('Enter it below to set up SMS Pay');
        });
    });

    describe('validation is set correctly for', () => {
        describe('general contact details', () => {
            it('should require email/mobile when initial values contain text', () => {
                sut = new ContactDetailsContextService(createActivatedRouteStub(''));

                let validators = sut.getValidators('mobile', TestData.businessPartnerModelWithMobAndEmailSet);
                expect(validators).toEqual([AglValidators.mobile, Validators.required]);
                expect(sut.shouldRunValidationOnLoad('mobile')).toBe(false);

                validators = sut.getValidators('email', TestData.businessPartnerModelWithMobAndEmailSet);
                expect(validators).toEqual([AglValidators.email, Validators.required]);
                expect(sut.shouldRunValidationOnLoad('email')).toBe(false);
            });

            it('should not require email/mobile when initial values are empty', () => {
                sut = new ContactDetailsContextService(createActivatedRouteStub(''));

                let validators = sut.getValidators('mobile', TestData.businessPartnerModelWithEmptyMobAndEmail);
                expect(validators).toEqual([AglValidators.mobile]);
                expect(sut.shouldRunValidationOnLoad('mobile')).toBe(false);

                validators = sut.getValidators('email', TestData.businessPartnerModelWithEmptyMobAndEmail);
                expect(validators).toEqual([AglValidators.email]);
                expect(sut.shouldRunValidationOnLoad('email')).toBe(false);
            });
        });

        describe('ebilling', () => {
            it('should require email and run onload when initial value contains text', () => {
                sut = new ContactDetailsContextService(createActivatedRouteStub('ebilling'));
                let validators = sut.getValidators('email', TestData.businessPartnerModelWithMobAndEmailSet);

                expect(validators).toEqual([AglValidators.email, Validators.required]);
                expect(sut.shouldRunValidationOnLoad('email')).toBe(true);
            });

            it('should require email and run onload when initial value is empty', () => {
                sut = new ContactDetailsContextService(createActivatedRouteStub('ebilling'));
                let validators = sut.getValidators('email', TestData.businessPartnerModelWithEmptyMobAndEmail);

                expect(validators).toEqual([AglValidators.email, Validators.required]);
                expect(sut.shouldRunValidationOnLoad('email')).toBe(true);
            });
        });

        describe('smspay', () => {
            it('should require mobile and run onload when initial value contains text', () => {
                sut = new ContactDetailsContextService(createActivatedRouteStub('smspay'));
                let validators = sut.getValidators('mobile', TestData.businessPartnerModelWithMobAndEmailSet);

                expect(validators).toEqual([AglValidators.mobile, Validators.required]);
                expect(sut.shouldRunValidationOnLoad('mobile')).toBe(true);
            });

            it('should require mobile and run onload when initial value is empty', () => {
                sut = new ContactDetailsContextService(createActivatedRouteStub('smspay'));
                let validators = sut.getValidators('mobile', TestData.businessPartnerModelWithEmptyMobAndEmail);

                expect(validators).toEqual([AglValidators.mobile, Validators.required]);
                expect(sut.shouldRunValidationOnLoad('mobile')).toBe(true);
            });
        });
    });
});

class TestData {
    static get businessPartnerModelWithMobAndEmailSet(): BusinessPartnerModel {
        return {
            firstName: 'Vishnu',
            lastName: 'Chander',
            businessPartnerNumber: '123',
            phone: '',
            mobile: '0400 000 000',
            hasDateOfBirth: false,
            email: 'some.email@agl.com.au',
        };
    }

    static get businessPartnerModelWithEmptyMobAndEmail(): BusinessPartnerModel {
        return {
            firstName: 'Vishnu',
            lastName: 'Chander',
            businessPartnerNumber: '123',
            phone: '',
            mobile: '',
            hasDateOfBirth: false,
            email: '',
        };
    }
}
