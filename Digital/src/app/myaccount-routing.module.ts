import { NgModule } from '@angular/core';
import { Event as NavigationEvent, NavigationEnd, NavigationError, Router, RouterModule, Routes } from '@angular/router';
import { DeepLinkRoutingGuard } from './deepLinkRouting.guard';
import { DashboardComponent } from './myAccount/dashboard/dashboard.component';
import { MockIdentityComponent } from './myAccount/mockManager/mockIdentity.component';
import { MyAccountComponent } from './myAccount/myAccount.component';
import { MyAccountUnauthorisedComponent } from './myAccount/myAccountUnauthorised.component';
import { OmmTrackerComponent } from './myAccount/ommtracker/ommTracker.component';
import { OmmTrackerGuard } from './myAccount/ommtracker/ommTracker.guard';
import { BillsComponent } from './myAccount/pages/bills/bills.component';
import { PaymentExtensionWelcomeComponent } from './myAccount/pages/bills/paymentAssistance/extend/welcome/paymentExtensionWelcome.component';
import { PaymentAssistanceRoutingGuard } from './myAccount/pages/bills/paymentAssistance/paymentAssistanceRouting.guard';
import { PaymentAssistanceWelcomeComponent } from './myAccount/pages/bills/paymentAssistance/paymentAssistanceWelcome.component';
import { ContactUsComponent } from './myAccount/pages/contact-us/contact-us.component';
import { MonthlyBillingWelcomeRoutingGuard } from './myAccount/pages/settings/monthlyBilling/welcome/monthlyBillingWelcome.guard';
import { OffersRoutingGuard } from './myAccount/pages/settings/offers/offers-routing.guard';
import { SettingsComponent } from './myAccount/pages/settings/settings.component';
import { SolarCheckComponent } from './myAccount/pages/settings/solarCheck/solarCheck.component';
import { RewardsRoutingGuard } from './myAccount/rewards';
import { HomeProfileRoutingGuard } from './myAccount/pages/settings/homeProfile/homeProfileRouting.guard';
import { ApiService } from './shared/service/api.service';
import { DataLayerService, ModalName, PageType, SiteSubSection } from './shared/service/dataLayer.service';
import { AglAuthTokenProvider } from './shared/repository/aglAuthTokenProvider';
import { NotificationsRoutingGuard } from './myAccount/pages/settings/notifications/notificationsRouting.guard';

export const MyAccountRoutes: Routes = [
    {
        path: 'bills/paymentassistance/welcome',
        component: MyAccountUnauthorisedComponent,
        children: [
            { path: '', component: PaymentExtensionWelcomeComponent },
        ],
    },
    {
        path: 'bills/paymentassistance',
        component: MyAccountUnauthorisedComponent,
        children: [
            { path: '', component: PaymentAssistanceWelcomeComponent, canActivate: [PaymentAssistanceRoutingGuard] }
        ]
    },
    {
        path: '',
        component: MyAccountComponent,
        children: [
            { path: 'overview', component: DashboardComponent },
            { path: 'usage', loadChildren: './myAccount/pages/usage/usage.module#UsageModule' },
            { path: 'bills/paymentassistance', loadChildren: './myAccount/pages/bills/paymentAssistance/paymentAssistance.module#PaymentAssistanceModule' },
            { path: 'bills', component: BillsComponent },
            { path: 'energyinsights', loadChildren: './myAccount/pages/energyInsightsInfo/energyInsightsInfo.module#EnergyInsightsInfoModule' },
            { path: 'rewards', loadChildren: './myAccount/rewards/rewards.module#RewardsModule', canActivate: [RewardsRoutingGuard] },
            {
                path: 'settings',
                component: SettingsComponent,
                children: [
                    { path: 'personal', loadChildren: './myAccount/pages/settings/personal/personal.module#PersonalModule' },
                    { path: 'contactdetails', loadChildren: './myAccount/pages/settings/contactDetails/contactDetails.module#ContactDetailsModule' },
                    { path: 'concession', loadChildren: './myAccount/pages/settings/concession/applyForConcession.module#ApplyForConcessionModule' },
                    { path: 'offers', loadChildren: './myAccount/pages/settings/offers/offers.module#OffersModule', canActivate: [OffersRoutingGuard] },
                    { path: 'billing', loadChildren: './myAccount/pages/settings/billing/billing.module#BillingModule' },
                    { path: 'billsmoothing', loadChildren: './billSmoothing.module#BillSmoothingModule' },
                    { path: 'notifications', loadChildren: './myAccount/pages/settings/notifications/notifications.module#NotificationsModule', canActivate: [NotificationsRoutingGuard] },
                    { path: 'directdebit', loadChildren: './myAccount/pages/settings/directDebit/directDebit.module#DirectDebitModule' },
                    { path: 'homeprofile', loadChildren: './myAccount/pages/settings/homeProfile/homeProfile.module#HomeProfileModule', canActivate: [ HomeProfileRoutingGuard ] },
                    { path: 'smspay', loadChildren: './myAccount/pages/settings/smspay/smspay.module#SMSPayModule' },
                    { path: 'mywallet', loadChildren: './myAccount/pages/settings/myWallet/myWallet.module#MyWalletModule' },
                    { path: 'solar', component: SolarCheckComponent },
                    { path: 'monthlybilling', loadChildren: './myAccount/pages/settings/monthlyBilling/monthlyBilling.module#MonthlyBillingModule' },
                    {
                        path: 'monthlybilling/welcome', loadChildren: './myAccount/pages/settings/monthlyBilling/welcome/monthlyBillingWelcome.module#MonthlyBillingWelcomeModule', canActivate: [MonthlyBillingWelcomeRoutingGuard]
                    },
                    { path: 'energyinsights', loadChildren: './myAccount/pages/settings/energyInsights/energyInsights.module#EnergyInsightsModule' },
                    { path: '', redirectTo: 'personal', pathMatch: 'prefix' }
                ]
            },
            { path: 'help', loadChildren: './myAccount/pages/help/help.module#HelpModule' },
            { path: 'contact-us', component: ContactUsComponent },
            { path: '', component: DashboardComponent, canActivate: [DeepLinkRoutingGuard] }
        ]
    },
    { path: 'mockmanager', redirectTo: 'mockidentity' },
    { path: 'mockidentity', component: MockIdentityComponent },
    { path: 'ommtracker', component: OmmTrackerComponent, canActivate: [OmmTrackerGuard] },
    { path: 'maui', loadChildren: './myAccount/maui/showcase/showcase.module#ShowcaseModule' }
];

@NgModule({
    imports: [RouterModule.forRoot(MyAccountRoutes)],
    exports: [RouterModule]
})
export class MyAccountRoutingModule {
    constructor(private router: Router,
                private dataLayer: DataLayerService, private apiService: ApiService, private tokenProvider: AglAuthTokenProvider) {
        router.events.subscribe((event: NavigationEvent) => {
            /**
             * Available events:
             * NavigationEnd
             * NavigationCancel
             * NavigationError
             * RoutesRecognized
             */
            if (event instanceof NavigationEnd) {
                this.scheduleApplyPageViewMetrics(event);
            }

            if (event instanceof NavigationError) {
                console.error('NavigationError', event);
                this.dataLayer.pushInlineErrorEvent(ModalName.None, 'Failure to navigate to the next page');
            }
        });
    }

    // Wait for the tag to be available then push page change events.
    public scheduleApplyPageViewMetrics(event: any) {
        setTimeout(() => {
            this.applyPageViewMetrics(event);
        }, 100);
    }

    public applyPageViewMetrics(event) {
        if ((<any> window).utag !== undefined) {
            // sometime we need to track a page that redirects to another page,
            // when user is authenticated, we call Tealium tracking function after account is loaded, that can take some time, when it's get called, the page location may have changed to that of the redirected page.
            // that's why we resolve the page href and pathname here, and pass them down
            const href = location.href;
            const pathname = location.pathname;
            if (this.tokenProvider.hasToken()) {
                this.apiService.accountLoadedStatus.subscribe(
                    (result) => {
                        if (result === 'Loaded') {
                            this.dataLayer.pushPageChangeEvent(ModalName.None, PageType.Account, SiteSubSection.None, event.url, href, pathname, true);
                        }
                    }
                );
            } else {
                this.dataLayer.pushPageChangeEvent(ModalName.None, PageType.Account, SiteSubSection.None, event.url, href, pathname, false);
            }
        } else {
            this.scheduleApplyPageViewMetrics(event);
        }
    }
}
