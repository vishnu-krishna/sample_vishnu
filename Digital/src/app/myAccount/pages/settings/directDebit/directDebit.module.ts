import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Modules
import { CommonComponentsModule } from '../../../modules/commonComponents.module';
import { CommonPipesModule } from '../../../modules/commonPipes.module';
import { MyAccountMaterialModule } from '../../../modules/my-account.material.module';

// Components
import { DirectDebitSettingsComponent } from './directDebit.settings.component';
import { DirectDebitButtonComponent } from './directDebitButton/directDebitButton.component';
import { UpComingDirectDebitComponent } from './upComingDirectDebit/upComingDirectDebit.component';

// routes
export const ROUTES: Routes = [
    { path: '', component: DirectDebitSettingsComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(ROUTES),
        CommonModule,
        MyAccountMaterialModule,
        CommonComponentsModule,
        CommonPipesModule
    ],
    declarations: [
        DirectDebitSettingsComponent,
        DirectDebitButtonComponent,
        UpComingDirectDebitComponent
    ],
    exports: [DirectDebitButtonComponent],
    providers: [
    ],
    entryComponents: [
        DirectDebitSettingsComponent
    ]
})
export class DirectDebitModule {}
