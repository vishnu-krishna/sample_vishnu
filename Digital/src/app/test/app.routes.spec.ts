import { DeepLinkRoutingGuard } from '../deepLinkRouting.guard';
import { MyAccountRoutes } from '../myaccount-routing.module';
import { DashboardComponent } from '../myAccount/dashboard/dashboard.component';
import { MockIdentityComponent } from '../myAccount/mockManager/mockIdentity.component';
// Components - Warning DO NOT BARREL THESE as AOT depends on direct paths to components.
import { MyAccountComponent } from '../myAccount/myAccount.component';
import { OmmTrackerComponent } from '../myAccount/ommtracker/ommTracker.component';
import { OmmTrackerGuard } from '../myAccount/ommtracker/ommTracker.guard';
import { BillsComponent } from '../myAccount/pages/bills/bills.component';
import { ContactUsComponent } from '../myAccount/pages/contact-us/contact-us.component';
import { OffersRoutingGuard } from '../myAccount/pages/settings/offers/offers-routing.guard';
import { SettingsComponent } from '../myAccount/pages/settings/settings.component';
import { SolarCheckComponent } from '../myAccount/pages/settings/solarCheck/solarCheck.component';
import { RewardsRoutingGuard } from '../myAccount/rewards/rewards-routing.guard';

describe('The top level routes', () => {
    it('should contain routes for mockmanager', () => {
        expect(MyAccountRoutes).toContain({ path: 'mockmanager', redirectTo: 'mockidentity' });
    });

    it('should contain routes for mockidentity', () => {
        expect(MyAccountRoutes).toContain({ path: 'mockidentity', component: MockIdentityComponent });
    });

    it('should contain routes for ommtracker', () => {
        expect(MyAccountRoutes).toContain({
            path: 'ommtracker',
            component: OmmTrackerComponent,
            canActivate: [OmmTrackerGuard]
        });
    });
});

describe('The First level routes', () => {
    MyAccountRoutes.forEach((child) => {
        if (child.path === '') {
            it('the default path to be myaccount component', () => {
                expect(child.component).toEqual(MyAccountComponent);
            });
            describe('The Second level routes', () => {
                it('Should contain Overview component', () => {
                    expect(child.children).toContain({ path: 'overview', component: DashboardComponent });
                });
                it('Should contain Usage component', () => {
                    expect(child.children).toContain({ path: 'usage', loadChildren: './myAccount/pages/usage/usage.module#UsageModule' });
                });
                it('Should contain Bills component', () => {
                    expect(child.children).toContain({ path: 'bills', component: BillsComponent });
                });
                it('Should contain Rewards component', () => {
                    expect(child.children).toContain({ path: 'rewards', loadChildren: './myAccount/rewards/rewards.module#RewardsModule',  canActivate: [ RewardsRoutingGuard ] });
                });
                it('Should contain Help component', () => {
                    expect(child.children).toContain({ path: 'help', loadChildren: './myAccount/pages/help/help.module#HelpModule' });
                });
                it('Should contain Contact us component', () => {
                    expect(child.children).toContain({ path: 'contact-us', component: ContactUsComponent });
                });
                it('Should contain Dashboard component', () => {
                    expect(child.children).toContain({
                        path: '',
                        component: DashboardComponent,
                        canActivate: [DeepLinkRoutingGuard]
                    });
                });
                describe('The Third level routes', () => {
                    child.children.forEach((secSubChild) => {
                        if (secSubChild.path === 'settings') {
                            it('Should contain Settings component', () => {
                                expect(secSubChild.component).toEqual(SettingsComponent);
                            });
                            it('Should contain Personal component', () => {
                                expect(secSubChild.children).toContain({
                                    path: 'personal',
                                    loadChildren: './myAccount/pages/settings/personal/personal.module#PersonalModule'
                                });
                            });
                            it('Should contain ContactDetails component', () => {
                                expect(secSubChild.children).toContain({
                                    path: 'contactdetails',
                                    loadChildren: './myAccount/pages/settings/contactDetails/contactDetails.module#ContactDetailsModule'
                                });
                            });
                            it('Should contain Concession component', () => {
                                expect(secSubChild.children).toContain({
                                    path: 'concession',
                                    loadChildren: './myAccount/pages/settings/concession/applyForConcession.module#ApplyForConcessionModule'
                                });
                            });
                            it('Should contain Offers component', () => {
                                expect(secSubChild.children).toContain({
                                    path: 'offers',
                                    loadChildren: './myAccount/pages/settings/offers/offers.module#OffersModule',
                                    canActivate: [ OffersRoutingGuard ]
                                });
                            });
                            it('Should contain Billing component', () => {
                                expect(secSubChild.children).toContain({
                                    path: 'billing',
                                    loadChildren: './myAccount/pages/settings/billing/billing.module#BillingModule'
                                });
                            });
                            it('Should contain BillSmooting component', () => {
                                expect(secSubChild.children).toContain({
                                    path: 'billsmoothing',
                                    loadChildren: './billSmoothing.module#BillSmoothingModule'
                                });
                            });
                            it('Should contain DirectDebit component', () => {
                                expect(secSubChild.children).toContain({
                                    path: 'directdebit',
                                    loadChildren: './myAccount/pages/settings/directDebit/directDebit.module#DirectDebitModule'
                                });
                            });
                            it('Should contain SMSPay component', () => {
                                expect(secSubChild.children).toContain({
                                    path: 'smspay',
                                    loadChildren: './myAccount/pages/settings/smspay/smspay.module#SMSPayModule'
                                });
                            });
                            it('Should contain MonthlyBilling component', () => {
                                expect(secSubChild.children).toContain({
                                    path: 'monthlybilling',
                                    loadChildren: './myAccount/pages/settings/monthlyBilling/monthlyBilling.module#MonthlyBillingModule'
                                });
                            });
                            it('Should contain MyWallet component', () => {
                                expect(secSubChild.children).toContain({
                                    path: 'mywallet',
                                    loadChildren: './myAccount/pages/settings/myWallet/myWallet.module#MyWalletModule'
                                });
                            });
                            it('Should contain Solar component', () => {
                                expect(secSubChild.children).toContain({
                                    path: 'solar',
                                    component: SolarCheckComponent
                                });
                            });
                        }
                    });
                });
            });
        }
    });
});
