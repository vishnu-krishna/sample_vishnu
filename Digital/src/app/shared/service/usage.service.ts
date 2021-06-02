import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import * as moment from 'moment';

import { ContractViewModel } from '../../myAccount/services/account.service';
import * as api from '../../shared/service/api.service';
import { UsageDataModel } from '../model/usage/usageData.model';
import { IMessageBusService } from '../service/contract/imessageBus.service';
import { UsageGranularity } from './../model/usage/usageGranularity.model';
import { IUsageService } from './contract/iusage.service';

@Injectable()
export class UsageService implements IUsageService {

    private debugMode: boolean = true;

    private usageDataBasic: ReplaySubject<UsageDataModel[]>;
    private usageDataMonthly: ReplaySubject<UsageDataModel[]>;
    private usageDataDaily: ReplaySubject<UsageDataModel[]>;
    private usageDataHourly: ReplaySubject<UsageDataModel[]>;

    private startDateBasic: moment.Moment = moment().subtract('13', 'months');
    private startDateMonthly: moment.Moment = moment().subtract('13', 'months');
    private startDateDaily: moment.Moment = moment().subtract('3', 'months');
    private startDateHourly: moment.Moment = moment().subtract('18', 'days');

    constructor(
        private _http: Http,
        private _api: api.ApiService,
        private _messageBusService: IMessageBusService
    ) {
        this.usageDataBasic = new ReplaySubject<UsageDataModel[]>(1);
        this.usageDataMonthly = new ReplaySubject<UsageDataModel[]>(1);
        this.usageDataDaily = new ReplaySubject<UsageDataModel[]>(1);
        this.usageDataHourly = new ReplaySubject<UsageDataModel[]>(1);
        this._api.allContentLoaded
            .filter((val, index) => val === true)
            .subscribe(
                () => {
                    this.debug('allContentLoaded');
                    this.sync();
                }
            );
    }

    public GetBasic(contractNumber: string): Observable<UsageDataModel> {
        return this.usageDataBasic
            .asObservable()
            .map((results) => {
                return results.find((result) => result.contract === contractNumber);
            });
    }

    public GetMonthly(contractNumber: string): Observable<UsageDataModel> {
        return this.usageDataMonthly
            .asObservable()
            .map((results) => {
                return results.find((result) => result.contract === contractNumber);
            });
    }

    public GetMonthlyForDay(contract: ContractViewModel, day: Date): Observable<UsageDataModel> {
        return this.usageDataMonthly
            .asObservable()
            .map((results) => {
                let matchingContract = results.find((result) => result.contract === contract.contractNumber);
                let filteredMonth = new UsageDataModel();
                filteredMonth.account = contract.accountNumber;
                filteredMonth.contract = contract.contractNumber;
                if (matchingContract) {
                    filteredMonth.hasNoBill = matchingContract.hasNoBill;
                    filteredMonth.costs = matchingContract.costs.filter((item) => {
                        let itemMoment = moment(item.startDateTime);
                        return itemMoment.isSame(day, 'month');
                    });
                    filteredMonth.consumption = matchingContract.consumption.filter((item) => {
                        let itemMoment = moment(item.startDateTime);
                        return itemMoment.isSame(day, 'month');
                    });
                }
                return filteredMonth;
            });
    }

    public GetMonthSoFar(contractNumber: string): Observable<UsageDataModel> {
        return this.usageDataDaily
            .asObservable()
            .map((results) => {
                let monthSoFarItem = new UsageDataModel();
                let targetContract = results.find((result) => result.contract === contractNumber);
                let totalSoFar = 0;
                for (let dailyUsage of targetContract.costs) {
                    totalSoFar += dailyUsage.value;
                }
                // TODO Perform the same operation for consumption
                return monthSoFarItem;
            });
    }

    public GetDaily(contractNumber: string): Observable<UsageDataModel> {
        this.debug('GET DAILY for ' + contractNumber);
        return this.usageDataDaily
            .asObservable()
            .map((results) => {
                return results.find((result) => result.contract === contractNumber);
            });
    }

    public GetDailyForMonth(contract: ContractViewModel, date: Date): Observable<UsageDataModel> {
        this.debug(`GET DAILY FOR MONTH for ${contract.contractNumber} and date: ${date}`);
        let requestedDate = moment(date);
        return this.usageDataDaily
            .asObservable()
            .map((results) => {
                let matchingContract = results.find((result) => result.contract === contract.contractNumber);
                let filteredDaily = new UsageDataModel();
                filteredDaily.account = contract.accountNumber;
                filteredDaily.contract = contract.contractNumber;
                if (matchingContract) {
                    filteredDaily.hasNoBill = matchingContract.hasNoBill;
                    filteredDaily.costs = matchingContract.costs.filter((item) => {
                        let itemMoment = moment(item.startDateTime);
                        return itemMoment.isSame(requestedDate, 'month');
                    });
                    filteredDaily.consumption = matchingContract.consumption.filter((item) => {
                        let itemMoment = moment(item.startDateTime);
                        return itemMoment.isSame(requestedDate, 'month');
                    });
                }
                return filteredDaily;
            });
    }

    public HaveCompleteDailyDataForMonth(contract: ContractViewModel, month: Date): Observable<boolean> {
        return this.GetDailyForMonth(contract, month)
            .map((value) => {
                if (value && value.costs && value.costs.length > 0) {
                    let firstDayOfUsage = value.costs[0].startDateTime;
                    let lastDayOfUsage = value.costs[value.costs.length - 1].startDateTime;
                    return (
                        moment(month).startOf('month').isSame(firstDayOfUsage, 'day') &&
                        moment(month).endOf('month').isSame(lastDayOfUsage, 'day'));
                }
                return false;
            });
    }

    public GetHourly(contractNumber: string): Observable<UsageDataModel> {
        this.debug(`GET HOURLY for ${contractNumber}`);
        return this.usageDataHourly
            .asObservable()
            .map((results) => {
                return results.find((result) => result.contract === contractNumber);
            });
    }

    public GetHourlyForDate(contractNumber: string, date: Date): Observable<UsageDataModel> {
        this.debug(`GET HOURLY FOR DATE for ${contractNumber} and date: ${date}`);
        let requestedDate = moment(date.toISOString());
        return this.usageDataHourly
            .asObservable()
            .map((results) => {
                let matchingContract = results.find((result) => result.contract === contractNumber);
                let filteredHourly = new UsageDataModel();
                filteredHourly.account = matchingContract.account;
                filteredHourly.contract = matchingContract.contract;
                filteredHourly.hasNoBill = matchingContract.hasNoBill;
                filteredHourly.costs = matchingContract.costs.filter((item) => {
                    let itemMoment = moment(item.startDateTime);
                    return itemMoment.isSame(requestedDate, 'day');
                });
                filteredHourly.consumption = matchingContract.consumption.filter((item) => {
                    let itemMoment = moment(item.startDateTime);
                    return itemMoment.isSame(requestedDate, 'day');
                });
                if (
                    filteredHourly.costs &&
                    filteredHourly.costs.length === 24 &&
                    filteredHourly.consumption &&
                    filteredHourly.consumption.length === 24) {
                        return filteredHourly;
                    }
                return null;
            });
    }

    private debug(msg: any) {
        if (this.debugMode) {
            console.log('*** USAGE SERVICE: ' + msg);
        }
    }

    private sync() {

        this.loadBasic()
            .subscribe(
                (result) => {
                    this.usageDataBasic.next(result);
                },
                (error) => {
                    console.error(`Basic usage unavilable`);
                }
            );

        this.loadMonthly()
            .subscribe(
                (result) => {
                    this.usageDataMonthly.next(result);
                },
                (error) => {
                    console.error(`Monthly usage unavilable`);
                }
            );

        this.loadDaily()
            .subscribe(
                (result) => {
                    this.usageDataDaily.next(result);
                },
                (error) => {
                    console.error(`Daily usage unavilable`);
                }
            );

        this.loadHourly()
            .subscribe(
                (result) => {
                    this.usageDataHourly.next(result);
                },
                (error) => {
                    console.error(`Hourly usage unavilable`);
                }
            );
    }

    private loadBasic(): Observable<UsageDataModel[]> {
        return this._api.getUsage(
            UsageGranularity.basic,
            new Date(this.startDateBasic.toISOString()),
            new Date());
    }

    private loadMonthly(): Observable<UsageDataModel[]> {
        return this._api.getUsage(
            UsageGranularity.monthly,
            new Date(this.startDateMonthly.toISOString()),
            new Date());
    }

    private loadDaily(): Observable<UsageDataModel[]> {
        return this._api.getUsage(
            UsageGranularity.daily,
            new Date(this.startDateDaily.toISOString()),
            new Date());
    }

    private loadHourly(): Observable<UsageDataModel[]> {
        return this._api.getUsage(
            UsageGranularity.hourly,
            new Date(this.startDateHourly.toISOString()),
            new Date());
    }

}
