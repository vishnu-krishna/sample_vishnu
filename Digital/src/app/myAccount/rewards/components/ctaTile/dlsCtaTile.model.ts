import { ButtonViewModel } from '../dls/shared/models/button.model';
import { DLSCTATileImageModel } from './dlsCtaTileImage.model';

/**
 * Setup for a new Call To Action Tile
 */
export class DLSCTATileModel {
    /**
     * Default image to be displayed for the CTA Tile
     */
    public defaultImage: DLSCTATileImageModel = new DLSCTATileImageModel();
    /**
     * When the CTA Tile is configured to display in horizontal mode
     * A different image can be configured.  If no image is configured then it will fall back to the default image
     */
    get horizontalImage(): DLSCTATileImageModel {
        return this._horizontalImage || this.defaultImage;
    }
    set horizontalImage(image: DLSCTATileImageModel) {
        this._horizontalImage = image;
    }
    /**
     * configuration of the first call to action button (if required)
     */
    public button1: ButtonViewModel;
    /**
     * configuration of the second call to action button (if required)
     */
    public button2: ButtonViewModel;

    private _horizontalImage: DLSCTATileImageModel;
}
