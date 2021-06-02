import { Component, Input } from '@angular/core';

@Component({
    selector: 'agl-maui-showcase-template',
    templateUrl: './showcaseTemplate.component.html',
    styleUrls: ['./showcaseTemplate.component.scss']
})
export class ShowcaseTemplateComponent {
    @Input() public heading: string;

    public selectedValue: toggleTypes;

    public setSelectedValue($event: toggleTypes) {
        this.selectedValue = $event;
    }

    public get displayVisual(): boolean {
        return this.selectedValue !== toggleTypes.info && this.selectedValue !== toggleTypes.code;
    }

    public get displayInfo(): boolean {
        return this.selectedValue === toggleTypes.info;
    }

    public get displayCode(): boolean {
        return this.selectedValue === toggleTypes.code;
    }
}

export enum toggleTypes {
    visual = <any> 'visual',
    info = <any> 'info',
    code = <any> 'code'
}
