import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { BonusBand } from '../../shared/model/payment/bonusBand.model';
import { IProductApiService } from '../../shared/service/contract/iproductApi.service';
import { ModalService } from '../modal/modal.service';
import { ContractViewModel } from '../services/account.service';
import { EventService } from '../services/event.service';

declare let leanengage: any;

@Injectable()
export class PaymentService {
    private address: string;
    private amount: string;
    private bonusBands: BonusBand[];
    private contract: ContractViewModel;

    constructor(
        private _confirmService: ModalService,
        private _productService: IProductApiService,
        private _eventService: EventService) {
    }

    public openPaymentModal(contract: ContractViewModel, paymentAmount: number = 0, address: string = ''): Observable<boolean> {
        this.amount = paymentAmount < 1 ? '' : paymentAmount.toFixed(2);
        this.address = address === '' ? contract.address : address;
        this.contract = contract;

        return new Observable((observer) => {
            if (contract.isPayg) {
                this._productService.GetBonusBand(contract.productId, contract.regionId).subscribe(
                    (bonusBands) => {
                        this.bonusBands = bonusBands;
                        this.activateModal(observer, this.getModalParameters());
                    });
            } else {
                this.activateModal(observer, this.getModalParameters());
            }
        });
    }

    private getModalParameters() {
        return {
            title: 'Make a Payment',
            cancelText: '',
            okText: '',
            modalType: 'componentForm',
            fullScreen: true,
            componentData: {
                reference: this.contract.accountNumber + this.contract.contractNumber,
                amount: this.amount,
                address: this.address,
                fuelType: this.contract.fuelType,
                contractNumber: this.contract.contractNumber,
                paygBand: this.contract.paygBand,
                bonusBands: this.bonusBands,
                prePaymentDate: this.contract.paygPrepaymentEligibile,
                showOutstandingBillPayg: this.contract.showOutstandingBillPayg,
                outstandingBill: this.contract.outstandingBill
            }
        };
    }

    private activateModal(observer: Observer<true>, parameters: any) {
        this._confirmService.activate(parameters)
        .then(
            (res) => {
                let paymentMade = this._eventService.getPayment();
                if (paymentMade) {
                    if (this.contract.isPayg) {
                        leanengage('triggerSurvey', 'my-account-v2-survey-pay-now', { customData: { version: 'payg' } });
                    } else {
                        leanengage('triggerSurvey', 'my-account-v2-survey-pay-now', { customData: { version: 'non-payg' } });
                    }
                }
                observer.next(true);
                observer.complete();
            }
        );
    }
}
