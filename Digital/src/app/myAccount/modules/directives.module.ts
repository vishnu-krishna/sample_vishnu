import { CommonModule }             from '@angular/common';
import { NgModule }                 from '@angular/core';
import { FormsModule,
         ReactiveFormsModule }              from '@angular/forms';
import { BsbMaskDirective }         from '../../shared/directives/bsbMask.directive';
import { NameMaskDirective }        from '../../shared/directives/nameMask.directive';
import { NumberFieldDirective }     from '../../shared/directives/numberField.directive';
import { CommonPipesModule }        from '../modules/commonPipes.module';
import { MyAccountMaterialModule } from './my-account.material.module';

@NgModule({
    declarations: [
        BsbMaskDirective,
        NameMaskDirective,
        NumberFieldDirective
    ],
    exports: [
        BsbMaskDirective,
        NameMaskDirective,
        NumberFieldDirective
    ],
    imports: [
        CommonModule,
        MyAccountMaterialModule,
        CommonPipesModule,
        ReactiveFormsModule,
        FormsModule
    ],
})
export class DirectivesModule { }
