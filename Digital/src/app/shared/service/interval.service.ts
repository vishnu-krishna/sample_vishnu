import { Injectable } from '@angular/core';

export abstract class IIntervalService {
    /**
     * To be used in place of window.setInterval, but prevents infinite loops by limiting the number of iterations to the maxAttempts param value
     * @param uniqueIdentifer Allows for easier debugging when multiple intervals are in use and also allows easier mocking of safeSetInterval
     * @param intervalMilliseconds
     * @param maxAttempts
     * @param callbackPredicate
     * @param callback To be executed when callbackPredicate() returns true
     * @param onMaxAttemptsExceeded
     */
    public abstract safeSetInterval(uniqueIdentifer: string,
                                    intervalMilliseconds: number,
                                    maxAttempts: number,
                                    callbackPredicate: () => boolean,
                                    callback: () => void,
                                    onMaxAttemptsExceeded: () => void);
}

@Injectable()
export class IntervalService implements IIntervalService {
    public safeSetInterval(uniqueIdentifer: string,
                           intervalMilliseconds: number,
                           maxAttempts: number,
                           callbackPredicate: () => boolean,
                           callback: () => void,
                           onMaxAttemptsExceeded: () => void) {
        this.setTimeoutUntilMaxAttempts(0, intervalMilliseconds, maxAttempts, callbackPredicate, callback, onMaxAttemptsExceeded);
    }

    private setTimeoutUntilMaxAttempts(attempt: number,
                                       intervalMilliseconds: number,
                                       maxAttempts: number,
                                       callbackPredicate: () => boolean,
                                       callback: () => void,
                                       onMaxAttemptsExceeded: () => void) {
        if (++attempt > maxAttempts) {
            onMaxAttemptsExceeded();
        } else {
            // we use setTimeout rather than set interval internally to avoid potential issues with setInterval https://zetafleet.com/blog/2010/04/why-i-consider-setinterval-to-be-harmful.html
            // could also be implemented with observable timers
            window.setTimeout(() => {
                if (callbackPredicate()) {
                    callback();
                    return;
                }
                this.setTimeoutUntilMaxAttempts(attempt, intervalMilliseconds, maxAttempts, callbackPredicate, callback, onMaxAttemptsExceeded);
            }, intervalMilliseconds);
        }
    }
}
