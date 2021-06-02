import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IConcessionStateService } from '../services/concessionState.service';
import { IssuerCards } from '../issuerCards';
import { IConcessionCardService } from '../services/concessionCard.service';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Component({
    selector: 'agl-concession-confirm-details',
    templateUrl: 'concessionConfirmDetails.component.html',
    styleUrls: ['concessionConfirmDetails.component.scss'],
})
export class ConcessionConfirmDetailsComponent implements OnInit {
    public get addressLabel(): string {
        return 'Address' + (this.uniqueAddresses.length > 1 ? 'es' : '');
    }

    public accountHolderName: string;
    public failedToLoadCards: boolean = false;
    public issuerCards: IssuerCards[] = [];
    public uniqueAddresses: string[] = [];
    private continueButtonClicked: boolean = false;
    private isLoading: boolean = false;
    private cardLoadComplete = new ReplaySubject<boolean>(1);

    constructor(private router: Router,
                private concessionStateService: IConcessionStateService,
                private concessionCardService: IConcessionCardService) {
    }

    public ngOnInit(): void {
        let concession = this.concessionStateService.getCurrentConcession();
        this.uniqueAddresses = concession.uniqueAddresses;
        this.accountHolderName = concession.accountHolderName;
        this.isLoading = true;
        this.concessionCardService.fetchEligibleCards(concession.regionId, concession.fuelTypes)
            .map((cards) => {
                if (cards.length === 0) {
                    throw new Error('Failed to load eligible cards');
                }
                return cards;
            })
            .finally(() => {
                this.isLoading = false;
            })
            .subscribe((cards: IssuerCards[]) => {
                concession.setEligibleCards(cards);
                this.cardLoadComplete.next(true);
            }, (error) => {
                this.failedToLoadCards = true;
                console.error(error);
            });
    }

    public showSpinner(): boolean {
        return this.continueButtonClicked && !this.failedToLoadCards;
    }

    public continue(): void {
        this.continueButtonClicked = true;
        if (!this.isLoading) {
            this.cardLoadComplete.subscribe(() => {
                this.router.navigate(['/settings/concession/selectcard']);
            });
        }
    }

    public get continueButtonEnabled(): boolean {
        return !this.failedToLoadCards;
    }
}
