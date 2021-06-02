import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../../shared/service/api.service';
import { ContentService } from '../../shared/service/content.service';
import { IProductApiService } from '../../shared/service/contract/iproductApi.service';
import { Now } from '../../shared/service/now.service';

describe('PAYG Service', () => {

    beforeEach(() => {
        let productApiServiceSpy = {
            GetProductAttribute(): Observable<any> {
                 return Observable.of(null);
            },
            GetBonusBand() {
                return Observable.of([]);
            }
        };
        let contentServiceStub = {
            load: () => {
                throw new Error('contentServiceStub.load has not been mocked properly.');
            },
            getContent: () => {
                throw new Error('contentServiceStub.getContent has not been mocked properly.');
            }
        };

        let apiServiceStub = {
            getAccounts(): Observable<any> {
                return Observable.from(
                    []
                );
            },
            getPrePaymentBalance() {
                return Observable.of(null);
            }
        };

        TestBed.configureTestingModule({
            providers: [
                { provide: IProductApiService, useValue: productApiServiceSpy },
                { provide: ContentService, useValue: contentServiceStub },
                { provide: ApiService, useValue: apiServiceStub },
                Now
            ]
        });
        let content = {
            selfService: {
                payg: {
                    isActive: true
                }
            }
        };
        spyOn(contentServiceStub, 'load').and.returnValue(Observable.of(content));
        });
});
