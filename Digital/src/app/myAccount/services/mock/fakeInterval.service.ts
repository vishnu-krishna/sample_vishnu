import { Injectable } from '@angular/core';

import { IIntervalService } from '../../../shared/service/interval.service';

@Injectable()
export class FakeIntervalService implements IIntervalService {
    private onMaxAttemptsExceededCalls = [];
    private paramSets: ParamSet[] = [];

    public safeSetInterval(uniqueIdentifer: string,
                           intervalMilliseconds: number,
                           maxAttempts: number,
                           callbackPredicate: () => boolean,
                           callback: () => void,
                           onMaxAttemptsExceeded: () => void) {
        this.paramSets.push(new ParamSet(uniqueIdentifer, maxAttempts, callbackPredicate, callback, onMaxAttemptsExceeded));
    }

    /**
     * Can be called in tests to simulate an interval processing cycle
     */
    public tick(uniqueIdentifer: string) {
        let currentSet: ParamSet = this.paramSets.find((ds) => ds.uniqueIdentifer === uniqueIdentifer);

        if (++currentSet.attempt > currentSet.maxAttempts) {
            currentSet.onMaxAttemptsExceeded();
            this.onMaxAttemptsExceededCalls[uniqueIdentifer] = true;
        } else if (currentSet.callbackPredicate()) {
            currentSet.callback();
        }
    }

    /**
     * Can be called in tests to check that onMaxAttemptsExceeded was called
     */
    public onMaxAttemptsExceededCalled(uniqueIdentifer: string): boolean {
        return !!this.onMaxAttemptsExceededCalls[uniqueIdentifer];
    }
}

class ParamSet {
    public attempt = 0;

    constructor(public uniqueIdentifer: string,
                public maxAttempts: number,
                public callbackPredicate: () => boolean,
                public callback: () => void,
                public onMaxAttemptsExceeded: () => void) {}
}
