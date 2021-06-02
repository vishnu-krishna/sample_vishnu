import * as moment from 'moment';
import { SolarCheckStatusLinks } from '../../../../shared/globals/solarCheckConstants';
import { SolarCheckStatusType } from '../../../../shared/model/solar/solarCheckStatus.model';
import { SolarCheckStatusResponse } from '../../../../shared/model/solar/solarCheckStatusResponse.model';
import { SolarCheckStatusViewModel } from './solarCheckStatusView.model';

/**
 * Solar Check Status Details class: use this class to set the state/ properties of the SolarCheckStatusViewModel based on the SolarCheckStatusResponse.
 *
 * @export
 * @class SolarCheckStatus
 */
export class SolarCheckStatusViewModelFactory {

    public model: SolarCheckStatusViewModel;

    constructor() {
        this.model = new SolarCheckStatusViewModel();
        this.model.isGoodStatus = false;
        this.model.statusImage.src = 'svg/scs_status_notAvailable.svg';
        this.model.statusImage.altText = 'solar check status is not available';
    }

    /**
     * Create Model By Check Type.
     * This method will create the View Model that will be used to hold the UI presentation data.
     * The content of the model will be determined based on the status value of the Solar Check Status response model.
     * @param  {SolarCheckStatusResponse} solarCheckResponse Solar Check Response model
     */
    public createSolarCheckStatusViewModel(solarCheckResponse: SolarCheckStatusResponse) {

        this.model = new SolarCheckStatusViewModel();

        switch (Number(SolarCheckStatusType[solarCheckResponse.solarStatus])) {
            case SolarCheckStatusType.Good: {
                return this.setGoodStatusProperties(solarCheckResponse);
            }
            case SolarCheckStatusType.Fault: {
                return this.setCheckSystemStatusProperties(solarCheckResponse);
            }
            case SolarCheckStatusType.NotAvailable: {
                return this.setRegisteredStatusProperties();
            }
            case SolarCheckStatusType.UpdatePending: {
                if (solarCheckResponse.statusExpectedDate) {
                    return this.setSystemUpgradeProperties(solarCheckResponse);
                }
                return this.setSystemCorrectionProperties();
            }
            default: {
                return this.setIndeterminateStatusProperties(this.model);
            }
        }
    }

    /**
     * Create Not Available Status Response.
     * This method will create the View Model that will be used to hold the UI presentation data.
     * The content of the model will be set with the details for the status of 'Not Available;.
     */
    public createNotAvailableStatusViewModel() {
        let notAvailableStatusResponse = new SolarCheckStatusViewModel();
        return this.setIndeterminateStatusProperties(notAvailableStatusResponse);
    }

    // /**
    //  * Create Registered Status Response.
    //  * This method will create the View Model that will be used to hold the UI presentation data.
    //  * The content of the model will be set with the details for the status of 'Not Available;.
    //  */
    public createRegisteredStatusViewModel() {
        this.setCommonPendingStatusProperties();
        return this.model;
    }

    private setRegisteredStatusProperties() {
        this.setCommonPendingStatusProperties();
        return this.model;
    }

    private setGoodStatusProperties(solarHealthResponse: SolarCheckStatusResponse) {
        this.model.heading = 'Your system is producing solar energy.';
        this.model.details = null;
        this.model.latestDataDate = moment(solarHealthResponse.processedDateTime).format('D MMM YYYY');
        this.model.isShowLearnMoreLink = true;
        this.model.isCheckSystem = false;
        this.model.link = SolarCheckStatusLinks.LearnMoreGreenLink;
        this.model.linkName = 'COULD IT BE BETTER?';
        this.model.isGoodStatus = true;
        this.model.statusImage.src = 'svg/scs_status_good.svg';
        this.model.statusImage.altText = 'solar check status is good';
        return this.model;
    }

    private setCheckSystemStatusProperties(solarHealthResponse: SolarCheckStatusResponse) {
        this.model.heading = 'Your system may have an issue.';
        this.model.iconBackgroundColour = 'orange';
        this.model.link = SolarCheckStatusLinks.LearnMoreAmberLink;
        this.model.linkName = 'WHAT DOES THIS MEAN?';
        this.model.details = null;
        this.model.latestDataDate = moment(solarHealthResponse.processedDateTime).format('D MMM YYYY');
        this.model.solarImage.src = 'svg/scs_icon_issue.svg';
        this.model.isShowLearnMoreLink = false;
        this.model.isGoodStatus = false;
        this.model.statusImage.src = 'svg/scs_status_checkSystem.svg';
        this.model.statusImage.altText = 'solar check status is check system';
        this.model.isCheckSystem = true;
        return this.model;
    }

    private setSystemCorrectionProperties() {
        this.setCommonPendingStatusProperties();
        this.model.heading = 'Solar Command Check status is being calculated.';
        this.model.details = 'Check back tomorrow.';
        return this.model;
    }

    private setSystemUpgradeProperties(solarHealthResponse: SolarCheckStatusResponse) {
        this.setCommonPendingStatusProperties();
        this.model.statusExpectedDate = moment(solarHealthResponse.statusExpectedDate).format('D MMM');
        this.model.heading = 'Your system status will be ready soon. Estimated date ' + this.model.statusExpectedDate +  '.';
        this.model.details = '30 days of data are required to calculate your status - we\'ll email you when it is ready.';
        return this.model;
    }

    private setCommonPendingStatusProperties() {
        this.model.heading = 'Your Solar Command Check will be available in about an hour; we\'ll email you when it\'s ready.';
        this.model.details = '';
        this.model.latestDataDate = null;
        this.model.isShowLearnMoreLink = true;
        this.model.link = SolarCheckStatusLinks.DefaultLearnMoreLink;
        this.model.linkName = 'LEARN MORE';
        this.model.isCheckSystem = false;
        this.model.isGoodStatus = false;
        this.model.statusImage.src = 'svg/scs_status_registered.svg';
        this.model.statusImage.altText = 'solar check status is registered';
    }

    private setIndeterminateStatusProperties(viewModel: SolarCheckStatusViewModel) {
        viewModel.heading = 'Sorry, your solar status isn\'t currently available.';
        viewModel.details = 'Check back soon.';
        viewModel.latestDataDate = null;
        viewModel.isShowLearnMoreLink = true;
        viewModel.link = SolarCheckStatusLinks.LearnMoreUnavailableLink;
        viewModel.isCheckSystem = false;
        viewModel.isGoodStatus = false;
        viewModel.statusImage.src = 'svg/scs_status_notAvailable.svg';
        viewModel.statusImage.altText = 'solar check status is not available';
        return viewModel;
    }
}
