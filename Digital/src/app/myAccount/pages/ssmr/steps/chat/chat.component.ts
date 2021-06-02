import { Component, OnInit } from '@angular/core';
import { ISsmrService } from '../../../../services/contract/issmr.service';
declare let lpTag;

@Component({
    selector: 'agl-ssmr-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent  implements OnInit {
    public shouldSlideLeft: boolean = false;
    public message: string;

    constructor(
        public ssmrService: ISsmrService
    ) {
    }

    public ngOnInit() {

        if (lpTag) {
            lpTag.newPage(document.URL);
        }
        if ( this.ssmrService.screenCode === 'SSMR_MRR') {
            this.message = 'We could not capture the read you sent through.';
        } else if (this.ssmrService.screenCode === 'SSMR_EX1') {
            this.message = 'We are having trouble with your read.';
        }
    }
}
