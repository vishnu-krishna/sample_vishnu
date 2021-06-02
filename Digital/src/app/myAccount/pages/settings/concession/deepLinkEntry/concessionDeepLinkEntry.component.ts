import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'agl-concession-deep-link-entry',
    templateUrl: 'concessionDeepLinkEntry.component.html',
    styleUrls: ['concessionDeepLinkEntry.component.scss'],
})
export class ConcessionDeepLinkEntryComponent implements OnInit {
    constructor(private router: Router) {
    }

    public ngOnInit(): void {
        /*
           As the AccountService will only work after the required bootstrapping code in MyAccountComponent is run and
           as the additional checks in SettingsComponent are required for concessions (such as light mode protection),
           deep links must instantiate a component.

           Ideally we could deep link directly to a routing guard but this would require a significant refactor of the above logic.
        */
        this.router.navigate(['/settings/concession']).then(() => {
            // Support browser back button by replacing the current url in the browser history
            window.history.replaceState(null, '', '/settings/personal');
        });
    }
}
