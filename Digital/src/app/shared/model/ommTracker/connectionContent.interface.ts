import { MoveType } from '../../../shared/globals/oneMinuteMove/moveType';
import { MoveInGetResponseModel } from '../../../shared/model/oneMinMove/moveGetResponse.model';
import { FuelConnectionType } from '../../globals/oneMinuteMove/fuelType';
import { MoveStatusType } from '../../globals/oneMinuteMove/moveStatusType';

export interface IConnectionContent {
    connectionStatuses: IConnectionStatuses;
    connectionDetails: IConnectionDetails;
}

export interface IConnectionDetailsContent {
    connectionStatuses: IConnectionStatuses;
    connectionDetails: IConnectionDetails;
}

export interface IConnectionDetails {
    [key: string]: IConnectionDetailsValue;
}

export interface IConnectionDetailsValue {
    title: string;
    subtext: string;
    gasMismatchMsg: string;
}

export interface IConnectionStatuses {
    [key: string]: MoveStatusType;
}

export interface IConnectionData {
    moveIn: MoveInGetResponseModel;
    moveInAddress: string;
    moveOut: IMoveOutMapped;
    moveOutAddress: string;
    requestType: MoveType;
}

export interface IMoveOutMapped {
    requestedDate: string;
    contracts: IMoveOutContractMapped[];
}

export interface IMoveOutContractMapped {
    accountNumber: number;
    contractNumber: number;
    isCancelled: boolean;
    actualDate: string;
    fuelType: FuelConnectionType;
    actualAddress: string;
    status: MoveStatusType;
}
