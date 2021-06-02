import { Component, Input } from '@angular/core';
import { MenuItemModel } from './menuItem.model';

@Component({
    selector: 'agl-menu-item',
    templateUrl: './menuItem.component.html',
    styleUrls: ['./menuItem.component.scss']
})
export class MenuItemComponent {
    @Input() public menuItem: MenuItemModel = new MenuItemModel();

    public get showMenuIndicator(): boolean {
        return this.menuItem.showIndicator;
    }
}
