import { AfterContentInit, Component, ContentChild, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList } from '@angular/core';
import { MauiFuelChipFuelContext, MauiFuelChipFuelType, MauiFuelChipState, MauiSecondaryMessageStatusType } from './fuelChip.component.enum';
import { FuelChipContract, FuelChipContractAccountDetails } from './fuelChip.component.model';
import { FuelChipFooterComponent } from './fuelChipFooter/fuelChipFooter.component';
import { FuelChipMessageComponent } from './fuelChipMessage/fuelChipMessage.component';

@Component({
    selector: 'agl-maui-fuel-chip',
    templateUrl: './fuelChip.component.html',
    styleUrls: ['./fuelChip.component.scss']
})

export class FuelChipComponent implements OnInit, AfterContentInit {

    @ContentChildren( FuelChipMessageComponent) public fuelChipMessages: QueryList <FuelChipMessageComponent>;
    @ContentChild(FuelChipFooterComponent) public fuelChipFooterComponent: FuelChipFooterComponent;

    @Input() public fuelChipState: MauiFuelChipState;
    @Input() public fuelType: MauiFuelChipFuelType;
    @Input() public fuelContext: MauiFuelChipFuelContext;
    @Input() public contractNumber: string;
    @Input() public contractAccountDetails: FuelChipContractAccountDetails [];

    @Output() public selectorClick: EventEmitter<string> = new EventEmitter<string>();

    public showBorder: boolean = false;
    public showFooterNoMessageOffset: boolean = false;
    public isElectricity: boolean = true;
    public isGas: boolean = true;
    public isIneligible: boolean = true;
    public isFCStateDisplay: boolean = false;
    public isFCStatePreSetup: boolean = false;
    public FuelChipState = MauiFuelChipState;
    public FuelType = MauiFuelChipFuelType;
    public fuelChipTitle: string;
    public secondaryMessageStatus = MauiSecondaryMessageStatusType;
    public includeMessageWithAddress: boolean;
    public fuelChipNumberTitle: string;
    public fuelChipNumber: string;
    public fuelChipAddress: string;
    public showAccountDetails: boolean;
    public showAccountDetailsDivider: boolean;
    public useNoAccountDetailsOffset: boolean = false;
    public containerHover: boolean = false;
    public selectorHover: boolean = false;
    public cancelText: string;
    public tertiaryMessage: string;
    private accountTitle: string = 'Account no: ';
    private contractTitle: string = 'Contract no: ';

    public ngOnInit() {

        this.showBorder = ((this.fuelChipState === this.FuelChipState.PreSetup && this.containerHover === false ) ||
                           (this.fuelChipState === this.FuelChipState.PostSetupManage  && this.containerHover === false)
                          );
        this.isFCStateDisplay = this.fuelChipState === this.FuelChipState.Display;
        this.isFCStatePreSetup = this.fuelChipState === this.FuelChipState.PreSetup;
        this.isIneligible = (this.fuelChipState === this.FuelChipState.Ineligible);
        this.isElectricity = (this.fuelType === this.FuelType.Electricity);
        this.isGas = (this.fuelType === this.FuelType.Gas);
        this.fuelChipTitle = this.fuelType + ' ' + this.fuelContext;
        this.showAccountDetails = false;
        this.showAccountDetailsDivider = false;
        this.loadAccountDetails();
    }

    public ngAfterContentInit() {

        if (this.fuelChipFooterComponent) {
            if (this.fuelChipFooterComponent.cancelText) {
                this.cancelText = this.fuelChipFooterComponent.cancelText;
            }
            if (this.fuelChipFooterComponent.tertiaryMessage) {
                this.tertiaryMessage = this.fuelChipFooterComponent.tertiaryMessage;
            }

            if (this.fuelChipMessages) {
                if (this.showAccountDetails && this.fuelChipMessages.length === 0) {
                    this.showFooterNoMessageOffset = true;
                }
            }
        }
    }

    public fuelChipClick() {
        if (this.isFCStatePreSetup) { this.selectorClick.emit(); }
    }

    public showFooterSpacerAndBorder(): boolean {
        // only need the footer space and border if we have a footer ( with either the cancel or tertiary message) and we don't have any primary or secondary messages or its a single contract
        return ((this.fuelChipFooterComponent && (this.fuelChipFooterComponent.cancelText || this.fuelChipFooterComponent.tertiaryMessage )) && (this.fuelChipMessages.length > 0));
    }

    private loadAccountDetails() {
        if (this.contractAccountDetails) {
            // deal with single contract account
            if (this.contractAccountDetails.length === 1) {

                let electricityContracts = this.contractAccountDetails[0].contracts.filter((c: FuelChipContract ) => c.fuelType === MauiFuelChipFuelType.Electricity);
                if (electricityContracts && electricityContracts.length >= 1) {
                    // check for the contract in question
                    let electricityContract = electricityContracts.find((c: FuelChipContract ) => c.contractNumber === this.contractNumber);
                    if (electricityContract) {
                        this.fuelChipAddress = electricityContract.address;
                    }
                }

                let gasContracts = this.contractAccountDetails[0].contracts.filter((c: FuelChipContract ) => c.fuelType === MauiFuelChipFuelType.Gas);
                if (gasContracts && gasContracts.length >= 1) {
                    // check for the contract in question
                    let gasContract = gasContracts.find((c: FuelChipContract ) => c.contractNumber === this.contractNumber);
                    if (gasContract) {
                        this.fuelChipAddress = gasContract.address;
                    }
                }
                this.fuelChipNumberTitle = this.contractTitle;
                this.fuelChipNumber = this.contractNumber;

                // if contract account has a duplicate fuel of elec or Gas have then need to show the address
                if ((electricityContracts && electricityContracts.length > 1) ||
                    (gasContracts && gasContracts.length > 1)) {
                        this.showAccountDetails = true;
                        this.showAccountDetailsDivider = true;
                }

            } else { // multi contract account

                let tmpContractAccount: FuelChipContractAccountDetails;
                let electricityContracts: FuelChipContract [];
                let gasContracts: FuelChipContract [];
                let duplicateFuelsFound: boolean = false;

                for (let a of this.contractAccountDetails) {
                    // find the contract account that contains the contract number in question
                    if (a.contracts.find((c: FuelChipContract ) => c.contractNumber === this.contractNumber)) {
                        tmpContractAccount = a;
                    }
                    // determine if any of the contract accounts has duplicate fuels
                    electricityContracts = a.contracts.filter((c: FuelChipContract ) => c.fuelType ===  MauiFuelChipFuelType.Electricity);
                    gasContracts = a.contracts.filter((c: FuelChipContract ) => c.fuelType ===  MauiFuelChipFuelType.Gas);
                    if ((electricityContracts && electricityContracts.length > 1) || (gasContracts && gasContracts.length > 1)) {
                        duplicateFuelsFound = true;
                    }
                }

                // get the contract with the contract number in question
                let contract = tmpContractAccount.contracts.find((c: FuelChipContract ) => c.contractNumber === this.contractNumber);
                this.fuelChipAddress = contract.address;
                this.showAccountDetails = true;
                this.showAccountDetailsDivider = true;

                if (duplicateFuelsFound) {
                    this.fuelChipNumberTitle = this.contractTitle;
                    this.fuelChipNumber = this.contractNumber;
                } else {
                    this.fuelChipNumberTitle = this.accountTitle;
                    this.fuelChipNumber = tmpContractAccount.accountNumber;
                }
            }

            if (this.fuelChipState === this.FuelChipState.Display) {
                this.showAccountDetailsDivider = true;
                this.useNoAccountDetailsOffset = !this.showAccountDetails && this.showAccountDetailsDivider;
            }

            this.includeMessageWithAddress = this.showAccountDetails;

        }
    }
}
