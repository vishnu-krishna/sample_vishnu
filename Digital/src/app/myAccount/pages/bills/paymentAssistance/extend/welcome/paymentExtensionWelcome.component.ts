import { Component, OnInit } from '@angular/core';
import { AglAuthTokenProvider } from '../../../../../../shared/repository/aglAuthTokenProvider';
import { ConfigService } from '../../../../../../shared/service/config.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'agl-payment-extension-welcome',
    templateUrl: './paymentExtensionWelcome.component.html',
    styleUrls: ['./paymentExtensionWelcome.component.scss']
})
export class PaymentExtensionWelcomeComponent implements OnInit {
    public showPage: boolean = false;
    public destinationRoute = '/bills/paymentassistance/extend/select';
    private forwardingQueryParams: string[] = ['cide'];

    constructor(
        private configService: ConfigService,
        private router: Router,
        private aglAuthTokenProvider: AglAuthTokenProvider,
        private activatedRoute: ActivatedRoute
    ) {}

    public ngOnInit(): void {
        if (this.aglAuthTokenProvider.getToken()) {
            this.configService.routeWithParameters(this.router, this.activatedRoute, this.destinationRoute, this.forwardingQueryParams);
        } else {
            this.showPage = true;
        }
    }

    public login(): void {
        const routeWithParameters = this.configService.getForwardingRouteWithParameters(this.router, this.activatedRoute, this.destinationRoute, this.forwardingQueryParams);
        this.configService.navigateToLoginWithReturnPath(routeWithParameters);
    }

    public register(): void {
        const routeWithParameters = this.configService.getForwardingRouteWithParameters(this.router, this.activatedRoute, this.destinationRoute, this.forwardingQueryParams);
        this.configService.navigateToRegisterWithReturnPath(routeWithParameters);
    }
}
