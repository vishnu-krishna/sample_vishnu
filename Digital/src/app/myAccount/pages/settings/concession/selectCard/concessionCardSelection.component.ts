import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IConcessionStateService } from '../services/concessionState.service';
import { Concession } from './../concession';
import { ConcessionCard } from '../concessionCard';
import { IssuerCards } from '../issuerCards';

@Component({
    selector: 'agl-concession-card-selection',
    templateUrl: 'concessionCardSelection.component.html',
    styleUrls: ['concessionCardSelection.component.scss'],
})

export class ConcessionCardSelectionComponent implements OnInit {
    public issuerCards: IssuerCards[] = [];
    public selectedValue: string;
    private concession: Concession;
    private regionId: string;

    constructor(private router: Router,
                private concessionStateService: IConcessionStateService) {
    }

    public ngOnInit(): void {
        this.concession = this.concessionStateService.getCurrentConcession();
        this.regionId = this.concession.regionId;
        this.issuerCards = this.concession.eligibleCards;

        if (this.concession.selectedCard) {
            this.selectedValue = this.concession.selectedCard.uniqueKey;
        }
    }

    public get selectedCardExcludedFuelWarning(): string {
        let selectedCard = this.resolveSelectedConcessionCard(this.selectedValue);

        if (!selectedCard.isEligibleForAllSelectedFuels(this.concession.fuelTypes)) {
            return `Concessions only apply to ${selectedCard.eligibleFuelTypes.join(', ').toLowerCase()} for ${this.regionId.toUpperCase()} ${selectedCard.cardDescription} card holders`;
        }

        return '';
    }

    public get continueButtonEnabled(): boolean {
        return !!this.selectedValue;
    }

    public continue(): void {
        let selectedCard = this.resolveSelectedConcessionCard(this.selectedValue);
        this.concession.setSelectedCard(selectedCard);

        this.router.navigate(['/settings/concession/apply']);
    }

    private resolveSelectedConcessionCard(value: string): ConcessionCard {
        let allCards: ConcessionCard[] = [].concat.apply([], this.issuerCards.map((ic: IssuerCards) => ic.cards));
        return allCards.find((c) => c.uniqueKey === this.selectedValue);
    }
}
