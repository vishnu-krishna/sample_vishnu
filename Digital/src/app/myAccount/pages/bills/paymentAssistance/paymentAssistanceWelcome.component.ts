import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AglAuthTokenProvider } from '../../../../shared/repository/aglAuthTokenProvider';
import { ConfigService } from '../../../../shared/service/config.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'agl-payment-assistance-welcome',
    templateUrl: './paymentAssistanceWelcome.component.html',
    styleUrls: ['./paymentAssistanceWelcome.component.scss']
})
export class PaymentAssistanceWelcomeComponent implements OnInit {
    public showPage: boolean = false;
    public destinationRoute = '/bills/paymentassistance/select';
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
