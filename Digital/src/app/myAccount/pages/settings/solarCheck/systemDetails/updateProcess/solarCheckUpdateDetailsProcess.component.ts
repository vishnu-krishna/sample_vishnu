import { Component, Input, OnInit } from '@angular/core';

import { SolarCheckSolarDetailsUpdateType } from '../../../../../../shared/model/solar/solarCheckSolarDetails.model';

export enum SolarCheckUpdateDetailsState {
    REASON = <any> 'REASON',
    CORRECTION = <any> 'CORRECTION',
    UPGRADE = <any> 'UPGRADE'
}

@Component ({
    selector: 'agl-solar-check-update-details-process',
    templateUrl: './solarCheckUpdateDetailsProcess.component.html',
    styleUrls: []
})

export class SolarCheckUpdateDetailsProcessComponent implements OnInit {

    @Input() public contractNumber: string;
    @Input() public scDetailsModel: SolarCheckSolarDetailsUpdateType;

    public hideReason: boolean;
    public hideUpdate: boolean;
    public updateReason: SolarCheckUpdateDetailsState = null;

    private state: SolarCheckUpdateDetailsState;

    constructor() {
        this.scDetailsModel = new SolarCheckSolarDetailsUpdateType();
    }

    public ngOnInit(): void {
        this.processState(SolarCheckUpdateDetailsState.REASON);
    }

    /**
     * Event listener to handle incoming state
     * @param  {state} enum value of SolarCheckRegisterState
     */
    public handlePrevious(state: SolarCheckUpdateDetailsState) {
        this.processState(state);
    }

    /**
     * Event listener to handle incoming state
     * @param  {state} enum value of SolarCheckRegisterState
     */
    public handleNext(state: SolarCheckUpdateDetailsState) {
        this.processState(state);
    }

    /**
     * Display the component
     * @param  {state} enum value of SolarCheckUpdateDetailsState
     */
    private processState(state: SolarCheckUpdateDetailsState) {

        switch (state) {
            case SolarCheckUpdateDetailsState.REASON: {
                this.processReasonStep();
                break;
            }
            case SolarCheckUpdateDetailsState.CORRECTION:
            case SolarCheckUpdateDetailsState.UPGRADE: {
                this.updateReason = state;
                this.processUpdateStep();
                break;
            }
            default: {
                this.state = SolarCheckUpdateDetailsState.REASON;
                this.processReasonStep();
                break;
            }
        }
        return true;
    }

    /**
     * Show Solar Check Welcome Component
     */
    private processReasonStep() {
        this.hideReason = false;
        this.hideUpdate = true;
    }

    /**
     * Show Solar Check Update Correction Component
     */
    private processUpdateStep() {
        this.hideReason = true;
        this.hideUpdate = false;
    }
}
