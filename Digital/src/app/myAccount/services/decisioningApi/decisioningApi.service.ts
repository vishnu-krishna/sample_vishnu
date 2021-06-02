import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import * as ApiModel from '../../../shared/model/api.model';
import { DecisioningApiRepository } from '../../../shared/repository/decisioningapi.repository';
import { IBusinessPartnerNumberService } from '../contract/ibusinessPartnerNumber.service';
import { IDecisioningApiService } from '../contract/idecisioningApi.service';
import { GetNextOfferRequest, OfferInfo } from '../decisioningApi/model/getNextOfferRequest';
import { SendOfferResponseRequest } from '../decisioningApi/model/sendOfferResponseRequest';
import { UserAuthenticatedEventRequest } from '../decisioningApi/model/userAuthenticatedEventRequest';

@Injectable()
export class DecisioningApiService implements IDecisioningApiService {
    private basePath: string;
    private businessPartnerNumberInitialised: boolean = false;
    constructor(private _repository: DecisioningApiRepository, private _businessPartnerNumberService: IBusinessPartnerNumberService) { }
    /*
    * Invoke the API call to get next offer
    */
    public getNextOffer(request: GetNextOfferRequest): Observable<OfferInfo> {
        return new Observable((observer) => {
            this._businessPartnerNumberService.getBusinessPartnerNumber().subscribe((content) => {
                // set request BpId here
                request.bpId = content.bpId;
                this.getNextOfferInternal(request).subscribe((offers) => {
                    let offerInfo = <OfferInfo> offers;
                    observer.next(offerInfo);
                    observer.complete();
                });
            });
        });
    }
    public sendOfferResponse(request: SendOfferResponseRequest): void {
        if (!request.bpId) {
            return;
        }
        let endpoint = '/v1/offers/nbaResponse';
        let options = new ApiModel.ApiV2RequestOptions(endpoint);
        options.body = request;
        options.isJson = true;
        this._repository.post(options).subscribe(null, (err) => { console.error(err); });
    }
    public sendUserAuthenticatedEvent(request: UserAuthenticatedEventRequest): void {
        let endpoint = '/v1/events/userAuthenticated';
        let options = new ApiModel.ApiV2RequestOptions(endpoint);
        options.body = request;
        options.isJson = true;
        this._repository.post(options).subscribe(null, (err) => { console.error(err); });
    }
    private getNextOfferInternal(request: GetNextOfferRequest): Observable<any> {
        return this._repository.get(`/v1/offers/customer/${request.bpId}/channel/${request.channel}/container/${request.container}/component/${request.componentId}/pageId/${request.pageId}`, false, true, null);
    }
}
