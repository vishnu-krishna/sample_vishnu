import { FuelConnectionType } from './../../globals/oneMinuteMove/fuelType';
export interface IMoveMap {
    fuel: FuelConnectionType;
    state: string;
    requestedAppointmentSlot: string;
    actualAppointmentSlot: string;
    isVI: boolean;
    date: string;
}
