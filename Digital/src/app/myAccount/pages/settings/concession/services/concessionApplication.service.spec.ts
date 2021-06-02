import { Observable } from 'rxjs/Observable';

import { ConcessionApiStubService } from './../../../../../test/stubs/concessionApi.stub.service';
import { ConcessionApplicationService, SubmissionResult } from './concessionApplication.service';
import { IConcessionApi } from '../../../../services/concession/concessionApi.service';
import { Concession } from '../concession';
import { ConcessionCard } from '../concessionCard';

describe('Concession Application Service', () => {
    let sut: ConcessionApplicationService;

    function createConcessionApiMock(response: number = null): IConcessionApi {
        const mock = new ConcessionApiStubService();
        spyOn(mock, 'saveConcession').and.returnValue(Observable.of(response || 0));
        return mock;
    }

    describe('successful concession submission', () => {
        it('should return a successful status', (done: DoneFn) => {
            sut = new ConcessionApplicationService(createConcessionApiMock(0));

            sut.submit(TestData.validConcession)
                .subscribe((result: SubmissionResult) => {
                    expect(result).toBe(SubmissionResult.Success);
                    done();
                }
            );
        });
    });

    describe('failed concession submission', () => {
        let errorsDataMap = [
            [ '001', SubmissionResult.InvalidCardFormat ],
            [ '002', SubmissionResult.CardAlreadyInUse ],
            [ '003', SubmissionResult.CardFromDifferentRegionId ],
            [ '999', SubmissionResult.UnknownError ]
        ];
        errorsDataMap.forEach((data) => {
            let errorNumber = data[0];
            let expectedSubmissionResult = <SubmissionResult> data[1];
            it(`should return ${SubmissionResult[expectedSubmissionResult]} when ErrorNumber is ${errorNumber}`, (done: DoneFn) => {
                sut = new ConcessionApplicationService(createConcessionApiMock(Number(errorNumber)));

                sut.submit(TestData.validConcession)
                    .subscribe((result: SubmissionResult) => {
                        expect(result).toBe(expectedSubmissionResult);
                        done();
                    }
                );
            });
        });

        it('should return UnhandledError when saveConcession errors', (done: DoneFn) => {
            const mock = new ConcessionApiStubService();
            spyOn(mock, 'saveConcession').and.returnValue(Observable.throw('test error'));
            sut = new ConcessionApplicationService(mock);

            sut.submit(TestData.validConcession)
                .subscribe((result: SubmissionResult) => {
                    expect(result).toBe(SubmissionResult.UnknownError);
                    done();
                }
            );
        });
    });
});

class TestData {
    static get validConcession(): Concession {
        let concession = new Concession('BP001', 'John Smith');
        concession.setSelectedContracts([{ contractNumber: '111', address: '1 Hil St', regionId: 'VIC', fuelType: 'Gas' }]);
        concession.setSelectedCard(new ConcessionCard('I1', 'Issuer 1', 'C1', 'Card 1', null));
        concession.setCardNumber('111');
        return concession;
    }
}
