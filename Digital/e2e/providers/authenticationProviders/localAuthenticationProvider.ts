import { IdentityEmulator } from '../../../common/identityEmulator';
import { browser } from 'protractor';
import * as protractor from 'protractor';
import { AuthInterface } from './authInterface';
import { UsersEntity } from '../../models/environments';
import * as waits from '../../utilities/waits';
import { goToPage } from '../../utilities/navigator';

export class LocalAuthenticationProvider implements AuthInterface {

    public authenticate(user: UsersEntity): protractor.promise.Promise<any> {
        const guid = user.guid;

        let token = IdentityEmulator.generateTokenForCustomer(user.guid, user.email);
        console.info(`Logging in with GUID: ${user.guid} and email: ${user.email}`);
        return goToPage(`/?bearer=${token}`);
    }

}
