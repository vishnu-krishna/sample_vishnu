import { $, $$ } from 'protractor';
import * as waits from '../../../utilities/waits';

export class ChooseAnAddress {

    private chooseAnAddressContainer = $('.concession-accounts');
    private chooseAddress = $$('.concession-accounts__account');

    public waitForChooseAnAddressPageToLoad() {
        waits.waitForVisibilityOf(this.chooseAnAddressContainer);
    }

    public chooseFirstAddress() {
        this.chooseAddress.first().click();
    }
}