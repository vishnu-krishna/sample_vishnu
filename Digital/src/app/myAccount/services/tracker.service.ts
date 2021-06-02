import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ConnectionType, TrackerMode } from '../../shared/globals/ommTrackerConstants';
import { FuelTypeMap, SCPlaceHolder, StateMap } from '../../shared/globals/ommTrackerConstants';
import { MoveStatusType } from '../../shared/globals/oneMinuteMove/moveStatusType';
import { RequestStatusType } from '../../shared/globals/oneMinuteMove/requestStatusType';
import { IConnectionContent, IConnectionDetails, IConnectionStatuses, IMoveOutContractMapped, IMoveOutMapped } from '../../shared/model/ommTracker/connectionContent.interface';
import { DidYouKnowMsg } from '../../shared/model/ommTracker/didYouKnowViewModel.interface';
import { DidYouKnowViewModel } from '../../shared/model/ommTracker/didYouKnowViewModel.interface';
import { InfoItem } from '../../shared/model/ommTracker/infoItem.model';
import { NeedToMakeChangeViewModel } from '../../shared/model/ommTracker/needToMakeChangeViewModel.interface';
import { HeaderStatusIcon, HeaderViewModel } from '../../shared/model/ommTracker/trackStatusHeader.model';
import { WhatHappensNextReference } from '../../shared/model/ommTracker/whatHappensNextReference.model';
import { MoveAddressModel, MoveGetResponseModel, MoveInContractModel, MoveInGetResponseModel, MoveOutContractModel, MoveOutGetResponseModel } from '../../shared/model/oneMinMove/moveGetResponse.model';
import { ContentService } from '../../shared/service/content.service';
import { IMoveJoinApiService } from '../../shared/service/contract/imoveJoinApi.service';
import { State } from './../../shared/globals/oneMinuteMove/state';
import { IConnectionData } from './../../shared/model/ommTracker/connectionContent.interface';
import { AddressHelper } from './../../shared/utils/addressHelper';

import { FuelConnectionType } from '../../shared/globals/oneMinuteMove/fuelType';
import { IMoveMap } from '../../shared/model/ommTracker/trackerService.interface';
import { AccountApiModel, ApiService, ContractApiModel } from './../../shared/service/api.service';

@Injectable()
export class TrackerService {
    private _scContent;
    constructor(
        private _api: IMoveJoinApiService,
        private _contentService: ContentService,
        private _apiService: ApiService
    ) {
        _apiService.startSync();
    }

    public getHeaderStatus(apiData, sitecoreData): HeaderViewModel {
        /*Get the status from the api ,map with the sitecore content and  populate
         * the headerStatus object */
        let requestStatus: RequestStatusType;
        let contracts: MoveInContractModel[];
        let headerStatus = new HeaderViewModel();
        let headerState: RequestStatusType;
        let isConnectionStateChecking: Boolean;
        requestStatus = apiData.oneMinuteMove.status;
        contracts = apiData.oneMinuteMove.moveIn.contracts;

        isConnectionStateChecking = this.isConnectionStateChecking(contracts);
        if (this.isConnectionStateChecking(contracts)) {
            headerState = RequestStatusType.Checking;
        } else {
            headerState = requestStatus;
        }

        headerStatus.statusText = sitecoreData.headerStatuses[headerState];
        headerStatus.statusIcon = HeaderStatusIcon[headerState];
        headerStatus.subText = sitecoreData.whatHappensNextTitle;
        headerStatus.welcomeText = sitecoreData.welcomeHomeSubtitle;
        // headerStatus = this.mapHeaderStatus(headerState, sitecoreData.headerStatuses, HeaderStatusIcon, sitecoreData.whatHappensNextTitle);
        return headerStatus;
    }

    public getRequestStatus(model: MoveGetResponseModel): RequestStatusType {
        return model.oneMinuteMove.status;
    }

    public getDidYouKnowMsgList(sitecoreData, fuel: string, stateLowerCase: string): DidYouKnowMsg[] {
        // get state key based on lowercase state to get data from object case insensitive
        let stateKey = this.getKeyCI(sitecoreData.didYouKnow[fuel], stateLowerCase);
        const referenceList = sitecoreData.didYouKnow[fuel][stateKey].list;
        const msgList = referenceList.map((item) => {
            return <DidYouKnowMsg> sitecoreData.didYouKnowReference[item];
        });
        return msgList;
    }

    public getDidYouKnowViewModel(apiData: MoveGetResponseModel, sitecoreData, fuel: string, state: string): DidYouKnowViewModel {
        let didYouKnowTitle = sitecoreData.didYouKnowTitle !== undefined ? sitecoreData.didYouKnowTitle : '';
        let didYouKnowMsgList = this.getDidYouKnowMsgList(sitecoreData, fuel, state);
        let didYouKnowViewModel = <DidYouKnowViewModel> {
            didYouKnowTitle: didYouKnowTitle,
            didYouKnowMsgList: didYouKnowMsgList
        };
        return didYouKnowViewModel;
    }

    public generateConnectionSitecore(apiData: MoveGetResponseModel, sitecoreData: any, moveInMap: IMoveMap, moveOutMap: IMoveMap): IConnectionContent {

        // connection
        let connectionFuel: string = FuelTypeMap[moveInMap.fuel];
        let stateKey = connectionFuel ? this.getKeyCI(sitecoreData.connectionSubtext[connectionFuel], moveInMap.state) : null;
        let reference = (connectionFuel && stateKey) ? sitecoreData.connectionSubtext[connectionFuel][stateKey] : null;
        let subText: string = reference ? sitecoreData.connectionSubtextReference[reference] : null;
        let connectionSubtext = this.getConnectionSubText(moveInMap, subText);

        // disconnection
        let disconnectionSubtext = '';
        let disconnectionFuel: string = FuelTypeMap[moveInMap.fuel];
        if (moveOutMap) {
            disconnectionFuel = FuelTypeMap[moveOutMap.fuel];
            stateKey = disconnectionFuel ? this.getKeyCI(sitecoreData.disconnectionSubtext[disconnectionFuel], moveOutMap.state) : null;
            reference = (disconnectionFuel && stateKey) ? sitecoreData.disconnectionSubtext[disconnectionFuel][stateKey] : null;
            subText = reference ? sitecoreData.connectionSubtextReference[reference] : '';
            disconnectionSubtext = this.getConnectionSubText(moveOutMap, subText);
        }

        let connectionSc = <IConnectionContent> {
            connectionStatuses: <IConnectionStatuses> sitecoreData.connectionStatuses,
            connectionDetails: <IConnectionDetails> {
                [ConnectionType.MoveIn]: {
                    title: connectionFuel === FuelTypeMap.Dual ? sitecoreData.connectionTitle : sitecoreData.singleFuelConnectionTitle,
                    subtext: connectionSubtext,
                    gasMismatchMsg: this.gasMismatchMsg(apiData.oneMinuteMove.moveIn.contracts, sitecoreData.mismatchedDatesMessage, apiData.oneMinuteMove.moveIn.requestedDate)
                },
                [ConnectionType.MoveOut]: {
                    title: disconnectionFuel === FuelTypeMap.Dual ? sitecoreData.disconnectionTitle : sitecoreData.singleFuelDisconnectionTitle,
                    subtext: disconnectionSubtext
                }
            }
        };

        return connectionSc;
    }

    public generateConnectionData(apiData: MoveGetResponseModel, accountData: AccountApiModel[], mappedMoveOutData: IMoveOutMapped): IConnectionData {

        return {
            moveIn: apiData.oneMinuteMove.moveIn,
            moveInAddress: this.addressToString(this.moveInAddress(apiData.oneMinuteMove.moveIn.contracts, apiData.oneMinuteMove.moveIn.requestedAddress)),
            moveOut: mappedMoveOutData,
            moveOutAddress: mappedMoveOutData ? this.moveOutAddress(mappedMoveOutData) : '',
            requestType: apiData.oneMinuteMove.requestType
        };
    }

    public addressToString(address: MoveAddressModel): string {
        return AddressHelper.toString(address.floorNumber,
            address.unitNumber,
            address.streetNumber,
            address.streetName,
            address.suburb,
            address.postcode,
            address.state);
    }

    public getNeedToMakeChangeViewModel(sitecoreData): NeedToMakeChangeViewModel {
        let needToMakeChangeViewModel = <NeedToMakeChangeViewModel> {
            title: sitecoreData.needToMakeAChangeTitle !== undefined ? sitecoreData.needToMakeAChangeTitle : '',
            subtitle: sitecoreData.needToMakeAChangeSubtitle !== undefined ? sitecoreData.needToMakeAChangeSubtitle : '',
        };
        return needToMakeChangeViewModel;
    }

    public getTrackerStatus(apiData: MoveGetResponseModel): TrackerMode {
        if (!apiData.oneMinuteMove.moveIn.contracts || apiData.oneMinuteMove.moveIn.contracts.length === 0) {
            return TrackerMode.Track;
        } else if (apiData.oneMinuteMove.status === RequestStatusType.WelcomeHome) {
            return TrackerMode.WelcomeHome;
        } else {
            return TrackerMode.Track;
        }
    }

    public load() {

        let apiDataObs = this._api.GetOMMTracker();
        let accountDataObs = this._apiService.getAccounts();

        return Observable.forkJoin(apiDataObs, accountDataObs).map((results) => {

            let apiData: MoveGetResponseModel = results[0];
            let accountData: AccountApiModel[] = results[1];

            let mappedMoveOutData: IMoveOutMapped = apiData.oneMinuteMove.moveOut ? this.getMappedMoveOutData(apiData.oneMinuteMove.moveOut, accountData) : null;

            let moveInObj: IMoveMap = this.getMoveInMap(apiData.oneMinuteMove.moveIn);
            let moveOutObj: IMoveMap = apiData.oneMinuteMove.moveOut ? this.getMoveOutMap(mappedMoveOutData) : null;

            return {
                headerStatus: this.getHeaderStatus(apiData, this._scContent),
                requestStatus: this.getRequestStatus(apiData),
                didYouKnowViewMode: this.getDidYouKnowViewModel(apiData, this._scContent, FuelTypeMap[moveInObj.fuel], moveInObj.state),
                connectionContent: this.generateConnectionSitecore(apiData, this._scContent, moveInObj, moveOutObj),
                connectionData: this.generateConnectionData(apiData, accountData, mappedMoveOutData),
                apiData: apiData,
                needToMakeAChangeViewModel: this.getNeedToMakeChangeViewModel(this._scContent),
                progressContent: this._scContent.progressBar,
                referenceNumber: apiData.oneMinuteMove.referenceCode,
                trackerStatus: this.getTrackerStatus(apiData),
                whatHappensNext: this.getWhatHappensNextList(this._scContent),
                accountNumber: accountData[0].number,
                accountName: `${accountData[0].firstName}  ${accountData[0].lastName}`.trim()
            };

        });
    }

    public loadContent() {
        this._contentService.load();
        let sitecoreDataObs = this._contentService.getContent();
        return sitecoreDataObs.map((data) => {
            if (data && data.selfService && data.selfService.oMMTracker) {
                this._scContent = data.selfService.oMMTracker;
            }
            return this._scContent;
        });
    }

    public getErrorMessage(): Observable<string> {
        return this._contentService.getContent().map((sdata) => {
            return sdata.selfService.oMMTracker.errorPageDescription;
        });
    }

    private getFuelType(contracts): FuelConnectionType {
        let fuelType: FuelConnectionType;
        if (contracts && contracts.length === 1) {
            fuelType = contracts[0].fuelType;
        } else if (contracts && contracts.length === 2) {
            fuelType = FuelConnectionType.Dual;
        }
        return fuelType;
    }

    private getState(address: MoveAddressModel) {
        return address.state;
    }

    private isConnectionStateChecking(contracts) {
        let isChecking = false;
        let fuelType: FuelConnectionType;
        let connectionStatus: MoveStatusType;
        fuelType = this.getFuelType(contracts);
        let elecConnectionStatus;
        let gasConnectionStatus;

        switch (fuelType) {
            case FuelConnectionType.Electricity:
                connectionStatus = this.getConnectionStatusForFuel(contracts, FuelConnectionType.Electricity);
                isChecking = connectionStatus === MoveStatusType.Checking ? true : false;
                break;
            case FuelConnectionType.Gas:
                connectionStatus = this.getConnectionStatusForFuel(contracts, FuelConnectionType.Gas);
                isChecking = connectionStatus === MoveStatusType.Checking ? true : false;
                break;

            case FuelConnectionType.Dual:
                elecConnectionStatus = this.getConnectionStatusForFuel(contracts, FuelConnectionType.Electricity);
                gasConnectionStatus = this.getConnectionStatusForFuel(contracts, FuelConnectionType.Gas);
                isChecking = (elecConnectionStatus === MoveStatusType.Checking && gasConnectionStatus === MoveStatusType.Checking) ? true : false;
                break;
            default:
                isChecking = false;
        }
        return isChecking;
    }

    private getConnectionStatusForFuel(contracts: MoveInContractModel[], fuelType: FuelConnectionType): MoveStatusType {
        return contracts.find((contract) => contract.fuelType === fuelType).status;
    }

    private moveInAddress(contracts: MoveInContractModel[], requestedAddress: MoveAddressModel): MoveAddressModel {
        let address: MoveAddressModel;

        if (contracts && contracts[0].actualAddress) {
            address = contracts[0].actualAddress;
        } else {
            address = requestedAddress;
        }

        return address;
    }

    private moveOutAddress(moveOutMapped: IMoveOutMapped): string {
        let address: string = moveOutMapped.contracts.length > 0 ? moveOutMapped.contracts[0].actualAddress : '';

        if (moveOutMapped.contracts.length >= 2) {

            moveOutMapped.contracts.forEach((contract) => {
                if (contract.actualAddress.replace(/\s/g, '') !== address.replace(/\s/g, '')) {
                    address = this._scContent.mismatchedAddressMessage ? this._scContent.mismatchedAddressMessage : '';
                    return;
                }
            });
        }

        return address;
    }

    private getMoveInMap(moveInData: MoveInGetResponseModel): IMoveMap {
        let state = moveInData.contracts.length > 0 ? this.getState(this.moveInAddress(moveInData.contracts, moveInData.requestedAddress)) : moveInData.requestedAddress.state;
        return this.getMoveMap(moveInData.requestedDate, state, moveInData.contracts);
    }

    private getMoveOutMap(moveOutData: IMoveOutMapped): IMoveMap {
        return this.getMoveMap(moveOutData.requestedDate, null, moveOutData.contracts);
    }

    private getMoveMap(requestedDate: string, state, contracts: any[]): IMoveMap {
        let stateEnum = State;
        let stateMap: string = state === null ? StateMap.All : state;
        let fuelType: FuelConnectionType = this.getFuelType(contracts);
        let requestedAppointmentSlot: string = '';
        let actualAppointmentSlot: string = '';
        let isVI: boolean = false;
        let date: string = '';

        if (fuelType === FuelConnectionType.Gas) {
            stateMap = StateMap.All;
        } else {
            if (state && (state.toUpperCase() === stateEnum.QLD)) {

                let ctr = contracts.find((contract) =>
                    contract.fuelType === 'Electricity' &&
                    contract.requestedAppointmentSlot !== undefined &&
                    contract.requestedAppointmentSlot !== '' &&
                    contract.actualAppointmentSlot !== undefined &&
                    contract.actualAppointmentSlot !== '');

                if (ctr !== undefined) {
                    stateMap = State[stateEnum.QLD].toLowerCase() + StateMap.VisualInspection;
                    requestedAppointmentSlot = ctr.requestedAppointmentSlot;
                    actualAppointmentSlot = ctr.actualAppointmentSlot;
                    isVI = true;
                    date = (ctr.actualDate !== undefined && ctr.actualDate !== '') ? ctr.actualDate : requestedDate;
                }
            }
        }

        return {
            state: stateMap.toLowerCase(),
            requestedAppointmentSlot: requestedAppointmentSlot,
            actualAppointmentSlot: actualAppointmentSlot,
            isVI: isVI,
            date: date,
            fuel: fuelType
        };
    }

    private gasMismatchMsg(contracts: MoveInContractModel[], mismatchedDatesMessage: string, requestedDate: string): string {
        let msg: string = '';

        if (contracts !== undefined && contracts.find((moveInContractModel) => moveInContractModel.fuelType === FuelConnectionType.Gas) !== undefined) {
            let actualDate = contracts.find((moveInContractModel) => moveInContractModel.fuelType === FuelConnectionType.Gas).actualDate;
            if (actualDate !== requestedDate) {
                msg = mismatchedDatesMessage;
            }
        }

        return msg;
    }
    private getWhatHappensNextList(sitecoreData): InfoItem[] {
        let list = sitecoreData.whatHappensNextItems;
        const modalList = list.map((item) => {
            return <WhatHappensNextReference> sitecoreData.whatHappensNextReference[item];
        });
        return modalList;
    }

    // get key CaseInsensitive
    private getKeyCI(obj: any, lowerCaseKey: string) {
        let stateKey: string = lowerCaseKey;
        Object.keys(obj).forEach((key, index) => {
            if (key.toLowerCase() === lowerCaseKey) {
                stateKey = key;
                return;
            }
        });
        return stateKey;
    }

    private getConnectionSubText(moveMap: IMoveMap, subText: string): string {
        // is visual inspection => replace sitecore placeholder
        return moveMap.isVI ?
            subText.replace(SCPlaceHolder.connectionSubtext.from, moveMap.requestedAppointmentSlot)
                .replace(SCPlaceHolder.connectionSubtext.to, moveMap.actualAppointmentSlot)
                .replace(SCPlaceHolder.connectionSubtext.date, moveMap.date) :
            subText;
    }

    private getMappedMoveOutData(moveOutdata: MoveOutGetResponseModel, accountData: AccountApiModel[]): IMoveOutMapped {
        let mappedMoveOutContract: IMoveOutContractMapped[] = [];
        let mappedMoveOut: IMoveOutMapped;

        moveOutdata.contracts.forEach((moContract: MoveOutContractModel) => {

            if (!moContract.isCancelled) {

                accountData.forEach((account: AccountApiModel) => {
                    let aContract: ContractApiModel = account.contracts.find((contract) => contract.number === moContract.contractNumber.toString());
                    let moContractMapped: IMoveOutContractMapped;

                    if (aContract) {
                        moContractMapped = {
                            fuelType: aContract && aContract.fuelType ? FuelConnectionType[aContract.fuelType] : null,
                            actualAddress: aContract ? aContract.address : '',
                            actualDate: moContract.actualDate,
                            isCancelled: moContract.isCancelled,
                            contractNumber: moContract.contractNumber,
                            accountNumber: Number(aContract.accountNumber),
                            status: (moContract.actualDate && moContract.actualDate !== '') ? MoveStatusType.Confirmed : MoveStatusType.Requested
                        };

                        mappedMoveOutContract.push(moContractMapped);
                    }

                });
            }

        }
        );

        mappedMoveOut = {
            requestedDate: moveOutdata.requestedDate,
            contracts: mappedMoveOutContract
        };

        return mappedMoveOut;
    }
}
