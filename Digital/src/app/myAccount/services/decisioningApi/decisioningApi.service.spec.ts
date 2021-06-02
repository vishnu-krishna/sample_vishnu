import { Observable } from 'rxjs/Observable';
import { DecisioningEventChannel } from '../decisioningApi/model/decisioningEventChannel';
import { DecisioningEventType } from '../decisioningApi/model/decisioningEventType';
import { GetNextOfferRequest } from '../decisioningApi/model/getNextOfferRequest';
import { SendOfferResponseRequest } from '../decisioningApi/model/sendOfferResponseRequest';
import { UserAuthenticatedEventRequest, UserAuthenticatedEventRequestData } from '../decisioningApi/model/userAuthenticatedEventRequest';
import { BusinessPartnerNumber } from './../businessPartnerNumber/model/businessPartnerNumber';
import { IBusinessPartnerNumberService } from './../contract/ibusinessPartnerNumber.service';
import { DecisioningApiService } from './decisioningApi.service';

describe('Decisioning API service', () => {

let decisioiningApiRepositorySpy;

beforeEach(() => {

    decisioiningApiRepositorySpy = {
        get: jasmine.createSpy('get').and.returnValue(Observable.of([])),
        post: jasmine.createSpy('post').and.returnValue(Observable.of([]))
    };

 });

it('should retrieve BpId via service before calling GetNextOffer', (done: DoneFn) => {

            // ARRANGE
            let businessPartnerNumberStub: BusinessPartnerNumber = {
                bpId : '123',
                hashed : '123hashed'
            };

            let businessPartnerNumberServiceSpy: IBusinessPartnerNumberService = {
                getBusinessPartnerNumber: jasmine.createSpy('getBusinessPartnerNumber').and.returnValue(Observable.from([businessPartnerNumberStub]))
            };

            let service = new DecisioningApiService(decisioiningApiRepositorySpy, businessPartnerNumberServiceSpy);

            // ACT
            let getNextOfferRequest: GetNextOfferRequest = {
                bpId : null,
                channel: 'MyAccount',
                componentId: 'MyAccount_Sidebar_Right',
                container: 'NextBestAction',
                pageId: 'MyAccount_Overview_Page'
            };

            // ASSERT
            service.getNextOffer(getNextOfferRequest).subscribe((result) => {
                expect(businessPartnerNumberServiceSpy.getBusinessPartnerNumber).toHaveBeenCalled();
                done();
            });

 });

it('should create GetNextOffer request with correct data', (done: DoneFn) => {

            // ARRANGE
            let businessPartnerNumberStub = {
                bpId: '123',
                hashed: '123hashed'
            };

            let businessPartnerNumberService: IBusinessPartnerNumberService = {
                getBusinessPartnerNumber: () => {
                    return Observable.from([businessPartnerNumberStub]);
                }
            };

            let service = new DecisioningApiService(decisioiningApiRepositorySpy, businessPartnerNumberService);

            // ACT
            let getNextOfferRequest: GetNextOfferRequest = {
                bpId : null,
                channel: 'MyAccount',
                componentId: 'MyAccount_Sidebar_Right',
                container: 'NextBestAction',
                pageId: 'MyAccount_Overview_Page'
            };

             // ASSERT
            service.getNextOffer(getNextOfferRequest).subscribe((result) => {
                 expect(decisioiningApiRepositorySpy.get).toHaveBeenCalledWith('/v1/offers/customer/123/channel/MyAccount/container/NextBestAction/component/MyAccount_Sidebar_Right/pageId/MyAccount_Overview_Page', false, true, null);
                 done();
            });
 });

it('should not POST Offer response if BpId is null', () => {

            // ARRANGE
            let service = new DecisioningApiService(decisioiningApiRepositorySpy, null);

            // ACT
            let sendOfferResponseRequest: SendOfferResponseRequest = {
                    bpId: null,
                    interactionId: null,
                    businessGroup: null,
                    businessIssue: null,
                    propositionId: null,
                    businessName: null,
                    pageId: null,
                    componentId: null,
                    asset: null,
                    channel: null,
                    responseType: null,
                    direction: null
            };

             // ASSERT
            service.sendOfferResponse(sendOfferResponseRequest);
            expect(decisioiningApiRepositorySpy.post).not.toHaveBeenCalled();
 });

it('should POST Offer response if BpId is available', () => {

            // ARRANGE
            let service = new DecisioningApiService(decisioiningApiRepositorySpy, null);

            // ACT
            let sendOfferResponseRequest: SendOfferResponseRequest = {
                    bpId: 'bptest123',
                    interactionId: null,
                    businessGroup: null,
                    businessIssue: null,
                    propositionId: null,
                    businessName: null,
                    pageId: null,
                    componentId: null,
                    asset: null,
                    channel: null,
                    responseType: null,
                    direction: null
            };

             // ASSERT
            service.sendOfferResponse(sendOfferResponseRequest);
            expect(decisioiningApiRepositorySpy.post).toHaveBeenCalled();
 });
it('should POST user authenticated event', () => {

        // ARRANGE
        let service = new DecisioningApiService(decisioiningApiRepositorySpy, null);
        let userAuthenticatedEventData: UserAuthenticatedEventRequestData = {
            bpId: 'bptest123',
            hBpId: '1f4f3f639cc4ba1ce403d6a94794413579a103e57209a394adc74ae9232e557f4bfae0f6735ea885c5018d15dd7ea3215a27b6632868050c21e7e8e7581270eb',
            gAId: 'UA-000000-2',
            mId: '12345',
        };

        let userAuthenticatedEventRequest: UserAuthenticatedEventRequest = {
            timeStamp: new Date().toJSON(),
            channel: DecisioningEventChannel.MyAccount.toString(),
            type: DecisioningEventType.Authenticated.toString(),
            data: userAuthenticatedEventData
        };

        // ASSERT
        service.sendUserAuthenticatedEvent(userAuthenticatedEventRequest);
        expect(decisioiningApiRepositorySpy.post).toHaveBeenCalled();
     });
});
