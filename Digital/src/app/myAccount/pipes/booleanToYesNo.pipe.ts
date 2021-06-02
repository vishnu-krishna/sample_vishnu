import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'aglBooleanToYesNo' })
export class BooleanToYesNo implements PipeTransform {
    public transform(value: boolean) {
        return (value ? 'Yes' : 'No' );
    }
}
