import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { TrackerMode } from '../../shared/globals/ommTrackerConstants';
import { IConnectionContent, IConnectionData } from '../../shared/model/ommTracker/connectionContent.interface';
import { DidYouKnowViewModel } from '../../shared/model/ommTracker/didYouKnowViewModel.interface';
import { InfoItem } from '../../shared/model/ommTracker/infoItem.model';
import { NeedToMakeChangeViewModel } from '../../shared/model/ommTracker/needToMakeChangeViewModel.interface';
import { TrackProgressContent } from '../../shared/model/ommTracker/trackProgressContent.model';
import { HeaderViewModel } from '../../shared/model/ommTracker/trackStatusHeader.model';
import { TrackerService } from '../services/tracker.service';

import { ErrorMessageModel } from '../../shared/model/ommTracker/errorMessage.model';
import { ConfigService } from '../../shared/service/config.service';
import { IMoveJoinApiService } from '../../shared/service/contract/imoveJoinApi.service';

import { RequestStatusType } from '../../shared/globals/oneMinuteMove/requestStatusType';
import { DataLayerService } from './../../shared/service/dataLayer.service';

@Component({
  selector: 'agl-omm-tracker',
  templateUrl: './ommTracker.component.html',
  styleUrls: ['./ommTracker.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class OmmTrackerComponent implements OnInit {

  public trackerMode: TrackerMode;
  public trackerModeEnum = TrackerMode;
  public headerStatus: HeaderViewModel;
  public requestStatus: string;
  public accountName: string;
  public ommTrackerScData;
  public progressContent: TrackProgressContent;
  public connectionContent: IConnectionContent;
  public connectionData: IConnectionData;
  public referenceCode: string;
  public whatHappensNextContent: InfoItem[];

  public didYouKnowViewModel: DidYouKnowViewModel;
  public needToMakeChangeViewModel: NeedToMakeChangeViewModel;
  public accountNumber: string;
  public isLoaded: Boolean = false;
  public isError: Boolean = false;
  public errorModel: ErrorMessageModel;

  public hideProgressBar: boolean;
  constructor(
    public sanitizer: DomSanitizer,
    public iconRegistry: MatIconRegistry,
    public trackerService: TrackerService,
    private _api: IMoveJoinApiService,
    private dataLayerService: DataLayerService,
    protected _config: ConfigService
  ) {
    iconRegistry.addSvgIcon('icon-status-tick', sanitizer.bypassSecurityTrustResourceUrl('svg/status_tick.svg'));
    iconRegistry.addSvgIcon('icon-status-in-process', sanitizer.bypassSecurityTrustResourceUrl('svg/status_tick.svg'));
    iconRegistry.addSvgIcon('icon-status-clock', sanitizer.bypassSecurityTrustResourceUrl('svg/status_clock.svg'));
    iconRegistry.addSvgIcon('icon-status-power-plug', sanitizer.bypassSecurityTrustResourceUrl('svg/status_power_plug.svg'));
    iconRegistry.addSvgIcon('icon-status-looking', sanitizer.bypassSecurityTrustResourceUrl('svg/status_looking.svg'));
    iconRegistry.addSvgIcon('icon-status-home', sanitizer.bypassSecurityTrustResourceUrl('svg/status_home.svg'));
    iconRegistry.addSvgIcon('icon-plug', sanitizer.bypassSecurityTrustResourceUrl('svg/plug_icon.svg'));
    iconRegistry.addSvgIcon('icon-socket', sanitizer.bypassSecurityTrustResourceUrl('svg/socket_icon.svg'));
    iconRegistry.addSvgIcon('icon-question-tooltip', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_question.svg'));
    iconRegistry.addSvgIcon('icon-elec-enabled', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_elec_enabled.svg'));
    iconRegistry.addSvgIcon('icon-gas-enabled', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_gas_enabled.svg'));
    iconRegistry.addSvgIcon('agl-brand-logo', sanitizer.bypassSecurityTrustResourceUrl('svg/agl_brand_logo.svg'));
    iconRegistry.addSvgIcon('agl-mobile-brand-logo', sanitizer.bypassSecurityTrustResourceUrl('svg/agl-new-logo-white.svg'));

    this.errorModel = new ErrorMessageModel();
    this.errorModel.icon = 'svg/exclamation-icon.svg';
    this.errorModel.heading = 'Oops there\'s a problem.';
  }

  public ngOnInit() {
    // load contend
    this.trackerService.load().subscribe((result) => {
      this.headerStatus = result.headerStatus;
      this.didYouKnowViewModel = result.didYouKnowViewMode;
      this.connectionContent = result.connectionContent;
      this.connectionData = result.connectionData;
      this.requestStatus = RequestStatusType[result.requestStatus];
      this.needToMakeChangeViewModel = result.needToMakeAChangeViewModel;
      this.progressContent = result.progressContent;
      this.referenceCode = result.referenceNumber;
      this.trackerMode = result.trackerStatus;
      this.whatHappensNextContent = result.whatHappensNext;
      this.isLoaded = true;
      this.accountNumber = result.accountNumber;
      this.accountName = result.accountName;
      if (this.trackerMode === TrackerMode.Track) {
         this.dataLayerService.pushSingleEvents({ event: 'OMM Tracker', state: 'TRACKER' });
      }
    });

    this._api.errors.subscribe((error) => {
      this.trackerService.getErrorMessage().subscribe((erroDesc) => {
        this.errorModel.description = erroDesc;
        this.isError = true;
      });
    });

    this._api.checkAuthorization.subscribe((error) => {
      let currentHost = this._config.getEnvironmentName();
      window.location.href = `https://${currentHost}/aeo/home/login`;
    });

    this._api.checkExpiredOMM.subscribe((model) => {
      window.location.href = window.location.href.replace('/ommtracker', '/overview');
    });

  }
}
