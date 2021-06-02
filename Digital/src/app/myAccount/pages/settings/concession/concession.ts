import { ConcessionCard } from './concessionCard';
import { IssuerCards } from './issuerCards';

export class ConcessionContract {
    public contractNumber: string;
    public address: string;
    public regionId: string;
    public fuelType: string;
}

class CardDetails { // not public/exported
    public card: ConcessionCard;
    public cardNumber: string;
}

export class Concession {
    public get selectedCard(): ConcessionCard {
        return this.cardDetails.card;
    }

    public get cardNumber(): string {
        return this.cardDetails.cardNumber;
    }

    public get contractNumbers(): string[] {
        return this.concessionContracts.map((c) => c.contractNumber);
    }

    public get uniqueAddresses(): string[] {
        return this.uniqueArray(this.concessionContracts.map((c) => c.address));
    }

    public get fuelTypes(): string[] {
        return this.concessionContracts.map((c) => c.fuelType);
    }

    public get regionId(): string {
        return this.concessionContracts.map((c) => c.regionId)[0];
    }

    public get eligibleCards(): IssuerCards[] {
        return this.eligibleIssuedCards;
    }

    private cardDetails: CardDetails;
    private concessionContracts: ConcessionContract[];
    private eligibleIssuedCards: IssuerCards[];

    constructor(public readonly businessPartnerNumber: string,
                public readonly accountHolderName: string) {
        this.cardDetails = new CardDetails();
        // Note: using Account Name as a fallback should not be required once the SAP to Azure storage sync has been completed
        this.accountHolderName = (accountHolderName || '').trim() || 'Account Name';
    }

    public setCardNumber(cardNumber: string): void {
        this.cardDetails.cardNumber = cardNumber;
    }

    public setSelectedCard(card: ConcessionCard): void {
        this.cardDetails.card = card;
    }

    public setEligibleCards(issuerCards: IssuerCards[]): void {
        if (issuerCards.length === 0) {
            throw new Error('List of eligible cards cannot be empty.');
        }
        this.eligibleIssuedCards = issuerCards;
    }

    public setSelectedContracts(contracts: ConcessionContract[]): void {
        if (contracts.length === 0 || contracts.length > 2) {
            throw new Error('Only 1 or 2 contracts can be added against a concession');
        }

        if (this.uniqueArray(contracts.map((c) => c.fuelType)).length !== contracts.length) {
            throw new Error('Contracts must be for different fuel types');
        }

        if (this.uniqueArray(contracts.map((c) => c.regionId)).length > 1) {
            throw new Error('Contracts must belong to the same region');
        }

        this.concessionContracts = contracts;
    }

    private uniqueArray(array: any[]): any[] {
        return array.filter((value, index, self) => {
            return self.indexOf(value) === index;
        });
    }
}
