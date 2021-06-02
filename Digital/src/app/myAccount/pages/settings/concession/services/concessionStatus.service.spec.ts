import { ContactDetailModel, BusinessPartnerModel } from './../../../../../shared/service/api.service';
import { Observable } from 'rxjs/Observable';

import { ConcessionStatusService, IConcessionStatusService } from './concessionStatus.service';
import { ConcessionApiStubService } from './../../../../../test/stubs/concessionApi.stub.service';
import { IConcessionApi } from '../../../../services/concession/concessionApi.service';
import { IAccountServiceMA } from '../../../../services/account.service';
import { ApiStubService } from './../../../../../test/stubs/api.stub.service';
import { AccountMockService } from '../../../../services/mock/account.mock.service';
import { IApiService } from '../../../../../shared/service/contract/iapi.service';
import * as apiModel from '../../../../services/concession/concessionApi.service';
import { Mock } from 'ts-mocks';
import { IneligibleForConcession, ConcessionStatus, ConcessionApplied, ConcessionNotAppliedFor, UnknownConcessionStatus, ConcessionRejected, ConcessionRejectedReasons } from './concessionStatus';

describe('Concession Status Service', () => {
    let sut: IConcessionStatusService;

    function createHasAnyContractInRegionIdMock(contractInRegionId: string, throwError: boolean = false): IAccountServiceMA {
        const mock = new AccountMockService();
        spyOn(mock, 'hasAnyContractInRegionId').and.callFake((regionId) => throwError ? Observable.throw('test account service err') :
                                                                                        Observable.of(regionId === contractInRegionId));
        return mock;
    }

    function createGetContactDetailMock(hasMultipleBusinessPartners: boolean = false, throwError: boolean = false): IApiService {
        let mockContactDetail = new Mock<ContactDetailModel>();
        mockContactDetail.setup((m) => m.hasMultipleBusinessPartners).is(hasMultipleBusinessPartners);

        let mockBusinessPartner = new Mock<BusinessPartnerModel>();
        mockBusinessPartner.setup((m) => m.businessPartnerNumber).is('BP1234');
        mockContactDetail.setup((m) => m.businessPartners).is([mockBusinessPartner.Object]);

        const mock = new ApiStubService();
        spyOn(mock, 'getContactDetail').and.returnValue(throwError ? Observable.throw('test contact details err') : Observable.of(mockContactDetail.Object));
        return mock;
    }

    function createConcessionApiMock(apiResponse: apiModel.ConcessionStatus = null, throwError: boolean = false): IConcessionApi {
        const mock = new ConcessionApiStubService();
        spyOn(mock, 'getConcessionStatus').and.returnValue(throwError ? Observable.throw('test concession err') : Observable.of(apiResponse));
        return mock;
    }

    function createConcessionStatusService(concessionApiService: IConcessionApi,
                                           apiService: IApiService,
                                           accountService: IAccountServiceMA): IConcessionStatusService {
        return new ConcessionStatusService(concessionApiService, apiService, accountService);
    }

    describe('fetchConcessionStatusDetails', () => {
        it('should be IneligibleForConcession when any contract is in SA', (done: DoneFn) => {
            sut = createConcessionStatusService(createConcessionApiMock(),
                                                createGetContactDetailMock(),
                                                createHasAnyContractInRegionIdMock('SA'));

            sut.fetchConcessionStatusDetails()
                .subscribe((result: ConcessionStatus) => {
                    expect(result).toEqual(jasmine.any(IneligibleForConcession));
                    expect((<IneligibleForConcession> result).shouldContactSouthAustralianDeptOfCommunities).toBe(true);
                    done();
                }
            );
        });

        it('should be IneligibleForConcession when is multi-bp', (done: DoneFn) => {
            sut = createConcessionStatusService(createConcessionApiMock(),
                                                createGetContactDetailMock(true),
                                                createHasAnyContractInRegionIdMock('NSW'));

            sut.fetchConcessionStatusDetails()
                .subscribe((result: ConcessionStatus) => {
                    expect(result).toEqual(jasmine.any(IneligibleForConcession));
                    expect((<IneligibleForConcession> result).hasMultipleBusinessPartners).toBe(true);
                    done();
                }
            );
        });

        it('should be ConcessionApplied with isWesternAustraliaFairerWayPackageApplicable true when any contract is in WA', (done: DoneFn) => {
            sut = createConcessionStatusService(createConcessionApiMock(TestData.validConcessionStatus),
                                                createGetContactDetailMock(),
                                                createHasAnyContractInRegionIdMock('WA'));

            sut.fetchConcessionStatusDetails()
                .subscribe((result: ConcessionStatus) => {
                    expect(result).toEqual(jasmine.any(ConcessionApplied));
                    expect((<ConcessionApplied> result).isWesternAustraliaFairerWayPackageApplicable).toBe(true);
                    done();
                }
            );
        });

        it('should be ConcessionApplied with isWesternAustraliaFairerWayPackageApplicable false when any contract is in VIC', (done: DoneFn) => {
            sut = createConcessionStatusService(createConcessionApiMock(TestData.validConcessionStatus),
                                                createGetContactDetailMock(),
                                                createHasAnyContractInRegionIdMock('VIC'));

            sut.fetchConcessionStatusDetails()
                .subscribe((result: ConcessionStatus) => {
                    expect(result).toEqual(jasmine.any(ConcessionApplied));
                    expect((<ConcessionApplied> result).isWesternAustraliaFairerWayPackageApplicable).toBe(false);
                    done();
                }
            );
        });

        let errorsDataMap = [
            [ '100', ConcessionRejectedReasons.DetailsDidNotMatch, false ],
            [ '101', ConcessionRejectedReasons.CouldNotBeValidated, false],
            [ '102', ConcessionRejectedReasons.IsIneligible, true ],
            [ '103', ConcessionRejectedReasons.IsInvalid, true ]
        ];
        errorsDataMap.forEach((data) => {
            let errorNumber = data[0];
            let expectedReason = <ConcessionRejectedReasons> data[1];
            let expectedCanApplyAgain = <boolean> data[2];
            it(`should be ConcessionRejected when ErrorNumber is ${errorNumber}`, (done: DoneFn) => {
                sut = createConcessionStatusService(createConcessionApiMock(TestData.rejectedConcessionStatus(errorNumber.toString())),
                                                    createGetContactDetailMock(),
                                                    createHasAnyContractInRegionIdMock('NSW'));

                sut.fetchConcessionStatusDetails()
                    .subscribe((result: ConcessionStatus) => {
                        expect(result).toEqual(jasmine.any(ConcessionRejected));
                        expect((<ConcessionRejected> result).reason).toBe(expectedReason);
                        expect((<ConcessionRejected> result).canApplyAgain).toBe(expectedCanApplyAgain);
                        done();
                    }
                );
            });
        });

        it('should be ConcessionNotAppliedFor when card details are absent', (done: DoneFn) => {
            sut = createConcessionStatusService(createConcessionApiMock(TestData.noConcessionApplied),
                                                createGetContactDetailMock(),
                                                createHasAnyContractInRegionIdMock('NSW'));

            sut.fetchConcessionStatusDetails()
                .subscribe((result: ConcessionStatus) => {
                    expect(result).toEqual(jasmine.any(ConcessionNotAppliedFor));
                    done();
                }
            );
        });

        describe('should be UnknownConcessionStatus', () => {
            it('when getAccounts errors', (done: DoneFn) => {
                sut = createConcessionStatusService(createConcessionApiMock(),
                                                    createGetContactDetailMock(),
                                                    createHasAnyContractInRegionIdMock(null, true));

                sut.fetchConcessionStatusDetails()
                    .subscribe((result: ConcessionStatus) => {
                        expect(result).toEqual(jasmine.any(UnknownConcessionStatus));
                        done();
                    }
                );
            });

            it('when getContactDetail errors', (done: DoneFn) => {
                sut = createConcessionStatusService(createConcessionApiMock(),
                                                    createGetContactDetailMock(false, true),
                                                    createHasAnyContractInRegionIdMock('NSW'));

                sut.fetchConcessionStatusDetails()
                    .subscribe((result: ConcessionStatus) => {
                        expect(result).toEqual(jasmine.any(UnknownConcessionStatus));
                        done();
                    }
                );
            });

            it('when getConcessionStatus errors', (done: DoneFn) => {
                sut = createConcessionStatusService(createConcessionApiMock(null, true),
                                                    createGetContactDetailMock(),
                                                    createHasAnyContractInRegionIdMock('NSW'));

                sut.fetchConcessionStatusDetails()
                    .subscribe((result: ConcessionStatus) => {
                        expect(result).toEqual(jasmine.any(UnknownConcessionStatus));
                        done();
                    }
                );
            });

            it('when any contract region is empty', (done: DoneFn) => {
                sut = createConcessionStatusService(createConcessionApiMock(TestData.validConcessionStatus),
                                                    createGetContactDetailMock(),
                                                    createHasAnyContractInRegionIdMock(''));

                sut.fetchConcessionStatusDetails()
                    .subscribe((result: ConcessionStatus) => {
                        expect(result).toEqual(jasmine.any(UnknownConcessionStatus));
                        done();
                    }
                );
            });
        });

        describe('canApplyForConcession', () => {
            it(`should be true when no concession has been applied`, (done: DoneFn) => {
                sut = createConcessionStatusService(createConcessionApiMock(TestData.noConcessionApplied),
                                                    createGetContactDetailMock(),
                                                    createHasAnyContractInRegionIdMock('NSW'));

                sut.canApplyForConcession()
                    .subscribe((result: ConcessionStatus) => {
                        expect(result).toEqual(true);
                        done();
                    }
                );
            });

            it(`should be true when rejected concession status allows customer to apply again`, (done: DoneFn) => {
                sut = createConcessionStatusService(createConcessionApiMock(TestData.rejectedConcessionStatus('103')),
                                                    createGetContactDetailMock(),
                                                    createHasAnyContractInRegionIdMock('NSW'));

                sut.canApplyForConcession()
                    .subscribe((result: ConcessionStatus) => {
                        expect(result).toEqual(true);
                        done();
                    }
                );
            });

            it(`should be false when rejected concession status does not allow customer to apply again`, (done: DoneFn) => {
                sut = createConcessionStatusService(createConcessionApiMock(TestData.rejectedConcessionStatus('101')),
                                                    createGetContactDetailMock(),
                                                    createHasAnyContractInRegionIdMock('NSW'));

                sut.canApplyForConcession()
                    .subscribe((result: ConcessionStatus) => {
                        expect(result).toEqual(false);
                        done();
                    }
                );
            });
        });
    });
});

class TestData {
    static get noConcessionApplied(): apiModel.ConcessionStatus {
        return {
            cardAvailable: false
        };
    }

    static get validConcessionStatus(): apiModel.ConcessionStatus {
        return {
            cardAvailable: true,
            concessionCard: {
                cardCode: '111',
                issuerCode: '222',
                cardNumber: '111-222-333',
                cardName: 'Health card card'
            }
        };
    }

    static rejectedConcessionStatus(errorNumber: string): apiModel.ConcessionStatus {
        return {
            cardAvailable: true,
            concessionCard: {
                cardCode: '111',
                issuerCode: '222',
                cardNumber: '111-222-333',
                cardName: 'Health card card',
                error: {
                    internalError: {
                        errorNumber: errorNumber
                    }
                }
            }
        };
    }
}
