import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, NavigationExtras, Router } from '@angular/router';

@Injectable()
export class DeepLinkRoutingGuard implements CanActivate {
  constructor(private router: Router) { }
    public canActivate(route: ActivatedRouteSnapshot): boolean {

      let defaultRoute = '/overview';

      let queryArgs = JSON.parse(sessionStorage.getItem('queryArgs'));
      if (queryArgs) {
        let navigateUrl = queryArgs['navigateurl'];

        if (navigateUrl) {
          let navParts: string = navigateUrl.split('?');
          let navPath: string = navParts[0];
          let navParam: string = navParts[1];

          let navExtras: NavigationExtras = this.BuildNavigationExtrasFromQueryParams(navParam);

          // remove the navigateUrl value so that navigation is only ever triggered once
          this.removeNavigateUrlFromStoredQueryArgs(queryArgs);

          this.router.navigate([navPath], navExtras)
                     .catch((e) => {
                        console.error('Route not found, redirecting...');
                        this.router.navigate([defaultRoute]);
                     });
        } else {
          this.router.navigate([defaultRoute]);
        }
      } else {
        this.router.navigate([defaultRoute]);
      }
      return true;
    }

    private BuildNavigationExtrasFromQueryParams(queryString: string): NavigationExtras {
      let navExtras: NavigationExtras;

      if (queryString) {
        let navParams: string[] = queryString.split('&');

        navExtras = { queryParams: {} };

        navParams.forEach((param: string) => {
          let pair = param.split('=');
          navExtras.queryParams[pair[0]] = pair[1];
        });
      }

      return navExtras;
    }

    private removeNavigateUrlFromStoredQueryArgs(queryArgs: any) {
        let newQueryArgs = queryArgs;
        delete newQueryArgs['navigateurl'];
        sessionStorage.setItem('queryArgs', JSON.stringify(newQueryArgs));
    }
}
