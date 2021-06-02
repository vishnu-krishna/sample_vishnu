import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MyAccountMaterialModule } from '../../../../modules/my-account.material.module';

import { MultiRegisterOnboardComponent } from './multiRegisterOnboard.component';

@NgModule({
    imports: [
        CommonModule,
        MyAccountMaterialModule,
    ],
       exports: [
        MultiRegisterOnboardComponent
    ],
    declarations: [ MultiRegisterOnboardComponent ]
})
export class MultiRegisterOnboardComponentModule {}
