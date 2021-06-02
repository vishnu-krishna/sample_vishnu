import { Component, Output, EventEmitter, Input } from '@angular/core';
import { PaymentAssistancePlanOptionsFrequencyModel } from './models';
import { FormGroup } from '@angular/forms';
import { InstalmentPlanFrequency } from '../../../../../services/paymentScheme/paymentSchemeApi.service';
import { DateOption, FrequencyOption } from '../../../../../services/paymentScheme/instalmentPlanOptions.service';
import { DateHelper } from '../../../../../../shared/utils/dateHelper';

@Component({
    selector: 'agl-payment-assistance-plan-options-frequency',
    templateUrl: './optionsFrequency.component.html',
    styleUrls: ['./optionsFrequency.component.scss']
})
export class PaymentAssistancePlanOptionsFrequencyComponent {

    @Input() optionsFrequencyModel: PaymentAssistancePlanOptionsFrequencyModel = {
        dateOptions: [],
        selectedFrequencyOption: null,
        frequencyOptions: [],
        dateOptionsDisabled: false,
        dateOptionsHasError: false,
        showFrequencyOptions: true
    };

    @Output() frequencyOptionChanged = new EventEmitter<FrequencyOption>();
    @Output() dateOptionChanged = new EventEmitter<string>();

    public onFrequencyOptionChanged = (frequencyOptionValue: string): void => {
        const frequencyOption = this.optionsFrequencyModel.frequencyOptions.find((option) => option.value === frequencyOptionValue);
        this.frequencyOptionChanged.emit(frequencyOption);
    }

    public onDateOptionChanged = (dateAsString: string): void =>
        this.dateOptionChanged.emit(dateAsString)

    public formatFirstInstalmentCopy = (frequencyOptions: FrequencyOption[]): string =>
        `Your first${frequencyOptions.length === 1 ? ' weekly' : ''} instalment will be due`

}
