import { SolarCheckRegistrationStatusType } from './solarCheckRegistrationStatus.model';

export class SolarCheckEligibilityContract {
    public contractNumber: string;
    public eligible: Boolean;
    public registrationStatus: SolarCheckRegistrationStatusType;
}

export class SolarCheckEligiblity {
    public eligible: Boolean;
    public contracts: SolarCheckEligibilityContract[];
}
