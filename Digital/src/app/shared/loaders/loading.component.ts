/* tslint:disable:no-access-missing-member */
import { Component, Input, OnInit } from '@angular/core';

/**
 * Loading Component
 *
 * @export
 * @class LoadingComponent
 */
@Component({
    selector: 'agl-loader',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
    @Input() public loadingMessage: string;
    @Input() public loadingSubMessage: string;
    @Input() public fullScreen: Boolean;
    @Input() public customClass: string;
    @Input() public isLargeText: Boolean = false;

    public ngOnInit() {
        if (typeof this.loadingMessage === 'undefined' || this.loadingMessage === '') {
            this.loadingMessage = 'Loading';
        }
    }
}
