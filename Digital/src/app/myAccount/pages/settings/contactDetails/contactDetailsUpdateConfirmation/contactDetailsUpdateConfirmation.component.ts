import { Component, HostBinding, Input, OnInit } from '@angular/core';

import { ConfigService } from '../../../../../shared/service/config.service';
import { DataLayerService, ModalName, PageChannel, PageType, SiteSubSection } from '../../../../../shared/service/dataLayer.service';
import { FeatureFlagTypes } from '../../../../services/featureFlag.constants';
import { FeatureFlagService } from '../../../../services/featureFlag.service';
import { IContactDetailsStateService } from '../contactDetailsState.service';
import { ContactDetailsConfirmationType } from './contactDetailsConfirmationType.enum';

@Component({
    selector: 'agl-contact-details-update-confirmation',
    templateUrl: 'contactDetailsUpdateConfirmation.component.html',
    styleUrls: ['contactDetailsUpdateConfirmation.component.scss']
})
export class ContactDetailsUpdateConfirmationComponent implements OnInit {
    /**
     * The contract or contract account id that a change to contact details was initiated for (if applicable)
     */
    @Input() public contextId: string = '';

    @Input() public set confirmationType(value: ContactDetailsConfirmationType) {
        let map = {
            [ContactDetailsConfirmationType.Email]: 'email address',
            [ContactDetailsConfirmationType.Mobile]: 'mobile number'
        };
        let description = map[value] || 'contact details';
        this.heading = `You\'ve successfully updated your ${description}.`;
    }

    @HostBinding('class.isVisible')
    public get isVisible(): boolean {
        return this.contactDetailsRecentlyUpdated && !this.contactDetailsConfirmationDismissed;
    }

    public contactDetailsRecentlyUpdated: boolean = false;
    public contactDetailsConfirmationDismissed: boolean = false;
    public loginDetailsUrl: string;
    public heading: string;

    constructor(private featureFlagService: FeatureFlagService,
                private config: ConfigService,
                private contactDetailsStateService: IContactDetailsStateService,
                private dataLayerService: DataLayerService) {
    }

    public ngOnInit() {
        if (!this.heading) {
            this.confirmationType = ContactDetailsConfirmationType.AnyContactDetails; // set default
        }

        if (this.contactDetailsStateService.canNotifyOfSuccessfulUpdate() &&
                (this.contactDetailsStateService.contextId() || '') === (this.contextId || '')) {
            this.contactDetailsRecentlyUpdated = true;
            this.contactDetailsStateService.hasNotifiedOfSuccessfulUpdate();
            this.dataLayerService.pushFormSuccess(ModalName.UpdateContactDetails, PageChannel.UpdateContactDetails, PageType.Account, SiteSubSection.UpdateContactDetails, this.contactDetailsStateService.getControlsUpdated());
        }

        this.featureFlagService.featureFlagged(FeatureFlagTypes.loginDetailsEnabled).subscribe(
            (featureIsEnabled: boolean) => {
                if (featureIsEnabled) {
                    const currentUrl = encodeURIComponent(document.location.href);
                    this.loginDetailsUrl = `${this.config.current.loginDetailsBaseUrl}/profile?returnTo=${currentUrl}`;
                }
            }
        );
    }
}
