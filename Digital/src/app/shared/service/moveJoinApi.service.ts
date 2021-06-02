import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { MoveGetResponseModel } from './../model/oneMinMove/moveGetResponse.model';
import { IMoveJoinRepository } from './../repository/contract/imovejoin.repository';
import { IMoveJoinApiService } from './contract/imoveJoinApi.service';

@Injectable()
export class MoveJoinApiService implements IMoveJoinApiService {
    protected _errors: Subject<any> = new Subject<any>();
    protected _authorizationErrors: Subject<any> = new Subject<any>();
    protected _expiredLink: Subject<any> = new Subject<any>();
    constructor(
        private _repository: IMoveJoinRepository
    ) {
        this._repository.errors.subscribe((err) => {
            this._errors.next(err);
        });
        this._repository.authorizationError.subscribe((err) => {
            this._authorizationErrors.next(err);
        });
    }
    public get errors(): Subject<any> {
        return this._errors;
    }
    public get checkAuthorization(): Subject<any> {
        return this._authorizationErrors;
    }
    public get checkExpiredOMM(): Subject<any> {
        return this._expiredLink;
    }
    public GetOMMTracker(): Observable<MoveGetResponseModel> {
        let endpoint = `/moves?moveType=OneMinuteMove`;
        return this._repository.get<MoveGetResponseModel[]>(endpoint).map((result) => {
            let latestMoveResult = new MoveGetResponseModel();
            if (result !== null && result.length > 0) {
                latestMoveResult = result.sort((a, b) => {
                    let date1 = new Date(a.oneMinuteMove.expiryDate);
                    let date2 = new Date(b.oneMinuteMove.expiryDate);
                    return date1 > date2 ? -1 : date1 < date2 ? 1 : 0;
                })[0];
                return new Date(latestMoveResult.oneMinuteMove.expiryDate) > new Date() ? latestMoveResult : this._expiredLink.next(MoveGetResponseModel);
            } else {
                return this._expiredLink.next(MoveGetResponseModel);
            }
        }).catch((err) => {
            return Observable.of(null);
        });
    }

}
