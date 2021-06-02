import { Component, Input } from '@angular/core';
import { DidYouKnowViewModel } from '../../../../shared/model/ommTracker/didYouKnowViewModel.interface';

@Component({
    selector: 'agl-track-did-you-know',
    templateUrl: './didYouKnow.component.html',
    styleUrls: ['./didYouKnow.component.scss'],
})

export class DidYouKnowComponent {
    @Input() public didYouKnowViewModel: DidYouKnowViewModel;
}
