import { browser, by, element, $, $$ , promise } from 'protractor';
import { Context } from '../../../context';
import { PaygPageObject } from './../components/paygPageObject';
import * as waits from '../../../utilities/waits';

export class EnergyInsightsSubscriptionPage {
    public energyInsightsSubscriptionHeader = $('.energy-insights__header');
    public energyInsightsSubscriptionContractAddress = $('.contract__address');
    public energyInsightsSubscriptionToggleList = $$('.subscription__toggle');
    public energyInsightsSubscriptionHomeProfileButton = $('.energy-insights-home-profile__button--primary');
    public energyInsightsSubscriptionCloseButton = $('.energy-insights-home-profile__button--secondary');
    public energyInsightsServiceHeadingList = $$('.choose-service agl-maui-heading');
    public energyInsightsServiceSubscribedFuelChipList = $$('.choose-service__subscribed agl-maui-fuel-chip');
    public energyInsightsServiceEligibileFuelChipList = $$('.choose-service__eligible agl-maui-fuel-chip');
    public energyInsightsServiceIneligibileFuelChipList = $$('.choose-service__ineligible agl-maui-fuel-chip');
}
