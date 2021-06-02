import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IConcessionStateService } from '../services/concessionState.service';

@Component({
    selector: 'agl-concession-final-confirmation',
    templateUrl: 'concessionFinalConfirmation.component.html',
    styleUrls: ['concessionFinalConfirmation.component.scss'],
})

export class ConcessionFinalConfirmationComponent implements OnInit {
    public accountHolderName: string;
    public uniqueAddresses: string[] = [];
    public cardIssuerDescription: string;
    public cardTypeDescription: string;
    public cardNumber: string;

    constructor(private router: Router,
                private concessionStateService: IConcessionStateService) {
    }

    public close(): void {
        this.router.navigate(['/settings/personal']);
    }

    public get addressLabel(): string {
        return 'Address' + (this.uniqueAddresses.length > 1 ? 'es' : '');
    }

    public ngOnInit(): void {
        let concession = this.concessionStateService.getCurrentConcession();

        this.uniqueAddresses = concession.uniqueAddresses;
        this.accountHolderName = concession.accountHolderName;
        this.cardIssuerDescription = concession.selectedCard.issuerDescription;
        this.cardTypeDescription = concession.selectedCard.cardDescription;
        this.cardNumber = concession.cardNumber;

        // clear the session as the user should not use the back button in browser to modify the concession details on the previous page.
        this.concessionStateService.clearSession();
    }
}
