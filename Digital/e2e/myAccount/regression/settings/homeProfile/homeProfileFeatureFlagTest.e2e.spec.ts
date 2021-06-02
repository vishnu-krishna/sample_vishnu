import { browser, by, element, $, $$ } from 'protractor';
import { ProtractorExtensions } from '../../../../../src/app/shared/e2e/protractor.extensions';
import { Context } from '../../../../context';
import { UsersEntity, AccountsEntity, FuelEntity } from '../../../../models/environments';
import { User } from '../../../../enums/enums';
import { HomeProfile } from '../../../pageObjects/homeProfile';
import { settings } from '../../../pageObjects/settings';
import * as waits from '../../../../utilities/waits';
import { FeatureFlagTypes } from '../../../../../src/app/myAccount/services/featureFlag.constants';

let e2e = new ProtractorExtensions();

describe('validating `Home profile` Link not to be available when Feature flag turned OFF', () => {

    let context: Context;
    let homeProfile: HomeProfile;

    beforeAll(() => {
        context = new Context(browser.params.environment);
    });

    afterAll(() => {
        context.logout();
    });

    describe('with a User having a "Single Address"', () => {

        beforeAll(() => {
            const user = context.getUser(User.HOME_PROFILE);
            context.setWindowSize(e2e.screenSizes.desktop);
            context.authenticateAsUser(user);
            homeProfile = new HomeProfile(context);
        });

        describe('in a desktop viewport with Home Profile Feature Flag Disabled', () => {
            describe('user navigates to Manage Account', () => {
                beforeAll(() => {
                    homeProfile.setFeatureFlag(false).then(() => {
                        homeProfile.navigateToManageAccount();
                    });
                });

                describe('Home Profile Link is not visible to user under Manage Account', () => {
                    it('should NOT show the "Home Profile" Link under MANAGE ACCOUNT tab', () => {
                        expect(homeProfile.homeProfileLink.isPresent()).toBeFalsy();
                    });
                });
            });
        });
    });
});
