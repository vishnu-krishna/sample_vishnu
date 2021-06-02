
import { SolarCheckRegistrationStatusType } from './solarCheckRegistrationStatus.model';
import { SolarCheckSolarDetailsType } from './solarCheckSolarDetails.model';

export class SolarCheckContractResponse extends SolarCheckSolarDetailsType {
    public contractNumber: string;
    public hasBattery: boolean;
    public registrationDateTime: string;
    public registrationStatus: SolarCheckRegistrationStatusType;
    public solarAnalyticsSiteId: string;
}
