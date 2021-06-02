import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FeatureFlagService, FeatureFlagTypes } from '../../../../services/featureFlag.service';
import { BillDeliveryMethodType } from '../../../../services/settings/model/billDeliveryMethodType';
import { BillDeliveryModeChangedEventArgs } from './billDeliveryModeChangedEventArgs';
import { EmailBillingComponentModel } from './emailBillingComponentModel';

/**
 * @deprecated: the new EBilling component should be used moving forward
 * The new Manage Account Information Architecture (IA) has the Notifications page which has the eBilling component using the Maui-Toggle
 */
@Component({
    selector: 'agl-settings-email-billing',
    templateUrl: './emailBilling.component.html',
    styleUrls: ['./emailBilling.component.scss']
})
export class EmailBillingComponent implements OnInit {
    @Input() public model: EmailBillingComponentModel;
    @Output() public BillDeliveryModeChanged = new EventEmitter<BillDeliveryModeChangedEventArgs>();

    public justActivatedEmailBilling = false;
    public ebillEnabled = false;
    public editContactDetailsEnabled = false;
    public shouldNotTurnOnEmailBilling = false;

    constructor(
        public featureFlagService: FeatureFlagService
    ) {}

    public ngOnInit() {
        this.featureFlagService.featureFlagged(FeatureFlagTypes.ebillEnabled).subscribe((response) => {
            this.ebillEnabled = response;
        });

        this.featureFlagService.featureFlagged(FeatureFlagTypes.contactDetailsEnabled).subscribe((response) => {
            this.editContactDetailsEnabled = response;
            this.shouldNotTurnOnEmailBilling = this.editContactDetailsEnabled && (this.model.isEmptyOrInvalidEmailAddress || this.model.hasMultipleBusinessPartners);
        });
    }

    public togglePaperlessBillingOn() {
        this.justActivatedEmailBilling = true;
        this.onBillDeliveryModeChanged(BillDeliveryMethodType.Email);
    }

    public togglePaperlessBillingOff() {
        this.onBillDeliveryModeChanged(BillDeliveryMethodType.Postal);
    }

    public slidePaperlessBilling() {
        let desiredBillDeliveryMethod = (this.model.isEmailBill ? BillDeliveryMethodType.Postal : BillDeliveryMethodType.Email);
        this.onBillDeliveryModeChanged(desiredBillDeliveryMethod);
    }

    private onBillDeliveryModeChanged(deliveryPreference: BillDeliveryMethodType) {
        let eventArgs = new BillDeliveryModeChangedEventArgs(this.model.contractAccountNumber, deliveryPreference);
        this.BillDeliveryModeChanged.emit(eventArgs);
    }
}
