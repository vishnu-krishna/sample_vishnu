import { Component, Input, } from '@angular/core';
import { LinkSize, LinkTarget } from './link.enum';

@Component({
    selector: 'agl-link',
    templateUrl: './link.component.html',
    styleUrls: ['./link.component.scss']
})
export class LinkComponent {
    @Input() public href: string;
    @Input() public size: LinkSize;
    @Input() public target: LinkTarget = LinkTarget.blank;

    public linkTarget = LinkTarget;
    public get isLarge(): boolean { return this.size === LinkSize.large; }
    public get isNormal(): boolean { return this.size === LinkSize.normal; }
    public get isSmall(): boolean { return !this.size || this.size === LinkSize.small; }
    public get isSmallest(): boolean { return this.size === LinkSize.smallest; }
}
