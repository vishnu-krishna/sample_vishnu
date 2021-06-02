import { GenericStateService } from './genericState.service';
import { TestBed } from '@angular/core/testing';

describe('Generic State Service', () => {

    class TestStateModel {
        public string: string;
    }

    let sut: GenericStateService<TestStateModel>;
    const state: TestStateModel = {
            string: 'test'
    };

    beforeEach(() => {
        sut = new GenericStateService<TestStateModel>();
    });

    describe('hasState()', () => {

        it('should return false when service is first created', () => {
            // ASSERT
            expect(sut.hasState()).toBeFalsy();
        });

        describe('when setState() is then called', () => {
            beforeEach(() => {
            // ACT
                sut.setState(state);
            });

            it('should return true', () => {
                // ASSERT
                expect(sut.hasState()).toBeTruthy();
            });

            describe('when resetState() is then called', () => {
                it('should return false', () => {
                    // ACT
                    sut.resetState();
                    // ASSERT
                    expect(sut.hasState()).toBeFalsy();
                });
            });

        });

    });

    describe('getState()', () => {

        it('should return undefined when a state has not been set', () => {
            // ASSERT
            expect(sut.getState()).toBeUndefined();
        });

        describe('when setState() is then called', () => {
            beforeEach(() => {
            // ACT
                sut.setState(state);
            });

            it('should return the state', () => {
                // ASSERT
                expect(sut.getState()).toEqual(state);
            });

            describe('when resetState() is then called', () => {
                it('should return undefined', () => {
                    // ACT
                    sut.resetState();
                    // ASSERT
                    expect(sut.getState()).toBeUndefined();
                });
            });

            describe('when the local state is changed', () => {

                it('should be immutable', () => {
                    // ACT
                    const localState = sut.getState();
                    localState.string = 'changed';

                    // ASSERT
                    expect(sut.getState()).toEqual(state);
                    expect(sut.getState()).not.toBe(state);
                });
            });

        });
    });
});
