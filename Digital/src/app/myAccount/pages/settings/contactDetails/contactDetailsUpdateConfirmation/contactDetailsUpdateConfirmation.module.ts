import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MauiFlashMessageModule } from './../../../../maui/flashMessage';
import { ContactDetailsUpdateConfirmationComponent } from './contactDetailsUpdateConfirmation.component';

@NgModule({
  declarations: [
    ContactDetailsUpdateConfirmationComponent
  ],
  imports: [
    CommonModule,
    MauiFlashMessageModule
  ],
  exports: [
    ContactDetailsUpdateConfirmationComponent
  ]
})
export class ContactDetailsUpdateConfirmationModule {}
