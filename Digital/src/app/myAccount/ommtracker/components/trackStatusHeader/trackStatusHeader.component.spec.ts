import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyAccountMaterialModule } from '../../../modules/my-account.material.module';

// Load the implementations that should be tested
import { MatIconRegistry } from '@angular/material/icon';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { WhatHappensNextComponent } from '../whatHappensNext/whatHappensNext.component';
import { TrackStatusHeaderComponent } from './trackStatusHeader.component';

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DataLayerService } from '../../../../shared/service/dataLayer.service';
import { DataLayerStubService } from '../../../../test/stubs/dataLayer.stub.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Tracker Page TrackStatusHeaderComponent ', () => {
    let comp: TrackStatusHeaderComponent;
    let fixture: ComponentFixture<TrackStatusHeaderComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                TrackStatusHeaderComponent,
                WhatHappensNextComponent],
            imports: [
                MyAccountMaterialModule,
                HttpClientTestingModule,
            ],
            providers: [
                MatIconRegistry,
                { provide: MATERIAL_SANITY_CHECKS, useValue: false },
                { provide: DataLayerService, useClass: DataLayerStubService },
            ]
        });
        fixture = TestBed.createComponent(TrackStatusHeaderComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;

    });

    it('should create the TrackStatusHeaderComponent component', () => {
        // Assert
        expect(comp).toBeDefined();
    });

    it('should update the status text and icon in the template based on the input value', () => {
        // Arrange
        comp.headerStatus = {
            statusText: 'We are underway',
            statusIcon: 'icon-status-tick',
            subText: '',
            welcomeText: ''
        };

        // Act
        fixture.detectChanges();
        let statusText = de.query(By.css('.status-header__status--text'));
        let statusIcon = de.query(By.css('.status-header__status--icon'));

        // Assert
        expect(statusText.nativeElement.textContent.trim()).toBe('We are underway');
        expect(statusIcon.nativeElement.getAttribute('ng-reflect-svg-icon')).toBe('icon-status-tick');
    });
});
