import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http } from '@angular/http';

import orderBy from 'lodash-es/orderBy';
import uniqBy from 'lodash-es/uniqBy';
import { Observable } from 'rxjs/Observable';

import { AccountApiModel } from './../../shared/service/api.service';
import { MockIndex } from './mockIndex';
import { MockCustomer } from './models/mockCustomer';
import { Guid } from '../../shared/utils/guid';
import { FeatureFlagService } from '../services/featureFlag.service';
import { DynamicMock, DynamicMockLifecycle, DynamicMockKey, DynamicMockDesiredState, DynamicMockState } from './models/dynamicMock';
import { Tag } from './models/tag';
import { MockIdentityStorageService } from './mockIdentityStorage.service';
import { IdentityEmulator } from './../../../../common/identityEmulator';
import { MockJWTService } from './mockJWT.service';

@Component({
    selector: 'agl-mockidentity',
    templateUrl: './mockIdentity.component.html',
    styleUrls: ['./mockIdentity.component.scss']
})
export class MockIdentityComponent implements OnInit {

    // Filters
    public showGas: boolean = true;
    public showElec: boolean = true;
    public showSolar: boolean = true;
    public showSingleAccount: boolean = true;
    public showMultiAccount: boolean = true;
    public showSingleContract: boolean = true;
    public showMultiContract: boolean = true;
    public showEV: boolean = true;
    public tags: Tag[] = [];
    public dynamicMocks: DynamicMock[] = [];

    public filterTitleText: string = '';
    public filterNameIdText: string = '';
    public filterControlAccountComparisonType: string;
    public filterControlAccountLengthEnabled: boolean = false;
    public filterControlAccountLength: number = 1;
    public filterControlSelectedElec: string = 'Any';
    public filterControlSelectedGas: string = 'Any';
    public filterControlSelectedEV: string = 'Any';
    public filterControlSelectedSolar: string = 'Any';
    public filterControlSelectedInflight: string = 'Any';
    public filterControlSelectedRestricted: string = 'Any';

    public mockCustomer: MockCustomer;
    public filteredMockCustomers: MockCustomer[] = [];
    // A list of the mock accounts we can use
    public mockCustomers: MockCustomer[] = [];

    public numericalComparisonTypes: string[] = [
        'Any',
        'Equal',
        'Not equal',
        'Less than',
        'Less than or equal to',
        'More than',
        'More than or equal to',
    ];

    public booleanComparisonTypes: string[] = [
        'Any',
        'Must have',
        'Must not have'
    ];

    private tokenSecret: string = `myaccountmocking`;

    public nameFilterEvents: Subject<any>;
    public nameIdFilterEvents: Subject<any>;

    constructor(
        private mockIndex: MockIndex,
        private activatedRoute: ActivatedRoute,
        private featureFlagService: FeatureFlagService,
        private mockIdentityStorageService: MockIdentityStorageService
    ) {
        this.nameFilterEvents = new Subject();
        this.nameIdFilterEvents = new Subject();
        this.listenToTextFilters();
    }

    public ngOnInit() {
        let allFeatureFlagsTrueRequested = this.activatedRoute.snapshot.queryParamMap.get('afft') === '1';
        if (allFeatureFlagsTrueRequested) {
            this.featureFlagService.setAllFeatureFlags(true);
        }
        this.mockIndex.loadMockCustomers().subscribe(
            (mockCustomers: MockCustomer[]) => {
                this.mockCustomers = mockCustomers;
                this.loadTags(mockCustomers);
                this.loadDynamicMocks();
                this.populateData();
            },
            (err) => {
                console.warn('Unable to retrieve mock business partners from mockIndex');
                Observable.throw(err);
            }
        );
    }

    public tagChanged(tag: Tag, event: any) {
        tag.isSelected = event.target.checked;
        this.mockIdentityStorageService.saveValue(tag);
        this.updateFilters();
    }

    public dynamicMockChanged(dms: DynamicMockState, event: any) {
        for (let item of this.dynamicMocks.filter((m) => m.groupKey === dms.groupKey)) {
            item.states.forEach((o) => o.isSelected = false); // reset
        }

        dms.isSelected = event.target.checked;
        this.mockIdentityStorageService.saveValue(dms);
    }

    public onChangeFilterAccountComparison(event: any) {
        this.filterControlAccountComparisonType = event.target.value;
        this.filterControlAccountLengthEnabled = (this.filterControlAccountComparisonType !== 'Any');
        this.updateFilters();
    }

    public onChangeFilterAccountLength(event: any) {
        if (!isNaN(event.target.value)) {
            this.filterControlAccountLength = parseInt(event.target.value, 0);
            this.updateFilters();
        }
    }

    public onChangeFilterElec(event: any) {
        this.filterControlSelectedElec = event.target.value;
        this.updateFilters();
    }

    public onChangeFilterGas(event: any) {
        this.filterControlSelectedGas = event.target.value;
        this.updateFilters();
    }

    public onChangeFilterEv(event: any) {
        this.filterControlSelectedEV = event.target.value;
        this.updateFilters();
    }

    public onChangeFilterSolar(event: any) {
        this.filterControlSelectedSolar = event.target.value;
        this.updateFilters();
    }

    public onChangeFilterInflight(event: any) {
        this.filterControlSelectedInflight = event.target.value;
        this.updateFilters();
    }

    public onChangeFilterRestricted(event: any) {
        this.filterControlSelectedRestricted = event.target.value;
        this.updateFilters();
    }

    public onKeyUp(event: any) {
        console.log(event);
    }

    public onClickInfo(mockBusinessPartner: MockCustomer) {
        // TODO: show modal with more info
    }

    public onClickLogin(mockBusinessPartner: MockCustomer) {
        console.log('onClickLogin');

        this.mockCustomer = mockBusinessPartner;

        let mockToken = this.createToken();

        this.initialiseMockServer(mockToken)
            .finally(() => {
                console.log('load site with mock bearer token');

                // Redirect to the site with the token appended, the same as in a deployed environment
                setTimeout(() => {
                    window.location.href = `${window.location.origin}/?bearer=${mockToken}`;
                }, 100);
            })
            .subscribe();
    }

    private createToken(): string {
        let additionalMockServerClaims = this.dynamicMocks
            .filter((dm) => dm.shouldBeApplied(DynamicMockLifecycle.appliedViaMiddleware))
            .map((dm) => {
                console.log(`${dm.selectedState.key} dynamic mock requested`);
                return dm.selectedState.key;
            });

        return IdentityEmulator.generateTokenForCustomer(this.mockCustomer.businessPartnerNumber, this.mockCustomer.emailAddress, additionalMockServerClaims);
    }

    private initialiseMockServer(mockToken: any): Observable<void> {
        let filteredDynamicMocks = this.dynamicMocks.filter((dm) => dm.shouldBeApplied(DynamicMockLifecycle.initialisePriorToLogin));
        for (let dm of filteredDynamicMocks) {
            // TODO support different types of initialisation mocks other than direct debit

            let isEnabled = dm.selectedState.state === DynamicMockDesiredState.enabled;
            console.log(`${isEnabled ? 'enable' : 'disable'} direct debit dynamic mock requested`);
            return this.mockIndex.alterDirectDebitForAllContractAccounts(mockToken, isEnabled);
        }

        console.log('no dynamic mock responses requested at this stage');
        return Observable.empty();
    }

    private updateFilters(): void {

        let filteredCustomers = this.mockCustomers;

        // If we need to apply a text filter
        if (this.filterTitleText && this.filterTitleText.length > 0) {
            filteredCustomers = filteredCustomers.filter(
                (mc: MockCustomer) => {
                    return (mc.title.toLowerCase().indexOf(this.filterTitleText.toLowerCase()) !== -1);
                }
            );
        }

        if (this.filterNameIdText && this.filterNameIdText.length > 0) {
            filteredCustomers = filteredCustomers.filter(
                (mc: MockCustomer) => {
                    return (mc.businessPartnerNumber.toLowerCase().indexOf(this.filterNameIdText.toLowerCase()) !== -1);
                }
            );
        }

        let boolFilters: BooleanFilter[] = [
            { val: this.filterControlSelectedElec, prop: 'hasElecContract' },
            { val: this.filterControlSelectedGas, prop: 'hasGasContract' },
            { val: this.filterControlSelectedEV, prop: 'hasEvContract' },
            { val: this.filterControlSelectedSolar, prop: 'hasSolarContract' },
            { val: this.filterControlSelectedInflight, prop: 'hasInflight' },
            { val: this.filterControlSelectedRestricted, prop: 'hasRestricted' },
        ];

        if (this.filterControlAccountComparisonType !== `Any`) {
            filteredCustomers = filteredCustomers.filter(
                (mc: MockCustomer) => {

                    let numberOfAccounts: number = mc.accounts.length;
                    let filterAccountLength: number = this.filterControlAccountLength;

                    switch (this.filterControlAccountComparisonType) {
                        case 'Equal': {
                            return (numberOfAccounts === filterAccountLength);
                        }
                        case 'Not equal': {
                            return (numberOfAccounts !== filterAccountLength);
                        }
                        case 'Less than': {
                            return (numberOfAccounts < filterAccountLength);
                        }
                        case 'Less than or equal to': {
                            return (numberOfAccounts <= filterAccountLength);
                        }
                        case 'More than': {
                            return (numberOfAccounts > filterAccountLength);
                        }
                        case 'More than or equal to': {
                            return (numberOfAccounts >= filterAccountLength);
                        }
                        default: {
                            return true;
                        }
                    }
                }
            );
        }

        for (let filter of boolFilters) {
            if (filter.val !== `Any`) {
                filteredCustomers = filteredCustomers.filter(
                    (mc: MockCustomer) => {
                        if (filter.val === 'Must have') {
                            return mc[filter.prop];
                        }
                        if (filter.val === 'Must not have') {
                            return !mc[filter.prop];
                        }
                    }
                );
            }
        }

        filteredCustomers = filteredCustomers.filter(
            (mc: MockCustomer) => {
                return this.matchesFilterTagCriteria(mc.tags);
            }
        );

        this.filteredMockCustomers = filteredCustomers;

    }

    private listenToTextFilters() {

        this.nameFilterEvents
            .asObservable()
            .map((x) => {
                return <string> x.target.value;
            })
            .distinctUntilChanged()
            .subscribe(
                (x) => {
                    this.filterTitleText = x;
                    this.updateFilters();
                }
        );

        this.nameIdFilterEvents
            .asObservable()
            .map((x) => {
                return <string> x.target.value;
            })
            .distinctUntilChanged()
            .subscribe(
                (x) => {
                    this.filterNameIdText = x;
                    this.updateFilters();
                }
        );
    }

    private matchesFilterTagCriteria(customerTagKeys: string[]): boolean {
        let matchesCriteria: boolean = this.tags.filter((t) => t.isSelected).length === 0; // default is true if no selected tags

        if (customerTagKeys && this.tags.some((t) => t.isSelected && customerTagKeys.some((ct) => ct.toUpperCase() === t.key.toUpperCase()))) {
            matchesCriteria = true;
        }

        return matchesCriteria;
    }

    private populateData() {

        let customerInfoData: Array<Observable<AccountApiModel[]>> = [];

        this.mockCustomers.forEach(
            (mc: MockCustomer) => {
                customerInfoData.push(this.mockIndex.loadAccounts(mc.businessPartnerNumber));
            }
        );

        Observable
            .forkJoin(customerInfoData)
            // tslint:disable-next-line:array-type
            .subscribe(
                    (results: AccountApiModel[][]) => {

                        this.mockCustomers.forEach(
                            (customer: MockCustomer, index: number) => {
                                let callResults = results[index];
                                customer.accounts = callResults;

                                // do some data processing
                                for (let account of customer.accounts) {

                                    if (account.contracts.filter((contract) => contract.fuelType.toLowerCase() === 'gas').length > 0) {
                                        customer.hasGasContract = true;
                                    }
                                    if (account.contracts.filter((contract) => contract.fuelType.toLowerCase() === 'electricity').length > 0) {
                                        customer.hasElecContract = true;
                                    }
                                    if (account.contracts.filter((contract) => contract.hasSolar).length > 0) {
                                        customer.hasSolarContract = true;
                                    }
                                    if (account.contracts.filter((contract) => contract.hasElectricVehicle).length > 0) {
                                        customer.hasEvContract = true;
                                    }
                                    if (account.contracts.filter((contract) => contract.inFlight).length > 0) {
                                        customer.hasInflight = true;
                                    }
                                    if (account.contracts.filter((contract) => contract.isRestricted).length > 0) {
                                        customer.hasRestricted = true;
                                    }
                                }
                            }
                        );

                        this.filteredMockCustomers = this.mockCustomers;
                        this.loadSettings();
                        this.updateFilters();
                    }
            );
    }

    private loadSettings() {

        let currentValue = sessionStorage.getItem(`Bearer`);
        if (currentValue && currentValue.length > 0) {

            try {
                let decoded = MockJWTService.decode(currentValue); // ignore signature
                let mockAccountNumber = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
                if (mockAccountNumber && mockAccountNumber.length > 0) {

                    this.mockCustomer = this.mockCustomers.find((p) => p.businessPartnerNumber === mockAccountNumber);

                    if (this.mockCustomer) {
                        console.log(`Token detected, mocking account: ${mockAccountNumber} for ${this.mockCustomer.title}`);
                    }
                }

            } catch (err) {
                console.warn(`The bearer token could not be decoded`);
            }

        }

    }

    private loadTags(mockCustomers: MockCustomer[]) {
        let tags = mockCustomers.filter((mc) => mc.tags && mc.tags.length)
                                .map((mc) => mc.tags.map((tag) => new Tag(tag, false)));
        this.tags = orderBy(uniqBy([].concat(...tags), 'key'), 'displayName');

        this.mockIdentityStorageService.loadValues(this.tags);
    }

    private loadDynamicMocks() {
        /**
         * Dynamic mocks are hard coded here
         *
         * Note `disabled` states are only required when the dynamic mock alters the api response.
         * For example a dynamic mock that makes the bill smoothing eligibility api return a specific
         * SAP error code would just use `ignored/enabled` states
         *
         * See /server-ts/middleware/dynamic-mocking/readme.md for further details
         *
         */
        this.dynamicMocks = [
            new DynamicMock(DynamicMockLifecycle.initialisePriorToLogin,
                            [
                                new DynamicMockState(DynamicMockKey.directDebit, DynamicMockDesiredState.ignored),
                                new DynamicMockState(DynamicMockKey.directDebit, DynamicMockDesiredState.disabled),
                                new DynamicMockState(DynamicMockKey.directDebit, DynamicMockDesiredState.enabled)
                            ],
                            'Initialises mock server with direct debit enabled/disabled for all contract accounts'),
            new DynamicMock(DynamicMockLifecycle.appliedViaMiddleware,
                            [
                                new DynamicMockState(DynamicMockKey.potdProducts, DynamicMockDesiredState.ignored),
                                new DynamicMockState(DynamicMockKey.potdProducts, DynamicMockDesiredState.disabled),
                                new DynamicMockState(DynamicMockKey.potdProducts, DynamicMockDesiredState.enabled)
                            ],
                            'Alters mock server responses to emulate the user having only pay on time discount products')
        ];

        this.dynamicMocks.map((dm) => this.mockIdentityStorageService.loadValues(dm.states));
    }
}

export class BooleanFilter {
    public val: string;
    public prop: keyof MockCustomer;
}
