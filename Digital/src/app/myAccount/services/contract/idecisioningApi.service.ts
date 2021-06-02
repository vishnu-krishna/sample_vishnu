import { Observable } from 'rxjs/Observable';
import { GetNextOfferRequest, OfferInfo } from '../decisioningApi/model/getNextOfferRequest';
import { SendOfferResponseRequest } from '../decisioningApi/model/sendOfferResponseRequest';
import { UserAuthenticatedEventRequest } from '../decisioningApi/model/userAuthenticatedEventRequest';

export abstract class IDecisioningApiService {
    public abstract getNextOffer(request: GetNextOfferRequest): Observable<OfferInfo>;
    public abstract sendOfferResponse(request: SendOfferResponseRequest): void;
    public abstract sendUserAuthenticatedEvent(request: UserAuthenticatedEventRequest): void;
}
