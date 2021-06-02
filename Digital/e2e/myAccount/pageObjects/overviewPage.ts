import { $, $$ } from 'protractor';
import { Context } from '../../context';
import { PaygPageObject } from './components/paygPageObject';
import { goToPage } from '../../utilities/navigator';

export class OverviewPage {
    // heading and side nav
    public firstName = $$('.agl-desktop-header-user__name').first();
    public loadingText = $$('.agl-desktop-header-user__name').last();
    public buttonStackLinks = $$('.promo-card-item__action--link');
    public decisioningMarketingTile = $('agl-offer-tile');
    public defaultMarketingTile = $('agl-marketing-tile');
    public header = $('agl-app-header');

    // optional banners
    public ssmrBanner = $('.ssmr-banner');
    public solarHealthCheckBanner = $('.solar-check-offer');
    public ssmrBannerButton = $('.ssmr-banner__cta-button');

    // accounts and contracts
    public accounts = $$('.address-header');
    public contracts = $$('.overview--account');

    private currentContext: Context;

    constructor(context: Context) {
        this.currentContext = context;
    }

    // account header
    public accountForIndex = (index: number) => this.accounts.get(index);
    public accountNumber = (index: number) => this.accountForIndex(index).$('#dashboard-account-number.number');
    public accountAddress = (index: number) => this.accountForIndex(index).$('#dashboard-address.address');
    // TODO: Fuel SVG Icons

    // contract panel header
    public contractPanel = (contract: number) => $(`#overview-account-${contract}`);
    public fuelTypeTitle = (contract: number) => this.contractPanel(contract).$('#fuel-type-title');
    public fuelTypeIcon = (contract: number, fuelType: string) => this.contractPanel(contract).$(`#fuel-type-${fuelType}-icon`);
    public inactiveLabel = (contract: number) => this.contractPanel(contract).$(`.billing-period__inactive-pill`);

    // smart meter dashboard
    public smartMeterPanel = (contract: number) => this.contractPanel(contract).$('.dashboard-smart-meter');
    public currentBillPeriod = (contract: number) => this.contractPanel(contract).$('.billing-period__heading');
    public costToDateAmount = (contract: number) => this.contractPanel(contract).$('.cost');
    public estimatedReadToolTip = (contract: number) => this.contractPanel(contract).$('#estimated-tooltip');

    // basic meter dashboard
    public basicMeterPanel = (contract: number) => this.contractPanel(contract).$('agl-basic-meter-chart');
    public basicMeterBarAmountForIndex = (contract: number, index: number) => this.contractPanel(contract).$$('.bar-price').get(index);
    public basicMeterBarDateForIndex = (contract: number, index: number) => this.contractPanel(contract).$$('.bar-date').get(index);

    // no first-month bill issued
    public noBillsPanel = (contract: number) => this.contractPanel(contract).$('.dashboard-billing-summary__no-bills-container');
    public noBillsMessage = (contract: number) => this.contractPanel(contract).$('.dashboard-billing-summary__no-bills-message');

    // TODO: EV Dashboard
    // TODO: BillSmoohitng dashboard
    // TODO: bill history & direct debit links - they need IDs/Classes from html file!

    // bill panel
    public billPanel = (contract: number) => $(`#overview-bill-panel-${contract}`);
    public billPaymentLabel = (contract: number) => this.billPanel(contract).$('#bill-panel-title__title');
    public billPaymentAmount = (contract: number) => this.billPanel(contract).$('#bill-panel-amount-value');
    public billPaymentDecimal = (contract: number) => this.billPaymentDecimal(contract).$('#bill-panel-amount__decimal');
    public nextBillIssued = (contract: number) => this.billPanel(contract).$('bill-panel-bill-issued');
    public billPaymentButton = (contract: number) => $(`#payment-button-${contract}`);

    public navigate() {
        goToPage('/overview');
    }

    public getButtonStackLinkText = (index: number) => this.buttonStackLinks.get(index).$('a').getText();

    // ---- Components ---- //
    public createPaygComponentForContract(contract: number): PaygPageObject {
        return new PaygPageObject(this.contractPanel(contract));
    }

    // ---- Actions ---- //
    public makeAPaymentForContract(contract: number) {
        this.currentContext.clickIfPresent(this.billPaymentButton(contract));
    }
}
