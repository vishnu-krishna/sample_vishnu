import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';
import { groupBy } from 'lodash';

import { ApiService } from '../../../../../shared/service/api.service';
import { AccountViewModel, AccountService, ContractViewModel } from '../../../../services/account.service';
import { EnergyInsightsService } from '../../../../services/energyInsights.service';
import { FuelChipContractAccountDetails, FuelChipContract, PrimaryMessageLink } from '../../../../maui/fuelChip';
import { MauiFuelChipFuelContext, MauiFuelChipFuelType, MauiFuelChipState } from '../../../../maui/fuelChip/fuelChip.component.enum';
import { ContractEnergyInsightsModel } from '../../../../services/settings/model/contractEnergyInsightsModel';
import { EnergyInsightSubscriptionRoutes, EnergyInsightsEntryPointRoutes } from '../energyInsightsRouteConstants';

@Component({
    selector: 'agl-energy-insights-choose-service',
    templateUrl: 'energyInsightsChooseService.component.html',
    styleUrls: ['energyInsightsChooseService.component.scss']
})

export class EnergyInsightsChooseServiceComponent implements OnInit {
    public isLoading: boolean = false;
    public MauiFuelChipFuelType = MauiFuelChipFuelType;
    public MauiFuelChipState = MauiFuelChipState;
    public MauiFuelChipFuelContext = MauiFuelChipFuelContext;
    public changeButton: PrimaryMessageLink = new PrimaryMessageLink('key', 'Change');
    public hasPostSetupContracts: boolean = false;
    public hasPreSetupContracts: boolean = false;
    public hasIneligibleContracts: boolean = false;
    public goBackClicked: boolean = false;
    public energyInsightsAccounts: ContractEnergyInsightsModel[][];
    public preSetupHeading: string;
    public displayBackButton: boolean = false;

    constructor(
        public energyInsightsService: EnergyInsightsService,
        public router: Router,
        public location: Location,
    ) {

    }
    public ngOnInit() {
        if (!this.energyInsightsService.energyInsightsContracts) {
            this.router.navigate([EnergyInsightSubscriptionRoutes.Landing]);
        }
        this.displayBackButton = this.energyInsightsService.shouldDisplayBackButton();
        this.hasPostSetupContracts = this.energyInsightsService.hasPostSetupContracts();
        this.hasPreSetupContracts = this.energyInsightsService.hasPreSetupContracts();
        this.hasIneligibleContracts = this.energyInsightsService.hasIneligibleContracts();
        if (this.hasPostSetupContracts) {
            this.preSetupHeading = `Would you like to receive Energy Insights emails for the below services?`;
        } else {
            this.preSetupHeading = `Which service do you want to receive Energy Insights emails for?`;
        }

        let energyInsightsAccountList = groupBy(this.energyInsightsService.energyInsightsContracts, 'accountNumber');
        this.energyInsightsAccounts = Object.keys(energyInsightsAccountList).map((key) => {
            return energyInsightsAccountList[key] ;
           });
    }

    public CreateFuelChipContractAccountDetails(contractDetails: ContractEnergyInsightsModel): FuelChipContractAccountDetails[] {
        let fuelChipContractAccountDetailList: FuelChipContractAccountDetails[] = [];
        fuelChipContractAccountDetailList = this.energyInsightsAccounts.map((contractListForAccount) => {
            let fuelChipContractAccountDetail: FuelChipContractAccountDetails;
            let accountNumber: string;
            let fuelChipContractList: FuelChipContract[] = [];
            fuelChipContractList = contractListForAccount.map((energyInsightsContractDetails) => {
                accountNumber = energyInsightsContractDetails.accountNumber;
                let fuelChipContract = new FuelChipContract(energyInsightsContractDetails.contract.contractNumber, energyInsightsContractDetails.address, this.getMauiFuelChipFuelType(energyInsightsContractDetails.contract),  '');
                return fuelChipContract;
            });
            return new FuelChipContractAccountDetails(accountNumber, fuelChipContractList);
        });
        return fuelChipContractAccountDetailList;
    }

    public getMauiFuelChipFuelType(contract: ContractViewModel): MauiFuelChipFuelType  {
        if (contract.isElectricity)   {
            return MauiFuelChipFuelType.Electricity;
        } else if (contract.isGas) {
            return MauiFuelChipFuelType.Gas;
        }
    }

    public getFuelChipMessage(contractDetails: ContractEnergyInsightsModel ): string {
        let message: string;
        if (contractDetails.energyInsightsEligibility.isEligible &&
            contractDetails.energyInsightsEligibility.subscribedToMidBillEnergyBreakdown &&
            contractDetails.energyInsightsEligibility.subscribedToEndBillEnergyBreakdown) {
            message = `You’ve subscribed to receive both Mid Bill update and Energy Insights report`;
        } else if (contractDetails.energyInsightsEligibility.isEligible &&
                    contractDetails.energyInsightsEligibility.subscribedToMidBillEnergyBreakdown) {
            message = `You’ve subscribed to receive the Mid Bill Update`;
        } else if (contractDetails.energyInsightsEligibility.isEligible &&
                    contractDetails.energyInsightsEligibility.subscribedToEndBillEnergyBreakdown) {
            message = `You’ve subscribed to receive the Energy Insights report`;
        } else if (contractDetails.energyInsightsEligibility.isEligible &&
                    !contractDetails.energyInsightsEligibility.subscribedToMidBillEnergyBreakdown &&
                    !contractDetails.energyInsightsEligibility.subscribedToEndBillEnergyBreakdown) {
            message = `Switch on to receive Energy Insights emails`;
        } else if (!contractDetails.energyInsightsEligibility.isEligible && contractDetails.contract.isGas) {
            message = `Sorry, Energy Insights isn’t available for gas accounts.`;
        } else if (!contractDetails.energyInsightsEligibility.isEligible && contractDetails.contract.isElectricity) {
            if ( contractDetails.energyInsightsEligibility.ineligibleReason.internal.number === `032` ) {
                message = `You’ll need to register for eBilling before you can sign up for Energy Insights.`;
            } else {
                message = contractDetails.energyInsightsEligibility.ineligibilityMessage;
            }
        }
        return message;
    }

    public contractClicked(contractDetails: ContractEnergyInsightsModel): void {
        this.energyInsightsService.selectedEnergyInsightsContract = contractDetails; // setting the selected contract
        this.router.navigate([EnergyInsightSubscriptionRoutes.Subscription]);
    }

    public goBack(): void {
        if (!this.goBackClicked) {
            this.goBackClicked = true;
            this.router.navigate([EnergyInsightsEntryPointRoutes.Overview]);
        }
    }

    public preSetupContracts(): ContractEnergyInsightsModel[] {
        return this.energyInsightsService.energyInsightsContractsPreSetup;
    }
}
