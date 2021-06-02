import { Injectable }       from '@angular/core';
import { Http }             from '@angular/http';
import { Observable }       from 'rxjs/Observable';
import { UserInfo }         from './userInfo';
import { IUserInfoService } from './userInfo.service.interface';

@Injectable()
export class UserInfoServiceMock extends IUserInfoService {

    private model: Observable<UserInfo>;

    constructor(private http: Http) { super(); }

    public getUserInfo(): Observable<UserInfo> {
        if (!this.model) {
            this.model = this.getData();
        }
        return this.model;
    }

    private getData(): Observable<UserInfo> {
        let localStorageKey = 'selfService.mock.userInfo';
        let localStorageValue = '';

        // ATTEMPT TO GET MOCK DATA FROM A FILE

        localStorageValue = localStorage.getItem(`${localStorageKey}:file`);

        if (localStorageValue) {
            let url = `/_mockData/userInfo/${localStorageValue}.json`;
            return this.http.get(url)
                .map((response) => response.json());
        }

        // ATTEMPT TO GET MOCK DATA FROM INLINE-DATA

        localStorageValue = localStorage.getItem(`${localStorageKey}:data`);
        console.log(localStorageValue);
        if (localStorageValue) {
            let info = <UserInfo> JSON.parse(localStorageValue);
            return Observable.of<UserInfo>(info);
        }

        return Observable.of<UserInfo>(new UserInfo());
    }
}
