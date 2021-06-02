import { FeatureFlagTypes } from './../../../services/featureFlag.constants';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { FeatureFlagMockService } from '../../../services/mock/featureflag.mock.service';
import { FeatureFlagService } from '../../../services/featureFlag.service';
import { IConcessionStateService } from './services/concessionState.service';
import { ApplyForConcessionEntryGuard } from './applyForConcessionEntry.guard';
import { IApiService } from '../../../../shared/service/contract/iapi.service';
import { ApiStubService } from '../../../../test/stubs/api.stub.service';
import { ContactDetailModel } from '../../../../shared/service/api.service';
import { Concession } from './concession';
import { IAccountServiceMA, ContractViewModel, AccountViewModel } from '../../../services/account.service';
import { AccountMockService } from '../../../services/mock/account.mock.service';
import { IConcessionStatusService } from './services/concessionStatus.service';
import { ConcessionStatus, ConcessionNotAppliedFor, ConcessionApplied } from './services/concessionStatus';
import { Mock } from 'ts-mocks';

class TestData {
    static get contactWithSingleBP(): ContactDetailModel {
        return {
            hasMultipleBusinessPartners: false,
            businessPartners: [{
                firstName: 'firstName',
                lastName: 'lastName',
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
            businessPartners: [/*No need of data here for tests*/]
        };
    }
}

function createContractAccountViewModel(accountId: string): AccountViewModel {
    return new AccountViewModel(accountId);
}

describe('Apply For Concession Entry Guard', () => {
    let sut: ApplyForConcessionEntryGuard;
    let router: Router;
    let featureFlagMockService: FeatureFlagService;
    let apiService: IApiService;
    let accountService: IAccountServiceMA;
    let canApplyForConcessionSpy: jasmine.Spy;

    beforeEach(() => {
        let mockConcessionStateService = new Mock<IConcessionStateService>();
        mockConcessionStateService.setup((m) => m.initSession);

        let mockConcessionStatusService = new Mock<IConcessionStatusService>();
        canApplyForConcessionSpy = mockConcessionStatusService.setup((m) => m.canApplyForConcession).Spy;

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            providers: [
                ApplyForConcessionEntryGuard,
                { provide: IConcessionStateService, useValue: mockConcessionStateService.Object },
                { provide: FeatureFlagService, useClass: FeatureFlagMockService },
                { provide: IConcessionStatusService, useValue: mockConcessionStatusService.Object },
                { provide: IApiService, useClass: ApiStubService },
                { provide: IAccountServiceMA, useClass: AccountMockService }
            ]
        });

        sut = TestBed.get(ApplyForConcessionEntryGuard);
        router = TestBed.get(Router);
        featureFlagMockService = TestBed.get(FeatureFlagService);
        apiService = TestBed.get(IApiService);
        accountService = TestBed.get(IAccountServiceMA);
    });

    function actAndAssertGuardReturnsFalse(done: DoneFn) {
        let routerSpy = spyOn(router, 'navigate');

        const result = sut.canActivate(null, null);

        result.subscribe((value: boolean) => {
            expect(value).toBe(false);
            expect(routerSpy).toHaveBeenCalledWith([
                '/settings/personal'
            ]);
            done();
        });
    }

    describe('when feature flag is on', () => {
        describe('For Single Business Partner', () => {
            beforeEach(() => {
                spyOn(featureFlagMockService, 'featureFlagged').and.callFake((arg) => {
                    return Observable.of(arg === FeatureFlagTypes.applyForConcessionEnabled);
                });
                spyOn(apiService, 'getContactDetail').and.returnValue(Observable.of(TestData.contactWithSingleBP));
            });

            describe('with no concession applied', () => {
                beforeEach(() => {
                    canApplyForConcessionSpy.and.returnValue(Observable.of(true));
                });

                it('should route to /settings/concession/selectfuel - Single Account', (done: DoneFn) => {
                    let routerSpy = spyOn(router, 'navigate');
                    let mockAccounts: AccountViewModel[] = [
                        createContractAccountViewModel('123456789')
                    ];
                    spyOn(accountService, 'getAccounts').and.returnValue(Observable.of(mockAccounts));

                    const result = sut.canActivate(null, null);

                    result.subscribe((value: boolean) => {
                        expect(value).toBe(true);
                        expect(routerSpy).toHaveBeenCalledWith([
                            '/settings/concession/selectfuel/' + mockAccounts[0].accountNumber
                        ]);
                        done();
                    });
                });

                it('should route to /settings/concession/selectaccount - Multi Account', (done: DoneFn) => {
                    let routerSpy = spyOn(router, 'navigate');
                    let mockAccounts: AccountViewModel[] = [
                        createContractAccountViewModel('123456789'),
                        createContractAccountViewModel('234234233')
                    ];
                    spyOn(accountService, 'getAccounts').and.returnValue(Observable.of(mockAccounts));

                    const result = sut.canActivate(null, null);

                    result.subscribe((value: boolean) => {
                        expect(value).toBe(true);
                        expect(routerSpy).toHaveBeenCalledWith([
                            '/settings/concession/selectaccount'
                        ]);
                        done();
                    });
                });
            });

            describe('with existing concession applied', () => {
                beforeEach(() => {
                    canApplyForConcessionSpy.and.returnValue(Observable.of(false));
                });

                it('should route to /settings/personal', (done: DoneFn) => {
                    actAndAssertGuardReturnsFalse(done);
                });
            });
        });

        describe('when service call errors', () => {
            it('should route to /settings/personal', (done: DoneFn) => {
                spyOn(featureFlagMockService, 'featureFlagged').and.callFake((arg) => {
                    return Observable.of(arg === FeatureFlagTypes.applyForConcessionEnabled);
                });
                canApplyForConcessionSpy.and.returnValue(Observable.of(true));
                spyOn(apiService, 'getContactDetail').and.returnValue(Observable.throw('test error'));

                actAndAssertGuardReturnsFalse(done);
            });
        });

        describe('For Multi Business Partners', () => {
            beforeEach(() => {
                spyOn(featureFlagMockService, 'featureFlagged').and.callFake((arg) => {
                    return Observable.of(arg === FeatureFlagTypes.applyForConcessionEnabled);
                });
                spyOn(apiService, 'getContactDetail').and.returnValue(Observable.of(TestData.contactWithMultiBP));
                canApplyForConcessionSpy.and.returnValue(Observable.of(true));
            });

            it('should route to /settings/personal', (done: DoneFn) => {
                let mockAccounts: AccountViewModel[] = [
                    createContractAccountViewModel('123456789')
                ];
                spyOn(accountService, 'getAccounts').and.returnValue(Observable.of(mockAccounts));

                actAndAssertGuardReturnsFalse(done);
            });
        });
    });

    describe('when feature flag is off', () => {
        it('should route to /settings/personal', (done: DoneFn) => {
            spyOn(featureFlagMockService, 'featureFlagged').and.returnValue(Observable.of(false));

            actAndAssertGuardReturnsFalse(done);
        });
    });
});
