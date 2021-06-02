import { $ } from "protractor";
import * as waits from '../../../utilities/waits';
import { ConcessionBasePage } from "./concessionBasePage";

export class ConfirmYourDetailsPage extends ConcessionBasePage {

    private confirmDetailsContainer = $('.confirm-detail');

    public waitForConfirmYourDetailsPageToLoad() {
        waits.waitForVisibilityOf(this.confirmDetailsContainer);
    }
}