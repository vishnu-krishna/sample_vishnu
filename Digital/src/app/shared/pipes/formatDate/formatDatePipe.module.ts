import { NgModule } from '@angular/core';
import { FormatDatePipe } from './formatDate.pipe';

@NgModule({
    declarations: [
        FormatDatePipe
    ],
    exports: [
        FormatDatePipe
    ]
  })
  export class FormatDatePipeModule { }
