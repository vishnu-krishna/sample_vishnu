import { HomeProfileNavigationService } from './../homeProfileNavigation.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAccountServiceMA } from '../../../../services/account.service';

@Component({
    selector: 'agl-home-profile-edit',
    templateUrl: './homeProfileEdit.component.html',
    styleUrls: ['./homeProfileEdit.component.scss']
})

export class HomeProfileEditComponent implements OnInit {
    public address: string;
    public accountNumber: string;
    public contractNumber: string;
    public isLoading: boolean = true;

    constructor(
        private route: ActivatedRoute,
        private accountService: IAccountServiceMA,
        private homeProfileNavigationService: HomeProfileNavigationService
    ) {}

    public ngOnInit(): void {
        this.accountNumber = this.route.snapshot.params['accountNumber'];
        this.contractNumber = this.route.snapshot.params['contractNumber'];
        this.accountService.getAccounts()
            .finally(() => this.isLoading = false)
            .subscribe((accounts) => {
                const account = accounts.find((acc) => acc.accountNumber === this.accountNumber);
                if (account) {
                    const contract = account.contracts.find((cont) => cont.contractNumber === this.contractNumber);
                    if (contract) {
                        this.address = account.groupedAddress || contract.address;
                    }
                }
            }, (error) => {
                console.error('Error getting address');
            });
    }

    public backClick() {
        this.homeProfileNavigationService.back();
    }
}
