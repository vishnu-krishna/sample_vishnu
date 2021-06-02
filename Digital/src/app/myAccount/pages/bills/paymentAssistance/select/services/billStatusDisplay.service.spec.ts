import { TestBed } from '@angular/core/testing';
import { IBillStatusDisplayService, BillStatusDisplayService } from './billStatusDisplay.service';
import { BillStatusDisplayModel, BillStatusHeadingModel } from '../models';
import { BillStatusDisplayEnum } from '../enums';

describe('BillStatusDisplay Service', () => {

    let billStatusService: IBillStatusDisplayService;
    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [
                { provide: IBillStatusDisplayService, useClass: BillStatusDisplayService }
            ]
        });

        billStatusService = TestBed.get(IBillStatusDisplayService);

    });

    describe('initialise', () => {

        it('should set all display fields to false', () => {
            // ASSERT
            expect(billStatusService.display).toEqual(<BillStatusDisplayModel> {
                heading1ChooseYourBill: false,
                heading2CannotOfferOPA: false,
                subheading1SelectBill: false,
                subheading2AlreadySetupOPA: false,
                subheading3aNoOPAOptionsAvailable: false,
                subheading3bDontWorryOtherOptionsAvailable: false,
                payOnTimeDiscountMessage: false,
                goToOverviewButton: false
            });
        });

        it('should default headings', () => {
            // ARRANGE
            const initialHeading: BillStatusHeadingModel = new BillStatusHeadingModel ();
            initialHeading.heading1ChooseYourBill = `Choose your bill`;
            initialHeading.heading2CannotOfferOPA =  `We can't currently offer online payment assistance for these bills`;
            initialHeading.subheading1SelectBill =  ``;
            initialHeading.subheading2AlreadySetupOPA = `You've already set up payment assistance for the bills shown below.`;
            initialHeading.subheading3aNoOPAOptionsAvailable = `There are no online assistance options for the bills shown below.`;
            initialHeading.subheading3bDontWorryOtherOptionsAvailable = `Don't worry though, there are still other options available to you.`;

            // ASSERT
            expect(billStatusService.heading).toEqual(initialHeading);
        });

        it('should set all display fields to false', () => {
            // ASSERT
            expect(billStatusService.display).toEqual(<BillStatusDisplayModel> {
                heading1ChooseYourBill: false,
                heading2CannotOfferOPA: false,
                subheading1SelectBill: false,
                subheading2AlreadySetupOPA: false,
                subheading3aNoOPAOptionsAvailable: false,
                subheading3bDontWorryOtherOptionsAvailable: false,
                payOnTimeDiscountMessage: false,
                goToOverviewButton: false
            });
        });

    });

    describe('setDisplayMode()', () => {

        describe('Eligible', () => {

            it('should set (heading1, subheading1, payOnTimeDiscountMessage) to true', () => {
                // ACT
                billStatusService.setDisplayMode(BillStatusDisplayEnum.Eligible);

                // ARRANGE
                expect(billStatusService.display).toEqual(<BillStatusDisplayModel> {
                    heading1ChooseYourBill: true,
                    heading2CannotOfferOPA: false,
                    subheading1SelectBill: true,
                    subheading2AlreadySetupOPA: false,
                    subheading3aNoOPAOptionsAvailable: false,
                    subheading3bDontWorryOtherOptionsAvailable: false,
                    payOnTimeDiscountMessage: true,
                    goToOverviewButton: false
                });
            });

        });

        describe('Eligible + Already on P2P', () => {

            it('should set (heading1, subheading1, subheading2, payOnTimeDiscountMessage) to true', () => {
                // ACT
                billStatusService.setDisplayMode(BillStatusDisplayEnum.EligibleAlreadyOnP2P);

                // ARRANGE
                expect(billStatusService.display).toEqual(<BillStatusDisplayModel> {
                    heading1ChooseYourBill: true,
                    heading2CannotOfferOPA: false,
                    subheading1SelectBill: true,
                    subheading2AlreadySetupOPA: true,
                    subheading3aNoOPAOptionsAvailable: false,
                    subheading3bDontWorryOtherOptionsAvailable: false,
                    payOnTimeDiscountMessage: true,
                    goToOverviewButton: false
                });
            });

        });

        describe('Eligible + Already on P2P + Ineligible', () => {

            it('should set (heading1, subheading1, subheading2, subheading3a, subheading3b, payOnTimeDiscountMessage) to true', () => {
                // ACT
                billStatusService.setDisplayMode(BillStatusDisplayEnum.EligibleAlreadyOnP2PIneligible);

                // ARRANGE
                expect(billStatusService.display).toEqual(<BillStatusDisplayModel> {
                    heading1ChooseYourBill: true,
                    heading2CannotOfferOPA: false,
                    subheading1SelectBill: true,
                    subheading2AlreadySetupOPA: true,
                    subheading3aNoOPAOptionsAvailable: true,
                    subheading3bDontWorryOtherOptionsAvailable: true,
                    payOnTimeDiscountMessage: true,
                    goToOverviewButton: false
                });
            });

        });

        describe('Eligible + Ineligible', () => {

            it('should set (heading1, subheading1, subheading3a, subheading3b, payOnTimeDiscountMessage) to true', () => {
                // ACT
                billStatusService.setDisplayMode(BillStatusDisplayEnum.EligibleIneligible);

                // ARRANGE
                expect(billStatusService.display).toEqual(<BillStatusDisplayModel> {
                    heading1ChooseYourBill: true,
                    heading2CannotOfferOPA: false,
                    subheading1SelectBill: true,
                    subheading2AlreadySetupOPA: false,
                    subheading3aNoOPAOptionsAvailable: true,
                    subheading3bDontWorryOtherOptionsAvailable: true,
                    payOnTimeDiscountMessage: true,
                    goToOverviewButton: false
                });
            });

        });

        describe('Already on P2P', () => {

            it('should set (heading2, subheading2, goToOverviewButton) to true', () => {
                // ACT
                billStatusService.setDisplayMode(BillStatusDisplayEnum.AlreadyOnP2P);

                // ARRANGE
                expect(billStatusService.display).toEqual(<BillStatusDisplayModel> {
                    heading1ChooseYourBill: false,
                    heading2CannotOfferOPA: true,
                    subheading1SelectBill: false,
                    subheading2AlreadySetupOPA: true,
                    subheading3aNoOPAOptionsAvailable: false,
                    subheading3bDontWorryOtherOptionsAvailable: false,
                    payOnTimeDiscountMessage: false,
                    goToOverviewButton: true
                });
            });

        });

        describe('Already on P2P + Ineligible', () => {

            it('should set (heading2, subheading2, subheading3a, subheading3b, goToOverviewButton) to true', () => {
                // ACT
                billStatusService.setDisplayMode(BillStatusDisplayEnum.AlreadyOnP2PIneligible);

                // ARRANGE
                expect(billStatusService.display).toEqual(<BillStatusDisplayModel> {
                    heading1ChooseYourBill: false,
                    heading2CannotOfferOPA: true,
                    subheading1SelectBill: false,
                    subheading2AlreadySetupOPA: true,
                    subheading3aNoOPAOptionsAvailable: true,
                    subheading3bDontWorryOtherOptionsAvailable: true,
                    payOnTimeDiscountMessage: false,
                    goToOverviewButton: true
                });
            });

        });

        describe('Ineligible', () => {

            it('should set (heading2, subheading3b, goToOverviewButton) to true', () => {
                // ACT
                billStatusService.setDisplayMode(BillStatusDisplayEnum.Ineligible);

                // ARRANGE
                expect(billStatusService.display).toEqual(<BillStatusDisplayModel> {
                    heading1ChooseYourBill: false,
                    heading2CannotOfferOPA: true,
                    subheading1SelectBill: false,
                    subheading2AlreadySetupOPA: false,
                    subheading3aNoOPAOptionsAvailable: false,
                    subheading3bDontWorryOtherOptionsAvailable: true,
                    payOnTimeDiscountMessage: false,
                    goToOverviewButton: true
                });
            });

        });

    });

    describe('setSubheading1()', () => {

        it('should insert the first name "testFirstName" into the copy', () => {
            // ARRANGE
            const firstName = 'testFirstName';

            // ACT
            billStatusService.setSubheading1SelectBill(firstName);

            // ASSERT
            expect(billStatusService.heading.subheading1SelectBill).toBe(`Hi testFirstName, select the bill you'd like assistance with below.`);
        });

    });

    describe('determineBillStatusDisplay()', () => {

        it('should return Eligible', () => {
            // ASSERT
            expect(billStatusService.determineBillStatusDisplay(true, false, false)).toBe(BillStatusDisplayEnum.Eligible);
        });

        it('should return EligibleAlreadyOnP2P', () => {
            // ASSERT
            expect(billStatusService.determineBillStatusDisplay(true, true, false)).toBe(BillStatusDisplayEnum.EligibleAlreadyOnP2P);
        });

        it('should return EligibleAlreadyOnP2PIneligible', () => {
            // ASSERT
            expect(billStatusService.determineBillStatusDisplay(true, true, true)).toBe(BillStatusDisplayEnum.EligibleAlreadyOnP2PIneligible);
        });

        it('should return EligibleIneligible', () => {
            // ASSERT
            expect(billStatusService.determineBillStatusDisplay(true, false, true)).toBe(BillStatusDisplayEnum.EligibleIneligible);
        });

        it('should return AlreadyOnP2P', () => {
            // ASSERT
            expect(billStatusService.determineBillStatusDisplay(false, true, false)).toBe(BillStatusDisplayEnum.AlreadyOnP2P);
        });

        it('should return AlreadyOnP2PIneligible', () => {
            // ASSERT
            expect(billStatusService.determineBillStatusDisplay(false, true, true)).toBe(BillStatusDisplayEnum.AlreadyOnP2PIneligible);
        });

        it('should return Ineligible', () => {
            // ASSERT
            expect(billStatusService.determineBillStatusDisplay(false, false, true)).toBe(BillStatusDisplayEnum.Ineligible);
        });

    });
});
