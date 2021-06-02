import { BillDeliveryContactDetailModel } from './model/billDeliveryContactDetailModel';
import { ContactDetailModel } from './../../../shared/service/api.service';

import { BillDeliveryMethod } from './model/billDeliveryMethod';

import { Injectable }       from '@angular/core';
import { Observable }       from 'rxjs/Observable';
import { ReplaySubject }    from 'rxjs/ReplaySubject';
import * as api             from '../settings/model';
import { ApiResult }        from './apiResult';
import * as service         from './model';
import { ISettingsService } from './settings.service.interface';

import { ISettingsApi } from '../settings/settingsApi.service.interface';
import { BillDelivery } from './model/billDelivery';
import { BillDeliveryMethodType } from './model/billDeliveryMethodType';
import { IApiService } from '../../../shared/service/contract/iapi.service';

@Injectable()
export class SettingsService extends ISettingsService {

    private settingSubject: ReplaySubject<service.SettingsAggregateModel>;

    constructor(
        private settingsApi: ISettingsApi,
        private apiService: IApiService
    ) {
        super();
    }

    /**
     * Obtain settings from the settings api.
     * Makes multiple API calls and aggregates the results
     * into a single model.
     *
     * @returns {Observable<service.SettingsAggregateModel>}
     *
     * @memberOf SettingsService
     */
    public getSettings(): Observable<service.SettingsAggregateModel> {
        if (!this.settingSubject) {
            this.settingSubject = new ReplaySubject<service.SettingsAggregateModel>(1);
            this.publishData();
        }
        return this.settingSubject.first();
    }

    /**
     * Updates the preferred Bill Delivery Method for a given contract account number
     *
     * @param {string} contractAccountNumber
     * @param {service.BillDeliveryMethodType} deliveryMethod
     * @returns {Observable<any>}
     *
     * @memberOf SettingsService
     */
    public updateBillDeliveryMethodPreference(contractAccountNumber: string, deliveryMethod: service.BillDeliveryMethodType): Observable<any> {
        return new Observable((observer) => {
            let apiDeliveryMethodPreference = api.BillDeliveryMethodType[service.BillDeliveryMethodType[deliveryMethod]];
            this.settingsApi.post(`/v2/billdeliverypreferences/${apiDeliveryMethodPreference}/contractAccounts`, { contractAccountNumber: +contractAccountNumber }).subscribe(
                () => {
                    this.refreshSettings();
                    observer.next({}); // Must next something
                    observer.complete();
                },
                (err) => {
                    observer.error(err);
                }
            );
        });
    }

    /**
     * Obtain the bill delivery method preferences along with the contact details information
     *
     * @returns {Observable<BillDeliveryContactDetailModel[]>}
     * @memberOf SettingsService
     */
    public getBillDeliveryMethodPreferences(): Observable<BillDeliveryContactDetailModel[]> {
        return Observable.forkJoin(
                this.settingsApi.get<BillDelivery[]>('/v2/billdeliverypreferences'),
                this.apiService.getContactDetail()
            ).map(
                (([billDeliveryPreferenceList, contactDetails]) => {
                    let billDeliveryContactDetails: BillDeliveryContactDetailModel[] = [];

                    billDeliveryPreferenceList.forEach((billDeliveryPreference: BillDelivery) => {
                        billDeliveryPreference.contractAccountNumbers.forEach((accountNumber: number) => {
                            let billDeliveryMethod = new BillDeliveryContactDetailModel();
                            billDeliveryMethod.accountNumber = accountNumber.toString();
                            billDeliveryMethod.contactDetails = contactDetails;
                            billDeliveryMethod.billDeliveryPreference = billDeliveryPreference.billDeliveryMode;

                            billDeliveryContactDetails.push(billDeliveryMethod);
                        });
                    });

                    return billDeliveryContactDetails;
                })
            );
    }

    private publishData(): void {
        Observable.forkJoin(
            this.getBillDeliveryPreferences()
        ).subscribe(
            (observables) => {
                let getBillDeliveryResult: ApiResult<api.BillDelivery[]> = observables[0];
                // let otherSettings: ApiResult<Array<api.OtherSettings>> = observables[1];
                let aggregate = this.buildAggregate(getBillDeliveryResult);
                this.settingSubject.next(aggregate);
            }
        );
    }

    private getBillDeliveryPreferences(): Observable<ApiResult<api.BillDelivery[]>> {
        // This is the Observable version of a try/catch. We are doing this so that
        // we gracefully capture any API error, package it and emit it upwards
        // If we do not "complete" the observerble below then forkJoin in publishData will not unblock
        return new Observable((observer) => {
            this.settingsApi.get('/v2/billdeliverypreferences').subscribe(
                (data: api.BillDelivery[]) => {
                    observer.next(new ApiResult<api.BillDelivery[]>(data));
                    observer.complete(); // Complete is required to make the forkJoin in publishData unblock
                },
                (err) => {
                    console.log('getBillDeliveryPreferences received an error calling the settings api', err);
                    let error = new api.ApiError(err.status, err.statusText);
                    observer.next(new ApiResult<api.BillDelivery[]>(new Array<api.BillDelivery>(), error));
                    observer.complete();  // Complete is required to make the forkJoin in publishData unblock
                }
            );
        });
    }

    private buildAggregate(billDeliveryArrayWrapper: ApiResult<api.BillDelivery[]>): service.SettingsAggregateModel {

        let aggregate = new service.SettingsAggregateModel();

        if (billDeliveryArrayWrapper.error) {
            aggregate.billDeliveryApiLoadError = billDeliveryArrayWrapper.error;
        } else {
            billDeliveryArrayWrapper.data.forEach((apiBillDelivery) => {
                apiBillDelivery.contractAccountNumbers.forEach((caNumber) => {
                    let billDeliveryMethodType: service.BillDeliveryMethodType = service.BillDeliveryMethodType[api.BillDeliveryMethodType[apiBillDelivery.billDeliveryMode]];
                    aggregate.billDeliveryMethodList.push(new service.BillDeliveryMethod('' + caNumber, billDeliveryMethodType));
                });
            });
        }

        return aggregate;
    }

    private refreshSettings() {
        if (!this.settingSubject) {
            this.settingSubject = new ReplaySubject<service.SettingsAggregateModel>();
        }
        this.publishData();
    }
}
