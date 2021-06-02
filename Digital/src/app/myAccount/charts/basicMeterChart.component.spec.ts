import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BillViewModel, ContractViewModel } from '../services/account.service';
import { BasicMeterChartComponent } from './basicMeterChart.component';

describe('BasicMeterChartComponent', () => {

    let component: BasicMeterChartComponent;
    let fixture: ComponentFixture<BasicMeterChartComponent>;
    let debugElement: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                BasicMeterChartComponent
            ]
        });
        fixture = TestBed.createComponent(BasicMeterChartComponent);
        component = fixture.componentInstance;
    });

    it('should use the function getLatestBillsAsc to compare bills and sort them in order', async(() => {
        // Arrange
        component.contract = new ContractViewModel('333333333');
        component.contract.bills = new Array<BillViewModel>();
        let date1 = new Date('2017-6-10');
        let date2 = new Date('2017-7-11');
        let date3 = new Date('2017-8-12');
        component.contract.bills.push(new BillViewModel(200, 0, date2, null, false, false, 'Paid', null, null));
        component.contract.bills.push(new BillViewModel(100, 0, date1, null, false, false, 'Paid', null, null));
        component.contract.bills.push(new BillViewModel(300, 0, date3, null, false, false, 'Paid', null, null));
        component.hasBillHistory = true;

        // Act
        fixture.detectChanges();

        // Assert
        expect(component.bills[0].issuedDate).toBe(date1);
        expect(component.bills[1].issuedDate).toBe(date2);
        expect(component.bills[2].issuedDate).toBe(date3);
    }));

    it('should use the function zeroNegativeBillCharges to make any negative charges zero for graphing', async(() => {
        // Arrange
        component.contract = new ContractViewModel('333333333');
        component.contract.bills = new Array<BillViewModel>();
        let date1 = new Date('2017-6-10');
        component.contract.bills.push(new BillViewModel(-200, 0, date1, null, false, false, 'Paid', null, null));
        component.hasBillHistory = true;

        // Act
        fixture.detectChanges();

        // Assert
        expect(component.bills[2].newCharges).toBe(0);
    }));

    it('should use the function buildHeading to create the heading Previous bill', async(() => {
        // Arrange
        component.contract = new ContractViewModel('333333333');
        component.contract.bills = new Array<BillViewModel>();
        let date1 = new Date('2017-6-10');
        component.contract.bills.push(new BillViewModel(100, 0, date1, null, false, false, 'Paid', null, null));
        component.hasBillHistory = true;

        // Act
        fixture.detectChanges();
        // Assert
        expect(component.chartHeading).toBe('Previous bill');
        expect(fixture.nativeElement.querySelector('.dashboard-billing__sub-title').textContent.trim()).toMatch(`Previous bill`);
    }));

    it('should use the function buildHeading to create the heading Last 2 bills', async(() => {
        // Arrange
        component.contract = new ContractViewModel('333333333');
        component.contract.bills = new Array<BillViewModel>();
        let date1 = new Date('2017-6-10');
        let date2 = new Date('2017-7-11');
        component.contract.bills.push(new BillViewModel(200, 0, date2, null, false, false, 'Paid', null, null));
        component.contract.bills.push(new BillViewModel(100, 0, date1, null, false, false, 'Paid', null, null));
        component.hasBillHistory = true;

        // Act
        fixture.detectChanges();
        // Assert
        expect(component.chartHeading).toBe('Last 2 bills');
        expect(fixture.nativeElement.querySelector('.dashboard-billing__sub-title').textContent.trim()).toMatch(`Last 2 bills`);
    }));

    it('should use the function buildHeading to create the heading Last 3 bills', async(() => {
        // Arrange
        component.contract = new ContractViewModel('333333333');
        component.contract.bills = new Array<BillViewModel>();
        let date1 = new Date('2017-6-10');
        let date2 = new Date('2017-7-11');
        let date3 = new Date('2017-8-12');
        component.contract.bills.push(new BillViewModel(200, 0, date2, null, false, false, 'Paid', null, null));
        component.contract.bills.push(new BillViewModel(100, 0, date1, null, false, false, 'Paid', null, null));
        component.contract.bills.push(new BillViewModel(300, 0, date3, null, false, false, 'Paid', null, null));
        component.hasBillHistory = true;

        // Act
        fixture.detectChanges();
        // Assert
        expect(component.chartHeading).toBe('Last 3 bills');
        expect(fixture.nativeElement.querySelector('.dashboard-billing__sub-title').textContent.trim()).toMatch(`Last 3 bills`);
    }));

    it('should use the function buildBars to set the 10 Jun chart bar to 50%', async(() => {
        // Arrange
        component.contract = new ContractViewModel('333333333');
        component.contract.bills = new Array<BillViewModel>();
        let date1 = new Date('2017-6-10');
        let date2 = new Date('2017-7-11');
        let date3 = new Date('2017-8-12');
        component.contract.bills.push(new BillViewModel(200, 0, date1, null, false, false, 'Paid', null, null));
        component.contract.bills.push(new BillViewModel(0, 0, date2, null, false, false, 'Paid', null, null));
        component.contract.bills.push(new BillViewModel(400, 0, date3, null, false, false, 'Paid', null, null));
        component.hasBillHistory = true;

        // Act
        fixture.detectChanges();

        // Assert
        expect(component.chartBars[0].percentage).toBe(50);
        expect(component.chartBars[0].date).toBe('10 Jun');
    }));
});
