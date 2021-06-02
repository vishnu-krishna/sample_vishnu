/**
 * Image properties for the CTA tile
 */
export class DLSCTATileImageModel {
    /**
     * url path to the image to be displayed.
     * Depending on where the image comes from may need to be absolute
     * as opposed to relative
     */
    public path: string;

    /**
     * Style attributes to be passed down to the <imag /> tag.
     * Use as a key pair value
     * E.G "height: '60px'"
     */
    public style: any = {};
}
