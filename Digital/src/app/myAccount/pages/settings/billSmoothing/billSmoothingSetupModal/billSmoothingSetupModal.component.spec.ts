import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatIconRegistry } from '@angular/material/icon';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { By, DomSanitizer } from '@angular/platform-browser';

import { ApiService } from '../../../../../shared/service/api.service';
import { IMessageBusService } from '../../../../../shared/service/contract/imessageBus.service';
import { DataLayerService } from '../../../../../shared/service/dataLayer.service';
import { ModalService } from '../../../../modal/modal.service';
import { CommonComponentsModule } from '../../../../modules/commonComponents.module';
import { CommonPipesModule } from '../../../../modules/commonPipes.module';
import { MyAccountMaterialModule } from '../../../../modules/my-account.material.module';
import { IAccountServiceMA } from '../../../../services/account.service';
import { TestData } from '../billSmoothing.component.data';
import { BillSmoothingService } from '../billSmoothing.service';
import { BillSmoothingSetupFuelComponent } from '../billSmoothingSetupFuel/billSmoothingSetupFuel.component';
import { BillSmoothingSetupFuelItemComponent } from '../billSmoothingSetupFuel/billSmoothingSetupFuelItem/billSmoothingSetupFuelItem.component';
import { MonthlyDatePickerComponent } from '../billSmoothingSetupFuel/billSmoothingSetupFuelItem/monthlyDatePicker/monthlyDatePicker.component';
import { BillSmoothingSetupSuccessfulComponent } from '../billSmoothingSetupSuccessful/billSmoothingSetupSuccessful.component';
import { BillSmoothingSetupModalComponent } from './billSmoothingSetupModal.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Bill Smoothing Setup Modal Component', () => {
    let sut: BillSmoothingSetupModalComponent;
    let fixture: ComponentFixture<BillSmoothingSetupModalComponent>;
    let de: DebugElement;
    let messageBusService: any;
    let billSmoothingService: any;
    let dataLayerService: any;

    beforeEach(() => {
        let IMessageBusServiceStub = {
            listen: () => {
                throw new Error('IMessageBusServiceStub.listen has not been mocked properly.');
            }
        };
        let BillSmoothingServiceStub = {
            generateBillCycleChangeMessage: () => {
                throw new Error('BillSmoothingServiceStub.generateBillCycleChangeMessage has not been mocked properly.');
            },
            getStartInformationSubtext: () => {
                throw new Error('BillSmoothingServiceStub.getStartInformationSubtext has not been mocked properly.');
            }
        };
        let DataLayerServiceStub = {
            pushNewPageEvent: () => {
                throw new Error('DataLayerServiceStub.pushNewPageEvent has not been mocked properly.');
            }
        };
        let ModalServiceStub = {};
        let ApiServiceStub = {};
        let IAccountServiceMAStub = {};
        TestBed.configureTestingModule({
            declarations: [
                BillSmoothingSetupModalComponent,
                BillSmoothingSetupFuelComponent,
                BillSmoothingSetupSuccessfulComponent,
                BillSmoothingSetupFuelItemComponent,
                MonthlyDatePickerComponent
            ],
            imports: [
                CommonPipesModule,
                MyAccountMaterialModule,
                FormsModule,
                CommonComponentsModule,
                HttpModule,
                HttpClientTestingModule,
            ],
            providers: [
                { provide: BillSmoothingService, useValue: BillSmoothingServiceStub },
                { provide: ModalService, useValue: ModalServiceStub },
                { provide: IMessageBusService, useValue: IMessageBusServiceStub },
                { provide: ApiService, useValue: ApiServiceStub },
                { provide: IAccountServiceMA, useValue: IAccountServiceMAStub },
                { provide: MATERIAL_SANITY_CHECKS, useValue: false },
                { provide: DataLayerService, useValue: DataLayerServiceStub }
            ]
        });

        fixture = TestBed.createComponent(BillSmoothingSetupModalComponent);
        sut = fixture.componentInstance;

        let iconRegistry: MatIconRegistry = fixture.debugElement.injector.get(MatIconRegistry);
        let sanitizer: DomSanitizer = fixture.debugElement.injector.get(DomSanitizer);
        iconRegistry.addSvgIcon('icon-elec-enabled', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_elec_enabled.svg'));
        iconRegistry.addSvgIcon('icon-gas-enabled', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_gas_enabled.svg'));
        messageBusService = fixture.debugElement.injector.get(IMessageBusService);
        billSmoothingService = fixture.debugElement.injector.get(BillSmoothingService);
        dataLayerService = fixture.debugElement.injector.get(DataLayerService);
        // tslint:disable-next-line:no-empty
        spyOn(messageBusService, 'listen').and.returnValue({ subscribe: () => { } });
        spyOn(billSmoothingService, 'generateBillCycleChangeMessage');
        spyOn(billSmoothingService, 'getStartInformationSubtext');
        spyOn(dataLayerService, 'pushNewPageEvent').and.stub();
        sut.setupSuccessful = false;
    });

    describe('Setup modal screen', () => {
        it('should show address for multi account user', () => {
            sut.args = [
                true,
                TestData.accountDetailWithOneElecOneGas,
                TestData.oneAccountWithOneElec
            ];

            de = fixture.debugElement;
            fixture.detectChanges();

            let accountdetails = de.query(By.css('.account-details')).nativeElement;
            expect(accountdetails).toBeDefined();
        });
        it('should not show address for single account user', () => {
            sut.args = [
                false,
                TestData.accountDetailWithOneElecOneGas,
                TestData.oneAccountWithOneElec
            ];

            de = fixture.debugElement;
            fixture.detectChanges();

            let accountdetails = de.query(By.css('.account-details'));
            expect(accountdetails).toBe(null);
        });
    });

});
