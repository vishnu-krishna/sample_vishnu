import { Injectable } from '@angular/core';
import { IConfig } from '../../../shared/service/config.service';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class ConfigMockService {

    /**
     * Get config settings for the current environment.
     */
    public current: IConfig;

    public getEnvironmentName() {
        throw new Error('replaceWindowLocation is not implemented');
    }

    public navigateToLoginWithReturnPath(path?: string): void {
        throw new Error('navigateToLoginWithReturnPath is not implemented');
    }

    public navigateToRegisterWithReturnPath(path?: string): void {
        throw new Error('navigateToRegisterWithReturnPath is not implemented');
    }

    public replaceWindowLocation(newLocation: string) {
        throw new Error('replaceWindowLocation is not implemented');
    }

    public routeWithParameters(router: Router, activatedRoute: ActivatedRoute, destinationRoute: String, queryParamsWhiteList: string[]): void {
        throw new Error('routeWithParameters is not implemented');
    }

    public getForwardingRouteWithParameters(router: Router, activatedRoute: ActivatedRoute, destinationRoute: String, queryParamsWhiteList: string[]): string {
        throw new Error('getForwardingRouteWithParameters is not implemented');
    }
}
