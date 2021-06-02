import { Component, OnInit } from '@angular/core';

declare let lpTag;

@Component({
    selector: 'agl-settings-bill-smoothing-v1',
    templateUrl: './billSmoothingV1.component.html',
    styleUrls: ['./billSmoothingV1.component.scss']
})
export class BillSmoothingV1Component implements OnInit {
    public ngOnInit() {
        if (lpTag) {
            lpTag.newPage(document.URL);
        }
    }
}
