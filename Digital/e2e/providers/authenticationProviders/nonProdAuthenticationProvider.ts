import { environmentUrls } from './../../config/environmentUrls';
import { Auth0KeysModel } from './../../services/impersonationService/auth0KeysModel';
import { IdentityEmulator } from '../../../common/identityEmulator';
import { browser, promise } from 'protractor';
import { AuthInterface } from './authInterface';
import { UsersEntity } from '../../models/environments';
import * as waits from '../../utilities/waits';
import { navigateToUrl } from '../../utilities/navigator';
import { ImpersonationService } from '../../services/impersonationService/impersonationService';
import { AzureVaultService } from '../../services/azureServices/azureKeyVaultService';
import { navigationLinks } from '../../myAccount/pageObjects/common/navigationLinks';
import { getCurrentEnvironment } from '../../utilities/environment';

export class NonProdAuthenticationProvider implements AuthInterface {

    public authenticate(user: UsersEntity): promise.Promise<any> {

        return new AzureVaultService().getKeysFromAzure().then((keys) => {
            return new ImpersonationService(keys)
                .impersonate(user.guid)
                    .then((redirectUrl) => { return navigateToUrl(redirectUrl)
                        .then(() => getCurrentEnvironment()
                                        .then((environment) =>
                                            // workaround for impersonation
                                            navigateToUrl(`${environmentUrls[environment].baseURI}/sts/account/login`)));
                })
                .catch((err) => { throw new Error(err); });
        });
    }
}
