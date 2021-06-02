import { sessionStorage } from './../../utilities/storage';
import { browser, by, element, $, $$ } from 'protractor';
import { ProtractorExtensions } from '../../../src/app/shared/e2e/protractor.extensions';
import { Context } from '../../context';
import { settings } from '../pageObjects/settings';
import { User } from '../../enums/enums';
import { goToPage } from '../../utilities/navigator';

let e2e = new ProtractorExtensions();

/// Currently not part of the smoke test suite
describe('smoke test', () => {

    let user;
    let context: Context;

    beforeAll(() => {
        context = new Context(browser.params.environment);
    });

    afterAll(() => {
        context.logout();
    });

    describe('with a typical user', () => {

        beforeAll(() => {
            user = context.getUser(User.Default);
        });

        describe('in a desktop viewport', () => {
            beforeAll(() => {
                context.setWindowSize(e2e.screenSizes.desktop);
            });

            describe('navigateUrl query string param set to deep link from IIS redirects through to billsmoothing via Auth0', () => {
                it('Should show the bill smoothing page', () => {
                    let deepLinkPath = '/settings/billsmoothing';

                    if (context.isLocalEnv()) {
                        context.authenticateAsUser(user); // We don't redirect through the auth0 username/password pages locally so setup a login using mockserver
                        goToPage(deepLinkPath);
                    } else {
                        goToPage(deepLinkPath);
                        context.enterCredentials(user); // the Auth0 username/password pages
                    }

                    const heading = settings.billSmoothingHeadingText;
                    expect(heading.isDisplayed()).toBe(true);
                    expect(heading.getText()).toBe('Bill Smoothing');
                });
            });

            describe('Bearer token in query string', () => {
                it('Should copy bearer token to sessionStorage Bearer value', () => {
                    let expectedBearerVal = 'someTokenVal';
                    let queryString = `?bearer=${expectedBearerVal}`;

                    goToPage('/' + queryString);
                    expect(sessionStorage.getStorageItem('Bearer')).toBe(expectedBearerVal);
                });
            });

            describe('Params other than bearer token in query string', () => {
                it('Should copy params to sessionStorage queryArgs value', () => {
                    let queryString = '?key1=val1&key2=val2&bearer=someToken&navigateUrl=' + encodeURIComponent('/somePath');

                    goToPage('/' + queryString);

                    expect(sessionStorage.getStorageItem('queryArgs')).toBe('{"key1":"val1","key2":"val2","navigateurl":"/somePath"}');
                });
            });

            describe('Params in query string and path set (like after a paypal redirect)', () => {
                it('Should retain params in query string', () => {
                    context.authenticateAsUser(user);
                    goToPage('/settings/billsmoothing?key1=val1&key2=val2');

                    const heading = settings.billSmoothingHeadingText;
                    expect(heading.isDisplayed()).toBe(true);
                    expect(heading.getText()).toEqual('Bill Smoothing');
                    expect(context.getWindowLocationQueryString()).toBe('?key1=val1&key2=val2');
                });
            });
        });
    });
});
