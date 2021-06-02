import { FormControl } from '@angular/forms';
import { AglValidators } from './aglValidators';

describe('mobile number validation', () => {
    describe('is valid', () => {
        let data = [
            ['empty string', ''],
            ['null', null],
            ['with single spaces xxxx xxx xxx', '0404 111 222'],
            ['with single spaces xx xxxx xxxx', '04 0411 1222'],
            ['with no spaces', '0404111222'],
            ['with +61 international format', '+61404111222'],
            ['with +61 international format and spaces', '+614 0411 1222']
        ];

        for (let val of data) {
            it(val[0], () => {
                expect(AglValidators.isMobileNumberValid(val[1])).toBe(true);
            });
        }
    });

    describe('is form control valid', () => {
        let data = [
            ['with leading space', ' 0404 111 222'],
            ['with trailing space', '0404 111 222 ']
        ];

        for (let val of data) {
            it(val[0], () => {
                expect(AglValidators.mobile(new FormControl(val[1]))).toBeNull();
            });
        }
    });

    describe('is invalid', () => {
        let data = [
            ['all spaces', '          '],
            ['with multiple spaces', '0404   111  222'],
            ['when 9 digits', '040411223'],
            ['when 11 digits', '04041122334'],
            ['with leading space', ' 0404 111 222'],
            ['with trailing space', '0404 111 222 '],
            ['when not starting with "04"', '0304111222'],
            ['when starting with "61" (not +61)', '61404111222'],
            ['with invalid +14 international format', '+1404111222'],
            ['with hyphens', '0408-123-222'],
            ['with spaces and hyphens', '1800 123-222'],
            ['with brackets', '(03) 9310 1234'],
            ['with embedded alphabetical characters', '0441x122434'],
            ['with leading alphabetical characters', 'mob:0441c122434'],
            ['with trailing alphabetical characters', '0404111222x'],
        ];

        for (let val of data) {
            it(val[0], () => {
                expect(AglValidators.isMobileNumberValid(val[1])).toBe(false);
            });
        }
    });

    describe('when empty string is passed ', () => {
        let value = '';
        it('and treatEmptyStringsAsValid is passed as false, it should return as false', () => {
            expect(AglValidators.isMobileNumberValid(value, false)).toBe(false);
        });
        it('and treatEmptyStringsAsValid is passed as true, it should return as true', () => {
            expect(AglValidators.isMobileNumberValid(value, true)).toBe(true);
        });
        it('and treatEmptyStringsAsValid is not passed, it should return as true', () => {
            expect(AglValidators.isMobileNumberValid(value)).toBe(true);
        });
    });

    describe('is form control invalid', () => {
        let data = [
            ['with only a space', ' '],
            ['with an invalid phone number', '0404 111 22'],
        ];

        for (let val of data) {
            it(val[0], () => {
                expect(AglValidators.mobile(new FormControl(val[1]))).toEqual({ mobile: val[1] });
            });
        }
    });
});

describe('email validation', () => {
    describe('is valid', () => {
        let data = [
            ['empty string', ''],
            ['null', null],
            ['no special chars . in local-part', 'firstname@domain.com'],
            ['really long value - the regex should not hang', 'firstname.lastname.more.more.more.more.more.more.more.more.more.more.more.more.more.more@domain.com.more.more.more.more.more.more.more.more.more.more.more.more.more.more.com'],
            ['contains . in local-part', 'firstname.lastname@domain.com'],
            ['contains + in local-part', 'firstname+lastname@domain.com'],
            ['contains _ in local-part', 'firstname_lastname@domain.com'],
            ['contains an apostrophe in local-part', 'firstname\'lastname@domain.com'],
            ['contains a . in subdomain', 'email@subdomain.domain.com'],
            ['contains a - in subdomain', 'email@subdomain-domain.com'],
            ['contains digits', 'some123@agl.com'],
            ['contains uppercase characters', 'VALID@AGL.COM']
        ];

        for (let val of data) {
            it(val[0], () => {
                expect(AglValidators.isEmailAddressValid(val[1])).toBe(true);
            });
        }
    });

    describe('is form control valid', () => {
        let data = [
            ['leading spaces', ' email@agl.com'],
            ['trailing spaces', 'email@agl.com ']
        ];

        for (let val of data) {
            it(val[0], () => {
                expect(AglValidators.email(new FormControl(val[1]))).toBeNull();
            });
        }
    });

    describe('is invalid', () => {
        let data = [
            ['all spaces', '   '],
            ['missing local-part: @domain.com', '@domain.com'],
            ['local domain name@local (technically this is valid but we don\'t accept it)', 'a@a'],
            ['encoded with html: Joe Smith<email@domain.com>', 'JoeSmith <email@domain.com>'],
            ['no @ character', 'email.domain.com'],
            ['ends with @', 'email.domain.com'],
            ['multiple @', 'email@domain@domain.com'],
            ['local-part begins with a .', '.email@domain.com'],
            ['local-part ends with a .', 'email.@domain.com'],
            ['domain ends with a .', 'test@test.'],
            ['local-part  contains a ..', 'email..email@domain.com'],
            ['leading spaces', ' email@agl.com'],
            ['trailing spaces', 'email@agl.com '],
            ['trailing text', 'email@domain.com (Joe Smith)']
        ];

        for (let val of data) {
            it(val[0], () => {
                expect(AglValidators.isEmailAddressValid(val[1])).toBe(false);
            });
        }
    });

    describe('is form control invalid', () => {
        let data = [
            ['with only a space', ' '],
            ['with an invalid email', 'invalid@agl'],
        ];

        for (let val of data) {
            it(val[0], () => {
                expect(AglValidators.email(new FormControl(val[1]))).toEqual({ email: val[1] });
            });
        }
    });
});

describe('decimal validation', () => {
    describe('is valid', () => {
        let data = [
            ['0', '0'],
            ['1', '1'],
            ['1.1', '1.1'],
            ['1.11111', '1.11111'],
            ['1.00', '1.00'],
            ['0.1', '0.1']
        ];

        for (let val of data) {
            it(val[0], () => {
                expect(AglValidators.isDecimalValid(val[1])).toBe(true);
            });
        }
    });

    describe('is not valid', () => {
        let data = [
            ['01', '01'],
            ['a', 'a'],
            ['#', '#'],
            ['1.111.11', '1.111.11'],
            ['1.', '1.'],
            ['00.1', '00.1']
        ];

        for (let val of data) {
            it(val[0], () => {
                expect(AglValidators.isDecimalValid(val[1])).toBe(false);
            });
        }
    });

    describe('trimLastDot', () => {
        let data = [
            ['1.', '1'],
            ['1.1.', '1.1'],
            ['1.1.1', '1.1.1'],
            ['.', ''],
            ['a.', 'a'],
            ['..', '.']
        ];

        for (let val of data) {
            it(val[0], () => {
                expect(AglValidators.trimLastDot(val[0])).toBe(val[1]);
            });
        }
    });

    describe('isNullOrEmpty', () => {
        it('null', () => {
            expect(AglValidators.isNullOrEmpty(null)).toBe(true);
        });

        it('empty', () => {
            expect(AglValidators.isNullOrEmpty('')).toBe(true);
        });

        it('undefined', () => {
            expect(AglValidators.isNullOrEmpty(undefined)).toBe(false);
        });

        it('letter', () => {
            expect(AglValidators.isNullOrEmpty('a')).toBe(false);
        });

        it('number', () => {
            expect(AglValidators.isNullOrEmpty(1)).toBe(false);
        });
    });
});
