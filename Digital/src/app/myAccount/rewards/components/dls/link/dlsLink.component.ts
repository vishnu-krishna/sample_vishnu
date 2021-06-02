import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'agl-dls-link',
    templateUrl: './dlsLink.component.html',
    styleUrls: ['./dlsLink.component.scss']
})
export class DLSLinkComponent {
    public readonly hrefDefault = 'javascript:;'; // needs to have a javascript default not just null otherwise navs back to root of app?

    @Input() public href: string = this.hrefDefault;
    @Input() public target: string = '_blank';

    constructor(private sanitizer: DomSanitizer) { }

    public safeHref() {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.href);
    }

    public safeTarget() {
        return this.href && this.href !== this.hrefDefault ? this.target : '_self';
    }
}
