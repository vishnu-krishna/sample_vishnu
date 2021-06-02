import { Observable } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'agl-concession-continue-or-cancel',
    templateUrl: 'continueOrCancel.component.html',
    styleUrls: ['continueOrCancel.component.scss'],
})
export class ContinueOrCancelComponent {
    @Input() public showCancel: boolean = true;
    @Input() public continueButtonClickInProgress: boolean = false;
    @Input() public continueButtonEnabled: boolean = true;

    @Output() public continueButtonClicked = new EventEmitter();

    constructor(private router: Router) {
    }

    public continue(): void {
        this.continueButtonClicked.emit();
    }

    public cancel(): void {
        this.router.navigate(['/settings/personal']);
    }
}
