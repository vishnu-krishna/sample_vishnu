import { browser, by, element, $, $$ , promise } from 'protractor';
import { Context } from '../../../context';
import { PaygPageObject } from './../components/paygPageObject';
import * as waits from '../../../utilities/waits';

export class NotificationsPage {
    // accounts and contracts
    public notificationsContainer = $('.main-card-body');
    public notificationsHeader = by.cssContainingText('span', 'Notifications');
    public energyInsightsHeader = element(by.cssContainingText('h4', 'Energy Insights'));
    public midBillUpdateClass = $('.mid-bill-control');
    public energyInsightsReportClass = $('.end-bill-control');
    public midBillUpdate = element(by.cssContainingText('p', 'Mid Bill Update.'));
    public energyInsightsReport = by.cssContainingText('p', 'Energy Insights Report.');
    public energyInsightsAccountNumbers = $$('.energy-insights__account-number');
    public energyInsightsContractNumbers = $$('.energy-insights__contract-number');
    public ebillContainer = $$('.main-card-options').get(0);
    public ebillMauiToggles = this.ebillContainer.$$('.maui-toggle--active__circle');
    public energyInsightsContainer = $$('.main-card-options').get(2);
    public energyInsightsToggles = this.energyInsightsContainer.$$('.maui-toggle--active__circle');

    // maui toggle bar
    public midBillToggle = this.midBillUpdateClass.$('.maui-toggle--active__circle');
    public energyInsightsToggle = this.energyInsightsReportClass.$('.maui-toggle--active__circle');
    private currentContext: Context;
    public midBillToggleChecked = this.midBillUpdateClass.$('.maui-toggle--active__tablet--checked');
    public eIToggleChecked = this.energyInsightsReportClass.$('.maui-toggle--active__tablet--checked');

    // ebilling
    public ebillingToggle = $('div.ebill-container agl-maui-toggle label.maui-toggle');

    constructor(context: Context) {
        this.currentContext = context;
    }

    public clickEbillMauiToggle() {
        return this.ebillMauiToggles.each((toggleElement, index) => {
            waits.waitForVisibilityOf(toggleElement);
            toggleElement.getAttribute('class').then((asser) => {
                if (!asser.includes('checked')) {
                    toggleElement.click();
                }
            });
        });
    }

    public clickEnergyInsightsMauiToggle() {
        waits.waitForVisibilityOf(this.energyInsightsHeader);
        return this.energyInsightsToggles.each((toggleElement, index) => {
            waits.waitForVisibilityOf(toggleElement);
            toggleElement.getAttribute('class').then((asser) => {
                if (!asser.includes('checked')) {
                    toggleElement.click();
                }
            });
        });
    }

    public checkEnergyInsightsMauiToggleStatus() {
        waits.waitForVisibilityOf(this.energyInsightsHeader);
        return this.energyInsightsToggles.each((toggleElement, index) => {
            waits.waitForVisibilityOf(toggleElement);
            toggleElement.getAttribute('class').then((asser) => {
                expect(asser.includes('checked')).toBe(true, 'EnergyInsights Maui Toggle is not Subscribed');
            });
        });
    }
    // midBill Toggle
    public clickMidBillToggle() {
        this.midBillToggle.click();
    }

    // energyInsights Toggle
    public clickEnergyInsightsToggle() {
        this.energyInsightsToggle.click();
    }

    // energyInsights Toggle Value
    public getEnergyInsightsTogglevalue() {
        this.energyInsightsToggle.getAttribute('checked');
    }
}
