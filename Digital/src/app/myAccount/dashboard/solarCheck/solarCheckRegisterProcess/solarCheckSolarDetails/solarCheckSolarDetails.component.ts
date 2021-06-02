import { Component, EventEmitter, Injectable, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NativeDateAdapter } from '@angular/material/core';
import { ModalService } from '../../../../modal/modal.service';

import * as moment from 'moment';
import { KeyCodes }  from '../../../../../shared/globals/keyCodes';
import { DateFormat, Locale }  from '../../../../../shared/globals/localisation';
import { SolarDetailsTitleText, SolarDetailsTooltipText, SolarDetailsValidationConstants } from '../../../../../shared/globals/solarCheckConstants';
import { SolarCheckEligibilityContract } from '../../../../../shared/model/solar/solarCheckEligibility.model';
import { SolarCheckPvInfoResponse } from '../../../../../shared/model/solar/solarCheckPvInfoResponse.model';
import { SolarCheckSolarDetailsUpdateType } from '../../../../../shared/model/solar/solarCheckSolarDetails.model';
import { IMessageBusService } from '../../../../../shared/service/contract/imessageBus.service';
import { DataLayerService } from '../../../../../shared/service/dataLayer.service';
import { SolarCheckUpdateDetailsState } from '../../../../pages/settings/solarCheck/systemDetails/updateProcess/solarCheckUpdateDetailsProcess.component';
import { ISolarCheckService } from '../../../../services/contract/isolarCheck.service';
import { SolarCheckEvents, SolarCheckUpdateDetailsMessage } from '../../../../services/solarCheck.service';
import { SolarCheckRegisterState } from '../solarCheckRegisterProcess.component';
import { SolarDetailsValidator } from './solarCheckSolarDetails.validator';

@Injectable()
export class MyDateAdapterService extends NativeDateAdapter {

    public parse(value: any): Date | null {
        if (typeof value === 'number') {
            return new Date(value);
        }

        if (value) {
            return moment(value, DateFormat.AUSTRALIA).toDate();
        } else {
            return null;
        }
    }
}

export const APP_DATE_FORMATS = {
    parse: {
        dateInput: DateFormat.AUSTRALIA,
    },
    display: {
        dateInput: 'input',
        monthYearLabel: { year: 'numeric', month: 'numeric' },
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' },
    }
};
/**
 * Solar Check's Solar Details' component, use this componenet as a form to acquire the necessary user details when registering their system for Solar Check.
 *
 * @export
 * @class SolarCheckSolarDetailsComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'agl-solar-check-solar-details',
    templateUrl: './solarCheckSolarDetails.component.html',
    styleUrls: ['./solarCheckSolarDetails.component.scss']
})

export class SolarCheckSolarDetailsComponent implements OnInit {

    @Input() public contract: SolarCheckEligibilityContract;
    @Input() public scDetailsModel: SolarCheckSolarDetailsUpdateType;
    @Input() public updateReason: SolarCheckUpdateDetailsState;
    @Input() public isUpdate: boolean;

    @Output() public update = new EventEmitter();
    @Output() public next = new EventEmitter<SolarCheckRegisterState>();
    @Output() public back = new EventEmitter<SolarCheckRegisterState>();

    @ViewChild('picker') public datePickerElement;
    @ViewChild('datetoggle') public dateToggleElement;
    @ViewChild('datepickerinput') public datePickerInputElement;

    public solarDetailsForm: FormGroup;
    public submitInProgress: Boolean;
    public hideErrorWhenSubmitting: Boolean;

    // Tooltip Settings and Text
    public solarCheckToolTipSize: string = 'large';
    public solarCheckToolTipPosition: string = 'left';
    public panelQuantiyToolTipHeader: string = SolarDetailsTooltipText.PanelQuantiyToolTipHeaderText;
    public panelQuantityToolTipBody: string = SolarDetailsTooltipText.PanelQuantityToolTipBodyText;
    public systemSizeToolTipHeader: string = SolarDetailsTooltipText.SystemSizeToolTipHeaderText;
    public systemSizeToolTipBody: string = SolarDetailsTooltipText.SystemSizeToolTipBodyText;
    public installationYearToolTipHeader: string = SolarDetailsTooltipText.InstallationYearToolTipHeaderText;
    public installationYearToolTipBody: string = SolarDetailsTooltipText.InstallationYearToolTipBodyText;
    public upgradeDateToolTipHeader: string = SolarDetailsTooltipText.UpgradeDateToolTipHeaderText;
    public upgradeDateToolTipBody: string = SolarDetailsTooltipText.UpgradeDateToolTipBodyText;
    public selectedValue: string = 'Please select an option';

    private originalScDetailsModel: SolarCheckSolarDetailsUpdateType;
    private hasDatePickerBeenOpened: boolean;

    constructor(
        private modalService: ModalService,
        private solarCheckService: ISolarCheckService,
        private formBuilder: FormBuilder,
        private messageBusService: IMessageBusService,
        private dataLayer: DataLayerService
    ) {
        this.scDetailsModel = this.scDetailsModel ? this.scDetailsModel : new SolarCheckSolarDetailsUpdateType();
        moment.locale(Locale.DEFAULT);
    }

    public ngOnInit() {

        this.originalScDetailsModel = this.copyModel(this.scDetailsModel);

        this.solarDetailsForm = this.formBuilder.group({
            panelsQuantity: [this.scDetailsModel.numberPanels, [Validators.required, SolarDetailsValidator.validatePanelQuantity]],
            systemSize: [this.scDetailsModel.systemSizeKw, [Validators.required, SolarDetailsValidator.validateSystemSize]],
            installationYear: [this.scDetailsModel.installationYear, [Validators.required, SolarDetailsValidator.validateInstallationYear]]
        });

        this.solarDetailsForm.get('panelsQuantity').valueChanges.subscribe((data) => this.crossFieldSystemSizeValidation(data));
        if (this.update) {
            this.crossFieldSystemSizeValidation(this.solarDetailsForm.get('panelsQuantity').value);
        }
    }
    public onSystemChange(target) {
        this.selectedValue = target.options[target.selectedIndex].innerHTML;
    }

    public submitSolarDetails() {
        if (this.isUpdate) {
            this.submitInProgress = true;
            this.updateSolarDetails();
        } else {
            this.saveSolarDetails();
            this.next.emit(SolarCheckRegisterState.REGISTER);
        }
    }

    public validUpdateForm() {
        if ((!this.isUpdatedValuesSameAsSaved())
            && this.solarDetailsForm.valid) {

            if (this.isUpdateSystemChange) {
                if (this.effectiveChangedDateValue === null) {
                    return false;
                }
            }

            return true;
        }
        return false;
    }

    /**
     * Modal Navigation
     */
    public tabPrevious(event) {
        if (event.keyCode === KeyCodes.enter) {
            this.previous();
        }
    }

    public tabCloseModal(event) {
        if (event.keyCode === KeyCodes.enter) {
            this.closeModal();
        }
    }

    public previous() {
        if (this.isUpdate) {
            this.resetFormDetails();
        }

        this.back.emit(SolarCheckRegisterState.PREREQUISTE);
    }

    public closeModal() {
        this.modalService.close();
    }

    /**
     * Title Text
     */
    public getTitleText() {
        if (this.isUpdateCorrection) {
            return SolarDetailsTitleText.systemCorrectionTitle;
        } else if (this.isUpdateSystemChange) {
            return SolarDetailsTitleText.systemChangeTitle;
        } else {
            return SolarDetailsTitleText.registerTitle;
        }
    }

    /**
     * Input Formatters
     */
    public onlyNumericCharacters(event) {
        return SolarDetailsValidator.onlyNumericCharacters(event);
    }
    public onlyDecimalOrNumericCharacters(event) {
        return SolarDetailsValidator.onlyDecimalOrNumericCharacters(event);
    }
    public convertToIntegerElseReset(event) {
        return SolarDetailsValidator.convertToIntegerElseReset(event);
    }
    public convertToTwoDecimalPlacesElseReset(event) {
        return SolarDetailsValidator.convertToTwoDecimalPlacesElseReset(event);
    }

    /**
     * Hide or display validation error messages
     */
    public isPanelValidationErrorTextDisplayed() {
        if (this.isUpdate) {
            return this.solarDetailsForm.get('panelsQuantity').dirty &&
                !this.solarDetailsForm.get('panelsQuantity').valid;
        } else {
            return this.solarDetailsForm.get('panelsQuantity').touched &&
                !this.solarDetailsForm.get('panelsQuantity').valid;
        }
    }
    public isSystemSizeError() {
        if (this.isUpdate) {
            return this.solarDetailsForm.get('systemSize').dirty &&
                !this.solarDetailsForm.get('systemSize').valid;
        } else {
            return this.solarDetailsForm.get('systemSize').touched &&
                !this.solarDetailsForm.get('systemSize').valid;
        }
    }
    public isDefaultSystemSizeErrorTextDisplayed() {
        if (this.isUpdate) {
            return (
                !this.solarDetailsForm.get('systemSize').valid &&
                !this.solarDetailsForm.get('panelsQuantity').valid);
        } else {
            return (this.solarDetailsForm.get('systemSize').touched &&
                !this.solarDetailsForm.get('systemSize').valid &&
                !this.solarDetailsForm.get('panelsQuantity').valid);
        }
    }

    public isCalculatedSystemSizeErrorTextDisplayed() {
        if (this.isUpdate) {
            return (
                !this.solarDetailsForm.get('systemSize').valid &&
                this.solarDetailsForm.get('panelsQuantity').valid);
        } else {
            return (this.solarDetailsForm.get('systemSize').touched &&
                !this.solarDetailsForm.get('systemSize').valid &&
                this.solarDetailsForm.get('panelsQuantity').valid);
        }
    }
    public isSystemSizeHintErrorTextDisplayed() {
        if (this.isUpdate) {
            return (this.solarDetailsForm.get('systemSize').valid &&
                this.solarDetailsForm.get('panelsQuantity').valid);
        } else {
            return (this.solarDetailsForm
                    .get('systemSize')
                    .valid &&
                    this.solarDetailsForm.get('panelsQuantity').valid) ||
                (!this.solarDetailsForm.get('systemSize').touched &&
                    !this.solarDetailsForm.get('systemSize').valid &&
                    this.solarDetailsForm.get('panelsQuantity').valid);
        }
    }
    public isInstallationYearErrorTextDisplayed() {
        if (this.isUpdate) {
            return (this.solarDetailsForm.get('installationYear').dirty &&
                !this.solarDetailsForm.get('installationYear').valid);
        } else {
            return (this.solarDetailsForm.get('installationYear').touched &&
                !this.solarDetailsForm.get('installationYear').valid);
        }
    }

    public isSystemChangeDateValidationErrorTextDisplayed() {
        return (this.hasDatePickerBeenOpened && !this.isDatePickerOpen() && this.effectiveChangedDateValue === null);
    }

    public showExistingDetailsUnchangedErrorText() {
        return (this.effectiveChangedDateValue !== null && this.isSystemDetailsSameAsSaved() && !this.hideErrorWhenSubmitting);
    }

    /**
     * Retrieve validation text
     */
    public getPanelQuantiyValidationText() {
        return 'Panel quantity must be between '
            + SolarDetailsValidationConstants.minPanelQuantity
            + ' and ' + SolarDetailsValidationConstants.maxPanelQuantity;
    }
    public getSystemSizeHintText() {
        let inputPanelQuantity = this.solarDetailsForm.get('panelsQuantity').value;
        return 'A system with ' + inputPanelQuantity + ' panels should have a size between '
            + SolarDetailsValidator.convertFloatToTwoDecimalPlaces(SolarDetailsValidator.minSuggestedSystemSize)
            + 'kW and ' + SolarDetailsValidator.convertFloatToTwoDecimalPlaces(SolarDetailsValidator.maxSuggestedSystemSize) + 'kW.';
    }
    public getCalculatedSystemSizeValidationText() {
        let inputPanelQuantity = this.solarDetailsForm.get('panelsQuantity').value;
        return 'A system with ' + inputPanelQuantity + ' panels should have a size between '
            + SolarDetailsValidator.convertFloatToTwoDecimalPlaces(SolarDetailsValidator.minSuggestedSystemSize)
            + 'kW and ' + SolarDetailsValidator.convertFloatToTwoDecimalPlaces(SolarDetailsValidator.maxSuggestedSystemSize)
            + 'kW. Please check your system size and number of panels.';
    }
    public getDefaultSystemSizeValidationText() {
        return 'System size must be from ' +
            SolarDetailsValidator.convertFloatToTwoDecimalPlaces(SolarDetailsValidationConstants.minSystemSize)
            + ' to ' + SolarDetailsValidator.convertFloatToTwoDecimalPlaces(SolarDetailsValidationConstants.maxSystemSize) + ' kW';
    }
    public getInstallationYearValidationText() {
        return 'Installation year must be between ' + SolarDetailsValidationConstants.minInstallationYear
            + ' and ' + SolarDetailsValidator.currentYear;
    }

    public getSystemChangeDateValidationText() {
        return 'Please choose a date.';
    }

    public getSystemChangeDetailsUnchangedErrorText() {
        return 'Please update your system size and/or panels';
    }

    /**
     * Update Details
     */
    public get isUpdateCorrection(): boolean {
        return this.isUpdate &&
            this.updateReason !== null &&
            this.updateReason === SolarCheckUpdateDetailsState.CORRECTION;
    }

    public get isUpdateSystemChange(): boolean {
        return this.isUpdate &&
            this.updateReason !== null &&
            this.updateReason === SolarCheckUpdateDetailsState.UPGRADE;
    }

    public getMinDate() {
        return SolarDetailsValidationConstants.minSystemChangedDate;
    }

    public getMaxDate() {
        return new Date(); // current date
    }

    public markDatePickerOpened(event) {
        if (this.datePickerElement.opened) {
            this.hasDatePickerBeenOpened = true;
        }
    }

    public openDatePickerAndMarkOpened(event) {
        this.datePickerElement.open();

        if (this.datePickerElement.opened) {
            this.hasDatePickerBeenOpened = true;
        }
    }

    public isDatePickerOpen(): boolean {
        return this.datePickerElement.opened;
    }

    public updateDatePickerValue(event) {
        this.scDetailsModel.effectiveChangedDate = moment(this.effectiveChangedDateValue).format(DateFormat.IS0_8601);
    }

    /**
     * Validation
     */
    private isUpdatedValuesSameAsSaved() {

        if (!this.isUpdateSystemChange) {
            if (+this.solarDetailsForm.get('installationYear').value !== +this.scDetailsModel.installationYear) {
                return false;
            }
        }

        if (!this.isSystemDetailsSameAsSaved()) {
            return false;
        }

        return true;
    }

    private isSystemDetailsSameAsSaved() {
        return (+this.solarDetailsForm.get('panelsQuantity').value === +this.scDetailsModel.numberPanels &&
            +SolarDetailsValidator.convertFloatToTwoDecimalPlaces(this.solarDetailsForm.get('systemSize').value) === +this.scDetailsModel.systemSizeKw);
    }

    private get effectiveChangedDateValue(): Date {
        if (this.datePickerInputElement.nativeElement.value === null ||
            this.datePickerInputElement.nativeElement.value === undefined ||
            this.datePickerInputElement.nativeElement.value === '') {
            return null;
        } else {
            let dateString = this.datePickerInputElement.nativeElement.value;
            return moment(dateString, DateFormat.AUSTRALIA).toDate();
        }
    }

    private get isValidUpdateReason(): boolean {
        return this.updateReason !== null &&
            (this.updateReason === SolarCheckUpdateDetailsState.CORRECTION ||
                this.updateReason === SolarCheckUpdateDetailsState.UPGRADE);
    }

    private crossFieldSystemSizeValidation(data?: any) {
        let isPanelQuantityValid = this.solarDetailsForm.get('panelsQuantity').valid;
        if (isPanelQuantityValid) {
            SolarDetailsValidator.calculateSystemSizeRange(data);
        } else {
            SolarDetailsValidator.setSystemSizeRangeToDefault();
            this.solarDetailsForm.get('systemSize').updateValueAndValidity();
        }
        this.solarDetailsForm.get('systemSize').updateValueAndValidity();
    }

    // Reset form details if navigating to previous screen in Update Details
    private resetFormDetails() {
        this.solarDetailsForm.controls['panelsQuantity'].setValue(this.originalScDetailsModel.numberPanels);
        this.solarDetailsForm.controls['systemSize'].setValue(this.originalScDetailsModel.systemSizeKw);
        this.solarDetailsForm.controls['installationYear'].setValue(this.originalScDetailsModel.installationYear);
        this.datePickerInputElement.nativeElement.value = null;
        this.hasDatePickerBeenOpened = false;
    }

    private saveSolarDetails() {
        this.scDetailsModel.numberPanels = this.solarDetailsForm.get('panelsQuantity').value;
        this.scDetailsModel.installationYear = this.solarDetailsForm.get('installationYear').value;
        let unparsedSystemSize = this.solarDetailsForm.get('systemSize').value;
        this.scDetailsModel.systemSizeKw = +SolarDetailsValidator.convertFloatToTwoDecimalPlaces(unparsedSystemSize);
    }

    private copyModel(original) {
        return JSON.parse(JSON.stringify(original));
    }

    private resetModel() { // necessary to use because copyModel will break reference not work as expected
        this.scDetailsModel.numberPanels = this.originalScDetailsModel.numberPanels;
        this.scDetailsModel.systemSizeKw = this.originalScDetailsModel.systemSizeKw;
        this.scDetailsModel.installationYear = this.originalScDetailsModel.installationYear;
    }

    private saveUpdateDetails() {
        if (this.updateReason === SolarCheckUpdateDetailsState.UPGRADE) {
            this.scDetailsModel.systemChanged = true;

            let dateInApiRequiredFormat = moment(this.effectiveChangedDateValue).format(DateFormat.IS0_8601);
            this.scDetailsModel.effectiveChangedDate = dateInApiRequiredFormat;
        } else {
            this.scDetailsModel.systemChanged = false;
            this.scDetailsModel.effectiveChangedDate = null;
        }
    }

    private broadcastSolarSystemUpdate(statusExpectedDate: Date) {

        let solarCheckMessage = new SolarCheckUpdateDetailsMessage();

        if (this.updateReason === SolarCheckUpdateDetailsState.UPGRADE) {
            solarCheckMessage.solarCheckEvent = SolarCheckEvents.systemChange;
            solarCheckMessage.statusExpectedDate = statusExpectedDate;
        } else {
            solarCheckMessage.solarCheckEvent = SolarCheckEvents.systemCorrection;
        }

        this.messageBusService.broadcast(solarCheckMessage);
    }

    private broadcastSolarUpdateError() {
        let solarCheckMessage = new SolarCheckUpdateDetailsMessage();
        solarCheckMessage.solarCheckEvent = SolarCheckEvents.updateError;

        this.messageBusService.broadcast(solarCheckMessage);
    }

    private updateSolarDetails() {
        this.hideErrorWhenSubmitting = true;
        this.saveSolarDetails();
        this.saveUpdateDetails();

        this.solarCheckService.setPVInfo(this.contract.contractNumber, this.scDetailsModel)
            .subscribe(
            (data) => {
                this.solarCheckService.refreshEligibility();

                let pvInfoResponse = data as SolarCheckPvInfoResponse;

                if (pvInfoResponse && pvInfoResponse.statusExpectedDate) {
                    this.dataLayer.pushSccUpdateSystemDetailsModification();
                    this.broadcastSolarSystemUpdate(pvInfoResponse.statusExpectedDate);
                } else {
                    this.dataLayer.pushSccUpdateSystemDetailsCorrection();
                    this.broadcastSolarSystemUpdate(null);
                }

                this.update.emit();
            },
            (error) => {
                console.error('system details: error while trying to update', error);
                this.resetModel();
                if (this.scDetailsModel.systemChanged) {
                    this.dataLayer.pushSccUpdateSystemDetailsModificationError();
                } else {
                    this.dataLayer.pushSccUpdateSystemDetailsCorrectionError();
                }

                this.broadcastSolarUpdateError();
                this.modalService.close();
            },
            () => {
                // completed
                this.submitInProgress = false;
            }
            );
    }
}
