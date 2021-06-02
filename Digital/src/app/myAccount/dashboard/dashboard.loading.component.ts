import {
    animate,
    state,
    style,
    transition,
    trigger } from '@angular/animations';
import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { ApiService } from '../../shared/service/api.service';
import { ModalService } from '../modal/modal.service';
import { ConfigService }    from './../../shared/service/config.service';
import { FailedLoadingComponent } from './failedloading/failed.loading.component';

@Component({
    selector: 'agl-dashboard-loading',
    templateUrl: './dashboard.loading.component.html',
    styleUrls: ['./dashboard.loading.component.scss'],
    animations: [
      trigger('loadedState', [
        state('notloaded', style({
          opacity: '1'
        })),
        state('loaded', style({
          opacity: '0',
          display: 'none'
        })),
        transition('* => *', animate('.2s'))
      ])
    ]
})
export class DashboardLoadingComponent implements OnInit {
    @Input() public status;
    @Input() public contentStatus;
    @Input() public paypalStatus;

    private _intervalId;

    private _hideModal: Boolean = false;

    constructor(
      private _confirmService: ModalService,
      private _apiService: ApiService,
      private _configService: ConfigService,

    ) {}

    public ngOnInit() {
        // dont make tests wait around for 30sec load up time
        let isE2eTestMode = this._configService.current.isE2eTestMode();
        let loadingScreenMs = this._configService.current.showLoadingModalAfterMs;

        if (isE2eTestMode) {
            loadingScreenMs = 3000;
        }

        this._apiService.errors.subscribe(() => {
            this._hideModal = true;
        });

        /**
         * Ok we set the timeout time to 30s, after 30s and no status of loaded
         * we open a modal that contains the loading component. We then bind a
         * variable to an interval, we essentially poll this interval in 3s
         * intervals till we get the status of loaded, when the loaded status
         * returns we clear the interval and close the modal.
         */
        setTimeout(() => {
            if (!this._hideModal && (this.status !== 'loaded' || !this.contentStatus)) {
                // If paypal modal is visible, don't open the modal.
                // Also making sure another another modal isn't currently showing. This is to prevent modals like the rewards feature intro being closed to show this modal.
                if (this.paypalStatus !== 'visible' && !this._confirmService.isModalOpen()) {
                    this.openLoadingModal();
                    this._intervalId = setInterval(() => {
                        if (this._hideModal || (this.status === 'loaded' && this.contentStatus)) {
                            clearInterval(this._intervalId);
                            this._confirmService.close();
                        }
                    }, 3000);
                }
            }
        }, loadingScreenMs);
    }

    private openLoadingModal() {
        this._confirmService.activate(
            {
              title: '',
              cancelText: '',
              okText: '',
              class: 'loading-modal',
              modalType: 'component',
              component: FailedLoadingComponent,
            }
        ).then(
        );
    }

}
