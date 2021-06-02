import { browser, by, element, $, $$ } from 'protractor';
import { ProtractorExtensions } from '../../../src/app/shared/e2e/protractor.extensions';
import { UsersEntity, AccountsEntity, FuelEntity } from '../../models/environments';
import { Context } from '../../context';
import { settings } from '../pageObjects/settings';
import { User } from '../../enums/enums';
import * as waits from '../../utilities/waits';

let e2e = new ProtractorExtensions();

describe('smoke test - bill smoothing', () => {

    let user: UsersEntity;
    let context: Context;

    beforeAll(() => {
        context = new Context(browser.params.environment);
    });

    afterAll(() => {
        context.logout();
    });

    describe('Logging in with default user', () => {

        beforeAll(() => {
            user = context.getUser(User.Default);
            context.authenticateAsUser(user);
        });

        describe('in a desktop viewport', () => {
            beforeAll(() => {
                context.setWindowSize(e2e.screenSizes.desktop);
            });

            describe('should navigate to the manage account page', () => {
                beforeAll(() => {
                    waits.waitForElement(settings.manageAccountHeaderLink);
                    settings.manageAccountHeaderLink.click();
                    waits.waitForElement(settings.settingsContainer);
                });

                it('should click bill smoothing link on Manage Account', () => {
                    waits.waitForVisibilityOf(element(settings.billsmoothing));
                    expect(element(settings.billsmoothing).isDisplayed()).toBeTruthy();
                    element(settings.billsmoothing).click();
                    waits.waitForElement(settings.billsmoothingpage.billSmoothingContainer);
                });

                it('Verify bill smoothing header text', () => {
                    expect(settings.billsmoothingpage.billSmoothingHeader.isPresent()).toBeTruthy();
                    expect(settings.billsmoothingpage.billSmoothingHeader.getText()).toBe('Bill Smoothing');
                });

                it('Verify the introduction text', () => {
                    expect(settings.billsmoothingpage.introductionText.isDisplayed()).toBeTruthy();
                });

                it('Verify the link in the introduction text', () => {
                    expect(settings.billsmoothingpage.linkInIntroduction.isDisplayed()).toBeTruthy();
                });
                it('Verify the bill smoothing page by clicking on link', () => {
                    (settings.billsmoothingpage.linkInIntroduction).click();
                    expect(settings.billsmoothingpage.billSmoothingLinkTitle.isDisplayed()).toBeTruthy();
                });
                it('Verify the link title on bill smoothing page', () => {
                    let ele = settings.billsmoothingpage.billSmoothingLinkTitle;
                    expect(ele.getText()).toBe('Bill Smoothing is simple');
                    settings.modalCloseButton.click();
                    waits.waitForModalToDisappear(element(by.css('.dialog-container')));
                });
                // it('Verify the text inside the graph on bill smoothing page', () => {
                //     let ghbs = settings.billsmoothingpage.graphHeader;
                //     expect(settings.billsmoothingpage.graphBox.isDisplayed()).toBeTruthy();
                //     expect(ghbs.isDisplayed()).toBeTruthy();
                //     expect(ghbs.getText()).toBe('How your energy costs could look');
                // });
                // it('Verify the Forecast text inside graph on bill smoothing page', () => {
                //     let ghforecast = settings.billsmoothingpage.graphHeaderForecast;
                //     expect(ghforecast.isPresent()).toBeTruthy();
                //     expect(ghforecast.getText()).toBe('Forecast');
                // });
                // it('Verify the graph for amount on bill smoothing page', () => {
                //     let ghamount = settings.billsmoothingpage.graphHeaderAmount;
                //     expect(ghamount.isDisplayed()).toBeTruthy();
                //     expect(ghamount.getText()).toBe('Bill Smoothing amount');
                // });
            });
        });
    });
});
