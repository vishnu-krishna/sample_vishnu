import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { MatIconRegistry } from '@angular/material/icon';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { By, DomSanitizer } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterLinkWithHref } from '@angular/router';
import 'hammerjs';
import { Observable } from 'rxjs/Observable';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PrePaymentBalanceTopUpUrgency } from '../../../../../shared/globals/prePaymentBalanceTopUpUrgency';
import { Now } from '../../../../../shared/service/now.service';
import { RedLineApiService } from '../../../../../shared/service/redLineApi.service';
import { ModalService } from '../../../../modal/modal.service';
import { BillViewModel, ContractViewModel, IAccountServiceMA } from '../../../../services/account.service';
import { EventService } from '../../../../services/event.service';
import { BillPanelComponent } from '../billPanel.component';
import { BillSubtextComponent } from './billSubtext.component';
import { FeatureFlagService, FeatureFlagTypes } from '../../../../services/featureFlag.service';
import { FeatureFlagMockService } from '../../../../services/mock/featureflag.mock.service';
import { PaymentSchemeDisplayModel } from '../../../settings/billSmoothing/billSmoothing.model';
import { NowMock } from '../../../../services/mock';
import { BillSubtextInstalmentPlanComponent } from './instalmentPlan/billSubtextInstalmentPlan.component';
import { CommonPipesModule } from '../../../../modules/commonPipes.module';
import { MyAccountMaterialModule } from '../../../../modules/my-account.material.module';

import { EnergyInsightsService } from '../../../../services/energyInsights.service';
import { MockEnergyInsightsService } from '../../../../services/mock/energyInsights.mock.service';
import { BillPanelInstalmentPlanBillPeriodModule } from '../instalmentPlanBillPeriod';

// Mock the services
class MockApiService {
    public mockName: string = 'Mocked Service';
}

class MockModalService {
    public mockName: string = 'Mocked Service';
}

class MockEventService {
    public mockName: string = 'Mocked Service';
}

class MockAccountService {
    public mockName: string = 'Mocked Service';
}

class MockBillPanelComponent {
    public mockName: string = 'Mocked Service';
}

class MockRedLineApiService {
    public mockName: string = 'Mocked Service';
}

function stripDuplicateWhitespace(textContent: string) {
    return textContent.replace(/\s\s+/g, ' ');
}

describe('Bill Panel Subtext Component', () => {

    let htmlWrapper: DebugElement; // bill-panel--text
    let textLineOne: DebugElement; // bill-panel--text__text-line-one
    let textLineTwo: DebugElement; // bill-panel--text__text-line-two
    let comp: BillSubtextComponent;
    let fixture: ComponentFixture<BillSubtextComponent>;
    let sampleDate;
    let sampleDateString;
    let nowMock: NowMock;
    beforeEach(() => {
        nowMock = new NowMock('');
        TestBed.configureTestingModule({
            providers: [
                { provide: Now, useValue: nowMock },
                { provide: 'AppContentBranch' },
                { provide: ModalService, useClass: MockModalService },
                { provide: EventService, useClass: MockEventService },
                { provide: IAccountServiceMA, useClass: MockAccountService },
                { provide: BillPanelComponent, useClass: MockBillPanelComponent },
                { provide: RedLineApiService, useClass: MockRedLineApiService },
                { provide: MATERIAL_SANITY_CHECKS, useValue: false },
                { provide: FeatureFlagService, useClass: FeatureFlagMockService },
                { provide: EnergyInsightsService, useClass: MockEnergyInsightsService }
            ],
            declarations: [
                BillSubtextInstalmentPlanComponent,
                BillSubtextComponent,
            ],
            imports: [
                HttpModule,
                MyAccountMaterialModule,
                RouterTestingModule,
                HttpClientTestingModule,
                CommonPipesModule,
                BillPanelInstalmentPlanBillPeriodModule
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BillSubtextComponent);
        comp = fixture.componentInstance;
        htmlWrapper = fixture.debugElement.query(By.css('.bill-panel-text'));
        textLineOne = fixture.debugElement.query(By.css('.bill-panel-text__heading-text'));
        textLineTwo = fixture.debugElement.query(By.css('.bill-panel-text__subheading-text'));

        let iconRegistry: MatIconRegistry = fixture.debugElement.injector.get(MatIconRegistry);
        let sanitizer: DomSanitizer = fixture.debugElement.injector.get(DomSanitizer);
        iconRegistry.addSvgIcon('icon-pay-bill-panel', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_elec_enabled.svg'));
        iconRegistry.addSvgIcon('icon-exp-bill', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_elec_enabled.svg'));
        iconRegistry.addSvgIcon('icon-tick-in-box', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_elec_enabled.svg'));
        iconRegistry.addSvgIcon('icon-payontime-overdue-newbill-warning', sanitizer.bypassSecurityTrustResourceUrl('svg/icon-payontime-overdue-newbill-warning.svg'));

        let featureFlagService: FeatureFlagService = fixture.debugElement.injector.get(FeatureFlagService);
        sampleDate = new Date();
        sampleDateString = comp.longDate(sampleDate);

        spyOn(featureFlagService, 'featureFlagged').and.callFake(
            (featureFlagType: FeatureFlagTypes) => {
                if (featureFlagType === FeatureFlagTypes.paymentExtensionEnabled) {
                    return Observable.of(true);
                }
                throw new Error('You attempted to read the value for a feature flag which has not been spied on');
            });
    });

    it('should show the correct text for overdue scenarios', () => {
        comp.type = { overdue: true };
        comp.contract = new ContractViewModel('123456789',
            <BillViewModel[]> [{
                newCharges: 0,
                totalDue: 0,
                issuedDate: sampleDate,
                dueDate: sampleDate
            }]
        );
        comp.contract.currentBalance = 40.6;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.bill-panel-text__heading-text').textContent).toMatch('Due today');
        expect(fixture.nativeElement.querySelector('.bill-panel-text__subheading-text').textContent).toMatch(`Due - ${sampleDateString}`);
    });

    it('should show the correct overdue text for overdue + new bill issued scenario', () => {
        comp.type = { overdue: true, hasDebit: true, paymentOverdueInDebit: true, newBillAndOverdue: true };
        comp.contract = new ContractViewModel('123456789',
            <BillViewModel[]> [{
                newCharges: 0,
                totalDue: 0,
                issuedDate: sampleDate,
                dueDate: new Date(2018, 6, 21)
            }]
        );
        nowMock.setDate(2018, 4, 7);
        comp.contract.currentBalance = 40.6;
        comp.contract.paymentOverdue = 167.23;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.bill-panel-text__heading-text').textContent).toMatch('Due in 75 days');
        expect(fixture.nativeElement.querySelector('.bill-panel-text__subheading-text').textContent).toMatch(`Due - Sat 21 Jul 2018`);
    });

    it('should set the property iconOverdue to TRUE for overdue but no bill issued', () => {
        comp.type = { overdue: true, hasDebit: false };
        comp.contract = new ContractViewModel('123456789',
            <BillViewModel[]> [{
                newCharges: 0,
                totalDue: 0,
                issuedDate: sampleDate,
                dueDate: sampleDate
            }]
        );
        comp.contract.currentBalance = 40.6;
        fixture.detectChanges();
        expect(comp.iconOverdue).toBe(true);
    });

    it('should set the property iconOverdue to FALSE warning icon for overdue + bill issued', () => {
        comp.type = { overdue: true, hasDebit: true };
        comp.contract = new ContractViewModel('123456789',
            <BillViewModel[]> [{
                newCharges: 0,
                totalDue: 0,
                issuedDate: sampleDate,
                dueDate: sampleDate
            }]
        );
        comp.contract.currentBalance = 40.6;
        fixture.detectChanges();
        expect(comp.iconOverdue).toBe(false);
    });

    it('should show the correct text for direct debit scenarios', () => {
        comp.type = { directDebit: true, hasDebit: true };
        comp.contract = new ContractViewModel('123456789',
            <BillViewModel[]> [{
                newCharges: 0,
                totalDue: 0,
                issuedDate: sampleDate,
                dueDate: sampleDate
            }]
        );
        comp.contract.currentBalance = 40.6;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.bill-panel-text__heading-text').textContent).toMatch(`Debited today`);
        expect(fixture.nativeElement.querySelector('.bill-panel-text__subheading-text').textContent).toMatch(`Direct Debit - ${sampleDateString}`);
    });

    it('should show the correct text for direct debit scenarios - Overdue but no new bill issued', () => {
        comp.type = { directDebit: true, overdue: true };
        comp.contract = new ContractViewModel('123456789',
            <BillViewModel[]> [{
                newCharges: 0,
                totalDue: 0,
                issuedDate: sampleDate,
                dueDate: sampleDate
            }]
        );
        comp.contract.currentBalance = 40.6;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.bill-panel-text__heading-text').textContent).toMatch('Due today');
        expect(fixture.nativeElement.querySelector('.bill-panel-text__subheading-text').textContent.trim()).toEqual(`Due - ${sampleDateString}`);
        expect(comp.iconOverdue).toBe(true);
        expect(comp.iconDirectDebit).toBe(false);
    });

    it('should show the correct text for direct debit scenarios - Overdue + new bill issued', () => {
        comp.type = { directDebit: true, overdue: true, paymentOverdueInDebit: true };
        comp.contract = new ContractViewModel('123456789',
            <BillViewModel[]> [{
                newCharges: 0,
                totalDue: 0,
                issuedDate: sampleDate,
                dueDate: sampleDate
            }]
        );
        comp.contract.paymentOverdue = 167;
        comp.contract.currentBalance = 50;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.bill-panel-text__subheading-text').textContent.trim()).toEqual(`Direct Debit - ${sampleDateString}`);
    });

    it('should show the correct text for direct debit scenarios - Overdue + new bill issued - PAYG High', () => {
        comp.type = { directDebit: true, overdue: true, hasDebit: true };
        comp.contract = new ContractViewModel('123456789',
            <BillViewModel[]> [{
                newCharges: 0,
                totalDue: 0,
                issuedDate: sampleDate,
                dueDate: new Date(2017, 6, 21)
            }]
        );
        nowMock.setDate(2018, 4, 7);
        comp.contract.paymentOverdue = 167;
        comp.contract.currentBalance = 50;
        comp.contract.isPayg = true;
        comp.contract.paygBand = PrePaymentBalanceTopUpUrgency.High;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('#bill-panel-heading-text').textContent).toMatch('Overdue by 290 days');
        expect(fixture.nativeElement.querySelector('.bill-panel-text__subheading-text').textContent.trim()).toEqual(`Due - Fri 21 Jul 2017`);
    });

    it('should show the link for bill smoothing scenarios', () => {
        comp.type = { billSmoothingV2: true };
        comp.contract = new ContractViewModel('123456789',
            <BillViewModel[]> [{
                newCharges: 0,
                totalDue: 0,
                issuedDate: sampleDate,
                dueDate: sampleDate
            }]
        );
        comp.contract.paymentScheme = {
            contractNumber: 123456789,
            paymentSchemeNumber: 2222,
            startDate: null,
            endDate: null,
            frequency: 'weekly',
            nextPayment: {
                date: sampleDate,
                amount: 20
            },
            previousPayment: null
        };
        comp.contract.currentBalance = 40.6;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.bill-panel-text__BS')).toBeDefined();
    });

    it('should show the link for bill smoothing scenarios in default mode', () => {
        comp.type = { billSmoothingV2: true };
        comp.contract = new ContractViewModel('123456789',
            <BillViewModel[]> [{
                newCharges: 0,
                totalDue: 0,
                issuedDate: sampleDate,
                dueDate: sampleDate
            }]
        );
        comp.contract.paymentScheme = {
            contractNumber: 123456789,
            paymentSchemeNumber: 2222,
            startDate: null,
            endDate: null,
            frequency: 'weekly',
            nextPayment: {
                date: sampleDate,
                amount: 20
            },
            previousPayment: null
        };
        comp.isDefaultMode = true;
        comp.isBsDDLinks = true;
        comp.contract.currentBalance = 40.6;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.bill-panel-text__BS')).toBeDefined();
    });

    it('should show the direct debit link and should not show the icon for no bills scenario', () => {
        comp.type = { directDebit: true, noBills: true };
        comp.contract = new ContractViewModel('123456789',
            <BillViewModel[]> [{
                newCharges: 0,
                totalDue: 0,
                issuedDate: sampleDate,
                dueDate: sampleDate
            }]
        );
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.bill-panel-text__DD').textContent).toMatch('Manage your Direct Debit');
        expect(comp.iconDirectDebit).toBeFalsy();
    });

    it('should show both direct debit link and icon for debit and overdue + bill issued', () => {
        comp.type = { directDebit: true, hasDebit: true, overdue: true };
        comp.contract = new ContractViewModel('123456789',
            <BillViewModel[]> [{
                newCharges: 0,
                totalDue: 0,
                issuedDate: sampleDate,
                dueDate: sampleDate
            }]
        );
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.bill-panel-text__DD').textContent).toMatch('Manage your Direct Debit');
        expect(comp.iconDirectDebit).toBe(false);
    });

    it('should show both direct debit link and icon for debit and overdue scenario - PAYG High', () => {
        comp.type = { directDebit: true, hasDebit: true, overdue: true };
        comp.contract = new ContractViewModel('123456789',
            <BillViewModel[]> [{
                newCharges: 0,
                totalDue: 0,
                issuedDate: sampleDate,
                dueDate: sampleDate
            }]
        );
        comp.contract.isPayg = true;
        comp.contract.paygBand = PrePaymentBalanceTopUpUrgency.High;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.bill-panel-text__DD').textContent).toMatch('Manage your Direct Debit');
        expect(comp.iconDirectDebit).toBe(false);
    });

    it('should show both direct debit link and icon for debit and overdue scenario - PAYG Low', () => {
        comp.type = { directDebit: true, hasDebit: true, overdue: true };
        comp.contract = new ContractViewModel('123456789',
            <BillViewModel[]> [{
                newCharges: 0,
                totalDue: 0,
                issuedDate: sampleDate,
                dueDate: sampleDate
            }]
        );
        comp.contract.isPayg = true;
        comp.contract.paygBand = PrePaymentBalanceTopUpUrgency.Low;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.bill-panel-text__DD').textContent).toMatch('Manage your Direct Debit');
        expect(comp.iconDirectDebit).toBeFalsy();
    });

    it('should show both direct debit link and should not show the text - PAYG High product swap scenario', () => {
        comp.type = { directDebit: true, hasDebit: true, overdue: true };
        comp.contract = new ContractViewModel('123456789',
            <BillViewModel[]> [{
                newCharges: 0,
                totalDue: 0,
                issuedDate: sampleDate,
                dueDate: sampleDate
            }]
        );
        comp.contract.isPayg = true;
        comp.contract.paygBand = PrePaymentBalanceTopUpUrgency.High;
        comp.contract.showOutstandingBillPayg = true;
        fixture.detectChanges();
        expect(comp.headingTextLine1).toBe('');
        expect(comp.headingSubText).toBe('');
        expect(fixture.nativeElement.querySelector('.bill-panel-text__DD').textContent).toMatch('Manage your Direct Debit');
        expect(comp.iconDirectDebit).toBeFalsy();
    });

    it('should show both direct debit link and should not show the text - PAYG High FPDD scenario', () => {
        comp.type = { directDebit: true, hasDebit: true, overdue: true };
        comp.contract = new ContractViewModel('123456789',
            <BillViewModel[]> [{
                newCharges: 0,
                totalDue: 0,
                issuedDate: sampleDate,
                dueDate: sampleDate
            }]
        );
        comp.contract.isPayg = true;
        comp.contract.paygBand = PrePaymentBalanceTopUpUrgency.High;
        comp.contract.paygPrepaymentEligibile = '2017-10-20T01:00:00Z';
        fixture.detectChanges();
        expect(comp.headingTextLine1).toBe('');
        expect(comp.headingSubText).toBe('');
        expect(fixture.nativeElement.querySelector('.bill-panel-text__DD').textContent).toMatch('Manage your Direct Debit');
        expect(comp.iconDirectDebit).toBeFalsy();
    });

    it('should show the correct text for overdue but no bill issued - Non direct debit scenario - PAYG High', () => {
        comp.type = { overdue: true, newBillAndOverdue: true };
        comp.contract = new ContractViewModel('123456789',
            <BillViewModel[]> [{
                newCharges: 0,
                totalDue: 0,
                issuedDate: sampleDate,
                dueDate: sampleDate
            }]
        );
        comp.contract.currentBalance = 40.6;
        comp.contract.paymentOverdue = 20;
        comp.contract.isPayg = true;
        comp.contract.paygBand = PrePaymentBalanceTopUpUrgency.High;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('#payment-amount-text').textContent).toMatch('60.60');
        expect(fixture.nativeElement.querySelector('#bill-panel-heading-text').textContent).toMatch('Due today');
        expect(fixture.nativeElement.querySelector('#bill-panel-subheading-text').textContent).toMatch(`Due - ${sampleDateString}`);
    });

    it('should show the correct text for overdue + new bill issued - Non direct debit scenario - PAYG High', () => {
        comp.type = { overdue: true, newBillAndOverdue: true, hasDebit: true };
        comp.contract = new ContractViewModel('123456789',
            <BillViewModel[]> [{
                newCharges: 0,
                totalDue: 0,
                issuedDate: sampleDate,
                dueDate: new Date(2017, 6, 21)
            }]
        );
        nowMock.setDate(2018, 4, 7);
        comp.contract.currentBalance = 40.6;
        comp.contract.paymentOverdue = 20;
        comp.contract.isPayg = true;
        comp.contract.paygBand = PrePaymentBalanceTopUpUrgency.High;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('#payment-amount-text').textContent).toMatch('60.60');
        expect(fixture.nativeElement.querySelector('#bill-panel-heading-text').textContent).toMatch('Overdue by 290 days');
        expect(fixture.nativeElement.querySelector('#bill-panel-subheading-text').textContent).toMatch(`Due - Fri 21 Jul 2017`);
    });

    it('should show the correct text for due scenarios - PAYG High', () => {
        comp.type = { hasDebit: true };
        comp.contract = new ContractViewModel('123456789',
            <BillViewModel[]> [{
                newCharges: 0,
                totalDue: 0,
                issuedDate: sampleDate,
                dueDate: sampleDate
            }]
        );
        comp.contract.currentBalance = 40.6;
        comp.contract.isPayg = true;
        comp.contract.paygBand = PrePaymentBalanceTopUpUrgency.High;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('#payment-amount-text').textContent).toMatch('40.60');
        expect(fixture.nativeElement.querySelector('#bill-panel-heading-text').textContent).toMatch('Due today');
        expect(fixture.nativeElement.querySelector('#bill-panel-subheading-text').textContent).toMatch(`Due - ${sampleDateString}`);
    });

    it('should show the correct text for due scenarios - extended due date', () => {
        const issuedDate = new Date(2018, 1, 1);
        const dueDate = new Date(2018, 2, 1);
        const extendedDueDate = new Date(2018, 3, 1);
        comp.type = { hasDebit: true };
        comp.contract = new ContractViewModel('123456789',
            <BillViewModel[]> [{
                newCharges: 0,
                totalDue: 0,
                issuedDate: issuedDate,
                dueDate: dueDate
            }]
        );
        comp.contract.currentBalance = 40.6;
        comp.contract.isPayg = false;
        comp.contract.extendedDueDate = extendedDueDate;
        fixture.detectChanges();
        expect(stripDuplicateWhitespace(fixture.nativeElement.querySelector('#bill-panel-subheading-additional-text').textContent)).toMatch(`Original due date - ${comp.longDate(dueDate)}`);
        expect(stripDuplicateWhitespace(fixture.nativeElement.querySelector('#bill-panel-subheading-text').textContent)).toMatch(`Extended due date - ${comp.longDate(extendedDueDate)}`);
    });

    it('should show the correct text for direct debit scenarios- PAYG High', () => {
        comp.type = { directDebit: true, hasDebit: true };
        comp.contract = new ContractViewModel('123456789',
            <BillViewModel[]> [{
                newCharges: 0,
                totalDue: 0,
                issuedDate: sampleDate,
                dueDate: sampleDate
            }]
        );
        comp.contract.currentBalance = 40.6;
        comp.contract.isPayg = true;
        comp.contract.paygBand = PrePaymentBalanceTopUpUrgency.High;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('#payment-amount-text').textContent).toMatch('40.60');
        expect(fixture.nativeElement.querySelector('#bill-panel-heading-text').textContent).toMatch(`Debited today`);
        expect(fixture.nativeElement.querySelector('#bill-panel-subheading-text').textContent.trim()).toEqual(`Direct Debit - ${sampleDateString}`);
    });

    it('should show the correct text for direct debit scenarios -PAYG High', () => {
        comp.type = { directDebit: true, overdue: true };
        comp.contract = new ContractViewModel('123456789',
            <BillViewModel[]> [{
                newCharges: 0,
                totalDue: 0,
                issuedDate: sampleDate,
                dueDate: sampleDate
            }]
        );
        comp.contract.currentBalance = 40.6;
        comp.contract.paymentOverdue = 20;
        comp.contract.isPayg = true;
        comp.contract.paygBand = PrePaymentBalanceTopUpUrgency.High;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('#payment-amount-text').textContent).toMatch('60.60');
        expect(fixture.nativeElement.querySelector('#bill-panel-heading-text').textContent).toMatch('Due today');
        expect(fixture.nativeElement.querySelector('#bill-panel-subheading-text').textContent).toMatch(`Due - ${sampleDateString}`);
    });

    it('should show the correct text for direct debit scenarios- extended due date', () => {
        const issuedDate = new Date(2018, 1, 1);
        const dueDate = new Date(2018, 2, 1);
        const extendedDueDate = new Date(2018, 3, 1);
        comp.type = { directDebit: true, hasDebit: true };
        comp.contract = new ContractViewModel('123456789',
            <BillViewModel[]> [{
                newCharges: 0,
                totalDue: 0,
                issuedDate: issuedDate,
                dueDate: dueDate
            }]
        );
        comp.contract.currentBalance = 40.6;
        comp.contract.isPayg = false;
        comp.contract.extendedDueDate = extendedDueDate;
        comp.contract.isDirectDebit = true;
        fixture.detectChanges();
        expect(stripDuplicateWhitespace(fixture.nativeElement.querySelector('#bill-panel-subheading-additional-text').textContent)).toMatch(`Original debit date - ${comp.longDate(dueDate)}`);
        expect(stripDuplicateWhitespace(fixture.nativeElement.querySelector('#bill-panel-subheading-text').textContent)).toMatch(`Extended debit date - ${comp.longDate(extendedDueDate)}`);
    });

    it('should show the correct text for direct debit scenarios- extended due date - Overdue + new bill issued', () => {
        const issuedDate = new Date(2018, 1, 1);
        const dueDate = new Date(2018, 2, 1);
        const extendedDueDate = new Date(2018, 3, 1);
        comp.type = { directDebit: true, hasDebit: true, overdue: true, paymentOverdueInDebit: true };
        comp.contract = new ContractViewModel('123456789',
            <BillViewModel[]> [{
                newCharges: 0,
                totalDue: 0,
                issuedDate: issuedDate,
                dueDate: dueDate
            }]
        );
        comp.contract.isPayg = false;
        comp.contract.extendedDueDate = extendedDueDate;
        comp.contract.isDirectDebit = true;
        comp.contract.paymentOverdue = 167;
        comp.contract.currentBalance = 50;
        fixture.detectChanges();
        expect(stripDuplicateWhitespace(fixture.nativeElement.querySelector('#bill-panel-subheading-additional-text').textContent)).toMatch(`Original debit date - ${comp.longDate(dueDate)}`);
        expect(stripDuplicateWhitespace(fixture.nativeElement.querySelector('#bill-panel-subheading-text').textContent)).toMatch(`Extended debit date - ${comp.longDate(extendedDueDate)}`);
    });

    it('should show the correct text for direct debit scenarios- extended due date - Overdue but no bill issued', () => {
        const issuedDate = new Date(2018, 1, 1);
        const dueDate = new Date(2018, 2, 1);
        const extendedDueDate = new Date(2018, 3, 1);
        comp.type = { directDebit: true, hasDebit: false, overdue: true };
        comp.contract = new ContractViewModel('123456789',
            <BillViewModel[]> [{
                newCharges: 0,
                totalDue: 0,
                issuedDate: issuedDate,
                dueDate: dueDate
            }]
        );
        comp.contract.currentBalance = 40.6;
        comp.contract.isPayg = false;
        comp.contract.extendedDueDate = extendedDueDate;
        comp.contract.isDirectDebit = true;
        fixture.detectChanges();
        expect(stripDuplicateWhitespace(fixture.nativeElement.querySelector('#bill-panel-subheading-additional-text').textContent)).toMatch(`Original due date - ${comp.longDate(dueDate)}`);
        expect(stripDuplicateWhitespace(fixture.nativeElement.querySelector('#bill-panel-subheading-text').textContent)).toMatch(`Extended due date - ${comp.longDate(extendedDueDate)}`);
    });

    it('should show the direct debit link and should not show the icon for no bills scenario -PAYG High', () => {
        comp.type = { directDebit: true, noBills: true };
        comp.contract = new ContractViewModel('123456789',
            <BillViewModel[]> [{
                newCharges: 0,
                totalDue: 0,
                issuedDate: sampleDate,
                dueDate: sampleDate
            }]
        );
        comp.contract.isPayg = true;
        comp.contract.paygBand = PrePaymentBalanceTopUpUrgency.High;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.bill-panel-text__DD').textContent).toMatch('Manage your Direct Debit');
        expect(comp.iconDirectDebit).toBeFalsy();
    });

    it('should show the payment extension styling only for payment extension', () => {
        comp.type = { hasDebit: true };
        comp.contract = new ContractViewModel('123456789',
            <BillViewModel[]> [{
                newCharges: 0,
                totalDue: 0,
                issuedDate: sampleDate,
                dueDate: sampleDate
            }]
        );
        comp.contract.currentBalance = 40.6;
        comp.contract.extendedDueDate = sampleDate;
        fixture.detectChanges();
        expect(comp.paymentExtensionApplied).toBe(false);
    });

    describe('Pay on time discount scenarios', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(BillSubtextComponent);
            comp = fixture.componentInstance;
            comp.isDashboard = true;
            comp.isTextRowTwoOnly = true;
            comp.contract = new ContractViewModel('123456789',
                <BillViewModel[]> [{
                    newCharges: 0,
                    totalDue: 0,
                    issuedDate: sampleDate,
                    dueDate: sampleDate
                }]
            );
            let iconRegistry: MatIconRegistry = fixture.debugElement.injector.get(MatIconRegistry);
            let sanitizer: DomSanitizer = fixture.debugElement.injector.get(DomSanitizer);
            iconRegistry.addSvgIcon('icon-payontime-applied-tick', sanitizer.bypassSecurityTrustResourceUrl('svg/icon-payontime-applied-tick.svg'));
        });

        it('should NOT show pay on time discount applied text when overdue + new bill issued', () => {
            comp.type = { hasDebit: true, paymentOverdueInDebit: true };
            comp.contract.hasPayOnTimeDiscount = true;
            comp.type.billSmoothingV2 = false;
            comp.type.outOfBillPeriod = false;
            comp.contract.payOnTimeDiscountAmount = 10;
            comp.contract.paymentOverdue = 167;
            comp.contract.currentBalance = 50;
            fixture.detectChanges();
            expect(comp.showPayOnTimeDiscountAppliedText).toBe(false);
            expect(fixture.debugElement.query(By.css('.bill-panel-text__pay-on-time-discount'))).toBeFalsy();
        });

        it('should show overdue charges and new charges text when bill is overdue + new bill issued - POTD ON', () => {
            comp.type = { hasDebit: true, paymentOverdueInDebit: true };
            comp.contract.hasPayOnTimeDiscount = true;
            comp.type.billSmoothingV2 = false;
            comp.contract.payOnTimeDiscountAmount = 10;
            comp.contract.paymentOverdue = 167;
            comp.contract.currentBalance = 50;
            fixture.detectChanges();

            expect(comp.showPaymentOverdueText).toBe(true);
            expect(comp.newCharges).toEqual('50.00');
            expect(comp.overdueCharges).toEqual('167.00');
            expect(fixture.debugElement.query(By.css('.bill-panel-text__payment-overdue-text'))).toBeTruthy();
        });

        it('should show overdue charges and new charges text when bill is overdue + new bill issued - POTD Off', () => {
            comp.type = { hasDebit: true, paymentOverdueInDebit: true };
            comp.contract.hasPayOnTimeDiscount = false;
            comp.type.billSmoothingV2 = false;
            comp.contract.payOnTimeDiscountAmount = 10;
            comp.contract.paymentOverdue = 167;
            comp.contract.currentBalance = 50;
            fixture.detectChanges();

            expect(comp.showPaymentOverdueText).toBe(true);
            expect(comp.newCharges).toEqual('50.00');
            expect(comp.overdueCharges).toEqual('167.00');
            expect(fixture.debugElement.query(By.css('.bill-panel-text__payment-overdue-text'))).toBeTruthy();
        });

        it('should show overdue charges and new charges text when bill is overdue + new bill issued and billSmoothingV2 is True', () => {
            comp.type = { hasDebit: true, paymentOverdueInDebit: true, billSmoothingV2: true };
            comp.contract.paymentOverdue = 167;
            comp.contract.currentBalance = 50;
            comp.contract.paymentScheme = {
                contractNumber: 123456789,
                paymentSchemeNumber: 2222,
                startDate: null,
                endDate: null,
                frequency: 'weekly',
                nextPayment: {
                    date: sampleDate,
                    amount: 20
                },
                previousPayment: null
            };
            fixture.detectChanges();

            expect(comp.showPaymentOverdueText).toBe(true);
            expect(comp.newCharges).toEqual('50.00');
            expect(comp.overdueCharges).toEqual('167.00');
            expect(fixture.debugElement.query(By.css('.bill-panel-text__payment-overdue-text'))).toBeFalsy();
        });

        it('should NOT show overdue charges and new charges text when bill is due', () => {
            comp.type = { hasDebit: true };
            comp.contract.hasPayOnTimeDiscount = true;
            comp.type.billSmoothingV2 = false;
            comp.contract.payOnTimeDiscountAmount = 10;

            fixture.detectChanges();

            expect(comp.showPaymentOverdueText).toBe(false);
            expect(fixture.debugElement.query(By.css('.bill-panel-text__payment-overdue-text'))).toBeFalsy();
        });

        it('should show pay on time discount applied text when bill is due', () => {
            comp.type = { hasDebit: true, paymentOverdueInDebit: false };
            comp.contract.hasPayOnTimeDiscount = true;
            comp.type.billSmoothingV2 = false;
            comp.type.outOfBillPeriod = false;
            comp.contract.payOnTimeDiscountAmount = 10;
            fixture.detectChanges();
            expect(comp.showPayOnTimeDiscountAppliedText).toBe(true);
            expect(fixture.debugElement.query(By.css('.bill-panel-text__pay-on-time-discount'))).toBeTruthy();
        });

        it('should not display the pay on time discount applied text when the POTD amount is zero', () => {
            comp.type = { hasDebit: true, paymentOverdueInDebit: true };
            comp.contract.hasPayOnTimeDiscount = true;
            comp.type.billSmoothingV2 = false;
            comp.type.outOfBillPeriod = false;
            comp.contract.payOnTimeDiscountAmount = 0;
            comp.contract.paymentOverdue = 167;
            comp.contract.currentBalance = 50;
            fixture.detectChanges();
            expect(comp.showPayOnTimeDiscountAppliedText).toBe(false);
            expect(fixture.debugElement.query(By.css('.bill-panel-text__pay-on-time-discount'))).toBeFalsy();
        });
    });

    describe('Router Link for Billsmoothing and Direct Debit', () => {
        it('should contain the Bill smoothing route billSmoothingV2 is true', () => {
            comp.type = { billSmoothingV2: true };
            comp.contract = new ContractViewModel('123456789',
                <BillViewModel[]> [{
                    newCharges: 0,
                    totalDue: 0,
                    issuedDate: sampleDate,
                    dueDate: sampleDate
                }]
            );
            comp.contract.paymentScheme = {
                contractNumber: 123456789,
                paymentSchemeNumber: 2222,
                startDate: null,
                endDate: null,
                frequency: 'weekly',
                nextPayment: {
                    date: sampleDate,
                    amount: 20
                },
                previousPayment: null
            };
            comp.contract.currentBalance = 40.6;
            fixture.detectChanges();
            let directDebit = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
            let index = directDebit.findIndex((de) => de.properties['href'] === '/settings/billsmoothing');
            expect(index).toBeGreaterThan(-1);
        });
        it('should contain the direct debit route when directDebit is true', () => {
            comp.type = { directDebit: true, hasDebit: true };
            comp.contract = new ContractViewModel('123456789',
                <BillViewModel[]> [{
                    newCharges: 0,
                    totalDue: 0,
                    issuedDate: sampleDate,
                    dueDate: sampleDate
                }]
            );
            comp.contract.currentBalance = 40.6;
            fixture.detectChanges();
            let directDebit = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
            let index = directDebit.findIndex((de) => de.properties['href'] === '/settings/directdebit');
            expect(index).toBeGreaterThan(-1);
        });
    });

    describe('update sub text for bill smoothing', () => {
        beforeEach(() => {
            comp.contract = new ContractViewModel('123456789',
                <BillViewModel[]> [{
                    newCharges: 0,
                    totalDue: 0,
                    issuedDate: sampleDate,
                    dueDate: sampleDate
                }]
            );
            comp.contract.paymentScheme = new PaymentSchemeDisplayModel();
            comp.contract.paymentScheme.nextPayment = {
                date: sampleDate,
                amount: 10
            };
            comp.contract.paymentScheme.frequency = 'Weekly';

            comp.contract.currentBalance = 40.6;
        });

        it('when is direct debit', () => {
            // arrange
            comp.type = { billSmoothingV2: true, directDebit: true };

            // act
            comp.ngOnInit();

            // assert
            expect(comp.headingSubText).toContain('Direct Debit');
        });

        it('when is NOT direct debit', () => {
            // arrange
            comp.type = { billSmoothingV2: true, directDebit: false };

            // act
            comp.ngOnInit();

            // assert
            expect(comp.headingSubText).toContain('Due');
        });
    });
});
