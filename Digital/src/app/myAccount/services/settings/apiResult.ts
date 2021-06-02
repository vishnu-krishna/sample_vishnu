import * as apiModel from '../settings/model';

/**
 * Encapsulates the result of an API call.
 *
 * The data and error properties are mutually exclusive, that is,
 * the caller will get data but no error or an error but no data.
 * depending on whether the api call was successful or failed.
 *
 * @class ApiResult
 * @template T
 */
export class ApiResult<T> {
    public data: T;
    public error: apiModel.ApiError;
    constructor(data: T, error?: apiModel.ApiError) {
        this.data = data;
        this.error = error;
    }
}
