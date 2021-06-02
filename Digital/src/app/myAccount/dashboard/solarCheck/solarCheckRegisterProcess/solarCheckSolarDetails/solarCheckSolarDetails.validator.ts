
import { FormControl } from '@angular/forms/src/model';
import { SolarDetailsValidationConstants } from '../../../../../shared/globals/solarCheckConstants';

import * as moment from 'moment';

export class SolarDetailsValidator {

    public static currentYear: number = moment().year();
    public static minSuggestedSystemSize: number = SolarDetailsValidationConstants.minSystemSize;
    public static maxSuggestedSystemSize: number = SolarDetailsValidationConstants.maxSystemSize;

    public static calculateSystemSizeRange(panelQuantity: any) {
        if (panelQuantity === null || panelQuantity === undefined || isNaN(panelQuantity)) {
            this.setSystemSizeRangeToDefault();
        } else {
            let panelQuantityInt = parseInt(panelQuantity, 10);

            let minSuggestedSystemSize = +(SolarDetailsValidationConstants.minPanelSize * panelQuantityInt).toFixed(2);
            SolarDetailsValidator.minSuggestedSystemSize = Math.max(minSuggestedSystemSize, SolarDetailsValidationConstants.minSystemSize);

            let maxSuggestedSystemSize = +(SolarDetailsValidationConstants.maxPanelSize * panelQuantityInt).toFixed(2);
            SolarDetailsValidator.maxSuggestedSystemSize = Math.min(maxSuggestedSystemSize, SolarDetailsValidationConstants.maxSystemSize);
        }
    }

    public static setSystemSizeRangeToDefault() {
        SolarDetailsValidator.minSuggestedSystemSize = SolarDetailsValidationConstants.minSystemSize;
        SolarDetailsValidator.maxSuggestedSystemSize = SolarDetailsValidationConstants.maxSystemSize;
    }

    public static validatePanelQuantity(control: FormControl) {
        if (control.value === '' || isNaN(parseInt(control.value, 10))) {
            return { panelQuantityError: true };
        } else {
            let valueAsInt = parseInt(control.value, 10);
            if (valueAsInt >= SolarDetailsValidationConstants.minPanelQuantity &&
                valueAsInt <= SolarDetailsValidationConstants.maxPanelQuantity) {
                return null;
            } else {
                return { panelQuantityError: true };
            }
        }
    }

    public static validateSystemSize(control: FormControl) {
        if (control.value === '' || isNaN(control.value)) {
            return { systemSizeError: true };
        } else {
            return parseFloat(control.value) >= SolarDetailsValidator.minSuggestedSystemSize
                && parseFloat(control.value) <= SolarDetailsValidator.maxSuggestedSystemSize
                ? null
                : { systemSizeError: true };
        }
    }

    public static validateInstallationYear(control: FormControl) {
        return parseInt(control.value, 10) >= SolarDetailsValidationConstants.minInstallationYear
            && parseInt(control.value, 10) <= SolarDetailsValidator.currentYear
            ? null
            : { installationYearError: true };
    }
    /*
     * Evaluate's if input event's value is either a numeric character i.e. 0-9
     * @param  {object} event Event from the front-end
     * @return {bool}       boolean value
     */
    public static onlyNumericCharacters(event) {
        let charCode = ((typeof event.which === 'undefined') || event.which === 0) ? event.keyCode : event.which;
        return ((charCode >= 48 && charCode <= 57)
            || this.onlyNavigationCharacters(charCode)
        );
    }

    /*
     * Evaluate's if input event's value is either a numeric character i.e. 0-9, or decimal place character
     * @param  {object} event Event from the front-end
     * @return {bool}       boolean value
     */
    public static onlyDecimalOrNumericCharacters(event) {
        let charCode = ((typeof event.which === 'undefined') || event.which === 0) ? event.keyCode : event.which;
        return (charCode === 46
            || (charCode >= 48 && charCode <= 57)
            || this.onlyNavigationCharacters(charCode)
        );
    }

    /*
     * Evaluate's if input event's value is a valid navigation character
     * i.e. tab, backspace, delete or keypad (left, right, top, down)
     * @param  {object} event Event from the front-end
     * @return {bool}       boolean value
     */
    public static onlyNavigationCharacters(charCode) {
        return (charCode === 9 // allow tab
            || charCode === 8 // allow backspace
            || (charCode >= 37 && charCode <= 39) // allow keypad characters
        );
    }

    /*
    * Change the value to integer, else if invalid then return null.
    * @param  {object} event Event from the front-end
    * @return {number}       Int Number when valid -for example 2 or 84, else null
    */
    public static convertToIntegerElseReset(event) {
        if (event.target.value === '' || isNaN(parseInt(event.target.value, 10))) {
            return event.target.value = null;
        }
        return event.target.value = parseInt(event.target.value, 10);
    }

    /*
     * Change the value to two decimal places, else if invalid then return null.
     * @param  {object} event Event from the front-end
     * @return {number}       Float Number to 2 decimal places when valid -for example 2.74 or 99.36 etc, else null
     */
    public static convertToTwoDecimalPlacesElseReset(event) {
        if (event.target.value === '' || isNaN((event.target.value))) {
            return event.target.value = null;
        }
        return event.target.value = SolarDetailsValidator.convertFloatToTwoDecimalPlaces(event.target.value);
    }

    public static convertFloatToTwoDecimalPlaces(value) {
        if (isNaN(value) || parseFloat(value) < 0.01) {
            return '0.00';
        }
        let decimalRoundingMarginOfError = 0.0049;
        let parsedValue = (parseFloat(value) - decimalRoundingMarginOfError).toFixed(2);
        return parsedValue;
    }
}
