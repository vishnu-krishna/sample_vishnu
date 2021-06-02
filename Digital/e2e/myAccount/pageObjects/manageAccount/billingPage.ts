import { browser, by, element, $, $$ , promise } from 'protractor';
import { Context } from '../../../context';
import { PaygPageObject } from './../components/paygPageObject';
import { settings } from '../../pageObjects/settings';
import * as waits from '../../../utilities/waits';

export class BillingPage {
    // accounts and contracts
    public billingLink = $('.settings-desktop-left-menu--settings-billing');
    public DefaultSsmrlink = $('.account_7013149351 agl-settings-meter-reading a');
    public dualAccountSsmrlink = $('.account_55920961 agl-settings-meter-reading a');

    private currentContext: Context;

    constructor(context: Context) {
        this.currentContext = context;
    }

    public navigateToManageAccount(): any {
        settings.manageAccountHeaderLink.click();
        // waits.waitForElement(settings.settingsContainer);
    }

    public navigateToUsage(): any {
        settings.usageHeaderLink.click();
        // waits.waitForElement(settings.settingsContainer);
    }

}
