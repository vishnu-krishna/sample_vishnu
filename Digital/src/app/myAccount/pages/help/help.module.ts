import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HelpComponent } from './help.component';

// routes
export const ROUTES: Routes = [
  { path: '', component: HelpComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    HelpComponent
  ]
})
export class HelpModule {}
