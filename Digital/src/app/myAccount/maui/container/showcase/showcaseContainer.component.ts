import { Component } from '@angular/core';

@Component({
    selector: 'agl-maui-showcase-container',
    templateUrl: './showcaseContainer.component.html'
})

export class ShowcaseContainerComponent {
    public codeUsage: string = `
        // hasShadow: boolean
        <agl-maui-container [hasShadow]="true | false">
            <button style="width: 200px;">Ok</button>
        </agl-maui-container>
    `;
}
