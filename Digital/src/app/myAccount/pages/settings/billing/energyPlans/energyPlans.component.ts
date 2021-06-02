import { Component } from '@angular/core';
import { ConfigService } from '../../../../../shared/service/config.service';

@Component({
    selector: 'agl-settings-energy-plans',
    templateUrl: './energyPlans.component.html',
    styleUrls: ['./energyPlans.component.scss']
})
export class EnergyPlansComponent {
    public energyPlanUrl: string;

    constructor(
        private config: ConfigService
    ) {
        this.energyPlanUrl = `${this.config.current.aglSiteCoreWebsiteBaseUrl}/aeo/energyplans/energy-plan`;
    }
}
