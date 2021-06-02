import { DebugElement, LOCALE_ID }    from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { DateAdapter, MATERIAL_SANITY_CHECKS, MAT_NATIVE_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { By } from '@angular/platform-browser';
import { Observable }      from 'rxjs/Observable';
import { ToolTipWhiteComponent } from '../../../../../shared/component/usagetooltip/tooltipWhite.component';
import { UsageTooltipComponent } from '../../../../../shared/component/usagetooltip/usageTooltip.component';
import { Locale }  from '../../../../../shared/globals/localisation';
import { SolarDetailsTitleText, SolarDetailsValidationConstants } from '../../../../../shared/globals/solarCheckConstants';
import { SolarCheckEligiblity } from '../../../../../shared/model/solar/solarCheckEligibility.model';
import { SolarCheckStatusResponse } from '../../../../../shared/model/solar/solarCheckStatusResponse.model';
import { IMessageBusService } from '../../../../../shared/service/contract/imessageBus.service';
import { DataLayerService } from '../../../../../shared/service/dataLayer.service';
import { ModalService } from '../../../../modal/modal.service';
import { MyAccountMaterialModule } from '../../../../modules/my-account.material.module';
import { SolarCheckUpdateDetailsState } from '../../../../pages/settings/solarCheck/systemDetails/updateProcess/solarCheckUpdateDetailsProcess.component';
import { ISolarCheckService } from '../../../../services/contract/isolarCheck.service';
import { APP_DATE_FORMATS, MyDateAdapterService, SolarCheckSolarDetailsComponent } from './solarCheckSolarDetails.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Solar Check Solar Details',
    () => {

        let comp: SolarCheckSolarDetailsComponent;
        let fixture: ComponentFixture<SolarCheckSolarDetailsComponent>;
        let de: DebugElement;
        let el: HTMLElement;
        let fb: FormBuilder;

        let dummyModalService = {
            activate: (options: Object): Promise<boolean> => {
                throw new Error('dummyModalService.activate has not been mocked properly.');
            },
            close: (): Promise<boolean> => {
                throw new Error('dummyModalService.activate has not been mocked properly.');
            }
        };

        let dummySolarCheckService = {
            isEligible: (): Observable<SolarCheckEligiblity> => {
                throw new Error('dummySolarCheckService.isEligible has not been mocked properly.');
            },
            getStatus: (): Observable<SolarCheckStatusResponse> => {
                 throw new Error('dummySolarCheckService.isEligible has not been mocked properly.');
            },
            setHasBattery: (hasBattery: boolean): Observable<boolean>  => {
                 throw new Error('dummyModalService.activate has not been mocked properly.');
         }
        };

        let messageBusService = {
        // tslint:disable-next-line:no-empty
        broadcast: (): any => {
        },
        listenWithLatest: (): any => {
            return Observable.of({});
        },
        listen: (): any => {
            return Observable.of({});
        }
        };

        let dummyDataLayerService = {
            pushSccUpdateSystemDetailsModification: () => {
                return;
            },
            pushSccUpdateSystemDetailsModificationError: () => {
                return;
            },
            pushSccUpdateSystemDetailsCorrection: () => {
                return;
            },
            pushSccUpdateSystemDetailsCorrectionError: () => {
                return;
            }
        };

        beforeEach(() => {

            TestBed.configureTestingModule({
                providers: [
                    { provide: ModalService, useValue: dummyModalService },
                    { provide: MATERIAL_SANITY_CHECKS, useValue: false },
                    { provide: ISolarCheckService, useValue: dummySolarCheckService },
                    { provide: DataLayerService, useValue: dummyDataLayerService },
                    { provide: IMessageBusService, useValue: messageBusService },
                    { provide: LOCALE_ID, useValue: Locale.DEFAULT },
                    {
                        provide: DateAdapter, useClass: MyDateAdapterService
                    },
                    {
                        provide: MAT_NATIVE_DATE_FORMATS, useValue: APP_DATE_FORMATS
                    },
                    FormBuilder,
                    MyAccountMaterialModule
                ],
                declarations: [
                    SolarCheckSolarDetailsComponent, UsageTooltipComponent, ToolTipWhiteComponent
                ],
                imports: [
                    MyAccountMaterialModule,
                    HttpClientTestingModule,
                    FormsModule,
                    ReactiveFormsModule,
                    MatDatepickerModule,
                    MatDatepickerModule,
                    MatInputModule,
                    MatNativeDateModule
                ]
            });

            fixture = TestBed.createComponent(SolarCheckSolarDetailsComponent);
            comp = fixture.componentInstance;
            de = fixture.debugElement;
        });

        describe('When Solar Check Solar Details is initially loaded',
            () => {
                it('should display page with \'Next\' button disabled, all 3 input fields are empty, and no validation warning messages are visible',
                    async(() => {

                        // ACT
                        fixture.detectChanges();

                        // ASSERT
                        let solarDetailsMainElement = de.query(By.css('.solar-check-solar-details'));
                        expect(solarDetailsMainElement).not.toBeNull('could not find Solar Details main screen');

                        let panelQuantityInputElement = de.query(By.css('.panel-quantity-answer'));
                        let panelQuantityInputElementValue = panelQuantityInputElement.nativeElement.innerText;
                        expect(panelQuantityInputElementValue)
                            .toBeFalsy('Panel quantity to initially be falsey i.e. null or empty');
                        expect(panelQuantityInputElementValue).toEqual('', 'Panel quantity to initially be null');

                        let panelQuantityErrorElement = de.query(By.css('.panel-quantity-error'));
                        expect(panelQuantityErrorElement)
                            .toBeNull('panel quantity error message should not be appearing');

                        let systemSizeErrorElement = de.query(By.css('.system-size-error'));
                        expect(systemSizeErrorElement).toBeNull('system size error message should not be appearing');

                        let installationYearErrorElement = de.query(By.css('.installation-year-error'));
                        expect(installationYearErrorElement)
                            .toBeNull('installation year error message should not be appearing');

                        let nextButtonElement = de.query(By.css('[disabled].next-button'));
                        expect(nextButtonElement).not.toBeNull('Next button to be present and in a disabled state');

                        expect(comp.scDetailsModel.numberPanels).toBeNull('panelsCount to be null i.e. not yet have a value');
                        expect(comp.scDetailsModel.systemSizeKw).toBeNull('systenSize to be null i.e. not yet have a value');
                        expect(comp.scDetailsModel.installationYear)
                            .toBeNull('installationYear to be null i.e. not yet have a value');
                    }));
            });

        describe('When Solar Check Solar Details is initially loaded and is Update and System Changed',
            () => {
                it('Date Picker should be displayed',
                    async(() => {

                        comp.isUpdate = true;
                        comp.updateReason = SolarCheckUpdateDetailsState.UPGRADE;

                        // ACT
                        fixture.detectChanges();

                        // ASSERT
                        let systemChangedDatePickerElement = de.query(By.css('.system-changed-datepicker'));
                        expect(systemChangedDatePickerElement).not.toBeNull('could not find System Changed Datepicker');
                    }));
            });

        describe('When Solar Check Solar Details is initially loaded and not an Update',
            () => {
                it('Title should display page with Register title ',
                    async(() => {

                        comp.isUpdate = false;

                        // ACT
                        fixture.detectChanges();

                        // ASSERT
                        let solarDetailsMainElement = de.query(By.css('.solar-check-solar-details'));
                        expect(solarDetailsMainElement).not.toBeNull('could not find Solar Details main screen');

                        let mainTitleTextElement = de.query(By.css('.solar-details-title-text'));
                        let mainTitleTextElementValue = mainTitleTextElement.nativeElement.innerText;

                        expect(mainTitleTextElementValue.toString().toLowerCase()).toEqual(SolarDetailsTitleText.registerTitle.toLowerCase());
                    }));
            });

        describe('When Solar Check Solar Details is initially loaded and Is Update and update reason is System Changed',
            () => {
                it('Title should display page with System Changed Title ',
                    async(() => {

                        comp.isUpdate = true;
                        comp.updateReason = SolarCheckUpdateDetailsState.UPGRADE;

                        // ACT
                        fixture.detectChanges();

                        // ASSERT
                        let solarDetailsMainElement = de.query(By.css('.solar-check-solar-details'));
                        expect(solarDetailsMainElement).not.toBeNull('could not find Solar Details main screen');

                        let mainTitleTextElement = de.query(By.css('.solar-details-title-text'));
                        let mainTitleTextElementValue = mainTitleTextElement.nativeElement.innerText;

                        expect(mainTitleTextElementValue.toString().toLowerCase()).toEqual(SolarDetailsTitleText.systemChangeTitle.toLowerCase());
                    }));
            });

        describe('When Solar Check Solar Details is initially loaded and Is Update and update reason is System Changed',
            () => {
                it('Title should display page with System Changed Title ',
                    async(() => {

                        comp.isUpdate = true;
                        comp.updateReason = SolarCheckUpdateDetailsState.UPGRADE;

                        // ACT
                        fixture.detectChanges();

                        // ASSERT
                        let solarDetailsMainElement = de.query(By.css('.solar-check-solar-details'));
                        expect(solarDetailsMainElement).not.toBeNull('could not find Solar Details main screen');

                        let mainTitleTextElement = de.query(By.css('.solar-details-title-text'));
                        let mainTitleTextElementValue = mainTitleTextElement.nativeElement.innerText;

                        expect(mainTitleTextElementValue.toString().toLowerCase()).toEqual(SolarDetailsTitleText.systemChangeTitle.toLowerCase());
                    }));
            });

        describe('When Solar Check Solar Details is initially loaded and Is Update and update reason is System Correction',
            () => {
                it('Title should display page with System Correction Title ',
                    async(() => {

                        comp.isUpdate = true;
                        comp.updateReason = SolarCheckUpdateDetailsState.CORRECTION;

                        // ACT
                        fixture.detectChanges();

                        // ASSERT
                        let solarDetailsMainElement = de.query(By.css('.solar-check-solar-details'));
                        expect(solarDetailsMainElement).not.toBeNull('could not find Solar Details main screen');

                        let mainTitleTextElement = de.query(By.css('.solar-details-title-text'));
                        let mainTitleTextElementValue = mainTitleTextElement.nativeElement.innerText;

                        expect(mainTitleTextElementValue.toString().toLowerCase()).toEqual(SolarDetailsTitleText.systemCorrectionTitle.toLowerCase());
                    }));
            });

        // Note: todo don't not reinclude this test until the intermittent issue has been resolved where if this test fails to complete then other tests will fail to complete their execution as expected
        xdescribe('When Solar Check Solar Details details are valid for all 3 inputs, and no validation warning messages are visible',
            () => {

                beforeEach(async(() => {

                    // ARRANGE
                    let validPanelQuantity = SolarDetailsValidationConstants.minPanelQuantity;
                    let validSystemSize = SolarDetailsValidationConstants.minSystemSize;
                    let validInstalltionYear = SolarDetailsValidationConstants.minInstallationYear;

                    fixture.detectChanges();

                    comp.solarDetailsForm.controls['panelsQuantity'].setValue(validPanelQuantity);
                    comp.solarDetailsForm.controls['panelsQuantity'].markAsTouched();

                    comp.solarDetailsForm.controls['systemSize'].setValue(validSystemSize);
                    comp.solarDetailsForm.controls['systemSize'].markAsTouched();

                    comp.solarDetailsForm.controls['installationYear'].setValue(validInstalltionYear);
                    comp.solarDetailsForm.controls['installationYear'].markAsTouched();

                    fixture.detectChanges();

                }));

                it('should not display panel error message',
                    async(() => {
                        let panelQuantityErrorElement = de.query(By.css('.panel-quantity-error'));
                        expect(panelQuantityErrorElement)
                            .toBeNull('panel quantity error message should not be appearing');
                    }));

                it('should not display system size error message',
                    async(() => {
                        let systemSizeErrorElement = de.query(By.css('.system-size-error'));
                        expect(systemSizeErrorElement)
                            .toBeNull('system size error message should not be appearing');
                    }));

                it('should not display installation year error message',
                    async(() => {
                        let installationYearErrorElement = de.query(By.css('.installation-year-error'));
                        expect(installationYearErrorElement)
                            .toBeNull('installation year error message should not be appearing');
                    }));

                it('should display Next button',
                    async(() => {
                        let nextButtonElement = de.query(By.css('.next-button'));
                        expect(nextButtonElement).not.toBeNull('Next button to be present');
                    }));

                it('should not display Next Button in a disabled state',
                    async(() => {
                        let disabledNextButtonElement = de.query(By.css('[disabled].next-button'));
                        expect(disabledNextButtonElement)
                            .toBeNull('Next button should be enabled (i.e. not disabled).');
                    }));
            });
    });
