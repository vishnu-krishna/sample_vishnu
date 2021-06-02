import { Component, Input } from '@angular/core';

@Component({
    selector: 'agl-sub-menu-item',
    templateUrl: './subMenuItem.component.html'
})
export class SubMenuItemComponent {
    @Input() public item: SubMenuItem;

    public isRoute() {
        let returnValue = false;
        // If we are linking off to a controller in the site it will be prefixed with 'svc' as per ASP.NET Routing configured
        if (this.item && this.item.route && this.item.route.indexOf('/svc') < 0) {
            returnValue = true;
        }
        return returnValue;
    }
}

export class SubMenuItem {
    public icon: string;
    public label: string;
    public route: string;
    public isEnabled: boolean;
    public isSubItem: boolean;
}
