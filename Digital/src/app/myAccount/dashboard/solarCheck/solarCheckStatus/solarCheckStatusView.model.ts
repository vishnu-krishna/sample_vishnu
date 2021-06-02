import { SolarCheckStatusDataSettings, SolarCheckStatusLinks } from '../../../../shared/globals/solarCheckConstants';

/**
 * Solar Check Status View Model class: use this class to hold the properties/ state of the viewModel for the SolarCheckStatusComponent.
 *
 * @export
 * @class SolarCheckStatusViewModel
 */
export class SolarCheckStatusViewModel {

    public solarImage: ImageViewModel;
    public statusImage: ImageViewModel;
    public heading: string;
    public details: string;
    public link: string;
    public linkName: string;
    public latestDataDate: string;
    public statusExpectedDate: string;
    public daysOfData: number;
    public copyTextTime: string;
    public iconBackgroundColour: string;
    public isShowLearnMoreLink: boolean;
    public isCheckSystem: boolean;
    public isGoodStatus: boolean;

    constructor() {
        this.initialize();
    }
    public clear() {
        this.statusImage = undefined;
        this.solarImage = undefined;
        this.heading = undefined;
        this.details = undefined;
        this.link = undefined;
        this.linkName = undefined;
        this.isShowLearnMoreLink = undefined;
        this.latestDataDate = undefined;
        this.iconBackgroundColour = undefined;
        this.isCheckSystem = undefined;
        this.daysOfData = undefined;
        this.isGoodStatus = undefined;
    }
    // initializes with status = not available.
    public initialize() {
        this.statusImage = new ImageViewModel();
        this.solarImage = new ImageViewModel();
        this.solarImage.src = 'svg/scs_icon_normal.svg';
        this.statusImage.src = 'svg/scs_status_notAvailable.svg';
        this.solarImage.altText = 'AGL Solar Check icon';
        this.heading = 'Sorry, your solar status isn\'t currently available.';
        this.details = 'Check back soon.';
        this.link = SolarCheckStatusLinks.DefaultLearnMoreLink;
        this.linkName = 'LEARN MORE';
        this.isShowLearnMoreLink = true;
        this.latestDataDate = null;
        this.iconBackgroundColour = null;
        this.isCheckSystem = false;
        this.daysOfData = SolarCheckStatusDataSettings.NumberOfDaysToProcess;
        this.isGoodStatus = false;
    }
}

export class ImageViewModel {
    public src: string;
    public altText: string;
}
