import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../../../../modal/modal.component';
import { ModalService } from '../../../../modal/modal.service';

@Component({
    selector: 'agl-settings-smspay-success',
    templateUrl: './smsPaySuccess.component.html',
    styleUrls: ['./smsPaySuccess.component.scss']
})
export class SMSPaySuccessComponent implements OnInit {
    public args;
    public hasGas: boolean = false;
    public hasElec: boolean = false;
    constructor(
        private modalService: ModalService,
        private modalComponent: ModalComponent,
    ) {
    }
    public ngOnInit() {
        this.hasGas = !!this.args.account.accountDetailModel.numberOfGasIcons;
        this.hasElec = !!this.args.account.accountDetailModel.numberOfElectricityIcons;
        let modal = document.getElementById('dialog-container');
        // It doesn't look pretty, but it fixes the glitch on some environments ;-)
        if (modal) {
            setTimeout(() => {
                modal.style.zIndex = '1000';
            }, 0);
            setTimeout(() => {
                modal.style.zIndex = '1000';
            }, 50);
            setTimeout(() => {
                modal.style.zIndex = '1000';
            }, 500);
        }
    }

    public onClickClose() {
        this.modalComponent._cancelButtonTopRight.nativeElement.click();
    }

}
