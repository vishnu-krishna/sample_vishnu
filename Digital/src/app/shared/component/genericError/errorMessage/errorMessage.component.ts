import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ErrorMessageModel } from '../../../model/ommTracker/errorMessage.model';
@Component({
    selector: 'agl-error-message',
    templateUrl: './errorMessage.component.html',
    styleUrls: ['./errorMessage.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ErrorMessageComponent {
    @Input() public configData: ErrorMessageModel;
}
