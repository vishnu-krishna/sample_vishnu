export class SolarCheckUpdateReasonViewModel {

    public leftButtonSrc: string;
    public rightButtonSrc: string;
    public isSystemChange: boolean;

    private systemChangeButtonImageSrcDeselected = ' svg/scc_update_system_change.svg';
    private systemChangeButtonImageSrcSelected = 'svg/scc_update_system_change_reverse.svg';
    private correctionButtonImageSrcDeselected = 'svg/scc_update_correction.svg';
    private correctionButtonImageSrcSelected = 'svg/scc_update_correction_reverse.svg';

    constructor() {
        this.isSystemChange = null;
        this.leftButtonSrc = this.systemChangeButtonImageSrcDeselected;
        this.rightButtonSrc = this.correctionButtonImageSrcDeselected;
    }

    public UpdateIsSystemChange(isUpgrade: boolean) {

        this.isSystemChange = isUpgrade;

        if (isUpgrade) {
            this.leftButtonSrc = this.systemChangeButtonImageSrcSelected;
            this.rightButtonSrc = this.correctionButtonImageSrcDeselected;
        } else if (isUpgrade === null) {
            this.rightButtonSrc = this.correctionButtonImageSrcDeselected;
            this.leftButtonSrc = this.systemChangeButtonImageSrcDeselected;
        } else {
            this.rightButtonSrc = this.correctionButtonImageSrcSelected;
            this.leftButtonSrc = this.systemChangeButtonImageSrcDeselected;
        }
    }
}
