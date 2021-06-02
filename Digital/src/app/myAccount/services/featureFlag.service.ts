import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ReplaySubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { IFeatureFlagService } from './contract/ifeatureflag.service';
import { FeatureFlagKeyPrefix, FeatureFlagTypes } from './featureFlag.constants';

@Injectable()
class FeatureFlagService implements IFeatureFlagService {

    private featureFlagSubject: ReplaySubject<any>;

    private isCallInProgress: boolean = false;
    private hasData: boolean = false;

    constructor(
        private http: Http
    ) {
        this.featureFlagSubject = new ReplaySubject<any>(1);
    }

    /**
     * Combined feature flag method.
     *
     * @param {FeatureFlagTypes} featureFlag
     * @returns {Observable<boolean>}
     *
     * @memberOf FeatureFlagService
     */
    public featureFlagged(featureFlag: FeatureFlagTypes): Observable<boolean> {
        const featureFlagString = featureFlag.toString();
        const featureFlagKey = `${FeatureFlagKeyPrefix}${featureFlagString}`;
        // Check for storage key
        if (localStorage && localStorage.getItem(featureFlagKey) !== null) {
            let localStorageValue = JSON.parse(localStorage.getItem(featureFlagKey).toLowerCase());
            console.warn(`You have a local storage override of the feature flag key: ${featureFlagString} of: ${localStorageValue}`);
            return Observable.of(localStorageValue);
        }
        if (!this.isCallInProgress && !this.hasData) {
            this.loadFeatureFlagConfigurations();
        }
        return this.featureFlagSubject
            .first()
            .pluck('featureFlags', featureFlagString)
            .map((result: boolean | undefined) => {
                return (result === undefined ? false : result);
            });
    }

    public featureFlagValues(flagTypes: FeatureFlagTypes[]): Observable<boolean[]> {
        let requests: Array<Observable<boolean>> = [];
        for (let flag of flagTypes) {
            requests.push(this.featureFlagged(flag));
        }
        return Observable.forkJoin(requests);
    }

    public loadFeatureFlagConfigurations() {
        this.isCallInProgress = true;
        this.http
            .get('./config/featureFlags.json')
            .map(
                (response: any) => {
                    return response.json();
                })
            .finally(() => {
                this.isCallInProgress = false;
            })
            .subscribe(
                (response: any) => {
                    if (response) {
                        this.featureFlagSubject.next(response);
                        this.hasData = true;
                    }
                }
            );
    }

    public setAllFeatureFlags(value: boolean) {
        this.isCallInProgress = true;
        this.http
            .get('./config/featureFlags.json')
            .map(
                (response: any) => {
                    return response.json();
                })
            .finally(() => {
                this.isCallInProgress = false;
            })
            .subscribe((response: any) => {
                let boolVal = value ? 'true' : 'false';
                for (let featureFlagKey of Object.keys(response['featureFlags'])) {
                    localStorage.setItem(FeatureFlagKeyPrefix + featureFlagKey, boolVal);
                }
                console.warn('All feature flags have been set to ' + boolVal);
            });
    }

    public getFeatureFlags(flagTypes: FeatureFlagTypes[]): Observable<Map<FeatureFlagTypes, boolean>> {
        let featureFlags = new Map<FeatureFlagTypes, boolean>();
        flagTypes.map((flag) => {
            this.featureFlagged(flag).subscribe((isOn) => {
                featureFlags.set(flag, isOn);
            });
        });
        return Observable.of(featureFlags);
    }
}

export { FeatureFlagTypes, FeatureFlagService };
