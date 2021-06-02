import { Directive, HostListener } from '@angular/core';
import { InputEventHelperService } from '../service/inputEventHelper.service';

@Directive(
    {
        selector: '[aglCurrencyField]'
    })

export class CurrencyFieldDirective {
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
        if (!/[\d\.]/.test(charStr)) {
            return false;
        }
        if (event.target.maxLength && event.target.maxLength > 0) {
            if (event.target.value.length >= event.target.maxLength) {
                return false;
            }
        }
        return true;
    }

    @HostListener('paste', ['$event']) public  onPaste(event) {
        if (event.target.type === 'number') {
            return;
        }
        let pastedData = this._helperService.getPastedDataWithRegEx(event, /[^0-9\.]/gi);

        setTimeout(() => {
            event.target.value = pastedData;
        }, 0);
    }

}
