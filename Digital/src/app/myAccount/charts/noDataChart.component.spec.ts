import { DebugElement }                     from '@angular/core';
import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { By }                               from '@angular/platform-browser';
import { BillViewModel, ContractViewModel } from '../services/account.service';
import { NoDataChartComponent }             from './noDataChart.component';

describe('NoDataChartComponent', () => {
  let comp: NoDataChartComponent;
  let fixture: ComponentFixture<NoDataChartComponent>;
  let de: DebugElement;

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        NoDataChartComponent
      ],
      providers: [
        NoDataChartComponent
      ]
    });
    fixture = TestBed.createComponent(NoDataChartComponent);
    comp = fixture.componentInstance;
  });

  it('should have first bill issued shortly for elec contract', () => {
     // Arrange
    comp.contract = new ContractViewModel('123456789');
    comp.contract.fuelType = 'Electricity';
    comp.contract.isInFlight = false;
    de = fixture.debugElement;
    // Act
    fixture.detectChanges();
    // Assert
    let noBillsImage = de.query(By.css('.dashboard-billing-summary__no-bills-image'));
    let noBillsMessage = de.query(By.css('.dashboard-billing-summary__no-bills-message')).nativeElement;
    expect(comp.firstBillDue).toBe('shortly');
    expect(noBillsImage).not.toBeNull('No bills image element is not present');
    expect(noBillsMessage.innerHTML).toBe('Your first electricity bill will be issued shortly.');
  });

  it('should have first bill issued shortly for gas contract', () => {
     // Arrange
    comp.contract = new ContractViewModel('123456789');
    comp.contract.fuelType = 'Gas';
    comp.contract.isInFlight = false;
    de = fixture.debugElement;
    // Act
    fixture.detectChanges();
    // Assert
    let noBillsImage = de.query(By.css('.dashboard-billing-summary__no-bills-image'));
    let noBillsMessage = de.query(By.css('.dashboard-billing-summary__no-bills-message')).nativeElement;
    expect(comp.firstBillDue).toBe('shortly');
    expect(noBillsImage).not.toBeNull('No bills image element is not present');
    expect(noBillsMessage.innerHTML).toBe('Your first gas bill will be issued shortly.');
  });

  it('should show inFlight tile for elec contract', () => {
     // Arrange
    comp.contract = new ContractViewModel('123456789',
      <BillViewModel[]> [{
        newCharges: 0,
        totalDue: 0,
        issuedDate: new Date(),
        dueDate: new Date()
      }]
    );
    comp.contract.fuelType = 'Electricity';
    comp.contract.isInFlight = true;
    de = fixture.debugElement;
    // Act
    fixture.detectChanges();
    // Assert
    let inFlightElecHeroImage = de.query(By.css('.dashboard-billing-summary__icon-elec-svg'));
    let inFlightMainHeader = de.query(By.css('.dashboard-billing-summary__in-flight-main-header'));
    let inFlightSubHeader = de.query(By.css('.dashboard-billing-summary__in-flight-sub-header'));
    expect(inFlightElecHeroImage).not.toBeNull('In flight image element is not present');
    expect(inFlightMainHeader).not.toBeNull('Main header element is not present');
    expect(inFlightSubHeader).not.toBeNull('Sub header element is not present');
    expect(inFlightMainHeader.nativeElement.innerText).toBe('Account setup in progress');
    expect(inFlightSubHeader.nativeElement.innerText).toBe('Your connection information will be available online soon');
  });

  it('should show inFlight tile for gas contract', () => {
     // Arrange
    comp.contract = new ContractViewModel('123456789',
      <BillViewModel[]> [{
        newCharges: 0,
        totalDue: 0,
        issuedDate: new Date(),
        dueDate: new Date()
      }]
    );
    comp.contract.fuelType = 'Gas';
    comp.contract.isInFlight = true;
    de = fixture.debugElement;
    // Act
    fixture.detectChanges();
    // Assert
    let inFlightGasHeroImage = de.query(By.css('.dashboard-billing-summary__icon-gas-svg'));
    let inFlightMainHeader = de.query(By.css('.dashboard-billing-summary__in-flight-main-header'));
    let inFlightSubHeader = de.query(By.css('.dashboard-billing-summary__in-flight-sub-header'));
    expect(inFlightGasHeroImage).not.toBeNull('In flight image element is not present');
    expect(inFlightMainHeader).not.toBeNull('Main header element is not present');
    expect(inFlightSubHeader).not.toBeNull('Sub header element is not present');
    expect(inFlightMainHeader.nativeElement.innerText).toBe('Account setup in progress');
    expect(inFlightSubHeader.nativeElement.innerText).toBe('Your connection information will be available online soon');
  });
});
