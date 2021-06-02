import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconRegistry } from '@angular/material/icon';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { RequestStatusType } from '../../../../shared/globals/oneMinuteMove/requestStatusType';
import { TrackProgressContent } from '../../../../shared/model/ommTracker/trackProgressContent.model';
import { MyAccountMaterialModule } from '../../../modules/my-account.material.module';
import { TrackProgressComponent } from './trackProgress.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('OMM Tracker - TrackProgressComponent ', () => {
    let comp: TrackProgressComponent;
    let fixture: ComponentFixture<TrackProgressComponent>;
    let de: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TrackProgressComponent],
            imports: [
                MyAccountMaterialModule,
                HttpClientTestingModule,
            ],
            providers: [
                MatIconRegistry,
                { provide: MATERIAL_SANITY_CHECKS, useValue: false }
            ]
        });
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(TrackProgressComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
        comp.progressContent = new TrackProgressContent();
        comp.progressContent[0] = 'Request Received';
        comp.progressContent[1] = 'Processing';
        comp.progressContent[2] = 'Ready to connect';
    });

    it('should create the TrackProgressComponent component', () => {
        expect(comp).toBeDefined();
    });

    it('should show the progressbar and text based on the request status one -Request received', () => {
        comp.progressStatus = RequestStatusType.RequestReceived;
        fixture.detectChanges();
        expect(comp.showRequestReceivedMessage).toBeTruthy();
        expect(comp.percentText).toMatch('0%');
        expect(fixture.nativeElement.querySelector('#track-progress-message1').textContent).toMatch('Request Received');
        expect(fixture.nativeElement.querySelector('#track-progress-message2').textContent).toMatch('Processing');
        expect(fixture.nativeElement.querySelector('#track-progress-message3').textContent).toMatch('Ready to connect');
    });
    it('should show the progressbar and text based on the request status one - Processing 10%', () => {
        comp.progressStatus = RequestStatusType.ProcessingTenPercent;
        fixture.detectChanges();
        expect(comp.showProcessingMessage).toBeTruthy();
        expect(comp.percentText).toMatch('25%');
    });
    it('should show the progressbar and text based on the request status one - Processing 90%', () => {
        comp.progressStatus = RequestStatusType.ProcessingNinetyPercent;
        fixture.detectChanges();
        expect(comp.showProcessingMessage).toBeTruthy();
        expect(comp.percentText).toMatch('85%');
    });
    it('should show the progressbar and text based on the request status one - Ready to connect', () => {
        comp.progressStatus = RequestStatusType.ReadyToConnect;
        fixture.detectChanges();
        expect(comp.showReadyToConnectMessage).toBeTruthy();
        expect(comp.percentText).toMatch('100%');
    });
});
