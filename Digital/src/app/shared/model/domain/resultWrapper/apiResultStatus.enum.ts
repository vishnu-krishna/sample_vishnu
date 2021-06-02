export class ApiResultStatus {

    public static result = {

        // Server side enum mappings
        unknown: 'unknown',
        ok: 'ok',
        invalidRequest: 'invalidRequest',
        serverError: 'serverError',
        sapError: 'sapError',
        sapUnavailable: 'sapUnavailable',

        // Client side mappings
        invalidPod: 'invalidPod',
        transportError: 'transportError',

    };
}
