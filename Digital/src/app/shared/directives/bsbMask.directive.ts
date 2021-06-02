import { Directive, HostListener } from '@angular/core';
import { InputEventHelperService } from '../service/inputEventHelper.service';

@Directive(
    {
        selector: '[aglBsbMask]'
    })

export class BsbMaskDirective {
    constructor(
        private _helperService: InputEventHelperService) {
    }

    @HostListener('keypress', ['$event']) public onKeypress(event) {
        let charCode = (typeof event.which === 'undefined') ? event.keyCode : event.which;
        let charStr = String.fromCharCode(charCode);

        if (this._helperService.validateKeys(event)) {
            return true;
        }

        // only allows numeric characters to be entered
        if (!/\d/.test(charStr)) {
            return false;
        }
        return true;
    }

    @HostListener('paste', ['$event']) public onPaste(event) {
        // this is to support pasting for more than the max length
        let pastedData = event.clipboardData.getData('text');
        let patt = /^[\d-]+$/g;

        // if the wrong pattern then do not paste anything
        if (!patt.test(pastedData)) {
            pastedData = '';
        } else {

            // truncate if trying to paste more than the maxLength
            if (event.target.value &&
                event.target.value.length > 0) {
                if (event.target.selectionStart === event.target.value.length) {
                    pastedData = event.target.value + pastedData;
                } else {
                    let currentValue = event.target.value;
                    pastedData = currentValue.substring(0, event.target.selectionStart) + pastedData + currentValue.slice(event.target.selectionEnd);
                }
            }

            pastedData = pastedData.replace(/[^0-9]/gi, '');

            // if text is greater than 3 then add a dash after 3 characters
            if (pastedData.length > 3) {
                pastedData = pastedData.slice(0, 3) + '-' + pastedData.slice(3);
            }

            if (event.target.maxLength && event.target.maxLength > 0) {
                if (pastedData.length >= event.target.maxLength) {
                    pastedData = pastedData.substring(0, event.target.maxLength);
                }
            }
        }
        setTimeout(() => {
            event.target.value = pastedData;
        }, 0);
    }

    @HostListener('keyup', ['$event']) public onKeyup(event) {
        let charCode = (typeof event.which === 'undefined') ? event.keyCode : event.which;
        if (charCode === 8) { // backspace
            return;
        }
        if (event.target.value && event.target.value.length === 3) {
            event.target.value = event.target.value + '-';
        }

    }
}
