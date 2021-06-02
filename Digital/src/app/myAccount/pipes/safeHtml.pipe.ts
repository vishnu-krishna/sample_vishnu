import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'aglSafeHtml' })
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  public transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}
