import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'agl-already-smart-meter',
    templateUrl: './alreadySmartMeter.component.html',
    styleUrls: ['./alreadySmartMeter.component.scss']
})
export class AlreadySmartMeterComponent {

    constructor(private router: Router) {
    }

    public onTrackUsage() {
        this.router.navigate(['/usage']);
    }

    public onBackClick() {
        this.router.navigate(['/overview']);
    }
}
