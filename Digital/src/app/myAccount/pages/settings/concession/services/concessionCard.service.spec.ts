import { Observable } from 'rxjs/Observable';

import { ConcessionCardService } from './concessionCard.service';
import { ConcessionApiStubService } from './../../../../../test/stubs/concessionApi.stub.service';
import { IConcessionApi, Issuer } from '../../../../services/concession/concessionApi.service';
import { ConcessionCard } from '../concessionCard';
import { IssuerCards } from '../issuerCards';

describe('Concession Card Service', () => {
    let sut: ConcessionCardService;

    function createConcessionApiMock(issuers: Issuer[]): IConcessionApi {
        const mock = new ConcessionApiStubService();
        spyOn(mock, 'getEligibleConcessionCards').and.returnValue(Observable.of(issuers));
        return mock;
    }

    describe('successful get request', () => {
        function assertCardDetails(card: ConcessionCard,
                                   expectedIssuerCode: string,
                                   expectedIssuerDescription: string,
                                   expectedCardCode: string,
                                   expectedCardDescription: string,
                                   expectedEligibleFuelTypes: string[]) {
            expect(card.issuerCode).toBe(expectedIssuerCode);
            expect(card.issuerDescription).toBe(expectedIssuerDescription);
            expect(card.cardCode).toBe(expectedCardCode);
            expect(card.cardDescription).toBe(expectedCardDescription);
            expect(card.eligibleFuelTypes).toEqual(expectedEligibleFuelTypes);
        }

        it('should map to expected concession cards ordered by issuer and card description', (done: DoneFn) => {
            let apiResponse: Issuer[] = [
                {
                    issuerCode: 'I2',
                    issuer: 'Issuer 2',
                    cards: [
                        {
                            cardCode: 'C1',
                            name: 'Card 1 for I2',
                            eligibleFuelTypes: ['Electricity', 'Gas']
                        }
                    ]
                },
                {
                    issuerCode: 'I1',
                    issuer: 'Issuer 1',
                    cards: [
                        {
                            cardCode: 'C2',
                            name: 'Card 2 for I1',
                            eligibleFuelTypes: ['Gas']
                        },
                        {
                            cardCode: 'C1',
                            name: 'Card 1 for I1',
                            eligibleFuelTypes: ['Electricity']
                        }
                    ]
                }
            ];
            sut = new ConcessionCardService(createConcessionApiMock(apiResponse));

            sut.fetchEligibleCards('', [])
                .subscribe((results: IssuerCards[]) => {
                    expect(results.length).toEqual(2);

                    expect(results[0].issuerDescription).toBe('Issuer 1');
                    expect(results[0].cards.length).toBe(2);
                    assertCardDetails(results[0].cards[0], 'I1', 'Issuer 1', 'C1', 'Card 1 for I1', ['Electricity']);
                    assertCardDetails(results[0].cards[1], 'I1', 'Issuer 1', 'C2', 'Card 2 for I1', ['Gas']);

                    expect(results[1].issuerDescription).toBe('Issuer 2');
                    expect(results[1].cards.length).toBe(1);
                    assertCardDetails(results[1].cards[0], 'I2', 'Issuer 2', 'C1', 'Card 1 for I2', ['Electricity', 'Gas']);

                    done();
                }
            );
        });
    });
});
