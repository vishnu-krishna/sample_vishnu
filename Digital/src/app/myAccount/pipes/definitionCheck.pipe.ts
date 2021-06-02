import { Pipe, PipeTransform } from '@angular/core';
/*
 * Check for null or undefined
 * Takes a object / array / string and determines its undefined/null state.
 * Usage:
 *   value | defCheck
 * -or-
 *   new DefinitionCheckPipe().transform(<object>);
*/
@Pipe({ name: 'aglDefCheck' })

export class DefinitionCheckPipe implements PipeTransform {
  public transform(value) {
    if (value === undefined || value === null) {
        return false;
    } else {
      return true;
    }
  }
}
