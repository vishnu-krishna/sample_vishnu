import { Component, OnInit, } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FeatureFlagTypes, FeatureFlagService } from '../../services/featureFlag.service';

@Component({
    selector: 'agl-energy-insights-info',
    templateUrl: 'energyInsightsInfo.component.html',
    styleUrls: ['energyInsightsInfo.component.scss']
})
export class EnergyInsightsInfoComponent implements OnInit {
    public isLoading: boolean = false;
    public goBackClicked: boolean = false;

    constructor(
        public location: Location,
        private featureFlagService: FeatureFlagService,
        private router: Router,
    ) {}

    public ngOnInit() {
        this.isLoading = false;
        this.featureFlagService
        .featureFlagged(FeatureFlagTypes.energyInsightsDisaggregationEnabled)
        .subscribe((eIDisaggregationEnabled: boolean) => {
            if (!eIDisaggregationEnabled) {
                this.goToOverview();
            }
        });
    }

    public goBack(): void {
        if (!this.goBackClicked) {
            this.goBackClicked = true;
            this.location.back();
        }
    }

    public goToOverview() {
        this.router.navigate(['/overview']);
    }

}
