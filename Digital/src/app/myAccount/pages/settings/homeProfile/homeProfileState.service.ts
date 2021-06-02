import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HomeProfileViewModel } from './homeProfileViewModel';
import { IHomeProfileMapper } from './homeProfileMapper';
import { IHomeProfileApi, HomeProfileApiModel, HomeProfileApiService, HomeProfileSummaryApiModel } from '../../../services/homeProfile/homeProfileApi.service';

export abstract class IHomeProfileStateService {
    public abstract homeProfile: HomeProfileViewModel;
    public abstract initializeHomeProfile(contractNumber: string, isMultiAddresses: boolean, hasHomeProfile: boolean): Observable<boolean>;
    public abstract saveProfile(): Observable<boolean>;
    public abstract contractNumber: string;
    public abstract isMultiAddresses: boolean;
}

@Injectable()
export class HomeProfileStateService implements IHomeProfileStateService {
    public homeProfile: HomeProfileViewModel;
    public contractNumber: string;
    public isMultiAddresses: boolean = false;

    constructor(
        private homeProfileApi: IHomeProfileApi,
        private homeProfileMapper: IHomeProfileMapper
    ) {}

    public initializeHomeProfile(contractNumber: string, isMultiAddresses: boolean, hasHomeProfile: boolean): Observable<boolean> {
        if (this.contractNumber === contractNumber) {
            return Observable.of(true);
        }
        if (!hasHomeProfile) {
            this.contractNumber = contractNumber;
            this.isMultiAddresses = isMultiAddresses;
            this.homeProfile = new HomeProfileViewModel();
            return Observable.of(true);
        } else {
            return this.homeProfileApi.getProfile(contractNumber)
                .map((result: HomeProfileApiModel) => {
                    this.contractNumber = contractNumber;
                    this.isMultiAddresses = isMultiAddresses;
                    this.homeProfile = this.homeProfileMapper.toViewModel(result);
                    return true;
                }).catch((error) => Observable.of(false));
        }
    }

    public saveProfile(): Observable<boolean> {
        let profile = this.homeProfileMapper.fromViewModel(this.homeProfile);
        return this.homeProfileApi.saveProfile(this.contractNumber, profile).map((result) => {
                return true;
            });
    }
}

export enum HomeProfileStatus {
    NotStarted,
    Incomplete,
    Complete
}
