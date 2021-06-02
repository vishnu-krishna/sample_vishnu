import { Directive, Input, OnChanges } from '@angular/core';
import { ComponentFactoryResolver, ComponentRef, ViewContainerRef } from '@angular/core';

export interface IModalComponent {
    args: object;
}

@Directive({
    // tslint:disable-next-line
    selector: 'aglModalLoaderDirective'
})

export class ModalLoaderDirective implements OnChanges {

    @Input() public data: any;

    public componentRef: ComponentRef<any>;

    constructor(
        public loader: ComponentFactoryResolver,
        public viewContainerRef: ViewContainerRef) { }

    public ngOnChanges() {
        if (this.data) {
            // Cleanup the old component
            if (this.componentRef) {
                this.componentRef.destroy();
            }

            this.viewContainerRef.clear();
            let factory = this.loader.resolveComponentFactory<IModalComponent>(this.data.component);
            let component = this.viewContainerRef.createComponent<IModalComponent>(factory).instance;
            component.args = this.data.data;

            if (this.data.data) {
                for (let key in this.data.data) {
                    if (this.data.data) {
                        component[key] = this.data.data[key];
                    }
                }
            }
        }
    }

}
