import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MyAccountMaterialModule } from '../../../../modules/my-account.material.module';

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

// Test Subject
import { ModalService } from '../../../../modal/modal.service';
import { SolarCheckWelcomeComponent } from './solarCheckWelcome.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Solar Check Welcome Component tests', () => {
    let comp: SolarCheckWelcomeComponent;
    let fixture: ComponentFixture<SolarCheckWelcomeComponent>;
    let de: DebugElement;

    beforeEach(() => {
        let dummyModalService = {

        };
        TestBed.configureTestingModule({
            declarations: [
                SolarCheckWelcomeComponent,
            ],
            imports: [
                MyAccountMaterialModule,
                HttpClientTestingModule,
            ],
            providers: [
                { provide: ModalService, useValue: dummyModalService },
                { provide: MATERIAL_SANITY_CHECKS, useValue: false }
            ]
        });

        fixture = TestBed.createComponent(SolarCheckWelcomeComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
    });

    it('solar check welcome component loading and working properly', () => {
        fixture.detectChanges();

        let welcomeModal = de.query(By.css('.solar-check-welcome'));
        expect(welcomeModal).not.toBeNull('welcomeModal');
        let closeButton = de.query(By.css('.close-button'));
        expect(closeButton).not.toBeNull('closeButton');
        let nextButton = de.query(By.css('.next-button'));
        expect(nextButton).not.toBeNull('nextButton');
    });
});
