import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { Guid } from '../../shared/utils/guid';

@Injectable()
export class CorrelationIdInterceptor implements HttpInterceptor {

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            setHeaders: {
                'X-Correlation-Id': Guid.newGuid(),
            }
        });

        return next.handle(request);
    }
}
