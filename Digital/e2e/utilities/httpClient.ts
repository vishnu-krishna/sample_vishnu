import * as request from 'request';
import { browser, promise } from 'protractor';
import { Context } from '../context';

export function get(options, bearerToken: string = null, callback): promise.Promise<any> {
    let defer = promise.defer();

    let cb = (err, res, body) => {
        if (err) {
            defer.reject(callback(new Error(`Error occurred while fetching data from ${options.url}. Error message: ${err.message}.`)));
        } else if (res) {
            defer.fulfill(callback(null, body.toString()));
        }
    };

    if (bearerToken === null) {
        request(options, cb);
    } else {
        request(options, cb).auth(null, null, true, bearerToken);
    }

    return defer.promise;
}

export function post(options: any, callback): promise.Promise<any> {
    let defer = promise.defer();

    request(options, (err, res, body) => {

        if (err) {
            defer.reject(callback(new Error(`Error occurred while fetching data. Error message: ${err.message}.`)));
        } else if (res && body !== 'Unauthorized') {
            defer.fulfill(callback(null, res));
        }
    });

    return defer.promise;
}
