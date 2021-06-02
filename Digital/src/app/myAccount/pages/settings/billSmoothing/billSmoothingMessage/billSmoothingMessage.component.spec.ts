import { DebugElement } from '@angular/core/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule  } from '@angular/router/testing';
import { BillSmoothingMessageComponent } from './billSmoothingMessage.component';

describe('BillSmoothingMessageComponent', () => {
    let sut: BillSmoothingMessageComponent;
    let fixture: ComponentFixture<BillSmoothingMessageComponent>;
    let de: DebugElement;
    let billSmoothingAccountsService: any;

    beforeEach(() => {
        let BillSmoothingAccountsServiceStub = {
            getAlertForIneligibility: () => {
                throw new Error('BillSmoothingAccountsServiceStub.getAlertForIneligibility has not been mocked properly.');
            }
        };

        TestBed.configureTestingModule({
            declarations: [
                BillSmoothingMessageComponent
            ],
            imports: [
                FormsModule,
                RouterTestingModule
            ],
        });

        fixture = TestBed.createComponent(BillSmoothingMessageComponent);
        sut = fixture.componentInstance;
        de = fixture.debugElement;
    });

    it('should additional text when not on direct debit', () => {
        // arrange
        sut.hasDirectDebit = false;
        fixture.detectChanges();

        // assert
        let bsMessage = de.query(By.css('.bs-message'));
        expect(bsMessage.nativeElement.innerText).toContain('We noticed you have been making your payments manually. Have you considered setting up a Direct Debit? Automatically pay your Bill Smoothing on time, every time.');
    });
});
