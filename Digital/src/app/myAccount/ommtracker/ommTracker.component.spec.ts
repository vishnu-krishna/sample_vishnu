import { DebugElement } from '@angular/core';
import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MyAccountMaterialModule } from '../modules/my-account.material.module';
import { DataLayerService } from './../../shared/service/dataLayer.service';
import { DataLayerStubService } from './../../test/stubs/dataLayer.stub.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonPipesModule } from '../modules/commonPipes.module';

import { DidYouKnowComponent } from './components/didYouKnow/didYouKnow.component';
import { NeedToMakeChangeComponent } from './components/needToMakeChange/needToMakeChange.component';

import { TrackConnectionComponent } from './components/connection/trackConnection.component';
import { TrackConnectionContainerComponent } from './components/connection/trackConnectionContainer.component';
import { TrackerHeaderComponent } from './components/header/trackerHeader.component';
import { TrackerWrapperComponent } from './components/trackerWrapper/trackerWrapper.component';
import { TrackProgressComponent } from './components/trackProgress/trackProgress.component';
import { TrackStatusHeaderComponent } from './components/trackStatusHeader/trackStatusHeader.component';
import { WelcomeHomeComponent } from './components/welcomeHome/welcomeHome.component';
import { WhatHappensNextComponent } from './components/whatHappensNext/whatHappensNext.component';
import { OmmTrackerComponent } from './ommTracker.component';

import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ErrorMessageComponent } from '../../shared/component/genericError/errorMessage/errorMessage.component';
import { ErrorPageComponent } from '../../shared/component/genericError/errorPage/errorPage.component';
import { ErrorMessageModel } from '../../shared/model/ommTracker/errorMessage.model';
import { ConfigService } from '../../shared/service/config.service';
import { ContentService } from '../../shared/service/content.service';
import { IMoveJoinApiService } from '../../shared/service/contract/imoveJoinApi.service';
import { TrackerService } from '../services/tracker.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('OmmTracker Component', () => {
    let comp: OmmTrackerComponent;
    let fixture: ComponentFixture<OmmTrackerComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    let mockOmmTrackerData = {
        selfService: {
            oMMTracker: {
                didYouKnow: {
                    electricity: {
                        vIC: {
                            list: ['poweroff']
                        }
                    }
                },
                didYouKnowReference: {
                    poweroff: {
                        description: 'If your power is off, please ensure your main switch is in the off position. This is so your energy can be connected safely.',
                        heading: 'If your power is off'
                    }
                },

            }
        }
    };

    beforeEach(() => {
        let contentServiceStub = {
            load: () => {
                throw new Error('contentServiceStub.load has not been mocked properly.');
            },
            getContent: () => {
                throw new Error('contentServiceStub.getContent has not been mocked properly.');
            }
        };
        let trackerServiceStub = {
            load: () => {
                throw new Error('trackerServiceStub.load has not been mocked properly.');
            },
            getErrorMessage(): Observable<ErrorMessageModel> {
                return Observable.of(new ErrorMessageModel());
            }
        };
        let moveJoinServiceStub: IMoveJoinApiService = {
            GetOMMTracker(): Observable<any> {
                return Observable.from(
                    []
                );
            },
            get errors(): Subject<any> {
                return new Subject<any>();
            },
            get checkAuthorization(): Subject<any> {
                return new Subject<any>();
            },
            get checkExpiredOMM(): Subject<any> {
                return new Subject<any>();
            }
        };
        let configServiceStub = {
            load: () => {
                throw new Error('configServiceStub.load has not been mocked properly.');
            }
        };
        TestBed.configureTestingModule({
            declarations: [
                OmmTrackerComponent,
                DidYouKnowComponent,
                TrackConnectionComponent,
                TrackProgressComponent,
                TrackerHeaderComponent,
                TrackerWrapperComponent,
                TrackStatusHeaderComponent,
                TrackConnectionContainerComponent,
                NeedToMakeChangeComponent,
                WhatHappensNextComponent,
                ErrorPageComponent,
                ErrorMessageComponent,
                WelcomeHomeComponent
            ],
            imports: [
                MyAccountMaterialModule,
                BrowserAnimationsModule,
                CommonPipesModule,
                HttpModule,
                HttpClientTestingModule,
            ],
            providers: [
                { provide: 'AppContentBranch', useValue: 'selfService' },
                { provide: ContentService, useValue: contentServiceStub },
                { provide: TrackerService, useValue: trackerServiceStub },
                { provide: IMoveJoinApiService, useValue: moveJoinServiceStub },
                { provide: ConfigService, useValue: configServiceStub },
                { provide: DataLayerService, useClass: DataLayerStubService },
                { provide: MATERIAL_SANITY_CHECKS, useValue: false }
            ]
        });

        fixture = TestBed.createComponent(OmmTrackerComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
        comp.isError = false;
    });

    it('should load content from service', async(() => {
        let service = de.injector.get(TrackerService);
        spyOn(service, 'load').and.returnValue(Observable.of({
            headerStatus: { statusText: '', statusIcon: '' },
            requestStatus: 'ReadyToConnect',
            didYouKnowViewMode: {},
            connectionContent: {},
            needToMakeAChangeViewModel: {},
            progressContent: '',
            buildingTrackerContent: {
                title: '',
                content: ''
            },
            referenceNumber: ''
        }));
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(comp.headerStatus).toBeDefined();
            expect(comp.requestStatus).toBeDefined();
            expect(comp.didYouKnowViewModel).toBeDefined();
            expect(comp.isLoaded).toBe(true);
            expect(comp.progressContent).toBeDefined();
            expect(comp.referenceCode).toBeDefined();
        });
    }));
});
