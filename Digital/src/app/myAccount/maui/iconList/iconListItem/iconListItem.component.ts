import { Component, Input } from '@angular/core';

@Component({
    selector: 'agl-maui-icon-list-item',
    templateUrl: './iconListItem.component.html',
    styleUrls: ['./iconListItem.component.scss']
})

export class IconListItemComponent {

    @Input() public iconPath: string;

    public itemClass: string;

}
