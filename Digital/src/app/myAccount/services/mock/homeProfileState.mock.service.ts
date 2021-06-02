import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HomeProfileViewModel } from '../../pages/settings/homeProfile/homeProfileViewModel';
import { IHomeProfileStateService, HomeProfileStatus } from '../../pages/settings/homeProfile/homeProfileState.service';

@Injectable()
export class HomeProfileStateMockService implements IHomeProfileStateService {

    public homeProfile: HomeProfileViewModel = new HomeProfileViewModel();

    public initializeHomeProfile(contractNumber: string, isMultiAddresses: boolean, hasHomeProfile: boolean): Observable<boolean> {
        throw new Error('Method not implemented.');
    }

    public saveProfile(): Observable<boolean> {
        throw new Error('Method not implemented.');
    }

    public contractNumber: string = '';
    public isMultiAddresses: boolean = false;
}
