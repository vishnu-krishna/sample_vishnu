import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ConcessionDeepLinkEntryComponent } from './deepLinkEntry/concessionDeepLinkEntry.component';
import { ConcessionAccountSelectionComponent } from './selectAccount/concessionAccountSelection.component';
import { ConcessionContractSelectionComponent } from './selectContract/concessionContractSelection.component';
import { ConcessionCardSelectionComponent } from './selectCard/concessionCardSelection.component';
import { ConcessionConfirmDetailsComponent } from './confirmDetails/concessionConfirmDetails.component';
import { ConcessionApplicationComponent } from './application/concessionApplication.component';
import { ConcessionFinalConfirmationComponent } from './finalConfirmation/concessionFinalConfirmation.component';

import { ConcessionDeepLinkEntryModule } from './deepLinkEntry/concessionDeepLinkEntry.module';
import { ConcessionAccountSelectionModule } from './selectAccount/concessionAccountSelection.module';
import { ConcessionContractSelectionModule } from './selectContract/concessionContractSelection.module';
import { ConcessionCardSelectionModule } from './selectCard/concessionCardSelection.module';
import { ConcessionConfirmDetailsModule } from './confirmDetails/concessionConfirmDetails.module';
import { ConcessionApplicationModule } from './application/concessionApplication.module';
import { ConcessionFinalConfirmationModule } from './finalConfirmation/concessionFinalConfirmation.module';

import { ConcessionStateService, IConcessionStateService } from './services/concessionState.service';
import { ConcessionCardService, IConcessionCardService } from './services/concessionCard.service';
import { ConcessionApplicationService, IConcessionApplicationService } from './services/concessionApplication.service';

import { ApplyForConcessionEntryGuard } from './applyForConcessionEntry.guard';
import { ApplyForConcessionSessionGuard } from './applyForConcessionSession.guard';

// routes
export const ROUTES: Routes = [
    { path: '', pathMatch: 'full', canActivate: [ApplyForConcessionEntryGuard] },
    {
        path: '', canActivateChild: [ApplyForConcessionSessionGuard],
        children: [
            { path: 'selectaccount', component: ConcessionAccountSelectionComponent },
            { path: 'selectfuel/:contractAccountId', component: ConcessionContractSelectionComponent },
            { path: 'confirmdetails', component: ConcessionConfirmDetailsComponent },
            { path: 'selectcard', component: ConcessionCardSelectionComponent },
            { path: 'apply', component: ConcessionApplicationComponent },
            { path: 'confirmation', component: ConcessionFinalConfirmationComponent },
        ]
    },
    { path: 'dl', component: ConcessionDeepLinkEntryComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(ROUTES),
        CommonModule,
        ConcessionDeepLinkEntryModule,
        ConcessionContractSelectionModule,
        ConcessionCardSelectionModule,
        ConcessionConfirmDetailsModule,
        ConcessionApplicationModule,
        ConcessionFinalConfirmationModule,
        ConcessionAccountSelectionModule
    ],
    exports: [],
    providers: [
        { provide: IConcessionStateService, useClass: ConcessionStateService },
        { provide: IConcessionApplicationService, useClass: ConcessionApplicationService },
        { provide: IConcessionCardService, useClass: ConcessionCardService },
        ApplyForConcessionSessionGuard,
        ApplyForConcessionEntryGuard
    ]
})
export class ApplyForConcessionModule {
}
