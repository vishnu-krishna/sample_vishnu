import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrencyPipe } from '@angular/common';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { PaymentAssistanceSelectComponent } from './paymentAssistanceSelect.component';
import { PaymentAssistanceSelectModule } from './paymentAssistanceSelect.module';
import { BillStatusDisplayService, IBillStatusDisplayService } from './services';
import { FuelChipService, ClassifiedFuelChips, IFuelChipService, IFuelChipClassificationService, FuelChipClassificationService } from '../services';
import { IAccountServiceMA, AccountOwnerModel } from '../../../../services/account.service';
import { AccountMockService } from '../../../../services/mock/account.mock.service';
import { IPaymentExtensionEligibility, PaymentExtensionContractEligibility } from '../../../../services/paymentScheme/paymentExtensionEligibility.service';
import { DataLayerService } from '../../../../../shared/service/dataLayer.service';
import { Now } from '../../../../../shared/service/now.service';
import { JwtDecoderService } from '../../../../../shared/service/jwt.decoder.service';
import { ApiService } from '../../../../../shared/service/api.service';
import { IBusinessPartnerNumberService } from '../../../../services/contract/ibusinessPartnerNumber.service';
import { FuelChipDataModel } from '../models';
import { MauiFuelChipFuelType, MauiFuelChipFuelContext, MauiFuelChipState, FuelChipMessage, MauiSecondaryMessageStatusType, PrimaryMessageLink } from '../../../../maui/fuelChip';
import { BillStatusDisplayEnum } from './enums';
import { AglCurrencyPipe } from '../../../../pipes/aglCurrency.pipe';
import { By } from '@angular/platform-browser';
import { DocumentService } from '../../../../../shared/service/document.service';

describe('Payment Assistance Select Component', () => {

    let comp: PaymentAssistanceSelectComponent;
    let fixture: ComponentFixture<PaymentAssistanceSelectComponent>;

    let fuelChipService: IFuelChipService;
    let accountService: IAccountServiceMA;
    let accountMockService = new AccountMockService();

    let dataLayerService: DataLayerService;

    // Create a wrapper for services that are not called under test
    const emptyMockService = {};

    let classifiedFuelChips: ClassifiedFuelChips;
    let accountOwnerModel: AccountOwnerModel;
    let billStatusDisplayService: IBillStatusDisplayService;
    let router: Router;
    let fuelChipClassificationService: FuelChipClassificationService;

    const routes: Routes = [
        { path: 'overview', redirectTo: '' },
        { path: 'bills/paymentassistance/plan/confirm/:contractAccountNumber/:contractNumber', redirectTo: '' }
    ];

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                PaymentAssistanceSelectModule,
                RouterTestingModule.withRoutes(routes)
            ],
            providers: [
                Now,
                AglCurrencyPipe,
                { provide: IFuelChipService, useClass: FuelChipService },
                DataLayerService,
                { provide: 'AppContentBranch', useValue: 'selfService' },
                { provide: IAccountServiceMA, useValue: accountMockService },
                { provide: IPaymentExtensionEligibility, useValue: emptyMockService },
                { provide: MATERIAL_SANITY_CHECKS, useValue: false },
                { provide: JwtDecoderService, useValue: emptyMockService },
                { provide: ApiService, useValue: emptyMockService },
                { provide: IBusinessPartnerNumberService, useValue: emptyMockService },
                { provide: IBillStatusDisplayService, useClass: BillStatusDisplayService },
                { provide: IFuelChipClassificationService, FuelChipClassificationService },
                DocumentService
            ]
        });

        fixture = TestBed.createComponent(PaymentAssistanceSelectComponent);
        comp = fixture.componentInstance;

        accountService = TestBed.get(IAccountServiceMA);
        fuelChipService = TestBed.get(IFuelChipService);
        dataLayerService = TestBed.get(DataLayerService);
        billStatusDisplayService = TestBed.get(IBillStatusDisplayService);
        router = TestBed.get(Router);
        fuelChipClassificationService = TestBed.get(IFuelChipClassificationService);

    });

    describe('Initialise', () => {

        describe('No fuel chips', () => {

            it('should show the dog of doom', () => {
                // ARRANGE
                classifiedFuelChips = new ClassifiedFuelChips([], [], []);
                accountOwnerModel = new AccountOwnerModel('firstName', 'secondName');
                spyOn(fuelChipService, 'init').and.returnValue(Observable.of(classifiedFuelChips));
                spyOn(accountService, 'getAccounts').and.returnValue(Observable.of([]));
                spyOn(accountService, 'getName').and.returnValue(Observable.of(accountOwnerModel));
                spyOn(dataLayerService, 'trackPaymentExtensionDogDoomError');

                // ACT
                comp.ngOnInit();

                // ASSERT
                expect(comp.showError).toBeTruthy();
            });
        });

        describe('With fuel chips', () => {

            beforeEach(() => {
                // ARRANGE
                const fuelChip = new FuelChipDataModel('111', '222', MauiFuelChipFuelType.Electricity, null, null, MauiFuelChipFuelContext.None);
                const message = new FuelChipMessage('', { key: '', title: ' ' }, '', MauiSecondaryMessageStatusType.Success);
                fuelChip.setClassification(MauiFuelChipState.Display, message, '');
                classifiedFuelChips = new ClassifiedFuelChips([fuelChip], [], []);
                accountOwnerModel = new AccountOwnerModel('firstName middleName', 'secondName');
                spyOn(fuelChipService, 'init').and.returnValue(Observable.of(classifiedFuelChips));
                spyOn(accountService, 'getAccounts').and.returnValue(Observable.of([]));
                spyOn(accountService, 'hasContractPayOnTimeDiscount').and.returnValue(true);
                spyOn(accountService, 'getName').and.returnValue(Observable.of(accountOwnerModel));
                spyOn(billStatusDisplayService, 'determineBillStatusDisplay').and.returnValue(BillStatusDisplayEnum.Eligible);
                spyOn(billStatusDisplayService, 'setDisplayMode');
                spyOn(billStatusDisplayService, 'setSubheading1SelectBill');
            });

            it('should not display the dog of doom', () => {
                // ACT
                comp.ngOnInit();

                // ASSERT
                expect(comp.showError).toBeFalsy();
            });

            it('should call setDisplayMode() passing Eligible', () => {
                // ACT
                comp.ngOnInit();

                // ASSERT
                expect(billStatusDisplayService.setDisplayMode).toHaveBeenCalledWith(BillStatusDisplayEnum.Eligible);
            });

            it('should call setSubheading1 passing Firstname Middlename', () => {

                // ACT
                comp.ngOnInit();

                // ASSERT
                expect(billStatusDisplayService.setSubheading1SelectBill).toHaveBeenCalledWith('Firstname Middlename');
            });

            it('should not show chat button', () => {
                // act
                comp.ngOnInit();
                fixture.detectChanges();

                // assert
                const chatButton = fixture.debugElement.query(By.css('[chatButtonId=LPPaymentAssistanceSelect]'));
                expect(chatButton).toBeFalsy();
            });
        });

        describe('With ineligible fuel chips', () => {
            beforeEach(() => {
                // ARRANGE
                const fuelChip = new FuelChipDataModel('111', '222', MauiFuelChipFuelType.Electricity, null, null, MauiFuelChipFuelContext.None);
                const message = new FuelChipMessage('', { key: '', title: ' ' }, '', MauiSecondaryMessageStatusType.Success);
                fuelChip.setClassification(MauiFuelChipState.Ineligible, message, '');
                classifiedFuelChips = new ClassifiedFuelChips([], [], [fuelChip]);
                accountOwnerModel = new AccountOwnerModel('firstName middleName', 'secondName');
                spyOn(fuelChipService, 'init').and.returnValue(Observable.of(classifiedFuelChips));
                spyOn(accountService, 'getAccounts').and.returnValue(Observable.of([]));
                spyOn(accountService, 'hasContractPayOnTimeDiscount').and.returnValue(true);
                spyOn(accountService, 'getName').and.returnValue(Observable.of(accountOwnerModel));
                spyOn(billStatusDisplayService, 'determineBillStatusDisplay').and.returnValue(BillStatusDisplayEnum.Ineligible);
                spyOn(billStatusDisplayService, 'setDisplayMode');
                spyOn(billStatusDisplayService, 'setSubheading1SelectBill');
            });

            it('should show chat button', () => {
                // act
                comp.ngOnInit();
                fixture.detectChanges();

                // assert
                const chatButton = fixture.debugElement.query(By.css('[chatButtonId=LPPaymentAssistanceSelect]'));
                expect(chatButton).toBeTruthy();
            });
        });
    });

    describe('onFuelChipSelected()', () => {
        it('should navigate to /bills/paymentassistance/choose', () => {
            // ARRANGE
            const fuelChip = new FuelChipDataModel('111', '222', MauiFuelChipFuelType.Electricity, [], null, MauiFuelChipFuelContext.None);
            comp.classifiedFuelChips = new ClassifiedFuelChips([fuelChip], [], []);
            spyOn(router, 'navigate');

            // ACT
            comp.onFuelChipSelected('222');

            // ASSERT
            expect(router.navigate).toHaveBeenCalledWith(['/bills/paymentassistance/choose/111/222'], { queryParamsHandling: 'preserve' });

        });
    });

    describe('goToOverview', () => {
        it('should navigate to /overview', () => {
            // ARRANGE
            spyOn(router, 'navigate');

            // ACT
            comp.goToOverview();

            // ASSERT
            expect(router.navigate).toHaveBeenCalledWith(['/overview']);

        });
    });

});
