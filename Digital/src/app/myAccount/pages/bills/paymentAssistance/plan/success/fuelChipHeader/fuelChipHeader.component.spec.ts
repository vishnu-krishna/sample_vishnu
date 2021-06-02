import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { PaymentAssistancePlanSuccessFuelChipHeaderModule } from './fuelChipHeader.module';
import { PaymentAssistancePlanSuccessFuelChipHeaderComponent } from './fuelChipHeader.component';
import { PaymentAssistancePlanSuccessFuelChipHeaderModel } from './models';
import { FuelChipDataModel } from '../../../models';
import { MauiFuelChipFuelType, MauiFuelChipFuelContext, FuelChipContractAccountDetails, FuelChipContract } from '../../../../../../maui/fuelChip';
import { PaymentExtensionContractEligibility } from '../../../../../../services/paymentScheme/paymentExtensionEligibility.service';

describe('Payment Assistance Plan Success Fuel Chip Header Component', () => {

    const fuelChipHeaderSelector = By.css('.payment-assistance-plan-success-fuel-chip-header');
    const accountNumber = '1200000000';
    const contractNumber = '1211111111';
    const paymentExtensionContractEligibility = new PaymentExtensionContractEligibility(contractNumber, true);
    const address = 'test address';
    const fuelChipContractAccountDetails = [
        new FuelChipContractAccountDetails(accountNumber, [new FuelChipContract(contractNumber, address, MauiFuelChipFuelType.Electricity, undefined)])
    ];
    const fuelChipData = new FuelChipDataModel(accountNumber, contractNumber, MauiFuelChipFuelType.Electricity, fuelChipContractAccountDetails, paymentExtensionContractEligibility, MauiFuelChipFuelContext.None);
    const fuelChipHeaderModel: PaymentAssistancePlanSuccessFuelChipHeaderModel = {
        fuelChip: fuelChipData
    };

    let comp: PaymentAssistancePlanSuccessFuelChipHeaderComponent;
    let fixture: ComponentFixture<PaymentAssistancePlanSuccessFuelChipHeaderComponent>;
    let de: DebugElement;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                PaymentAssistancePlanSuccessFuelChipHeaderModule
            ]
        });

        fixture = TestBed.createComponent(PaymentAssistancePlanSuccessFuelChipHeaderComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;

    });

    describe('fuelChipHeaderSelector is NOT populated', () => {
        it('should not show the component', () => {
            // ARRANGE
            comp.fuelChipHeaderModel = undefined;

            // ACT
            fixture.detectChanges();

            // ASSERT
            expect(de.query(fuelChipHeaderSelector)).toBeNull();
        });

    });

    describe('fuelChipHeaderSelector is populated', () => {

        beforeEach(() => {
            comp.fuelChipHeaderModel = fuelChipHeaderModel;
        });

        it('should show the component', () => {
            // ACT
            fixture.detectChanges();

            // ASSERT
            expect(de.query(fuelChipHeaderSelector)).toBeDefined();
        });

    });

});
