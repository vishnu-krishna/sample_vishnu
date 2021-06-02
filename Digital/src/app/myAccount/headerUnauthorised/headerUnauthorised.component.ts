import { Component } from '@angular/core';
import { SecondaryNavigationService } from '../services/secondaryNavigation.service';

@Component({
    selector: 'agl-app-header-unauthorised',
    templateUrl: './headerUnauthorised.component.html',
    styleUrls: ['./headerUnauthorised.component.scss']
})
export class HeaderUnauthorisedComponent {
    constructor(
        public secondaryNavigationService: SecondaryNavigationService
    ) {}
}
