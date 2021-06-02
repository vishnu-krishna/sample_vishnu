import { environmentUrls } from './../../config/environmentUrls';
import { IdentityEmulator } from '../../../common/identityEmulator';
import { browser, element, by, $, promise } from 'protractor';
import { AuthInterface } from './authInterface';
import { UsersEntity } from '../../models/environments';
import { navigateToUrl, navigateToOnClick, goToPage } from '../../utilities/navigator';
import * as Login from '../../myAccount/pageObjects/common/loginPage';
import { navigationLinks } from '../../myAccount/pageObjects/common/navigationLinks';
import * as waits from '../../utilities/waits';
import { recaptchaBypass, bypassRecaptcha } from '../../services/recaptchsService/recaptchaService';

export class ProductionAuthenticationProvider implements AuthInterface {

    public authenticate(user: UsersEntity): promise.Promise<any> {
        goToPage('/');
        navigateToOnClick(navigationLinks.topNavWhite.myAccount);

        return waits.waitForVisibilityOf(Login.elements.emailInputField).then(() => {
            return bypassRecaptcha().then(() => {
                console.info(`Logging in with '${user.email}'`);

                Login.enterEmailAddress(user.email);

                Login.clickNextButton();

                Login.enterPassword(user.password);

                return Login.clickLoginButton().then(() => {
                    console.info('Submitting login form ...');
                });
            });
        });
    }
}
