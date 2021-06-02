import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[aglDpFocus]'
})

export class FocusDirective implements AfterViewInit {
    // tslint:disable-next-line:no-input-rename
    @Input('aglDpFocus') public value: string;

    constructor(private el: ElementRef) {}

    // Focus to element: if value 0 = don't set focus, 1 = set only focus, 2 = set focus and set cursor position
    public ngAfterViewInit() {
        if (this.value === '0') {
            return;
        }

        this.el.nativeElement.setFocus();

        // Set cursor position at the end of text if input element
        if (this.value === '2') {
            let len = this.el.nativeElement.value.length;
            this.el.nativeElement.setSelectionRange(len, len);
        }
    }
}
