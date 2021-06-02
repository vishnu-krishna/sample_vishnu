import { Component, Input, OnInit } from '@angular/core';

import { ISolarCheckService } from '../../../../../myAccount/services/contract/isolarCheck.service';

import { ModalService } from '../../../../../myAccount/modal/modal.service';

import { SolarCheckContractResponse } from '../../../../../shared/model/solar/solarCheckContract.model';

import * as moment from 'moment';
import { YesNoModel } from '../../../../../shared/component/yesNoSwitch/yesNoSwitch.component';
import { SolarCheckSolarDetailsType } from '../../../../../shared/model/solar/solarCheckSolarDetails.model';
import { IMessageBusService } from '../../../../../shared/service/contract/imessageBus.service';
import { DataLayerService } from '../../../../../shared/service/dataLayer.service';
import { SolarCheckEvents, SolarCheckMessage, SolarCheckUpdateDetailsMessage } from '../../../../services/solarCheck.service';
import { SolarCheckUpdateDetailsProcessComponent, SolarCheckUpdateDetailsState } from './updateProcess/solarCheckUpdateDetailsProcess.component';

@Component({
    selector: 'agl-settings-solar-system-details',
    templateUrl: './solarCheckSystemDetails.component.html',
    styleUrls: ['./solarCheckSystemDetails.component.scss']
})
export class SolarCheckSystemDetailsComponent implements OnInit {
    @Input() public contractNumber: string;
    @Input() public isDisabled: boolean;
    public monthlyEmailFeature: boolean = false;
    public contract: SolarCheckContractResponse;
    public mostRecentSystemUpdateType: SolarCheckUpdateDetailsState = null;
    public statusExpectedDate: Date = null;
    public hasSystemUpdateErrorOccurred: boolean = null;
    public hasBatteryUpdateErrorOccurred: boolean = null;
    public systemDetails: SolarCheckSolarDetailsType = null;
    public isLoading: boolean;
    public yesNoModel: YesNoModel = new YesNoModel();
    public monthlyEmail: YesNoModel = new YesNoModel();
    public statusEmail: YesNoModel = new YesNoModel();
    constructor(
        private solarCheckService: ISolarCheckService,
        private modalService: ModalService,
        private messageBusService: IMessageBusService,
        private dataLayer: DataLayerService
    ) { }

    public ngOnInit() {
        this.isLoading = true;
        this.solarCheckService.getContract(this.contractNumber).subscribe((contract) => {
            this.contract = contract;
            this.systemDetails = contract;
            this.isLoading = false;
        });
        this.messageBusService.listen(SolarCheckUpdateDetailsMessage).subscribe((x) => {
            switch (x.solarCheckEvent) {
                case SolarCheckEvents.systemChange:
                    this.hasSystemUpdateErrorOccurred = false;
                    this.mostRecentSystemUpdateType = SolarCheckUpdateDetailsState.UPGRADE;
                    this.statusExpectedDate = x.statusExpectedDate;
                    break;
                case SolarCheckEvents.systemCorrection:
                    this.hasSystemUpdateErrorOccurred = false;
                    this.mostRecentSystemUpdateType = SolarCheckUpdateDetailsState.CORRECTION;
                    this.statusExpectedDate = null;
                    break;
                case SolarCheckEvents.updateError:
                    this.hasSystemUpdateErrorOccurred = true;
                    break;
            }
        });
        this.solarCheckService.getPreferences().subscribe((preferences) => {
            this.monthlyEmail.isYes = preferences.marketingComms;
            this.statusEmail.isYes = preferences.statusChangeComms;
        });
    }
    public update() {
        this.modalService.activate({
            title: '',
            cancelText: '',
            okText: '',
            modalType: 'emptyComponent',
            component: SolarCheckUpdateDetailsProcessComponent,
            fullScreen: false,
            componentData: { contractNumber: this.contractNumber, scDetailsModel: this.systemDetails }
        });
    }

    public hideUpdateAlert() {
        this.mostRecentSystemUpdateType = null;
    }

    public displaySystemChangedAlert(): Boolean {
        return (this.mostRecentSystemUpdateType && this.mostRecentSystemUpdateType === SolarCheckUpdateDetailsState.UPGRADE);
    }

    public displaySystemCorrectedAlert(): Boolean {
        return (this.mostRecentSystemUpdateType && this.mostRecentSystemUpdateType === SolarCheckUpdateDetailsState.CORRECTION);
    }

    public displaySystemUpdateErrorAlert(): Boolean {
        return (this.hasSystemUpdateErrorOccurred);
    }

    public displayBatteryUpdateErrorAlert(): Boolean {
        return (this.hasBatteryUpdateErrorOccurred);
    }

    public getSystemCorrectionHeaderText(): string {

        let headerText = 'Your system status will be ready soon. ';

        let statusExpectedDateText = '';

        if (this.statusExpectedDate) {
            let formattedDate = moment(this.statusExpectedDate).format('D MMM');

            statusExpectedDateText = 'Estimated Date ' + formattedDate + '.';
            headerText += statusExpectedDateText;
        }

        return headerText;
    }

    public onMonthlyEmail(isYes) {
        this.solarCheckService.setMonthlyComms(isYes).subscribe(
            (x) => {
                this.monthlyEmail.isInFlight = false;
                if (isYes) {
                    this.dataLayer.pushSccMonthlyEmailPreferencesYes();
                } else {
                    this.dataLayer.pushSccMonthlyEmailPreferencesNo();
                }
            },
            (error) => {
                this.monthlyEmail.isInFlight = false;
                this.monthlyEmail.isYes = !this.monthlyEmail.isYes;
                if (isYes) {
                    this.dataLayer.pushSccMonthlyEmailPreferencesYesError();
                } else {
                    this.dataLayer.pushSccMonthlyEmailPreferencesNoError();
                }
            }
        );
    }

    public onStatusEmail(isYes) {
        this.solarCheckService.setStatusChangeComms(isYes).subscribe(
            (x) => {
                this.statusEmail.isInFlight = false;
                if (isYes) {
                    this.dataLayer.pushSccStatusChangeEmailPreferenceYes();
                } else {
                    this.dataLayer.pushSccStatusChangeEmailPreferenceNo();
                }
            },
            (error) => {
                this.statusEmail.isInFlight = false;
                this.statusEmail.isYes = !this.statusEmail.isYes;
                if (isYes) {
                    this.dataLayer.pushSccStatusChangeEmailPreferenceYesError();
                } else {
                    this.dataLayer.pushSccStatusChangeEmailPreferenceNoError();
                }
            }
        );
    }

    public onSwitchChanged(isYes) {
        if (isYes === true) {
            this.modalService.activate({
                title: 'Remove Solar Command Check',
                message: 'Solar Command Check is not suited to homes with a solar battery, so we can no longer provide you with this service.',
                cancelText: 'Cancel',
                okText: 'Confirm',
                modalType: 'normal',
                fullScreen: false
            }).then((confirmed) => {
                if (confirmed) {
                    this.solarCheckService.setHasBattery(this.contractNumber, true).subscribe(() => {
                        this.hasBatteryUpdateErrorOccurred = false;
                        this.yesNoModel.isYes = true;
                        let solarCheckMessage = new SolarCheckMessage();
                        solarCheckMessage.solarCheckEvent = SolarCheckEvents.hasBattery;
                        this.messageBusService.broadcast(solarCheckMessage);
                        solarCheckMessage.solarCheckEvent = SolarCheckEvents.deRegistered;
                        this.messageBusService.broadcast(solarCheckMessage);
                        this.yesNoModel.isInFlight = false;
                        this.solarCheckService.refreshEligibility();
                        this.dataLayer.pushSccSettingsHasBattery();
                    }, (error) => {
                        console.log('error while trying to update the battery');
                        this.yesNoModel.isYes = false;
                        this.yesNoModel.isInFlight = false;
                        this.hasBatteryUpdateErrorOccurred = true;
                        this.dataLayer.pushSccSettingsHasBatteryError();
                    });
                } else {
                    this.yesNoModel.isYes = false;
                    this.yesNoModel.isInFlight = false;
                }
            });
        } else {
            this.yesNoModel.isYes = false;
            this.yesNoModel.isInFlight = false;
        }
    }
}
