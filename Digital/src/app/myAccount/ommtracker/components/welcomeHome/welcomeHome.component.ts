import { Component, Input, OnInit } from '@angular/core';
import { TrackerMode } from '../../../../shared/globals/ommTrackerConstants';
import { HeaderViewModel } from '../../../../shared/model/ommTracker/trackStatusHeader.model';
import { ConfigService } from '../../../../shared/service/config.service';

import { DataLayerService } from '../../../../shared/service/dataLayer.service';

declare let leanengage;

@Component({
    selector: 'agl-tracker-welcome-home',
    templateUrl: './welcomeHome.component.html',
    styleUrls: ['./welcomeHome.component.scss']
})
export class WelcomeHomeComponent implements OnInit {
    @Input() public headerStatus: HeaderViewModel;
    @Input() public trackerMode: TrackerMode;
    @Input() public referenceCode: string;
    @Input() public accountName: string;

    public surveyCompleted: boolean = false;
    constructor(
        public configService: ConfigService,
        private dataLayerService: DataLayerService
    ) {

    }
    public ngOnInit() {
        this.dataLayerService.pushSingleEvents({
            event: 'VirtualPageview',
            virtualPageURL: '/welcomeHome',
            virtualPageTitle: 'OMMWelcomeHomePage'
        });
        if (localStorage.getItem('ommTracker.surveyCompleted') && localStorage.getItem('ommTracker.surveyCompleted') === this.referenceCode) {
            this.surveyCompleted = true;
            this.dataLayerService.pushSingleEvents({ event: 'OMM Tracker', state: 'COMPLETE' });
        } else {
            this.dataLayerService.pushSingleEvents({ event: 'OMM Tracker', state: 'SURVEY' });

            let leanAppId = this.configService.current.leanEngageTrackerAppId;

            leanengage('triggerSurvey', 'one-minute-move-process-survey', {
                appId: leanAppId,
                elementId: 'tracker-survey',
                customData: { referenceNumber: this.referenceCode },
                onComplete: () => {
                    localStorage.setItem('ommTracker.surveyCompleted', this.referenceCode);
                    this.surveyCompleted = true;
                    this.dataLayerService.pushSingleEvents({ event: 'OMM Tracker', state: 'COMPLETE' });
                }
            });
        }
    }
}
