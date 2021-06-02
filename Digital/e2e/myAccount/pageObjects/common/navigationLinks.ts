import { browser, by, element, $, $$ } from 'protractor';
import * as waits from '../../../utilities/waits';

export const navigationLinks = {
    topNavWhite: {
        residential: $('a[href="/residential"]'),
        business: $('a[href="/business"]'),
        aboutAgl: $('a[href="/about-agl"]'),
        myAccount: $('a[href="/sts/account/login"]')
    }
};
