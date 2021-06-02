import { Observable } from 'rxjs/Observable';
import { UserInfo }   from './userInfo';

export abstract class IUserInfoService {
    public abstract getUserInfo(): Observable<UserInfo>;
}
