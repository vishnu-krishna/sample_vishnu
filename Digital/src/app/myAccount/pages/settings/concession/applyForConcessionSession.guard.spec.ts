import { FeatureFlagTypes } from './../../../services/featureFlag.constants';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Mock } from 'ts-mocks';

import { FeatureFlagMockService } from '../../../services/mock/featureflag.mock.service';
import { FeatureFlagService } from '../../../services/featureFlag.service';
import { ApplyForConcessionSessionGuard } from './applyForConcessionSession.guard';
import { IConcessionStateService } from './services/concessionState.service';

describe('Apply For Concession Session Guard', () => {
    let sut: ApplyForConcessionSessionGuard;
    let router: Router;
    let featureFlagMockService: FeatureFlagService;
    let concessionStateMockService: IConcessionStateService;

    function configureTestingModule(hasSession: boolean) {
        let mockConcessionStateService = new Mock<IConcessionStateService>();
        mockConcessionStateService.setup((m) => m.hasSession).is(hasSession);

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            providers: [
                ApplyForConcessionSessionGuard,
                { provide: IConcessionStateService, useValue: mockConcessionStateService.Object },
                { provide: FeatureFlagService, useClass: FeatureFlagMockService }
            ]
        });

        sut = TestBed.get(ApplyForConcessionSessionGuard);
        router = TestBed.get(Router);
        featureFlagMockService = TestBed.get(FeatureFlagService);
        concessionStateMockService = TestBed.get(IConcessionStateService);
    }

    function actAndAssertGuardReturnsFalse(done: DoneFn) {
        let routerSpy = spyOn(router, 'navigate');

        const result = sut.canActivateChild(null, null);

        result.subscribe((value: boolean) => {
            expect(value).toBe(false);
            expect(routerSpy).toHaveBeenCalledWith([
                '/settings/personal'
            ]);
            done();
        });
    }

    describe('when feature flag is on', () => {
        describe('when session is already initialised',  () => {
            beforeEach(() => {
                configureTestingModule(true);

                spyOn(featureFlagMockService, 'featureFlagged').and.callFake((arg) => {
                    return Observable.of(arg === FeatureFlagTypes.applyForConcessionEnabled);
                });
            });

            it('should return true', (done: DoneFn) => {
                const result = sut.canActivateChild(null, null);

                result.subscribe((value: boolean) => {
                    expect(value).toBe(true);
                    done();
                });
            });
        });

        describe('when session is not already initialised',  () => {
            beforeEach(() => {
                configureTestingModule(false);

                spyOn(featureFlagMockService, 'featureFlagged').and.callFake((arg) => {
                    return Observable.of(arg === FeatureFlagTypes.applyForConcessionEnabled);
                });
            });

            it('should route to /settings/personal', (done: DoneFn) => {
                actAndAssertGuardReturnsFalse(done);
            });
        });
    });

    describe('when feature flag is off', () => {
        it('should route to /settings/personal', (done: DoneFn) => {
            configureTestingModule(false);

            spyOn(featureFlagMockService, 'featureFlagged').and.returnValue(Observable.of(false));

            actAndAssertGuardReturnsFalse(done);
        });
    });

    describe('when feature flag service errors', () => {
        it('should route to /settings/personal', (done: DoneFn) => {
            configureTestingModule(true);

            spyOn(featureFlagMockService, 'featureFlagged').and.returnValue(Observable.throw('test error'));

            actAndAssertGuardReturnsFalse(done);
        });
    });
});
