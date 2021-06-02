import { Component, Input, OnInit } from '@angular/core';
import { ErrorMessageModel } from '../../../model/ommTracker/errorMessage.model';

declare let lpTag;

@Component({
    selector: 'agl-error',
    templateUrl: './errorPage.component.html',
    styleUrls: ['./errorPage.scss']
})
export class ErrorPageComponent implements OnInit {
    @Input() public error: ErrorMessageModel;

    public ngOnInit() {
        if (lpTag) {
            // silent refresh for single page app
            lpTag.newPage(document.URL);
        }
    }
}
