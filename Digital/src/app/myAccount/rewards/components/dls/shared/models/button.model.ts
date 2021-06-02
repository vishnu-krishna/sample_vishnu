import { ButtonType } from '../../../../../maui/button/button.enum';

/**
 * Basic model used to setup a DLS button within another DLS component
 */
export class ButtonViewModel {
    /**
     * Text to be displayed on a button
     */
    public buttonText: string;
    /**
     * What style should the button take (primary vs secondary)
     */
    public buttonType: ButtonType;
    /**
     * Should the button render as a smaller button (Smaller height)
     */
    public small: boolean = false;
}
