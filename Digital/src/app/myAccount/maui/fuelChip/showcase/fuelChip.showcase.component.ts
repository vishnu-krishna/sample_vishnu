import { Component, OnInit } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';

import {
    MauiFuelChipFuelContext,
    MauiFuelChipFuelType,
    MauiFuelChipState,
    MauiSecondaryMessageStatusType
} from '../fuelChip.component.enum';
import {
    FuelChipContract,
    FuelChipContractAccountDetails,
    FuelChipMessage,
    PrimaryMessageLink
} from '../fuelChip.component.model';

@Component({
    selector: 'agl-maui-showcase-fuel-chip',
    templateUrl: './fuelChip.showcase.component.html',
    styleUrls: ['./fuelChip.showcase.component.scss']
})

export class ShowcaseFuelChipComponent implements OnInit {
    public MauiFuelChipState = MauiFuelChipState;
    public MauiFuelChipFuelType = MauiFuelChipFuelType;
    public MauiFuelChipFuelContext = MauiFuelChipFuelContext;

    public singleAccountDetail: FuelChipContractAccountDetails[];
    public singleAccountDetailDuplicate: FuelChipContractAccountDetails[];
    public multiAccountDetails: FuelChipContractAccountDetails[];
    public multiAccountDetailsDuplicate: FuelChipContractAccountDetails[];
    public contractNumber: string = '121212';

    public codeUsage: string = `
                // An e.g of how to use the fuel chip with all available options.
                <agl-maui-fuel-chip [fuelChipState]="MauiFuelChipState.PreSetup | PostSetupComplete | PostSetupManage | Ineligible"
                        [fuelType]="MauiFuelChipFuelType.Electricity | Gas"
                        [fuelContext]="MauiFuelChipFuelContextEnum.None | Bill | Meter  "
                        [contractAccountDetails]="singleAccountDetail"
                        [contractNumber]="contractNumber"
                        (selectorClick)='mySelectorClick()'>
                    <agl-maui-fuel-chip-message
                        [primaryMessage]='primaryMessage'
                        [primaryMessageLink]='primaryMessageLink'
                        (linkClick) = 'myLinkClicked($event)'
                        [secondaryMessage]='secondaryMessage'
                        [secondaryMessageStatus]='MauiSecondaryMessageStatusType.Success | Warning'>
                    </agl-maui-fuel-chip-message>
                    <agl-maui-fuel-chip-footer
                        [cancelText]="cancelMessage"
                        (cancelClick)='myCancelClick()'
                        [tertiaryMessage]="tertiaryMessage">
                    </agl-maui-fuel-chip-footer>
                </agl-maui-fuel-chip>
                `;

    constructor( public sanitizer: DomSanitizer ) {}

    public ngOnInit(): void {

        this.singleAccountDetail = [
            new FuelChipContractAccountDetails('111222333', [
                new FuelChipContract('121212', '123 Blyth St, Brunswick VIC 3056', MauiFuelChipFuelType.Electricity, 'VIC'),
                new FuelChipContract('121213', '123 Blyth St, Brunswick VIC 3056', MauiFuelChipFuelType.Gas, 'VIC')
            ])
        ];

        this.singleAccountDetailDuplicate = [
            new FuelChipContractAccountDetails('111222333', [
                new FuelChipContract('121212', '123 Blyth St, Brunswick VIC 3056', MauiFuelChipFuelType.Gas, 'VIC'),
                new FuelChipContract('121213', '123 Blyth St, Brunswick VIC 3056', MauiFuelChipFuelType.Gas, 'VIC')
            ])
        ];

        this.multiAccountDetails = [
            new FuelChipContractAccountDetails('111222333', [
                new FuelChipContract('121210', '123 Blyth St, Brunswick VIC 3056', MauiFuelChipFuelType.Electricity, 'VIC'),
                new FuelChipContract('121211', '123 Blyth St, Brunswick VIC 3056', MauiFuelChipFuelType.Gas, 'VIC')
            ]),
            new FuelChipContractAccountDetails('111222334', [
                new FuelChipContract('121212', '456 Upton Rd, Windsor VIC 3181', MauiFuelChipFuelType.Gas, 'VIC'),
                new FuelChipContract('121213', '456 Upton Rd, Windsor VIC 3181', MauiFuelChipFuelType.Electricity, 'VIC')
            ])
        ];
        this.multiAccountDetailsDuplicate = [
            new FuelChipContractAccountDetails('111222333', [
                new FuelChipContract('121210', '123 Blyth St, Brunswick VIC 3056', MauiFuelChipFuelType.Gas, 'VIC'),
                new FuelChipContract('121211', '123 Blyth St, Brunswick VIC 3056', MauiFuelChipFuelType.Gas, 'VIC')
            ]),
            new FuelChipContractAccountDetails('111222334', [
                new FuelChipContract('121212', '456 Upton Rd, Windsor VIC 3181', MauiFuelChipFuelType.Gas, 'VIC'),
                new FuelChipContract('121213', '456 Upton Rd, Windsor VIC 3181', MauiFuelChipFuelType.Electricity, 'VIC')
            ])
        ];
    }

    public monthlyBillingMessages(mauiFuelChipState: MauiFuelChipState): FuelChipMessage[] {
        const fuelChipStateToMessagesMap = {
            [MauiFuelChipState.PreSetup]: [
                new FuelChipMessage('Your account is billed quarterly')
            ],
            [MauiFuelChipState.PostSetupManage]: [
                new FuelChipMessage('Your bill is issued on the 1st of every month', new PrimaryMessageLink('key', 'Change'))
            ],
            [MauiFuelChipState.Ineligible]: [
                new FuelChipMessage('Your account is billed quarterly')
            ]
        };
        return fuelChipStateToMessagesMap[mauiFuelChipState] || [];
    }

    public paymentExtensionMessages(mauiFuelChipState: MauiFuelChipState): FuelChipMessage[] {
        const fuelChipStateToMessagesMap = {
            [MauiFuelChipState.PreSetup]: [
                new FuelChipMessage('Total to pay: $245.18', null, 'Overdue by 5 days', MauiSecondaryMessageStatusType.Warning)
            ],
            [MauiFuelChipState.PostSetupComplete]: [
                new FuelChipMessage('Total to pay $245.18', null, 'Extended to Tue 20 Sep 2017', MauiSecondaryMessageStatusType.Success)
            ],
            [MauiFuelChipState.Ineligible]: [
                new FuelChipMessage('Total to pay $245.18', null, 'Overdue to Tue 20 Sep 2017', MauiSecondaryMessageStatusType.Warning)
            ]
        };
        return fuelChipStateToMessagesMap[mauiFuelChipState] || [];
    }

    public billSmoothingMessages(mauiFuelChipState: MauiFuelChipState): FuelChipMessage[] {
        const fuelChipStateToMessagesMap = {
            [MauiFuelChipState.PreSetup]: [
                new FuelChipMessage('You could make fortnightly payments of $34', null, 'You can also choose weekly or monthly payments during setup.')
            ],
            [MauiFuelChipState.PostSetupComplete]: [
                new FuelChipMessage('Total to pay $245.18', null, 'Extended to Tue 20 Sep 2017', MauiSecondaryMessageStatusType.Success)
            ],
            [MauiFuelChipState.Ineligible]: [
                new FuelChipMessage('On AGL Prepaid', null, 'Due Tue 20 Sep 2017')
            ]
        };
        return fuelChipStateToMessagesMap[mauiFuelChipState] || [];
    }

    public selfServiceMeterReadMessages(): FuelChipMessage[] {
        return [
            new FuelChipMessage('Last read date 21 Sep 2017')
        ];
    }

    public mySelectorClick() {
        alert('I have been clicked');
    }

    public myCancelClick() {
        alert('I have been clicked');
    }

    public myLinkClicked(key: string) {
        alert('I have been clicked:' + key);
    }

}
