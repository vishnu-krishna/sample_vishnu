import {
    Component,
    Input,
    OnInit
} from '@angular/core';
import { TrackerMode } from '../../../../shared/globals/ommTrackerConstants';
import { InfoItem } from '../../../../shared/model/ommTracker/infoItem.model';
import {
    HeaderViewModel
} from '../../../../shared/model/ommTracker/trackStatusHeader.model';
import { DataLayerService } from './../../../../shared/service/dataLayer.service';

@Component({
    selector: 'agl-status-header',
    templateUrl: './trackStatusHeader.component.html',
    styleUrls: ['./trackStatusHeader.component.scss']
})
export class TrackStatusHeaderComponent implements OnInit {
    @Input() public whatHappensNextContent: InfoItem[];
    @Input() public headerStatus: HeaderViewModel;
    @Input() public trackerMode: TrackerMode;

    public isOpen: boolean = false;
    public TrackerModeEnum = TrackerMode;

    constructor(private dataLayerService: DataLayerService) {}

    public ngOnInit() {
        if (this.trackerMode === TrackerMode.Track && this.whatHappensNextContent && this.whatHappensNextContent.length > 0) {
            if (localStorage.getItem('selfService.ommTracker.visited') === 'true') {
                this.isOpen = false;
            } else {
                this.isOpen = true;
                localStorage.setItem('selfService.ommTracker.visited', 'true');
            }
        }
    }

    public getStatusText() {
        if (this.headerStatus && this.headerStatus.statusText) {
            return this.headerStatus.statusText;
        }
    }

    public getStatusIcon() {
        if (this.headerStatus && this.headerStatus.statusIcon) {
            return this.headerStatus.statusIcon;
        }
    }

    public getSubText() {
        if (this.trackerMode === TrackerMode.WelcomeHome) {
            if  (this.headerStatus && this.headerStatus.welcomeText)  {
                return this.headerStatus.welcomeText;
            }
        } else if (this.trackerMode === TrackerMode.Track) {
            if (this.headerStatus && this.headerStatus.subText) {
                return this.headerStatus.subText;
            }
        }
        return '';
    }

    public toggleContent(open: boolean) {
        this.isOpen = open;
        if (this.isOpen) {
            this.dataLayerService.pushSingleEvents({ event: 'WhatHappensNextModal' });
        }
    }
}
