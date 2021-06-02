export class ApiErrorCode {

    public static result = {

        // Server side enum mappings
        400: 'Bad Request',
        401: 'UnAuthorized',
        403: 'Access Denied',
        422: 'Validation Failure',
        500: 'Server Error'
    };
}
