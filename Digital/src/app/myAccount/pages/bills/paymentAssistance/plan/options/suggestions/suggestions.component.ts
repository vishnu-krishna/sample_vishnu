import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PaymentAssistancePlanOptionsSuggestionsModel } from './models';
import { PaymentArrangementInstalmentSuggestion } from '../../../../../../services/paymentScheme/paymentSchemeApi.service';
import { FrequencyOption } from '../../../../../../services/paymentScheme/instalmentPlanOptions.service';

@Component({
    selector: 'agl-payment-assistance-plan-options-suggestions',
    templateUrl: './suggestions.component.html',
    styleUrls: ['./suggestions.component.scss']
})
export class PaymentAssistancePlanOptionsSuggestionsComponent {

    public customInstalmentPlanValue = 99999;
    public showAll = false;

    @Input() suggestionsModel: PaymentAssistancePlanOptionsSuggestionsModel = {
        instalmentSuggestions: [],
        selectedNumberOfInstalments: null,
        frequencyOption: null,
        maxSuggestionsToShow: 3
    };

    @Output() selectedNumberOfInstalmentsChanged = new EventEmitter<number>();

    public formatRadioButtonLabelLeft = (instalmentSuggestion: PaymentArrangementInstalmentSuggestion, frequencyOption: FrequencyOption): string => {
        return `${instalmentSuggestion.numberOfInstalments} ${frequencyOption.text.toLowerCase()} instalments`;
    }

    public formatRadioButtonLabelRight = (instalmentSuggestion: PaymentArrangementInstalmentSuggestion, frequencyOption: FrequencyOption): string => {
        const singularFrequency = this.extractNounFromFrequencyAdjective(frequencyOption.text);
        return `/${singularFrequency} for ${instalmentSuggestion.numberOfInstalments} ${singularFrequency}s`;
    }

    public expandClicked = () => this.showAll = !this.showAll;

    public onSelectedNumberOfInstalmentsChanged = (value: string): void => {
        this.selectedNumberOfInstalmentsChanged.emit(Number(value));
    }

    private extractNounFromFrequencyAdjective = (text: string) => text.slice(0, -2).toLowerCase();
}
