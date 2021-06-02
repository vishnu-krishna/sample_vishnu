import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentAssistancePlanSuccessFuelChipsModel } from './models';
import { MauiFuelChipFuelType, MauiFuelChipFuelContext, FuelChipContractAccountDetails, FuelChipContract } from '../../../../../../maui/fuelChip';
import { PaymentExtensionContractEligibility } from '../../../../../../services/paymentScheme/paymentExtensionEligibility.service';
import { ClassifiedFuelChips, EligibleFuelChipFilterService } from '../../../services';
import { PaymentAssistancePlanSuccessFuelChipsComponent } from './fuelChips.component';
import { PaymentAssistancePlanSuccessFuelChipsModule } from './fuelChips.module';
import { FuelChipDataModel } from '../../../models';
import { Now } from '../../../../../../../shared/service/now.service';
import { AglCurrencyPipe } from '../../../../../../pipes/aglCurrency.pipe';

describe('Payment Assistance Plan Success Fuel Chips Component', () => {

    const fuelChipsSelector = By.css('.payment-assistance-plan-success-fuel-chips');
    const accountNumber = '1200000000';
    const contractNumber = '1211111111';
    const paymentExtensionContractEligibility = new PaymentExtensionContractEligibility(contractNumber, true);
    const address = 'test address';
    const fuelChipContractAccountDetails = [
        new FuelChipContractAccountDetails(accountNumber, [new FuelChipContract(contractNumber, address, MauiFuelChipFuelType.Electricity, undefined)])
    ];

    const fuelChipData = new FuelChipDataModel(accountNumber, contractNumber, MauiFuelChipFuelType.Electricity, fuelChipContractAccountDetails, paymentExtensionContractEligibility, MauiFuelChipFuelContext.None);

    let comp: PaymentAssistancePlanSuccessFuelChipsComponent;
    let fixture: ComponentFixture<PaymentAssistancePlanSuccessFuelChipsComponent>;
    let de: DebugElement;

    let eligibleFuelChipFilterService: EligibleFuelChipFilterService;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                PaymentAssistancePlanSuccessFuelChipsModule
            ],
            providers: [
                Now,
                { provide: 'AppContentBranch', useValue: 'selfService' },
                EligibleFuelChipFilterService,
                AglCurrencyPipe
            ]
        });

        fixture = TestBed.createComponent(PaymentAssistancePlanSuccessFuelChipsComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;

        eligibleFuelChipFilterService = TestBed.get(EligibleFuelChipFilterService);
    });

    describe('fuelChipsSelector is NOT populated', () => {
        it('should not show the component', () => {
            // ARRANGE
            comp.fuelChipsModel = undefined;

            // ACT
            fixture.detectChanges();

            // ASSERT
            expect(de.query(fuelChipsSelector)).toBeNull();
        });

    });

    describe('fuelChipsSelector is populated', () => {

        it('should populate fuelChipsSelector indicating component is shown', ((done) => {

            eligibleFuelChipFilterService
                .filter([fuelChipData])
                .subscribe((eligibleFuelChips) => {

                    // ARRANGE
                    const fuelChipsModel: PaymentAssistancePlanSuccessFuelChipsModel = {
                        classifiedFuelChips: {
                            eligibleFuelChips: eligibleFuelChips,
                            alreadyExtendedFuelChips: [],
                            ineligibleFuelChips: []
                        }
                    };

                    // ACT
                    comp.fuelChipsModel = fuelChipsModel;

                    // ASSERT
                    expect(de.query(fuelChipsSelector)).toBeDefined();
                    done();

            });

        }));

        describe('onFuelChipSelected()', () => {

            it('should emit fuelChipSelected()', ((done) => {

                eligibleFuelChipFilterService
                    .filter([fuelChipData])
                    .subscribe((eligibleFuelChips) => {

                        // ARRANGE
                        const fuelChipsModel: PaymentAssistancePlanSuccessFuelChipsModel = {
                            classifiedFuelChips: {
                                eligibleFuelChips: eligibleFuelChips,
                                alreadyExtendedFuelChips: [],
                                ineligibleFuelChips: []
                            }
                        };

                        comp.fuelChipsModel = fuelChipsModel;
                        spyOn(comp.fuelChipSelected, 'emit');

                        // ACT
                        comp.onFuelChipSelected(contractNumber);
                        fixture.detectChanges();

                        // ASSERT
                        expect(comp.fuelChipSelected.emit).toHaveBeenCalledWith({
                            accountNumber: accountNumber,
                            contractNumber: contractNumber
                        });
                        done();

                });

            }));
        });

    });

});
