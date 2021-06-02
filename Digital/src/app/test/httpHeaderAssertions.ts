import { MockConnection } from '@angular/http/testing';

export class HttpHeaderAssertions {

    public assertSecureCORS(connection: MockConnection, shouldExist: boolean = true) {
        if (shouldExist) {
            expect(connection.request.withCredentials).toBe(true, `The request did not specify 'withCredentials' as true`);
        } else {
            expect(connection.request.withCredentials).toBeFalsy(`The request should not specify 'withCredentials' as true`);
        }
    }

    public assertCorrelationId(connection: MockConnection, shouldExist: boolean) {
        let xCorIdHeader = connection.request.headers.get('x-correlation-id');
        if (shouldExist) {
            expect(xCorIdHeader).toBeTruthy(`The x-correlation-id header is mandatory`);
            expect(xCorIdHeader.length).toEqual(36, `The x-correlation-id was not of the required length`);
        } else {
            expect(xCorIdHeader).toBeFalsy(`The x-correlation-id header was present, but should not be`);
        }
    }

    public assertAuthHeader(connection: MockConnection, shouldExist: boolean) {
        let authHeader = connection.request.headers.get('Authorization');
        if (shouldExist) {
            expect(authHeader).toBeTruthy(`There was no authorisation header present`);
            expect(authHeader).toEqual(`Bearer mocktoken`, `The authorisation header was not in the required format`);
        } else {
            expect(authHeader).toBeFalsy(`The auth header was sent for this call, but should not be. Possible security issue.`);
        }
    }
}
