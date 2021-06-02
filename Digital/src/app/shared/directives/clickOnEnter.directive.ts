import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive(
    {
        selector: '[aglClickOnEnter]'
    })

export class ClickOnEnterDirective {
    @Output() public aglClickOnEnter = new EventEmitter();

    @HostListener('keypress', ['$event']) public onKeypress(event) {
        let charCode = (typeof event.which === 'undefined') ? event.keyCode : event.which;
        if (charCode === 13) {
            this.callParent();
        }
    }
    public callParent() {
        this.aglClickOnEnter.emit();
    }

}
