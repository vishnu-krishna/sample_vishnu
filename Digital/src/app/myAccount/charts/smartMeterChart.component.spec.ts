import { NowMock } from './../services/mock/now.mock.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { ToolTipWhiteComponent } from '../../shared/component/usagetooltip/tooltipWhite.component';
import { UsageTooltipComponent } from '../../shared/component/usagetooltip/usageTooltip.component';
import { ContentService } from '../../shared/service/content.service';
import { DataLayerService } from '../../shared/service/dataLayer.service';
import { DocumentService } from '../../shared/service/document.service';
import { Now } from '../../shared/service/now.service';
import { PrepaidBalanceComponent } from '../dashboard/payg/prepaidBalance.component';
import { CommonPipesModule } from '../modules/commonPipes.module';
import { BillViewModel, ContractViewModel } from '../services/account.service';
// Load the implementations that should be tested
import { SmartMeterChartComponent } from './smartMeterChart.component';
import { SmartMeterTooltipComponent } from './smartMeterTooltip.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Mock } from 'ts-mocks';
import { BillDescriptionService } from '../services/billDescription.service';

describe('Smart Meter', () => {
    let fixture: ComponentFixture<SmartMeterChartComponent>;

    let nowMock: NowMock;

    let mockContent = {
        selfService: {
            toolTips: {
                usageTooltip: {
                    header: 'Usage charges',
                    description: 'Usage charge is indicative only and you should refer to your bill for actual amount. This excludes concessions, conditional discounts, fixed charges and other adjustments.'
                }
            }
        }
    };

    beforeEach(async(() => {
        let mockBillDescriptionService = new Mock<BillDescriptionService>();
        mockBillDescriptionService.setup((m) => m.dateRangeDescription).is(() => 'dummy dateRangeDescription value');

        let contentServiceStub = {
            getContent: () => {
                throw new Error('contentServiceStub.load has not been mocked properly.');
            }
        };

        class MockDataLayerService {
            public mockName: string = 'Mocked Service';

            public pushPayment() { return; }

            public pushOmmSuccess() { return; }

            public pushPaygButton() { return; }

            public pushError() { return; }
        }

        nowMock = new NowMock('');

        TestBed.configureTestingModule({
            declarations: [
                SmartMeterChartComponent,
                SmartMeterTooltipComponent,
                PrepaidBalanceComponent,
                UsageTooltipComponent,
                ToolTipWhiteComponent
            ],
            imports: [
                CommonPipesModule,
                RouterTestingModule
            ],
            providers: [
                DocumentService,
                { provide: Now, useValue: nowMock },
                { provide: 'AppContentBranch', useValue: 'selfService' },
                { provide: ContentService, useValue: contentServiceStub },
                { provide: DataLayerService, useClass: MockDataLayerService },
                { provide: BillDescriptionService, useValue: mockBillDescriptionService.Object }
            ]
        });
        fixture = TestBed.createComponent(SmartMeterChartComponent);
        let contentService = fixture.debugElement.injector.get(ContentService);
        spyOn(contentService, 'getContent').and.returnValue(Observable.of(mockContent));
    }));

    describe('Should have a arc of 0%', () => {
        it('should show an arc of 0%', async(() => {
            // ARRANGE
            // Create the contract view
            let testModel = new ContractViewModel('111111111', new Array<BillViewModel>());
            // Prep the bills
            testModel.bills = new Array<BillViewModel>();
            // Push dummy data to bills
            testModel.bills.push(new BillViewModel(0, 0, null, null, false, false, 'Paid', null, null));
            // Set a start date
            testModel.currentBillStartDate = new Date('2015-11-10T00:00:00');
            // Set a bill end date
            testModel.currentBillEndDate = new Date('2016-02-09T00:00:00');

            testModel.costToDate = 0;
            testModel.projectedBill = 0;
            // Mock the now date (beginning of bill)
            nowMock.setDate(2015, 10, 10);
            fixture.componentInstance.contract = testModel;
            fixture.componentInstance.showProjection = false;
            // ACT
            fixture.detectChanges();
            // fixture.componentInstance.ngOnInit();
            // ASSERT
            expect(fixture.componentInstance.percent).toEqual(0);
        }));
    });

    describe('Should have a arc of 49%', () => {
        it('should show an arc of 49%', async(() => {
            // ARRANGE
            // let fixture = TestBed.createComponent(SmartMeterChartComponent);
            let testModel = new ContractViewModel('111111111', new Array<BillViewModel>());

            testModel.bills = new Array<BillViewModel>();
            testModel.bills.push(new BillViewModel(0, 0, null, null, false, false, 'Paid', null, null));
            testModel.currentBillStartDate = new Date('2015-11-10T00:00:00');
            testModel.currentBillEndDate = new Date('2016-02-09T00:00:00');
            // Mock the now date (Midway of the bill)
            nowMock.setDate(2015, 11, 25);
            fixture.componentInstance.contract = testModel;
            fixture.componentInstance.showProjection = false;
            // ACT
            fixture.componentInstance.ngOnInit();
            // ASSERT
            expect(fixture.componentInstance.percent).toEqual(49);
        }));
    });

    describe('Should have a arc of 100%', () => {
        it('should show an arc of 100%', async(() => {
            // ARRANGE
            // let fixture = TestBed.createComponent(SmartMeterChartComponent);
            let testModel = new ContractViewModel('111111111', new Array<BillViewModel>());

            testModel.bills = new Array<BillViewModel>();
            testModel.bills.push(new BillViewModel(0, 0, null, null, false, false, 'Paid', null, null));
            testModel.currentBillStartDate = new Date('2015-11-10T00:00:00');
            testModel.currentBillEndDate = new Date('2016-02-09T00:00:00');
            // Mock the now date (Midway of the bill)
            nowMock.setDate(2016, 1, 9);
            fixture.componentInstance.contract = testModel;
            fixture.componentInstance.showProjection = false;
            // ACT
            fixture.componentInstance.ngOnInit();
            // ASSERT
            expect(fixture.componentInstance.percent).toEqual(100);
        }));
    });

    describe('Should display different based on scenarios', () => {
        it('should show electric vehicle', async(() => {
            // ARRANGE
            // let fixture = TestBed.createComponent(SmartMeterChartComponent);
            let testModel = new ContractViewModel('111111111', new Array<BillViewModel>());

            testModel.bills = new Array<BillViewModel>();
            testModel.bills.push(new BillViewModel(0, 0, null, null, false, false, 'Paid', null, null));
            testModel.hasElectricVehicle = true;
            fixture.componentInstance.contract = testModel;
            // ACT
            fixture.componentInstance.ngOnInit();
            // ASSERT
            expect(fixture.componentInstance.hasElectricVehicle).toEqual(true);
            expect(fixture.componentInstance.subHeadingText).toBe('dummy dateRangeDescription value');
        }));
    });
});
