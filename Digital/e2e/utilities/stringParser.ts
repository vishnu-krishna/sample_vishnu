import { promise } from 'protractor';
import { upperFirst, words } from 'lodash';

export function formatAccountNumber(text: string): promise.Promise<string> {
    let digitArray = text.split('');

    const accountNumberLengthMapper = {
        6: () => digitArray.splice(3, 0, ' '),
        8: () => digitArray.splice(4, 0, ' '),
        10: () => {
            digitArray.splice(4, 0, ' ');
            digitArray.splice(8, 0, ' ');
        }
    };
    accountNumberLengthMapper[digitArray.length]();

    let formattedAccountNumber = digitArray.join();
    formattedAccountNumber = formattedAccountNumber.replace(/,/g, '');
    return promise.fulfilled(formattedAccountNumber);
}

export function formatAddress(text: string): promise.Promise<string> {
    let textWords = words(text.replace(/\|/g, ' | '), /[0-9A-z\/|]+/g);
    textWords.forEach((word, index) => {
        if (![textWords.length - 1, textWords.length - 2].includes(index)) {
            word = word.toLowerCase();
            textWords[index] = upperFirst(word);
        }
    });

    let formattedAddress = textWords.join().replace(/,/g, ' ').replace(/\s[|]/g, ',');
    return promise.fulfilled(formattedAddress);
}
