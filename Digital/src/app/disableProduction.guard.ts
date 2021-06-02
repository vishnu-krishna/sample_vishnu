import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class DisableProductionGuard implements CanActivate {

    public canActivate(): boolean {
        const productionDomain = 'agl.com.au';
        const isNotOnProduction = window.location.host.indexOf(productionDomain) === -1;
        return isNotOnProduction;
    }
}
