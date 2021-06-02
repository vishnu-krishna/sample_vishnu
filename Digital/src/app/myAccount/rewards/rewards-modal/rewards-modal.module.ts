import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

import { RewardsModalEntryComponent } from './rewards-modal-entry.component';
import { RewardsModalRoutingGuard } from './rewards-modal-routing.guard';
import { BenefitsTermsConditionsComponent } from './components/benefits-terms-conditions/benefits-terms-conditions.component';
import { RewardsModalModule } from './rewards-modal-routing';
import { RewardsEligibilityModule } from '../rewards-eligibility.module';
import { RewardsModalService } from './services/rewards-modal.service';

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        RewardsModalModule,
        RewardsEligibilityModule
    ],
    declarations: [
        BenefitsTermsConditionsComponent,
        RewardsModalEntryComponent
    ],
    entryComponents: [
        BenefitsTermsConditionsComponent
    ],
    providers: [
        RewardsModalRoutingGuard,
        RewardsModalService]
})
export class RewardsModalComponentModule { }
