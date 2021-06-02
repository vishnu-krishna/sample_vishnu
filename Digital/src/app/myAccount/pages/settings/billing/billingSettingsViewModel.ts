import { ApiError }                     from '../../../services/settings/model/apiError';
import { BillingSettingsViewModelItem } from './billingSettingsViewModelItem';

export class BillingSettingsViewModel {
    public billDeliveryApiError: ApiError;
    public isSingleContractAccountWithSingleContract: boolean;
    public containsPaygContract: boolean;
    public items = new Array<BillingSettingsViewModelItem>();
}
