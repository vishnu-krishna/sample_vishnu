import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyAccountMaterialModule } from '../../../modules/my-account.material.module';

import { OffersComponent } from './offers.component';

// routes
export const ROUTES: Routes = [
  { path: '', component: OffersComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
    MyAccountMaterialModule
  ],
  declarations: [
    OffersComponent
  ]
})
export class OffersModule {}
