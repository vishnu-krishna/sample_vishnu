import { Component, Input, OnInit } from '@angular/core';
import { ConnectionType } from '../../../../shared/globals/ommTrackerConstants';
import { FuelConnectionType } from '../../../../shared/globals/oneMinuteMove/fuelType';
import { MoveStatusType } from '../../../../shared/globals/oneMinuteMove/moveStatusType';
import { IConnectionDetailsValue, IConnectionStatuses } from '../../../../shared/model/ommTracker/connectionContent.interface';

@Component({
    selector: 'agl-track-connection',
    templateUrl: './trackConnection.component.html',
    styleUrls: ['./trackConnection.component.scss']
})

export class TrackConnectionComponent implements OnInit {
    @Input() public scContent: IConnectionDetailsValue;
    @Input() public scStatuses: IConnectionStatuses;
    @Input() public connectionData: any;
    @Input() public connectionAddress: string;
    @Input() public connectionType: ConnectionType;

    public FuelType = FuelConnectionType;
    public MoveStatusTypeEnum = MoveStatusType;
    public isSingleFuel: boolean = false;

    public containerClass(contract) {
        return {
            'agl-track-connection__status--checking' : this.scStatuses[contract.status] && this.scStatuses[contract.status] === this.MoveStatusTypeEnum.Checking,
            'agl-track-connection__status--left' : contract.fuelType === this.FuelType.Electricity && !this.isSingleFuel,
            'agl-track-connection__status--right' : contract.fuelType === this.FuelType.Gas && !this.isSingleFuel,
            'agl-track-connection__seperator' : (contract.fuelType === this.FuelType.Electricity && !this.isSingleFuel),
            'col-xs-12': this.isSingleFuel,
            'col-xs-6': !this.isSingleFuel};
    }

    public tileClass(contract) {
        return {
            'agl-track-connection__tile--confirmed' : this.scStatuses[contract.status] && this.scStatuses[contract.status] === this.MoveStatusTypeEnum.Confirmed,
            'agl-track-connection__tile--left' : contract.fuelType === 'Electricity' && !this.isSingleFuel,
            'agl-track-connection__tile--right' : contract.fuelType === 'Gas' && !this.isSingleFuel };
    }

    public ngOnInit() {
        this.isSingleFuel = this.connectionData.contracts.length === 1;
    }
}
