import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { DebugElement } from '@angular/core';
import { IAccountServiceMA, AccountViewModel, ContractViewModel } from '../../../../services/account.service';
import { AccountMockService } from '../../../../services/mock/account.mock.service';
import { ConcessionContractSelectionComponent } from './concessionContractSelection.component';
import { ConcessionContractSelectionModule } from './concessionContractSelection.module';
import { ActivatedRouteStub } from '../../../../../shared/testing/activatedRouteStub';
import { IConcessionStateService } from '../services/concessionState.service';
import { Concession, ConcessionContract } from '../concession';
import { Observable } from 'rxjs/Observable';
import { By } from '@angular/platform-browser';

function createContractAccountViewModel(accountId: string, groupedAddress?: string): AccountViewModel {
    let contractAccountViewModel = new AccountViewModel(accountId);
    contractAccountViewModel.groupedAddress = groupedAddress;

    let contract1 = createContractViewModel(accountId, '12345', 'Electricity');
    let contract2 = createContractViewModel(accountId, '23456', 'Gas');
    let contract3 = createContractViewModel(accountId, '23456', 'Gas');
    contractAccountViewModel.contracts.push(contract1);
    contractAccountViewModel.contracts.push(contract2);
    contractAccountViewModel.contracts.push(contract3);
    return contractAccountViewModel;
}

function createContractViewModel(accountId: string, contractId: string, fuelType: string): ContractViewModel {
    let contractViewModel = new ContractViewModel(contractId);
    contractViewModel.accountNumber = accountId;
    contractViewModel.address = null;
    contractViewModel.fuelType = fuelType;
    return contractViewModel;
}

describe('Concession Contract Selection Component', () => {
    let mockAccounts: AccountViewModel[] = [];
    let comp: ConcessionContractSelectionComponent;
    let fixture: ComponentFixture<ConcessionContractSelectionComponent>;
    let accountService: IAccountServiceMA;
    let router: Router;
    let de: DebugElement;
    let concessionStateServiceMock: IConcessionStateService;

    function clickContinue() {
        fixture.detectChanges();
        let button = fixture.nativeElement.querySelector('.continue-or-cancel__cta-continue div');
        button.click();
    }

    beforeEach(() => {
        let mockConcessionStateService: IConcessionStateService = {
            getCurrentConcession(): Concession {
                throw new Error('not implemented');
            },
            initSession(): Observable<void> {
                return Observable.of();
            },
            clearSession(): void {
                throw new Error('not implemented');
            },
            hasSession: true
        };
        const activatedRouteStub = new ActivatedRouteStub();
        activatedRouteStub.testParamMap = { contractAccountId: '123456789' };
        const routerStub = {
            navigate: (urls: string[]) => {
                throw new Error('not implemented');
            }
        };
        TestBed.configureTestingModule({
            imports: [
                ConcessionContractSelectionModule
            ],
            providers: [
                { provide: IAccountServiceMA, useClass: AccountMockService },
                { provide: Router, useValue: routerStub },
                { provide: ActivatedRoute, useValue: activatedRouteStub },
                { provide: IConcessionStateService, useValue: mockConcessionStateService },
            ]
        });

        fixture = TestBed.createComponent(ConcessionContractSelectionComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
        accountService = TestBed.get(IAccountServiceMA);
        router = TestBed.get(Router);
        concessionStateServiceMock = TestBed.get(IConcessionStateService);
    });

    describe('Concession Contract Selection Component', () => {
        beforeEach(() => {
            let contractAccount1 = createContractAccountViewModel('123456789', '123 street st Melbourne VIC 3000');
            let contractAccount2 = createContractAccountViewModel('234234233', '224 street st Melbourne VIC 3182');
            mockAccounts.push(contractAccount1);
            mockAccounts.push(contractAccount2);
            spyOn(accountService, 'getAccounts').and.returnValue(Observable.of(mockAccounts));
            spyOn(concessionStateServiceMock, 'getCurrentConcession').and.returnValue(TestData.SingleAddressConcession);
            fixture.detectChanges();
        });
        it('should display the second part of grouped address', () => {
            let routerSpy = spyOn(router, 'navigate');

            let checkboxContainers = de.queryAllNodes(By.css('.maui-checkbox__label'));
            let addressLabel = de.query(By.css('.concession-contracts__contract-label-address-no-wrap'));
            expect(addressLabel.nativeElement.innerHTML.trim()).toBe('VIC 3000');
        });

        it('should set the selected contracts as 2 when two checkboxes are selected', () => {
            let routerSpy = spyOn(router, 'navigate');

            let checkboxContainers = de.queryAllNodes(By.css('.maui-checkbox__label'));
            checkboxContainers[0].nativeNode.click();
            checkboxContainers[1].nativeNode.click();
            expect(comp.selectedContracts.length).toBe(2);
        });

        it('should display error message when same fuel is selected twice', () => {
            let routerSpy = spyOn(router, 'navigate');

            let checkboxContainers = de.queryAllNodes(By.css('.maui-checkbox__label'));
            checkboxContainers[0].nativeNode.click();
            checkboxContainers[1].nativeNode.click();
            checkboxContainers[2].nativeNode.click();
            expect(comp.sameFuelError).toBe(true);
        });

        it('should not contain any error message when each fueltype is selected once', () => {
            let routerSpy = spyOn(router, 'navigate');

            let checkboxContainers = de.queryAllNodes(By.css('.maui-checkbox__label'));
            checkboxContainers[0].nativeNode.click();
            checkboxContainers[1].nativeNode.click();
            expect(comp.sameFuelError).toBe(false);
        });

        it('should route to the next step when continue button is clicked', () => {
            let routerSpy = spyOn(router, 'navigate');

            let checkboxContainers = de.queryAllNodes(By.css('.maui-checkbox__label'));
            checkboxContainers[0].nativeNode.click();
            checkboxContainers[1].nativeNode.click();
            clickContinue();
            expect(routerSpy).toHaveBeenCalledWith([
                '/settings/concession/confirmdetails'
            ]);
        });

        it('should contain the address parts split into two', () => {
            expect(comp.contractAccount[0].address.addressPart1.trim()).toEqual('123 street st Melbourne');
            expect(comp.contractAccount[0].address.addressPart2.trim()).toEqual('VIC 3000');
        });
    });
});

class TestData {
    static get SingleAddressConcession(): Concession {
        return <Concession> {
            accountHolderName: 'John Smith',
            uniqueAddresses: ['1 Hill St'],
            selectedCard: {
                issuerDescription: 'Center Link',
                cardDescription: 'Health Care Card',
            },
            cardNumber: '111-111-11A',
            setSelectedContracts: (contracts: ConcessionContract[]) => { /* mocked */
            }
        };
    }
}
