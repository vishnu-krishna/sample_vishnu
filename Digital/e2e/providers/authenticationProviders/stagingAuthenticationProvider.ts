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
import { ProductionAuthenticationProvider } from './productionAuthenticationProvider';
import { OverviewPage } from '../../../e2e/myAccount/pageObjects/overviewPage';

export class StagingAuthenticationProvider implements AuthInterface {

    public authenticate(user: UsersEntity): promise.Promise<any> {
        return new ProductionAuthenticationProvider().authenticate(user)
            .then(() => {
                waits.waitForVisibilityOf($('.address-header'));
                console.log('Navigating to staging environment...');
                navigateToUrl('https://www.agl.com.au/svc/app/Route?app=MyAccount&option=prod-staging');
            });
    }
}
