import { Component } from '@angular/core';

@Component({
    selector: 'agl-maui-showcase-heading',
    templateUrl: './showcaseHeading.component.html'
})

export class ShowcaseHeadingComponent {
    public codeUsage: string = `
        // heading: string
        // subheading: string
        <agl-maui-heading heading="HEADING" subheading="SUB HEADING"></agl-maui-heading>
    `;
}
