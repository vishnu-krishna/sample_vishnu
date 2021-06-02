import { Component, Input } from '@angular/core';

@Component({
    selector: 'agl-omm-tracker-header',
    templateUrl: './trackerHeader.component.html',
    styleUrls: ['./trackerHeader.component.scss']
})
export class TrackerHeaderComponent {
    @Input() public referenceCode: string;
}
