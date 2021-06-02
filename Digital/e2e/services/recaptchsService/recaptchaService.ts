import * as request from 'request';
import { promise, browser } from 'protractor';
import { post } from '../../utilities/httpClient';

export function recaptchaBypass(callback): promise.Promise<any> {
    let options = {
            method: 'POST',
            url: 'https://agl.au.auth0.com/oauth/token',
            headers: { 'content-type': 'application/json' },
            body: `{"client_id":"A5YtAyh4UE5zjLg74CpwyoOTjj3R09Nb","client_secret":"MaSnMmFFbWLMoX1yjhMuzIuNKpFMC339NUtv7hJAjTso34yGJfTivSHVGXELQjar","audience":"https://agl.au.webtask.io/","grant_type":"client_credentials"}`
        };

    return post(options, callback);
}

export function bypassRecaptcha(): promise.Promise<any> {
    return recaptchaBypass(parseCaptchaToken);
}

export function parseCaptchaToken(err: Error, responseData?: any): promise.Promise<any> {
    if (err) {
        throw new Error (err.message);
    } else {
        console.log('Successfully fetched access token.');
        let recaptchaResponse = JSON.parse(responseData.body);

        if (recaptchaResponse === undefined) {
            throw new Error ('Recaptcha response is empty');
        } else {
            console.info('Adding recaptcha cookie');
            (browser.manage() as any).addCookie({ name: 'captcha', value: recaptchaResponse.access_token });
            return promise.fulfilled();
        }
    }
}
