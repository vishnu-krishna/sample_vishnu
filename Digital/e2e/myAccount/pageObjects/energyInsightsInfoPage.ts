import { browser, by, element, $, $$ , promise } from 'protractor';
import * as protractor from 'protractor';

export class EnergyInsightsInfoPage {
    public mainHeading = $(`.maui-heading__main`);
    public container = $(`energy-insights-info__container`);
    public closeButton = $(`energy-insights-info__close-button`);
}
