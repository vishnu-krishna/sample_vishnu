import { Component, Input, OnInit } from '@angular/core';
import { RequestStatusType } from '../../../../shared/globals/oneMinuteMove/requestStatusType';
import { TrackProgressContent } from '../../../../shared/model/ommTracker/trackProgressContent.model';

@Component({
    selector: 'agl-track-progress',
    templateUrl: './trackProgress.component.html',
    styleUrls: ['./trackProgress.component.scss']
})
export class TrackProgressComponent implements OnInit {
    @Input() public progressStatus: RequestStatusType;
    @Input() public progressContent: TrackProgressContent;

    public showProcessingMessage: boolean;
    public showRequestReceivedMessage: boolean;
    public showReadyToConnectMessage: boolean;

    public percentText: string;
    public cablewidth: string;
    public ngOnInit() {
        let percent = 0;
        switch (this.progressStatus) {
            case RequestStatusType.RequestReceived:
                this.showRequestReceivedMessage = true;
                percent = 0;
                break;
            case RequestStatusType.ProcessingTenPercent:
                this.showProcessingMessage = true;
                percent = 25;
                break;
            case RequestStatusType.ProcessingNinetyPercent:
                this.showProcessingMessage = true;
                percent = 85;
                break;
            case RequestStatusType.ReadyToConnect:
                this.showReadyToConnectMessage = true;
                percent = 100;
                break;
            default:
                break;
        }
        this.percentText = `${percent.toString()}%`;
        this.cablewidth = percent === 100 ? this.percentText : `calc( ${this.percentText} - 10px)`;
    }
}
