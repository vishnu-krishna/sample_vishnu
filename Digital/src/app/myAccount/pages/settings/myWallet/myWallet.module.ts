import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MyWalletComponent } from './myWallet.component';

// Modules
import { CommonComponentsModule } from '../../../modules/commonComponents.module';
import { CommonPipesModule } from '../../../modules/commonPipes.module';
import { MyAccountMaterialModule } from '../../../modules/my-account.material.module';

// routes
export const ROUTES: Routes = [
    { path: '', component: MyWalletComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(ROUTES),
        CommonModule,
        MyAccountMaterialModule,
        CommonComponentsModule,
        CommonPipesModule
    ],
    exports: [
        MyWalletComponent
    ],
    declarations: [
        MyWalletComponent
    ]
})
export class MyWalletModule {}
