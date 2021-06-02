import { Component, Input, OnInit } from '@angular/core';
import { FeatureFlagTypes } from '../../../services/featureFlag.constants';
import { FeatureFlagService } from '../../../services/featureFlag.service';

declare let lpTag;

@Component({
    selector: 'agl-mobile-number',
    templateUrl: './mobileNumber.component.html',
    styleUrls: [ './mobileNumber.component.scss' ]
})
export class MobileNumberComponent implements OnInit {
    @Input() public value: string;
    @Input() public webChatElementId: string;
    public isContactDetailsEnabled: boolean = false;

    constructor(private featureFlagService: FeatureFlagService) {
    }

    public ngOnInit() {
        if (lpTag && lpTag.newPage) {
            lpTag.newPage(document.URL);
        }
        this.featureFlagService.featureFlagged(FeatureFlagTypes.contactDetailsEnabled).subscribe((result) => {
            this.isContactDetailsEnabled = result;
        });
    }
}
