import { CommonModule, Location } from '@angular/common';
import { NgModule }             from '@angular/core';
import { ModalLoaderDirective } from '../modal/modal-loader.directive';
import { ModalComponent }       from '../modal/modal.component';
import { ModalService }         from '../modal/modal.service';
import { MyAccountMaterialModule } from './my-account.material.module';

@NgModule({
  declarations: [
      ModalComponent,
      ModalLoaderDirective
  ],
  providers: [
      ModalService,
      Location
  ],
  imports: [
      CommonModule,
      MyAccountMaterialModule
  ],
  exports: [
      ModalComponent
  ]
})
export class ModalModule { }
