import { Component, Input, OnInit } from '@angular/core';
import { ContractViewModel } from '../../../services/account.service';

import { SolarCheckSolarDetailsType } from '../../../../shared/model/solar/solarCheckSolarDetails.model';

export enum SolarCheckRegisterState {
    WELCOME   = <any> 'WELCOME',
    PREREQUISTE = <any> 'PREREQUISTE',
    UNSUITABLE = <any> 'UNSUITABLE',
    SOLAR_DETAILS  = <any> 'SOLAR_DETAILS',
    REGISTER  = <any> 'REGISTER',
    COMPLETE  = <any> 'COMPLETE'
}

@Component ({
    selector: 'agl-solar-check-register-process',
    templateUrl: './solarCheckRegisterProcess.component.html',
    styleUrls: ['./solarCheckRegisterProcess.component.scss']
})

export class SolarCheckRegisterProcessComponent implements OnInit {

    @Input() public contract: ContractViewModel;
    @Input() public scDetailsModel: SolarCheckSolarDetailsType;

    public hideWelcome: boolean;
    public hidePrerequiste: boolean;
    public hideUnsuitable: boolean;
    public hideSolarDetails: boolean;
    public hideRegister: boolean;
    public hideComplete: boolean;
    public isUpdate: boolean = false;

    private _state: SolarCheckRegisterState;
    constructor() {
        this.scDetailsModel = new SolarCheckSolarDetailsType();
    }

    public ngOnInit(): void {
        this._processState(SolarCheckRegisterState.WELCOME);
    }

    /**
     * Event listener to handle incoming state
     * @param  {state} enum value of SolarCheckRegisterState
     */
    public handlePrevious(state: SolarCheckRegisterState) {
        this._processState(state);
    }

    /**
     * Event listener to handle incoming state
     * @param  {state} enum value of SolarCheckRegisterState
     */
    public handleNext(state: SolarCheckRegisterState) {
        this._processState(state);
    }

    /**
     * Display the component
     * @param  {state} enum value of SolarCheckRegisterState
     */
    private _processState(state: SolarCheckRegisterState) {
        switch (state) {
            case SolarCheckRegisterState.WELCOME: {
                this._processWelcomeStep();
                break;
            }
            case SolarCheckRegisterState.PREREQUISTE: {
                this._processPrerequisteStep();
                break;
            }
            case SolarCheckRegisterState.UNSUITABLE: {
                this._processUnsuitableStep();
                break;
            }
            case SolarCheckRegisterState.SOLAR_DETAILS: {
                this._processSolarDetailsStep();
                break;
            }
            case SolarCheckRegisterState.REGISTER: {
                this._processRegisterStep();
                break;
            }
            case SolarCheckRegisterState.COMPLETE: {
                this._processComplete();
                break;
            }
            default: {
                this._state = SolarCheckRegisterState.WELCOME;
                break;
            }
        }
        return true;
    }

    /**
     * Show Solar Check Welcome Component
     */
    private _processWelcomeStep() {
        this.hideWelcome = false;
        this.hidePrerequiste = true;
        this.hideUnsuitable = true;
        this.hideSolarDetails = true;
        this.hideRegister = true;
        this.hideComplete = true;
    }

    /**
     * Show Solar Check Prerequisite Component
     */
    private _processPrerequisteStep() {
        this.hideWelcome = true;
        this.hidePrerequiste = false;
        this.hideUnsuitable = true;
        this.hideSolarDetails = true;
        this.hideRegister = true;
        this.hideComplete = true;
    }

    /**
     * Show Solar Check Prerequisite Component
     */
    private _processUnsuitableStep() {
        this.hideWelcome = true;
        this.hidePrerequiste = true;
        this.hideUnsuitable = false;
        this.hideSolarDetails = true;
        this.hideRegister = true;
        this.hideComplete = true;
    }

    /**
     * Show Solar Check Solar Details Component
     */
    private _processSolarDetailsStep() {
        this.hideWelcome = true;
        this.hidePrerequiste = true;
        this.hideUnsuitable = true;
        this.hideSolarDetails = false;
        this.hideRegister = true;
        this.hideComplete = true;
    }

    /**
     * Show Solar Check Register Component
     */
    private _processRegisterStep() {
        this.hideWelcome = true;
        this.hidePrerequiste = true;
        this.hideUnsuitable = true;
        this.hideSolarDetails = true;
        this.hideRegister = false;
        this.hideComplete = true;
    }

    /**
     * Show Solar Check Complete Component
     */
    private _processComplete() {
        this.hideWelcome = true;
        this.hidePrerequiste = true;
        this.hideUnsuitable = true;
        this.hideSolarDetails = true;
        this.hideRegister = true;
        this.hideComplete = false;
    }
}
