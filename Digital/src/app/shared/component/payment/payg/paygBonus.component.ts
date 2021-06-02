import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BonusBand } from '../../../model/payment/bonusBand.model';
import { PaymentContentModel } from '../../../model/payment/paymentContent.model';
import { PaymentDetails } from '../../../model/payment/paymentDetails.model';
import { ContentService } from '../../../service/content.service';

@Component({
    selector: 'agl-payg-bonus',
    templateUrl: './paygBonus.component.html',
    styleUrls: ['./paygBonus.component.scss']
})
export class PaygBonusComponent implements OnInit {
    @ViewChild('bonusBand') public bonusBand;
    @Input() public paymentDetails: PaymentDetails;
    @Input() public bonusBands: BonusBand[];
    @Output() public onSelectAmount = new EventEmitter<number>();
    public content: PaymentContentModel;
    public bonusBandDisplay: boolean[] = [];
    public displayLeftScroll: string = 'preactive';
    public displayRightScroll: string = 'preactive';
    public isScrollOverflowing: boolean = false;
    private bonusbandWidth: number;
    private pixel: number = 0;

    constructor(
        private _contentService: ContentService) {
    }

    public ngOnInit() {
        this._contentService.getContent().subscribe((result) => {
            if (result.selfService !== undefined &&
                result.selfService.payment !== undefined) {
                this.content = result.selfService.payment;
            }
        });
        this.bonusBands.forEach(
            (band, index) => {
                this.bonusBandDisplay.push(false);
                setTimeout(() => {
                    this.bonusBandDisplay[index] = true;
                    this.bonusBand.nativeElement.scrollLeft = this.pixel = 50;
                }, (index * 200));
            }
        );
        setTimeout(() => {
            this.isScrollOverflowing = this.isOverflowing();
        }, 200);
    }

    public selectAmount(bonus: number) {
        this.onSelectAmount.emit(bonus);
    }
    public scrollToRight() {
        this.displayLeftScroll = 'active';
        if (this.isOverflowing()) {
            if (this.pixel <= (this.bonusBand.nativeElement.scrollWidth - this.bonusBand.nativeElement.offsetWidth)) {
                this.pixel += 50;
                this.bonusBand.nativeElement.scrollLeft = this.pixel;
                if (this.pixel > this.bonusbandWidth) {
                    this.displayRightScroll = 'inactive';
                }
            }
        }
    }
    public scrollToLeft() {
        this.displayRightScroll = 'active';
        if (this.isOverflowing()) {
            let leftPixel = this.pixel - 50;
            this.bonusBand.nativeElement.scrollLeft = leftPixel;
            this.pixel = this.pixel - 50;
            if (this.pixel <= 0) {
                this.displayLeftScroll = 'inactive';
            }
        }
    }
    public isOverflowing() {
        this.bonusbandWidth = this.bonusBand.nativeElement.scrollWidth - this.bonusBand.nativeElement.offsetWidth;
        return !(this.bonusBand.nativeElement.scrollWidth <= this.bonusBand.nativeElement.offsetWidth);
    }
}
