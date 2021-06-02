import { OverviewPage } from '../pageObjects/OverviewPage';
import { PaygAssertions } from './componentsAssertions/paygAssertions';
import { startCase, lowerCase } from 'lodash';
import { waitForVisibilityOf } from '../../utilities/waits';

export class OverviewAssertions {

    private readonly makeAPaymentText = `MAKE A PAYMENT`;

    constructor(private overview: OverviewPage) {
    }

    public PaygAssertions(contractNumber: number): PaygAssertions {
        return new PaygAssertions(this.overview.createPaygComponentForContract(contractNumber));
    }

    public AssertDashboardFirstnameText(username: string) {
        waitForVisibilityOf(this.overview.firstName);
        expect(this.overview.firstName.getText()).toContain(startCase(lowerCase(username)), `username mismatch in overview`);
        expect(this.overview.loadingText.isDisplayed()).toBe(false, 'loading text must not be displayed');
    }

    public AssertOptionalBannerVisibility(expectSsmrBanner: boolean = false, expectSolarBanner: boolean = false) {
        expect(this.overview.ssmrBanner.isPresent()).toBe(expectSsmrBanner, `ssmr banner is expected to be ${expectSsmrBanner} for any customer with a basic meter`);
        expect(this.overview.solarHealthCheckBanner.isPresent()).toBe(expectSolarBanner, `solar health check banner is expected to be ${expectSolarBanner} for eligible solar customer`);
    }

    public AssertDashboardSidePanelLinks() {
        waitForVisibilityOf(this.overview.buttonStackLinks.first());
        expect(this.overview.buttonStackLinks.count()).toEqual(3, 'side panel must contain 3 links');
        expect(this.overview.getButtonStackLinkText(0)).toEqual('Add plan', `expected text 'Add plan' doesn't match ${this.overview.getButtonStackLinkText(0)}`);
        expect(this.overview.getButtonStackLinkText(1)).toEqual('Change plan', `expected text 'Change plan' doesn't match ${this.overview.getButtonStackLinkText(1)}`);
        expect(this.overview.getButtonStackLinkText(2)).toEqual('Add property', `expected text 'Add property' doesn't match ${this.overview.getButtonStackLinkText(2)}`);
    }

    public AssertDecisioningMarketingTileVisible() {
        expect(this.overview.decisioningMarketingTile.isDisplayed()).toBe(true, 'marketing tile is expected to be displayed in overview');
    }

    public AssertNumberOfAccountsForCustomer(numberOfAccounts: number) {
        expect(this.overview.accounts.count()).toBe(numberOfAccounts, 'expected number of accounts do not match');
    }

    public AssertAccountHeader(accountIndex: number, accountNo: string, address: string) {
        expect(this.overview.accountNumber(accountIndex).getText()).toContain(accountNo, `expected account number for a dual fuel user doesn't match in overview`);
        expect(this.overview.accountAddress(accountIndex).getText()).toContain(address, `expected address for a dual fuel user does not match in overview`);
    }

    public AssertFuelContractCount(numberOfContracts: number) {
        expect(this.overview.contracts.count()).toBe(numberOfContracts, 'expected number of contracts in the overview page do not match');
    }

    public AssertContractFuelHeader(contractNumber: number, fuelType: string, isRestricted: boolean = false) {
        expect(this.overview.fuelTypeTitle(contractNumber).getText()).toBe(fuelType, 'fuel type title do not match');
        expect(this.overview.fuelTypeIcon(contractNumber, fuelType.toLowerCase()).isDisplayed()).toBe(true, `${fuelType} fuel type icon must be displayed in overview`);
        expect(this.overview.inactiveLabel(contractNumber).isPresent()).toBe(isRestricted, `the restricted contract's inactive label visibility is expected to be: ${isRestricted}`);
    }

    public AssertSmartMeterPanelVisibility(contractNumber: number, visible: boolean = true) {
        expect(this.overview.smartMeterPanel(contractNumber).isPresent()).toBe(visible, `smart meter panel is expected to be visible: ${visible} in overview`);
        expect(this.overview.currentBillPeriod(contractNumber).isPresent()).toBe(visible, `bill period label is expected to be visible: ${visible} in overview`);
        expect(this.overview.costToDateAmount(contractNumber).isPresent()).toBe(visible, `cost to date amount is expected to be visible: ${visible} in overview`);
    }

    // TODO: Add assertions to tooltip message
    public AssertEstimatedReadsTooltipVisibility(contractNumber: number, isVisible: boolean) {
        expect(this.overview.estimatedReadToolTip(contractNumber).isPresent()).toBe(isVisible, `estimated reads tooltip visibility is expected to be: ${isVisible}`);
    }

    public AssertBasicMeterPanelVisibility(contractNumber: number, visible: boolean = true) {
        expect(this.overview.basicMeterPanel(contractNumber).isPresent()).toBe(visible, `basic meter panel is expected to be visible: ${visible} in the overview`);
        // TOOD: expand the testcase - these are only asserting the latest bill for now
        expect(this.overview.basicMeterBarAmountForIndex(contractNumber, 2).isPresent()).toBe(visible, `latest bill bar graph is expected to be visible: ${visible} in overview`);
        expect(this.overview.basicMeterBarDateForIndex(contractNumber, 2).isPresent()).toBe(visible, `latest bill bar graph is expected to be visible: ${visible} in overview`);
    }

    // TODO: Add in assertions and params for direct debit, overdue bill, manage DD link.
    public AssertBillingPanel(contractNumber: number) {
        expect(this.overview.billPanel(contractNumber).isDisplayed()).toBe(true, `bill panel for contract: ${contractNumber} must be displayed`);
    }

    public AssertOverviewBillPanelPaymentButton(contractNumber: number, isVisible: boolean = true, buttonText: string = this.makeAPaymentText) {
        expect(this.overview.billPaymentButton(contractNumber).isDisplayed()).toBe(isVisible, `the payment button element's visibility is expected to be: ${isVisible}`);
        expect(this.overview.billPaymentButton(contractNumber).getText()).toEqual(buttonText, `the payment button text is expected to be ${buttonText}`);
    }

    public AssertNoBillsMesage(contractNumber: number, fuelType: string) {
        expect(this.overview.noBillsPanel(contractNumber).isDisplayed()).toBe(true, `no bills panel is expected to be displayed for contract: ${contractNumber}`);
        expect(this.overview.noBillsMessage(contractNumber).getText()).toBe(this.noBillsMessage(fuelType), 'no first month bill message do not match');
    }

    private noBillsMessage = (fuelType: string) => `Your first ${fuelType.toLowerCase()} bill will be issued shortly.`;
}
