import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyAccountMaterialModule } from '../../../modules/my-account.material.module';

import { MauiFlashMessageModule } from '../../../maui/flashMessage';
import { CommonComponentsModule } from '../../../modules/commonComponents.module';
import { PersonalComponent } from './personal.component';

// routes
export const ROUTES: Routes = [
  { path: '', component: PersonalComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
    CommonComponentsModule,
    MauiFlashMessageModule,
    MyAccountMaterialModule
  ],
  declarations: [
    PersonalComponent
  ]
})
export class PersonalModule {}
