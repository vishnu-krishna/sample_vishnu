import { Component, EventEmitter, Output } from '@angular/core';
import { DisplayPageNumber } from '../secondaryNavigation.component';

@Component({
    selector: 'agl-maui-showcase-secondary-navigation',
    templateUrl: './secondaryNavigation.showcase.component.html',
    styleUrls: ['./secondaryNavigation.showcase.component.scss']
})

export class ShowcaseSecondaryNavigationComponent {
    @Output() public displayUpdated = new EventEmitter();
    @Output() public displayBackButtonUpdated = new EventEmitter();
    @Output() public pageNumberVisibilityUpdated = new EventEmitter();
    @Output() public pageNumberUpdated = new EventEmitter<PageInfo>();
    public displaySecondaryNav: boolean;
    public pageInfo = new PageInfo(1, 10);

    public codeUsage: string = `
        <agl-maui-secondary-navigation
            display="true | false"
            displayBackButton="true | false"
            text="Desktop Desktop"
            textMobile="Mobile Mobile"
            pageNumber=1
            pageTotal=10
            displayPageNumber="OnMobile | OnDesktop"
            (click)='dummyFunction()'>
        </agl-maui-secondary-navigation>
    `;

    public changeShowNavigation(event) {
        this.displaySecondaryNav = event.target.checked;
        this.displayUpdated.emit(event.target.checked);
    }

    public changeDisplayBackButton(event) {
        this.displayBackButtonUpdated.emit(event.target.checked);
    }

    public changePageNumberVisibility(hidePage) {
        this.pageNumberVisibilityUpdated.emit(hidePage);
    }

    public changePageNumber(current: number, total: number) {
        this.pageInfo = new PageInfo(current, total);
        this.pageNumberUpdated.emit(this.pageInfo);
    }
}

export class PageInfo {
    public pageNumber: number = null;
    public pageTotal: number = null;

    constructor(pageNumber: number, pageTotal: number) {
        this.pageNumber = pageNumber;
        this.pageTotal = pageTotal;
    }
}
