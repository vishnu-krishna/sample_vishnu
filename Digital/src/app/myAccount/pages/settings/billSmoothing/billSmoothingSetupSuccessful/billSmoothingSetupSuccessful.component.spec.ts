import { BillDeliveryMethodType } from '../../../../services/settings/model/billDeliveryMethodType';
import { BillSmoothingService } from '../billSmoothing.service';
import { BillSmoothingSetupSuccessfulComponent } from './billSmoothingSetupSuccessful.component';

describe('Bill Smoothing Setup Successful Component', () => {
    let modalService: any;
    let billSmoothingService: any;
    let dataLayerService: any;
    let sut: BillSmoothingSetupSuccessfulComponent;

    beforeEach(() => {
        dataLayerService = {
            pushNewPageEvent: () => {
                throw new Error('dataLayerService.pushNewPageEvent has not been mocked properly.');
            }
        };
        sut = new BillSmoothingSetupSuccessfulComponent(modalService, billSmoothingService, dataLayerService);
        sut.setUpBillSmoothingResultMessage = {
            message: '',
            subMessage: '',
            startDate: new Date('2017-01-01'),
            saveResultDetails: [{
                isSuccessful: true,
                fuel: 'Electricity',
                amount: 20
            }],
            frequency: 'Weekly'
        };
        sut.accountNumber = 123;
        spyOn(BillSmoothingService, 'generateLongDate').and.returnValue('longDate');
        spyOn(dataLayerService, 'pushNewPageEvent').and.stub();
    });

    it('should show the correct for message first row', () => {
        sut.billDeliveryMethodType = BillDeliveryMethodType.Email;

        sut.ngOnInit();

        expect(sut.firstRow).toBe('You\'ll receive your Bill Smoothing welcome pack and confirmation email.');
    });
    it('should show the correct message for second row with direct debit', () => {
        sut.isDirectDebit = true;

        sut.ngOnInit();

        expect(sut.secondRow).toContain('We\'ll debit your');
        expect(sut.secondRow).toContain('weekly');
    });
    it('should show the correct message for second row without direct debit', () => {
        sut.isDirectDebit = false;

        sut.ngOnInit();

        expect(sut.secondRow).toContain('will be due starting');
        expect(sut.secondRow).toContain('Weekly');
    });
});
