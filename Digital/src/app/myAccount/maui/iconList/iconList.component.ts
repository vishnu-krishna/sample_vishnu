import { AfterContentInit, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { IconListItemComponent } from './iconListItem/iconListItem.component';

@Component({
    selector: 'agl-maui-icon-list',
    templateUrl: './iconList.component.html',
    styleUrls: ['./iconList.component.scss']
})

export class IconListComponent implements AfterContentInit {

    @ContentChildren( IconListItemComponent) public iconListItems: QueryList <IconListItemComponent>;

    @Input() public heading: any;

    public ngAfterContentInit() {
       this.iconListItems.last.itemClass = 'maui-icon-list__item-text--no-padding';
    }

}
