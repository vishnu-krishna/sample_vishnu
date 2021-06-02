import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DateFormat } from '../../../../shared/globals/localisation';
import { RewardsAnalytics } from '../../rewards-analytics';
import { IRewardsService } from '../../services/contract/iRewards.service';
import { PageScroller } from '../../shared/page-scroller';
import { RewardsFlybuysTransaction } from '../../shared/rewards-flybuys-transaction';

@Component({
    selector: 'agl-rewards-flybuys',
    templateUrl: './rewards-flybuys.component.html',
    styleUrls: ['./rewards-flybuys.component.scss']
})
export class RewardsFlybuysComponent implements OnInit, AfterViewChecked {
    public transactions: RewardsFlybuysTransaction[] = [];
    public filteredTransactions: RewardsFlybuysTransaction[] = [];
    public DateFormat: any = DateFormat;
    public loading: boolean = true;
    public loadingError: boolean = false;

    private readonly transactionsPerPage = 5;
    private transactionsPageNum: number = 0;
    private performAnimatedScroll: boolean = false;

    constructor(private rewardsService: IRewardsService, private analytics: RewardsAnalytics) { }

    public ngOnInit() {
        this.rewardsService.getFlybuysSummary().flatMap((summary) => {
            if (summary.isActive()) { // ensure they have access to flybuys and haven't just gone to the route (route guard seems overkill)
                return this.rewardsService.getFlybuys();
            } else {
                return Observable.of([]);
            }
        }).subscribe((results) => {
            this.transactions = results;
            this.filterTransactions();
            this.loading = false;
        }, (error) => {
            console.log(error);
            this.loadingError = true;
            this.loading = false;
        });
    }

    public ngAfterViewChecked() {
        if (this.performAnimatedScroll) {
            this.performAnimatedScroll = false;
            this.scrollToSeeLatestTransactions();
        }
    }

    public viewedAllTransactions() {
        return this.transactionsToView() >= this.transactions.length;
    }

    public transactionListMoreOrLessClick() {
        if (this.viewedAllTransactions()) {
            this.analytics.trackClickFlybuysTransactionsSeeLess();
            this.transactionsPageNum = 0;
            PageScroller.scrollToTop();
            this.filterTransactions();
        } else {
            this.analytics.trackClickFlybuysTransactionsSeeMore();
            this.transactionsPageNum++;
            this.filterTransactions();
            this.performAnimatedScroll = true;
        }
    }

    public showMoreOrLessAction() {
        return this.transactions.length > this.transactionsPerPage;
    }

    public backClick() {
        window.history.back();
    }

    private transactionsToView(): number {
        return this.transactionsPerPage * (this.transactionsPageNum + 1);
    }

    private filterTransactions() {
        this.filteredTransactions = this.transactions.slice(0, this.transactionsToView());
    }

    private scrollToSeeLatestTransactions() {
        const transRem = this.filteredTransactions.length % this.transactionsPerPage;
        const movementPercentage = this.filteredTransactions.length === 0 || transRem === 0 ? 1 : transRem / this.transactionsPerPage;
        PageScroller.scrollIntoView('.transaction-list__action', 25, movementPercentage);
    }
}
