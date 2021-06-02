import { Component, OnInit } from '@angular/core';
import { ISsmrService } from '../../../../services/contract/issmr.service';

@Component({
    selector: 'agl-ssmr-photo-intro',
    templateUrl: './photoIntro.component.html',
    styleUrls: ['./photoIntro.component.scss']
})

export class PhotoIntroComponent implements OnInit {
    public shouldSlideLeft: boolean = false;
    public customerEmail: string;
    public mailToLink: string;

    constructor(
        private ssmrService: ISsmrService
    ) {
    }

    public ngOnInit() {
        this.customerEmail = 'CustomerReads@agl.com.au';
        const subject = `Customer own read for account ${this.ssmrService.selectedContract.accountNumber}`;
        this.mailToLink = `mailto:${this.customerEmail}?subject=${encodeURIComponent(subject)}`;
    }

    public clickToAttachPhoto() {
        this.ssmrService.goToStep('AttachPhoto');
    }
}
