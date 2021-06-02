import { FuelConnectionType } from '../../globals/oneMinuteMove/fuelType';
import { MoveStatusType } from '../../globals/oneMinuteMove/moveStatusType';
import { MoveType } from '../../globals/oneMinuteMove/moveType';
import { RequestStatusType } from '../../globals/oneMinuteMove/requestStatusType';
import { State } from '../../globals/oneMinuteMove/state';

export class MoveGetResponseModel {
    public oneMinuteMove: {
        referenceCode: string;
        requestType: MoveType;
        status: RequestStatusType;
        expiryDate: string;
        lastUpdated: string;
        moveIn: MoveInGetResponseModel;
        moveOut: MoveOutGetResponseModel;
    };
}
export class MoveInGetResponseModel {
    public requestedDate: string;
    public requestedAddress: MoveAddressModel;
    public contracts: MoveInContractModel[];
}
export class MoveOutGetResponseModel {
    public requestedDate: string;
    public contracts: MoveOutContractModel[];
}
export class MoveInContractModel {
    public fuelType: FuelConnectionType;
    public status: MoveStatusType;
    public expiryDate: string;
    public contractNumber: number;
    public actualDate: string;
    public actualAddress: MoveAddressModel;
    public requestedAppointmentSlot: string;
    public actualAppointmentSlot: string;
}
export class MoveOutContractModel {
    public contractNumber: number;
    public isCancelled: boolean;
    public actualDate: string;
}
export class MoveAddressModel {
    public floorNumber: string;
    public unitNumber: string;
    public streetNumber: string;
    public streetName: string;
    public suburb: string;
    public postcode: string;
    public state: State;
}
