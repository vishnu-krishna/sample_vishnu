import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

export class AglValidators {
    /**
     * @deprecated(use AglValidators.email instead)
     */
    public static validateEmail = ((c: FormControl) => {
        let emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|melbourne|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
        let valid = emailRegex.test(c.value);

        return valid ? null : {
            validateEmail: false
        };
    });

    /**
     * For use in reactive forms. Empty strings or email addresses with a leading/trailing space are considered valid
     */
    public static email(control: AbstractControl): ValidationErrors {
        // we allow a leading or trailing space in form controls as it's more user friendly,
        // for example spaces from copy and paste can be hard to see.
        let value = AglValidators.removeLeadingOrTrailingSpace(control.value || '');

        return AglValidators.isEmailAddressValid(value) ? null : {
            email: control.value
        };
    }

    /**
     * Validate Email addresses using the same rules as the updateContactDetail api. Empty strings are considered valid - use a 'required' validator id you don't wish to support empty values.
     */
    public static isEmailAddressValid(value: string): boolean {
        // this regex matches the one used in the update contact details api
        let emailRegex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-||_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+([a-z]+|\d|-|\.{0,1}|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])?([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;

        return (value || '') === '' || emailRegex.test(value);
    }

    /**
     * For use in reactive forms. Validate Australian phone numbers. Empty strings or phone numbers with a leading/trailing space are considered valid.
     */
    public static mobile(control: AbstractControl): ValidationErrors {
        // we allow a leading or trailing space in form controls as it's more user friendly,
        // for example spaces from copy and paste can be hard to see.
        let value = AglValidators.removeLeadingOrTrailingSpace(control.value || '');

        return AglValidators.isMobileNumberValid(value) ? null : {
            mobile: control.value
        };
    }

    /**
     * Validate Australian phone numbers. Empty strings are considered valid.
     */
    public static isMobileNumberValid(value: string, treatEmptyStringsAsValid: boolean = true): boolean {
        const mobileRegEx = /^(0|\+61)4[0-9]{8}$/;
        const mobileNumber = (value || '').replace(/  |^ | $/g, 'x') /* don't allow double spaces, leading/trailing spaces */
                                          .replace(/ /g, '');  /* only allow single spaces */
        return (mobileNumber === '' && treatEmptyStringsAsValid) || mobileRegEx.test(mobileNumber);
    }

    /**
     * For use in reactive forms. Empty strings or amount with a leading/trailing space are considered valid
     */
    public static decimalField(control: AbstractControl): ValidationErrors {
        // we allow a leading or trailing space in form controls as it's more user friendly,
        // for example spaces from copy and paste can be hard to see.
        let value = AglValidators.removeLeadingOrTrailingSpace(control.value || '');

        return AglValidators.isDecimalValid(value) ? null : {
            amount: control.value
        };
    }

    /**
     * Validate amount string, valid one should have 2 decimal places
     * e.g. 10.10, 0.00, 0, 0.1, 0.11111
     */
    public static isDecimalValid(value: string): boolean {
        const amountRegEx = /^(0|([1-9]\d*))($|\.\d+$)/g;
        const isValid = (value == null || value === '') || amountRegEx.test(value);
        return isValid;
    }

    public static removeLeadingOrTrailingSpace(value: string): string {
        if (/[^ ]+/.test(value)) { /* only trim the spaces if the string contains something other than spaces */
            value = value.replace(/^ | $/g, '');
        }
        return value;
    }

    public static trimLastDot(value: string): string {
        return value.replace(/(?=.*)\.$/, '');
    }

    public static isNullOrEmpty(value): boolean {
        if (value === null || value === '') {
            return true;
        }
        return false;
    }
}
