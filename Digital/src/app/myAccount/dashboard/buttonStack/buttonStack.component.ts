import {
    Component,
    Inject,
    Input,
    OnInit
} from '@angular/core';
import { ConfigService } from './../../../shared/service/config.service';

import * as moment from 'moment';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { RequestStatusType } from '../../../shared/globals/oneMinuteMove/requestStatusType';
import { EligibilityModel } from '../../../shared/model/oneMinMove/index';
import { MoveGetResponseModel } from '../../../shared/model/oneMinMove/moveGetResponse.model';
import { ContentService } from '../../../shared/service/content.service';
import { IEligibilityService } from '../../../shared/service/contract/ieligibility.service';
import { IMoveJoinApiService } from '../../../shared/service/contract/imoveJoinApi.service';
import { Now } from '../../../shared/service/now.service';
import { AccountViewModel, IAccountServiceMA } from '../../services/account.service';
import { ISsmrService } from '../../services/contract/issmr.service';
import { FeatureFlagService, FeatureFlagTypes } from '../../services/featureFlag.service';

@Component({
    selector: 'agl-button-stack',
    templateUrl: './buttonStack.component.html',
    styleUrls: ['./buttonStack.component.scss']
})
export class ButtonStackComponent implements OnInit {

    @Input() public heading: string;
    @Input() public jumpLinks: LinkButton[];
    @Input() public arrows: boolean = true;
    @Input() public content: string;
    @Input() public isReadOnly: boolean;
    public doesCustomerhaveBasicMeter: boolean;
    public hideLink: boolean;
    public loaded: boolean;
    public showLink: boolean;
    public apiData: MoveGetResponseModel;
    public monthlyBillingEnabled: boolean = true;
    public ommLink: string;

    public expiryDate: string;
    public status: string;
    public ssmrFeatureEnabled: boolean = true;
    public jumpLinksPopulated: boolean = false;

    constructor(
        public _ssmr: ISsmrService,
        public _contentService: ContentService,
        public _accountsService: IAccountServiceMA,
        public featureService: FeatureFlagService,
        public _api: IMoveJoinApiService,
        public _now: Now,
        public _configService: ConfigService,
        public _eligibilityService: IEligibilityService,
        @Inject('AppContentBranch') public _appContentBranch: string
    ) { }

    public ngOnInit() {
        this.featureService
            .featureFlagged(FeatureFlagTypes.monthlyBillingEnabled)
            .subscribe(
                (result: boolean) => {
                    this.monthlyBillingEnabled = result;
                }
            );
        Observable.forkJoin(
            this._api.GetOMMTracker(),
            this._contentService.getContent()
        ).subscribe(
            ([moveGetResponseModel, content]) => {
                if (moveGetResponseModel) {
                    this.expiryDate = moveGetResponseModel.oneMinuteMove.expiryDate;
                    this.status = RequestStatusType[moveGetResponseModel.oneMinuteMove.status];
                }

                let showTrackerFeatureFlag = false;
                if (content[this._appContentBranch]['oMMTracker'] && content[this._appContentBranch]['oMMTracker']['showTracker']) {
                    showTrackerFeatureFlag =  content[this._appContentBranch]['oMMTracker']['showTracker'];
                }
                this.setOMMButton(this.status, this.expiryDate, showTrackerFeatureFlag);
                let contentNode = content[this._appContentBranch][this.content];

                this._eligibilityService.CheckEligibilityMyAccount().subscribe((eligibilityModel: EligibilityModel[]) => {
                    const eligibility = eligibilityModel.find((e) => !!e.oneMinuteMove);
                    let isEligibile = false;
                    if (eligibility) {
                        isEligibile = eligibility.oneMinuteMove.isEligible;
                    }

                    this.jumpLinks = [];
                    for (let key of Object.keys(contentNode)) {
                        let item = contentNode[key];
                        this.hideLink = false;
                        if (item.code === 'omm') {
                            this.hideLink = this.ommLink !== key;
                        }
                        let webSiteUrl = this._configService.current.aglSiteCoreWebsiteBaseUrl;
                        if ((item.url === `${webSiteUrl}/sts/account/login?returnApp=OneMinuteMove&returnPath=%2Fsignup%23connection%2FrequestType%2FMI`) && isEligibile) {
                            item.url = `${webSiteUrl}/sts/account/login?returnApp=OneMinuteMove&returnPath=${encodeURIComponent('/apps/one-minute-move')}`;
                        }
                        if (!this.hideLink) {
                            if (this.isJumpLinkValid(item)) {
                                this.jumpLinks.push(new LinkButton(item.label, item.isFeatured, item.url, item.image, item.note, item.title));
                            }
                        }
                    }
                    this.jumpLinksPopulated = true;
                });
            });

        this.checkCustomerhaveBasicMeter();
    }

    public checkCustomerhaveBasicMeter() {
        this.doesCustomerhaveBasicMeter = true;
        this._accountsService.getAccounts().subscribe(
            (result) => {
                let accountArray: AccountViewModel[];
                accountArray = result;
                for (let account of accountArray) {
                    this.doesCustomerhaveBasicMeter = (account.contracts.find((contract) => (contract.isSmartMeter === false)) !== undefined);
                    if (this.doesCustomerhaveBasicMeter) {
                        break; // breaking if atleast one basic meter is found for the account
                    }
                }
            }
        );
    }

    public isJumpLinkValid(item) {
        return !item.title || ((item.title === 'monthlyBilling' && this.monthlyBillingEnabled));
    }

    public setOMMButton(status: string, expiryDate: string, showTracker: boolean) {
        if (status !== null && status !== undefined && status !== '') {
            if (showTracker && status === 'WelcomeHome' && moment(new Date(expiryDate)).isAfter(this._now.date())) {
                this.ommLink = 'rateMyMove';
            } else if (showTracker && (['RequestReceived', 'ProcessingTenPercent', 'ProcessingNinetyPercent', 'ReadyToConnect'].indexOf(status) > -1) && moment(new Date(expiryDate)).isAfter(this._now.date())) {
                this.ommLink = 'trackMyMove';
            } else {
                this.ommLink = 'moveHome';
            }
        } else {
            this.ommLink = 'moveHome';
        }
    }
}

export class LinkButton {
    constructor(
        public label: string,
        public isFeatured: boolean,
        public url: string,
        public image: string,
        public note: string,
        public title: string) {
    }
}
