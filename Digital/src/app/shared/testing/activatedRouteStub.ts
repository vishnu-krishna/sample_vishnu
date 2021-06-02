import { Injectable } from '@angular/core';
import { convertToParamMap, ParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ActivatedRouteStub {

    // ActivatedRoute.paramMap is Observable
    private subject = new BehaviorSubject(convertToParamMap(this.testParamMap));

    public get paramMap() {
        return this.subject.asObservable();
    }

    // Test parameters
    private _testParamMap: ParamMap;
    public get testParamMap() { return this._testParamMap; }
    public set testParamMap(params: {}) {
        this._testParamMap = convertToParamMap(params);
        this.subject.next(this._testParamMap);
    }

    // ActivatedRoute.snapshot.paramMap
    public get snapshot() {
        return { paramMap: this.testParamMap };
    }
}
