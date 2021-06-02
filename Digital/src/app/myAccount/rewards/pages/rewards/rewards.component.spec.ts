import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';

import { FormatDatePipeModule } from '../../../../shared/pipes/formatDate/formatDatePipe.module';
import { DLSCTATileComponent } from '../../components/ctaTile/dlsCtaTile.component';
import { DLSModule } from '../../components/dls';
import { IRewardsService } from '../../services/contract/iRewards.service';
import { ConfigService } from '../../../../shared/service/config.service';
import { ConfigStubService } from './../../../../test/stubs/config.stub.service';

import { RewardsComponent } from './rewards.component';
import { AGLRewardsBannerComponent } from '../../components/aglrewards-banner/aglrewards-banner.component';
import { RewardsFlybuysTileComponent } from '../../components/flybuys/rewardsFlybuysTile.component';
import { RewardsDiscountTileComponent } from '../../components/discount/rewardsDiscountTile.component';
import { RewardsFlybuysSummary } from '../../shared/rewards-flybuys-summary';
import { RewardsDiscountSummary } from '../../shared/rewards-discount-summary';
import { RewardsDMBannerComponent } from '../../components/dm-banner/rewards-dm-banner.component';
import { AGLRewardsActiveBannerComponent } from '../../components/aglrewards-banner/aglrewards-active-banner.component';
import { BenefitsDashboardComponent } from '../../components/benefits-dashboard/benefits-dashboard.component';
import { BenefitTileComponent } from '../../components/benefit-tile/benefit-tile.component';
import { HorizontalScrollerComponent } from '../../components/horizontal-scroller/horizontal-scroller.component';
import { BenefitsActivationComponent } from '../../components/benefits-activation/benefits-activation.component';
import { RewardsOffer } from '../../shared/rewards-offer';
import { Benefit, BenefitsStatus } from '../../shared/benefit';
import { IMessageBusService } from '../../../../shared/service/contract/imessageBus.service';
import { MessageBusService } from '../../../../shared/service/messageBus.service';
import { MenuIndicatorMessage } from '../../../../shared/messages/menuIndicator.message';
import { WebchatRewardsErrorComponent } from '../../components/webchat-rewards-error/webchat-rewards-error.component';
import { RewardsAnalytics, RewardsAnalyticsMock } from '../../rewards-analytics';
import { IRewardsEligibilityService } from '../../services/contract/iRewardsEligibility.service';
import { RewardsEligibility } from '../../shared/rewards-eligibility';
import { RewardsGenericErrorComponent } from '../../components/rewards-generic-error/rewards-generic-error.component';
import { GenericErrorImageComponent } from '../../../../shared/component/genericError/genericErrorImage/genericErrorImage.component';
import { RemoveHtmlTagsPipe } from '../../shared/remove-html-tags.pipe';

import { MauiButtonModule } from '../../../maui/button';
import { MauiSecondaryNavigationModule } from '../../../maui/secondaryNavigation';

describe('RewardsComponent', () => {
    let comp: RewardsComponent;
    let fixture: ComponentFixture<RewardsComponent>;
    let de: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                DLSModule,
                FormatDatePipeModule,
                RouterTestingModule,
                MatDialogModule,
                MatIconModule,
                MatTooltipModule,
                MauiButtonModule,
                MauiSecondaryNavigationModule
            ],
            declarations: [
                RewardsComponent,
                RewardsFlybuysTileComponent,
                RewardsDiscountTileComponent,
                AGLRewardsBannerComponent,
                RewardsDMBannerComponent,
                AGLRewardsActiveBannerComponent,
                BenefitsDashboardComponent,
                BenefitTileComponent,
                HorizontalScrollerComponent,
                BenefitsActivationComponent,
                DLSCTATileComponent,
                WebchatRewardsErrorComponent,
                RewardsGenericErrorComponent,
                GenericErrorImageComponent,
                RemoveHtmlTagsPipe
            ],
            providers: [
                { provide: ConfigService, useClass: ConfigStubService },
                { provide: IRewardsService, useClass: RewardsServiceMock },
                { provide: IRewardsEligibilityService, useClass: RewardsEligibilityServiceMock },
                { provide: IMessageBusService, useClass: MessageBusService },
                { provide: RewardsAnalytics, useClass: RewardsAnalyticsMock },
                { provide: MATERIAL_SANITY_CHECKS, useValue: false }
            ]
        });

        fixture = TestBed.createComponent(RewardsComponent);
        comp = fixture.componentInstance;

        de = fixture.debugElement;
    });

    it('should load flybuy on init', async(() => {
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            fixture.detectChanges();

            expect(comp.flybuysSummary.summary.totalPoints).toEqual(RewardsServiceMock.flybuysMockData.summary.totalPoints);
            expect(comp.flybuysSummary.isSummaryAvailable).toEqual(RewardsServiceMock.flybuysMockData.isSummaryAvailable);
            expect(comp.flybuysSummary.isAboveMinimumThreshold).toEqual(RewardsServiceMock.flybuysMockData.isAboveMinimumThreshold);
        });
    }));

    it('should load discount summaries on init', async(() => {
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            fixture.detectChanges();

            expect(comp.discountSummary.summary.totalDiscount).toEqual(RewardsServiceMock.discountMockData.summary.totalDiscount);
            expect(comp.discountSummary.isSummaryAvailable).toEqual(RewardsServiceMock.discountMockData.isSummaryAvailable);
            expect(comp.discountSummary.isAboveMinimumThreshold).toEqual(RewardsServiceMock.discountMockData.isAboveMinimumThreshold);
        });
    }));

    it('should load offers on init', async(() => {
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            fixture.detectChanges();

            expect(comp.offers.length).toEqual(2);
            expect(comp.currentOffer.content.heading).toEqual(RewardsServiceMock.offersMockData[0].content.heading);
            expect(comp.currentOffer.content.description).toEqual(RewardsServiceMock.offersMockData[0].content.description);
        });
    }));

    it('should load benefits on init when eligible and activated', async(() => {
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            fixture.detectChanges();

            expect(comp.benefits.length).toEqual(3);
        });
    }));

    it('should hide discount tile if discount summary not available', async(() => {
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            fixture.detectChanges();

            let discountTile = de.query(By.css('agl-rewards-discount-tile'));
            expect(discountTile).not.toBeNull();

            comp.discountSummary.isSummaryAvailable = false;

            fixture.detectChanges();

            discountTile = de.query(By.css('agl-rewards-discount-tile'));
            expect(discountTile).toBeNull();
        });
    }));

    it('should hide flybuys tile if flybuy summary not available', async(() => {
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            fixture.detectChanges();

            let flybuysTile = de.query(By.css('agl-rewards-flybuys-tile'));
            expect(flybuysTile).not.toBeNull();

            comp.flybuysSummary.isSummaryAvailable = false;

            fixture.detectChanges();

            flybuysTile = de.query(By.css('agl-rewards-flybuys-tile'));
            expect(flybuysTile).toBeNull();
        });
    }));

    it('should show fly buys tile in full width when discount tile is not available', async(() => {
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            comp.discountSummary.isSummaryAvailable = false;

            fixture.detectChanges();

            expect(de.query(By.css('.rewards__tile-wrapper--full-width agl-rewards-flybuys-tile'))).not.toBeNull();
        });
    }));

    it('should show discount tile in full width when flybuys tile is not available', async(() => {
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            comp.flybuysSummary.isSummaryAvailable = false;

            fixture.detectChanges();

            expect(de.query(By.css('.rewards__tile-wrapper--full-width agl-rewards-discount-tile'))).not.toBeNull();
        });
    }));

    it('should hide discount tile if not above minimum threshold', async(() => {
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            comp.discountSummary.isAboveMinimumThreshold = false;

            fixture.detectChanges();

            let flybuysTile = de.query(By.css('agl-rewards-flybuys-tile'));
            expect(flybuysTile).not.toBeNull();

            let discountbuysTile = de.query(By.css('agl-rewards-discount-tile'));
            expect(discountbuysTile).toBeNull();
        });
    }));

    it('should hide flybuys tile if not above minimum threshold', async(() => {
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            comp.flybuysSummary.isAboveMinimumThreshold = false;

            fixture.detectChanges();

            let discountbuysTile = de.query(By.css('agl-rewards-discount-tile'));
            expect(discountbuysTile).not.toBeNull();

            let flybuysTile = de.query(By.css('agl-rewards-flybuys-tile'));
            expect(flybuysTile).toBeNull();
        });
    }));

    it('when all offers are redeemed it should call the message bus service to hide the indicator', async(() => {
        fixture.detectChanges();

        fixture.whenStable().then(() => {

            comp.currentOffer.offerRedemmed = true;
            comp.currentOffer.offerClosed = true;

            comp.onOfferClosed();

            expect(comp.currentOffer.offerId).toEqual(comp.offers[1].offerId);

            comp.currentOffer.offerRedemmed = true;
            comp.currentOffer.offerClosed = true;

            let spiedFunction = spyOn(comp.messageBus, 'broadcast');
            comp.onOfferRedeemed();

            expect(spiedFunction.calls.count()).toEqual(1);
            expect(spiedFunction.calls.mostRecent().args[0]).toEqual(new MenuIndicatorMessage('Rewards', false));
            expect(comp.messageBus.broadcast).toHaveBeenCalled();

            comp.onOfferClosed();
            expect(comp.currentOffer).toEqual(null);
        });
    }));

    describe('showActiveStaticBanner', () => {
        it('should return true if benefits eligible, benefits activated and no load error', async(() => {
            comp.isEligibleForBenefits = true;
            comp.isBenefitsActive = true;
            comp.benefitsLoadError = false;

            expect(comp.showActiveStaticBanner()).toBeTruthy();
        }));

        it('should return false if benefits eligible, benefits activated and have load error', async(() => {
            comp.isEligibleForBenefits = true;
            comp.isBenefitsActive = true;
            comp.benefitsLoadError = true;

            expect(comp.showActiveStaticBanner()).toBeFalsy();
        }));

        it('should return false if benefits eligible, benefits no activated and no load error', async(() => {
            comp.isEligibleForBenefits = true;
            comp.isBenefitsActive = false;
            comp.benefitsLoadError = false;

            expect(comp.showActiveStaticBanner()).toBeFalsy();
        }));

        it('should return false if benefits eligible, benefits no activated and have load error', async(() => {
            comp.isEligibleForBenefits = true;
            comp.isBenefitsActive = false;
            comp.benefitsLoadError = true;

            expect(comp.showActiveStaticBanner()).toBeFalsy();
        }));

        it('should return false if not benefits eligible, benefits not activated and no load error', async(() => {
            comp.isEligibleForBenefits = false;
            comp.isBenefitsActive = false;
            comp.benefitsLoadError = false;

            expect(comp.showActiveStaticBanner()).toBeFalsy();
        }));

        it('should return false if benefits not eligible, benefits not activated and have load error', async(() => {
            comp.isEligibleForBenefits = false;
            comp.isBenefitsActive = false;
            comp.benefitsLoadError = true;

            expect(comp.showActiveStaticBanner()).toBeFalsy();
        }));
    });

    it('should show benefits container if eligible and no load error', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            comp.isEligibleForBenefits = true;
            comp.benefitsLoadError = false;
            fixture.detectChanges();

            let benefitsContainer = de.query(By.css('.benefits-container'));
            expect(benefitsContainer).not.toBeNull();

            comp.isEligibleForBenefits = false;
            comp.benefitsLoadError = false;
            fixture.detectChanges();

            benefitsContainer = de.query(By.css('.benefits-container'));
            expect(benefitsContainer).toBeNull();

            comp.isEligibleForBenefits = true;
            comp.benefitsLoadError = true;
            fixture.detectChanges();

            benefitsContainer = de.query(By.css('.benefits-container'));
            expect(benefitsContainer).toBeNull();
        });
    }));

    it('should show benefits dashboard if eligible and has benefits', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            comp.isBenefitsActive = true;
            fixture.detectChanges();

            let aglBenefitsDashboardElem = de.query(By.css('agl-benefits-dashboard'));
            expect(aglBenefitsDashboardElem).not.toBeNull();
        });
    }));

    it('should not show benefits section if eligible but has no benefits', async(() => {
        let rewardsService = fixture.debugElement.injector.get(IRewardsService);
        spyOn(rewardsService, 'getBenefits').and.returnValue(Observable.of([]));

        fixture.detectChanges();
        fixture.whenStable().then(() => {

            fixture.detectChanges();

            let aglBenefitsDashboardElem = de.query(By.css('agl-benefits-dashboard'));
            expect(aglBenefitsDashboardElem).toBeNull();
        });
    }));

    it('should show error page if navigate to AGL Rewards website fails', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            comp.isNavigationToAglRewardsError = true;

            fixture.detectChanges();

            let aglBenefitsDashboardElem = de.query(By.css('.agl-rewards-error'));
            expect(aglBenefitsDashboardElem).not.toBeNull();
        });
    }));

    it('should show benefits activation section if eligible but not active for benefits', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            comp.isBenefitsActive = false;

            fixture.detectChanges();

            let aglBenefitsDashboardElem = de.query(By.css('agl-benefits-dashboard'));
            expect(aglBenefitsDashboardElem).toBeNull();
        });
    }));

    it('should only show benefits section if eligible', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            comp.isEligibleForBenefits = true;
            fixture.detectChanges();

            let aglRewardsElem = de.query(By.css('.benefits-container'));
            expect(aglRewardsElem).not.toBeNull();

            comp.isEligibleForBenefits = false;
            fixture.detectChanges();

            aglRewardsElem = de.query(By.css('.benefits-container'));
            expect(aglRewardsElem).toBeNull();
        });
    }));

    it('should show benefits activation section if not activated', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            comp.isBenefitsActive = false;
            fixture.detectChanges();

            let aglBenefitsActivationElem = de.query(By.css('agl-benefits-activation'));
            let aglBenefitsDashboardElem = de.query(By.css('agl-benefits-dashboard'));
            expect(aglBenefitsActivationElem).not.toBeNull();
            expect(aglBenefitsDashboardElem).toBeNull();

            comp.isBenefitsActive = true;
            fixture.detectChanges();

            aglBenefitsActivationElem = de.query(By.css('agl-benefits-activation'));
            aglBenefitsDashboardElem = de.query(By.css('agl-benefits-dashboard'));
            expect(aglBenefitsActivationElem).toBeNull();
            expect(aglBenefitsDashboardElem).not.toBeNull();
        });
    }));

    it('should show phase 1 static banner if not eligible for benefits', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            comp.isEligibleForBenefits = false;
            fixture.detectChanges();

            const aglRewardsBannerElem = de.query(By.css('agl-rewards-banner'));
            expect(aglRewardsBannerElem).not.toBeNull();

            const aglRewardsActiveBannerElem = de.query(By.css('agl-rewards-active-banner'));
            expect(aglRewardsActiveBannerElem).toBeNull();
        });
    }));

    it('should not show a static banner if eligible for benefits but not activated', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            comp.isEligibleForBenefits = true;
            comp.isBenefitsActive = false;
            fixture.detectChanges();

            const aglRewardsBannerElem = de.query(By.css('agl-rewards-banner'));
            expect(aglRewardsBannerElem).toBeNull();

            const aglRewardsActiveBannerElem = de.query(By.css('agl-rewards-active-banner'));
            expect(aglRewardsActiveBannerElem).toBeNull();
        });
    }));

    it('should show phase 2 static banner if eligible and activated for AGL rewards', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            comp.isEligibleForBenefits = true;
            comp.isBenefitsActive = true;
            fixture.detectChanges();

            const aglRewardsBannerElem = de.query(By.css('agl-rewards-banner'));
            expect(aglRewardsBannerElem).toBeNull();

            const aglRewardsActiveBannerElem = de.query(By.css('agl-rewards-active-banner'));
            expect(aglRewardsActiveBannerElem).not.toBeNull();
        });
    }));

    it('should not show a static banner if there was an error loading the AGL rewards activation status and reward tiles', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            comp.benefitsLoadError = true;
            fixture.detectChanges();

            const aglRewardsBannerElem = de.query(By.css('agl-rewards-banner'));
            expect(aglRewardsBannerElem).toBeNull();

            const aglRewardsActiveBannerElem = de.query(By.css('agl-rewards-active-banner'));
            expect(aglRewardsActiveBannerElem).toBeNull();
        });
    }));
});

class RewardsServiceMock {
    public static readonly discountMockData = {
        isSummaryAvailable: true,
        isAboveMinimumThreshold: true,
        summary: {
          startDate: '2017-05-27',
          totalDiscount: 212.99
        }
    };

    public static readonly flybuysMockData = {
        isSummaryAvailable: true,
        isAboveMinimumThreshold: true,
        summary: {
          totalPoints: 93821
        }
    };

    public static readonly offersMockData = [
        {
            offerId: 'OFFER001',
            contractAccount: 7010009664,
            contractNumber: 9300575245,
            validFrom: '2017-10-01',
            validTo: '2017-10-31',
            offerValue: '50.00',
            offerValueType: 'Dollar',
            offerRedemmed: false,
            offerClosed: false,
            redemptionAttempted: false,
            content: {
                heading: 'Happy Birthday!',
                description: "Celebrate your birthday with $50 credit to your account. We'll apply the points within a month if you redeem the offer. Offer Expires on 19-Dec-2017",
                iconUri: 'svg/birthday_icon.svg',
                callToAction: 'Redeem Offer',
                termsAndConditions: {
                    description: 'This is a Condition A'
                }
            }
        },
        {
            offerId: 'OFFER002',
            contractAccount: 7010009664,
            contractNumber: 9300575245,
            validFrom: '2017-10-01',
            validTo: '2017-10-31',
            offerValue: '50.00',
            offerValueType: 'Dollar',
            offerRedemmed: false,
            offerClosed: false,
            redemptionAttempted: false,
            content: {
                heading: 'Happy Birthday 2!',
                description: "Celebrate your birthday with $50 credit to your account. We'll apply the points within a month if you redeem the offer. Offer Expires on 19-Dec-2017",
                iconUri: 'svg/birthday_icon.svg',
                callToAction: 'Redeem Offer',
                termsAndConditions: {
                    description: 'This is a Condition A'
                }
            }
        }
    ];

    public getDiscountSummary(): Observable<RewardsDiscountSummary> {
        let tmpResult = new RewardsDiscountSummary();
        tmpResult.fromJSON(RewardsServiceMock.discountMockData);
        return Observable.of(tmpResult).delay(100);
    }

    public getFlybuysSummary(): Observable<RewardsFlybuysSummary> {
        let tmpResult = new RewardsFlybuysSummary();
        tmpResult.fromJSON(RewardsServiceMock.flybuysMockData);
        return Observable.of(tmpResult).delay(100);
    }

    public getOffers(): Observable<RewardsOffer[]> {
        let results =  RewardsServiceMock.offersMockData.map((json) => {
            let offer = new RewardsOffer();
            offer.fromJSON(json);
            return offer;
        });
        return Observable.of(results).delay(300);
    }

    public getBenefitsStatus(): Observable<BenefitsStatus> {
       const result = new BenefitsStatus();
       result.isBenefitsStatusActive = true;
       return Observable.of(result);
    }

    public activateBenefits(): Observable<any> {
        return Observable.of(true);
    }

    public getBenefits(): Observable<Benefit[]> {
        return Observable.of(this.getMockBenefits());
    }

    private getMockBenefits(): Benefit[] {
        const benefits: Benefit[] = [];

        let rew = new Benefit();
        rew.title = 'Target Gift Voucher';
        rew.description = 'Up to 10% off';
        benefits.push(rew);

        rew = new Benefit();
        rew.title = 'Myer Gift Card';
        rew.description = 'Up to 10% off on your purchase';
        benefits.push(rew);

        rew = new Benefit();
        rew.title = 'HOYTS movie voucher';
        rew.description = 'Up to 50% off';
        benefits.push(rew);

        return benefits;
    }
}

class RewardsEligibilityServiceMock {
    public checkEligibility(): Observable<RewardsEligibility> {
        let result = new RewardsEligibility();
        result.isEligible = true;

        return Observable.of(result);
    }

    public isEligibleForBenefits(): Observable<boolean> {
        return Observable.of(true);
    }
}
