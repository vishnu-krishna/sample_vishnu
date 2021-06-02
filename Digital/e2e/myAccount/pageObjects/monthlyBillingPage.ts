import { browser, by, element, $, $$ , promise } from 'protractor';
import { Context } from '../../context';
import { PaygPageObject } from './components/paygPageObject';
import { settings } from '../pageObjects/settings';
import * as waits from '../../utilities/waits';

export class MonthlyBillingPage {
    // accounts and contracts
    public billingContainer = $('.billing-container');
    public monthlyBillingHeader  = $$('.maui-navigation__header-text');
    public chooseyourserviceheader = $$('.maui-heading__main');
    public chooseservicecontainer = $('.choose-service');
    public fuellinkobject = $$('.maui-fuel-chip__header-selector');
    public switchtomonthlyBillingbutton = $('.maui-button.maui-button--primary.maui-button--large');
    public chooseBillIssueDate = $('.monthly-billing-choose-date');
    public termsncondcheckbox = $('.maui-terms-and-conditions-control__customcheckbox');
    private currentContext: Context;

    constructor(context: Context) {
        this.currentContext = context;
    }
    // bill panel header
    public billContainer = (contract: number) => $(`#billing-container-${contract}`);
    public fuelLink = (index: number) => this.fuellinkobject.get(index);

    public createPaygComponentForContract(contract: number): PaygPageObject {
        return new PaygPageObject(this.billContainer(contract));
    }

    public ClickFuel(index: number): any{
        this.fuelLink(index).click();
    }

    public monthlyBillingElectricitySwitchedOn = element(by.cssContainingText('span', 'Your electricity account is now on monthly billing'));

    public monthlyBillingGasSwitchedOn = element(by.cssContainingText('span', 'Your gas account is now on monthly billing'));

    public monthlyBillingConfirmationScreen = $('.monthly-billing-confirmation');

}
