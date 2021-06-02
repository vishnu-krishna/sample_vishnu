import { DebugElement, LOCALE_ID }    from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

import { DateAdapter, MAT_NATIVE_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { By } from '@angular/platform-browser';
import { Observable }      from 'rxjs/Observable';
import { ToolTipWhiteComponent } from '../../../../../shared/component/usagetooltip/tooltipWhite.component';
import { UsageTooltipComponent } from '../../../../../shared/component/usagetooltip/usageTooltip.component';
import { Locale }  from '../../../../../shared/globals/localisation';
import { SolarDetailsValidationConstants } from '../../../../../shared/globals/solarCheckConstants';
import { SolarCheckEligiblity } from '../../../../../shared/model/solar/solarCheckEligibility.model';
import { SolarCheckStatusResponse } from '../../../../../shared/model/solar/solarCheckStatusResponse.model';
import { IMessageBusService } from '../../../../../shared/service/contract/imessageBus.service';
import { DataLayerService } from '../../../../../shared/service/dataLayer.service';
import { ModalService } from '../../../../modal/modal.service';
import { MyAccountMaterialModule } from '../../../../modules/my-account.material.module';
import { ISolarCheckService } from '../../../../services/contract/isolarCheck.service';
import { APP_DATE_FORMATS, MyDateAdapterService, SolarCheckSolarDetailsComponent } from './solarCheckSolarDetails.component';
import { SolarDetailsValidator } from './solarCheckSolarDetails.validator';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Solar Check Solar Validator',
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

        beforeEach(() => {

         TestBed.configureTestingModule({
            providers: [
                { provide: ModalService, useValue: dummyModalService },
                { provide: MATERIAL_SANITY_CHECKS, useValue: false },
                { provide: ISolarCheckService, useValue: dummySolarCheckService },
                { provide: IMessageBusService, useValue: messageBusService },
                { provide: DataLayerService, useValue: dummyDataLayerService },
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
                SolarCheckSolarDetailsComponent, UsageTooltipComponent, ToolTipWhiteComponent,
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

         // fixture = TestBed.createComponent(SolarCheckSolarDetailsComponent);
         fixture = TestBed.createComponent(SolarCheckSolarDetailsComponent);
         comp = fixture.componentInstance;
         de = fixture.debugElement;
        });

        describe('When Solar Check Solar Details is initially loaded',
            () => {
                // Note: Todo Temporarily commented due to dropdown panel needing to be selected - dropdown to be removed in upcoming story DSP-13439
                xit('should accept valid min values for Panel, System Size and Year of Installation',
                    () => {
                        // Arrange
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
                    expect(comp.solarDetailsForm.valid).toBe(true);
                    });

                // Note: Todo Temporarily commented due to dropdown panel needing to be selected - dropdown to be removed in upcoming story DSP-13439
                xit('should accept valid max values for Panel, System Size and Year of Installation',
                    () => {
                        // Arrange
                    let validPanelQuantity = SolarDetailsValidationConstants.maxPanelQuantity;
                    let validSystemSize = SolarDetailsValidationConstants.maxSystemSize;
                    let validInstalltionYear = SolarDetailsValidator.currentYear;

                    fixture.detectChanges();

                    comp.solarDetailsForm.controls['panelsQuantity'].setValue(validPanelQuantity);
                    comp.solarDetailsForm.controls['panelsQuantity'].markAsTouched();

                    comp.solarDetailsForm.controls['systemSize'].setValue(validSystemSize);
                    comp.solarDetailsForm.controls['systemSize'].markAsTouched();

                    comp.solarDetailsForm.controls['installationYear'].setValue(validInstalltionYear);
                    comp.solarDetailsForm.controls['installationYear'].markAsTouched();

                    fixture.detectChanges();
                    expect(comp.solarDetailsForm.valid).toBe(true);
                });
                it('should not accept invalid Panel value which is less than 4',
                    () => {
                        // Arrange
                    let validPanelQuantity = 3;
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
                    el =  fixture.debugElement.query(By.css('div.panel-quantity-error')).nativeElement;
                    let panelQuantityErrMsg = el.textContent;
                    expect(comp.solarDetailsForm.valid).toBe(false);
                    expect(panelQuantityErrMsg).toBe('Panel quantity must be between 4 and 83');

                });

                it('should not accept invalid Panel value which is more than 83',
                    () => {
                        // Arrange
                    let validPanelQuantity = 84;
                    let validSystemSize = SolarDetailsValidationConstants.maxSystemSize;
                    let validInstalltionYear = SolarDetailsValidator.currentYear;

                    fixture.detectChanges();

                    comp.solarDetailsForm.controls['panelsQuantity'].setValue(validPanelQuantity);
                    comp.solarDetailsForm.controls['panelsQuantity'].markAsTouched();

                    comp.solarDetailsForm.controls['systemSize'].setValue(validSystemSize);
                    comp.solarDetailsForm.controls['systemSize'].markAsTouched();

                    comp.solarDetailsForm.controls['installationYear'].setValue(validInstalltionYear);
                    comp.solarDetailsForm.controls['installationYear'].markAsTouched();

                    fixture.detectChanges();
                    el =  fixture.debugElement.query(By.css('div.panel-quantity-error')).nativeElement;
                    let panelQuantityErrMsg = el.textContent;
                    expect(comp.solarDetailsForm.valid).toBe(false);
                    expect(panelQuantityErrMsg).toBe('Panel quantity must be between 4 and 83');

                });

                it('should not accept invalid System Size value which is not within range as per Panel',
                    () => {
                        // Arrange
                    let validPanelQuantity = SolarDetailsValidationConstants.minPanelQuantity;
                    let validSystemSize = 2;
                    let validInstalltionYear = SolarDetailsValidator.currentYear;

                    fixture.detectChanges();

                    comp.solarDetailsForm.controls['panelsQuantity'].setValue(validPanelQuantity);
                    comp.solarDetailsForm.controls['panelsQuantity'].markAsTouched();

                    comp.solarDetailsForm.controls['systemSize'].setValue(validSystemSize);
                    comp.solarDetailsForm.controls['systemSize'].markAsTouched();

                    comp.solarDetailsForm.controls['installationYear'].setValue(validInstalltionYear);
                    comp.solarDetailsForm.controls['installationYear'].markAsTouched();

                    fixture.detectChanges();
                    el =  fixture.debugElement.query(By.css('div.system-size-error')).nativeElement;
                    let panelQuantityErrMsg = el.textContent;
                    expect(comp.solarDetailsForm.valid).toBe(false);
                    expect(panelQuantityErrMsg).toBe('A system with 4 panels should have a size between 1.00kW and 1.40kW. Please check your system size and number of panels.');

                });

                it('should not accept invalid Installation Year value which is less than 2000',
                    () => {
                        // Arrange
                    let validPanelQuantity = SolarDetailsValidationConstants.minPanelQuantity;
                    let validSystemSize = 2;
                    let invalidInstalltionYear = 1999;
                    let currentYear = SolarDetailsValidator.currentYear;

                    fixture.detectChanges();

                    comp.solarDetailsForm.controls['panelsQuantity'].setValue(validPanelQuantity);
                    comp.solarDetailsForm.controls['panelsQuantity'].markAsTouched();

                    comp.solarDetailsForm.controls['systemSize'].setValue(validSystemSize);
                    comp.solarDetailsForm.controls['systemSize'].markAsTouched();

                    comp.solarDetailsForm.controls['installationYear'].setValue(invalidInstalltionYear);
                    comp.solarDetailsForm.controls['installationYear'].markAsTouched();

                    fixture.detectChanges();
                    el =  fixture.debugElement.query(By.css('div.installation-year-error')).nativeElement;
                    let panelQuantityErrMsg = el.textContent;
                    expect(comp.solarDetailsForm.valid).toBe(false);
                    expect(panelQuantityErrMsg).toBe('Installation year must be between 2000 and ' + currentYear);

                });
            });
    });
