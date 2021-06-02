import { Component, HostListener, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { UsageLoadNewContractMessage } from '../../../shared/messages/usageLoadNewContract.message';
import { ConfigService } from '../../../shared/service/config.service';
import { IMessageBusService } from '../../../shared/service/contract/imessageBus.service';
import { DocumentService } from '../../../shared/service/document.service';
import { AccountViewModel, ContractViewModel, IAccountServiceMA } from '../../services/account.service';
import { FeatureFlagService } from '../../services/featureFlag.service';

declare let leanengage: any;

@Component({
    selector: 'agl-account-usage',
    templateUrl: './usage.component.html',
    styleUrls: ['./usage.component.scss']
})
export class UsageComponent implements OnInit {
    public allContractsAreRestricted: boolean = true;
    public selectedFuel: string;
    public accountSelectorExpanded: boolean = false;
    public accountsList: AccountSelectorViewModel[] = [];
    public selectedAccount: AccountSelectorViewModel;
    public chartContractViewModel: ContractViewModel; // The contract that will be shown in the usage graph
    public isBillFreqMessageHidden: boolean = false;
    public isBillFreqChange: boolean;
    public usageHistoryTitle: string;
    public isToolbarLoading: boolean = true;
    public billFrequencyMessage: string = `Not all bill periods are for the same duration of time, keep this in mind when comparing your usage.`;
    public showUsage: boolean = false;
    public toolTipBody: string = `Your usage data includes all your electricity usage up to the last two years at your current address, or from when you joined AGL if you joined within the last two years. Your file may be up to 10MB.`;

    @ViewChild('aglUsageGraph') public aglUsageGraph;

    public ssmrFeatureEnabled: boolean = true;

    constructor(
        public _dom: DocumentService,
        public _accountService: IAccountServiceMA,
        public _messageBusService: IMessageBusService,
        public _config: ConfigService,
        public route: ActivatedRoute,
        public _featureService: FeatureFlagService
    ) { }

    @HostListener('window:click', ['$event'])
    public onClick(event) {
        if (this.accountSelectorExpanded) {
            if (event && event && event.target && event.target.className) {
                let theClass = event.target.className as string;
                if (theClass.indexOf('accountHitArea') === -1) {
                    this.accountSelectorExpanded = false;
                }
            } else {
                this.accountSelectorExpanded = false;
            }
        }
    }

    public downloadUsage() {
        let siteCoreUrl = this._config.current.aglSiteCoreWebsiteBaseUrl;
        let downloadUrl = `${siteCoreUrl}/svc/MyUsage/DownloadConsumptionCSV`;
        window.location.href = downloadUrl;
    }

    public ngOnInit() {
        this._accountService.getAccounts().subscribe(
            (newAccounts) => {

                if (newAccounts.length > 0) {

                    this.accountsList = [];

                    for (let account of newAccounts) {

                        if (account.groupedAddress && account.groupedAddress.length > 0) {

                            // All addresses in the contracts under this account are matching, so they have been grouped.
                            let newAccountSelect = new AccountSelectorViewModel(account.accountNumber);
                            newAccountSelect.groupedAddress = account.groupedAddress;
                            newAccountSelect.contracts = account.contracts;

                            newAccountSelect.elecContracts = account.contracts.filter((p) => p.isElectricity === true);
                            newAccountSelect.gasContracts = account.contracts.filter((p) => p.isGas === true);

                            this.accountsList.push(newAccountSelect);

                        } else {
                            // The addresses under the contracts have mismatches, so we split these into seperate items

                            for (let contract of account.contracts) {

                                let newAccountSelect = new AccountSelectorViewModel(account.accountNumber);
                                if (contract.isElectricity) {
                                    newAccountSelect.elecContracts.push(contract);
                                }
                                if (contract.isGas) {
                                    newAccountSelect.gasContracts.push(contract);
                                }
                                newAccountSelect.mismatchingAddress = contract.address;
                                this.accountsList.push(newAccountSelect);
                            }
                        }
                    }

                    // Select the first account by default
                    this.selectedAccount = this.accountsList[0];
                    this.loadContractsForAccount(this.selectedAccount);
                    this.isToolbarLoading = false;
                } else {
                    alert(`Sorry, we couldn't find any accounts associated with your profile.`);
                }
            }
        );
        this._accountService.areAllAccountContractsRestricted().subscribe((result) => {
            this.allContractsAreRestricted = result;
        });
    }

    public showFeedbackSurvey() {

        let leanAppId = this._config.current.leanEngageAppId;
        let userId = Array.apply(0, Array(15)).map(() => {
            return ((charset) => {
                return charset.charAt(Math.floor(Math.random() * charset.length));
            })('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789');
        }).join('');

        leanengage('start', { user_id: userId, name: 'anonymous', app_id: leanAppId });
        leanengage('triggerSurvey', 'usage-survey');
    }

    public openAeoSolar() {
        window.open(`${this._config.current.aglSiteCoreWebsiteBaseUrl}/aeo/iq/myusage/index?period=WeekView&filter=Usage`);
    }

    public onSelectFuel(selected: string) {
        if (this.selectedFuel === selected) {
            return;
        }
        this.selectedFuel = selected;
        this.isBillFreqChange = false;

        if (selected === 'electricity') {
            let isBillFreqMessageHiddenInStorage = sessionStorage.getItem('isBillFreqMessageHiddenElec' + this.selectedAccount.elecContracts[0].contractNumber);
            if (isBillFreqMessageHiddenInStorage === 'true') {
                this.isBillFreqMessageHidden = true;
            } else {
                this.isBillFreqMessageHidden = false;
            }
            let selectedElecContract = this.selectedAccount.elecContracts[0];
            this.usageHistoryTitle = 'Electricity usage';
            this.loadContract(selectedElecContract);
        } else
            if (selected === 'gas') {
                let isBillFreqMessageHiddenInStorage = sessionStorage.getItem('isBillFreqMessageHiddengas' + this.selectedAccount.gasContracts[0].contractNumber);
                if (isBillFreqMessageHiddenInStorage === 'true') {
                    this.isBillFreqMessageHidden = true;
                } else {
                    this.isBillFreqMessageHidden = false;
                }
                let selectedGasContract = this.selectedAccount.gasContracts[0];
                this.usageHistoryTitle = 'Gas usage';
                this.loadContract(selectedGasContract);
            }

    }

    public onToggleAccountSelector() {
        this.accountSelectorExpanded = !this.accountSelectorExpanded;
    }

    public onSelectAccount(account: AccountSelectorViewModel) {

        this.selectedAccount = account;
        this.loadContractsForAccount(account);
        this.accountSelectorExpanded = false;

    }

    public onChangeSelectedAccount(account: AccountSelectorViewModel) {
        this.loadContractsForAccount(account);
    }

    public loadContractsForAccount(account: AccountSelectorViewModel) {

        this.selectedFuel = ''; // reset the fuel selector

        if (account.elecContracts.length > 0) {
            this.onSelectFuel('electricity');
        } else if (account.gasContracts.length > 0) {
            this.onSelectFuel('gas');
        }
    }

    public onCloseBillFreqMessage() {
        this.isBillFreqMessageHidden = true;
        if (this.selectedFuel === 'electricity') {
            sessionStorage.setItem('isBillFreqMessageHiddenElec' + this.selectedAccount.elecContracts[0].contractNumber, 'true');
        } else
            if (this.selectedFuel === 'gas') {
                sessionStorage.setItem('isBillFreqMessageHiddengas' + this.selectedAccount.gasContracts[0].contractNumber, 'true');
            }
    }

    public handleBillFreqChange($event) {
        this.isBillFreqChange = $event;
    }

    public graphSupportedContract(): boolean {
        if (this.chartContractViewModel && (this.chartContractViewModel.hasElectricVehicle || this.chartContractViewModel.isSolarElec)) {
            return false;
        }
        return true;
    }

    public isElectricVehicle(): boolean {
        if (this.chartContractViewModel && this.chartContractViewModel.hasElectricVehicle) {
            return true;
        }
        return false;
    }

    public hasGas(): boolean {
        return this.accountsList.some((account) => {
            return account.gasContracts.length > 0;
        });
    }

    public isSolarElec(): boolean {
        if (this.chartContractViewModel && this.chartContractViewModel.isSolarElec) {
            return true;
        }
        return false;
    }

    private loadContract(contract: ContractViewModel) {
        this.chartContractViewModel = contract;
        let loadGraphMessage = new UsageLoadNewContractMessage(contract);
        this._messageBusService.broadcast(loadGraphMessage);
    }
}

export class AccountSelectorViewModel extends AccountViewModel {

    public mismatchingAddress: string = '';
    public elecContracts: ContractViewModel[] = [];
    public gasContracts: ContractViewModel[] = [];

    constructor(accountNumber: string) {
        super(accountNumber);
    }

}
