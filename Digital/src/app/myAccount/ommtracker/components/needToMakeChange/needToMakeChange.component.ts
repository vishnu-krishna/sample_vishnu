import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NeedToMakeChangeViewModel } from '../../../../shared/model/ommTracker/needToMakeChangeViewModel.interface';
import { TrackerChatService } from '../../../services/trackerChat.service';

declare let lpTag;

@Component({
    selector: 'agl-track-need-to-make-change',
    templateUrl: './needToMakeChange.component.html',
    styleUrls: ['./needToMakeChange.component.scss']
})
export class NeedToMakeChangeComponent implements OnInit {
    @Input() public needToMakeChangeViewModel: NeedToMakeChangeViewModel;
    @Input() public accountNumber: string;
    constructor(
        private trackerChatService: TrackerChatService,
        private router: Router
    ) { }

    public ngOnInit() {
        let windowObj = window as any;
        if (windowObj.lpTag !== undefined) {
            // silent refresh for single page app
            lpTag.newPage(document.URL);

            lpTag.events.bind('LP_OFFERS', 'OFFER_CLICK', (data) => {
                    this.trackerChatService.pushCustomerInfo(this.accountNumber);
            });
        }
    }
}
