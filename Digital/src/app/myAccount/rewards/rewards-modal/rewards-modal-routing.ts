import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RewardsModalRoutingGuard } from './rewards-modal-routing.guard';
import { RewardsModalEntryComponent } from './rewards-modal-entry.component';
import { BenefitsTermsConditionsComponent } from './components/benefits-terms-conditions/benefits-terms-conditions.component';

const routes: Routes = [
  {
    path: 'termsandconditions',
    component: BenefitsTermsConditionsComponent,
    canActivate: [ RewardsModalRoutingGuard ]
  }
];

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class RewardsModalModule { }
