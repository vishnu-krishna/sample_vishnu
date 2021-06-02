import { ConcessionCard } from './concessionCard';

export class IssuerCards {
    constructor(public readonly issuerDescription: string,
                public readonly cards: ConcessionCard[]) {
    }
}
