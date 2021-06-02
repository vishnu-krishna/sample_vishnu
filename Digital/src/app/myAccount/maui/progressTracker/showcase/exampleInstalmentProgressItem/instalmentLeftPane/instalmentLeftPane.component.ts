import { Component, Input } from '@angular/core';

@Component({
    selector: 'agl-maui-instalment-left-pane',
    templateUrl: './instalmentLeftPane.component.html',
    styleUrls: ['./instalmentLeftPane.component.scss']
})
export class InstalmentLeftPaneComponent {
    @Input() public primaryMessage: string;
    @Input() public secondaryMessage: string;
    @Input() public isPrimaryMessageGrey: boolean;
}
