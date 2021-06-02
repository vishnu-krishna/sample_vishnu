import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Observer } from 'rxjs';
import orderBy from 'lodash-es/orderBy';

import * as ConcessionApi from './../../../../services/concession/concessionApi.service';
import { IConcessionApi } from '../../../../services/concession/concessionApi.service';
import { IAccountServiceMA } from '../../../../services/account.service';
import { ConcessionCard } from '../concessionCard';
import { IssuerCards } from '../issuerCards';

export abstract class IConcessionCardService {
    public abstract fetchEligibleCards(regionId: string, fuelTypes: string[]): Observable<IssuerCards[]>;
}

@Injectable()
export class ConcessionCardService implements IConcessionCardService {
    constructor(private concessionApi: IConcessionApi) {
    }

    public fetchEligibleCards(regionId: string, fuelTypes: string[]): Observable<IssuerCards[]> {
        return new Observable((observer: Observer<IssuerCards[]>) => {
            this.concessionApi.getEligibleConcessionCards(regionId, fuelTypes)
                .subscribe((issuers: ConcessionApi.Issuer[]) => {
                    let cards: ConcessionCard[] = [];

                    issuers.forEach((issuer: ConcessionApi.Issuer) => {
                        issuer.cards.forEach((card: ConcessionApi.ConcessionCard) => {
                            cards.push(new ConcessionCard(issuer.issuerCode,
                                                          issuer.issuer,
                                                          card.cardCode,
                                                          card.name,
                                                          card.eligibleFuelTypes));
                        });
                    });

                    let issuerCards = this.groupCardsByIssuer(cards, fuelTypes);

                    observer.next(issuerCards);
                    observer.complete();
                }, (err) => {
                    console.log(`Error fetching concession cards`, err);
                    observer.error('Error fetching concession cards');
                });
        });
    }

    private groupCardsByIssuer(cards: ConcessionCard[], selectedFuelTypes: string[]): IssuerCards[] {
        let issuerCards: IssuerCards[] = [];
        let orderedCards = orderBy(cards, ['issuerDescription', 'cardDescription']);

        orderedCards.forEach((card) => {
            let currentGroup = issuerCards.find((ic) => ic.issuerDescription === card.issuerDescription);

            if (!currentGroup) {
                currentGroup = {
                    issuerDescription: card.issuerDescription,
                    cards: []
                };
                issuerCards.push(currentGroup);
            }
            currentGroup.cards.push(card);
        });

        return issuerCards;
    }
}
