import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { RewardsDiscountsComponent } from './pages/discounts/rewards-discounts.component';
import { RewardsFlybuysComponent } from './pages/flybuys/rewards-flybuys.component';
import { RewardsComponent } from './pages/rewards/rewards.component';

const routes: Routes = [
  { path: '', component: RewardsComponent },
  { path: 'discounts', component: RewardsDiscountsComponent },
  { path: 'flybuys', component: RewardsFlybuysComponent },
  { path: 'benefits', loadChildren: './rewards-modal/rewards-modal.module#RewardsModalComponentModule' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class RewardsRoutingModule { }
