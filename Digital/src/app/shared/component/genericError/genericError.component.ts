import { Component , Input }  from '@angular/core';
import { ApiService } from './../../service/api.service';
import { DataLayerService, ModalName } from './../../service/dataLayer.service';

@Component({
    selector: 'agl-generic-error',
    templateUrl: './genericError.component.html',
    styleUrls: ['./genericError.component.scss'],
})
export class GenericErrorComponent {
    @Input() public isVasError: boolean = false;

    constructor(
        private _api: ApiService,
        private dataLayerService: DataLayerService
    ) {
        _api.errors.subscribe(
            (newError) => {
                this.dataLayerService.pushInlineErrorEvent(ModalName.None, newError);
            }
        );
    }
}
