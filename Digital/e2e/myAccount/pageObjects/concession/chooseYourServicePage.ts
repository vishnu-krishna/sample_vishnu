import { $, $$ } from "protractor";
import * as waits from '../../../utilities/waits';
import { ConcessionBasePage } from "./concessionBasePage";

export class ChooseYourServicePage extends ConcessionBasePage {

    private chooseYourServiceContainer = $('.concession-contracts');
    private chooseYourService = $$('.concession-contracts__contract__checkbox');

    public waitForChooseYourServicePageToLoad() {
        waits.waitForVisibilityOf(this.chooseYourServiceContainer);
    }

    public chooseYourFirstService() {
        this.chooseYourService.first().click();
    }
}