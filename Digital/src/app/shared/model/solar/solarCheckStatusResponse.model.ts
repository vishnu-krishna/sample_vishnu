import { SolarCheckStatusType } from '../../model/solar/solarCheckStatus.model';

export class SolarCheckStatusResponse {
    public solarStatus: SolarCheckStatusType;
    public statusExpectedDate: Date;
    public measuredExpectedRatio: string;
    public confidence: string;
    public dataStartDate: string;
    public dataEndDate: string;
    public processedDateTime: string;
}
