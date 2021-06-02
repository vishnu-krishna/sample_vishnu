import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconRegistry } from '@angular/material/icon';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { By } from '@angular/platform-browser';
import { MyAccountMaterialModule } from '../../../modules/my-account.material.module';
// Load the implementations that should be tested
import { TrackerHeaderComponent } from './trackerHeader.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Tracker header component', () => {
    let comp: TrackerHeaderComponent;
    let fixture: ComponentFixture<TrackerHeaderComponent>;
    let de: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TrackerHeaderComponent],
            imports: [
                MyAccountMaterialModule,
                HttpClientTestingModule,
            ],
            providers: [
                MatIconRegistry,
                { provide: MATERIAL_SANITY_CHECKS, useValue: false }
            ]
        });

        fixture = TestBed.createComponent(TrackerHeaderComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
    });

    it('should load without crashing', () => {
        expect(comp).toBeDefined();
    });

    it('should show passed in reference number', () => {
        comp.referenceCode = '123456';
        fixture.detectChanges();
        const referenceElement = de.query(By.css('.tracker-header__referencenumber'));
        expect(referenceElement.nativeElement.textContent.trim()).toBe('Ref code: 123456');
    });
});
