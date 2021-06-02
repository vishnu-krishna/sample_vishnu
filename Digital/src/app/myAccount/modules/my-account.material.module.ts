import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// This module contains all the things we need from material in one place.
// In theory this should be split down to the module level with each module.

@NgModule({
    imports: [
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatNativeDateModule,
        MatRadioModule,
        MatSlideToggleModule,
        // HttpClientModule, (Removed as this cannot be imported twice into our application)
    ],
    exports: [
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatNativeDateModule,
        MatRadioModule,
        MatSlideToggleModule
    ],
})
export class MyAccountMaterialModule { }
