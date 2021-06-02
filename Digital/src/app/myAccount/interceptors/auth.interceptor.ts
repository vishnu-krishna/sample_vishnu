import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { AglAuthTokenProvider } from '../../shared/repository/aglAuthTokenProvider';
import { ConfigService } from '../../shared/service/config.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private token: string;
    private allowedBaseUrls: string[] = [];

    constructor(
        private authTokenProvider: AglAuthTokenProvider,
        private configService: ConfigService,
    ) {
        this.token = this.authTokenProvider.getToken();
        // Create the whitelist of URL's
        this.allowedBaseUrls.push(this.configService.current.aglEnergyInsightsApiBaseUrl);
        this.allowedBaseUrls.push(this.configService.current.aglHomeProfileApi);
    }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let onWhitelist: boolean = this.allowedBaseUrls.some((url: string) => {
            return (request.url.includes(url));
        });
        if (onWhitelist) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.token}`
                }
            });
            return next.handle(request)
                .do(
                    (event: HttpEvent<any>) => {
                        //
                    },
                    (error: any) => {
                        if (error instanceof HttpErrorResponse) {
                            if (error.status === 401) {
                                window.location.href = this.configService.getEnvironmentLogoutUrl;
                            }
                        }
                    }
                );
        } else {
            return next.handle(request);
        }
    }
}
