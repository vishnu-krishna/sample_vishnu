import { Component, Input, OnInit } from '@angular/core';
import { ConnectionType } from '../../../../shared/globals/ommTrackerConstants';
import { MoveType } from '../../../../shared/globals/oneMinuteMove/moveType';
import { IConnectionContent, IConnectionData } from '../../../../shared/model/ommTracker/connectionContent.interface';

@Component({
    selector: 'agl-track-connection-container',
    templateUrl: './trackConnectionContainer.component.html',
    styleUrls: ['./trackConnectionContainer.component.scss']
})

export class TrackConnectionContainerComponent implements OnInit {
    @Input() public scContent: IConnectionContent;
    @Input() public connectionData: IConnectionData;

    public connectionDetailsData: any;

    public ngOnInit() {
        this.connectionDetailsData = [
            {
                connectionType: ConnectionType.MoveIn,
                connectionData: this.connectionData.moveIn,
                connectionAddress: this.connectionData.moveInAddress
            }
        ];

        if (this.connectionData.requestType === MoveType.MoveInAndOut) {
            if (this.connectionData.moveOut && this.connectionData.moveOut.contracts.length > 0) {
                this.connectionDetailsData.push({
                    connectionType: ConnectionType.MoveOut,
                    connectionData: this.connectionData.moveOut,
                    connectionAddress: this.connectionData.moveOutAddress
                });
            }
        }
    }
}
