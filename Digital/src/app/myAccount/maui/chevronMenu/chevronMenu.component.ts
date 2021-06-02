import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
    selector: 'agl-maui-chevron-menu',
    templateUrl: './chevronMenu.component.html',
    styleUrls: ['./chevronMenu.component.scss']
})
export class ChevronMenuComponent {
    @Input() isUp: boolean;
    @Input() upMessage: string;
    @Input() downMessage: string;
    @Output() toggled = new EventEmitter();

    @ViewChild('menu') menu: ElementRef;

    constructor(private renderer: Renderer2) {}

    public toggle(): void {
        this.toggled.emit();
    }

    public hide(): void {
        this.renderer.addClass(this.menu.nativeElement, 'hidden');
    }
}
