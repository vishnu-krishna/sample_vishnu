import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject }  from 'rxjs/ReplaySubject';
import { AddressSearchModel } from '../model/oneMinMove/addressSearch.model';
import { RateFactGroupModel } from '../model/oneMinMove/rateFactGroup.model';
import { IRateFactGroupService } from './contract/iratefactgroup.service';

@Injectable()
export class RateFactGroupService implements IRateFactGroupService {

    public rateFactGroup: RateFactGroupModel;
    public content: Observable<any>;

    /**
     * Array of RFGs will introduce error message.
     */
    public errorRateFactGroups = {
        electricity: [
            'ACTEWAGL',
            'CANBERRA',
            'CAPITAL',
            'ERGON',
            'QUEANBEYAN',
            'SANTANA',
            'SHOALHAVEN',
            'ACTEWP'
        ],
        gas: [
            'SANTANA',
            'NOGAS',
            'NOGOAREA',
            'CANBERRA'
        ]
    };

    protected _contentSubject: ReplaySubject<any>;

    /**
     * Creates an instance of RFGService.
     */
    constructor(
        @Inject('AppContentBranch') protected appContentBranch: string,
        private _http: Http) {
            this._contentSubject = new ReplaySubject(1);
            this.content = this._contentSubject.share();
        }
    /**
     *  Gets rate fact group model
     * @returns rateFactGroup: RateFactGroupModel
     */
    public getRateFactGroupModel(): RateFactGroupModel {
        return this.rateFactGroup;
    }

    public GetRateFactGroup(addressSearch: AddressSearchModel): Observable<RateFactGroupModel> {
        let mockStorageKey = `${this.appContentBranch}.mock.sitecore.QuickQuoteSAPData:file`;
        let testData = localStorage.getItem(mockStorageKey);
        if (testData) {
            console.warn(`Mock content is set to "${testData}". To disable, clear local storage flag "${mockStorageKey}"`);
            let url = `/_mockData/sitecore/QuickQuoteSAPData/${testData}.json`;
            this.loadContentFromUrl(url);
            return this.content;
        } else {
            return this._http.post('/svc/QuickQuoteSAPData/FindRateFactGroup/', addressSearch)
            .map((result) => {
                return this.rateFactGroup = result.json();
            });
        }
    }

    /**
     *  check if Rate Fact Group has error.
     *  @param fuel: string ='gas|electricity';
     *  @param rateFactGroup: string;
     *  @return boolean
     */
    public hasRateFactGroupError(fuel: string, rateFactGroup: string): boolean {
        let errorRateFactGroupArray = fuel.toUpperCase().trim() === 'GAS' ? this.errorRateFactGroups.gas : this.errorRateFactGroups.electricity;
        return errorRateFactGroupArray.filter((data: string) => new RegExp(rateFactGroup, 'gi').test(data)).length > 0;
    }

    protected loadContentFromUrl(url: string) {
        this._http
            .get(url)
            .map((r) => r.json())
            .subscribe((response) => {
                this._contentSubject.next(response);
                this._contentSubject.complete();
            });
    }
}
