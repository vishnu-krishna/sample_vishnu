import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { GenericErrorImageModule } from '../../../../shared/component/genericError/genericErrorImage/genericErrorImage.module';
import { LoadingModule } from '../../../../shared/loaders/loading.module';
import { FormatDatePipeModule } from '../../../../shared/pipes/formatDate/formatDatePipe.module';
import { DLSModule } from '../../components/dls';

import 'rxjs/Rx';
import { WebchatRewardsErrorComponent } from '../../components/webchat-rewards-error/webchat-rewards-error.component';
import { RewardsAnalytics, RewardsAnalyticsMock } from '../../rewards-analytics';
import { IRewardsService } from '../../services/contract/iRewards.service';
import { RewardsDiscountSummary } from '../../shared/rewards-discount-summary';
import { RewardsFlybuysSummary } from '../../shared/rewards-flybuys-summary';
import { RewardsFlybuysTransaction } from '../../shared/rewards-flybuys-transaction';
import { RewardsFlybuysComponent } from './rewards-flybuys.component';

import { MauiButtonModule } from '../../../maui/button';
import { MauiSecondaryNavigationModule } from '../../../maui/secondaryNavigation';

describe('RewardsFlybuysComponent', () => {
    let comp: RewardsFlybuysComponent;
    let fixture: ComponentFixture<RewardsFlybuysComponent>;
    let de: DebugElement;

    beforeEach(() => {
        (window as any).lpTag = {
            newPage: () => {
                return;
            }
        };

        TestBed.configureTestingModule({
            imports: [
                DLSModule,
                LoadingModule,
                FormatDatePipeModule,
                GenericErrorImageModule,
                MauiButtonModule,
                MauiSecondaryNavigationModule
            ],
            declarations: [
                RewardsFlybuysComponent,
                WebchatRewardsErrorComponent
            ],
            providers: [
                { provide: IRewardsService, useClass: RewardsServiceMock },
                { provide: RewardsAnalytics, useClass: RewardsAnalyticsMock },
                { provide: MATERIAL_SANITY_CHECKS, useValue: false }
            ]
        });

        fixture = TestBed.createComponent(RewardsFlybuysComponent);
        comp = fixture.componentInstance;

        de = fixture.debugElement;
    });

    it('should load flybuy transactions on init', async(() => {
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            fixture.detectChanges();

            expect(comp.transactions.length).toEqual(RewardsServiceMock.mockFlybuysTransactionsCount);
            expect(comp.transactions[0].transactionDescription).toEqual(RewardsServiceMock.flybuysMockTransaction.transactionDescription);
            expect(comp.transactions[0].extractionDate).toEqual(RewardsServiceMock.flybuysMockTransaction.extractionDate);
            expect(comp.transactions[0].points).toEqual(RewardsServiceMock.flybuysMockTransaction.points);
        });
    }));

    it('should only show five transactions initially', async(() => {
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            fixture.detectChanges();

            expect(comp.filteredTransactions.length).toEqual(5);
        });
    }));

    it('should allow more transactions to be shown', async(() => {
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            fixture.detectChanges();

            comp.transactionListMoreOrLessClick();
            expect(comp.filteredTransactions.length).toEqual(10);

            comp.transactionListMoreOrLessClick();
            expect(comp.filteredTransactions.length).toEqual(15);

            comp.transactionListMoreOrLessClick();
            expect(comp.filteredTransactions.length).toEqual(comp.transactions.length);
        });
    }));

    it('should allow less transactions to be shown after viewing them all', async(() => {
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            fixture.detectChanges();

            const actionLink = de.query(By.css('.transaction-list__action .action__text')).nativeElement;
            expect(actionLink.textContent).toContain('See more');

            comp.transactionListMoreOrLessClick();
            comp.transactionListMoreOrLessClick();
            comp.transactionListMoreOrLessClick();

            fixture.detectChanges();

            expect(comp.viewedAllTransactions()).toBeTruthy();
            expect(actionLink.textContent).toContain('See less');

            comp.transactionListMoreOrLessClick();

            expect(comp.filteredTransactions.length).toEqual(5);
        });
    }));
});

class RewardsServiceMock {

    public static readonly flybuysMockData = {
        isSummaryAvailable: true,
        isAboveMinimumThreshold: true,
        summary: {
            totalPoints: 93821
        }
    };

    public static readonly mockFlybuysTransactionsCount = 17;

    public static readonly flybuysMockTransaction = {
        contractAccount: 7010009664,
        contractNumber: 9300575245,
        lineNumber: '1',
        extractionDate: '2017-12-24',
        transactionDescription: 'Credit Bonus to account',
        points: 1402,
        pointsTransactionType: 'Credit'
    };

    public getFlybuysSummary(): Observable<RewardsFlybuysSummary> {
        let tmpResult = new RewardsFlybuysSummary();
        tmpResult.fromJSON(RewardsServiceMock.flybuysMockData);
        return Observable.of(tmpResult).delay(100);
    }

    public getFlybuys(): Observable<RewardsFlybuysTransaction[]> {
        let results: RewardsFlybuysTransaction[] = [];

        for (let i = 0; i < RewardsServiceMock.mockFlybuysTransactionsCount; i++) {
            let transaction = new RewardsFlybuysTransaction();
            transaction.contractNumber += i;
            transaction.fromJSON(RewardsServiceMock.flybuysMockTransaction);
            results.push(transaction);
        }

        return Observable.of(results).delay(200);

    }

    public getDiscountSummary(): Observable<RewardsDiscountSummary> {
        throw new Error('RewardsService.getDiscountSummary has not been mocked properly.');
    }
}
