import { CommonModule }   from '@angular/common';
import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { MyAccountMaterialModule } from '../../../../modules/my-account.material.module';

import { AttachPhotoComponent } from './attachPhoto.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MyAccountMaterialModule
  ],
  exports: [
    AttachPhotoComponent
  ],
  declarations: [ AttachPhotoComponent ]
})
export class AttachPhotoComponentModule {}
