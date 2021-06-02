import { Injectable } from '@angular/core';
import { BillStatusDisplayModel, BillStatusHeadingModel } from '../models';
import { BillStatusDisplayEnum } from '../enums';

export abstract class IBillStatusDisplayService {
    public abstract display: BillStatusDisplayModel;
    public abstract heading: BillStatusHeadingModel;
    public abstract setDisplayMode(mode: BillStatusDisplayEnum): void;
    public abstract setSubheading1SelectBill(firstName: string): void;
    public abstract determineBillStatusDisplay(eligible: boolean, alreadyExtended: boolean, ineligible: boolean): BillStatusDisplayEnum;
}

@Injectable()
export class BillStatusDisplayService implements IBillStatusDisplayService {
    public display: BillStatusDisplayModel = new BillStatusDisplayModel();
    public heading: BillStatusHeadingModel = new BillStatusHeadingModel();

    constructor() {
        this.resetDisplay();
        this.resetHeading();
    }

    public setDisplayMode(mode: BillStatusDisplayEnum): void {

        this.resetDisplay();

        const d = this.display;

        const billStatusDisplay = {
            [BillStatusDisplayEnum.Eligible]: () => {
                d.heading1ChooseYourBill = true;
                d.subheading1SelectBill = true;
                d.payOnTimeDiscountMessage = true;
            },
            [BillStatusDisplayEnum.EligibleAlreadyOnP2P]: () => {
                d.heading1ChooseYourBill = true;
                d.subheading1SelectBill = true;
                d.subheading2AlreadySetupOPA = true;
                d.payOnTimeDiscountMessage = true;
            },
            [BillStatusDisplayEnum.EligibleAlreadyOnP2PIneligible]: () => {
                d.heading1ChooseYourBill = true;
                d.subheading1SelectBill = true;
                d.subheading2AlreadySetupOPA = true;
                d.subheading3aNoOPAOptionsAvailable = true;
                d.subheading3bDontWorryOtherOptionsAvailable = true;
                d.payOnTimeDiscountMessage = true;
            },
            [BillStatusDisplayEnum.EligibleIneligible]: () => {
                d.heading1ChooseYourBill = true;
                d.subheading1SelectBill = true;
                d.subheading3aNoOPAOptionsAvailable = true;
                d.subheading3bDontWorryOtherOptionsAvailable = true;
                d.payOnTimeDiscountMessage = true;
            },
            [BillStatusDisplayEnum.AlreadyOnP2P]: () => {
                d.heading2CannotOfferOPA = true;
                d.subheading2AlreadySetupOPA = true;
                d.goToOverviewButton = true;
            },
            [BillStatusDisplayEnum.AlreadyOnP2PIneligible]: () => {
                d.heading2CannotOfferOPA = true;
                d.subheading2AlreadySetupOPA = true;
                d.subheading3aNoOPAOptionsAvailable = true;
                d.subheading3bDontWorryOtherOptionsAvailable = true;
                d.goToOverviewButton = true;
            },
            [BillStatusDisplayEnum.Ineligible]: () => {
                d.heading2CannotOfferOPA = true;
                d.subheading3bDontWorryOtherOptionsAvailable = true;
                d.goToOverviewButton = true;
            }
        };

        if (billStatusDisplay[mode]) {
            billStatusDisplay[mode]();
        }
    }

    public setSubheading1SelectBill(firstName: string): void {
        this.heading.subheading1SelectBill = `Hi ${firstName}, select the bill you'd like assistance with below.`;
    }

    public determineBillStatusDisplay(eligible: boolean, alreadyOnP2P: boolean, ineligible: boolean): BillStatusDisplayEnum {

        if (eligible && !alreadyOnP2P && !ineligible) { return BillStatusDisplayEnum.Eligible; }
        if (eligible && alreadyOnP2P && !ineligible) { return BillStatusDisplayEnum.EligibleAlreadyOnP2P; }
        if (eligible && alreadyOnP2P && ineligible) { return BillStatusDisplayEnum.EligibleAlreadyOnP2PIneligible; }
        if (eligible && !alreadyOnP2P && ineligible) { return BillStatusDisplayEnum.EligibleIneligible; }
        if (!eligible && alreadyOnP2P && !ineligible) { return BillStatusDisplayEnum.AlreadyOnP2P; }
        if (!eligible && alreadyOnP2P && ineligible) { return BillStatusDisplayEnum.AlreadyOnP2PIneligible; }
        if (!eligible && !alreadyOnP2P && ineligible) { return BillStatusDisplayEnum.Ineligible; }

        throw new Error('Unknown combination');
    }

    private resetDisplay() {
        this.display = {
            heading1ChooseYourBill: false,
            heading2CannotOfferOPA: false,
            subheading1SelectBill: false,
            subheading2AlreadySetupOPA: false,
            subheading3aNoOPAOptionsAvailable: false,
            subheading3bDontWorryOtherOptionsAvailable: false,
            payOnTimeDiscountMessage: false,
            goToOverviewButton: false
        };
    }

    private resetHeading() {
        const heading = this.heading;
        heading.heading1ChooseYourBill = `Choose your bill`;
        heading.heading2CannotOfferOPA = `We can't currently offer online payment assistance for these bills`;
        heading.subheading1SelectBill =  ``;
        heading.subheading2AlreadySetupOPA = `You've already set up payment assistance for the bills shown below.`;
        heading.subheading3aNoOPAOptionsAvailable = `There are no online assistance options for the bills shown below.`;
        heading.subheading3bDontWorryOtherOptionsAvailable =  `Don't worry though, there are still other options available to you.`;
    }
}
