import { Injectable }                   from '@angular/core';
import { Observable }                   from 'rxjs/Observable';
import { AccountViewModel, ContractViewModel, IAccountServiceMA } from '../../../services/account.service';
import { ISettingsService }             from '../../../services/settings/settings.service.interface';

import { SettingsAggregateModel }       from '../../../services/settings/model/settingsAggregateModel';
import { EmailBillingComponentModel }   from '../billing/emailBilling/emailBillingComponentModel';
import { BillingSettingsViewModel }     from './billingSettingsViewModel';
import { BillingSettingsViewModelItem } from './billingSettingsViewModelItem';

import { ApiService, ContactDetailModel } from '../../../../shared/service/api.service';

@Injectable()
export class BillingSettingsViewModelFactory {
    constructor(
        private accountService: IAccountServiceMA,
        private settingsService: ISettingsService,
        private apiService: ApiService) {
    }

    /**
     * Creates view model by calling data services and combining the results together.
     *
     * @returns {Observable<BillingSettingsViewModel>}
     *
     * @memberOf BillingSettingsViewModelFactory
     */
    public getViewModel(): Observable<BillingSettingsViewModel> {
        return Observable.forkJoin(
                this.accountService.getAccounts(),
                this.settingsService.getSettings(),
                this.apiService.getContactDetail()
            )
            .map(([accountsList, settingsModel, contactDetails]) => {
                let aggregate = this.combineModels(accountsList, settingsModel, contactDetails);
                return aggregate;
            }
        );
    }

    private combineModels(accountModels: AccountViewModel[], settingsModel: SettingsAggregateModel, contactDetails: ContactDetailModel): BillingSettingsViewModel {

        let combinedModel = new BillingSettingsViewModel();

        combinedModel.isSingleContractAccountWithSingleContract =
            (accountModels.length === 1 && accountModels[0].contracts.length === 1);

        // This property set when bill delivery method preferences could not be obtained from the settings API
        // What the UI is meant to look like in this case is unclear
        combinedModel.billDeliveryApiError = settingsModel.billDeliveryApiLoadError;
        let modelSequenceId = 0;

        accountModels.forEach((ca) => {
            if (!ca.allContractsAreRestricted) {
                let item = new BillingSettingsViewModelItem();
                item.account = ca;
                let isGroupedAddress = !!ca.groupedAddress;
                let oneContractAccountOneContract = (accountModels.length === 1 && ca.contracts.length === 1);
                let emailAddress = (!!contactDetails
                    && contactDetails.businessPartners
                    && contactDetails.businessPartners.length
                    && !!contactDetails.businessPartners[0]
                    && !!contactDetails.businessPartners[0].email) ? contactDetails.businessPartners[0].email :  '';
                let isMandatoryEBilling = ca.contracts.some((contract) => (contract.isMandatoryEBilling === true));
                item.showAccountDetailComponent = !(oneContractAccountOneContract);
                item.accountDetailModel.contractAccountNumber = ca.accountNumber;
                item.accountDetailModel.doesAccountHaveBasicMeter = (ca.contracts.find((contract) => (contract.isSmartMeter === false)) !== undefined) ;

                settingsModel.billDeliveryMethodList.forEach((settingsBillDeliveryMethod) => {
                    if (ca.accountNumber === settingsBillDeliveryMethod.contractAccountNumber) {
                        // If there is a bill delivery setting for the contract account number
                        // we create a model with the bill delivery setting so that UI shows
                        // buttons if the preference is Email or Postal otherwise an error message.
                        item.emailBillingModel = new EmailBillingComponentModel(ca.accountNumber,
                                                                                emailAddress,
                                                                                contactDetails.hasMultipleBusinessPartners,
                                                                                ++modelSequenceId,
                                                                                settingsBillDeliveryMethod.billDeliveryMethod,
                                                                                isMandatoryEBilling);
                    }
                });
                if (!item.emailBillingModel) {
                    // If the api data doesn't contain a bill delivery setting for the contract account number
                    // We create a model without a bill delivery mode that renders an error message.
                    item.emailBillingModel = new EmailBillingComponentModel(ca.accountNumber,
                                                                            emailAddress,
                                                                            contactDetails.hasMultipleBusinessPartners,
                                                                            ++modelSequenceId);
                }

                for (let index = 0; index < ca.contracts.length; index++) {
                    let contract = ca.contracts[index];

                    if (isGroupedAddress && index === 1) {
                        item.accountDetailModel.supplyAddresses.push(ca.groupedAddress);
                    }
                    if (!isGroupedAddress && !contract.isRestricted) {
                        item.accountDetailModel.supplyAddresses.push(contract.address);
                    }

                    item.accountDetailModel.numberOfGasIcons = ca.contracts.filter((currentCa: ContractViewModel) => {
                        if (!currentCa.isRestricted) {
                            return currentCa.isGas;
                        }
                    }).length;

                    item.accountDetailModel.numberOfElectricityIcons = ca.contracts.filter((currentCa: ContractViewModel) => {
                        if (!currentCa.isRestricted) {
                            return currentCa.isElectricity;
                        }
                    }).length;

                    // Region for accountDetailModel
                    item.accountDetailModel.regionId = contract.regionId;
                }
                let paygContract = ca.contracts.find((c) => c.isPayg);
                if (paygContract != null) {
                     combinedModel.containsPaygContract = true;
                }

                item.showMonthlyBilling = this.showMonthlyBilling(ca);

                combinedModel.items.push(item);
            }
        });
        return combinedModel;
    }

    private showMonthlyBilling(accountDetailModel: AccountViewModel): boolean {
        return accountDetailModel.contracts
            .some((c: ContractViewModel) => !c.isRestricted);
    }
}
