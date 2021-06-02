import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { IFeatureFlagService } from '../contract/ifeatureflag.service';

import { FeatureFlagTypes } from '../featureFlag.service';

@Injectable()
export class FeatureFlagMockService implements IFeatureFlagService {

    private featureFlagTypes: FeatureFlagTypes[] = null;

    public featureFlagged(types: FeatureFlagTypes): Observable<boolean> {
        if (this.featureFlagTypes !== null) {
            return Observable.of(this.featureFlagTypes.includes(types));
        }
        throw new Error('Method not implemented.');
    }

    public featureFlagValues(types: FeatureFlagTypes[]): Observable<boolean[]> {
        if (this.featureFlagTypes !== null) {
            const flagTypes = types.map((type) => this.featureFlagTypes.includes(type));
            return Observable.of(flagTypes);
        }
        throw new Error('Method not implemented.');
    }

    public getFeatureFlags(types: FeatureFlagTypes[]): Observable<Map<FeatureFlagTypes, boolean>> {
        if (this.featureFlagTypes !== null) {
            let featureFlags = new Map<FeatureFlagTypes, boolean>();
            types.map((flag) => {
                this.featureFlagged(flag).subscribe((isOn) => {
                    featureFlags.set(flag, isOn);
                });
            });
            return Observable.of(featureFlags);
        }
        throw new Error('Method not implemented.');
    }

    public isSolarCheckTurnedOn(): Observable<boolean> {
        throw new Error('Method not implemented.');
    }

    public setFeatureFlags(featureFlagTypes: FeatureFlagTypes[]) {
        this.featureFlagTypes = featureFlagTypes;
    }
}
