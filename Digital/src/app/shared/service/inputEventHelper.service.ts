import { Injectable }           from '@angular/core';

@Injectable()
export class InputEventHelperService {

    public validateKeys(event): boolean {
        if (event.which === 8 || // backspace
            event.ctrlKey) {
                return true;
            }
        if (event.which === 0) {
            if (event.keyCode === 9 ||  // tab - this is for mozilla - must use keycode here
                event.keyCode === 13 || // enter - this is for mozilla - must use keycode here
                event.keyCode === 46 || // delete button
                (event.keyCode >= 33 && event.keyCode <= 40) || // pgup pgdown, home, end, arrow buttons
                event.keyCode === 39 || // right button
                event.keyCode === 45 || // insert button
                (event.keyCode >= 112 && event.keyCode <= 123)) { // function keys F1 - F12 - mozilla only!
                return true;
            }
        }
        return false;
    }

    public getPastedDataWithRegEx(event: any, regEx: RegExp): string {
        let pastedData = event.clipboardData.getData('text');

        // if the wrong pattern then do not paste anything
        // if (!regEx.test(pastedData)) {
        //     pastedData = '';
        // } else {
        // this function will return pasted data without the characters specified in the regular expression passed in
        pastedData = pastedData.replace(regEx, '');

        if (event.target.value &&
            event.target.value.length > 0) {
            if (event.target.selectionStart === event.target.value.length) {
                pastedData = event.target.value + pastedData;
            } else {
                let currentValue = event.target.value;
                pastedData = currentValue.substring(0, event.target.selectionStart) + pastedData + currentValue.slice(event.target.selectionEnd);
            }
        }
        // check the total length of pasted data
        if (event.target.maxLength && event.target.maxLength > 0) {
            if (pastedData.length >= event.target.maxLength) {
                pastedData = pastedData.substring(0, event.target.maxLength);
            }
        }

        return pastedData;
    }
}
