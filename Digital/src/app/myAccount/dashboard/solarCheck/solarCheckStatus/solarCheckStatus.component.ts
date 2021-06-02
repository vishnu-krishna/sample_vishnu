
import { Component, Input, OnInit } from '@angular/core';
import { SolarCheckEligibilityContract, SolarCheckEligiblity } from '../../../../shared/model/solar/solarCheckEligibility.model';
import { ISolarCheckService } from '../../../services/contract/isolarCheck.service';

import { SolarCheckRegistrationStatusType } from '../../../../shared/model/solar/solarCheckRegistrationStatus.model';
import { SolarCheckSolarDetailsType } from '../../../../shared/model/solar/solarCheckSolarDetails.model';
import { SolarCheckStatusResponse } from '../../../../shared/model/solar/solarCheckStatusResponse.model';
import { ConfigService } from '../../../../shared/service/config.service';
import { IMessageBusService } from '../../../../shared/service/contract/imessageBus.service';
import { AccountViewModel } from '../../../services/account.service';
import { SolarCheckEvents, SolarCheckMessage } from '../../../services/solarCheck.service';
import { SolarSurvey, SurveyEventType, SurveyService, SurveyType } from '../../../services/survey.service';
import { SolarCheckStatusViewModel } from './solarCheckStatusView.model';
import { SolarCheckStatusViewModelFactory } from './solarCheckStatusViewModelFactory';

declare let leanengage: any;

/**
 * Solar Check Status component: use this componenet to display the health status of the customers Solar Panel(s).
 * This component should only be displayed for customers who are eligible for this check (i.e. who have solar panels and NO battery) and who are registered.
 *
 * @export
 * @class SolarCheckStatusComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'agl-solar-check-status',
    templateUrl: './solarCheckStatus.component.html',
    styleUrls: ['./solarCheckStatus.component.scss']
})
export class SolarCheckStatusComponent implements OnInit {

    @Input() public accounts: AccountViewModel[];
    public model: SolarCheckStatusViewModel;
    public pvDetails: SolarCheckSolarDetailsType;
    public scDetailsModel: SolarCheckSolarDetailsType;
    private solarCheckStatusResponse: SolarCheckStatusResponse;
    private viewModelFactory: SolarCheckStatusViewModelFactory;

    private solarCheckEligiblity: SolarCheckEligiblity = null;
    private solarCheckEligiblityContract: SolarCheckEligibilityContract = null;

    constructor(
        private solarCheckService: ISolarCheckService,
        private configService: ConfigService,
        private surveyService: SurveyService,
        private messageBusService: IMessageBusService) {
        this.viewModelFactory = new SolarCheckStatusViewModelFactory();
    }

    /**
     * On initialisation, do the following:
     * - When receiving the API Service response, validate the response and if it's invalid then set the model ViewModel is equivalent to the status of 'Not Available', else
     *   set the model ViewModel based on the status value of the received response.
     */
    public ngOnInit() {
        if (this.checkAccountHasSolar()) {
            try {
                this.solarCheckService.isEligible()
                    .subscribe(
                    (result) => {
                        this.setRegisteredSolarCheckContract(result);
                        this.getSolarCheckStatus(this.solarCheckEligiblityContract);
                    },
                    (error) => new Error('Solar Check Status Error - unable to set the relevant details required for performing a Solar Check. Error Details: ')
                    );
            } catch (e) {
                this.logInvalidResponse();
                if (this.hasSolarCheckRegistered) {
                    this.model = this.viewModelFactory.createRegisteredStatusViewModel();
                }
            }
        }
        this.messageBusService.listenWithLatest(SolarCheckMessage).subscribe((x) => {
            switch (x.solarCheckEvent) {
                case SolarCheckEvents.registered:
                    this.model = this.viewModelFactory.createRegisteredStatusViewModel();
                    break;
            }
        });
    }

    public promptSurvey() {
        if (this.shouldTriggerSurvey()) {
            this.surveyService.trackEvent(SurveyEventType.solarFaqClickEvent);
        }
    }
    private shouldTriggerSurvey(): Boolean {
        return this.model && (this.model.isGoodStatus || this.model.isCheckSystem);
    }

    private getSolarCheckStatus(solarCheckContract: SolarCheckEligibilityContract) {
        if (solarCheckContract) {
            this.solarCheckService.getStatus(solarCheckContract).subscribe(
                (response) => {
                    this.solarCheckStatusResponse = <SolarCheckStatusResponse> response;
                    if (this.solarCheckStatusResponse) {
                        this.model = this.parseSolarCommandCheckResponse(this.solarCheckStatusResponse);
                        if (this.shouldTriggerSurvey()) {
                            this.surveyService.start(new SolarSurvey(this.solarCheckEligiblityContract.contractNumber, this.solarCheckStatusResponse.solarStatus.toString()));
                            this.surveyService.triggerSurvey(SurveyType.myAccountSolarSurvey);
                        }

                    } else {
                        this.model = new SolarCheckStatusViewModel();
                        throw new Error('Solar Health Error - content was not defined as a valid "Solar Check Status Response Model" ');
                    }
                },
                (error) => {
                    this.model = new SolarCheckStatusViewModel();
                    throw new Error('Solar Health Error - content was not defined as a valid "Solar Check Status Response Model" ');
                });
        }
    }

    private setRegisteredSolarCheckContract(solarCheckEligiblityResult: SolarCheckEligiblity): SolarCheckEligibilityContract {
        if (solarCheckEligiblityResult && solarCheckEligiblityResult.contracts) {
            this.solarCheckEligiblityContract = null;
            this.solarCheckEligiblityContract = solarCheckEligiblityResult.contracts.find((x) => this.isRegisteredContract(x) === true);
        }
        return this.solarCheckEligiblityContract;
    }

    private isRegisteredContract(contract: SolarCheckEligibilityContract): boolean {
        return contract &&
            contract.registrationStatus &&
            (contract.registrationStatus === SolarCheckRegistrationStatusType.Registered ||
             contract.registrationStatus === SolarCheckRegistrationStatusType.RegistrationPending);
    }

    /**
     * Parse Solar Command Check Response.
     * @param  {SolarCheckStatusResponse} sccResponse Solar Check Response returned from corresponding API Service
     */
    private parseSolarCommandCheckResponse(sccResponse: SolarCheckStatusResponse) {

        if (sccResponse == null || sccResponse.solarStatus == null) {
            this.logInvalidResponse();
            return this.viewModelFactory.createNotAvailableStatusViewModel();
        }
        return this.viewModelFactory.createSolarCheckStatusViewModel(sccResponse);
    }

    /**
     * Check if an account has a contract that has registered for Solar Check
     */
    private checkAccountHasSolar() {
        for (let account of this.accounts) {
            for (let contract of account.contracts) {
                if (contract.hasSolar) {
                    return true;
                }
            }
        }
        return false;
    }

    private hasSolarCheckRegistered() {
        for (let account of this.accounts) {
            for (let contract of account.contracts) {
                if (contract.solarCheckRegistered) {
                    return true;
                }
            }
        }
        return false;
    }

    private logInvalidResponse() {

        let errorMessage = (
            `---------
                Solar Command Check Error: Response Invalid.
                Defaulting status to: Not Available.
                ---------`
        );
        console.error(errorMessage.replace(/  +/g, ' '));
    }
}
