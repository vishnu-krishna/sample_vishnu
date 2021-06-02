import { Component } from '@angular/core';

@Component({
    selector: 'agl-maui-showcase-radio-button-group',
    templateUrl: './showcaseRadioButton.component.html',
    styleUrls: ['./showcaseRadioButton.component.scss'],
})

export class ShowcaseRadioButtonComponent {

    public codeUsage: string = `
            Radio Button example using ngFor
            <agl-maui-radio-button-group [(selectedValue)]="selectedValue" name="groupA">
                <agl-maui-radio-button *ngFor="let radio of radioOptions" [value]="radio.value">
                    <div label>
                        {{radio.label}}
                    </div>
                    <div content *ngIf="radio.content">
                        {{radio.content}}
                    </div>
                </agl-maui-radio-button>
            </agl-maui-radio-button-group>
            <br>
            <br>
            Radio Button example using static html
            <agl-maui-radio-button-group selectedValue="bb" (selectedValueChange)="myChange($event)">
                <agl-maui-radio-button value="aa">
                    <div label>Click this
                        <u>one</u>
                    </div>
                    <div content>
                        <span>The first ng content for
                            <B>first radio</B>
                        </span>
                    </div>
                </agl-maui-radio-button>
                <agl-maui-radio-button value="bb">
                    <div label>Now click this one</div>
                    <div content>
                        <div>Are you sure you have selected the correct option?</div>
                        <agl-maui-segmented-buttons>
                            <agl-maui-segmented-button value="Y" text="Yes" textMobile="Y" [selected]="true">
                            </agl-maui-segmented-button>
                            <agl-maui-segmented-button value="N" text="No" textMobile="N" [selected]="false">
                            </agl-maui-segmented-button>
                        </agl-maui-segmented-buttons>
                    </div>
                </agl-maui-radio-button>
                <agl-maui-radio-button value="cc">
                    <div label>
                        <div class="container-fluid maui-radio-button-container">
                            <div class="row">
                                <div class="col-xs-8">Why not click this one with 2 columns</div>
                                <div class="col-xs-4">Other column</div>
                            </div>
                        </div>
                    </div>
                </agl-maui-radio-button>
            </agl-maui-radio-button-group>
    `;

    public ngforSelectedValue: string = 'c';
    public staticSelectedValue: string = '';

    public radioOptions: any [] = [
        {
            value: 'a',
            label: 'First label with no content but with a long label that will wrap.'
        },
        {
            value: 'b',
            label: 'Second label',
            content: 'Second content'
        },
        {
            value: 'c',
            label: 'Third label',
            content: 'Third content',
            checked: true
        }
    ];

    public myChange(value: string) {
        this.staticSelectedValue = value;
    }
}
