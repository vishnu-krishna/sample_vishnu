import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy, APP_BASE_HREF } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

import { Mock } from 'ts-mocks';
import { Observable } from 'rxjs';

import { EnergyInsightsInfoComponent } from './energyInsightsInfo.component';
import { LoadingModule } from '../../../shared/loaders/loading.module';
import { MauiButtonModule } from '../../maui/button';
import { MauiContainerModule } from '../../maui/container';
import { MauiHeadingModule } from '../../maui/heading';
import { MauiSecondaryNavigationModule } from '../../maui/secondaryNavigation';
import { FeatureFlagService, FeatureFlagTypes } from '../../services/featureFlag.service';
import { FeatureFlagMockService } from '../../services/mock/featureflag.mock.service';

let comp: EnergyInsightsInfoComponent;
let fixture: ComponentFixture<EnergyInsightsInfoComponent>;
let de: DebugElement;
let featureFlagService: FeatureFlagService;

describe('Energy Insights Info Component', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                EnergyInsightsInfoComponent,
            ],
            imports: [
                MauiSecondaryNavigationModule,
                MauiButtonModule,
                MauiContainerModule,
                MauiHeadingModule,
                LoadingModule,
                RouterTestingModule,
            ],
            providers: [
                Location,
                { provide: LocationStrategy, useClass: PathLocationStrategy },
                { provide: APP_BASE_HREF, useValue : '/' },
                {
                    provide: FeatureFlagService,
                    useClass: FeatureFlagMockService
                },
            ]
        });

        fixture = TestBed.createComponent(EnergyInsightsInfoComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
        this.featureFlagService = TestBed.get(FeatureFlagService);
    });

    describe('display', () => {
        beforeEach(() => {
            spyOn(this.featureFlagService, 'featureFlagged').and.callFake((arg) => {
                return Observable.of(arg === FeatureFlagTypes.energyInsightsDisaggregationEnabled);
            });
        });

        it('should display secondary navigation toolbar', () => {
            fixture.detectChanges();
            let linkElement = de.query(By.css('agl-maui-secondary-navigation'));
            expect(linkElement).toBeDefined();
        });

        it('should display page heading', () => {
            fixture.detectChanges();
            let headingElement = de.query(By.css('.energy-insights-info__heading'));
            expect(headingElement).toBeDefined();
        });

        it('should display container', () => {
            fixture.detectChanges();
            let containerElement = de.query(By.css('.energy-insights-info__container'));
            expect(containerElement).toBeDefined();
        });

        it('should display close button', () => {
            fixture.detectChanges();
            let closeButtonElement = de.query(By.css('.energy-insights-info__close-button'));
            expect(closeButtonElement).toBeDefined();
        });
    });
});
