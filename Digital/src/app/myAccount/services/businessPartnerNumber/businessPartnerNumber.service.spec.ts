import { Observable } from 'rxjs/Observable';
import { ContactDetailModel } from './../../../shared/service/api.service';
import { BusinessPartnerNumberService } from './businessPartnerNumber.service';

describe('Business Partner Number(ID) service', () => {

    let contactDetailModel: ContactDetailModel;
    let apiServiceSpy;

    beforeEach(() => {

        contactDetailModel = {
            hasMultipleBusinessPartners: false,
            businessPartners: [{
                firstName: 'firstName',
                lastName: 'lastName',
                businessPartnerNumber: '901594023',
                phone: null,
                mobile: null,
                hasDateOfBirth: false,
                email: 'first.last@test.com'
            }]
        };

        apiServiceSpy = jasmine.createSpyObj('apiService', ['getContactDetail']);
        apiServiceSpy.getContactDetail.and.returnValue(Observable.from([contactDetailModel]));
    });

    it('should hash BpID correctly', () => {

        // ARRANGE
        let businessPartnerNumberService = new BusinessPartnerNumberService(apiServiceSpy);

        // ACT
        businessPartnerNumberService.getBusinessPartnerNumber().subscribe((result) => {

            // ASSERT
            expect(result.hashed).toBe('GiPTEVXNaEG2qX/Hn+RhnVt5/HI035i/FTmXKKwZdu8pZUBAIUJylmhUJQaaRTUy0BwO5nmSTsfvXana6vUQFw==');

        });
    });

    it('Contact API should only be called once', () => {

        // ARRANGE
        let businessPartnerNumberService = new BusinessPartnerNumberService(apiServiceSpy);

        businessPartnerNumberService.getBusinessPartnerNumber().subscribe((result1) => {

            // ACT
            businessPartnerNumberService.getBusinessPartnerNumber().subscribe((result2) => {

                // ASSERT
                expect(apiServiceSpy.getContactDetail).toHaveBeenCalledTimes(1);
            });
        });
    });

    it('Same BpID should be returned when cached', () => {

        // ARRANGE
        let businessPartnerNumberService = new BusinessPartnerNumberService(apiServiceSpy);

        businessPartnerNumberService.getBusinessPartnerNumber().subscribe((result1) => {

            // ACT
            contactDetailModel.businessPartners[0].businessPartnerNumber = '123';
            apiServiceSpy.getContactDetail.and.returnValue(Observable.from([contactDetailModel]));

            businessPartnerNumberService.getBusinessPartnerNumber().subscribe((result2) => {

                // ASSERT
                expect(apiServiceSpy.getContactDetail).toHaveBeenCalledTimes(1);
                expect(result2.bpId).toBe(result1.bpId);
            });
        });
    });

    it('Empty BusinessPartnerNumber object should be returned for no BpId', () => {

        // ARRANGE
        contactDetailModel.businessPartners = null;
        apiServiceSpy.getContactDetail.and.returnValue(Observable.from([contactDetailModel]));

        let businessPartnerNumberService = new BusinessPartnerNumberService(apiServiceSpy);

        // ACT
        businessPartnerNumberService.getBusinessPartnerNumber().subscribe((result) => {

            // ASSERT
            expect(result.bpId).toBe('');
            expect(result.hashed).toBe('');
        });
    });

    it('Empty BusinessPartnerNumber object should be returned if there is error', () => {

        // ARRANGE
        contactDetailModel.businessPartners = null;
        apiServiceSpy.getContactDetail.and.returnValue(new Observable((observer) => {
            observer.error(new Error('error'));
        }));

        let businessPartnerNumberService = new BusinessPartnerNumberService(apiServiceSpy);

        // ACT
        businessPartnerNumberService.getBusinessPartnerNumber().subscribe((result) => {

            // ASSERT
            expect(result.bpId).toBe('');
            expect(result.hashed).toBe('');
        });
    });
});
