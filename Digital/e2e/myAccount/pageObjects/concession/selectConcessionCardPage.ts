import { $ } from "protractor";
import * as waits from '../../../utilities/waits';
import { ConcessionBasePage } from "./concessionBasePage";

export class SelectConcessionCardPage extends ConcessionBasePage {

    private selectCardContainer = $('.select-card');

    public waitForSelectConcessionCardPageToLoad() {
        waits.waitForVisibilityOf(this.selectCardContainer);
    }

    public selectConcessionCard(cardTypeInDom: string) {
        // TODO
        // this method will not work if the card type we are selecting is not visible in the view port
        // need to add the code to scroll to the card type and select it
        // currently it's not needed so have not implemented it
        let el = $(this.cardType(cardTypeInDom));
        el.click();
    }

    private cardType(cardType: string) {
        return `input[name="cardGroup"][value="${cardType}"]`;
    }
}