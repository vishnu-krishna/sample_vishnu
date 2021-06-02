import { Observable } from 'rxjs/Observable';
import { SolarCheckEligibilityContract, SolarCheckEligiblity } from '../../../shared/model/solar/solarCheckEligibility.model';

import { SolarCheckContractResponse } from '../../../shared/model/solar/solarCheckContract.model';
import { SolarCheckPvInfoResponse } from '../../../shared/model/solar/solarCheckPvInfoResponse.model';
import { SolarCheckSolarDetailsType, SolarCheckSolarDetailsUpdateType } from '../../../shared/model/solar/solarCheckSolarDetails.model';
import { SolarCheckStatusResponse } from '../../../shared/model/solar/solarCheckStatusResponse.model';
import { SolarCheckPreferences } from '../../../shared/model/solar/solarPreferences.model';

export abstract class ISolarCheckService {
    public abstract isEligible(): Observable<SolarCheckEligiblity>;
    public abstract refreshEligibility(): Observable<SolarCheckEligiblity>;
    public abstract getStatus(contract: SolarCheckEligibilityContract): Observable<SolarCheckStatusResponse>;
    public abstract getContract(contractNumber: string): Observable<SolarCheckContractResponse>;
    public abstract setPVInfo(contractNumber: string, pvInfo: SolarCheckSolarDetailsUpdateType): Observable<SolarCheckPvInfoResponse>;
    public abstract setHasBattery(contractNumber: string, hasBattery: Boolean): Observable<Object>;
    public abstract register(contractNumber: string, scDetailsModel: SolarCheckSolarDetailsType): Observable<boolean>;
    public abstract deregister(contractNumber: string): Observable<boolean>;
    public abstract getPreferences(): Observable<SolarCheckPreferences>;
    public abstract setMonthlyComms(state: boolean): Observable<Object>;
    public abstract setStatusChangeComms(state: boolean): Observable<Object>;
}
