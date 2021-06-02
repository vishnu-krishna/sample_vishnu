import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MyAccountMaterialModule } from '../../../../modules/my-account.material.module';

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

// Test Subject
import { SolarCheckDeregisterComponent } from './solarCheckDeregister.component';

import { LoadingComponent } from '../../../../../shared/loaders/loading.component';
import { SolarCheckEligiblity } from '../../../../../shared/model/solar/solarCheckEligibility.model';
import { DataLayerService } from '../../../../../shared/service/dataLayer.service';
import { ModalService } from '../../../../modal/modal.service';
import { ISolarCheckService } from '../../../../services/contract/isolarCheck.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Solar Check Deregistration Component tests', () => {
    let comp: SolarCheckDeregisterComponent;
    let fixture: ComponentFixture<SolarCheckDeregisterComponent>;
    let de: DebugElement;

    let dummySolarCheckService = {
        isEligible: (): Observable<SolarCheckEligiblity> => {
            throw new Error('contentServiceStub.load has not been mocked properly.');
        },
        getContract: (contractNumber: String) => {
            throw new Error('contentServiceStub.load has not been mocked properly.');
        }
    };
    let dummyModalService = {
        activate: (options: Object): Promise<boolean> => {
            throw new Error('dummyModalService.activate has not been mocked properly.');
        },
        close: (): Promise<boolean> => {
            throw new Error('dummyModalService.activate has not been mocked properly.');
        }
    };
    let dummyDataLayerService = {
        pushSccSettingsDeregisterError: () => {
            return;
        },
        pushSccSettingsDeregister: () => {
            return;
        },
    };
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                SolarCheckDeregisterComponent,
                LoadingComponent],
            imports: [
                MyAccountMaterialModule,
                HttpClientTestingModule,
            ],
            providers: [
                { provide: ISolarCheckService, useValue: dummySolarCheckService },
                { provide: ModalService, useValue: dummyModalService },
                { provide: MATERIAL_SANITY_CHECKS, useValue: false },
                { provide: DataLayerService, useValue: dummyDataLayerService }
            ]
        });
        fixture = TestBed.createComponent(SolarCheckDeregisterComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
    });

    it('display modal with deregistration text and buttons', () => {
        // ACT
        // Cause ngOnInit to run in the test subject component and the template to be rendered once
        fixture.detectChanges();

        // Assert
        let modalHeaderElement = de.query(By.css('.deregister__header'));
        expect(modalHeaderElement).not.toBeNull('modalHeaderElement');
        expect(modalHeaderElement.nativeElement.innerText).toBe('Remove Solar Command Check');

        let callToActionButtonElement = de.query(By.css('.mat-raised-button'));
        expect(callToActionButtonElement.nativeElement.innerText).toBe('CONFIRM');

        let cancelButtonElement = de.query(By.css('.deregister__cancel-button'));
        expect(cancelButtonElement.nativeElement.innerText).toBe('CANCEL');
    });
});
