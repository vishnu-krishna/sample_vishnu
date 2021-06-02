import { AccountDetailComponentModel } from '../../../../myAccount/settings/accountDetail/accountDetail.component';
import { AlertType } from '../../../../shared/globals/alertType';
import { BillDeliveryMethodType } from '../../../services/settings/model/billDeliveryMethodType';
import {
    AlertDisplayModel,
    BillSmoothingFuelDisplayModel,
    BillSmoothingInternalErrorTypes,
    BillSmoothingPaymentOptionModel,
    PaymentSchemeDisplayModel
} from './billSmoothing.model';

const paymentOptions: BillSmoothingPaymentOptionModel[] = [
    {
        frequency: 'Weekly',
        amount: '13',
        minDate: '2017-05-01T14:00:00Z',
        maxDate: '2017-07-01T14:00:00Z',
        excludedDates: []
    },
    {
        frequency: 'Fortnightly',
        amount: '26',
        minDate: '2017-05-01T14:00:00Z',
        maxDate: '2017-07-01T14:00:00Z',
        excludedDates: []
    },
    {
        frequency: 'Monthly',
        amount: '52',
        minDate: '2017-05-01T14:00:00Z',
        maxDate: '2017-07-01T14:00:00Z',
        excludedDates: []
    }
];

export class TestData {
    static get accountDetailWithOneElecOneGas(): AccountDetailComponentModel {
        return {
            contractAccountNumber: '123',
            numberOfElectricityIcons: 1,
            numberOfGasIcons: 1,
            supplyAddresses: ['a'],
            hasSingleContract: false,
            regionId: '1',
            doesAccountHaveBasicMeter: false,
            isDirectDebit: false,
            contracts: []
        };
    }
    static get noFuelInformation(): BillSmoothingFuelDisplayModel[] {
        return [];
    }
    static get oneAccountWithOneElecAndOneGas(): BillSmoothingFuelDisplayModel[] {
        return [{
            contractAccountNumber: 3489579,
            contractNumber: 7837593475,
            fuel: 'electricity',
            hasBillSmoothing: false,
            hasDirectDebit: false,
            paymentScheme: null,
            paymentOptions: paymentOptions,
            alerts: [],
            paymentOverdue: 0,
            billDeliveryMethod: BillDeliveryMethodType.Email,
            isEligibleForBillSmoothing: true,
            hasChatButton: false,
            hasSetupButton: false,
            hasMessage: false,
            livePersonEngagementType: null,
            heading: 'Bill Smoothing isn\'t set up yet',
            isSmartMeter: false,
            regionId: 'VIC',
            isElectricity: true,
            isGas: false,
            hasAlerts: false
        }, {
            contractAccountNumber: 3489579,
            contractNumber: 657848563465,
            fuel: 'gas',
            hasBillSmoothing: false,
            hasDirectDebit: false,
            paymentScheme: null,
            paymentOptions: paymentOptions,
            alerts: [],
            paymentOverdue: 0,
            billDeliveryMethod: BillDeliveryMethodType.Postal,
            isEligibleForBillSmoothing: true,
            hasChatButton: false,
            hasSetupButton: false,
            hasMessage: false,
            livePersonEngagementType: null,
            heading: 'Bill Smoothing isn\'t set up yet',
            isSmartMeter: false,
            regionId: 'VIC',
            isElectricity: false,
            isGas: true,
            hasAlerts: false
        }];
    }
    static get oneAccountWithOneElec(): BillSmoothingFuelDisplayModel[] {
        return [{
            contractAccountNumber: 3489579,
            contractNumber: 7837593475,
            fuel: 'electricity',
            hasBillSmoothing: false,
            hasDirectDebit: false,
            paymentScheme: null,
            paymentOptions: paymentOptions,
            alerts: [],
            paymentOverdue: 0,
            billDeliveryMethod: BillDeliveryMethodType.Email,
            isEligibleForBillSmoothing: true,
            hasChatButton: false,
            hasSetupButton: true,
            hasMessage: false,
            livePersonEngagementType: null,
            heading: 'Bill Smoothing isn\'t set up yet',
            isSmartMeter: false,
            regionId: 'VIC',
            isElectricity: true,
            isGas: false,
            hasAlerts: false
        }];
    }

    static get paygErrorAlert(): AlertDisplayModel {
        return new AlertDisplayModel(BillSmoothingInternalErrorTypes.Payg, AlertType.error, 'You\'re already set up on AGL Prepaid', 'If you\'d like to switch to Bill Smoothing, get in touch with us <a href="https://www.agl.com.au/residential/contact-us" target="_blank">here</a>.');
    }

    static get twoAccountWithOneElecEach(): BillSmoothingFuelDisplayModel[] {
        return [{
            contractAccountNumber: 3489579,
            contractNumber: 7837593475,
            fuel: 'electricity',
            hasBillSmoothing: false,
            hasDirectDebit: false,
            paymentScheme: null,
            paymentOptions: paymentOptions,
            alerts: [],
            paymentOverdue: 0,
            billDeliveryMethod: BillDeliveryMethodType.Email,
            isEligibleForBillSmoothing: true,
            hasChatButton: false,
            hasSetupButton: true,
            hasMessage: false,
            livePersonEngagementType: null,
            heading: 'Bill Smoothing isn\'t set up yet',
            isSmartMeter: false,
            regionId: 'VIC',
            isElectricity: true,
            isGas: false,
            hasAlerts: false
        }, {
            contractAccountNumber: 3489579,
            contractNumber: 657848563465,
            fuel: 'electricity',
            hasBillSmoothing: false,
            hasDirectDebit: false,
            paymentScheme: null,
            paymentOptions: paymentOptions,
            alerts: [],
            paymentOverdue: 0,
            billDeliveryMethod: BillDeliveryMethodType.Postal,
            isEligibleForBillSmoothing: true,
            hasChatButton: false,
            hasSetupButton: true,
            hasMessage: false,
            livePersonEngagementType: null,
            heading: 'Bill Smoothing isn\'t set up yet',
            isSmartMeter: false,
            regionId: 'VIC',
            isElectricity: true,
            isGas: false,
            hasAlerts: false
        }
        ];
    }

    static get paymentSchemeDisplayModel(): PaymentSchemeDisplayModel {
        return {
            contractNumber: 132464798,
            paymentSchemeNumber: 46354897,
            startDate: 'startDate',
            endDate: 'endDate',
            frequency: 'frequency',
            nextPayment: {
                date: new Date('2017-06-01T14:00:00Z'),
                amount: 100
            },
            previousPayment: {
                date: new Date('2017-06-01T14:00:00Z'),
                amount: 100
            }
        };
    }
    static get paymentSchemeWithNextPayment(): PaymentSchemeDisplayModel {
        return {
            contractNumber: 132464798,
            paymentSchemeNumber: 46354897,
            startDate: 'startDate',
            endDate: 'endDate',
            frequency: 'frequency',
            nextPayment: {
                date: new Date('2017-06-01T14:00:00Z'),
                amount: 300
            },
            previousPayment: null
        };
    }
    static get paymentSchemeWithoutNextPayment(): PaymentSchemeDisplayModel {
        return {
            contractNumber: 132464798,
            paymentSchemeNumber: 46354897,
            startDate: 'startDate',
            endDate: 'endDate',
            frequency: 'frequency',
            nextPayment: null,
            previousPayment: {
                date: new Date('2017-06-01T14:00:00Z'),
                amount: 200
            }
        };
    }
    static get accountsData() {
        const mockedAccounts = [
            {
                accountNumber: '7019079511',
                contracts: [
                    {
                        contractNumber: '9400106800',
                        isDirectDebit: true,
                        addressRaw: 'address 1',
                        isRestricted: false,
                        fuelType: 'Gas',
                        paymentScheme: {}
                    },
                    {
                        contractNumber: '9400106801',
                        isDirectDebit: false,
                        addressRaw: 'address 1',
                        isRestricted: true,
                        fuelType: 'Gas',
                        paymentScheme: {}
                    },
                    {
                        contractNumber: '9400106802',
                        isDirectDebit: false,
                        addressRaw: 'address 2',
                        isRestricted: false,
                        fuelType: 'Gas'
                    },
                    {
                        contractNumber: '9400106803',
                        isDirectDebit: false,
                        isRestricted: false,
                        fuelType: 'Electricity'
                    }
                ]
            },
            {
                accountNumber: '7013136192',
                contracts: [
                    {
                        contractNumber: '9400106804',
                        isDirectDebit: false,
                        addressRaw: 'address 3',
                        isRestricted: false,
                        fuelType: 'Electricity'
                    },
                    {
                        contractNumber: '9400106805',
                        isDirectDebit: false,
                        isRestricted: true,
                        fuelType: 'Electricity'
                    },
                    {
                        contractNumber: '9400106806',
                        isDirectDebit: false,
                        isRestricted: false,
                        fuelType: 'Electricity'
                    },
                    {
                        contractNumber: '9400106807',
                        isDirectDebit: false,
                        isRestricted: false,
                        fuelType: 'Gas'
                    }
                ]
            }
        ];

        return mockedAccounts;
    }

    static get BillSmoothingAccountData() {
        const mockBillSmoothingAccount = {
            contractAccountNumber: 7013136192,
            estimates: [
                {
                    contractNumber: 9400106804,
                    paymentOptions: paymentOptions
                }
            ]
        };

        return mockBillSmoothingAccount;
    }
}
