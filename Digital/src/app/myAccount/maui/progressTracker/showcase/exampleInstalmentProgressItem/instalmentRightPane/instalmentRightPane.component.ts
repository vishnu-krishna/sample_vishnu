import { Component, Input, OnInit } from '@angular/core';
import { Color } from '../../../progressItems/verticalProgressItem/verticalProgressItem.model';

@Component({
    selector: 'agl-maui-instalment-right-pane',
    templateUrl: './instalmentRightPane.component.html',
    styleUrls: ['./instalmentRightPane.component.scss']
})

export class InstalmentRightPaneComponent implements OnInit {
    @Input() public primaryMessageStatus: string;
    @Input() public primaryMessageDueDate: string;
    @Input() public secondaryMessage: string;
    @Input() public tertiaryMessage: string;
    @Input() public color: Color;
    @Input() public isPrimaryMessageGrey: boolean;
    public isTertiaryMessageRed: boolean;
    public isTertiaryMessageGreen: boolean;

    public ngOnInit(): void {
        this.isTertiaryMessageRed = this.color === Color.Red;
        this.isTertiaryMessageGreen = this.color === Color.Green;
    }
}
