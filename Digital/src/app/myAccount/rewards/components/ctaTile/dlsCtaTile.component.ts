import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DLSCTATileModel } from './dlsCtaTile.model';

@Component({
    selector: 'agl-dls-cta-tile',
    templateUrl: './dlsCtaTile.component.html',
    styleUrls: ['./dlsCtaTile.component.scss']
})
export class DLSCTATileComponent {
    /**
     * 'args' required to setup the image to be displayed for the tile
     * You can also optionally setup 2 Call to Action Buttons to be displayed at the bottom of
     * the tile.
     */
    @Input() public args: DLSCTATileModel;
    /**
     * Where button 1 was passed through in the 'args' you can
     * get the click event of that button by observing the onCTAButton1Clicked
     * event
     */
    @Output() public onCTAButton1Clicked = new EventEmitter();
    /**
     * Where button 2 was passed through in the 'args' you can
     * get the click event of that button by observing the onCTAButton2Clicked
     * event
     */
    @Output() public onCTAButton2Clicked = new EventEmitter();

    public getImageStyle(img) {
        return img.style || null;
    }

    public onButton1Click() {
        this.onCTAButton1Clicked.emit();
    }

    public onButton2Click() {
        this.onCTAButton2Clicked.emit();
    }
}
