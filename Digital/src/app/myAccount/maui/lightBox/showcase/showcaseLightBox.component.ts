import { Component, ViewChild } from '@angular/core';
import { LightBoxComponent } from '../lightBox.component';

@Component({
    selector: 'agl-maui-showcase-lightbox',
    templateUrl: './showcaseLightBox.component.html',
    styles: ['a {cursor:pointer;}']
})

export class ShowcaseLightBoxComponent {
    @ViewChild('lightBox2') public lightBox2: LightBoxComponent;

    public title = 'This component is awesome';
    public codeUsage: string = `
        <!-- Invoke modal with optional text link -->
        <agl-maui-lightbox
            [invokeText]="'Show LightBox 1'"
            [title]="title"
            [buttonPrimaryText]="'Thanks'"
            [buttonDismissText]="'Cancel'"
            (clickButtonPrimary)="onClickButtonPrimary($event)"
            (clickButtonSecondary)="onClickButtonSecondary($event)"
        >
            <p>This is the first <del>Modal</del> LightBox component.</p>
        </agl-maui-lightbox>

        <!-- Dynamically invoke LightBox: -->
        <agl-maui-lightbox
            #lightBox2
            [title]="title"
            [buttonPrimaryText]="'Thanks'"
            [buttonDismissText]="'Cancel'"
        >
            <p>This is the second <del>Modal</del> LightBox component.</p>
        </agl-maui-lightbox>
        `;

    public onClickLightBox2() {
        this.lightBox2.showLightBox(true);
    }

    public onClickButtonPrimary(event: any) {
        alert ('button primary clicked');
    }

    public onClickButtonDismiss(event: any) {
        alert ('button secondary clicked');
    }

    public buttonClicked(value) {
        alert('You entered: ' + value);
    }
}
