import { browser, by, element, $, $$ } from 'protractor';
import { Context } from '../../context';

export const usage = {
        usageContainer: $('.usage .account-selector'),
        // Smart Elec Objects
        usageMenuButton: $('#agl-desktop-header-menu-usage'),
        accountSelectorAddr: $('#account-selector-header-title'),
        accountSelector: $('#account-selector-header'),
        selectorDrpdwnAddr: $('.account-selector-items-item-fullAddress-primary'),
        elecFuelSelector: $('#fuel-selector_container-fuels-fuel-elec'),
        elecGraphText: $('.usage-history.tempdls-card.mat-card .tempdls-card-header'),
        usageGraph: $('#usage-graph-basicmonthly'),
        graphWidget: $('.graph-selected-widget'),
        viewDailyUsageButton: $('.view-daily-usage-button .dailyusage[mat-raised-button]'),
        viewDailyButtonText: $('.view-daily-usage-button .dailyusage[mat-raised-button]'),
        mainInsightWidget: $('.smart-graph-insight'),
        energyTispWidget: $('.energy-saving-tips.tempdls-card.mat-card'),
        feedbackWidget: $('.feedback.tempdls-card.mat-card'),

        // Basic Elec/Gas Objects
        gasFuelSelector: $('#fuel-selector_container-fuels-fuel-gas'),
        gasGraphText: $('.usage-history.tempdls-card.mat-card .tempdls-card-header'),
        meterInfoWidget: $('.self-service.tempdls-card.mat-card'),
        meterInfoHeaderText: $('.tempdls-card-header.meter-information__title'),
        enterMeterReadButton: $('.meter-read-button__container .mat-raised-button.mat-accent'),
        meterReadButtonText: $('.meter-read-button__container .mat-raised-button.mat-accent .mat-button-wrapper'),
        howToReadMeterLink: $('.how-to-read-your-meter .more-info'),
};
