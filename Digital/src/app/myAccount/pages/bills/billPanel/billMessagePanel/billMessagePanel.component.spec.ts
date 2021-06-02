import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { MyAccountMaterialModule } from '../../../../modules/my-account.material.module';
import { BillMessagePanelComponent } from './billMessagePanel.component';
import { ContractViewModel, BillViewModel } from '../../../../services/account.service';

describe('Bill Message Panel', () => {

    let rightPanel: DebugElement;
    let comp: BillMessagePanelComponent;
    let fixture: ComponentFixture<BillMessagePanelComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                BillMessagePanelComponent
            ],
            imports: [
                MyAccountMaterialModule
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BillMessagePanelComponent);
        comp = fixture.componentInstance;
        rightPanel = fixture.debugElement.query(By.css('.bill-panel-right-panel'));
    });

    it('should set no balance for no bills', () => {
        comp.type = { noBills: true };
        comp.contract = new ContractViewModel('123456789',
            <BillViewModel[]> [{
                newCharges: 0,
                totalDue: 0,
                issuedDate: new Date(),
                dueDate: new Date()
            }]
        );
        comp.contract.currentBalance = 0;
        fixture.detectChanges();
        expect(comp.noBalance).toBe(true);
    });

    it('should set no balance for bill paid and credit accounts', () => {
        comp.type = { billPaid: true };
        comp.contract = new ContractViewModel('123456789',
            <BillViewModel[]> [{
                newCharges: 0,
                totalDue: 0,
                issuedDate: new Date(),
                dueDate: new Date()
            }]
        );
        comp.contract.currentBalance = 200;
        fixture.detectChanges();

        expect(comp.noBalance).toBe(true);
    });

    it('should show correct text for account balance in credit', () => {
        comp.type = { hasCredit: true };
        fixture.detectChanges();
        let title = fixture.nativeElement.querySelector('.bill-panel-message-panel__title').textContent;
        expect(title).toBeTruthy();
        expect(title.toString().replace(/\s/g, ' ')).toContain(`You're all up to date`); // use regex to handle the &nbsp;
    });
});
