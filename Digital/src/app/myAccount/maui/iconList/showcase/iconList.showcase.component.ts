import { Component } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'agl-maui-showcase-icon-list',
    templateUrl: './iconList.showcase.component.html',
    styleUrls: ['./iconList.showcase.component.scss']
})

export class ShowcaseIconListComponent {

    public codeUsage: string = `
            <agl-maui-icon-list heading="Helpful hints">
                <agl-maui-icon-list-item iconPath="/svg/maui/iconList/showcase/icon_gas.svg">
                    Add a <a class='link' (click)='linkClicked()'>calendar reminder</a> now to keep track of your extended due date.
                </agl-maui-icon-list-item>
                <agl-maui-icon-list-item iconPath="/svg/maui/iconList/showcase/icon_elec.svg">
                    It's important you pay by the extended due date to get back on track.
                </agl-maui-icon-list-item>
            </agl-maui-icon-list>`;

    constructor( public sanitizer: DomSanitizer ) {}

    public linkClicked() {
        alert(`I've been clicked`);
    }
}
