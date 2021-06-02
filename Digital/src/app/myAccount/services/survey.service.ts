import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Md5 } from 'ts-md5/dist/md5';
import { ConfigService } from '../../shared/service/config.service';
import { JwtDecoderService } from '../../shared/service/jwt.decoder.service';

declare let leanengage: any;

export enum SurveyType {
    myAccountSolarSurvey = <any> 'my-account-solar-survey',
    myAccountPayNowSurvey = <any> 'my-account-payment-survey-clone-b46a2b14-c808-4bdd-b824-eab69e44d8c8',
    myAccountV2PayNowSurvey = <any> 'my-account-v2-survey-pay-now',
    myAccountUsageSurvey = <any> 'usage-survey',
    oneMinuteMoveProcessSurvey = <any> 'one-minute-move-process-survey',
    smsPaySurvey = <any> 'sms-pay-survey-clone',
    myAccountDDSurvey = <any> 'my-account-dd-survey-1ff795e5-1aae-481f-8e08-6891146dd8e5',
    MonthlyBilling = <any> 'monthly-billing-clone',
    homeProfile = <any> 'home-profile',
    instalmentPlanSuccess = <any> 'instalment-plan-success'
}

export enum SurveyEventType {
    solarFaqClickEvent = <any> 'solar_faq_click',
}

export class Survey {
    // tslint:disable-next-line:variable-name
    public user_id: String;
    public email: String;
    public name: String;
    // tslint:disable-next-line:variable-name
    public app_id: String;
}

export class SolarSurvey extends Survey {
    // tslint:disable-next-line:variable-name (These values are provided to Lean Engage service so cannot be camel case)
    public solar_status: String;
    // tslint:disable-next-line:variable-name (These values are provided to Lean Engage service so cannot be camel case)
    public valid_solar_status: boolean = true;

    constructor(contractId: String, solarStatus: String) {
        super();
        let hashedContractId = Md5.hashStr(contractId.toString()).toString();
        this.user_id = hashedContractId;
        this.email = hashedContractId;
        this.name = hashedContractId;
        this.solar_status = solarStatus;
    }
}

@Injectable()
export class SurveyService {

    constructor(private configService: ConfigService, private jwtDecoderService: JwtDecoderService) { }
    /**
     * Initialise Survey with Lean Engage
     * @param params intialized values that are required (e.g user_id, email, name, etc)
     */
    public start(survey: Survey) {
        survey.app_id = this.configService.current.leanEngageAppId;
        leanengage('start', survey);
    }

    /**
     * Tracking the triggering of events with Lean Engage
     * @param surveyEventType
     */
    public trackEvent(surveyEventType: SurveyEventType) {
        leanengage('trackEvent', surveyEventType.toString());
    }

    /**
     * Trigger a survey via Lean Engage
     * @param  {SurveyType} surveyType
     */
    public triggerSurvey(surveyType: SurveyType) {
        leanengage('triggerSurvey', surveyType.toString());
    }

    /**
     * Create AppId via Lean Engage - Use for testing.
     * @param  appId
     */
    public createAppId(appId: string) {
        /* Appid is injected (*.myaccount). Allow for localhost host, window.LEANENGAGE.*/
        leanengage('create', appId);
    }

    public showFeedbackSurvey(surveyType: SurveyType) {
        const leanAppId = this.configService.current.leanEngageAppId;
        const anonymousSurveys = [
            SurveyType.smsPaySurvey,
            SurveyType.MonthlyBilling
        ];
        const authenticatedSurveys = [
            SurveyType.myAccountDDSurvey,
            SurveyType.homeProfile,
            SurveyType.instalmentPlanSuccess
        ];

        let userId;
        if (anonymousSurveys.some((type) => type === surveyType)) {
            userId = Array.apply(0, Array(15)).map( () => {
                return ( (charset) => {
                    return charset.charAt(Math.floor(Math.random() * charset.length));
                }) ('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789');
            }).join('');
            leanengage('start', { user_id: userId, name: 'anonymous', app_id: leanAppId });
        } else if (authenticatedSurveys.some((type) => type === surveyType)) {
            const bearerToken = sessionStorage.getItem('Bearer');
            if (bearerToken) {
                userId = this.jwtDecoderService.nameIdentifier();
            }
            leanengage('start', { user_id: userId, name: userId, app_id: leanAppId });
        }

        // Uncomment the below line if you want to test this on localhost
        // leanengage('create', leanAppId);

        leanengage('triggerSurvey', surveyType);
    }
}
