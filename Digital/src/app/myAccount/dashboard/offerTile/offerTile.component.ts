import { Component, Input, OnInit } from '@angular/core';
import { IDecisioningApiService }     from '../../../myAccount/services/contract/idecisioningApi.service';
import { GetNextOfferRequest, Offer, OfferChannels, OfferComponentIds, OfferContainers, OfferDirections, OfferInfo } from '../../services/decisioningApi/model/getNextOfferRequest';
import { SendOfferResponseRequest } from '../../services/decisioningApi/model/sendOfferResponseRequest';

@Component({
    selector: 'agl-offer-tile',
    templateUrl: './offerTile.component.html',
    styleUrls: ['./offerTile.component.scss']
})

export class OfferTileComponent implements OnInit {

    public offer: Offer;
    public bpId: string;
    public channel: string;
    @Input() public context: string;
    public interactionId: string;
    private _content: OfferInfo;

    constructor(private _apiService: IDecisioningApiService) { }

    public ngOnInit() {
        let offerRequest = new GetNextOfferRequest('',
            OfferChannels.MyAccount.toString(),
            OfferComponentIds.MyAccount_Sidebar_Right.toString(),
            OfferContainers.NextBestAction.toString(),
            this.context);
        this._apiService.getNextOffer(offerRequest)
            .subscribe((content) => {
                if (content) {
                    this._content = content;
                    this.offer = this._content.offers[0];
                    this.interactionId = this._content.interactionId;
                    this.bpId = this._content.bpId;
                }
            }, (err) => console.error(`OfferTileComponent - Error: ${ err.message }`),
            () => {
                let request = this.createSendOfferResponseRequest('Impression');
                this._apiService.sendOfferResponse(request);
            });
    }

    public offerClicked(event) {
        let request = this.createSendOfferResponseRequest('Click');
        this._apiService.sendOfferResponse(request);
    }

    private createSendOfferResponseRequest(responseType: string): SendOfferResponseRequest {
        let request = new SendOfferResponseRequest(this.bpId, this.interactionId,
            this.offer.businessGroup, this.offer.businessIssue, this.offer.propositionId,
            this.offer.businessName, this.context, OfferComponentIds.MyAccount_Sidebar_Right.toString(),
            this.offer.assetUrl, OfferChannels.MyAccount.toString(), responseType, OfferDirections.Inbound.toString());

        return request;
    }
}
