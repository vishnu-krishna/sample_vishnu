import { PaymentArrangementInstalmentSuggestion } from '../../../../../../../services/paymentScheme/paymentSchemeApi.service';
import { FrequencyOption } from '../../../../../../../services/paymentScheme/instalmentPlanOptions.service';

export interface PaymentAssistancePlanOptionsSuggestionsModel {
    selectedNumberOfInstalments: number;
    instalmentSuggestions: PaymentArrangementInstalmentSuggestion[];
    frequencyOption: FrequencyOption;
    maxSuggestionsToShow: number;
}
