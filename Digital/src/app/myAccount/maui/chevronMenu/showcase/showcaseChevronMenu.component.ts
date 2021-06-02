import { Component } from '@angular/core';

@Component({
    selector: 'agl-maui-showcase-chevron-menu',
    templateUrl: './showcaseChevronMenu.component.html',
    styleUrls: ['./showcaseChevronMenu.component.scss']
})
export class ShowcaseChevronMenuComponent {
    public isUp: boolean = true;

    public codeUsage: string = `
        <agl-maui-chevron-menu
            [isUp]="isUp"
            [upMessage]="'Up'"
            [downMessage]="'Down'"
            (toggled)="toggleIsUp()">
        </agl-maui-chevron-menu>
    `;

    public toggleIsUp(): void {
        this.isUp = !this.isUp;
    }
}
