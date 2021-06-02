import { browser, by, element, $, $$ } from 'protractor';
import * as waits from '../../../utilities/waits';
import { OverviewPage } from '../overviewPage';
import * as Navigator from '../../../utilities/navigator';
import * as protractor from 'protractor';

export class AglLandingPage {

    constructor(private overview: OverviewPage) {
        browser.ignoreSynchronization = true;
    }
}
