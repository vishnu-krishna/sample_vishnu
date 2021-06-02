import { $ } from 'protractor';
import * as waits from '../../utilities/waits';

export class MobileNavigationHelpers {

    // TODO
    // this class is created temporarily for handling the mobile screen resolutions since 
    // we don't have too many tests running on mobile screen resolutions. In a long term I
    // would like to have one Navigation helper class which will handle both desktop and 
    // mobile screen resolutions. Need to discuss the approach/options with other team 
    // members and implement it 
    private mobileHeaderMenu = $('.agl-mobile-header-menu');

    public openBillingScreen(): void {
        let el = $(this.menuItem('bills'));
        this.mobileHeaderMenu.click().then(() => {
            waits.waitForVisibilityOf(el).then(() => {
                el.click();
            });
        });
    }

    private menuItem(menuItemName: string): string {
        return `#mobile-menu--${menuItemName}`;
    }
}