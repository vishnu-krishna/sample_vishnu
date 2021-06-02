import { Component, Input } from '@angular/core';

@Component({
    selector: 'agl-maui-showcase-example',
    templateUrl: './showcaseExampleTemplate.component.html',
    styleUrls: ['./showcaseExampleTemplate.component.scss']
})

export class ShowcaseExampleTemplateComponent {
    @Input() public label: string;
}
