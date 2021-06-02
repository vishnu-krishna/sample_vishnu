import { Component, OnInit } from '@angular/core';

import { SolarCheckRegisterProcessComponent } from '../../../../myAccount/dashboard/solarCheck/solarCheckRegisterProcess/solarCheckRegisterProcess.component';
import { ModalService } from '../../../../myAccount/modal/modal.service';
import { ISolarCheckService } from '../../../../myAccount/services/contract/isolarCheck.service';
import { SolarCheckEligibilityContract, SolarCheckEligiblity } from '../../../../shared/model/solar/solarCheckEligibility.model';
import { SolarCheckRegistrationStatusType } from '../../../../shared/model/solar/solarCheckRegistrationStatus.model';
import { SolarCheckDeregisterComponent } from './deregister/solarCheckDeregister.component';

import { IMessageBusService } from '../../../../shared/service/contract/imessageBus.service';
import { SolarCheckEvents, SolarCheckMessage } from '../../../services/solarCheck.service';
import { SolarCheckDeregistrationState } from './solarCheckDeregistrationState';
import { SolarCheckDeregisterRequestStatus } from './solarCheckDeregisterRequestStatus';

@Component({
    selector: 'agl-settings-solar',
    templateUrl: './solarCheck.component.html',
    styleUrls: ['./solarCheck.component.scss']
})
export class SolarCheckComponent implements OnInit {

    public hasBattery: boolean = false;
    private solarCheckEligibilityContract: SolarCheckEligibilityContract = null;
    private solarCheckRegisteredContract: SolarCheckEligibilityContract = null;
    private hasSolarCheckDeregistrationPending: boolean;
    private hasSolarCheckDeregistrationErrorOccurred: boolean = null;
    private hasSolarCheckRegistrationPending: boolean;
    private solarCheckEligiblity: SolarCheckEligiblity;
    private deregisterRequestStatus: SolarCheckDeregisterRequestStatus; // class required to detect changes when passed into modal - primtivie type boolean does not work

    constructor(
        private solarCheckService: ISolarCheckService,
        private modalService: ModalService,
        private messageBusService: IMessageBusService
    ) {
        this.deregisterRequestStatus = new SolarCheckDeregisterRequestStatus();
    }

    public ngOnInit() {
        this.solarCheckService.isEligible()
            .subscribe(
            (data) => {
                this.solarCheckEligiblity = data;
                if (this.solarCheckEligiblity && this.solarCheckEligiblity.contracts) {
                    this.solarCheckEligibilityContract = this.solarCheckEligiblity.contracts
                        .find((x) => x.eligible === true);
                    this.solarCheckRegisteredContract = this.solarCheckEligiblity.contracts
                        .find((x) => this.isRegisteredContract(x as SolarCheckEligibilityContract));
                    this.hasSolarCheckDeregistrationPending = this.solarCheckEligiblity.contracts
                        .some((x) => x.registrationStatus ===
                            SolarCheckRegistrationStatusType.DeregistrationPending);
                    this.hasSolarCheckRegistrationPending = this.solarCheckEligiblity.contracts
                        .some((x) => x.registrationStatus ===
                            SolarCheckRegistrationStatusType.RegistrationPending);
                }
            }
            );
        this.messageBusService.listenWithLatest(SolarCheckMessage).subscribe((x) => {
            switch (x.solarCheckEvent) {
                case SolarCheckEvents.deRegistered:
                    this.solarCheckRegisteredContract = null;
                    break;
                case SolarCheckEvents.updateNoBattery:
                    if (this.solarCheckEligibilityContract) {
                        this.solarCheckEligibilityContract.eligible = true;
                    }
                    this.hasBattery = false;
                    break;
                case SolarCheckEvents.hasBattery:
                    if (this.solarCheckEligibilityContract) {
                        this.solarCheckEligibilityContract.eligible = false;
                    }
                    this.hasBattery = true;
                    break;
            }
        });
    }

    public deregister(event: Event) {
        event.preventDefault();
        this.deregisterRequestStatus.Progress = SolarCheckDeregistrationState.INPROGRESS;
        let registeredContract = this.getRegisteredContract();
        if (registeredContract) {
             this.modalService.activate({
                title: '',
                cancelText: '',
                okText: '',
                modalType: 'emptyComponent',
                component: SolarCheckDeregisterComponent,
                fullScreen: false,
                componentData: { registeredContract: registeredContract, deregisterRequest: this.deregisterRequestStatus }
             });
        } else {
            console.error('Error: When deregistering the Contract number must be supplied.');
        }
    }

    public signUp(event: Event) {
        event.preventDefault();
        this.modalService.activate({
            title: '',
            cancelText: '',
            okText: '',
            modalType: 'emptyComponent',
            component: SolarCheckRegisterProcessComponent,
            fullScreen: false,
            componentData: { contract: this.solarCheckEligibilityContract }
        });
    }

    public get isEligible() {
        return this.solarCheckEligibilityContract && this.solarCheckEligibilityContract.eligible === true;
    }

    public get isSignupEligible() {
        return this.isEligible && this.isRegistered !== true && this.isDeregistrationPending !== true && this.isDeregisterRequestCompleted !== true && !this.hasBattery;
    }

    public get isSolarRegistered() {
        return this.isRegistered && this.isDeregistrationPending !== true && this.isDeregisterRequestCompleted !== true && !this.hasBattery;
    }

    public get isPendingRegistration() {
        return (this.hasSolarCheckRegistrationPending === true ||
            (this.getRegisteredContract() &&
            this.getRegisteredContract().registrationStatus === SolarCheckRegistrationStatusType.RegistrationPending));
    }

    public get isCurrentlyDeregistering() {
        return (this.isDeregistrationPending === true || this.isDeregisterRequestCompleted === true) && !this.hasBattery;
    }

    public displaySystemDeregistrationErrorAlert(): Boolean {
        return this.deregisterRequestStatus.Progress === SolarCheckDeregistrationState.ERROR;
    }

    public get registeredContractNumber() {
        let registeredContract = this.getRegisteredContract();

        if (registeredContract) {
            return registeredContract.contractNumber;
        } else {
            return 'error';
        }
    }

    private getRegisteredContract(): SolarCheckEligibilityContract {
        if (this.solarCheckRegisteredContract) {
            return this.solarCheckRegisteredContract;
        } else if (this.solarCheckEligibilityContract) {
            return this.solarCheckEligibilityContract;
        } else {
            return null;
        }
    }

    private isRegisteredContract(contract: SolarCheckEligibilityContract): boolean {
        return contract &&
            contract.registrationStatus &&
            (contract.registrationStatus === SolarCheckRegistrationStatusType.Registered ||
                contract.registrationStatus === SolarCheckRegistrationStatusType.RegistrationPending);
    }

    private get isRegistered() {
        return ((this.solarCheckRegisteredContract && this.isRegisteredContract(this.solarCheckRegisteredContract)) ||
            (this.solarCheckEligibilityContract && this.isRegisteredContract(this.solarCheckEligibilityContract)));
    }

    // evaluates if have just deregistered
    private get isDeregisterRequestCompleted() {
        return this.deregisterRequestStatus.Progress === SolarCheckDeregistrationState.COMPLETE;
    }

    // evaluates if has pre-existing deregistration request when entering component
    private get isDeregistrationPending() {
        return this.hasSolarCheckDeregistrationPending;
    }
}
