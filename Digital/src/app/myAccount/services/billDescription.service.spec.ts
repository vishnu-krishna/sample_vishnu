import { BillViewModel, ContractViewModel } from './account.service';
import { BillDescriptionService } from './billDescription.service';
import { NowMock } from './mock/now.mock.service';
import { Mock } from 'ts-mocks';
import { FeatureFlagService, FeatureFlagTypes } from './featureFlag.service';
import { Observable } from 'rxjs/Observable';

describe('BillDescription Service', () => {

    let sut: BillDescriptionService;
    let nowMock: NowMock;
    let featureFlagMockService: Mock<FeatureFlagService>;

    beforeEach(() => {
        nowMock = new NowMock('');
        featureFlagMockService = new Mock<FeatureFlagService>();

        sut = new BillDescriptionService(nowMock, featureFlagMockService.Object);
    });

    describe('nextBillIssuedIn', () => {
        let testData = [
            ['api default min date (as date)', new Date('0001-01-01T00:00:00'), 'never'],
            ['api default min date (as string)', '0001-01-01T00:00:00', 'never'],
            ['no bill end date', null, 'never'],
            ['bill ended 2 days ago', new Date(2018, 3, 29), ''],
            ['bill ended yesterday', new Date(2018, 3, 30), 'recent past'],
            ['bill ends today', new Date(2018, 4, 1), 'recent past'],
            ['bill ends tomorrow', new Date(2018, 4, 2), 'future 2 days'],
            ['bill ends tomorrow (api date format)', new Date('2018-05-02T00:00:00'), 'future 2 days'],
            ['bill ends in 2 days time', new Date(2018, 4, 3), 'future 3 days'],
            ['bill ends in 150 days time', new Date(2018, 8, 28), 'future 151 days'],
            ['bill ends in 151 days time', new Date(2018, 8, 29), '']
        ];
        testData.forEach((data) => {
            let scenario = <string> data[0];
            let currentBillEndDate = <Date> data[1];
            let expectedResult = <string> data[2];

            it(`Should be '${expectedResult}' when ${scenario}`, () => {
                nowMock.setDate(2018, 4, 1); // hard coded to offset against the test data above
                let result = sut.nextBillIssuedIn(currentBillEndDate, 'never', 'recent past', 'future');

                expect(result).toBe(expectedResult);
            });
        });

        it(`should be 'prefix-suffix' when suffix is provided`, () => {
            nowMock.setDate(2018, 4, 1);
            let result = sut.nextBillIssuedIn(new Date(2018, 4, 10), '', '', 'prefix', '-suffix');

            expect(result).toBe('prefix 10 days-suffix');
        });
    });

    describe('paymentMethodDueInDays', () => {
        let testData = [
            ['on direct debit and due yesterday', new Date(2018, 3, 30), true, ''],
            ['on direct debit and due in 0 days', new Date(2018, 4, 1), true, 'Debited today'],
            ['on direct debit and due in 1 day', new Date(2018, 4, 2), true, 'Debited tomorrow'],
            ['on direct debit and due in 2 days', new Date(2018, 4, 3), true, 'Debited in 2 days'],
            ['not on direct debit and due yesterday', new Date(2018, 3, 30), false, ''],
            ['not on direct debit and due in 0 days', new Date(2018, 4, 1), false, 'Due today'],
            ['not on direct debit and due in 1 day', new Date(2018, 4, 2), false, 'Due tomorrow'],
            ['not on direct debit and due in 2 days', new Date(2018, 4, 3), false, 'Due in 2 days'],
        ];
        testData.forEach((data) => {
            let scenario = <string> data[0];
            let dueDate = <Date> data[1];
            let isDirectDebit = <boolean> data[2];
            let expectedResult = <string> data[3];

            it(`should be '${expectedResult}' when ${scenario}`, (done: DoneFn) => {
                let contract = new ContractViewModel('1234567890', [
                    new BillViewModel(0, 0, null, dueDate, false, false, '', null, null)
                ]);
                contract.isDirectDebit = isDirectDebit;

                nowMock.setDate(2018, 4, 1);
                featureFlagMockService.setup((m) => m.featureFlagged)
                                      .is((arg) => Observable.of(false));

                sut.paymentMethodDueInDays(contract).subscribe((result) => {
                    expect(result).toBe(expectedResult);

                    done();
                });
            });
        });

        testData = [
            ['should use dueDate when paymentExtension feature flag disabled', false, 'Due in 31 days'],
            ['should use extendedDueDate when paymentExtension feature flag enabled', true, 'Due in 41 days']
        ];
        testData.forEach((data) => {
            let scenario = <string> data[0];
            let featureFlagEnabled = <boolean> data[1];
            let expectedResult = <string> data[2];

            it(`${scenario}`, (done: DoneFn) => {
                const dueDate = new Date(2018, 5, 1);
                let contract = new ContractViewModel('1234567890', [
                    new BillViewModel(0, 0, null, dueDate, false, false, '', null, null)
                ]);

                // add 10 days to the dueDate
                contract.extendedDueDate = new Date(dueDate);
                contract.extendedDueDate.setDate(dueDate.getDate() + 10);

                nowMock.setDate(2018, 4, 1);
                featureFlagMockService.setup((m) => m.featureFlagged)
                                      .is((arg) => Observable.of(featureFlagEnabled && arg === FeatureFlagTypes.paymentExtensionEnabled));

                sut.paymentMethodDueInDays(contract).subscribe((result) => {
                    expect(result).toBe(expectedResult);

                    done();
                });
            });
        });

        it(`should return '' when no newest bill`, (done: DoneFn) => {
            const dueDate = new Date(2018, 5, 1);
            let contract = new ContractViewModel('1234567890', [/* no bills */]);

            nowMock.setDate(2018, 4, 1);
            featureFlagMockService.setup((m) => m.featureFlagged)
                                  .is((arg) => Observable.of(false));

            sut.paymentMethodDueInDays(contract).subscribe((result) => {
                expect(result).toBe('');

                done();
            });
        });
    });

    describe('dateRangeDescription result', () => {
        it(`should not use year in start date when start and end date years are the same`, () => {
            let result = sut.dateRangeDescription(new Date(2018, 10, 10), new Date(2018, 11, 10));

            expect(result).toBe('10 Nov to 10 Dec 2018');
        });

        it(`should not use year in start date when start and end date years differ`, () => {
            let result = sut.dateRangeDescription(new Date(2018, 10, 10), new Date(2018, 11, 10));

            expect(result).toBe('10 Nov to 10 Dec 2018');
        });

        it(`should strip leading 0 when day < 10`, () => {
            let result = sut.dateRangeDescription(new Date(2018, 9, 5), new Date(2018, 10, 5));

            expect(result).toBe('5 Oct to 5 Nov 2018');
        });

        it(`should return empty string when year is before 2010`, () => {
            let result = sut.dateRangeDescription(new Date(1995, 10, 10), new Date(1998, 10, 10));

            expect(result).toBe('');
        });

        it(`should return empty string when date is null`, () => {
            let result = sut.dateRangeDescription(null, null);

            expect(result).toBe('');
        });
    });
});
