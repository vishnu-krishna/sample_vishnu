import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'aglRemoveHtmlTags' })
export class RemoveHtmlTagsPipe implements PipeTransform {
    transform(input: string): any {
      return input ? String(input).replace(/<[^>]+>/gm, '') : '';
    }
}
