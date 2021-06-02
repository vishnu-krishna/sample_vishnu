import { Component, Input, ViewChild, ElementRef, AfterViewChecked, Renderer2 } from '@angular/core';
import { ChevronMenuComponent } from '../chevronMenu';

@Component({
    selector: 'agl-maui-expandable-container',
    templateUrl: './expandableContainer.component.html',
    styleUrls: ['./expandableContainer.component.scss']
})
export class ExpandableContainerComponent implements AfterViewChecked {
    @Input() collapsedHeight: number;
    @Input() gradientHeight: number;
    @Input() collapsedMessage: string;
    @Input() expandedMessage: string;
    @ViewChild('collapsableContainer') collapsableContainer: ElementRef;
    @ViewChild(ChevronMenuComponent) menu: ChevronMenuComponent;
    @ViewChild('gradient') gradient: ElementRef;

    constructor(private renderer: Renderer2) {}

    private hasCheckedHeight: boolean = false;
    private initialHeight: number;

    public isCollapsed: boolean = true;

    ngAfterViewChecked(): void {
        if (this.hasCheckedHeight) { return; }

        const height = this.collapsableContainer.nativeElement.clientHeight;

        if (height > this.collapsedHeight) {
            this.initialHeight = height;
            this.collapseContainer();
        } else {
            this.hideMenu();
            this.expandContainer();
        }

        this.hasCheckedHeight = true;
    }

    public toggleCollapse(): void {
        this.isCollapsed = !this.isCollapsed;

        if (this.isCollapsed) {
            this.collapseContainer();
        } else {
            this.expandContainer();
        }
    }

    private collapseContainer(): void {
        this.renderer.setStyle(this.collapsableContainer.nativeElement, 'max-height', `${this.collapsedHeight}px`);

        this.renderer.setStyle(this.gradient.nativeElement, 'top', `${this.collapsedHeight - this.gradientHeight}px`);
        this.renderer.setStyle(this.gradient.nativeElement, 'height', `${this.gradientHeight}px`);
    }

    private expandContainer(): void {
        this.renderer.setStyle(this.collapsableContainer.nativeElement, 'max-height', `${this.initialHeight}px`);

        this.renderer.setStyle(this.gradient.nativeElement, 'top', `${this.initialHeight}px`);
    }

    private hideMenu(): void {
        this.menu.hide();
    }
}
