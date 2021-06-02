export class SolarCheckPrerequisiteViewModel {

    public yesButtonSrc: string;
    public noButtonSrc: string;
    public hasBattery: boolean;

    private yesButtonImageSrcDeselected = ' svg/scc_prereq_battery_yes.svg';
    private yesButtonImageSrcSelected = 'svg/scc_prereq_battery_yes_reverse.svg';
    private noButtonImageSrcDeselected = 'svg/scc_prereq_battery_no.svg';
    private noButtonImageSrcSelected = 'svg/scc_prereq_battery_no_reverse.svg';

    constructor() {
        this.hasBattery = null;
        this.yesButtonSrc = this.yesButtonImageSrcDeselected;
        this.noButtonSrc = this.noButtonImageSrcDeselected;
    }

    public UpdateHasBattery(isBattery: boolean) {

        this.hasBattery = isBattery;

        if (isBattery) {
            this.yesButtonSrc = this.yesButtonImageSrcSelected;
            this.noButtonSrc = this.noButtonImageSrcDeselected;
        } else if (isBattery === null) {
            this.noButtonSrc = this.noButtonImageSrcDeselected;
            this.yesButtonSrc = this.yesButtonImageSrcDeselected;
        } else {
            this.noButtonSrc = this.noButtonImageSrcSelected;
            this.yesButtonSrc = this.yesButtonImageSrcDeselected;
        }
    }
}
