import { Observable, Observer } from 'rxjs';
import * as request from 'request';

export class RequestHelpers {

    public static RequestAsync(requestOptions: request.Options): Observable<ResponseModel> {
        return new Observable<any>((observer: Observer<any>) => {
            request(requestOptions, (error: any, response: request.RequestResponse, body: any) => {
                if (error) {
                    observer.error(error);
                }
                observer.next(new ResponseModel(response, body));
                observer.complete();
            });
        });
    }

}

export class ResponseModel {
    constructor(
        public response: request.RequestResponse,
        public body: any
    ) {

    }
}
