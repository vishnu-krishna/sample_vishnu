import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';

import { MauiFuelChipFuelContext } from '../../../../../maui/fuelChip/fuelChip.component.enum';
import { MauiFuelChipFuelType } from '../../../../../maui/fuelChip';
import { Now } from '../../../../../../shared/service/now.service';
import { FuelChipDataModel } from '../../models';
import { PaymentExtensionContractEligibility } from '../../../../../services/paymentScheme/paymentExtensionEligibility.service';
import { EligibleFuelChipFilterService } from './eligibleFuelChipFilter.service';
import { Locale } from '../../../../../../shared/globals/localisation';
import { AglCurrencyPipe } from '../../../../../pipes/aglCurrency.pipe';

describe('Eligible fuel chip filter service', () => {
    let sut: EligibleFuelChipFilterService = null;
    let nowStub: Now = null;

    beforeEach(() => {

        nowStub = <Now> {
            date: (): moment.Moment => {
                throw new Error('Method not implemented.');
            }
        };
        let currencyPipe = new AglCurrencyPipe();
        sut = new EligibleFuelChipFilterService( nowStub, currencyPipe);
    });

    it('should include contracts when isEligible is true, exclude when false', ((done) => {
        nowStub.date = (): moment.Moment => moment('2027-10-15');

        let testData: FuelChipDataModel[] = [
            new FuelChipDataModel('123', '111', MauiFuelChipFuelType.Gas, null, new PaymentExtensionContractEligibility('111', true, undefined, 1.00, new Date('2027-10-15')), MauiFuelChipFuelContext.Bill),
            new FuelChipDataModel('234', '222', MauiFuelChipFuelType.Gas, null, new PaymentExtensionContractEligibility('222', true, undefined, 2.00, new Date('2027-10-15')), MauiFuelChipFuelContext.Bill),
            new FuelChipDataModel('345', '333', MauiFuelChipFuelType.Gas, null, new PaymentExtensionContractEligibility('333', false, undefined, 3.00, new Date('2027-10-15')), MauiFuelChipFuelContext.Bill)
        ];

        sut.filter(testData).subscribe((results) => {
            expect(results.length).toBe(2);
            done();
        });
    }));

    it('should set primary status message to total to pay with formatted amount', ((done) => {
        let expectedAmountDue = 456.8;
        nowStub.date = (): moment.Moment => moment('2027-10-15');

        let testData: FuelChipDataModel[] = [
            new FuelChipDataModel('123', '111', MauiFuelChipFuelType.Gas, null,
                new PaymentExtensionContractEligibility('111', true, undefined, expectedAmountDue, new Date('2027-10-15')), MauiFuelChipFuelContext.Bill)
        ];

        sut.filter(testData).subscribe((results) => {
            expect(results.length).toBe(1);
            expect(results[0].statusMessage[0].primaryMessage).toBe(`Total to pay: $456.80`);
            done();
        });
    }));

    describe('Bill is due in the future', () => {

        it('should set secondary status message to due date when bill is due in the future', ((done) => {
            let today =  moment('2017-09-13');
            let dueDate = today.clone().add(1, 'days').toDate();
            nowStub.date = (): moment.Moment => today;

            let testData: FuelChipDataModel[] = [constructFuelChipDataWithDueDate(dueDate)];

            sut.filter(testData).subscribe((results) => {
                expect(results.length).toBe(1);
                expect(results[0].statusMessage[0].secondaryMessage).toBe('Due Thu 14 Sep 2017');
                done();
            });
        }));

    });

    describe('Bill is due today', () => {

        it('should set secondary status message to due date', ((done) => {
            let today = moment('2017-09-14');
            let dueDate = today.clone().toDate();
            nowStub.date = (): moment.Moment => today;

            let testData: FuelChipDataModel[] = [constructFuelChipDataWithDueDate(dueDate)];

            sut.filter(testData).subscribe((results) => {
                expect(results.length).toBe(1);
                expect(results[0].statusMessage[0].secondaryMessage).toBe('Due Thu 14 Sep 2017');
                done();
            });
        }));

    });

    describe('Bill is due in the past', () => {

        it('should set secondary status message to "day" (singular) overdue', ((done) => {
            let today = moment('2017-09-14');
            let dueDate = today.clone().add(-1, 'days').toDate();
            nowStub.date = (): moment.Moment => today;

            let testData: FuelChipDataModel[] = [constructFuelChipDataWithDueDate(dueDate)];

            sut.filter(testData).subscribe((results) => {
                expect(results.length).toBe(1);
                expect(results[0].statusMessage[0].secondaryMessage).toBe('Overdue by 1 day');
                done();
            });
        }));

        it('should set secondary status message to "days" (plural) overdue', ((done) => {
            let today = moment('2017-09-14');
            let dueDate = today.clone().add(-2, 'days').toDate();
            nowStub.date = (): moment.Moment => today;

            let testData: FuelChipDataModel[] = [constructFuelChipDataWithDueDate(dueDate)];

            sut.filter(testData).subscribe((results) => {
                expect(results.length).toBe(1);
                expect(results[0].statusMessage[0].secondaryMessage).toBe('Overdue by 2 days');
                done();
            });
        }));

    });

});

function constructFuelChipDataWithDueDate(dueDate: Date): FuelChipDataModel {
    return new FuelChipDataModel('123', '111', MauiFuelChipFuelType.Gas, null, new PaymentExtensionContractEligibility('111', true, undefined, 123.45, dueDate), MauiFuelChipFuelContext.Bill);
}
