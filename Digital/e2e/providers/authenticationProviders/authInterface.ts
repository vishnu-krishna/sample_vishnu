import * as protractor from 'protractor';
import { UsersEntity } from '../../models/environments';

export interface AuthInterface {
    authenticate(user: UsersEntity): protractor.promise.Promise<any>;
}
