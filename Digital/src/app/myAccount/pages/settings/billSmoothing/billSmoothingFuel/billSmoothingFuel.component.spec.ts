import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { By, DomSanitizer } from '@angular/platform-browser';
import { RouterTestingModule  } from '@angular/router/testing';
import { MyAccountMaterialModule } from '../../../../modules/my-account.material.module';

import { TestBed } from '@angular/core/testing';
import { MatIconRegistry } from '@angular/material/icon';
import { AlertComponent } from '../../../../../shared/component/alert/alert.component';
import { ModalService } from '../../../../modal/modal.service';
import { PaymentService } from '../../../../services/payment.service';
import { WebChatComponent } from '../../../../../shared/component/webChat/webChat.component';
import { BillSmoothingService } from '../billSmoothing.service';
import { BillSmoothingChatButtonComponent } from '../billSmoothingChatButton/billSmoothingChatButton.component';
import { BillSmoothingSetupButtonComponent } from '../billSmoothingSetupButton/billSmoothingSetupButton.component';
import { BillSmoothingFuelComponent } from './billSmoothingFuel.component';
import { TestData } from '../billSmoothing.component.data';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Bill Smoothing Fuel Component', () => {
    let sut: BillSmoothingFuelComponent;
    let fixture: ComponentFixture<BillSmoothingFuelComponent>;
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
                BillSmoothingFuelComponent,
                BillSmoothingChatButtonComponent,
                BillSmoothingSetupButtonComponent,
                WebChatComponent,
                AlertComponent
            ],
            imports: [
                MyAccountMaterialModule,
                RouterTestingModule,
                HttpModule,
                HttpClientTestingModule,
            ],
            providers: [
                ModalService,
                { provide: PaymentService, useValue: {} },
                { provide: BillSmoothingService, useValue: BillSmoothingAccountsServiceStub },
                { provide: MATERIAL_SANITY_CHECKS, useValue: false },
            ]
        });

        fixture = TestBed.createComponent(BillSmoothingFuelComponent);
        sut = fixture.componentInstance;
        de = fixture.debugElement;
        billSmoothingAccountsService = fixture.debugElement.injector.get(BillSmoothingService);

        let iconRegistry: MatIconRegistry = fixture.debugElement.injector.get(MatIconRegistry);
        let sanitizer: DomSanitizer = fixture.debugElement.injector.get(DomSanitizer);
        iconRegistry.addSvgIcon('alert_success', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_elec_enabled.svg'));
        iconRegistry.addSvgIcon('alert_success', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_elec_enabled.svg'));

        // spy on static BillSmoothingAccountsService methods
        spyOn(BillSmoothingService, 'generateLongDate').and.returnValue('longDate');
        spyOn(BillSmoothingService, 'generateDayFromDate').and.returnValue('day');
    });

    it('should show already setup message', () => {
        // arrange
        sut.fuelInformation = TestData.oneAccountWithOneElec[0];
        sut.fuelInformation.hasBillSmoothing = true;
        sut.fuelInformation.paymentScheme = TestData.paymentSchemeDisplayModel;

        fixture.detectChanges();

        // act
        sut.ngOnInit();

        // assert
        let firstRow = de.query(By.css('.bs-fuel-first-row'));
        expect(firstRow.nativeElement.innerText).toContain('electricity: Bill Smoothing isn\'t set up yet');
        let secondRow = de.query(By.css('.bs-fuel-second-row'));
        expect(secondRow.nativeElement.innerText).toBe('frequency payments of $100');
    });

    it('should show estimate information', () => {
        // arrange
        sut.fuelInformation = TestData.oneAccountWithOneElec[0]; // this fuel information data has payment option
        sut.fuelInformation.hasBillSmoothing = false;
        fixture.detectChanges();

        // act
        sut.ngOnInit();

        // assert
        let thirdRow = de.query(By.css('.bs-fuel-third-row'));
        expect(thirdRow.nativeElement.innerText).toBe('You can also choose weekly or monthly payments during setup.');
    });

    it('should see next payment date and amount when next payment is available', () => {
        // arrange
        sut.fuelInformation = TestData.oneAccountWithOneElec[0];
        sut.fuelInformation.hasBillSmoothing = true;
        sut.fuelInformation.paymentScheme = TestData.paymentSchemeWithNextPayment;
        fixture.detectChanges();

        // act
        sut.ngOnInit();

        // assert
        let secondRow = de.query(By.css('.bs-fuel-second-row'));
        expect(secondRow.nativeElement.innerText).toBe('frequency payments of $300');
        let payment = de.query(By.css('.bs-fuel-next-payment--first-row'));
        expect(payment.nativeElement.innerText).toBe('Your next payment: longDate');
    });

    it('should see previous payment date and amount when next payment is not available', () => {

        // arrange
        sut.fuelInformation = TestData.oneAccountWithOneElec[0];
        sut.fuelInformation.hasBillSmoothing = true;
        sut.fuelInformation.paymentScheme = TestData.paymentSchemeWithoutNextPayment;

        fixture.detectChanges();

        // act
        sut.ngOnInit();

        // assert
        let secondRow = de.query(By.css('.bs-fuel-second-row'));
        expect(secondRow.nativeElement.innerText).toBe('frequency payments of $200');
        let payment = de.query(By.css('.bs-fuel-next-payment--first-row'));
        expect(payment.nativeElement.innerText).toBe('Your last paid payment: longDate');
    });

    describe('error case', () => {
        beforeEach(() => {
            sut.fuelInformation = TestData.oneAccountWithOneElec[0];
            sut.fuelInformation.hasBillSmoothing = false;
            sut.fuelInformation.paymentOptions = null;
            sut.fuelInformation.alerts = [];
        });

        it('should show PAYG error message', () => {
            // arrange
            sut.fuelInformation.alerts.push(TestData.paygErrorAlert);
            fixture.detectChanges();

            // act
            sut.ngOnInit();

            // assert
            let alertText = de.query(By.css('.alert__text'));
            expect(alertText.nativeElement.innerText).toContain('If you\'d like to switch to Bill Smoothing');
            let alertTextHeading = de.query(By.css('.alert__text--heading'));
            expect(alertTextHeading.nativeElement.innerText).toContain('AGL Prepaid');
        });

        it('should show api error message', () => {
            // arrange
            sut.fuelInformation = TestData.oneAccountWithOneElec[0];
            sut.fuelInformation.hasEstimatesApiError = true;
            fixture.detectChanges();

            // act
            sut.ngOnInit();

            // assert
            let alertTextHeading = de.query(By.css('.bs-fuel-first-row'));
            expect(alertTextHeading.nativeElement.innerText).toContain('Bill Smoothing isn\'t set up yet');
        });
    });
});
