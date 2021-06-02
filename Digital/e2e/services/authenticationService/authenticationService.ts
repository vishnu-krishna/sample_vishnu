import { Auth0KeysModel } from './../impersonationService/auth0KeysModel';
import { browser, promise } from 'protractor';
import { UsersEntity } from '../../models/environments';
import { LocalAuthenticationProvider } from '../../providers/authenticationProviders/localAuthenticationProvider';
import { NonProdAuthenticationProvider } from '../../providers/authenticationProviders/nonProdAuthenticationProvider';
import { ProductionAuthenticationProvider } from '../../providers/authenticationProviders/productionAuthenticationProvider';
import { StagingAuthenticationProvider } from '../../providers/authenticationProviders/stagingAuthenticationProvider';
import { getCurrentEnvironment } from '../../utilities/environment';

export function authenticate(user: UsersEntity): promise.Promise<any> {

    const provider = {
        'local': () => new LocalAuthenticationProvider().authenticate(user),
        'monthly-uat': () => new NonProdAuthenticationProvider().authenticate(user),
        'diamond': () => new NonProdAuthenticationProvider().authenticate(user),
        'obsidian': () => new NonProdAuthenticationProvider().authenticate(user),
        'production': () => new ProductionAuthenticationProvider().authenticate(user),
        'staging': () => new StagingAuthenticationProvider().authenticate(user),
        'feature15': () => new NonProdAuthenticationProvider().authenticate(user)
    };

    return getCurrentEnvironment().then((environment) => {
        provider[environment]();
    });
}
