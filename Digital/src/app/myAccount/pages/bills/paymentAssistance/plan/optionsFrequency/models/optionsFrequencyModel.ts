import { InstalmentOption, DateOption, FrequencyOption } from '../../../../../../services/paymentScheme/instalmentPlanOptions.service';
import { FormGroup } from '@angular/forms';

export interface PaymentAssistancePlanOptionsFrequencyModel {
    dateOptions: DateOption[];
    selectedFrequencyOption: FrequencyOption;
    frequencyOptions: FrequencyOption[];
    dateOptionsDisabled: boolean;
    dateOptionsHasError: boolean;
    showFrequencyOptions: boolean;
}
