import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ConcessionAccountSelectionComponent } from './concessionAccountSelection.component';
import { ConcessionAccountSelectionModule } from './concessionAccountSelection.module';
import { Observable } from 'rxjs/Observable';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { IAccountServiceMA, AccountViewModel, ContractViewModel } from '../../../../services/account.service';
import { AccountMockService } from '../../../../services/mock/account.mock.service';

function createContractAccountViewModel(accountId: string, groupedAddress?: string): AccountViewModel {
    let contracts = [
        createContractViewModel(accountId, '12345', 'Electricity'),
        createContractViewModel(accountId, '23456', 'Gas')];

    let contractAccountViewModel = new AccountViewModel(accountId, contracts);
    contractAccountViewModel.groupedAddress = groupedAddress;
    return contractAccountViewModel;
}

function createContractViewModel(accountId: string, contractId: string, fuelType: string): ContractViewModel {
    let contractViewModel = new ContractViewModel(contractId);
    contractViewModel.accountNumber = accountId;
    contractViewModel.address = null;
    return contractViewModel;
}

describe('Concession Account Selection Component', () => {
    let comp: ConcessionAccountSelectionComponent;
    let fixture: ComponentFixture<ConcessionAccountSelectionComponent>;
    let accountService: IAccountServiceMA;
    let router: Router;
    let de: DebugElement;
    let mockAccounts: AccountViewModel[] = [];

    beforeEach(() => {
        const routerStub = {
            navigate: (urls: string[]) => {
                throw new Error('not implemented');
            }
        };

        TestBed.configureTestingModule({
            imports: [
                ConcessionAccountSelectionModule
            ],
            providers: [
                { provide: IAccountServiceMA, useClass: AccountMockService },
                { provide: Router, useValue: routerStub },
            ]
        });

        fixture = TestBed.createComponent(ConcessionAccountSelectionComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
        accountService = TestBed.get(IAccountServiceMA);
        router = TestBed.get(Router);
    });

    describe('Concession Account Selection Component', () => {
        beforeEach(() => {
            let contractAccount1 = createContractAccountViewModel('123456789', '123 street st Sunshine VIC 3000');
            let contractAccount2 = createContractAccountViewModel('234567890', '224 street st St Kilda WA 3182');
            mockAccounts.push(contractAccount1);
            mockAccounts.push(contractAccount2);
            spyOn(accountService, 'getAccounts').and.returnValue(Observable.of(mockAccounts));
            fixture.detectChanges();
        });
        it('should display 2 accounts', () => {
            let routerSpy = spyOn(router, 'navigate');

            let containers = de.queryAllNodes(By.css('.concession-accounts__account-address'));
            expect(containers.length).toEqual(mockAccounts.length);
        });

        it('should navigate to select fuel component when the account is clicked', () => {
            let routerSpy = spyOn(router, 'navigate');

            let containers = de.queryAllNodes(By.css('.concession-accounts__account-address'));
            containers[0].nativeNode.click();
            expect(routerSpy).toHaveBeenCalledWith([
                '/settings/concession/selectfuel', mockAccounts[0].accountNumber
            ]);
        });

        it('should contain the address part 1 and 2', () => {
            expect(comp.accountsList[0].uniqueFuelAndAddress[0].address.addressPart1.trim()).toEqual('123 street st Sunshine');
            expect(comp.accountsList[1].uniqueFuelAndAddress[0].address.addressPart1.trim()).toEqual('224 street st St Kilda');
            expect(comp.accountsList[0].uniqueFuelAndAddress[0].address.addressPart2.trim()).toEqual('VIC 3000');
            expect(comp.accountsList[1].uniqueFuelAndAddress[0].address.addressPart2.trim()).toEqual('WA 3182');
        });
    });
});
