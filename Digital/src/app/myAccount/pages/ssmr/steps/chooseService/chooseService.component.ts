import { Component, OnInit } from '@angular/core';
import { ContractDisplayViewModel } from '../../../../model/ssmr/contractDisplayView.model';
import { ISsmrService } from '../../../../services/contract/issmr.service';

@Component({
    selector: 'agl-ssmr-choose-service',
    templateUrl: './chooseService.component.html',
    styleUrls: ['./chooseService.component.scss']
})

export class ChooseServiceComponent implements OnInit {

    public selectedContract: ContractDisplayViewModel;
    public contractList: ContractDisplayViewModel[] = [];

    constructor(
        public ssmrService: ISsmrService
    ) { }

    public ngOnInit() {
        this.ssmrService.screenCode = null;
        this.ssmrService.getEligibleContracts().subscribe(
            (result) => {
                this.contractList = result;
            }
        );
    }

    public contractSelected(selectedContract: ContractDisplayViewModel) {
        if (selectedContract.isEligible) {
            this.ssmrService.selectedContract = selectedContract;

            this.ssmrService.goToStep('Safety');
        }
    }

    public onClickChat() {
        this.ssmrService.goToStep('Chat');
    }

    public onClickPhotoUpload(selectedContract: ContractDisplayViewModel) {
        this.ssmrService.selectedContract = selectedContract;
        this.ssmrService.clearReadings();

        this.ssmrService.goToStep('PhotoIntro');
    }

}
