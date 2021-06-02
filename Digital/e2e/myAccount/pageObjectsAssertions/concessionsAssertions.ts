import { BasePageObjectAssertions } from "./basePageObjectAssertions";
import {settings} from "../pageObjects/settings";
import * as waits from '../../utilities/waits';

export class ConcessionsAssertions extends BasePageObjectAssertions{

    public shouldSeeConcessionsAddLink() {
        waits.waitForVisibilityOf(settings.concessionAddLink);
        this.assertIsDisplayed(settings.concessionAddLink);
    }
}