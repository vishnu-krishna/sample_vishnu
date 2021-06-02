import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../../shared/service/config.service';
import { ContentService } from '../../shared/service/content.service';
import { MobileMenuComponent } from '../menu/mobileMenu.component';
import { IAuthenticationEventService } from '../services/contract/iauthenticationEvent.service';
import { SecondaryNavigationService } from '../services/secondaryNavigation.service';

@Component({
    selector: 'agl-app-header',
    templateUrl: './headerAuthorised.component.html',
    styleUrls: ['./headerAuthorised.component.scss']
})
export class HeaderAuthorisedComponent implements OnInit {

    @ViewChild('mobileHeader') public _mobileHeader: ElementRef;
    @Input() public menu: MobileMenuComponent;
    @Input() public isShown: boolean = true;

    public logoutUrl: string;
    public isNewLogo: boolean;
    public logoFlagLoaded: boolean;

    constructor(
        private _router: Router,
        private _contentService: ContentService,
        private _configService: ConfigService,
        private authenticationEventService: IAuthenticationEventService,
        public secondaryNavigationService: SecondaryNavigationService
    ) {

        let siteCoreUrl = this._configService.current.aglSiteCoreWebsiteBaseUrl;
        this.logoutUrl = `${siteCoreUrl}/svc/Authorization/LogoutAndRedirect`;

        try {
            if (window.location.host === `localhost:8080`) {
                this.logoutUrl = `https://localhost:8080/mockidentity`;
            }
        } catch (e) {
            console.log(`Could not check current URL`);
        }
    }

    public openMenu() {
        let currentRoute = this._router.routerState.snapshot.url;
        if (currentRoute.includes('/settings/')) {
            this.menu.isSubMenuOpen = !this.menu.isSubMenuOpen;
            this.menu.isOpen = !this.menu.isOpen;
        } else {
            this.menu.isOpen = !this.menu.isOpen;
        }
    }

    public closeMenu() {
        if (this.menu.isOpen || this.menu.isSubMenuOpen) {
            this.menu.isOpen = false;
            this.menu.isSubMenuOpen = false;
        }
    }
    public ngOnInit() {
        this._contentService.load()
        .subscribe((content) => {
            this.isNewLogo = content.selfService.isNewLogo;
            this.logoFlagLoaded = true;
        });
    }

    public logout($event): void {
        $event.preventDefault();
        this.authenticationEventService.clearAuthenticatedEventFlag();
        window.location.href = this.logoutUrl;
     }
}
