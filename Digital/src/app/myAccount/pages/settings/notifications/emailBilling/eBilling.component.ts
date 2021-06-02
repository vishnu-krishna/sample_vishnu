import { OnInit, Component, Input, Output, EventEmitter } from '@angular/core';

import { ISettingsService } from '../../../../services/settings/settings.service.interface';
import { FeatureFlagService } from '../../../../services/featureFlag.service';
import { FeatureFlagTypes } from '../../../../services/featureFlag.constants';
import { EBillingComponentModel } from './eBillingComponentModel';
import { FlashMessageType } from './../../../../maui/flashMessage/flashMessageType.enum';
import { BillDeliveryMethodType } from './../../../../services/settings/model/billDeliveryMethodType';
import { AccountViewModel } from './../../../../services/account.service';

@Component({
    selector: 'agl-settings-ebilling',
    templateUrl: './eBilling.component.html',
    styleUrls: ['./eBilling.component.scss']
})

export class EBillingComponent implements OnInit {
    @Input() public eBillingModels: EBillingComponentModel[];
    @Input() public isEbillDataError: boolean;
    @Output() public onUserSelectionChanged = new EventEmitter();

    public isContactDetailsEnabled: boolean;
    public FlashMessageType = FlashMessageType;

    constructor(
        private iSettingsService: ISettingsService,
        private featureFlagService: FeatureFlagService
    ) { }

    public ngOnInit() {
        this.featureFlagService.featureFlagged(FeatureFlagTypes.contactDetailsEnabled)
            .subscribe((featureFlagEnabled: boolean) => {
                this.isContactDetailsEnabled = featureFlagEnabled;
                this.eBillingModels.forEach(
                    (eBillingModel: EBillingComponentModel) =>
                        eBillingModel.isContactDetailsEnabled = this.isContactDetailsEnabled
                    );
            });
    }

    public showMultiBpMessage(): boolean {
        return this.eBillingModels &&
            this.eBillingModels.length >= 1 &&
            this.eBillingModels[0].hasMultipleBusinessPartners &&
            this.isContactDetailsEnabled;
    }

    public requestEbill(model: EBillingComponentModel, setupEbill: boolean): void {
        model.isBillDeliveryUpdateLoading = true;
        model.isApiError = false;
        model.isUpdatedToEbilling = false;

        let previousBillDeliveryPreference = model.billDeliveryPreference;
        let selectedBillDeliveryPreference: BillDeliveryMethodType;

        if (setupEbill) {
            selectedBillDeliveryPreference = BillDeliveryMethodType.Email;
        } else {
            selectedBillDeliveryPreference = BillDeliveryMethodType.Postal;
        }

        this.iSettingsService.updateBillDeliveryMethodPreference(model.accountNumber, selectedBillDeliveryPreference)
            .finally(() => {
                model.isBillDeliveryUpdateLoading = false;
                this.onUserSelectionChanged.emit();
            })
            .subscribe(() => {
                model.setBillDeliveryPreferenceMethod(selectedBillDeliveryPreference);
                model.isUpdatedToEbilling = setupEbill;
            }, (error: any) => {
                model.isApiError = true;
                model.setBillDeliveryPreferenceMethod(previousBillDeliveryPreference);
            });
    }
}
