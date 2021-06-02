import { browser, by, element, $, $$, ElementFinder } from 'protractor';
import * as protractor from 'protractor';
import { Context } from './context';

// TODO: move out
export const Pages = {
    homepage: {
        myAccountLink: $('.primary-nav__button.primary-nav__button--account')
    },
    logout: '/aeo/logout' // non-local only
};
