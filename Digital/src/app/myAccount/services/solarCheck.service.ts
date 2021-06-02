import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SolarCheckStatusResponse } from '../../shared/model/solar/solarCheckStatusResponse.model';
import { ISolarCheckRepository } from '../../shared/repository/contract/isolarCheck.repository';

import { ReplaySubject } from 'rxjs/ReplaySubject';
import { BaseMessage } from '../../shared/messages/base.message';
import * as ApiModel from '../../shared/model/api.model';
import { SolarCheckContractResponse } from '../../shared/model/solar/solarCheckContract.model';
import { SolarCheckEligibilityContract, SolarCheckEligiblity } from '../../shared/model/solar/solarCheckEligibility.model';
import { SolarCheckPvInfoResponse } from '../../shared/model/solar/solarCheckPvInfoResponse.model';
import { SolarCheckSolarDetailsType, SolarCheckSolarDetailsUpdateType } from '../../shared/model/solar/solarCheckSolarDetails.model';
import { SolarCheckPreferences } from '../../shared/model/solar/solarPreferences.model';
import { ISolarCheckService } from './contract/isolarCheck.service';

@Injectable()
export class SolarCheckService implements ISolarCheckService {
    private solarEligibilitySubject = new ReplaySubject<SolarCheckEligiblity>(1);
    private solarEligibilityInProgress: boolean = false;
    private solarEligibilityHaveData: boolean = false;

    constructor(private _solarCheckRepository: ISolarCheckRepository) { }

    public isEligible(): Observable<SolarCheckEligiblity> {
        this.publishEligibilityData();
        return this.solarEligibilitySubject.first();
    }

    public refreshEligibility(): Observable<SolarCheckEligiblity> {
        this.solarEligibilityHaveData = false;
        this.solarEligibilityInProgress = false;
        this.publishEligibilityData();
        // Don't return first as that won't update the view.
        return this.solarEligibilitySubject.asObservable();
    }

    public getStatus(contract: SolarCheckEligibilityContract): Observable<SolarCheckStatusResponse> {
        let getStatusEndPoint = '/v1/contracts/' + contract.contractNumber + '/status';
        return this._solarCheckRepository.get<SolarCheckStatusResponse>(getStatusEndPoint, null, false, true);
    }

    public getContract(contractNumber: String): Observable<SolarCheckContractResponse> {
        let getContractEndPoint = '/v1/contracts/' + contractNumber;
        return this._solarCheckRepository.get<SolarCheckContractResponse>(getContractEndPoint, null, false, true);
    }

    public setPVInfo(contractNumber: String, pvInfo: SolarCheckSolarDetailsUpdateType): Observable<SolarCheckPvInfoResponse> {
        let setContractEndPoint = '/v1/contracts/' + contractNumber + '/pvinfo';
        let options = new ApiModel.ApiV2RequestOptions(setContractEndPoint);
        options.body = pvInfo;
        return this._solarCheckRepository.put(options);
    }

    public setHasBattery(contractNumber: string, contractHasBattery: Boolean): Observable<Object> {
        let eligibilityEndPoint = '/v1/contracts/' + contractNumber + '/eligibility';
        let options = new ApiModel.ApiV2RequestOptions(eligibilityEndPoint);
        options.body = { hasBattery: contractHasBattery };
        return this._solarCheckRepository.put(options);
    }

    public register(contractNumber: String, scDetailsModel: SolarCheckSolarDetailsType): Observable<boolean> {
        let options = new ApiModel.ApiV2RequestOptions('/v1/contracts/' + contractNumber + '/register');
        options.body = scDetailsModel;
        return this._solarCheckRepository.post(options);
    }

    public deregister(contractNumber: String): Observable<boolean> {
        let options = new ApiModel.ApiV2RequestOptions('/v1/contracts/' + contractNumber + '/deregister');
        return this._solarCheckRepository.post(options);
    }

    public getPreferences(): Observable<SolarCheckPreferences> {
        let getPreferencesEndPoint = '/v1/preferences';
        return this._solarCheckRepository.get<SolarCheckPreferences>(getPreferencesEndPoint, null, false, true);
    }

    public setMonthlyComms(value: boolean): Observable<Object> {
        let setMonthlyComsEndPoint = '/v1/preferences/marketingComms';
        let options = new ApiModel.ApiV2RequestOptions(setMonthlyComsEndPoint);
        options.body = { value };
        options.isJson = false;
        return this._solarCheckRepository.put(options);
    }

    public setStatusChangeComms(value: boolean): Observable<Object> {
        let setMonthlyComsEndPoint = '/v1/preferences/statusChangeComms';
        let options = new ApiModel.ApiV2RequestOptions(setMonthlyComsEndPoint);
        options.body = { value };
        options.isJson = false;
        return this._solarCheckRepository.put(options);
    }

    private publishEligibilityData() {
        let eligibilityEndPoint = '/v1/eligibility';
        if (this.solarEligibilityInProgress || this.solarEligibilityHaveData) {
            return this.solarEligibilitySubject.first();
        } else {
            this.solarEligibilityInProgress = true;
            this._solarCheckRepository.get<SolarCheckEligiblity>(eligibilityEndPoint, null, false, true).subscribe(
                (eligibilityContract) => {
                this.solarEligibilitySubject.next(eligibilityContract);
                this.solarEligibilityHaveData = true;
            },
            (error) => (console.error('error in retrieving solar eligiblity')));
        }
    }
}

export enum SolarCheckEvents {
    registered  = 1,
    deRegistered,
    hasBattery,
    updateNoBattery,
    systemCorrection,
    systemChange,
    updateError
}

export class SolarCheckMessage extends BaseMessage {
    public solarCheckEvent: SolarCheckEvents;
}

export class SolarCheckUpdateDetailsMessage extends SolarCheckMessage {
   public statusExpectedDate: Date;
}
